'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import Lenis from 'lenis';

// Typing Animation Component for Main Headings on page load
const BannerTitleTyping: React.FC<{ text: string; colorClass: string }> = ({ text, colorClass }) => {
  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <h1 className={`text-4xl sm:text-5xl lg:text-[4vw] font-extrabold font-chau tracking-tight leading-[1.05] uppercase ${colorClass}`}>
      <motion.span
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.08, delayChildren: 0.6 }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            transition={{ duration: 0.15 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
};

// Container and child variants for staggered entry of left-side text elements
const leftContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const leftItemVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

// Variants for quality badges to fade up staggeredly
const badgeVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

// Variants for product trays image to slide in from right to center
const productImgVariants = {
  hidden: { opacity: 0, x: 250 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, delay: 0.8, ease: 'easeOut' as const },
  },
};

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollYValue = useMotionValue(0);

  const [currentFrame, setCurrentFrame] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Constants for slicing banner image and text contents
  const totalPlanks = 10;
  const staggerOffset = 90;
  const animateWindow = 350;

  // Initialize local Lenis smooth scroll and drive motion values directly from scroll event callbacks
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Bind scroll values to Framer Motion values and image frame indices
    lenis.on('scroll', (e) => {
      const scroll = e.scroll;
      scrollYValue.set(scroll);

      // Scrub frames (1 to 28) over 0px to 1000px scroll range
      const progress = Math.min(1, Math.max(0, scroll / 1000));
      const frame = Math.round(1 + progress * 27);
      setCurrentFrame(frame);

      // Manage video playback based on scroll depth
      if (scroll >= 1000) {
        if (!isVideoPlaying && videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
          setIsVideoPlaying(true);
        }
      } else {
        if (isVideoPlaying && videoRef.current) {
          videoRef.current.pause();
          setIsVideoPlaying(false);
        }
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [scrollYValue, isVideoPlaying]);

  // Video fades in as we scroll from 1000px to 1250px
  const videoOpacity = useTransform(scrollYValue, [1000, 1250], [0, 1]);

  // Dynamic Camera-Pan tracking the lorry cabin as it moves from right to left
  const panX = useTransform(scrollYValue, [0, 1200], [72, 42]);
  const objectPosition = useTransform(panX, (x) => `${x}% 50%`);

  // Shift the first 20 frames to the right by 100vw, reaching 0vw by frame 20
  const frameX = useTransform(scrollYValue, [0, 714, 1000], ['100vw', '0vw', '0vw']);

  // Pre-generate vertical transforms for each of the 10 planks
  const plankTransforms = Array.from({ length: totalPlanks }).map((_, index) => {
    const startScroll = (totalPlanks - 1 - index) * staggerOffset;
    const endScroll = startScroll + animateWindow;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYValue, [startScroll, endScroll], ['0%', '-120%']);
  });

  // Helper function to render the full text and graphic overlays.
  // By offsetting this container with style={{ left: `-${index * 10}vw` }} inside
  // a width: 10% overflow-hidden column, the text is sliced vertically perfectly.
  const renderBannerContent = (index: number) => {
    return (
      <div 
        className="absolute top-20 w-screen h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-[4vw] pt-[18vh] pb-12 select-none pointer-events-none"
        style={{ left: `-${index * 10}vw`, width: '100vw' }}
      >
        {/* Top/Left Main Copy Area */}
        <motion.div 
          variants={leftContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 max-w-2xl"
        >
          {/* Typing Title Headings */}
          <div className="space-y-1 sm:space-y-2">
            <BannerTitleTyping text="PURE QUALITY." colorClass="text-[#153520]" />
            <BannerTitleTyping text="TRUSTED MEAT." colorClass="text-[#B71C1C]" />
          </div>

          {/* Subheading separator line */}
          <motion.div variants={leftItemVariants} className="flex items-center gap-2 max-w-[320px]">
            <div className="h-[2px] bg-[#153520]/20 flex-1" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[#153520]/40 flex items-center justify-center">
              <div className="w-1 h-1 bg-[#FFB300]" />
            </div>
            <div className="h-[2px] bg-[#153520]/20 flex-1" />
          </motion.div>

          {/* Subheading Text */}
          <motion.p variants={leftItemVariants} className="text-xs sm:text-sm lg:text-base font-manrope font-semibold text-[#153520]/90 leading-relaxed max-w-[420px]">
            From our farms to your table, we ensure premium quality, hygiene and taste in every cut.
          </motion.p>

          {/* Four circular quality badges */}
          <motion.div variants={leftItemVariants} className="grid grid-cols-2 sm:flex sm:items-center gap-4 pt-2">
            <motion.div variants={badgeVariants} className="flex flex-col items-center text-center gap-1.5 w-24">
              <div className="w-12 h-12 rounded-full border-2 border-[#153520]/80 flex items-center justify-center text-[#153520]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <span className="text-[9px] font-extrabold text-[#153520] tracking-wider leading-tight">ETHICALLY SOURCED</span>
            </motion.div>
            <motion.div variants={badgeVariants} className="flex flex-col items-center text-center gap-1.5 w-24">
              <div className="w-12 h-12 rounded-full border-2 border-[#153520]/80 flex items-center justify-center text-[#153520]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span className="text-[9px] font-extrabold text-[#153520] tracking-wider leading-tight">HYGIENIC PROCESSING</span>
            </motion.div>
            <motion.div variants={badgeVariants} className="flex flex-col items-center text-center gap-1.5 w-24">
              <div className="w-12 h-12 rounded-full border-2 border-[#153520]/80 flex items-center justify-center text-[#153520]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <span className="text-[9px] font-extrabold text-[#153520] tracking-wider leading-tight">COLD CHAIN DELIVERY</span>
            </motion.div>
            <motion.div variants={badgeVariants} className="flex flex-col items-center text-center gap-1.5 w-24">
              <div className="w-12 h-12 rounded-full border-2 border-[#153520]/80 flex items-center justify-center text-[#153520]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              </div>
              <span className="text-[9px] font-extrabold text-[#153520] tracking-wider leading-tight">PREMIUM QUALITY</span>
            </motion.div>
          </motion.div>

          {/* Action Button */}
          <motion.div variants={leftItemVariants} className="pt-2">
            <button className="flex items-center gap-3 bg-[#153520] hover:bg-[#0f2818] transition-colors duration-300 text-white font-manrope font-semibold text-xs py-2.5 px-5 rounded-full shadow-md group pointer-events-auto">
              Know More About Us
              <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#153520] transition-transform duration-300 group-hover:translate-x-1">
                <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom Section: Product Packaging Trays Image */}
        <div className="w-full flex flex-col items-center gap-4 mt-auto">
          
          {/* Product Packaging Image (Slides in from the right on page load) */}
          <motion.div 
            variants={productImgVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex justify-center hover:scale-105 transition-transform duration-300 pointer-events-auto transform -translate-y-8 sm:-translate-y-12"
          >
            <Image
              src="/Home/Hero/meat.png"
              alt="MEATIN Product Trays"
              width={900}
              height={300}
              className="w-full max-w-[800px] sm:max-w-[850px] h-auto object-contain select-none pointer-events-none"
              priority
            />
          </motion.div>

          {/* Bottom footer text row (e.g. fresh guarantee line) */}
          <div className="w-full flex items-center justify-center gap-6 sm:gap-12 border-t border-[#153520]/15 pt-4 text-[9px] sm:text-xs font-extrabold text-[#153520]/80 tracking-widest uppercase">
            <span>NO HORMONES ADDED</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span>FRESHNESS GUARANTEED</span>
            <span className="hidden sm:inline opacity-30">|</span>
            <span>EXPERTLY PROCESSED</span>
          </div>

        </div>
      </div>
    );
  };

  // Build the formatted file path for the active image frame
  const frameFilename = `ezgif-frame-${String(currentFrame).padStart(3, '0')}.webp`;
  const framePath = `/Home/Hero/startFrames/${frameFilename}`;

  return (
    <div className="relative w-full bg-[#FAF8F5]">
      
      {/* Preloader for all 28 frames to prevent scroll flickering */}
      <div className="hidden pointer-events-none aria-hidden" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <img 
            key={i} 
            src={`/Home/Hero/startFrames/ezgif-frame-${String(i + 1).padStart(3, '0')}.webp`} 
            alt="" 
          />
        ))}
      </div>

      {/* Scroll interactive viewport box (height 320vh for frame scrub + video play sequence) */}
      <div className="relative w-full h-[320vh]">
        
        {/* Sticky Fullscreen Container */}
        <div className="sticky top-0 left-0 w-screen h-screen overflow-hidden z-10">
          
          {/* Background Frame Sequence Player (Stacked Stack for Flicker-free Scrubbing) */}
          <div className="absolute inset-0 w-full h-full bg-[#FAF8F5] z-0 overflow-hidden">
            <motion.div 
              style={{ x: frameX, objectPosition, scale: 1.3 }}
              className="relative w-full h-full"
            >
              {Array.from({ length: 28 }).map((_, i) => {
                const isCurrent = (i + 1) === currentFrame;
                return (
                  <Image
                    key={i}
                    src={`/Home/Hero/startFrames/ezgif-frame-${String(i + 1).padStart(3, '0')}.webp`}
                    alt={`Background Frame Sequence ${i + 1}`}
                    fill
                    style={{ 
                      objectPosition: 'inherit',
                      opacity: isCurrent ? 1 : 0,
                      visibility: isCurrent ? 'visible' : 'hidden'
                    }}
                    className="object-cover select-none pointer-events-none absolute inset-0"
                    priority
                  />
                );
              })}
            </motion.div>
          </div>

          {/* Video Player overlaying the frame sequence (fades in once frames are done) */}
          <motion.div 
            style={{ opacity: videoOpacity }}
            className="absolute inset-0 w-full h-full bg-black z-10 overflow-hidden"
          >
            <motion.video
              ref={videoRef}
              src="/Home/Hero/secondPart.mp4"
              loop
              muted
              playsInline
              style={{ objectPosition }}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </motion.div>
          
          {/* Banner Graphic Planks Container */}
          <div className="absolute inset-0 w-full h-full flex overflow-hidden z-20 pointer-events-none">
            {Array.from({ length: totalPlanks }).map((_, index) => {
              const plankY = plankTransforms[index];

              return (
                <motion.div
                  key={index}
                  style={{ 
                    y: plankY,
                    left: `${index * 10}%`,
                    width: '10%'
                  }}
                  className="absolute top-0 bottom-0 h-full overflow-hidden pointer-events-auto"
                >
                  {/* Background Image Slice */}
                  <div 
                    className="absolute top-0 w-screen h-screen select-none pointer-events-none"
                    style={{ left: `-${index * 10}vw` }}
                  >
                    <Image
                      src="/Home/Hero/herobg.png"
                      alt={`MEATIN Banner Plank ${index}`}
                      fill
                      className="object-cover object-center max-w-none"
                      priority
                    />
                  </div>

                  {/* Sliced Overlay Text/Content (Moves with individual plankY!) */}
                  {renderBannerContent(index)}
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
