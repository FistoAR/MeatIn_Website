'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from './Logo';

export const Preloader: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Check if preloader has already played in this tab session
    if (typeof window !== 'undefined') {
      const hasLoaded = sessionStorage.getItem('meatin-loaded');
      if (hasLoaded === 'true') {
        setLoading(false);
        return;
      }
    }

    let progressVal = 0;
    let isFullyLoaded = false;

    // Fast finish animation once fully loaded
    const completeLoader = () => {
      isFullyLoaded = true;
      sessionStorage.setItem('meatin-loaded', 'true');
    };

    // Listen to window load event to ensure all page assets have downloaded
    const handleLoad = () => {
      completeLoader();
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        completeLoader();
      } else {
        window.addEventListener('load', handleLoad);
      }
    }

    // Progress bar ticking mechanism
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (isFullyLoaded) {
          // Speed up to 100% if assets are downloaded
          const next = prev + 15;
          if (next >= 100) {
            clearInterval(progressInterval);
            
            // Trigger page fade-out
            setFadeOut(true);
            setTimeout(() => {
              setLoading(false);
            }, 500);
            
            return 100;
          }
          return next;
        } else {
          // Hold/slow down at 90% if assets are still downloading
          if (prev < 90) {
            return prev + 3;
          }
          return prev;
        }
      });
    }, 80);

    // Safety fallback timeout (Max 4.5 seconds) in case of hung network requests
    const fallbackTimer = setTimeout(() => {
      completeLoader();
    }, 4500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fallbackTimer);
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  if (!mounted || !loading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F4F2] transition-opacity duration-500 ease-in-out"
      style={{ opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      <style>{`
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

      <div className="flex flex-col items-center justify-center gap-1.5 w-full max-w-md px-6">
        
        {/* Brand Logo with Gentle Float Animation */}
        <div className="animated-logo mb-0">
          <Logo variant="dark" />
        </div>

        {/* Custom Animated Preloader GIF (Reduced height to eliminate blank padding gaps) */}
        <div className="relative w-52 h-44 flex items-center justify-center rounded-2xl overflow-hidden">
          <Image
            src="/preloader.gif"
            alt="Loading..."
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Premium Glowing Progress Bar with Shimmer Effect */}
        <div className="relative w-64 h-2.5 bg-slate-200/80 rounded-full overflow-hidden mt-1 border border-slate-300/40 p-[1.5px]">
          <div
            className="h-full glowing-bar transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-[10px] font-bold tracking-widest text-[#153520] uppercase font-manrope opacity-80 mt-1">
          Loading Freshness...
        </p>

      </div>
    </div>
  );
};

export default Preloader;
