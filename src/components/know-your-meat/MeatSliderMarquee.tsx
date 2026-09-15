"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface MeatSliderItem {
  name: string;
  img: string;
  alt?: string;
}

export interface MeatSliderMarqueeProps {
  items?: MeatSliderItem[];
  bgImage?: string;
  speed?: number; // duration in seconds
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  heightClass?: string;
  showLabels?: boolean;
}

const DEFAULT_ITEMS: MeatSliderItem[] = [
  { name: "Fresh Breast", img: "/Product/slider-images/breast.webp" },
  { name: "Juicy Wings", img: "/Product/slider-images/wings.webp" },
  { name: "Tender Drumette", img: "/Product/slider-images/drumette.webp" },
  { name: "Fresh Leg", img: "/Product/slider-images/leg-left.webp" },
  { name: "Rich Neck Cut", img: "/Product/slider-images/neck.webp" },
  { name: "Prime Leg", img: "/Product/slider-images/leg-right.webp" },
];

export default function MeatSliderMarquee({
  items = DEFAULT_ITEMS,
  bgImage = "/Product/slider-images/slider-bg.webp",
  speed = 25,
  direction = "left",
  pauseOnHover = true,
  className = "",
  heightClass = "h-24 sm:h-32 md:h-36 lg:h-40",
  showLabels = false,
}: MeatSliderMarqueeProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Duplicate items array 4 times to ensure seamless infinite looping on all screen sizes
  const repeatedItems = [...items, ...items, ...items, ...items];

  const animationDirectionClass =
    direction === "left"
      ? "animate-marquee-left"
      : "animate-marquee-right";

  return (
    <div
      className={`relative w-full overflow-hidden select-none shadow-md ${className}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      {/* Top & Bottom Subtle Rail Glow / Shadows */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-slate-400/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-slate-400/40 to-transparent z-10 pointer-events-none" />

      {/* Marquee Wrapper Container */}
      <div
        className={`group relative flex items-center w-full ${heightClass} overflow-hidden`}
      >
        <div
          className={`flex items-center shrink-0 min-w-full gap-8 sm:gap-12 md:gap-16 lg:gap-20 py-2 ${animationDirectionClass} ${
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
          }`}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {repeatedItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative flex flex-col items-center justify-center shrink-0 cursor-pointer group/item transition-transform duration-300 ease-out hover:scale-110 sm:hover:scale-115"
            >
              {/* Product Image on Conveyor Belt */}
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.22)] transition-all duration-300">
                <Image
                  src={item.img}
                  alt={item.alt || item.name}
                  fill
                  sizes="(max-width: 640px) 110px, (max-width: 1024px) 160px, 200px"
                  className="object-contain transform group-hover/item:-translate-y-1.5 transition-transform duration-300"
                />
              </div>

              {/* Optional Floating Label / Badge on Hover or Always */}
              {(showLabels || hoveredIdx === idx) && (
                <div className="absolute -bottom-2 sm:bottom-1 bg-[#064823]/90 text-white text-[10px] sm:text-xs font-bold font-inter tracking-wider px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm whitespace-nowrap transition-all duration-300 animate-fadeIn pointer-events-none">
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for keyframe marquee animations */}
      <style jsx global>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee-left {
          animation: marqueeLeft linear infinite;
          will-change: transform;
        }

        .animate-marquee-right {
          animation: marqueeRight linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
