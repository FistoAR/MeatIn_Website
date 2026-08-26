'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  Building2,
  Warehouse,
  Truck,
  Scale,
  MapPin,
  ShieldCheck,
  Globe,
  Gem,
  Award,
  Leaf,
  Users,
  FlaskConical
} from 'lucide-react';
import TrustedQualityBanner from '@/components/layout/TrustedQualityBanner';

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const numericString = value.replace(/[^\d]/g, '');
  const suffix = value.replace(/[\d,]/g, '');
  const target = parseInt(numericString, 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutUsPage() {
  const stats = [
    {
      value: "30+",
      label: "ACRES",
      desc: "OF INTEGRATED LAND",
      icon: "/AboutUs/about-hero-icons/acres-icon.svg"
    },
    {
      value: "82,000+",
      label: "SQ.FT.",
      desc: "OF PLANT SPACE",
      icon: "/AboutUs/about-hero-icons/sq-ft-icon.svg"
    },
    {
      value: "45,000+",
      label: "KG",
      desc: "PROCESSING CAPACITY",
      icon: "/AboutUs/about-hero-icons/kg-icon.svg"
    },
    {
      value: "300+",
      label: "TONS",
      desc: "COLD STORAGE CAPACITY",
      icon: "/AboutUs/about-hero-icons/tons-icon.svg"
    },
    {
      value: "15+",
      label: "VEHICLES",
      desc: "IN LOGISTICS NETWORK",
      icon: "/AboutUs/about-hero-icons/vehicles-icon.svg"
    }
  ];

  const highlights = [
    {
      title: "SCIENTIFIC PROCESSING",
      desc: "Modern technology-driven meat processing",
      icon: Award
    },
    {
      title: "HYGIENIC PRODUCTION",
      desc: "Strict cleanroom environment standards",
      icon: ShieldCheck
    },
    {
      title: "HALAL CERTIFIED",
      desc: "100% Halal compliance guaranteed",
      icon: ShieldCheck
    },
    {
      title: "EXPORT QUALITY",
      desc: "Premium international processing standards",
      icon: Globe
    }
  ];

  const coreValues = [
    {
      title: "TRUST",
      desc: "Honest process, always.",
      icon: "/AboutUs/our-values-icons/trust-icon.svg"
    },
    {
      title: "QUALITY",
      desc: "Excellence in every product.",
      icon: "/AboutUs/our-values-icons/quality-icon.svg"
    },
    {
      title: "FRESHNESS",
      desc: "Honest process, always.",
      icon: "/AboutUs/our-values-icons/freshness-icon.svg"
    },
    {
      title: "CUSTOMER SATISFACTION",
      desc: "Your satisfaction, our promise.",
      icon: "/AboutUs/our-values-icons/customer-satisfaction-icon.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F3F3] font-manrope overflow-x-hidden">

      {/* 1. HERO HEADER BANNER SECTION WITH INTEGRATED STATS */}
      <section className="relative w-full bg-black pt-[6rem] sm:pt-[6.5rem] lg:pt-[7rem] xl:pt-[7.5rem] pb-10 md:pb-16 lg:pb-8 xl:pb-10 2xl:pb-12 overflow-hidden flex flex-col justify-between">
        {/* Background Image Overlay with full opacity from public folder */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-black">
          {/* On desktop: image is positioned on the right half (width 55%, starting at 45% left) */}
          <div className="absolute top-0 bottom-0 right-0 left-0 lg:left-[45%] w-full lg:w-[55%]">
            <Image
              src="/AboutUs/about-us-hero-image.webp"
              alt="MEATIN Integrated Farming"
              fill
              priority
              className="object-cover object-[30%_center] sm:object-left"
            />
            {/* Horizontal fade gradient on desktop to blend the image's left edge into the solid black background */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent hidden lg:block" />
          </div>

          {/* Vignette and dark overlays for mobile / bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black via-black/95 to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-black/55 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95 lg:hidden" />
        </div>

        {/* Top/Middle Heading Content */}
        <div className="w-full max-w-[1400px] lg:max-w-[95vw] mx-auto px-6 sm:px-8 lg:px-[2.5vw] relative z-10 flex-1 flex flex-col justify-center my-6 lg:my-8 xl:my-10 2xl:my-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-4xl"
          >
            <h2 className="text-[#D4A437] font-extrabold font-manrope tracking-widest text-sm sm:text-md uppercase flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#D4A437]" /> WHAT IS MEATIN?
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.2vw] xl:text-[6.5vw] font-bold font-barlow-condensed tracking-relaxed uppercase leading-[0.92] !mt-0.5">
              <span className="text-white block">WE ENGINEER</span>
              <span className="text-[#8CC63F] block">QUALITY INTO</span>
              <span className="text-white block">EVERY CUT.</span>
            </h1>
            <p className="text-slate-100 text-xs sm:text-sm md:text-base font-semibold max-w-xl leading-relaxed mt-4">
              Integrated farming, scientific processing, and cold-chain distribution.
            </p>
          </motion.div>
        </div>

        {/* Bottom Stats Row */}
        <div className="w-full max-w-[1400px] lg:max-w-[95vw] mx-auto px-6 sm:px-8 lg:px-[2.5vw] relative z-10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full pt-4"
          >
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 lg:gap-y-0 lg:divide-x lg:divide-white/20 items-start">
              {stats.map((stat, idx) => {
                return (
                  <div key={idx} className="flex flex-col items-start text-left px-2 sm:px-4 lg:px-6 lg:first:pl-0 lg:last:pr-0 col-span-1 last:col-span-2 lg:last:col-span-1">
                    {/* Big Value Number */}
                    <div className="text-3xl sm:text-4xl lg:text-[2.2vw] xl:text-[2.4rem] font-medium text-[#8CC63F] font-chau tracking-tight leading-none">
                      <Counter value={stat.value} />
                    </div>
                    {/* Red underline bar under the number */}
                    <div className="w-10 sm:w-12 lg:w-10 h-[2px] bg-[#D62828] mt-1.5 mb-3" />
                    {/* Icon + Stacked Labels */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-8 lg:h-8 shrink-0 relative">
                        <Image
                          src={stat.icon}
                          alt={stat.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="text-[10px] sm:text-xs lg:text-xs xl:text-sm font-bold text-[#D4A437] tracking-wider leading-tight uppercase font-barlow-condensed">{stat.label}</h4>
                        <p className="text-[9px] sm:text-[10px] lg:text-[10px] xl:text-xs text-slate-300 font-semibold tracking-wide uppercase leading-tight mt-0.5 font-manrope">{stat.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. WHO IS MEATIN SECTION */}
      <section className="relative w-full py-14 md:py-18 bg-[#F3F3F3] overflow-hidden">
        {/* Background pattern image */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.8]">
          <Image
            src="/AboutUs/who-is-bg.webp"
            alt="Background Pattern"
            fill
            className="object-cover"
            priority
          />
          {/* Soft overlay to tone down background doodles exactly like the reference image */}
          {/* <div className="absolute inset-0 bg-[#F3F3F3]/90" /> */}
        </div>

        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Left Side: Plant Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative w-full h-[280px] sm:h-[400px] md:h-[480px] lg:h-[520px] xl:h-[600px] 2xl:h-[680px] shadow-xl"
            >
              <Image
                src="/AboutUs/who-is-image.webp"
                alt="MEATIN Plant Facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Right Side: Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4vw] xl:text-[4.5vw] 2xl:text-[5.5rem] font-bold font-barlow-condensed tracking-normal uppercase leading-none">
                  <span className="text-[#1F5A3C] block">WHO IS</span>
                  <span className="text-[#D62828] block">MEATIN?</span>
                </h2>
                <div className="h-[3px] w-14 bg-[#1F5A3C]" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#153520]">Building a better meat ecosystem.</h3>
                <p className="text-xs sm:text-sm lg:text-[13px] xl:text-sm 2xl:text-base text-slate-700 font-medium leading-relaxed max-w-[600px]">
                  MEATIN delivers safe, hygienic meat through scientific processing and controlled cold-chain systems. Built on quality, safety, and Halal-certified standards, our integrated approach ensures reliable production and distribution. From responsible sourcing to advanced infrastructure, we are building a better meat ecosystem.
                </p>
              </div>

              {/* Stamp Badges Row */}
              <div className="flex flex-wrap items-center gap-6 xl:gap-10 2xl:gap-20 pt-2">
                <div className="relative w-44 sm:w-56 lg:w-52 xl:w-64 2xl:w-72 h-14 sm:h-18 lg:h-18 xl:h-20 2xl:h-24">
                  <Image
                    src="/AboutUs/quality-is-our-promise.webp"
                    alt="Quality is our promise"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <div className="relative w-28 sm:w-36 lg:w-36 xl:w-44 2xl:w-52 h-14 sm:h-18 lg:h-18 xl:h-20 2xl:h-24">
                  <Image
                    src="/AboutUs/keralas-original.webp"
                    alt="Kerala's Original Meat"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>

              {/* Circular Highlights badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {/* Highlight 1: Scientific Processing */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-14 h-14 relative hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/AboutUs/who-is-meatin-icons/scientific-procssing.svg"
                      alt="Scientific Processing"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-[10px] xl:text-xs 2xl:text-sm !mt-3 font-black text-slate-800 tracking-wider uppercase leading-tight font-manrope">
                    SCIENTIFIC<br />PROCESSING
                  </span>
                </div>

                {/* Highlight 2: Hygienic Production */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-14 h-14 relative hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/AboutUs/who-is-meatin-icons/hygienic-production.svg"
                      alt="Hygienic Production"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-[10px] xl:text-xs 2xl:text-sm !mt-3 font-black text-slate-800 tracking-wider uppercase leading-tight font-manrope">
                    HYGIENIC<br />PRODUCTION
                  </span>
                </div>

                {/* Highlight 3: Halal Certified */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-14 h-14 relative hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/AboutUs/who-is-meatin-icons/halal-certified.svg"
                      alt="Halal Certified"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-[10px] xl:text-xs 2xl:text-sm !mt-3 font-black text-slate-800 tracking-wider uppercase leading-tight font-manrope">
                    HALAL<br />CERTIFIED
                  </span>
                </div>

                {/* Highlight 4: Export Quality */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-14 h-14 relative hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/AboutUs/who-is-meatin-icons/export-quality.svg"
                      alt="Export Quality"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] lg:text-[10px] xl:text-xs 2xl:text-sm !mt-3 font-black text-slate-800 tracking-wider uppercase leading-tight font-manrope">
                    EXPORT<br />QUALITY
                  </span>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION SPLIT GRID */}
      <section className="relative w-full">
        {/* Vertical Divider Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-10 hidden lg:block" />

        {/* Floating Center MEATIN Logo Badge (visible on desktop) */}
        <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
          <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg border border-white/20">
            {/* Decorative concentric thin circle */}
            <div className="absolute -inset-2 rounded-full border border-[#1F5A3C]/20" />
            <div className="relative w-[80%] h-[80%] rounded-full overflow-hidden flex items-center justify-center p-1">
              <Image
                src="/logo.webp"
                alt="MEATIN Logo"
                width={70}
                height={35}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[550px] lg:min-h-[700px]">

          {/* Mission Box */}
          <div className="relative px-6 pt-24 pb-64 sm:px-12 lg:px-20 lg:pt-32 lg:pb-76 flex flex-col justify-center text-white overflow-hidden min-h-[480px] lg:min-h-[700px]">
            <Image
              src="/AboutUs/mission-bg.webp"
              alt="Our Mission background"
              fill
              className="object-cover brightness-[0.35] z-0"
              sizes="50vw"
            />
            <div className="relative z-10 space-y-6">
              <div className="relative">
                <span className="absolute -top-8 left-0 text-[130px] font-black text-white/15 select-none leading-none z-0">01</span>
                <div className="relative z-10">
                  <span className="text-[#D4A437] font-black text-xs sm:text-sm tracking-wider uppercase block mb-1">OUR</span>
                  <h2 className="text-5xl sm:text-6xl font-black text-[#D62828] font-barlow-condensed tracking-tight uppercase leading-none">MISSION</h2>
                  <div className="h-[4px] w-20 bg-[#1F5A3C] mt-3" />
                </div>
              </div>
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-lg relative z-10">
                Build value-added meat products, farming, and food supply chains while delivering <span className="text-[#D62828] font-bold">quality, service</span> and a <span className="text-[#D62828] font-bold">sustainable</span> food system.
              </p>
            </div>
          </div>

          {/* Vision Box */}
          <div className="relative px-6 pt-24 pb-64 sm:px-12 lg:px-20 lg:pt-32 lg:pb-80 flex flex-col justify-center text-white overflow-hidden min-h-[480px] lg:min-h-[700px]">
            <Image
              src="/AboutUs/vision-bg.webp"
              alt="Our Vision background"
              fill
              className="object-cover brightness-[0.35] z-0"
              sizes="50vw"
            />
            <div className="relative z-10 space-y-6">
              <div className="relative">
                <span className="absolute -top-8 left-0 text-[130px] font-black text-white/15 select-none leading-none z-0">02</span>
                <div className="relative z-10">
                  <span className="text-[#D4A437] font-black text-xs sm:text-sm tracking-wider uppercase block mb-1">OUR</span>
                  <h2 className="text-5xl sm:text-6xl font-black text-[#7CB325] font-barlow-condensed tracking-tight uppercase leading-none">VISION</h2>
                  <div className="h-[4px] w-20 bg-[#1F5A3C] mt-3" />
                </div>
              </div>
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-lg relative z-10">
                Become a leader in <span className="text-[#7CB325] font-bold">value-added</span> meat processing and a trusted premium-quality food supplier.
              </p>
            </div>
          </div>

        </div>

        {/* 5. FLOATING CORE VALUES CONTAINER CARD */}
        <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[950px] lg:max-w-[55vw] px-4 sm:px-6 lg:px-8 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F6F5F0] rounded-[32px] border border-[#E5EAE1] shadow-[0_12px_36px_rgba(0,0,0,0.06)] p-5 sm:p-6 lg:py-6 lg:px-8 text-center space-y-6"
          >
            <h3 className="text-xs sm:text-sm font-bold text-[#1F5A3C] tracking-widest uppercase flex items-center justify-center gap-3">
              <span className="w-10 h-[2px] bg-[#D62828]" /> OUR VALUES <span className="w-10 h-[2px] bg-[#7CB325]" />
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 divide-y sm:divide-y-0 lg:divide-x divide-[#E2E8DC] items-start">
              {coreValues.map((val, idx) => {
                return (
                  <div key={idx} className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0 border-t border-[#E2E8DC] sm:border-t-0">
                    {/* SVG Vector Icon (Direct render without circular bg) */}
                    <div className="relative w-10 h-10 mb-2">
                      <Image
                        src={val.icon}
                        alt={val.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-[17px] sm:text-[19px] font-black text-[#1F5A3C] font-barlow-condensed tracking-wide uppercase mb-1 leading-none">{val.title}</h4>
                    <p className="text-[12px] text-slate-500 font-semibold leading-normal max-w-[160px] mx-auto">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </section>

      {/* Global Trusted Quality Banner */}
      <TrustedQualityBanner />



    </div>
  );
}
