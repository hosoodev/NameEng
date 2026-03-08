'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

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
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
  onStatusChange?: (status: AdStatus) => void;
  lazyLoad?: boolean;
  threshold?: number;
  adBlockDetectDelay?: number;
  testMode?: boolean;
  /**
   * 모바일(767px 이하)에서 320×100px 고정 배너로 로드
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
// 핵심: 렌더 전 동기 모바일 판단
// useState + useEffect 사용 시 초기값이 false라서
// lazyLoad=false 환경에서 pushAd()가 isMobile=false 상태에서 먼저 실행됨
// → useMemo로 렌더 시점에 즉시 판단
// ─────────────────────────────────────────────

function useIsMobileSync(enabled: boolean): boolean {
  // SSR에서는 항상 false (서버에서 window 없음)
  // 클라이언트 hydration 시 즉시 판단 — state 비동기 업데이트 없음
  const [isMobile, setIsMobile] = useState(() => {
    if (!enabled || typeof window === 'undefined') return false;
    return window.innerWidth <= MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    // resize 대응 (가로/세로 전환 등)
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [enabled]);

  return isMobile;
}

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
  // isMobile을 useState 초기값에서 즉시 계산 → 첫 렌더부터 올바른 값
  const isMobile = useIsMobileSync(mobileFixed);
  const applyMobileFixed = mobileFixed && isMobile;

  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [status, setStatus] = useState<AdStatus>('idle');

  const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;

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

  // ── testMode placeholder ───────────────────
  if (testMode) {
    return (
      <div
        className={['ad-slot overflow-hidden text-center', wrapperClassName]
          .filter(Boolean)
          .join(' ')}
        style={
          applyMobileFixed
            ? { width: MOBILE_FIXED_WIDTH, height: MOBILE_FIXED_HEIGHT, margin: '0 auto' }
            : { width: '100%' }
        }
        aria-label="광고 (테스트 모드)"
        role="complementary"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
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

  // ─────────────────────────────────────────────────────────
  // 실제 광고 렌더
  //
  // [applyMobileFixed=true] 320×100 고정 배너
  //   - 래퍼: width/height 고정 + overflow:hidden → AdSense 확장 차단
  //   - <ins>: display:inline-block + 동일 크기
  //   - data-ad-format 없음 → AdSense 자동 크기 알고리즘 비활성
  //   - data-full-width-responsive="false" 필수
  //
  // [applyMobileFixed=false] 일반 반응형 광고
  //   - data-ad-format={format} 유지
  //   - data-full-width-responsive로 fullWidth 제어
  // ─────────────────────────────────────────────────────────

  if (applyMobileFixed) {
    return (
      <div
        className={['ad-slot text-center', wrapperClassName].filter(Boolean).join(' ')}
        style={{
          width: MOBILE_FIXED_WIDTH,
          height: MOBILE_FIXED_HEIGHT,
          overflow: 'hidden',
          margin: '0 auto',
        }}
        aria-label="광고"
        role="complementary"
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'inline-block',
            width: MOBILE_FIXED_WIDTH,
            height: MOBILE_FIXED_HEIGHT,
          }}
          data-ad-client={adClient}
          data-ad-slot={slot}
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