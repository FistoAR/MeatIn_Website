'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// Types for Pin Outlets
interface OutletInfo {
  id: string;
  city: string;
  malayalam: string;
  address: string;
  phone: string;
  xPercent: number;
  yPercent: number;
}

export default function FranchisePage() {
  // Map View Mode: 'full' (India Map) | 'kerala' (Kerala State Map)
  const [mapMode, setMapMode] = useState<'full' | 'kerala'>('full');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedOutlet, setSelectedOutlet] = useState<OutletInfo | null>(null);

  // India Map Hotspot Outlets
  const indiaOutlets: OutletInfo[] = [
    {
      id: 'kerala',
      city: 'Kerala',
      malayalam: 'കേരളം',
      address: 'MEATIN Regional Head Office, Panchami Complex, Thrissur - 680519',
      phone: '+91 99466 16162',
      xPercent: 47.0,
      yPercent: 78.0,
    },
    {
      id: 'bengaluru',
      city: 'Bengaluru',
      malayalam: 'ബെംഗളൂരു',
      address: 'MEATIN Express Outlet, Indiranagar, Bengaluru, Karnataka - 560038',
      phone: '+91 99466 16162',
      xPercent: 51.0,
      yPercent: 68.0,
    },
    {
      id: 'mumbai',
      city: 'Mumbai',
      malayalam: 'മുംബൈ',
      address: 'MEATIN Store, Bandra West, Mumbai, Maharashtra - 400050',
      phone: '+91 99466 16162',
      xPercent: 38.0,
      yPercent: 57.0,
    },
    {
      id: 'hyderabad',
      city: 'Hyderabad',
      malayalam: 'ഹൈദരാബാദ്',
      address: 'MEATIN Fresh Hub, Jubilee Hills, Hyderabad, Telangana - 500033',
      phone: '+91 99466 16162',
      xPercent: 50.0,
      yPercent: 61.0,
    },
    {
      id: 'kolkata',
      city: 'Kolkata',
      malayalam: 'കൊൽക്കത്ത',
      address: 'MEATIN Store, Salt Lake Sector 5, Kolkata, West Bengal - 700091',
      phone: '+91 99466 16162',
      xPercent: 69.0,
      yPercent: 48.0,
    },
    {
      id: 'lucknow',
      city: 'Lucknow',
      malayalam: 'ലക്നൗ',
      address: 'MEATIN Store, Gomti Nagar, Lucknow, Uttar Pradesh - 226010',
      phone: '+91 99466 16162',
      xPercent: 55.0,
      yPercent: 37.0,
    },
    {
      id: 'delhi',
      city: 'Delhi',
      malayalam: 'ഡൽഹി',
      address: 'MEATIN Prime Hub, Connaught Place, New Delhi - 110001',
      phone: '+91 99466 16162',
      xPercent: 47.0,
      yPercent: 30.0,
    },
  ];

  // Kerala Map Hotspot Outlets
  const keralaOutlets: OutletInfo[] = [
    {
      id: 'kasaragod',
      city: 'Kasaragod',
      malayalam: 'കാസർഗോഡ്',
      address: 'MEATIN Store, MG Road, Kasaragod - 671121',
      phone: '+91 99466 16162',
      xPercent: 33.0,
      yPercent: 10.0,
    },
    {
      id: 'kannur',
      city: 'Kannur',
      malayalam: 'കണ്ണൂർ',
      address: 'MEATIN Outlet, City Centre Complex, Fort Road, Kannur - 670001',
      phone: '+91 99466 16162',
      xPercent: 35.0,
      yPercent: 19.0,
    },
    {
      id: 'kozhikode',
      city: 'Kozhikode',
      malayalam: 'കോഴിക്കോട്',
      address: 'MEATIN Outlet, Focus Mall Road, Kozhikode - 673004',
      phone: '+91 99466 16162',
      xPercent: 38.0,
      yPercent: 29.0,
    },
    {
      id: 'malappuram',
      city: 'Malappuram',
      malayalam: 'മലപ്പുറം',
      address: 'MEATIN Hub, Calicut Road, Malappuram - 676505',
      phone: '+91 99466 16162',
      xPercent: 46.0,
      yPercent: 37.0,
    },
    {
      id: 'thrissur',
      city: 'Thrissur',
      malayalam: 'തൃശ്ശൂർ',
      address: 'MEATIN Flagship Store, Perumpilavu, Thrissur - 680519',
      phone: '+91 99466 16162',
      xPercent: 50.0,
      yPercent: 46.0,
    },
    {
      id: 'ernakulam',
      city: 'Ernakulam / Kochi',
      malayalam: 'എറണാകുളം',
      address: 'MEATIN Prime Outlet, MG Road, Kochi - 682016',
      phone: '+91 99466 16162',
      xPercent: 51.0,
      yPercent: 55.0,
    },
    {
      id: 'kottayam',
      city: 'Kottayam',
      malayalam: 'കോട്ടയം',
      address: 'MEATIN Store, KK Road, Kottayam - 686001',
      phone: '+91 99466 16162',
      xPercent: 54.0,
      yPercent: 63.0,
    },
    {
      id: 'alappuzha',
      city: 'Alappuzha',
      malayalam: 'ആലപ്പുഴ',
      address: 'MEATIN Fresh Hub, Boat Jetty Road, Alappuzha - 688001',
      phone: '+91 99466 16162',
      xPercent: 55.0,
      yPercent: 70.0,
    },
    {
      id: 'kollam',
      city: 'Kollam',
      malayalam: 'കൊല്ലം',
      address: 'MEATIN Outlet, Chinnakada, Kollam - 691001',
      phone: '+91 99466 16162',
      xPercent: 57.0,
      yPercent: 78.0,
    },
    {
      id: 'thiruvananthapuram',
      city: 'Thiruvananthapuram',
      malayalam: 'തിരുവനന്തപുരം',
      address: 'MEATIN Main Outlet, MG Road, Statue, Thiruvananthapuram - 695001',
      phone: '+91 99466 16162',
      xPercent: 68.0,
      yPercent: 87.0,
    },
  ];

  const activeOutlets = mapMode === 'full' ? indiaOutlets : keralaOutlets;

  // Zoom Handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setSelectedOutlet(null);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-slate-800 font-manrope selection:bg-[#127431] selection:text-white overflow-x-hidden pt-0">
      {/* ============================================================ */}
      {/* SECTION 1: HERO & STORE SHOWCASE (EXACT MATCH TO DESIGN) */}
      {/* ============================================================ */}
      <section className="relative w-full pt-[95px] md:pt-[115px] pb-6 lg:pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#D8E6F5] via-[#EAF2F9] to-[#FAF7F2] overflow-hidden select-none">
        {/* Sky Cloud Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-multiply">
          <Image
            src="/Franchies/bg.webp"
            alt="Sky Background Texture"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Top Right Background Doodle Accent */}
        <div className="absolute top-0 right-0 z-0 pointer-events-none w-[180px] sm:w-[240px] md:w-[320px] opacity-75">
          <Image
            src="/Franchies/topRight.webp"
            alt="Top Right Background Accent"
            width={320}
            height={320}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Left Bottom Corner Trees Accent */}
        <div className="absolute bottom-0 left-0 z-0 pointer-events-none w-[140px] sm:w-[200px] md:w-[260px] opacity-90">
          <Image
            src="/Franchies/leftBottom.webp"
            alt="Left Bottom Trees Accent"
            width={260}
            height={180}
            priority
            className="w-full h-auto object-contain object-bottom"
          />
        </div>

        {/* Right Bottom Corner Accent */}
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none w-[140px] sm:w-[200px] md:w-[260px] opacity-90">
          <Image
            src="/Franchies/RightBottom.webp"
            alt="Right Bottom Accent"
            width={260}
            height={180}
            priority
            className="w-full h-auto object-contain object-bottom"
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Header Title Block */}
          <div className="text-center space-y-1 mb-4 lg:mb-6 mt-1 md:mt-2">
            {/* Subtitle: — GROWTH WITH — */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center gap-3 text-[13px] md:text-[15px] font-bold text-[#82B224] tracking-[3px] uppercase font-manrope"
            >
              <span className="w-10 h-[2px] bg-gradient-to-r from-transparent via-[#EAB308] to-[#82B224] rounded-full" />
              GROWTH WITH
              <span className="w-10 h-[2px] bg-gradient-to-l from-transparent via-[#EAB308] to-[#82B224] rounded-full" />
            </motion.div>

            {/* Main Brand Title: MEATIN */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold font-barlow-condensed tracking-wider uppercase leading-none"
            >
              <span className="text-[#82B224]">MEAT</span>
              <span className="text-[#D62828]">IN</span>
            </motion.h1>
          </div>

          {/* Hero Store Interactive Canvas */}
          <div className="relative w-full max-w-[1240px] mx-auto h-[520px] sm:h-[550px] md:h-[580px] flex items-center justify-center">
            {/* Center 3D Store Graphic */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-[300px] sm:w-[440px] md:w-[580px] lg:w-[650px] h-auto z-20 mx-auto drop-shadow-2xl hover:scale-[1.01] transition-transform duration-500"
            >
              <Image
                src="/Franchies/imagesec1.webp"
                alt="MEATIN Outlet Storefront"
                width={820}
                height={620}
                priority
                className="w-full h-auto object-contain pointer-events-none"
              />
            </motion.div>

            {/* SVG Connector Dotted Lines & Red Dots Overlay (Desktop) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block" viewBox="0 0 1200 580" fill="none">
              {/* Item 01 Dotted Line (Left Top) */}
              <path d="M 220 100 L 285 100 Q 295 100 295 110 L 295 195 Q 295 205 310 205 L 365 205" stroke="#82B224" strokeWidth="1.8" strokeDasharray="4 4" />
              <circle cx="367" cy="205" r="4.5" fill="#D62828" />

              {/* Item 02 Dotted Line (Left Mid) */}
              <path d="M 220 300 L 270 300 Q 290 300 290 310 L 290 380 Q 290 390 300 390 L 350 390" stroke="#82B224" strokeWidth="1.8" strokeDasharray="4 4" />
              <circle cx="352" cy="390" r="4.5" fill="#D62828" />

              {/* Item 03 Dotted Line (Left Bottom) */}
              <path d="M 220 480 C 270 480, 285 460, 335 460" stroke="#82B224" strokeWidth="1.8" strokeDasharray="4 4" />
              <circle cx="337" cy="460" r="4.5" fill="#D62828" />

              {/* Item 04 Dotted Line (Right Top) */}
              <path d="M 980 140 L 915 140 Q 900 140 900 155 L 900 260 Q 900 270 885 270 L 845 270" stroke="#82B224" strokeWidth="1.8" strokeDasharray="4 4" />
              <circle cx="843" cy="270" r="4.5" fill="#D62828" />

              {/* Item 05 Dotted Line (Right Mid) */}
              <path d="M 980 330 L 930 330 Q 910 330 910 345 L 910 400 Q 910 410 890 410 L 850 410" stroke="#82B224" strokeWidth="1.8" strokeDasharray="4 4" />
              <circle cx="848" cy="410" r="4.5" fill="#D62828" />

              {/* Item 06 Dotted Line (Right Bottom) */}
              <path d="M 980 500 L 920 500 Q 895 500 895 520 L 895 535 Q 895 535 880 535 L 835 535" stroke="#82B224" strokeWidth="1.8" strokeDasharray="4 4" />
              <circle cx="833" cy="535" r="4.5" fill="#D62828" />
            </svg>

            {/* LEFT 3 FEATURE BADGES (01, 02, 03) */}
            <div className="absolute left-0 top-0 bottom-0 z-30 pointer-events-auto hidden lg:block w-[280px]">
              {/* Feature 01: HYGIENIC PROCESSING */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-[60px] left-0 flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200/90 shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#82B224] transition-all duration-300">
                  <Icon icon="uit:microscope" className="w-7 h-7 text-[#127431] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#D62828] font-barlow-condensed leading-none block">01</span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[14px] font-extrabold text-[#153520] uppercase tracking-wider font-barlow-condensed leading-tight">
                    HYGIENIC<br />PROCESSING
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-manrope max-w-[160px]">
                    Processed under strict hygiene standards.
                  </p>
                </div>
              </motion.div>

              {/* Feature 02: PREMIUM QUALITY */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-[260px] left-0 flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200/90 shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#82B224] transition-all duration-300">
                  <Icon icon="tdesign:secured" className="w-7 h-7 text-[#127431] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#D62828] font-barlow-condensed leading-none block">02</span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[14px] font-extrabold text-[#153520] uppercase tracking-wider font-barlow-condensed leading-tight">
                    PREMIUM<br />QUALITY
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-manrope max-w-[160px]">
                    Handpicked for superior freshness.
                  </p>
                </div>
              </motion.div>

              {/* Feature 03: FARM FRESH */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-[440px] left-0 flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200/90 shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#82B224] transition-all duration-300">
                  <Icon icon="ph:farm-light" className="w-7 h-7 text-[#127431] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#D62828] font-barlow-condensed leading-none block">03</span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[14px] font-extrabold text-[#153520] uppercase tracking-wider font-barlow-condensed leading-tight">
                    FARM FRESH
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-manrope max-w-[160px]">
                    Sourced from trusted local farms.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT 3 FEATURE BADGES (04, 05, 06) */}
            <div className="absolute right-0 top-0 bottom-0 z-30 pointer-events-auto hidden lg:block w-[280px]">
              {/* Feature 04: NO ARTIFICIAL ADDITIVES */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-[100px] right-0 flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200/90 shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#82B224] transition-all duration-300">
                  <Icon icon="famicons:leaf-outline" className="w-7 h-7 text-[#127431] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#D62828] font-barlow-condensed leading-none block">04</span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[14px] font-extrabold text-[#153520] uppercase tracking-wider font-barlow-condensed leading-tight">
                    NO ARTIFICIAL<br />ADDITIVES
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-manrope max-w-[160px]">
                    Free from artificial preservatives.
                  </p>
                </div>
              </motion.div>

              {/* Feature 05: FRESHNESS GUARANTEED */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-[290px] right-0 flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200/90 shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#82B224] transition-all duration-300">
                  <Icon icon="material-symbols-light:box-outline" className="w-7 h-7 text-[#127431] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#D62828] font-barlow-condensed leading-none block">05</span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[14px] font-extrabold text-[#153520] uppercase tracking-wider font-barlow-condensed leading-tight">
                    FRESHNESS<br />GUARANTEED
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-manrope max-w-[160px]">
                    Packed to lock in freshness.
                  </p>
                </div>
              </motion.div>

              {/* Feature 06: FAST DELIVERY */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-[460px] right-0 flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200/90 shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#82B224] transition-all duration-300">
                  <Icon icon="carbon:delivery" className="w-7 h-7 text-[#127431] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#D62828] font-barlow-condensed leading-none block">06</span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[14px] font-extrabold text-[#153520] uppercase tracking-wider font-barlow-condensed leading-tight">
                    FAST<br />DELIVERY
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-manrope max-w-[160px]">
                    Fresh meat delivered to your doorstep.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Grid Layout for 6 Features (Below 1024px) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 lg:hidden">
            {[
              { num: '01', title: 'HYGIENIC PROCESSING', desc: 'Processed under strict hygiene standards.', icon: 'uit:microscope' },
              { num: '02', title: 'PREMIUM QUALITY', desc: 'Handpicked for superior freshness.', icon: 'tdesign:secured' },
              { num: '03', title: 'FARM FRESH', desc: 'Sourced from trusted local farms.', icon: 'ph:farm-light' },
              { num: '04', title: 'NO ARTIFICIAL ADDITIVES', desc: 'Free from artificial preservatives.', icon: 'famicons:leaf-outline' },
              { num: '05', title: 'FRESHNESS GUARANTEED', desc: 'Packed to lock in freshness.', icon: 'material-symbols-light:box-outline' },
              { num: '06', title: 'FAST DELIVERY', desc: 'Fresh meat delivered to your doorstep.', icon: 'carbon:delivery' },
            ].map((feat, i) => (
              <div key={i} className="bg-white/90 border border-slate-200 p-3 rounded-2xl shadow-sm flex flex-col items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-[#F3F8EF] flex items-center justify-center shrink-0">
                  <Icon icon={feat.icon} className="w-5 h-5 text-[#127431]" />
                </div>
                <div>
                  <span className="text-sm font-black text-[#D62828] font-barlow-condensed leading-none block">{feat.num}</span>
                  <h4 className="text-[12px] font-extrabold text-slate-900 uppercase font-barlow-condensed leading-tight mt-0.5">{feat.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5 font-manrope">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: INTERACTIVE PRESENCE MAP (FULL WIDTH & 75VH MAP) */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-screen flex flex-col justify-between bg-[#F0F0F0] overflow-hidden select-none py-4 lg:py-6">
        {/* Full-Width Section Content Wrapper (No Max-Width Constraint) */}
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 flex-1 flex flex-col justify-center relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* LEFT HALF (lg:col-span-6): Text Content + 3 Stat Cards in Row + Map Switcher */}
            <div className="lg:col-span-6 space-y-6 lg:space-y-8 pr-0 lg:pr-6">
              {/* Header Title + Subtitle Block */}
              <div className="space-y-3">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-barlow-condensed tracking-wider uppercase leading-[1.05]"
                >
                  <span className="text-[#127431]">OUR PRESENCE</span> <br />
                  <span className="text-[#127431]">ACROSS</span> <span className="text-[#D62828]">{mapMode === 'kerala' ? 'KERALA' : 'INDIA'}</span>
                </motion.h2>
                <p className="text-[14px] lg:text-[16px] font-medium text-slate-600 leading-relaxed font-manrope max-w-lg">
                  Building a stronger network to serve you better with freshness and trust across the state.
                </p>
              </div>

              {/* 3 Stat Cards arranged Side-by-Side in a Row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {/* Card 1: Stores */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-md text-center flex flex-col items-center justify-between min-h-[160px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0 mb-1">
                    <svg className="w-5 h-5 text-[#D62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D62828] font-barlow-condensed leading-none block">
                      100+
                    </span>
                    <span className="text-[12px] lg:text-[13px] font-bold text-slate-900 uppercase tracking-wider font-barlow-condensed block mt-1">
                      STORES
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium font-manrope block leading-tight">
                      Across Kerala
                    </span>
                  </div>
                </motion.div>

                {/* Card 2: Districts */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-md text-center flex flex-col items-center justify-between min-h-[160px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0 mb-1">
                    <svg className="w-5 h-5 text-[#D62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D62828] font-barlow-condensed leading-none block">
                      14
                    </span>
                    <span className="text-[12px] lg:text-[13px] font-bold text-slate-900 uppercase tracking-wider font-barlow-condensed block mt-1">
                      DISTRICTS
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium font-manrope block leading-tight">
                      Strong Presence
                    </span>
                  </div>
                </motion.div>

                {/* Card 3: Team Members */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-md text-center flex flex-col items-center justify-between min-h-[160px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0 mb-1">
                    <svg className="w-5 h-5 text-[#D62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D62828] font-barlow-condensed leading-none block">
                      500+
                    </span>
                    <span className="text-[12px] lg:text-[13px] font-bold text-slate-900 uppercase tracking-wider font-barlow-condensed block mt-1">
                      TEAM MEMBERS
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium font-manrope block leading-tight">
                      Serving with Pride
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Toggle Map View Switcher Button */}
              <div>
                <button
                  onClick={() => {
                    const newMode = mapMode === 'full' ? 'kerala' : 'full';
                    setMapMode(newMode);
                    setSelectedOutlet(null);
                  }}
                  className="w-full max-w-md bg-[#127431] hover:bg-[#0e5c27] text-white font-bold text-[14px] lg:text-[15px] py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider font-barlow-condensed shadow-lg transition-all duration-300 hover:shadow-emerald-900/20 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>{mapMode === 'full' ? 'VIEW KERALA DISTRICT MAP →' : '← BACK TO FULL INDIA MAP'}</span>
                </button>
              </div>
            </div>

            {/* RIGHT HALF (lg:col-span-6): Map Display with 75vh Height */}
            <div className="lg:col-span-6 relative h-[75vh] min-h-[520px] max-h-[760px] flex items-center justify-center">
              {/* Dark Green Zoom Controls Pill (Top Right) */}
              <div className="absolute top-2 right-2 z-40 bg-[#153520] text-white p-2.5 rounded-2xl shadow-xl flex flex-col items-center gap-2.5 font-manrope text-[11px]">
                <button
                  onClick={handleZoomIn}
                  className="flex flex-col items-center gap-0.5 hover:text-[#82B224] transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                  <span>Zoom In</span>
                </button>
                <button
                  onClick={handleZoomOut}
                  className="flex flex-col items-center gap-0.5 hover:text-[#82B224] transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                  <span>Zoom Out</span>
                </button>
                <button
                  onClick={handleResetZoom}
                  className="flex flex-col items-center gap-0.5 hover:text-[#82B224] transition-colors cursor-pointer"
                  title="Reset View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Reset</span>
                </button>
              </div>

              {/* Map Canvas Container with Zoom Transform */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* 3D Map SVG Illustration (Sized to fill 75vh canvas) */}
                <div className="relative h-full w-auto aspect-[908/982] max-w-full">
                  <Image
                    src={mapMode === 'full' ? '/Franchies/fullMap.svg' : '/Franchies/KeralaMap.svg'}
                    alt={mapMode === 'full' ? '3D India Map' : '3D Kerala State Map'}
                    fill
                    priority
                    className="object-contain drop-shadow-2xl select-none"
                  />

                  {/* INVISIBLE CLICKABLE HOTSPOTS OVER SVG BUILT-IN PINS */}
                  {activeOutlets.map((outlet) => {
                    const isSelected = selectedOutlet?.id === outlet.id;

                    return (
                      <div
                        key={outlet.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group w-12 h-12 flex items-center justify-center"
                        style={{
                          left: `${outlet.xPercent}%`,
                          top: `${outlet.yPercent}%`,
                        }}
                        onClick={() => {
                          if (mapMode === 'full' && outlet.id === 'kerala') {
                            setMapMode('kerala');
                            setSelectedOutlet(null);
                          } else {
                            setSelectedOutlet(outlet);
                          }
                        }}
                        title={`Click to view ${outlet.city} outlet details`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.3 }}
                          className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                            isSelected
                              ? 'border-[#D62828] bg-[#D62828]/30 scale-125 shadow-lg animate-pulse'
                              : 'border-transparent group-hover:border-[#D62828]/60 group-hover:bg-[#D62828]/20'
                          }`}
                        />
                      </div>
                    );
                  })}

                  {/* POPUP INFO CARD OVERLAY */}
                  <AnimatePresence>
                    {selectedOutlet && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 15 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-5 shadow-2xl w-[280px] sm:w-[310px] pointer-events-auto"
                        style={{
                          left: `${Math.min(Math.max(selectedOutlet.xPercent, 20), 75)}%`,
                          top: `${Math.min(Math.max(selectedOutlet.yPercent - 10, 15), 75)}%`,
                          transform: 'translate(-50%, -100%)',
                        }}
                      >
                        {/* Red Dashed Line connecting card to pin */}
                        <svg className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-6 h-7 pointer-events-none" viewBox="0 0 24 28">
                          <path d="M12 0 L12 28" stroke="#D62828" strokeWidth="2" strokeDasharray="3 3" />
                        </svg>

                        {/* Popup Header with Close Button */}
                        <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-3">
                          <div>
                            <h3 className="text-xl font-extrabold text-slate-900 tracking-wide font-barlow-condensed leading-none">
                              {selectedOutlet.city}
                            </h3>
                            <span className="text-sm font-medium text-slate-500 font-manrope block mt-0.5">
                              {selectedOutlet.malayalam}
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedOutlet(null)}
                            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 text-sm font-bold"
                            title="Close Card"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Popup Content: Address & Phone */}
                        <div className="space-y-3 text-[12px] lg:text-[13px] text-slate-700 font-manrope">
                          <div className="flex items-start gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0 mt-0.5">
                              <svg className="w-3.5 h-3.5 text-[#D62828]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                            </div>
                            <p className="leading-snug text-slate-700 font-medium">
                              {selectedOutlet.address}
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5 pt-1">
                            <div className="w-5 h-5 rounded-full bg-[#EBF3EC] flex items-center justify-center shrink-0">
                              <svg className="w-3.5 h-3.5 text-[#127431]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <span className="font-bold text-slate-900 tracking-wide font-manrope">
                              {selectedOutlet.phone}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Slope Image Transition (Pinned to bottom of Section 2) */}
        <div className="relative w-full h-[65px] sm:h-[95px] md:h-[120px] lg:h-[140px] shrink-0 pointer-events-none mt-4">
          <Image
            src="/Franchies/bottomSlope.webp"
            alt="Green Slope Transition"
            fill
            priority
            className="object-cover object-top w-full"
          />
        </div>
      </section>
    </div>
  );
}
