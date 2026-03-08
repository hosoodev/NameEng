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
  slot: string;
  format?: AdFormat;
  fullWidth?: boolean;
  layout?: string;
  layoutKey?: string;
  wrapperClassName?: string;
  /** <ins> 태그에 직접 적용되는 스타일 (mobileFixed 미적용 시에만 사용) */
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
  onStatusChange?: (status: AdStatus) => void;
  lazyLoad?: boolean;
  threshold?: number;
  adBlockDetectDelay?: number;
  testMode?: boolean;
  /**
   * 모바일(767px 이하)에서 320×100px 고정 배너로 로드
   * - data-ad-format 속성 제거 (AdSense 자동 크기 선택 비활성)
   * - data-full-width-responsive="false" 강제
   * - 래퍼를 320×100으로 고정
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

  // ── 모바일 감지 ────────────────────────────
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

  useEffect(() => {
    initialized.current = false;
    updateStatus('idle');
  }, [slot, updateStatus]);

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
      <div className={wrapperClassName} role="complementary" aria-label="광고 대체 콘텐츠">
        {fallback}
      </div>
    ) : null;
  }

  // ── 모바일 고정 크기 적용 여부 ───────────────
  const applyMobileFixed = mobileFixed && isMobile;

  // ── testMode placeholder ───────────────────
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
            height: applyMobileFixed ? `${MOBILE_FIXED_HEIGHT}px` : undefined,
            minHeight: applyMobileFixed ? undefined : 90,
            background:
              'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #fafafa 10px, #fafafa 20px)',
            border: '2px dashed #ccc',
            color: '#999',
            fontSize: 12,
            fontFamily: 'monospace',
          }}
        >
          📢 [{slot}] {applyMobileFixed ? `${MOBILE_FIXED_WIDTH}×${MOBILE_FIXED_HEIGHT} fixed` : format}
        </div>
      </div>
    );
  }

  // ── 실제 광고 렌더 ─────────────────────────
  //
  // [mobileFixed 적용 시 핵심 규칙]
  // 1. 래퍼를 320×100 고정 크기로 만들어 AdSense가 더 큰 광고를 못 넣게 막음
  // 2. <ins>에도 동일하게 display:inline-block + width/height 명시
  // 3. data-ad-format 속성 제거 → AdSense 자동 크기 선택 비활성
  // 4. data-full-width-responsive="false" 필수
  //
  // [일반 responsive 광고]
  // - data-ad-format={format} 유지
  // - data-full-width-responsive로 fullWidth 제어
  // ──────────────────────────────────────────

  if (applyMobileFixed) {
    return (
      <div
        className={['ad-slot text-center', wrapperClassName].filter(Boolean).join(' ')}
        aria-label="광고"
        role="complementary"
        style={{ width: MOBILE_FIXED_WIDTH, height: MOBILE_FIXED_HEIGHT, overflow: 'hidden', margin: '0 auto' }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'inline-block', width: MOBILE_FIXED_WIDTH, height: MOBILE_FIXED_HEIGHT }}
          data-ad-client={adClient}
          data-ad-slot={slot}
          // data-ad-format 의도적으로 제거: format prop 무시
          data-full-width-responsive="false"
        />
      </div>
    );
  }

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
        style={{ display: 'block', ...style }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
        {...(layout ? { 'data-ad-layout': layout } : {})}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
      />
    </div>
  );
}