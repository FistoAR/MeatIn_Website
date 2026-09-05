"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

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
  const [mapMode, setMapMode] = useState<"full" | "kerala">("full");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedOutlet, setSelectedOutlet] = useState<OutletInfo | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Mouse hover spotlight position state for Hero Store reveal
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroImageContainerRef.current) return;
    const rect = heroImageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMousePos(null);
  };

  // Ref for Map Container Column & Popup Card
  const mapRightColRef = useRef<HTMLDivElement>(null);
  const popupCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close tooltip popup card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedOutlet &&
        popupCardRef.current &&
        !popupCardRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        if (!target.closest("[data-pin-element='true']")) {
          setSelectedOutlet(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedOutlet]);

  // India Map Hotspot Outlets
  const indiaOutlets: OutletInfo[] = [
    {
      id: "kerala",
      city: "Kerala",
      malayalam: "കേരളം",
      address:
        "MEATIN Regional Head Office, Panchami Complex, Thrissur - 680519",
      phone: "+91 99466 16162",
      xPercent: 47.0,
      yPercent: 78.0,
    },
    {
      id: "bengaluru",
      city: "Bengaluru",
      malayalam: "ബെംഗളൂരു",
      address:
        "MEATIN Express Outlet, Indiranagar, Bengaluru, Karnataka - 560038",
      phone: "+91 99466 16162",
      xPercent: 51.0,
      yPercent: 68.0,
    },
    {
      id: "mumbai",
      city: "Mumbai",
      malayalam: "മുംബൈ",
      address: "MEATIN Store, Bandra West, Mumbai, Maharashtra - 400050",
      phone: "+91 99466 16162",
      xPercent: 38.0,
      yPercent: 57.0,
    },
    {
      id: "hyderabad",
      city: "Hyderabad",
      malayalam: "ഹൈദരാബാദ്",
      address: "MEATIN Fresh Hub, Jubilee Hills, Hyderabad, Telangana - 500033",
      phone: "+91 99466 16162",
      xPercent: 50.0,
      yPercent: 61.0,
    },
    {
      id: "kolkata",
      city: "Kolkata",
      malayalam: "കൊൽക്കത്ത",
      address:
        "MEATIN Store, Salt Lake Sector 5, Kolkata, West Bengal - 700091",
      phone: "+91 99466 16162",
      xPercent: 69.0,
      yPercent: 48.0,
    },
    {
      id: "lucknow",
      city: "Lucknow",
      malayalam: "ലക്നൗ",
      address: "MEATIN Store, Gomti Nagar, Lucknow, Uttar Pradesh - 226010",
      phone: "+91 99466 16162",
      xPercent: 55.0,
      yPercent: 37.0,
    },
    {
      id: "delhi",
      city: "Delhi",
      malayalam: "ഡൽഹി",
      address: "MEATIN Prime Hub, Connaught Place, New Delhi - 110001",
      phone: "+91 99466 16162",
      xPercent: 47.0,
      yPercent: 30.0,
    },
  ];

  // Kerala Map Hotspot Outlets
  const keralaOutlets: OutletInfo[] = [
  
    {
      id: "kannur",
      city: "Kannur",
      malayalam: "കണ്ണൂർ",
      address: "MEATIN Outlet, City Centre Complex, Fort Road, Kannur - 670001",
      phone: "+91 99466 16162",
      xPercent: 25.0,
      yPercent: 10.0,
    },
    {
      id: "kozhikode",
      city: "Kozhikode",
      malayalam: "കോഴിക്കോട്",
      address: "MEATIN Outlet, Focus Mall Road, Kozhikode - 673004",
      phone: "+91 99466 16162",
      xPercent: 38.0,
      yPercent: 29.0,
    },
    {
      id: "malappuram",
      city: "Malappuram",
      malayalam: "മലപ്പുറം",
      address: "MEATIN Hub, Calicut Road, Malappuram - 676505",
      phone: "+91 99466 16162",
      xPercent: 50.0,
      yPercent: 38.0,
    },
    {
      id: "thrissur",
      city: "Thrissur",
      malayalam: "തൃശ്ശൂർ",
      address: "MEATIN Flagship Store, Perumpilavu, Thrissur - 680519",
      phone: "+91 99466 16162",
      xPercent: 36.0,
      yPercent: 30.0,
    },
    {
      id: "ernakulam",
      city: "Ernakulam",
      malayalam: "എറണാകുളം",
      address: "MEATIN Prime Outlet, MG Road, Ernakulam - 682016",
      phone: "+91 99466 16162",
       xPercent: 38.0,
      yPercent: 37.0,
    },
    {
      id: "kottayam",
      city: "Kottayam",
      malayalam: "കോട്ടയം",
      address: "MEATIN Store, KK Road, Kottayam - 686001",
      phone: "+91 99466 16162",
       xPercent: 40.0,
      yPercent: 44.0,
    },
    {
      id: "alappuzha",
      city: "Alappuzha",
      malayalam: "ആലപ്പുഴ",
      address: "MEATIN Fresh Hub, Boat Jetty Road, Alappuzha - 688001",
      phone: "+91 99466 16162",
      xPercent: 44.0,
      yPercent: 51.0,
    },
    {
      id: "kollam",
      city: "Kollam",
      malayalam: "കൊല്ലം",
      address: "MEATIN Outlet, Chinnakada, Kollam - 691001",
      phone: "+91 99466 16162",
      xPercent: 47.0,
      yPercent: 62.0,
    },
    {
      id: "kochi",
      city: "Kochi",
      malayalam: "കൊച്ചി",
      address: "MEATIN Express Hub, Marine Drive, Kochi - 682031",
      phone: "+91 99466 16162",
      xPercent: 49.0,
      yPercent: 69.0,
    },
    {
      id: "thiruvananthapuram",
      city: "Thiruvananthapuram",
      malayalam: "തിരുവനന്തപുരം",
      address:
        "MEATIN Main Outlet, MG Road, Statue, Thiruvananthapuram - 695001",
      phone: "+91 99466 16162",
      xPercent: 56.0,
      yPercent: 80.0,
    },
  ];

  const activeOutlets = mapMode === "full" ? [] : keralaOutlets;

  // Zoom Handlers
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () =>
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setSelectedOutlet(null);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-slate-800 font-manrope selection:bg-[#127431] selection:text-white overflow-x-clip pt-0">
      {/* ============================================================ */}
      {/* SECTION 1: HERO & STORE SHOWCASE (EXACT MATCH TO DESIGN) */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-[calc(100vh-80px)] h-auto pt-[95px] sm:pt-[105px] md:pt-[120px] lg:pt-[110px] pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#D8E6F5] via-[#EAF2F9] to-[#FAF7F2] overflow-hidden select-none flex flex-col justify-between items-center">
        {/* Sky Cloud Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-multiply z-0">
          <Image
            src="/Franchies/bg.webp"
            alt="Sky Background Texture"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Top Right Background Doodle Accent */}
        <div className="absolute top-20 right-0 z-0 pointer-events-none w-[700px] sm:w-[100px] md:w-[130px] lg:w-[160px] opacity-50">
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
        <div className="absolute bottom-0 left-0 z-0 pointer-events-none w-[80px] sm:w-[110px] md:w-[140px] lg:w-[160px] opacity-60">
          <Image
            src="/Franchies/leftBottom.webp"
            alt="Left Bottom Trees Accent"
            width={260}
            height={180}
            priority
            className="w-full h-auto object-contain object-bottom"
          />
        </div>

        {/* Right Bottom Corner Meat Sketch Accent (Refined, Subtle & Responsive across Desktop Screens) */}
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none w-[50px] sm:w-[65px] md:w-[75px] lg:w-[85px] xl:w-[95px] 2xl:w-[110px] opacity-40">
          <Image
            src="/Franchies/RightBottom.webp"
            alt="Right Bottom Accent"
            width={180}
            height={130}
            priority
            className="w-full h-auto object-contain object-bottom"
          />
        </div>

        <div className="w-full relative z-10 flex-1 flex flex-col justify-between items-center max-w-[1600px] mx-auto">
          {/* Header Title Block (Tight margin on mobile, spacious clear margin on desktop) */}
          <div className="text-center space-y-0.5 shrink-0 mt-0 lg:mt-3.5 py-0.5">
            {/* Subtitle: — GROWTH WITH — (Fade in from LEFT) */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center justify-center gap-2 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] [@media(max-height:710px)]:lg:text-[11px] [@media(max-height:620px)]:lg:text-[10px] font-bold text-gray-800 tracking-[3px] uppercase font-manrope"
            >
              <span className="w-5 md:w-7 h-[2px] bg-gradient-to-r from-transparent via-[#EAB308] to-[#82B224] rounded-full" />
              GROWTH WITH
              <span className="w-5 md:w-7 h-[2px] bg-gradient-to-l from-transparent via-[#EAB308] to-[#82B224] rounded-full" />
            </motion.div>

            {/* Main Brand Title: MEATIN */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[76px] [@media(max-height:710px)]:lg:text-[50px] [@media(max-height:620px)]:lg:text-[40px] font-extrabold font-barlow-condensed tracking-wider uppercase leading-none flex items-center justify-center">
              {/* MEAT (Fade in from RIGHT) */}
              <motion.span
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                className="text-[#82B224] inline-block"
              >
                MEAT
              </motion.span>

              {/* IN (Fade in from RIGHT, slightly slower and delayed) */}
              <motion.span
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.95, ease: "easeOut", delay: 0.45 }}
                className="text-[#D62828] inline-block"
              >
                IN
              </motion.span>
            </h1>
          </div>

          {/* Hero Store Interactive Canvas (Prominent & larger on mobile, proportional scaling on desktop) */}
          <div className="relative w-full max-w-[1360px] h-auto lg:h-[520px] mx-auto flex items-center justify-center my-6 sm:my-10 md:my-14 lg:my-auto origin-center lg:-mt-1 [@media(max-height:750px)]:lg:-mt-2 [@media(max-height:620px)]:lg:-mt-10 [@media(max-height:600px)]:lg:-mt-24 [@media(max-height:600px)]:lg:-translate-y-9 [@media(min-height:800px)]:lg:mt-4 [@media(min-height:890px)]:lg:mt-6 scale-100 lg:scale-[0.62] [@media(max-height:600px)]:lg:scale-[0.56] [@media(min-height:620px)]:lg:scale-[0.70] [@media(min-height:710px)]:lg:scale-[0.78] [@media(min-height:800px)]:lg:scale-[0.88] [@media(min-height:890px)]:lg:scale-[1.02] transition-transform duration-300 shrink-0">
            {/* Center 3D Store Graphic (Desktop Spotlight Cursor-follow Reveal | Mobile/Tab Clean Display) */}
            <motion.div
              ref={heroImageContainerRef}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-[88%] sm:w-[80%] md:w-[68%] lg:w-[750px] xl:w-[820px] max-w-[480px] lg:max-w-none h-auto z-20 mx-auto drop-shadow-2xl hover:scale-[1.01] transition-transform duration-500 my-1 lg:my-0 cursor-default lg:cursor-crosshair overflow-hidden rounded-2xl select-none"
            >
              {/* Mobile / Tablet View (Standard Single Image Display using hero-main-image.webp) */}
              <div className="block lg:hidden relative w-full h-auto">
                <Image
                  src="/Franchies/hero-main-image.webp"
                  alt="MEATIN Outlet Storefront"
                  width={920}
                  height={720}
                  priority
                  className="w-full h-auto object-contain block"
                />
              </div>

              {/* Desktop View (Interactive Spotlight Lens Cursor Reveal - Active on Desktop lg screens) */}
              <div className="hidden lg:block relative w-full h-auto">
                {/* Layer 1 (Base): Overlay Image (visible everywhere on desktop by default) */}
                <Image
                  src="/Franchies/hero-overlay-image.webp"
                  alt="MEATIN Overlay Storefront"
                  width={920}
                  height={720}
                  priority
                  className="w-full h-auto object-contain block pointer-events-none"
                />

                {/* Layer 2 (Spotlight Overlay): Main Hero Image (Revealed inside cursor circular lens) */}
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none transition-[clip-path] duration-75 ease-out"
                  style={{
                    clipPath: mousePos
                      ? `circle(120px at ${mousePos.x}px ${mousePos.y}px)`
                      : "circle(0px at 50% 50%)",
                    WebkitClipPath: mousePos
                      ? `circle(120px at ${mousePos.x}px ${mousePos.y}px)`
                      : "circle(0px at 50% 50%)",
                  }}
                >
                  <Image
                    src="/Franchies/hero-main-image.webp"
                    alt="MEATIN Main Outlet Storefront"
                    width={920}
                    height={720}
                    priority
                    className="w-full h-auto object-contain block"
                  />
                  
                  {/* Glowing ring edge around spotlight lens */}
                  {mousePos && (
                    <div
                      className="absolute pointer-events-none rounded-full border-2 border-white/60 shadow-[0_0_25px_rgba(255,255,255,0.8)] -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${mousePos.x}px`,
                        top: `${mousePos.y}px`,
                        width: '240px',
                        height: '240px',
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>

            {/* CSS Keyframes for Infinite Conveyor Dotted Line Flow Animation */}
            <style jsx>{`
              @keyframes conveyerFlow {
                0% {
                  stroke-dashoffset: 0;
                }
                100% {
                  stroke-dashoffset: -24px;
                }
              }
              .conveyer-dotted-path {
                stroke-dasharray: 6px 6px !important;
                animation: conveyerFlow 0.8s linear infinite !important;
              }
            `}</style>

            {/* SVG Connector Dotted Lines & Red Dots Overlay with Conveyor Animation */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-30 hidden lg:block"
              viewBox="0 0 1280 520"
              fill="none"
            >
              {/* Item 01 Dotted Line (Left Top) */}
              <motion.g
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <path
                  d="M 155 55 L 155 55 Q 180 55 180 70 L 180 180 Q 180 190 210 190 L 250 190"
                  stroke="#82B224"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="conveyer-dotted-path"
                />
                <g transform="translate(250, 190)">
                  {/* Outer Subtle Pulse Ring 2 */}
                  <motion.circle
                    r="10"
                    fill="#D62828"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.22, 0, 0.22] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  {/* Inner Subtle Pulse Ring 1 */}
                  <motion.circle
                    r="7"
                    fill="#D62828"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  />
                  <circle r="4.5" fill="#D62828" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>
              </motion.g>

              {/* Item 02 Dotted Line (Left Mid) */}
              <motion.g
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <path
                  d="M 155 275 L 250 275"
                  stroke="#82B224"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="conveyer-dotted-path"
                />
                <g transform="translate(250, 275)">
                  {/* Outer Subtle Pulse Ring 2 */}
                  <motion.circle
                    r="10"
                    fill="#D62828"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.22, 0, 0.22] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  />
                  {/* Inner Subtle Pulse Ring 1 */}
                  <motion.circle
                    r="7"
                    fill="#D62828"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  <circle r="4.5" fill="#D62828" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>
              </motion.g>

              {/* Item 03 Dotted Line (Left Bottom) */}
              <motion.g
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <path
                  d="M 155 495 L 155 495 Q 180 495 180 480 L 180 370 Q 180 360 210 360 L 250 360"
                  stroke="#82B224"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="conveyer-dotted-path"
                />
                <g transform="translate(250, 360)">
                  {/* Outer Subtle Pulse Ring 2 */}
                  <motion.circle
                    r="10"
                    fill="#D62828"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.22, 0, 0.22] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                  />
                  {/* Inner Subtle Pulse Ring 1 */}
                  <motion.circle
                    r="7"
                    fill="#D62828"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  />
                  <circle r="4.5" fill="#D62828" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>
              </motion.g>

              {/* Item 04 Dotted Line (Right Top) */}
              <motion.g
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <path
                  d="M 1140 57 L 1110 57 Q 1095 57 1095 72 L 1095 175 Q 1095 190 1080 190"
                  stroke="#82B224"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="conveyer-dotted-path"
                />
                <g transform="translate(1080, 190)">
                  {/* Outer Subtle Pulse Ring 2 */}
                  <motion.circle
                    r="10"
                    fill="#D62828"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.22, 0, 0.22] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.65 }}
                  />
                  {/* Inner Subtle Pulse Ring 1 */}
                  <motion.circle
                    r="7"
                    fill="#D62828"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                  />
                  <circle r="4.5" fill="#D62828" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>
              </motion.g>

              {/* Item 05 Dotted Line (Right Mid) */}
              <motion.g
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.65 }}
              >
                <path
                  d="M 1140 275 L 1080 275"
                  stroke="#82B224"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="conveyer-dotted-path"
                />
                <g transform="translate(1080, 275)">
                  {/* Outer Subtle Pulse Ring 2 */}
                  <motion.circle
                    r="10"
                    fill="#D62828"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.22, 0, 0.22] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.95 }}
                  />
                  {/* Inner Subtle Pulse Ring 1 */}
                  <motion.circle
                    r="7"
                    fill="#D62828"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.65 }}
                  />
                  <circle r="4.5" fill="#D62828" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>
              </motion.g>

              {/* Item 06 Dotted Line (Right Bottom) */}
              <motion.g
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.95 }}
              >
                <path
                  d="M 1140 495 L 1115 495 Q 1095 495 1095 480 L 1095 375 Q 1095 360 1080 360"
                  stroke="#82B224"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="conveyer-dotted-path"
                />
                <g transform="translate(1080, 360)">
                  {/* Outer Subtle Pulse Ring 2 */}
                  <motion.circle
                    r="10"
                    fill="#D62828"
                    animate={{ scale: [1, 2.2, 1], opacity: [0.22, 0, 0.22] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
                  />
                  {/* Inner Subtle Pulse Ring 1 */}
                  <motion.circle
                    r="7"
                    fill="#D62828"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.95 }}
                  />
                  <circle r="4.5" fill="#D62828" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>
              </motion.g>
            </svg>

            {/* LEFT 3 FEATURE BADGES (01, 02, 03) */}
            <div className="absolute left-[-110px] xl:left-[-70px] 2xl:left-[-30px] top-0 bottom-0 z-40 pointer-events-auto hidden lg:block w-[300px]">
              {/* Feature 01: HYGIENIC PROCESSING */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.12 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2, scale: { duration: 0.25, ease: "easeOut" } }}
                className="absolute top-[25px] left-0 flex items-center gap-3.5 group select-none origin-left cursor-default"
              >
                <div className="w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full bg-transparent border border-slate-400/80 flex items-center justify-center shrink-0 group-hover:border-[#82B224] transition-colors duration-300">
                  <Icon
                    icon="ph:microscope"
                    className="w-9 h-9 sm:w-[34px] sm:h-[34px] text-[#127431] group-hover:text-[#82B224] transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col max-w-[170px]">
                  <span className="text-xl sm:text-2xl font-bold text-[#D62828] font-manrope leading-none block">
                    01
                  </span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[13px] sm:text-[15px] font-extrabold text-[#153520] uppercase tracking-wider font-manrope leading-tight">
                    HYGIENIC
                    <br />
                    PROCESSING
                  </h3>
                  <p className="text-[11px] sm:text-[13px] text-slate-700 leading-tight mt-0.5 font-semibold font-manrope">
                    Processed under strict hygiene standards.
                  </p>
                </div>
              </motion.div>

              {/* Feature 02: PREMIUM QUALITY */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.12 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.5, scale: { duration: 0.25, ease: "easeOut" } }}
                className="absolute top-[225px] left-0 flex items-center gap-3.5 group select-none origin-left cursor-default"
              >
                <div className="w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full bg-transparent border border-slate-400/80 flex items-center justify-center shrink-0 group-hover:border-[#82B224] transition-colors duration-300">
                  <Icon
                    icon="ph:shield-check"
                    className="w-9 h-9 sm:w-[34px] sm:h-[34px] text-[#127431] group-hover:text-[#82B224] transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col max-w-[170px]">
                  <span className="text-xl sm:text-2xl font-bold text-[#D62828] font-manrope leading-none block">
                    02
                  </span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[13px] sm:text-[15px] font-extrabold text-[#153520] uppercase tracking-wider font-manrope leading-tight">
                    PREMIUM
                    <br />
                    QUALITY
                  </h3>
                  <p className="text-[11px] sm:text-[13px] text-slate-700 leading-tight mt-0.5 font-semibold font-manrope">
                    Handpicked for superior freshness.
                  </p>
                </div>
              </motion.div>

              {/* Feature 03: FARM FRESH */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.12 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.8, scale: { duration: 0.25, ease: "easeOut" } }}
                className="absolute top-[425px] left-0 flex items-center gap-3.5 group select-none origin-left cursor-default"
              >
                <div className="w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full bg-transparent border border-slate-400/80 flex items-center justify-center shrink-0 group-hover:border-[#82B224] transition-colors duration-300">
                  <Icon
                    icon="ph:plant"
                    className="w-9 h-9 sm:w-[34px] sm:h-[34px] text-[#127431] group-hover:text-[#82B224] transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col max-w-[170px]">
                  <span className="text-xl sm:text-2xl font-bold text-[#D62828] font-manrope leading-none block">
                    03
                  </span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[13px] sm:text-[15px] font-extrabold text-[#153520] uppercase tracking-wider font-manrope leading-tight">
                    FARM FRESH
                  </h3>
                  <p className="text-[11px] sm:text-[13px] text-slate-700 leading-tight mt-0.5 font-semibold font-manrope">
                    Sourced from trusted local farms.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT 3 FEATURE BADGES (04, 05, 06) */}
            <div className="absolute right-[-110px] xl:right-[-70px] 2xl:right-[-30px] top-0 bottom-0 z-40 pointer-events-auto hidden lg:block w-[300px]">
              {/* Feature 04: NO ARTIFICIAL ADDITIVES */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.12 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.35, scale: { duration: 0.25, ease: "easeOut" } }}
                className="absolute top-[25px] left-0 flex items-center gap-4 group select-none origin-left cursor-default"
              >
                <div className="w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full bg-transparent border border-slate-400/80 flex items-center justify-center shrink-0 group-hover:border-[#82B224] transition-colors duration-300">
                  <Icon
                    icon="ph:leaf"
                    className="w-9 h-9 sm:w-[34px] sm:h-[34px] text-[#127431] group-hover:text-[#82B224] transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col max-w-[170px]">
                  <span className="text-xl sm:text-2xl font-bold text-[#D62828] font-manrope leading-none block">
                    04
                  </span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[13px] sm:text-[15px] font-extrabold text-[#153520] uppercase tracking-wider font-manrope leading-tight">
                    NO ARTIFICIAL
                    <br />
                    ADDITIVES
                  </h3>
                  <p className="text-[11px] sm:text-[13px] text-slate-700 leading-tight mt-0.5 font-semibold font-manrope">
                    Free from artificial preservatives.
                  </p>
                </div>
              </motion.div>

              {/* Feature 05: FRESHNESS GUARANTEED */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.12 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.65, scale: { duration: 0.25, ease: "easeOut" } }}
                className="absolute top-[225px] left-0 flex items-center gap-4 group select-none origin-left cursor-default"
              >
                <div className="w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full bg-transparent border border-slate-400/80 flex items-center justify-center shrink-0 group-hover:border-[#82B224] transition-colors duration-300">
                  <Icon
                    icon="ph:package"
                    className="w-9 h-9 sm:w-[34px] sm:h-[34px] text-[#127431] group-hover:text-[#82B224] transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col max-w-[170px]">
                  <span className="text-xl sm:text-2xl font-bold text-[#D62828] font-manrope leading-none block">
                    05
                  </span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[13px] sm:text-[15px] font-extrabold text-[#153520] uppercase tracking-wider font-manrope leading-tight">
                    FRESHNESS
                    <br />
                    GUARANTEED
                  </h3>
                  <p className="text-[11px] sm:text-[13px] text-slate-700 leading-tight mt-0.5 font-semibold font-manrope">
                    Packed to lock in freshness.
                  </p>
                </div>
              </motion.div>

              {/* Feature 06: FAST DELIVERY */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.12 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.95, scale: { duration: 0.25, ease: "easeOut" } }}
                className="absolute top-[425px] left-0 flex items-center gap-4 group select-none origin-left cursor-default"
              >
                <div className="w-14 h-14 sm:w-[64px] sm:h-[64px] rounded-full bg-transparent border border-slate-400/80 flex items-center justify-center shrink-0 group-hover:border-[#82B224] transition-colors duration-300">
                  <Icon
                    icon="ph:truck"
                    className="w-9 h-9 sm:w-[34px] sm:h-[34px] text-[#127431] group-hover:text-[#82B224] transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col max-w-[170px]">
                  <span className="text-xl sm:text-2xl font-bold text-[#D62828] font-manrope leading-none block">
                    06
                  </span>
                  <div className="w-6 h-[2px] bg-[#D62828] mb-1" />
                  <h3 className="text-[13px] sm:text-[15px] font-extrabold text-[#153520] uppercase tracking-wider font-manrope leading-tight">
                    FAST
                    <br />
                    DELIVERY
                  </h3>
                  <p className="text-[11px] sm:text-[13px] text-slate-700 leading-tight mt-0.5 font-semibold font-manrope">
                    Fresh meat delivered to your doorstep.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Premium Glassmorphic Mobile Grid Layout for 6 Features (Below 1024px) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 mt-4 lg:hidden w-full px-1">
            {
              [
                {
                  num: "01",
                  title: "HYGIENIC PROCESSING",
                  desc: "Processed under strict hygiene standards.",
                  icon: "ph:microscope",
                },
                {
                  num: "02",
                  title: "PREMIUM QUALITY",
                  desc: "Handpicked for superior freshness.",
                  icon: "ph:shield-check",
                },
                {
                  num: "03",
                  title: "FARM FRESH",
                  desc: "Sourced from trusted local farms.",
                  icon: "ph:plant",
                },
                {
                  num: "04",
                  title: "NO ARTIFICIAL ADDITIVES",
                  desc: "Free from artificial preservatives.",
                  icon: "ph:leaf",
                },
                {
                  num: "05",
                  title: "FRESHNESS GUARANTEED",
                  desc: "Packed to lock in freshness.",
                  icon: "ph:package",
                },
                {
                  num: "06",
                  title: "FAST DELIVERY",
                  desc: "Fresh meat delivered to your doorstep.",
                  icon: "ph:truck",
                },
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group relative bg-white/80 backdrop-blur-md border border-white/90 p-3 sm:p-4 rounded-2xl shadow-[0_8px_25px_rgba(18,116,49,0.05)] hover:shadow-[0_12px_30px_rgba(214,40,40,0.12)] flex flex-col justify-between items-start gap-2.5 transition-all duration-300 overflow-hidden active:scale-[0.98]"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#127431]/10 to-[#82B224]/20 border border-[#82B224]/30 flex items-center justify-center text-[#127431] group-hover:bg-[#127431] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon icon={feat.icon} className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 text-[11px] font-black text-[#D62828] bg-[#D62828]/10 rounded-full border border-[#D62828]/20 font-manrope">
                      {feat.num}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[12px] sm:text-[13px] font-extrabold text-[#153520] uppercase font-manrope tracking-wider leading-tight mt-0.5 group-hover:text-[#127431] transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug mt-1 font-semibold font-manrope">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))
            }
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: INTERACTIVE PRESENCE MAP (EXACT MATCH TO DESIGN) */}
      {/* ============================================================ */}
      <section className="relative w-full pt-20 sm:pt-28 lg:pt-[125px] xl:pt-[145px] pb-28 sm:pb-36 lg:pb-44 xl:pb-52 flex flex-col justify-between bg-[#EFF2EB] overflow-x-clip select-none">
        {/* Content Wrapper */}
        <div className="w-full px-3.5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center relative z-30 max-w-[1850px] mx-auto">
          {/* Flexbox Layout: Left Content Container & Right Map/Image Container */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 w-full my-auto">
            {/* LEFT CONTAINER (lg:w-[42%]): Header Title, Red Underline & Stat Cards */}
            <div className="w-full lg:w-[42%] flex flex-col justify-start space-y-3 sm:space-y-6 lg:space-y-8 shrink-0">
              {/* Header Title + Red Underline + Subtitle */}
              <div className="space-y-1.5 sm:space-y-3">
                {/* Real Letter-by-Letter Typewriter Animation for Heading */}
                <div>
                  <h2 className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[68px] font-bold font-barlow-condensed tracking-wide uppercase leading-none text-[#1F5A3C]">
                    <div className="block">
                      {Array.from("OUR PRESENCE ACROSS").map((char, index) => (
                        <motion.span
                          key={`green-${index}`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: false, amount: 0.2 }}
                          transition={{ duration: 0.04, delay: index * 0.055 }}
                          className="inline"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                    <div className="block text-[#D62828] mt-0.5 sm:mt-1">
                      {Array.from("KERALA").map((char, index) => (
                        <motion.span
                          key={`red-${index}`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: false, amount: 0.2 }}
                          transition={{ duration: 0.04, delay: 1.05 + index * 0.07 }}
                          className="inline"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </h2>
                </div>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-12 sm:w-16 h-[2.5px] sm:h-[3px] bg-[#D62828] rounded-full origin-left"
                />

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-[11.5px] sm:text-[14px] lg:text-[16px] font-medium text-slate-700 leading-snug sm:leading-relaxed font-manrope max-w-sm pt-0.5"
                >
                  Building a stronger network to serve you better with freshness
                  and trust across the state.
                </motion.p>
              </div>

              {/* 3 Stat Cards arranged Side-by-Side in a Row (Mobile Compact Grid) */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3.5 max-w-lg w-full mb-4 sm:mb-6 lg:mb-8">
                {/* Card 1: Stores */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-[#FBFFF2] border border-[#E2EBD4] p-2 sm:p-4 rounded-md shadow-sm text-center flex flex-col gap-1 sm:gap-2 items-center justify-between min-h-[110px] sm:min-h-[155px]"
                >
                  <Icon
                    icon="proicons:location"
                    className="w-4 h-4 sm:w-7 sm:h-7 text-[#D62828] mb-0.5"
                  />
                  <div className="flex flex-col gap-0.5 sm:gap-1 items-center w-full">
                    <span className="text-xl sm:text-3xl lg:text-4xl 2xl:text-[44px] font-bold text-[#D62828] font-barlow-condensed leading-none block">
                      100+
                    </span>
                    <span className="text-[9px] sm:text-[11px] lg:text-[13px] xl:text-[15px] font-bold text-slate-900 uppercase tracking-wider font-inter block whitespace-nowrap mt-0.5">
                      STORES
                    </span>
                    <span className="text-[8px] sm:text-[11px] lg:text-[13px] text-slate-700 font-semibold font-inter block whitespace-nowrap leading-tight">
                      Across Kerala
                    </span>
                  </div>
                </motion.div>

                {/* Card 2: Districts */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.70 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-[#FBFFF2] border border-[#E2EBD4] p-2 sm:p-4 rounded-md shadow-sm text-center flex flex-col gap-1 sm:gap-2 items-center justify-between min-h-[110px] sm:min-h-[155px]"
                >
                  <Icon
                    icon="griddy-icons:building"
                    className="w-4 h-4 sm:w-7 sm:h-7 text-[#D62828] mb-0.5"
                  />
                  <div className="flex flex-col gap-0.5 sm:gap-1 items-center w-full">
                    <span className="text-xl sm:text-3xl lg:text-4xl 2xl:text-[44px] font-bold text-[#D62828] font-barlow-condensed leading-none block">
                      14
                    </span>
                    <span className="text-[9px] sm:text-[11px] lg:text-[13px] xl:text-[15px] font-bold text-slate-900 uppercase tracking-wider font-inter block whitespace-nowrap mt-0.5">
                      DISTRICTS
                    </span>
                    <span className="text-[8px] sm:text-[11px] lg:text-[13px] text-slate-700 font-semibold font-inter block whitespace-nowrap leading-tight">
                      Strong Presence
                    </span>
                  </div>
                </motion.div>

                {/* Card 3: Team Members */}
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.85 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-[#FBFFF2] border border-[#E2EBD4] p-2 sm:p-4 rounded-md shadow-sm text-center flex flex-col gap-1 sm:gap-2 items-center justify-between min-h-[110px] sm:min-h-[155px]"
                >
                  <Icon
                    icon="ion:people-outline"
                    className="w-4 h-4 sm:w-7 sm:h-7 text-[#D62828] mb-0.5"
                  />
                  <div className="flex flex-col gap-0.5 sm:gap-1 items-center w-full">
                    <span className="text-xl sm:text-3xl lg:text-4xl 2xl:text-[44px] font-bold text-[#D62828] font-barlow-condensed leading-none block">
                      500+
                    </span>
                    <span className="text-[9px] sm:text-[11px] lg:text-[13px] xl:text-[15px] font-bold text-slate-900 uppercase tracking-wider font-inter block whitespace-nowrap mt-0.5">
                      TEAM MEMBERS
                    </span>
                    <span className="text-[8px] sm:text-[11px] lg:text-[13px] text-slate-700 font-semibold font-inter block whitespace-nowrap leading-tight">
                      Serving with Pride
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* RIGHT CONTAINER (lg:w-[58%]): Map Display & Right Side Elements (Fade in from Right Side) */}
            <motion.div
              ref={mapRightColRef}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="w-full lg:w-[58%] relative z-20 h-[310px] sm:h-[450px] lg:h-[430px] xl:h-[500px] 2xl:h-[560px] [@media(max-height:720px)]:lg:h-[380px] flex items-center justify-center lg:justify-start shrink-0 mt-1 sm:mt-0"
            >
              {/* Dark Green Zoom Controls Pill (Top Right, mobile horizontal / desktop vertical) */}
              <div className="absolute top-0 sm:top-2 lg:top-2 right-0 sm:right-12 md:right-16 lg:right-24 xl:right-28 z-40 bg-[#153520] text-white p-1.5 sm:p-2.5 rounded-lg sm:rounded-2xl shadow-xl flex flex-row sm:flex-col items-center gap-2 sm:gap-2.5 font-manrope text-[9px] sm:text-[11px]">
                {/* Back Button (Shown ONLY when viewing Kerala District Map) */}
                {mapMode === "kerala" && (
                  <button
                    onClick={() => {
                      setMapMode("full");
                      setSelectedOutlet(null);
                    }}
                    className="flex flex-col sm:flex-col items-center gap-0.5 text-[#82B224] hover:text-white transition-colors cursor-pointer border-r sm:border-r-0 sm:border-b border-white/15 pr-2 sm:pr-0 sm:pb-2 w-auto sm:w-full"
                    title="Back to India Map"
                  >
                    <Icon icon="ph:arrow-left-bold" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-bold">Back</span>
                  </button>
                )}

                <button
                  onClick={handleZoomIn}
                  className="flex flex-col items-center gap-0.5 hover:text-[#82B224] transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <Icon
                    icon="ph:magnifying-glass-plus-bold"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span>Zoom In</span>
                </button>
                <button
                  onClick={handleZoomOut}
                  className="flex flex-col items-center gap-0.5 hover:text-[#82B224] transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <Icon
                    icon="ph:magnifying-glass-minus-bold"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span>Zoom Out</span>
                </button>
                <button
                  onClick={handleResetZoom}
                  className="flex flex-col items-center gap-0.5 hover:text-[#82B224] transition-colors cursor-pointer"
                  title="Reset View"
                >
                  <Icon
                    icon="ph:arrow-counter-clockwise-bold"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  />
                  <span>Reset</span>
                </button>
              </div>

              {/* Map Canvas Container with Zoom Transform (Scaled Down on Mobile) */}
              <div
                className="relative w-full h-full flex items-center justify-center lg:justify-start transition-transform duration-500 ease-out scale-[0.85] sm:scale-100 origin-center"
                style={{ transform: `scale(${zoomLevel * (typeof window !== "undefined" && window.innerWidth < 640 ? 0.88 : 1.12)})` }}
              >
                {/* 3D Map SVG Illustration with AnimatePresence Mode Toggle Animation */}
                <div className="relative h-full w-auto aspect-[888/982] max-w-full translate-x-0 lg:translate-x-4 xl:translate-x-8 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mapMode}
                      initial={{ opacity: 0, scale: 0.9, rotate: mapMode === "kerala" ? -2 : 2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={
                          mapMode === "full"
                            ? "/Franchies/fullMap.svg"
                            : "/Franchies/KeralaMap.svg"
                        }
                        alt={
                          mapMode === "full"
                            ? "3D India Map"
                            : "3D Kerala State Map"
                        }
                        fill
                        priority
                        className="object-contain drop-shadow-2xl select-none"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* INVISIBLE CLICKABLE HOTSPOTS OVER SVG BUILT-IN PINS */}
                  {activeOutlets.map((outlet) => {
                    const isSelected = selectedOutlet?.id === outlet.id;

                    return (
                      <div
                        key={outlet.id}
                        data-pin-element="true"
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group w-12 h-12 flex items-center justify-center"
                        style={{
                          left: `${outlet.xPercent}%`,
                          top: `${outlet.yPercent}%`,
                        }}
                        onClick={() => {
                          if (mapMode === "full" && outlet.id === "kerala") {
                            setMapMode("kerala");
                            setSelectedOutlet(null);
                          } else {
                            setSelectedOutlet(outlet);
                          }
                        }}
                        title={`Click to view ${outlet.city} outlet details`}
                      >
                        <div className="w-full h-full" />
                      </div>
                    );
                  })}

                  {/* CLICKABLE OVERLAY DIRECTLY OVER GREEN KERALA STATE SHAPE */}
                  {mapMode === "full" && (
                    <div
                      className="absolute z-30 cursor-pointer group pointer-events-auto"
                      style={{
                        left: "22.5%",
                        top: "62%",
                        width: "9%",
                        height: "26%",
                        transform: "rotate(-22deg)",
                      }}
                      onClick={() => {
                        setMapMode("kerala");
                        setSelectedOutlet(null);
                      }}
                      title="Click to open Kerala District Map"
                    />
                  )}

                  {/* KERALA RED PIN + GREEN TAG OVERLAY WITH ANIMATED PULSE & POP ENTRANCE */}
                  {mapMode === "full" && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, y: -20 }}
                      animate={{ scale: [1, 1.25, 1], opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.15 }}
                      transition={{
                        scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 },
                        opacity: { duration: 0.3, delay: 0.5 },
                      }}
                      className="absolute z-40 cursor-pointer flex items-center select-none pointer-events-auto"
                      style={{
                        left: "26.2%",
                        top: "70%",
                        transform: "translate(-45%, -95%)",
                      }}
                      onClick={() => {
                        setMapMode("kerala");
                        setSelectedOutlet(null);
                      }}
                      title="Click to explore Kerala District Map"
                    >
                      {/* Red Location Pin with Centered Compact Red Glow Pulse */}
                      <div className="relative flex items-center justify-center shrink-0">
                        {/* Compact Red Glow Ring Centered Directly Around Pin */}
                        <span className="absolute inset-0 m-auto w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF3B30]/60 animate-ping pointer-events-none z-0" />
                        <span className="absolute inset-0 m-auto w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF3B30]/30 animate-pulse pointer-events-none z-0" />

                        {/* Red Location Pin Icon */}
                        <div className="relative w-[18px] sm:w-[20px] lg:w-[24px] xl:w-[26px] h-[23px] sm:h-[26px] lg:h-[30px] xl:h-[33px] shrink-0 drop-shadow-lg z-10">
                          <svg viewBox="0 0 38 48" fill="none" className="w-full h-full relative z-10">
                            <path
                              d="M19 0C8.5 0 0 8.5 0 19C0 33.25 19 48 19 48C19 48 38 33.25 38 19C38 8.5 29.5 0 19 0Z"
                              fill="url(#keralaPinGradient)"
                            />
                            <circle cx="19" cy="17" r="6.5" fill="white" />
                            <defs>
                              <linearGradient
                                id="keralaPinGradient"
                                x1="19"
                                y1="0"
                                x2="19"
                                y2="48"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#FF3B30" />
                                <stop offset="1" stopColor="#C41C1C" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      {/* Dark Green "Kerala" Tag Label Pill with White Border */}
                      <div className="-ml-1 bg-gradient-to-r from-[#063B16] via-[#0B4D1E] to-[#136127] text-white px-2 sm:px-2.5 py-[1px] rounded-r-xl rounded-l-sm border-[1.5px] border-white shadow-lg flex items-center justify-center font-bold font-manrope text-[8.5px] sm:text-[9.5px] lg:text-[10px] xl:text-[11px] tracking-wide whitespace-nowrap">
                        <span>Kerala</span>
                      </div>
                    </motion.div>
                  )}

                  {/* KERALA DISTRICT PINS WITH DARK GREEN TAG PILLS (ANIMATE ONE BY ONE AFTER MAP LOADS) */}
                  {mapMode === "kerala" &&
                    keralaOutlets
                      .filter((outlet) =>
                        [
                          "kannur",
                          "thrissur",
                          "ernakulam",
                          "kottayam",
                          "alappuzha",
                          "kollam",
                          "kochi",
                          "thiruvananthapuram",
                        ].includes(outlet.id)
                      )
                      .map((outlet, tagIdx) => {
                        const isSelected = selectedOutlet?.id === outlet.id;

                        return (
                          <motion.div
                            key={`kerala-pin-${outlet.id}`}
                            data-pin-element="true"
                            initial={{ scale: 0, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.45,
                              delay: 0.5 + tagIdx * 0.08,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                            whileHover={{ scale: 1.12 }}
                            className="absolute z-40 cursor-pointer flex items-center select-none"
                            style={{
                              left: `${outlet.xPercent}%`,
                              top: `${outlet.yPercent}%`,
                              transform: "translate(-8px, -100%)",
                            }}
                            onClick={() => setSelectedOutlet(outlet)}
                            title={`Click to view ${outlet.city} details`}
                          >
                          {/* Red Location Pin with Centered Glow Ring when Selected */}
                          <div className="relative flex items-center justify-center shrink-0">
                            {isSelected && (
                              <>
                                <span className="absolute inset-0 m-auto w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FF3B30]/60 animate-ping pointer-events-none z-0" />
                                <span className="absolute inset-0 m-auto w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FF3B30]/35 animate-pulse pointer-events-none z-0" />
                              </>
                            )}

                            {/* Red Location Pin SVG Icon */}
                            <div className="relative w-[13px] sm:w-[15px] md:w-[17px] lg:w-[18px] xl:w-[20px] 2xl:w-[22px] h-[17px] sm:h-[19px] md:h-[21px] lg:h-[23px] xl:h-[25px] 2xl:h-[28px] shrink-0 drop-shadow-lg z-10">
                              <svg viewBox="0 0 38 48" fill="none" className="w-full h-full">
                                <path
                                  d="M19 0C8.5 0 0 8.5 0 19C0 33.25 19 48 19 48C19 48 38 33.25 38 19C38 8.5 29.5 0 19 0Z"
                                  fill={`url(#pinGrad_${outlet.id})`}
                                />
                                <circle cx="19" cy="17" r="6.5" fill="white" />
                                <defs>
                                  <linearGradient
                                    id={`pinGrad_${outlet.id}`}
                                    x1="19"
                                    y1="0"
                                    x2="19"
                                    y2="48"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#FF3B30" />
                                    <stop offset="1" stopColor="#C41C1C" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>
                          </div>

                          {/* Dark Green Tag Label Pill */}
                          <div
                            className={`-ml-1 bg-gradient-to-r from-[#043312] via-[#0B4D1E] to-[#125D25] text-white px-1.5 sm:px-2 py-[1px] rounded-r-lg sm:rounded-r-xl rounded-l-sm border-[1px] sm:border-[1.5px] border-white shadow-lg flex items-center justify-center font-bold font-manrope text-[8px] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] xl:text-[10px] 2xl:text-[11px] tracking-wide whitespace-nowrap transition-transform duration-300 ${
                              isSelected
                                ? "scale-110 border-yellow-300 ring-2 ring-yellow-400/50"
                                : ""
                            }`}
                          >
                            <span>{outlet.city}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>

              {/* POPUP INFO CARD OVERLAY (PLACED INSIDE mapRightColRef FOR 100% FULL MOBILE VISIBILITY) */}
              <AnimatePresence>
                {selectedOutlet && (
                  <motion.div
                    ref={popupCardRef}
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute z-[9999] isolate bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl w-[calc(100%-36px)] max-w-[300px] lg:w-[310px] pointer-events-auto"
                    style={{
                      left: isMobile
                        ? "18px"
                        : `${Math.min(Math.max(selectedOutlet.xPercent, 28), 65)}%`,
                      top: isMobile
                        ? `${selectedOutlet.yPercent > 55 ? "38%" : "44%"}`
                        : `${selectedOutlet.yPercent > 55 ? Math.max(selectedOutlet.yPercent - 32, 18) : Math.min(Math.max(selectedOutlet.yPercent - 12, 15), 45)}%`,
                      transform: isMobile ? "translate(0, -100%)" : "translate(-50%, -100%)",
                    }}
                  >
                    {/* Red Dashed Line connecting card to pin */}
                    <svg
                      className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-6 h-7 pointer-events-none"
                      viewBox="0 0 24 28"
                    >
                      <path
                        d="M12 0 L12 28"
                        stroke="#D62828"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                      />
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
                        <div className="w-6 h-6 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0 mt-0.5">
                          <Icon
                            icon="ph:map-pin-fill"
                            className="w-4 h-4 text-[#D62828]"
                          />
                        </div>
                        <p className="leading-snug text-slate-700 font-medium">
                          {selectedOutlet.address}
                        </p>
                      </div>

                      <div className="flex items-center gap-2.5 pt-1">
                        <div className="w-5 h-5 rounded-full bg-[#EBF3EC] flex items-center justify-center shrink-0">
                          <svg
                            className="w-3.5 h-3.5 text-[#127431]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
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
            </motion.div>
          </div>
        </div>

        {/* UNIFIED BOTTOM GRAPHICS ASSEMBLY: Bottom Slope Wave + Truck + Mascot Character (Flush to bottom-0) */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[90px] sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[185px] pointer-events-none select-none shrink-0 z-30">
          
          {/* 1. Bottom Slope Wave Background Transition */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
            <Image
              src="/Franchies/bottomSlope.webp"
              alt="Green Slope Transition"
              fill
              priority
              className="object-cover object-bottom w-full h-full"
            />
          </div>

          {/* 2. 3D Green Delivery Truck (Positioned flush on bottom slope wave) */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: 0.75,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="absolute bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-4 xl:bottom-5 left-1 sm:left-3 md:left-6 lg:left-8 xl:left-10 z-30 pointer-events-none w-[130px] min-[420px]:w-[155px] sm:w-[200px] md:w-[240px] lg:w-[215px] xl:w-[255px] [@media(min-width:1500px)]:w-[300px] 2xl:w-[350px]"
          >
            <Image
              src="/Franchies/truck-image.webp"
              alt="MEATIN Delivery Truck"
              width={500}
              height={350}
              priority
              className="w-full h-auto object-contain object-bottom drop-shadow-2xl"
            />
          </motion.div>

          {/* 3. 3D Mascot Character (Chicken standing in bottom right corner over bottom slope) */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: 0.75,
              delay: 0.35,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="absolute bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-4 xl:bottom-5 right-1 sm:right-2 md:right-4 lg:right-6 xl:right-10 z-30 pointer-events-none w-[85px] min-[420px]:w-[100px] sm:w-[125px] md:w-[145px] lg:w-[160px] xl:w-[190px]"
          >
            <Image
              src="/Franchies/chicken.webp"
              alt="MEATIN Chicken Mascot"
              width={400}
              height={500}
              priority
              className="w-full h-auto object-contain object-bottom drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
