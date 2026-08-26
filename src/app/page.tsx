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
    transition: { duration: 0.6, ease: 'easeOut' }
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
      desc: "We source our animals from the finest farms with fair farming practices.",
      icon: "/AboutUs/our-values-icons/trust-icon.svg",
      image: "/AboutUs/mission-bg.webp"
    },
    {
      title: "HEALTHY LIVESTOCK",
      desc: "Healthy, clean animal feed is formulated to visually certify raw products.",
      icon: "/AboutUs/our-values-icons/quality-icon.svg",
      image: "/AboutUs/about-us-hero-image.webp"
    },
    {
      title: "SCIENTIFIC PROCESSING",
      desc: "Processing takes place in a semi-automated, state-of-the-art facility.",
      icon: "/AboutUs/who-is-meatin-icons/scientific-procssing.svg",
      image: "/AboutUs/who-is-image.webp"
    },
    {
      title: "QUALITY WITHOUT COMPROMISE",
      desc: "Rigorous quality checks ensure the highest level of food safety.",
      icon: "/AboutUs/who-is-meatin-icons/hygienic-production.svg",
      image: "/AboutUs/vision-bg.webp"
    },
    {
      title: "HYGIENIC PACKAGING",
      desc: "Products are packed under strict sanitary conditions to retain freshness.",
      icon: "/AboutUs/who-is-meatin-icons/export-quality.svg",
      image: "/AboutUs/who-is-image.webp"
    },
    {
      title: "DELIVERED WITH TRUST",
      desc: "Our temperature-controlled logistics network delivers fresh meat to your doorstep.",
      icon: "/AboutUs/our-values-icons/customer-satisfaction-icon.svg",
      image: "/AboutUs/mission-bg.webp"
    }
  ];

  const certificates = [
    {
      name: "FSSAI",
      sub: "CERTIFIED",
      desc: "Food Safety and Standards Authority of India",
      certNo: "11322007000329",
      bgClass: "border-[#D4A437]/30"
    },
    {
      name: "ISO",
      sub: "CERTIFIED",
      desc: "International Organization for Standardization",
      certNo: "ISO 22000:2018",
      bgClass: "border-[#7CB325]/30"
    },
    {
      name: "HACCP",
      sub: "CERTIFIED",
      desc: "Hazard Analysis Critical Control Point",
      certNo: "HACCP-M-0985",
      bgClass: "border-[#1F5A3C]/30"
    },
    {
      name: "HALAL",
      sub: "CERTIFIED",
      desc: "Halal India Trust / Jamiat Ulama-i-Hind Compliance",
      certNo: "HI-HP-08876",
      bgClass: "border-[#C62828]/30"
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

      {/* 2. BRAND STORY / TIMELINE SECTION */}
      <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-[#1F5A3C] to-[#127431] text-white overflow-hidden">
        {/* Wave divider SVG at top */}
        <div className="absolute top-0 left-0 right-0 h-10 w-full overflow-hidden pointer-events-none z-15">
          <svg viewBox="0 0 1440 74" fill="none" className="w-full h-full object-cover transform rotate-180">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,74L1320,74C1200,74,960,74,720,74C480,74,240,74,120,74L0,74Z" fill="#F6F5F0" />
          </svg>
        </div>

        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-16">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8CC63F]">
              — BRAND STORY —
            </h4>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5vw] font-bold font-barlow tracking-tight uppercase leading-none">
              More Than Meat. It&apos;s <span className="text-[#F9A825]">Our</span> Promise.
            </h2>
            <p className="text-slate-200/90 text-sm sm:text-base max-w-xl mx-auto font-manrope font-normal leading-relaxed">
              From farm to fork, every process is integrated by us to ensure safety, hygiene and delivery to you.
            </p>
          </div>

          {/* Timeline Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 xl:gap-4 items-stretch"
          >
            {storySteps.map((step, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-[24px] border border-white/10 p-5 flex flex-col justify-start relative group transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden min-h-[300px] lg:min-h-0"
                >
                  {/* Photo background with dark overlay */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover brightness-[0.3] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full justify-between flex-1">
                    {/* Circle Icon Badge */}
                    <div className="w-12 h-12 rounded-full bg-[#8CC63F]/90 border border-white/20 flex items-center justify-center mb-6 shadow-md shadow-[#8CC63F]/20 relative">
                      <Image
                        src={step.icon}
                        alt={step.title}
                        width={24}
                        height={24}
                        className="object-contain invert brightness-0"
                      />
                    </div>

                    <div className="space-y-2 mt-auto">
                      <h4 className="text-[17px] xl:text-[15px] 2xl:text-[17px] font-bold font-barlow tracking-wide uppercase leading-tight text-white">
                        {step.title}
                      </h4>
                      <p className="text-slate-200 text-xs leading-normal font-manrope font-normal opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. CERTIFIED EXCELLENCE SECTION */}
      <section className="relative w-full py-16 lg:py-24 bg-[#FAF9F5] overflow-hidden">
        {/* Creative vertical green truck graphics on left side gutter */}
        <div className="absolute -left-12 lg:left-0 top-[20%] w-24 h-48 pointer-events-none opacity-30 lg:opacity-75 z-0">
          <Image
            src="/AboutUs/about-hero-icons/vehicles-icon.svg"
            alt="Logistic network graphic"
            fill
            className="object-contain object-left scale-150 rotate-90"
          />
        </div>

        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-2.5 mb-16">
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

          {/* Grid of CSS-rendered certificates */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch"
          >
            {certificates.map((cert, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white rounded-[24px] border border-slate-200/80 shadow-[0_12px_36px_rgba(0,0,0,0.04)] p-6 flex flex-col justify-between items-center text-center relative group hover:scale-[1.02] transition-transform duration-300 min-h-[460px]"
                >
                  {/* Miniature HTML Certificate Layout */}
                  <div className={`w-full aspect-[3/4.2] bg-[#FAF9F6] border-2 ${cert.bgClass} p-3 rounded-lg flex flex-col justify-between items-center relative overflow-hidden shadow-inner`}>
                    {/* Certificate Top watermark header */}
                    <div className="text-[7px] font-black text-[#1F5A3C] tracking-widest uppercase border-b border-[#1F5A3C]/20 pb-0.5 w-full">
                      MEATIN CERTIFICATION
                    </div>

                    {/* Logo Emblem Icon */}
                    <div className="w-10 h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center shadow-sm relative my-2">
                      <span className="text-[9px] font-bold font-barlow text-[#1F5A3C] leading-none">{cert.name}</span>
                    </div>

                    {/* Cert Main copy */}
                    <div className="space-y-1 my-1">
                      <h5 className="text-[10px] font-black uppercase text-slate-800 leading-none">{cert.name} Compliance</h5>
                      <span className="text-[7px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded leading-none">
                        {cert.sub}
                      </span>
                      <p className="text-[6.5px] text-slate-500 font-semibold px-2 leading-relaxed">
                        This is to certify that MEATIN Processing facility meets standard guidelines for:
                      </p>
                      <p className="text-[7.5px] text-slate-800 font-bold leading-tight uppercase font-manrope">
                        {cert.desc}
                      </p>
                    </div>

                    {/* Bottom Signature / Stamp / QR Seal Row */}
                    <div className="flex justify-between items-end w-full border-t border-slate-200/80 pt-2 mt-auto">
                      {/* Left: signature */}
                      <div className="flex flex-col items-start gap-0.5">
                        <div className="w-8 h-3 relative">
                          {/* Signature line placeholder */}
                          <div className="absolute bottom-1.5 left-0 right-0 h-[0.5px] bg-slate-400" />
                        </div>
                        <span className="text-[5px] text-slate-400 font-bold uppercase leading-none">FACILITY HEAD</span>
                      </div>

                      {/* Center: Gold Stamp seal */}
                      <div className="w-6 h-6 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      {/* Right: QR Code box */}
                      <div className="w-7 h-7 bg-white border border-slate-300 p-0.5 flex items-center justify-center shrink-0">
                        <div className="w-full h-full bg-slate-800 grid grid-cols-3 gap-0.5 opacity-90 p-[2px]">
                          {/* Mini QR grid layout */}
                          <div className="bg-white"></div><div className="bg-slate-800"></div><div className="bg-white"></div>
                          <div className="bg-slate-800"></div><div className="bg-white"></div><div className="bg-slate-800"></div>
                          <div className="bg-white"></div><div className="bg-slate-800"></div><div className="bg-white"></div>
                        </div>
                      </div>
                    </div>

                    {/* Cert Number stamp */}
                    <div className="text-[5.5px] font-mono text-slate-400 mt-1 uppercase">
                      ID: {cert.certNo}
                    </div>
                  </div>

                  {/* Card Content & Action Button */}
                  <div className="w-full space-y-4 mt-6">
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-[#1F5A3C] font-barlow tracking-wide leading-none">{cert.name}</h4>
                      <p className="text-xs text-slate-500 font-medium font-manrope">Reg. No: {cert.certNo}</p>
                    </div>
                    
                    <button className="w-full py-2.5 px-4 bg-[#1F5A3C] hover:bg-[#127431] transition-colors duration-300 text-white font-manrope font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Certificate
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
