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
  /** 모바일에서 화면 전체 너비 광고 */
  fullWidth?: boolean;
  /** fluid 포맷에서 필요한 layout 속성 */
  layout?: string;
  /** fluid 포맷에서 필요한 layout-key 속성 */
  layoutKey?: string;
  /** 추가 CSS 클래스 */
  className?: string;
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

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function AdSlot({
  slot,
  format = 'auto',
  fullWidth = false,
  layout,
  layoutKey,
  className = '',
  style,
  fallback,
  onStatusChange,
  lazyLoad = true,
  threshold = INTERSECTION_THRESHOLD,
  adBlockDetectDelay = AD_BLOCK_DETECT_DELAY,
  testMode = false,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<AdStatus>('idle');

  // ── adClient 검증 ──────────────────────────
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

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
    // SSR guard
    if (typeof window === 'undefined') return;

    // adClient 미설정 경고
    if (!adClient && !testMode) {
      console.warn(
        '[AdSlot] NEXT_PUBLIC_ADSENSE_ID가 설정되지 않았습니다. 광고가 표시되지 않을 수 있습니다.',
      );
      updateStatus('error');
      return;
    }

    if (!adRef.current) return;

    if (lazyLoad) {
      // IntersectionObserver로 뷰포트 진입 시에만 로드
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
      // StrictMode 대응 cleanup
      initialized.current = false;
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [slot, lazyLoad, threshold, adClient, testMode, pushAd, updateStatus]);

  // ── adClient 미설정 / error 상태 ──────────
  if (!adClient && !testMode) {
    return fallback ? <>{fallback}</> : null;
  }

  // ── 광고 차단 감지 시 fallback ─────────────
  if (status === 'blocked') {
    return fallback ? (
      <div
        className={className}
        role="complementary"
        aria-label="광고 대체 콘텐츠"
      >
        {fallback}
      </div>
    ) : null;
  }

  // ── testMode: 시각적 placeholder ──────────
  if (testMode) {
    return (
      <div
        className={[
          'ad-slot overflow-hidden text-center',
          fullWidth ? 'w-screen relative left-1/2 -translate-x-1/2' : 'w-full',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label="광고 (테스트 모드)"
        role="complementary"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 90,
            background:
              'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #fafafa 10px, #fafafa 20px)',
            border: '2px dashed #ccc',
            color: '#999',
            fontSize: 12,
            fontFamily: 'Noto Sans KR',
            ...style,
          }}
        >
          📢 AdSlot [{slot}] — {format}
          {fullWidth ? ' · fullWidth' : ''}
        </div>
      </div>
    );
  }

  // ── 실제 광고 렌더 ─────────────────────────
  return (
    <div
      className={[
        'ad-slot overflow-hidden text-center',
        fullWidth ? 'w-screen relative left-1/2 -translate-x-1/2' : 'w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="광고"
      role="complementary"
    >
      <ins
        ref={adRef}
        className="adsbygoogle block"
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