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
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
  onStatusChange?: (status: AdStatus) => void;
  lazyLoad?: boolean;
  threshold?: number;
  adBlockDetectDelay?: number;
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
}: AdSlotProps) {
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
        className={['ad-slot overflow-hidden text-center w-full', wrapperClassName]
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
            width: '100%',
            height: '100%',
            minHeight: 90,
            background:
              'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #fafafa 10px, #fafafa 20px)',
            border: '2px dashed #ccc',
            color: '#999',
            fontSize: 12,
            fontFamily: 'monospace',
          }}
        >
          📢 [{slot}] {format}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // 실제 광고 렌더
  // ─────────────────────────────────────────────────────────

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