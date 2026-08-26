'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TrustedQualityBanner from '@/components/layout/TrustedQualityBanner';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HomePage() {
  const storySteps = [
    {
      title: "RESPONSIBLE BEGINNINGS",
      desc: "We source from trusted farms that follow responsible farming practices.",
      icon: "/Home/brand-story/brand-story-icons/responsible-beginnings.svg",
      image: "/Home/brand-story/images/responsible-beginnings.webp"
    },
    {
      title: "HEALTHY LIVESTOCK",
      desc: "Healthy livestock is the foundation of fresh, quality meat products.",
      icon: "/Home/brand-story/brand-story-icons/healthy-livestock.svg",
      image: "/AboutUs/about-us-hero-image.webp"
    },
    {
      title: "SCIENTIFIC PROCESSING",
      desc: "Every product is processed using modern technology and strict hygiene standards.",
      icon: "/Home/brand-story/brand-story-icons/scientific-processing.svg",
      image: "/Home/brand-story/images/scientific-processing.webp"
    },
    {
      title: "QUALITY WITHOUT COMPROMISE",
      desc: "Every batch is carefully checked to ensure safety, freshness, and quality.",
      icon: "/Home/brand-story/brand-story-icons/quality-without-compromise.svg",
      image: "/Home/brand-story/images/quality-without-compromise.webp"
    },
    {
      title: "HYGIENIC PACKAGING",
      desc: "Products are packed in clean, safe conditions to lock in freshness.",
      icon: "/Home/brand-story/brand-story-icons/hygienic-packaging.svg",
      image: "/Home/brand-story/images/hygienic-packaging.webp"
    },
    {
      title: "DELIVERED WITH TRUST",
      desc: "Our cold-chain delivery keeps every product fresh from our facility to your doorstep.",
      icon: "/Home/brand-story/brand-story-icons/delivered-with-trust.svg",
      image: "/Home/brand-story/images/delivered-with-trust.webp"
    }
  ];

  const certificates = [
    {
      name: "FSSAI",
      sub: "CERTIFIED",
      desc: "Food Safety and Standards Authority of India Certified.",
      icon: "/Home/certifications/fssai-icon-image.webp"
    },
    {
      name: "ISO",
      sub: "CERTIFIED",
      desc: "International Organization for Standardization.",
      icon: "/Home/certifications/iso-icon-image.webp"
    },
    {
      name: "HACCP",
      sub: "CERTIFIED",
      desc: "Hazard Analysis and Critical Control Points Compliant.",
      icon: "/Home/certifications/haccp-icon-image.webp"
    },
    {
      name: "HACCP",
      sub: "CERTIFIED",
      desc: "Halal Certified Process and Product Assurance.",
      icon: "/Home/certifications/halal-icon-image.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0] overflow-x-hidden font-manrope">
      
      {/* 1. HERO BANNER */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center bg-black pt-[6rem] overflow-hidden">
        {/* Factory drone shot background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/Home/Hero/herobg.png"
            alt="MEATIN Integrated Processing Plant"
            fill
            priority
            className="object-cover object-center brightness-[0.75] lg:brightness-100"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 lg:via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="w-full max-w-[1400px] lg:max-w-[95vw] mx-auto px-6 sm:px-8 lg:px-[2.5vw] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header content */}
            <div className="lg:col-span-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-3"
              >
                <span className="inline-block text-[#8CC63F] font-barlow text-2xl sm:text-3xl lg:text-[2.5vw] font-bold tracking-wide uppercase leading-none">
                  MEATIN:
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-[6.5vw] xl:text-[7vw] font-bold font-barlow tracking-relaxed uppercase leading-[0.88] text-white">
                  PURE QUALITY.<br />
                  TRUSTED MEAT.
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3 sm:gap-4 max-w-xl bg-black/40 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10"
              >
                <div className="w-1.5 h-12 bg-[#8CC63F] rounded-full" />
                <p className="text-white/95 text-sm sm:text-base md:text-lg font-medium leading-tight font-manrope">
                  South India&apos;s <span className="text-[#8CC63F] font-bold">Largest</span> Multi Species <span className="text-[#8CC63F] font-bold">Meat</span> Processing Plant
                </p>
              </motion.div>
            </div>

            {/* Right stamp overlay badge */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/15"
              >
                <Image
                  src="/AboutUs/keralas-original.webp"
                  alt="Kerala's Original Meat Stamp"
                  fill
                  className="object-contain p-4"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECOND SECTION */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="w-full relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[21/7]">
          <Image
            src="/Home/second-section.webp"
            alt="Second section banner features"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* 3. BRAND STORY / TIMELINE SECTION */}
      <section 
        className="relative w-full pt-20 pb-28 bg-[#61870d] text-white overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Home/section-bg.webp')" }}
      >
       

        <div className="w-full max-w-[1400px] lg:max-w-[92vw] mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-3.5 mb-20">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F6F5F0] opacity-90">
              — BRAND STORY —
            </h4>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.2vw] font-bold font-barlow tracking-tight leading-none">
              More Then Meat. It&apos; <span className="text-[#FFC72C]">Our</span> Promise.
            </h2>
            <p className="text-[#F6F5F0]/90 text-xs sm:text-sm max-w-2xl mx-auto font-manrope font-semibold leading-relaxed">
              From farm tp fork, every step we talk is guided by science, driven by care and delivered with trust.
            </p>
          </div>

          {/* Timeline Cards Grid with Alternating Staggered Heights */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 xl:gap-4 items-stretch pt-8 pb-10"
          >
            {storySteps.map((step, idx) => {
              // Staggered vertical translations: even indices shift up, odd indices shift down
              const isEven = idx % 2 === 0;
              const staggeredClass = isEven ? "xl:-translate-y-6" : "xl:translate-y-6";

              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className={`bg-white rounded-[20px] shadow-xl hover:shadow-2xl flex flex-col justify-between overflow-hidden group transition-all duration-300 min-h-[420px] relative ${staggeredClass}`}
                >
                  {/* Top Image Frame */}
                  <div className="relative w-full h-[210px] overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Bottom gradient fade to white */}
                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent z-10" />
                  </div>

                  {/* Middle floating circular icon (using native SVG circle artwork) */}
                  <div className="absolute top-[210px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[64px] h-[64px] drop-shadow-md">
                    <Image
                      src={step.icon}
                      alt={`${step.title} icon`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Bottom Text Panel */}
                  <div className="bg-white pt-10 pb-6 px-4 flex-1 flex flex-col items-center justify-start text-center">
                    <h4 className="text-[#1F5A3C] font-extrabold text-[15px] xl:text-[14px] 2xl:text-[15px] tracking-wide uppercase font-barlow leading-tight mb-2">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 text-xs font-semibold leading-relaxed font-manrope max-w-[195px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. CERTIFIED EXCELLENCE SECTION */}
      <section className="relative w-full py-16 lg:py-24 bg-[#FAF8F5] overflow-hidden">

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Creative vertical green truck graphics on left side gutter */}
          <div className="absolute left-0 top-[-100px] w-24 h-[650px] hidden lg:block pointer-events-none z-0">
            <div className="relative w-full h-full">
              <Image
                src="/Home/certifications/truck-image-certificates.webp"
                alt="Logistic transport graphic"
                fill
                className="object-contain object-top"
              />
            </div>
          </div>
          
          {/* Header */}
          <div className="text-center space-y-2.5 mb-24">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1F5A3C]">
              — OUR PROMISE —
            </h4>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5vw] font-bold font-barlow tracking-tight uppercase leading-none">
              <span className="text-[#C62828]">Certified</span> <span className="text-[#127431]">Excellence</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto font-manrope font-semibold leading-relaxed">
              Our commitment to international food safety and quality standards.
            </p>
          </div>

          {/* Grid of certifications */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 md:gap-y-12 gap-x-6 lg:gap-x-8 lg:pl-24 items-stretch"
          >
            {certificates.map((cert, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white rounded-[32px] border border-slate-200/80 shadow-[0_12px_36px_rgba(0,0,0,0.035)] p-5 pt-14 flex flex-col justify-between items-center text-center relative group hover:scale-[1.02] transition-transform duration-300 min-h-[480px]"
                >
                  {/* Top Circle logo overlay badge */}
                  <div className="w-24 h-24 bg-white border border-slate-100 rounded-full flex items-center justify-center p-3 shadow-lg shadow-slate-200/60 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative w-full h-full">
                      <Image
                        src={cert.icon}
                        alt={`${cert.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Card Header Content */}
                  <div className="flex flex-col items-center w-full">
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1F5A3C] font-barlow tracking-wide uppercase leading-none mb-1.5">{cert.name}</h4>
                    <span className="inline-block bg-[#7CB325] text-white px-4 py-0.5 rounded text-[11px] font-black uppercase tracking-wider mb-3 leading-none">
                      {cert.sub}
                    </span>
                    <p className="text-xs text-slate-500 font-bold max-w-[200px] sm:max-w-none md:max-w-[200px] h-12 mb-4 leading-normal flex items-center justify-center">
                      {cert.desc}
                    </p>
                  </div>

                  {/* Certificate Image Frame */}
                  <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden shadow-md border border-slate-200/60 mb-5">
                    <Image
                      src="/Home/certifications/certificate-image.webp"
                      alt={`${cert.name} Certificate`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 w-full mt-auto">
                    <button className="bg-[#153520] hover:bg-[#224e31] text-white text-[9.5px] font-black h-10 px-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 uppercase leading-none shadow-sm w-full whitespace-nowrap">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Certificate
                    </button>
                    <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[9.5px] font-black h-10 px-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 uppercase leading-none shadow-sm w-full whitespace-nowrap">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. TRUST BANNER (At the very end of homepage) */}
      <TrustedQualityBanner />

    </div>
  );
}
