'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TrustedQualityBanner from '@/components/layout/TrustedQualityBanner';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 60, damping: 14 }
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
      image: "/Home/brand-story/images/healthy-livestock.webp"
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
      icon: "/Home/certifications/fssai-icon-image.webp",
      certificateImage: "/Home/certifications/fssai.webp",
      pdf: "/Home/certifications/certificates/FSSAI Central License (New)-2025-30 (1).pdf"
    },
    {
      name: "ISO",
      sub: "CERTIFIED",
      desc: "International Organization for Standardization.",
      icon: "/Home/certifications/iso-icon-image.webp",
      certificateImage: "/Home/certifications/iso-certificate-image.webp"
    },
    {
      name: "HACCP",
      sub: "CERTIFIED",
      desc: "Hazard Analysis and Critical Control Points Compliant.",
      icon: "/Home/certifications/haccp-icon-image.webp",
      certificateImage: "/Home/certifications/haccp-certificate-image.webp"
    },
    {
      name: "HALAL",
      sub: "CERTIFIED",
      desc: "Halal Certified Process and Product Assurance.",
      icon: "/Home/certifications/halal-icon-image.webp",
      certificateImage: "/Home/certifications/halal-certificate-image.webp",
      pdf: "/Home/certifications/certificates/Halal Cerificate 2025-2028.pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0] overflow-x-hidden font-manrope">

      {/* 1. HERO BANNER */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center bg-black pt-[6rem] overflow-hidden">
        {/* Factory drone shot background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/Home/Hero/hero-image.webp"
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
                <h1 className="text-5xl sm:text-7xl lg:text-[6vw] xl:text-[6.5vw] font-bold font-barlow tracking-tight uppercase leading-[0.9] space-y-1">
                  <span className="block text-[#87B71D]">MEATIN:</span>
                  <span className="block text-white">PURE QUALITY.</span>
                  <span className="block text-white">TRUSTED MEAT.</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-white text-base sm:text-lg md:text-xl font-normal leading-relaxed font-inter max-w-xl">
                  South India&apos;s <span className="text-[#87B71D] font-bold">Largest</span> Multi Species <span className="text-[#87B71D] font-bold">Meat</span> Processing Plant
                </p>
              </motion.div>
            </div>

            {/* Right stamp overlay badge */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                className="relative w-64 h-32 sm:w-72 sm:h-36 lg:w-80 lg:h-40 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
              >
                <Image
                  src="/AboutUs/keralas-original.webp"
                  alt="Kerala's Original Meat Badge"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECOND SECTION (TRUCK LOGISTICS) */}
      <section className="relative w-full bg-[#EBF6E4] pt-8 pb-14 sm:pt-16 sm:pb-28 overflow-hidden flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Home/section-bg.webp')" }}>
        {/* Single Full Image Container with scroll-driven slide-in */}
        <motion.div 
          initial={{ x: "50%", opacity: 0.7 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 35, damping: 15 }}
          className="w-full relative h-[140px] sm:h-[220px] md:h-[280px] lg:h-[340px] z-10"
        >
          <Image
            src="/Home/truck-section/delivered-fresh-image.webp"
            alt="Meatin Delivery Truck and Features"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Wave SVG transition divider matching the Brand Story bg color */}
        <div className="absolute bottom-0 left-0 right-0 h-[35px] sm:h-[55px] md:h-[90px] w-full z-20 pointer-events-none overflow-hidden">
          <svg className="absolute bottom-0 w-full h-[35px] sm:h-[55px] md:h-[90px]" viewBox="0 0 1920 90" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0C755.182 107.73 1158.5 130.5 1920 0V130.5H0V0Z" fill="#60870C"/>
          </svg>
        </div>
      </section>

      {/* 3. BRAND STORY / TIMELINE SECTION */}
      <section
        className="relative w-full pt-20 pb-28 bg-[#61870d] text-white overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Home/section-bg.webp')" }}
      >


        <div className="w-full max-w-[1400px] lg:max-w-[92vw] mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">

          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 sm:w-12 bg-white" />
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white font-manrope">
                BRAND STORY
              </h4>
              <div className="h-[1.5px] w-8 sm:w-12 bg-white" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-[4vw] font-normal font-chau tracking-tight leading-none mb-4">
              More Then Meat. It&apos; <span className="text-[#FFC72C]">Our</span> Promise.
            </h2>
            <p className="text-[#F6F5F0]/90 text-sm sm:text-base max-w-2xl mx-auto font-manrope font-semibold leading-relaxed">
              From farm tp fork, every step we talk is guided by science, driven by care and delivered with trust.
            </p>
          </motion.div>

          {/* Timeline Cards Grid with Alternating Staggered Heights */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 xl:gap-4 items-stretch pt-8 pb-10"
          >
            {storySteps.map((step, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className={`bg-white rounded-[20px] border border-white/80 shadow-lg hover:shadow-2xl hover:scale-[1.03] flex flex-col justify-between h-max overflow-hidden group transition-all duration-300 min-h-[480px] relative ${idx % 2 === 0 ? 'xl:-mt-10' : 'xl:mt-14'}`}
                >
                  {/* Top Image Frame (with icon and title inside) */}
                  <div className="relative w-full h-[380px] overflow-hidden flex flex-col justify-end pb-4 items-center">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Bottom gradient fade to white */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/75 to-transparent z-10" />

                    {/* Icon */}
                    <div className="relative z-20 w-[64px] h-[64px] drop-shadow-md mb-4">
                      <Image
                        src={step.icon}
                        alt={`${step.title} icon`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h4 className="relative z-20 text-[#153520] font-extrabold text-[1.05rem] xl:text-[1rem] 2xl:text-[1.1rem] tracking-wide uppercase font-manrope leading-[1.5] text-center px-2 max-w-[90%]">
                      {step.title}
                    </h4>
                  </div>

                  {/* Bottom Text Panel */}
                  <div className="bg-white pb-8 px-4 flex-1 flex flex-col items-center justify-start text-center">
                    <p className="text-[#3A3A3A] text-[0.8rem] 2xl:text-[0.85rem] font-semibold leading-relaxed font-manrope max-w-[195px] mx-auto">
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
      <section className="relative w-full py-16 lg:py-24 overflow-hidden">

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center mb-24"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 sm:w-12 bg-[#D4A437]" />
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#153520] font-manrope">
                OUR PROMISE
              </h4>
              <div className="h-[1.5px] w-8 sm:w-12 bg-[#D4A437]" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-[4vw] font-normal font-chau tracking-tight leading-none mb-4">
              <span className="text-[#D62828]">Certified</span> <span className="text-[#153520]">Excellence</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto font-manrope font-semibold leading-relaxed">
              Our commitment to international food safety and quality standards.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-5">
              <div className="h-[1.5px] w-12 sm:w-16 bg-[#D4A437]" />
              <span className="w-2 h-2 rounded-full bg-[#D4A437]" />
              <div className="h-[1.5px] w-12 sm:w-16 bg-[#D4A437]" />
            </div>
          </motion.div>

          {/* Grid of certifications */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-y-16 md:gap-y-12 gap-x-6 lg:gap-x-8 lg:pl-12 xl:pl-24 items-stretch"
          >
            {certificates.map((cert, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white rounded-[32px] border border-slate-200/80 shadow-[0_12px_36px_rgba(0,0,0,0.035)] px-3.5 py-5 pt-14 flex flex-col justify-between items-center text-center relative hover:scale-[1.04] hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] hover:border-[#1F5A3C]/20 transition-all duration-300 ease-out min-h-[480px] certificate-parent-card"
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
                  <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-3 min-h-[250px]">
                    <Image
                      src={cert.certificateImage}
                      alt={`${cert.name} Certificate`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Action Buttons Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 w-full mt-auto">
                    <button
                      onClick={() => {
                        if (cert.pdf) {
                          window.open(cert.pdf, '_blank');
                        } else {
                          alert(`${cert.name} certificate PDF is currently unavailable and will be updated soon.`);
                        }
                      }}
                      className="bg-[#153520] hover:bg-[#1c452b] text-white text-[0.62rem] xl:text-[0.68rem] font-extrabold h-12 px-1 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-1 uppercase tracking-wide shadow-sm w-full whitespace-nowrap"
                    >
                      <svg className="w-3 h-3 text-[#D4A437] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Certificate
                    </button>
                    <button
                      onClick={() => {
                        if (cert.pdf) {
                          const link = document.createElement('a');
                          link.href = cert.pdf;
                          link.download = cert.pdf.split('/').pop() || 'certificate.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } else {
                          alert(`${cert.name} certificate PDF is currently unavailable and will be updated soon.`);
                        }
                      }}
                      className="bg-white hover:bg-slate-50 border border-[#153520] text-[#153520] text-[0.62rem] xl:text-[0.68rem] font-extrabold h-12 px-1 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95 hover:shadow-md flex items-center justify-center gap-1 uppercase tracking-wide shadow-sm w-full whitespace-nowrap"
                    >
                      <svg className="w-3 h-3 text-[#153520] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
