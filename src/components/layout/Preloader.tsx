'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import { PRELOAD_ASSETS } from './preloaderAssets';
import { AssetPreloadEngine } from './preloadEngine';

export const Preloader: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Pre-warm Next.js route bundles on client router
  useEffect(() => {
    const routesToPrewarm = [
      '/',
      '/know-your-meat',
      '/recipes',
      '/franchise',
      '/meet-our-team',
      '/vlog',
      '/contact',
      '/about',
    ];

    routesToPrewarm.forEach((routePath) => {
      try {
        router.prefetch(routePath);
      } catch (e) {
        // Safe fallback
      }
    });
  }, [router]);

  useEffect(() => {
    // Skip preloader on internal page clicks if already preloaded during session
    if (typeof window !== 'undefined' && sessionStorage.getItem('meatin_preloaded') === 'true') {
      setLoading(false);
      return;
    }

    setMounted(true);
    if (typeof document !== 'undefined') {
      document.body.classList.add('preloader-active');
      document.body.style.overflow = 'hidden';
    }

    let isFinished = false;

    const finishLoading = () => {
      if (isFinished) return;
      isFinished = true;
      setProgress(100);

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('meatin_preloaded', 'true');
      }

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (typeof document !== 'undefined') {
            document.body.classList.remove('preloader-active');
            document.body.style.overflow = '';
          }
          setLoading(false);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('resize'));
            window.dispatchEvent(new Event('scroll'));
          }
        }, 500);
      }, 300);
    };

    // Instantiate DSA Asset Preload Engine (Priority Queue + Worker Pool + Set Deduplication)
    if (typeof window !== 'undefined') {
      const engine = new AssetPreloadEngine(PRELOAD_ASSETS, {
        concurrency: 6, // Standard per-domain HTTP/1.1 socket concurrency limit
        onProgress: (percent) => {
          setProgress((prev) => Math.max(prev, percent));
        },
        onComplete: () => {
          finishLoading();
        },
      });

      engine.start();
    }

    // Maximum fallback safety timeout (3.5s) to guarantee fast entry
    const maxTimeout = setTimeout(() => {
      finishLoading();
    }, 3500);

    return () => {
      clearTimeout(maxTimeout);
      if (typeof document !== 'undefined') {
        document.body.classList.remove('preloader-active');
        document.body.style.overflow = '';
      }
    };
  }, []);

  if (!mounted || !loading) return null;

  return (
    <div
      id="preloader-root"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F4F2] transition-opacity duration-500 ease-in-out"
      style={{ opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      <style>{`
        body.preloader-active > *:not(#preloader-root) {
          opacity: 0 !important;
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0) scale(1.1); }
          50% { transform: translateY(-6px) scale(1.13); }
        }
        .animated-logo {
          animation: gentleFloat 3s ease-in-out infinite;
        }
        @keyframes shimmerEffect {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        .glowing-bar {
          box-shadow: 0 0 12px rgba(21, 53, 32, 0.25);
          background: linear-gradient(
            90deg,
            #153520 0%,
            #1f5a3c 30%,
            #84cc16 50%,
            #1f5a3c 70%,
            #153520 100%
          );
          background-size: 200px 100%;
          animation: shimmerEffect 1.8s linear infinite;
        }
      `}</style>

      {/* Compact Round Circular Preloader Container */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full flex items-center justify-center p-1 shadow-[0_20px_50px_rgba(21,53,32,0.15)]">
        
        {/* Animated Running Green Circular Border */}
        <div
          className="absolute inset-0 rounded-full animate-spin pointer-events-none"
          style={{
            animationDuration: '2.2s',
            padding: '7px',
            background: 'conic-gradient(from 0deg, rgba(124, 179, 37, 0.15) 0%, #82B224 40%, #395B20 75%, #7CB325 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Clean Interior Circle Container (Perfectly Centered Content) */}
        <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-4 shadow-inner">
          {/* Content Layer Inside Circle */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            {/* 1. Enlarged Running Chicken Mascot GIF */}
            <div className="relative w-[170px] h-[120px] sm:w-[190px] sm:h-[135px] flex items-center justify-center shrink-0">
              <Image
                src="/preloader.gif?v=3"
                alt="Loading..."
                fill
                className="object-contain object-center"
                priority
                unoptimized
              />
            </div>

            {/* 2. MEATIN Logo */}
            <div className="animated-logo scale-100 sm:scale-105 shrink-0 -mt-2">
              <Logo variant="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Percentage Counter Below Circle */}
      <div className="mt-6 flex items-center justify-center">
        <span className="text-xl sm:text-2xl font-extrabold text-[#153520] tracking-wider font-manrope">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
