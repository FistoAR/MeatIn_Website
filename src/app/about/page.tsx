'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  Users 
} from 'lucide-react';
import CareersBanner from '@/components/layout/CareersBanner';

export default function AboutUsPage() {
  const stats = [
    {
      value: "30+",
      label: "ACRES",
      desc: "OF INTEGRATED LAND",
      icon: MapPin
    },
    {
      value: "82,000+",
      label: "SQ.FT.",
      desc: "OF PLANT SPACE",
      icon: Building2
    },
    {
      value: "45,000+",
      label: "KG",
      desc: "PROCESSING CAPACITY",
      icon: Scale
    },
    {
      value: "300+",
      label: "TONS",
      desc: "COLD STORAGE CAPACITY",
      icon: Warehouse
    },
    {
      value: "15+",
      label: "VEHICLES",
      desc: "IN LOGISTICS NETWORK",
      icon: Truck
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
      icon: Gem
    },
    {
      title: "QUALITY",
      desc: "Excellence in every product.",
      icon: Award
    },
    {
      title: "FRESHNESS",
      desc: "Honest process, always.",
      icon: Leaf
    },
    {
      title: "CUSTOMER SATISFACTION",
      desc: "Your satisfaction, our promise.",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F3F3] font-manrope overflow-x-hidden">
      
      {/* 1. HERO HEADER BANNER SECTION */}
      <section className="relative w-full bg-[#153520] pt-[120px] pb-24 md:pt-[150px] md:pb-32 overflow-hidden">
        {/* Background Image Overlay with full opacity from public folder */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/AboutUs/about-us-hero-image.webp"
            alt="MEATIN Integrated Farming"
            fill
            priority
            className="object-cover object-center brightness-[0.85]"
          />
          {/* Soft dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#153520]/25" />
        </div>

        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-4xl"
          >
            <h2 className="text-[#D4A437] font-black font-manrope tracking-widest text-xs sm:text-sm uppercase flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#D4A437]" /> WHAT IS MEATIN?
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-extrabold font-barlow tracking-normal uppercase leading-tight">
              <span className="text-white block">WE ENGINEER</span>
              <span className="text-[#7CB325] block">QUALITY INTO</span>
              <span className="text-white block">EVERY CUT.</span>
            </h1>
            <p className="text-slate-100 text-sm sm:text-base md:text-lg font-medium max-w-xl leading-relaxed">
              Integrated farming, scientific processing, and cold-chain distribution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS OVERLAY SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto bg-[#153520] text-white rounded-[24px] shadow-[0_12px_36px_rgba(0,0,0,0.15)] py-6 sm:py-8 px-4 sm:px-6 md:px-8 border border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 md:gap-y-10 lg:gap-y-0 divide-y sm:divide-y-0 lg:divide-x divide-white/10 items-start">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left px-3 lg:px-6">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#7CB325] font-barlow mb-2">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#7CB325] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-[10px] sm:text-xs font-bold text-white leading-tight">{stat.label}</h4>
                      <p className="text-[9px] sm:text-[10px] text-slate-300 font-medium tracking-wide uppercase leading-tight">{stat.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 3. WHO IS MEATIN SECTION */}
      <section className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Side: Plant Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative w-full h-[280px] sm:h-[400px] lg:h-[480px] rounded-[32px] overflow-hidden shadow-lg border border-slate-200"
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
            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl font-extrabold font-barlow tracking-tight uppercase leading-none">
                <span className="text-[#153520] block">WHO IS</span>
                <span className="text-[#D62828] block">MEATIN?</span>
              </h2>
              <div className="h-[3px] w-14 bg-[#7CB325]" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#153520]">Building a better meat ecosystem.</h3>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                MEATIN delivers safe, hygienic meat through scientific processing and controlled cold-chain systems, built on quality, safety, and halal-certified standards. Our integrated approach ensures reliable production and distribution. From responsible sourcing to advanced infrastructure, we are building a better meat ecosystem.
              </p>
            </div>

            {/* Stamp Badges Row */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="relative w-44 h-16">
                <Image
                  src="/AboutUs/quality-is-our-promise.webp"
                  alt="Quality is our promise"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="relative w-28 h-16">
                <Image
                  src="/AboutUs/keralas-original.webp"
                  alt="Kerala's Original Meat"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            {/* Circular Highlights badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              {highlights.map((hl, idx) => {
                const Icon = hl.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#EAF3E7] flex items-center justify-center text-[#395B20]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-800 tracking-wide uppercase leading-tight">
                      {hl.title}
                    </span>
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>
      </section>

      {/* 4. MISSION & VISION SPLIT GRID */}
      <section className="relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[480px]">
          
          {/* Mission Box */}
          <div className="relative px-6 py-16 sm:px-12 lg:px-20 lg:py-24 flex flex-col justify-center text-white overflow-hidden min-h-[380px]">
            <Image
              src="/AboutUs/mission-bg.webp"
              alt="Our Mission background"
              fill
              className="object-cover brightness-[0.35] z-0"
              sizes="50vw"
            />
            <div className="relative z-10 space-y-6">
              <div className="relative">
                <span className="absolute -top-12 left-0 text-7xl sm:text-8xl font-black text-white/10 select-none">01</span>
                <span className="text-[#D4A437] font-black text-xs sm:text-sm tracking-wider uppercase block mb-1">OUR</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#D62828] font-barlow tracking-wide uppercase">MISSION</h2>
              </div>
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-lg">
                Build value-added meat products, farming, and food supply chains while delivering <span className="text-[#D62828] font-bold">quality, service</span> and <span className="text-[#D62828] font-bold">sustainable</span> food system.
              </p>
            </div>
          </div>

          {/* Vision Box */}
          <div className="relative px-6 py-16 sm:px-12 lg:px-20 lg:py-24 flex flex-col justify-center text-white overflow-hidden min-h-[380px]">
            <Image
              src="/AboutUs/vision-bg.webp"
              alt="Our Vision background"
              fill
              className="object-cover brightness-[0.35] z-0"
              sizes="50vw"
            />
            <div className="relative z-10 space-y-6">
              <div className="relative">
                <span className="absolute -top-12 left-0 text-7xl sm:text-8xl font-black text-white/10 select-none">02</span>
                <span className="text-[#D4A437] font-black text-xs sm:text-sm tracking-wider uppercase block mb-1">OUR</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#7CB325] font-barlow tracking-wide uppercase">VISION</h2>
              </div>
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-lg">
                Become a leader in <span className="text-[#7CB325] font-bold">value-added</span> meat processing and a trusted premium-quality food supplier.
              </p>
            </div>
          </div>

        </div>

        {/* 5. FLOATING CORE VALUES CONTAINER CARD */}
        <div className="w-full max-w-[1400px] lg:max-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F8FAF7] rounded-[24px] border border-[#E5EAE1] shadow-[0_12px_36px_rgba(0,0,0,0.06)] p-6 sm:p-8 text-center space-y-6"
          >
            <h3 className="text-xs sm:text-sm font-bold text-[#1F5A3C] tracking-widest uppercase flex items-center justify-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#1F5A3C]" /> OUR VALUES <span className="w-6 h-[1.5px] bg-[#1F5A3C]" />
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[#E5EAE1] items-start">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0">
                    <div className="w-12 h-12 rounded-full bg-[#EAF3E7] flex items-center justify-center text-[#1F5A3C] mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#000000] mb-1">{val.title}</h4>
                    <p className="text-xs text-[#535353] font-medium leading-normal">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </section>

      {/* 6. CAREERS BANNER WRAPPER */}
      <section className="bg-[#F3F3F3]">
        <CareersBanner />
      </section>

    </div>
  );
}
