'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type AdFormat =
  | 'auto'
  | 'rectangle'
  | 'horizontal'
  | 'vertical'
  | 'fluid'
  | 'autorelaxed'
  | 'link';

type AdStatus = 'idle' | 'loading' | 'loaded' | 'blocked' | 'error';

interface AdSlotProps {
  /** AdSense 광고 슬롯 ID */
  slot: string;
  /** 광고 포맷 (기본값: 'auto') */
  format?: AdFormat;
  /** AdSense의 data-full-width-responsive 속성 제어 (기본값: true) */
  fullWidth?: boolean;
  /** fluid 포맷에서 필요한 layout 속성 */
  layout?: string;
  /** fluid 포맷에서 필요한 layout-key 속성 */
  layoutKey?: string;
  /**
   * 래퍼 <div>에 추가할 CSS 클래스
   * (기존 className → wrapperClassName 으로 변경, 내부 고정 클래스와 충돌 방지)
   */
  wrapperClassName?: string;
  /** <ins> 태그에 직접 적용되는 스타일 */
  style?: React.CSSProperties;
  /** 광고 차단 감지 시 보여줄 fallback UI */
  fallback?: React.ReactNode;
  /** 광고 상태 변경 콜백 */
  onStatusChange?: (status: AdStatus) => void;
  /** 뷰포트 진입 후 지연 로드 여부 (기본값: true) */
  lazyLoad?: boolean;
  /** IntersectionObserver threshold (기본값: 0.1) */
  threshold?: number;
  /** 광고 차단 감지 대기 시간 ms (기본값: 1500) */
  adBlockDetectDelay?: number;
  /** 개발/테스트 모드 — 실제 push() 호출 없이 placeholder 렌더 */
  testMode?: boolean;
  /**
   * 모바일 고정 크기 광고 여부 (기본값: false)
   * true 시 모바일(767px 이하)에서 320×100px 고정 크기로 로드
   * → data-full-width-responsive 자동으로 false 처리
   */
  mobileFixed?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const AD_BLOCK_DETECT_DELAY = 1500;
const INTERSECTION_THRESHOLD = 0.1;
const MOBILE_FIXED_WIDTH = 320;
const MOBILE_FIXED_HEIGHT = 100;
const MOBILE_BREAKPOINT = 767;

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function AdSlot({
  slot,
  format = 'auto',
  fullWidth = true,
  layout,
  layoutKey,
  wrapperClassName = '',
  style,
  fallback,
  onStatusChange,
  lazyLoad = true,
  threshold = INTERSECTION_THRESHOLD,
  adBlockDetectDelay = AD_BLOCK_DETECT_DELAY,
  testMode = false,
  mobileFixed = false,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<AdStatus>('idle');
  const [isMobile, setIsMobile] = useState(false);

  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // ── 모바일 감지 (mobileFixed 활성 시에만) ──
  useEffect(() => {
    if (typeof window === 'undefined' || !mobileFixed) return;
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mobileFixed]);

  const updateStatus = useCallback(
    (next: AdStatus) => {
      setStatus(next);
      onStatusChange?.(next);
    },
    [onStatusChange],
  );

  // ── 광고 push 핵심 로직 ────────────────────
  const pushAd = useCallback(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (testMode) {
      updateStatus('loaded');
      return;
    }

    try {
      updateStatus('loading');
      (window.adsbygoogle = window.adsbygoogle || []).push({});

      // 광고 차단 감지: 일정 시간 후 height 확인
      timerRef.current = setTimeout(() => {
        if (!adRef.current) return;
        const insEl = adRef.current;
        const isHidden =
          insEl.offsetHeight === 0 ||
          window.getComputedStyle(insEl).display === 'none' ||
          insEl.getAttribute('data-ad-status') === 'unfilled';
        updateStatus(isHidden ? 'blocked' : 'loaded');
      }, adBlockDetectDelay);
    } catch {
      updateStatus('error');
    }
  }, [testMode, adBlockDetectDelay, updateStatus]);

  // ── slot 변경 시 리셋 ──────────────────────
  useEffect(() => {
    initialized.current = false;
    updateStatus('idle');
  }, [slot, updateStatus]);

  // ── 메인 effect: lazyLoad 분기 ─────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!adClient && !testMode) {
      console.warn('[AdSlot] NEXT_PUBLIC_ADSENSE_ID가 설정되지 않았습니다.');
      updateStatus('error');
      return;
    }

    if (!adRef.current) return;

    if (lazyLoad) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            pushAd();
            observerRef.current?.disconnect();
            observerRef.current = null;
          }
        },
        { threshold },
      );
      observerRef.current.observe(adRef.current);
    } else {
      pushAd();
    }

    return () => {
      initialized.current = false;
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [slot, lazyLoad, threshold, adClient, testMode, pushAd, updateStatus]);

  // ── adClient 미설정 ────────────────────────
  if (!adClient && !testMode) {
    return fallback ? <>{fallback}</> : null;
  }

  // ── 광고 차단 감지 시 fallback ─────────────
  if (status === 'blocked') {
    return fallback ? (
      <div
        className={wrapperClassName}
        role="complementary"
        aria-label="광고 대체 콘텐츠"
      >
        {fallback}
      </div>
    ) : null;
  }

  // ── 모바일 고정 크기 적용 여부 ───────────────
  // mobileFixed=true이고 실제 모바일 뷰포트일 때만 고정 크기 적용
  const applyMobileFixed = mobileFixed && isMobile;

  const insStyle: React.CSSProperties = applyMobileFixed
    ? {
      display: 'block',
      width: `${MOBILE_FIXED_WIDTH}px`,
      height: `${MOBILE_FIXED_HEIGHT}px`,
      ...style,
    }
    : { display: 'block', ...style };

  // mobileFixed 시 full-width-responsive를 false로 강제
  const responsiveValue = applyMobileFixed ? 'false' : fullWidth ? 'true' : 'false';

  // ── testMode: 시각적 placeholder ──────────
  if (testMode) {
    return (
      <div
        className={['ad-slot overflow-hidden text-center w-full', wrapperClassName]
          .filter(Boolean)
          .join(' ')}
        aria-label="광고 (테스트 모드)"
        role="complementary"
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: applyMobileFixed ? `${MOBILE_FIXED_WIDTH}px` : '100%',
            minHeight: applyMobileFixed ? `${MOBILE_FIXED_HEIGHT}px` : 90,
            background:
              'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #fafafa 10px, #fafafa 20px)',
            border: '2px dashed #ccc',
            color: '#999',
            fontSize: 12,
            fontFamily: 'monospace',
            ...style,
          }}
        >
          📢 [{slot}] {format}
          {applyMobileFixed
            ? ` · mobile fixed ${MOBILE_FIXED_WIDTH}×${MOBILE_FIXED_HEIGHT}`
            : fullWidth
              ? ' · responsive'
              : ''}
        </div>
      </div>
    );
  }

  // ── 실제 광고 렌더 ─────────────────────────
  return (
    <div
      className={['ad-slot overflow-hidden text-center w-full', wrapperClassName]
        .filter(Boolean)
        .join(' ')}
      aria-label="광고"
      role="complementary"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={insStyle}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsiveValue}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
      />
    </div>
  );
}