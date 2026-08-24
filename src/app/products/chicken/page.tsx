'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function ChickenProductPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<'skin' | 'skinless' | 'inside'>('skin');
  const [selectedPartIdx, setSelectedPartIdx] = useState(0);

  const chickenParts = [
    {
      name: "Drumstick",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456.webp",
      desc: "Tender and juicy drumsticks, perfectly cut and hygienically packed to retain natural freshness and rich taste in every bite.",
      weight: "500g",
      nutrition: { protein: "20.4 g", calories: "160 kcal", fat: "7.0 g", carbs: "0 g" }
    },
    {
      name: "Wing",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456 (4).webp",
      desc: "Crispy and delicious chicken wings, perfect for deep frying, barbecue, or baking with your favorite glaze.",
      weight: "500g",
      nutrition: { protein: "18.5 g", calories: "203 kcal", fat: "14.0 g", carbs: "0 g" }
    },
    {
      name: "Drumette",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456 (5).webp",
      desc: "Juicy and meaty drumettes, the perfect party starter. Great for spicy buffalo wings or crispy batter fry.",
      weight: "500g",
      nutrition: { protein: "19.0 g", calories: "170 kcal", fat: "9.5 g", carbs: "0 g" }
    },
    {
      name: "Thigh",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456 (3).webp",
      desc: "Flavorful and tender chicken thighs, bone-in and skin-on. Holds moisture perfectly for slow cooking and roasts.",
      weight: "500g",
      nutrition: { protein: "18.0 g", calories: "209 kcal", fat: "15.0 g", carbs: "0 g" }
    },
    {
      name: "Breast",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456 (1).webp",
      desc: "Lean and protein-rich boneless chicken breast fillets. Extremely versatile and perfect for healthy salads, grilling, and baking.",
      weight: "500g",
      nutrition: { protein: "23.0 g", calories: "165 kcal", fat: "3.6 g", carbs: "0 g" }
    },
    {
      name: "Neck",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456 (9).webp",
      desc: "Rich bone-in chicken necks, perfect for preparing highly nutritious stocks, soups, and slow-cooked gravies.",
      weight: "500g",
      nutrition: { protein: "16.0 g", calories: "180 kcal", fat: "12.0 g", carbs: "0 g" }
    },
    {
      name: "Liver",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456 (7).webp",
      desc: "Fresh and nutrient-dense chicken liver, rich in iron, vitamin A, and essential vitamins. Soft texture and rich taste.",
      weight: "500g",
      nutrition: { protein: "17.2 g", calories: "119 kcal", fat: "4.8 g", carbs: "0 g" }
    },
    {
      name: "Heart",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456 (6).webp",
      desc: "Clean and trimmed chicken hearts. High in protein and iron with a firm, chewy texture, excellent for skewers and stir-fries.",
      weight: "500g",
      nutrition: { protein: "16.0 g", calories: "150 kcal", fat: "9.0 g", carbs: "0 g" }
    },
    {
      name: "Gizzard",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456 (8).webp",
      desc: "Tough and highly flavorful chicken gizzards. Firm texture that becomes beautifully tender when braised or slow-cooked.",
      weight: "500g",
      nutrition: { protein: "18.0 g", calories: "94 kcal", fat: "2.0 g", carbs: "0 g" }
    },
    {
      name: "Back",
      img: "/Product/Chicken/ChickenParts/Rectangle 8456 (2).webp",
      desc: "Clean-cut chicken backs, rich in marrow and collagen. The ultimate choice for deep, flavorful bone broths and stocks.",
      weight: "500g",
      nutrition: { protein: "15.0 g", calories: "220 kcal", fat: "17.0 g", carbs: "0 g" }
    }
  ];

  // Track page scroll inside the interactive visualizer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate clip path values for the scroll-peel layers
  // Layer 3 (Skin): Peels off from scroll progress 0.05 to 0.48
  const skinProgress = useTransform(scrollYProgress, [0.05, 0.48], [120, -20]);
  const skinClipPath = useTransform(skinProgress, (p) => `polygon(0 0, ${p}% 0, ${p - 25}% 100%, 0 100%)`);

  // Layer 2 (Skinless Meat): Peels off from scroll progress 0.52 to 0.95 to reveal the inside
  const meatProgress = useTransform(scrollYProgress, [0.52, 0.95], [120, -20]);
  const meatClipPath = useTransform(meatProgress, (p) => `polygon(0 0, ${p}% 0, ${p - 25}% 100%, 0 100%)`);

  // Update active stage and titles based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.50) {
      setActiveStage('skin');
    } else if (latest >= 0.50 && latest < 0.90) {
      setActiveStage('skinless');
    } else {
      setActiveStage('inside');
    }
  });

  // Autoplay rotation clockwise every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedPartIdx((prev) => (prev + 1) % chickenParts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [chickenParts.length]);

  // Main Header Text Config based on scroll phase
  const headerTitle = {
    skin: { main: 'WITH SKIN', sub: 'CHICKEN', isWhite: false },
    skinless: { main: 'WITHOUT SKIN', sub: 'CHICKEN', isWhite: false },
    inside: { main: 'WHOLE CHICKEN', sub: 'CHICKEN', isWhite: true }
  };

  // Callouts data dynamically changing by scroll stage
  const callouts = {
    skin: {
      left: [
        { name: 'WING', desc: 'Great for frying,\ngrilling & BBQ', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (4).webp', id: 'wing' },
        { name: 'DRUMETTE', desc: 'Juicy & tender.\nPerfect for snacks', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (5).webp', id: 'drumette' },
        { name: 'THIGH', desc: 'Tender & flavourful.\nIdeal for curries & roasts', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (3).webp', id: 'thigh' },
      ],
      right: [
        { name: 'NECK', desc: 'Grate for stocks\n& Soups', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (9).webp', id: 'neck' },
        { name: 'BREST', desc: 'Learn & protein rich. Best\nfor grilling & healthy meals', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (1).webp', id: 'brest' },
        { name: 'DRUMSTICK', desc: 'Juicy & meaty.\nPerfect for curries & grilling', img: '/Product/Chicken/ChickenParts/Rectangle 8456.webp', id: 'drumstick' },
      ],
      bottom: []
    },
    skinless: {
      left: [
        { name: 'WING', desc: 'Great for frying,\ngrilling & BBQ', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (4).webp', id: 'wing' },
        { name: 'DRUMETTE', desc: 'Juicy & tender.\nPerfect for snacks', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (5).webp', id: 'drumette' },
        { name: 'THIGH', desc: 'Tender & flavourful.\nIdeal for curries & roasts', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (3).webp', id: 'thigh' },
      ],
      right: [
        { name: 'NECK', desc: 'Grate for stocks\n& Soups', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (9).webp', id: 'neck' },
        { name: 'BREST', desc: 'Learn & protein rich. Best\nfor grilling & healthy meals', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (1).webp', id: 'brest' },
        { name: 'DRUMSTICK', desc: 'Juicy & meaty.\nPerfect for curries & grilling', img: '/Product/Chicken/ChickenParts/Rectangle 8456.webp', id: 'drumstick' },
      ],
      bottom: []
    },
    inside: {
      left: [
        { name: 'WING', desc: 'Great for frying,\ngrilling & BBQ', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (4).webp', id: 'wing' },
        { name: 'HEART', desc: 'Learn &\nnutritious.', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (6).webp', id: 'heart' },
        { name: 'DRUMETTE', desc: 'Juicy & tender.\nPerfect for snacks', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (5).webp', id: 'drumette' },
        { name: 'THIGH', desc: 'Tender & flavourful.\nIdeal for curries & roasts', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (3).webp', id: 'thigh' },
      ],
      right: [
        { name: 'NECK', desc: 'Grate for stocks\n& Soups', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (9).webp', id: 'neck' },
        { name: 'BREST', desc: 'Learn & protein rich. Best\nfor grilling & healthy meals', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (1).webp', id: 'brest' },
        { name: 'BACT', desc: 'Great for stocks,\nsoups & broths', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (2).webp', id: 'bact' },
        { name: 'LIVER', desc: 'Rich in Iron\n& Vitamins', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (7).webp', id: 'liver' },
        { name: 'DRUMSTICK', desc: 'Juicy & meaty.\nPerfect for curries & grilling', img: '/Product/Chicken/ChickenParts/Rectangle 8456.webp', id: 'drumstick' },
      ],
      bottom: [
        { name: 'GIZZARD', desc: 'Tough &\nFlavourful', img: '/Product/Chicken/ChickenParts/Rectangle 8456 (8).webp', id: 'gizzard' }
      ]
    }
  };

  // Categories under the white panel
  const categories = [
    {
      name: 'CHICKEN',
      href: '/products/chicken',
      icon: '/Product/Chicken/Banner/image 298.webp'
    },
    {
      name: 'BUFFALO',
      href: '/products/buffalo',
      icon: '/Product/Chicken/Banner/image 298 (1).webp'
    },
    {
      name: 'MUTTON',
      href: '/products/mutton',
      icon: '/Product/Chicken/Banner/image 298 (2).webp'
    },
    {
      name: 'DUCK',
      href: '/products/duck',
      icon: '/Product/Chicken/Banner/image 298 (3).webp'
    },
    {
      name: 'QUAIL',
      href: '/products/quail',
      icon: '/Product/Chicken/Banner/image 298 (4).webp'
    },
    {
      name: 'BURGER PATTY',
      href: '/products/burger-patty',
      icon: '/Product/Chicken/Banner/image 298.webp'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#638913] relative font-manrope selection:bg-white/20 selection:text-white">
      
      {/* Background Doodle Repeat Overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.7] bg-repeat"
        style={{ backgroundImage: 'url("/Product/Chicken/doodle.webp")', backgroundSize: '800px' }}
      />

      {/* Interactive Visualizer Container */}
      <div ref={containerRef} className="relative w-full h-[200vh] z-10">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-24 pb-8">
          
          {/* Main Visualizer Content Area */}
          <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 grid grid-cols-12 items-center gap-4 relative">
            
            {/* Top Right Sub-category tabs */}
            <div className="absolute top-2 right-4 flex items-stretch bg-white border border-[#CCCCCC] shadow-sm z-40 text-[14px] font-bold tracking-wider h-10 select-none">
              <span className="bg-[#D62828] text-white px-6 flex items-center justify-center uppercase relative font-bold cursor-pointer">
                CHICKEN
                {/* Downward triangle arrow with border matching container */}
                <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#D62828] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
              </span>
              <span className="text-slate-700 px-8 flex items-center justify-center border-r border-[#CCCCCC] hover:bg-slate-50 cursor-pointer font-bold">BEEF</span>
              <span className="text-slate-700 px-8 flex items-center justify-center hover:bg-slate-50 cursor-pointer font-bold">GOAT</span>
            </div>

            {/* Title Section (Centered above chicken, absolute inside) */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-30">
              <div className="text-lg font-black text-[#F7A206] tracking-widest uppercase mb-1 font-inter">
                {headerTitle[activeStage].sub}
              </div>
              <h2 className="text-5xl font-bold font-barlow-condensed text-white tracking-wide uppercase leading-none">
                {headerTitle[activeStage].isWhite ? (
                  headerTitle[activeStage].main
                ) : (
                  <>
                    {headerTitle[activeStage].main.split(' ')[0]}{' '}
                    <span className="text-[#153520]">{headerTitle[activeStage].main.split(' ').slice(1).join(' ')}</span>
                  </>
                )}
              </h2>
            </div>

            {/* Left Side Callout Section */}
            <div className="col-span-3 z-30 flex flex-col justify-center h-full pt-16">
              <div className="relative w-full flex flex-col gap-6">
                <AnimatePresence mode="popLayout">
                  {callouts[activeStage].left.map((item, idx) => (
                    <motion.div
                      key={`${activeStage}-left-${item.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col relative select-none"
                    >
                      {/* Row for Thumbnail & Name Pill */}
                      <div className="flex items-center">
                        {/* Circle Thumbnail */}
                        <div className="relative w-[66px] h-[66px] rounded-full border border-[#D62828] bg-white flex items-center justify-center p-1 shadow-md z-10 shrink-0">
                          <span className="absolute -top-1 -left-1 bg-[#D62828] text-white w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-black z-20 font-inter">10</span>
                          <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image src={item.img} alt={item.name} fill className="object-contain" />
                          </div>
                        </div>

                        {/* Name Pill tucked under the Circle */}
                        <div className="-ml-4 pl-6 pr-4 h-7 bg-[#D62828] rounded-r-full flex items-center z-0">
                          <span className="text-white text-[10.5px] font-black tracking-wider uppercase font-inter leading-none">
                            {item.name}
                          </span>
                        </div>
                      </div>

                      {/* Description underneath */}
                      <div className="pl-[74px] -mt-0.5 max-w-[210px]">
                        <p className="text-[11.5px] font-medium text-white/95 leading-tight whitespace-pre-line font-inter">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Center Chicken Stack with EXACT matching width/height */}
            <div className="col-span-6 flex items-center justify-center relative h-[480px]">
              
              {/* Dynamic SVG Connecting Lines depending on scroll stage */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 600 480" fill="none">
                {activeStage !== 'inside' ? (
                  // Skin & Skinless connectors
                  <>
                    {/* WING Line */}
                    <path d="M 190 120 L 250 160" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="190" cy="120" r="3" fill="white" />
                    <circle cx="250" cy="160" r="3" fill="white" />

                    {/* DRUMETTE Line */}
                    <path d="M 190 230 L 235 210 L 260 210" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="190" cy="230" r="3" fill="white" />
                    <circle cx="260" cy="210" r="3" fill="white" />

                    {/* THIGH Line */}
                    <path d="M 190 340 L 230 320 L 270 320" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="190" cy="340" r="3" fill="white" />
                    <circle cx="270" cy="320" r="3" fill="white" />

                    {/* NECK Line */}
                    <path d="M 400 120 L 310 145" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="400" cy="120" r="3" fill="white" />
                    <circle cx="310" cy="145" r="3" fill="white" />

                    {/* BREST Line */}
                    <path d="M 400 230 L 350 200" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="400" cy="230" r="3" fill="white" />
                    <circle cx="350" cy="200" r="3" fill="white" />

                    {/* DRUMSTICK Line */}
                    <path d="M 400 340 L 335 320 L 320 320" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="400" cy="340" r="3" fill="white" />
                    <circle cx="320" cy="320" r="3" fill="white" />
                  </>
                ) : (
                  // Inside cavity detailed connectors
                  <>
                    {/* WING Line (y: 90) */}
                    <path d="M 190 90 L 250 160" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="190" cy="90" r="3" fill="white" />
                    <circle cx="250" cy="160" r="3" fill="white" />

                    {/* HEART Line (y: 175) */}
                    <path d="M 190 175 L 290 205" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="190" cy="175" r="3" fill="white" />
                    <circle cx="290" cy="205" r="3" fill="white" />

                    {/* DRUMETTE Line (y: 260) */}
                    <path d="M 190 260 L 245 235" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="190" cy="260" r="3" fill="white" />
                    <circle cx="245" cy="235" r="3" fill="white" />

                    {/* THIGH Line (y: 345) */}
                    <path d="M 190 345 L 260 325" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="190" cy="345" r="3" fill="white" />
                    <circle cx="260" cy="325" r="3" fill="white" />

                    {/* NECK Line (y: 70) */}
                    <path d="M 400 70 L 310 145" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="400" cy="70" r="3" fill="white" />
                    <circle cx="310" cy="145" r="3" fill="white" />

                    {/* BREST Line (y: 150) */}
                    <path d="M 400 150 L 335 185" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="400" cy="150" r="3" fill="white" />
                    <circle cx="335" cy="185" r="3" fill="white" />

                    {/* BACT Line (y: 230) */}
                    <path d="M 400 230 L 340 220" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="400" cy="230" r="3" fill="white" />
                    <circle cx="340" cy="220" r="3" fill="white" />

                    {/* LIVER Line (y: 310) */}
                    <path d="M 400 310 L 330 250" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="400" cy="310" r="3" fill="white" />
                    <circle cx="330" cy="250" r="3" fill="white" />

                    {/* DRUMSTICK Line (y: 390) */}
                    <path d="M 400 390 L 320 320" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="400" cy="390" r="3" fill="white" />
                    <circle cx="320" cy="320" r="3" fill="white" />

                    {/* GIZZARD Center Line */}
                    <path d="M 300 440 L 300 340" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="300" cy="440" r="3" fill="white" />
                    <circle cx="300" cy="340" r="3" fill="white" />
                  </>
                )}
              </svg>

              {/* Exact Stacked chicken viewport */}
              <div className="relative w-[360px] h-[360px] md:w-[400px] md:h-[400px] aspect-square flex items-center justify-center">
                
                {/* Layer 1: Cavity (Bottom Layer) */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src="/Product/Chicken/FullChicken/transparent.webp"
                    alt="Chicken Inside Cavity"
                    className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 h-full w-auto max-w-none object-contain select-none pointer-events-none"
                  />
                </div>

                {/* Layer 2: Skinless (Middle Layer) */}
                <motion.div 
                  style={{ clipPath: meatClipPath }}
                  className="absolute inset-0 w-full h-full z-10"
                >
                  <img
                    src="/Product/Chicken/FullChicken/withoutskin.webp"
                    alt="Chicken Skinless Muscle"
                    className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 h-full w-auto max-w-none object-contain select-none pointer-events-none"
                  />
                </motion.div>

                {/* Layer 3: Skin-On (Top Layer) */}
                <motion.div 
                  style={{ clipPath: skinClipPath }}
                  className="absolute inset-0 w-full h-full z-20"
                >
                  <img
                    src="/Product/Chicken/FullChicken/withskin.webp"
                    alt="Whole Chicken with Skin"
                    className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 h-full w-auto max-w-none object-contain select-none pointer-events-none"
                  />
                </motion.div>

              </div>

              {/* Bottom Callout: GIZZARD (Inside Cavity Only) */}
              <AnimatePresence>
                {activeStage === 'inside' && callouts.inside.bottom.map((item) => (
                  <motion.div
                    key="gizzard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-[-30px] left-[45%] transform -translate-x-[45%] flex flex-col z-30 select-none"
                  >
                    {/* Row for Thumbnail & Name Pill */}
                    <div className="flex items-center">
                      {/* Circle Thumbnail */}
                      <div className="relative w-[66px] h-[66px] rounded-full border border-[#D62828] bg-white flex items-center justify-center p-1 shadow-md z-10 shrink-0">
                        <span className="absolute -top-1 -left-1 bg-[#D62828] text-white w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-black z-20 font-inter">10</span>
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image src={item.img} alt={item.name} fill className="object-contain" />
                        </div>
                      </div>

                      {/* Name Pill tucked under the Circle */}
                      <div className="-ml-4 pl-6 pr-4 h-7 bg-[#D62828] rounded-r-full flex items-center z-0">
                        <span className="text-white text-[10.5px] font-black tracking-wider uppercase font-inter leading-none">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    {/* Description underneath */}
                    <div className="pl-[74px] -mt-0.5 max-w-[210px]">
                      <p className="text-[11.5px] font-medium text-white/95 leading-tight whitespace-pre-line font-inter">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

            </div>

            {/* Right Side Callout Section */}
            <div className="col-span-3 z-30 flex flex-col justify-center h-full pt-16">
              <div className="relative w-full flex flex-col gap-6">
                <AnimatePresence mode="popLayout">
                  {callouts[activeStage].right.map((item, idx) => (
                    <motion.div
                      key={`${activeStage}-right-${item.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col relative select-none"
                    >
                      {/* Row for Thumbnail & Name Pill */}
                      <div className="flex items-center">
                        {/* Circle Thumbnail */}
                        <div className="relative w-[66px] h-[66px] rounded-full border border-[#D62828] bg-white flex items-center justify-center p-1 shadow-md z-10 shrink-0">
                          <span className="absolute -top-1 -left-1 bg-[#D62828] text-white w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-black z-20 font-inter">10</span>
                          <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image src={item.img} alt={item.name} fill className="object-contain" />
                          </div>
                        </div>

                        {/* Name Pill tucked under the Circle */}
                        <div className="-ml-4 pl-6 pr-4 h-7 bg-[#D62828] rounded-r-full flex items-center z-0">
                          <span className="text-white text-[10.5px] font-black tracking-wider uppercase font-inter leading-none">
                            {item.name}
                          </span>
                        </div>
                      </div>

                      {/* Description underneath */}
                      <div className="pl-[74px] -mt-0.5 max-w-[210px]">
                        <p className="text-[11.5px] font-medium text-white/95 leading-tight whitespace-pre-line font-inter">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

        </div>
      </div>
    </div>

      {/* 2. Interactive Details Section */}
      <section 
        className="relative z-30 w-full h-screen bg-cover bg-center flex items-center justify-center m-0 p-0 overflow-hidden"
        style={{ backgroundImage: 'url("/Product/details/bg.webp")' }}
      >
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 items-stretch px-4 md:px-10 lg:px-16">
          
          {/* Left Column (col-span-6) - Green panel area with orbital selector and centered view */}
          <div className="md:col-span-6 relative h-full flex items-center justify-center p-8">

            {/* Unified Circular Selector & Preview Wheel */}
            <div className="relative w-[600px] h-[600px] z-10 flex items-center justify-center -ml-[140px] lg:-ml-[180px]">
              
              {/* Large Selected Product Image (placed exactly at the center of the orbit) */}
              <div className="relative w-[240px] h-[240px] z-20 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20 shadow-inner">
                {/* 360 spin badge */}
                <div className="absolute -top-12 -right-3 w-20 h-20 z-30 pointer-events-none drop-shadow-md">
                  <Image src="/Product/details/360.webp" alt="360 View" fill className="object-contain" />
                </div>
                
                {/* Large product image */}
                <div className="relative w-full h-full transition-all duration-500 transform hover:scale-105">
                  <img 
                    src={chickenParts[selectedPartIdx].img} 
                    alt={chickenParts[selectedPartIdx].name} 
                    className="w-full h-full object-contain filter drop-shadow-xl" 
                  />
                </div>
              </div>

              {/* Orbiting Selector Badges */}
              {chickenParts.map((part, idx) => {
                // Angle relative to selected index: selected item is always centered at 0 degrees (3 o'clock)
                const angle = (idx - selectedPartIdx) * 36;
                const rad = angle * Math.PI / 180;
                const radius = 230; // radius of orbit
                const x = 300 + radius * Math.cos(rad) - 32; // center of container is at 300px (width 600px)
                const y = 300 + radius * Math.sin(rad) - 32; // center of container is at 300px (height 600px)
                const isSelected = selectedPartIdx === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPartIdx(idx)}
                    style={{ 
                      left: `${x}px`, 
                      top: `${y}px`,
                      transition: 'left 0.8s cubic-bezier(0.25, 1, 0.5, 1), top 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s ease, border-color 0.3s ease'
                    }}
                    className={`absolute w-24 h-24 rounded-full border-2 flex items-center justify-center p-1 bg-white shadow-md hover:scale-110 z-30 cursor-pointer ${
                      isSelected 
                        ? 'border-[#D62828] scale-110 shadow-lg ring-4 ring-[#D62828]/20' 
                        : 'border-white/90 hover:border-[#82B224]'
                    }`}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <img src={part.img} alt={part.name} className="w-full h-full object-contain" />
                    </div>
                  </button>
                );
              })}

            </div>

          </div>

          {/* Right Column (col-span-6) - Product Detail Specs */}
          <div className="md:col-span-6 h-full py-6 px-6 md:px-8 lg:px-10 flex flex-col justify-center select-none">
            <div className="flex flex-col gap-3">
              <div className="text-[13px] font-normal text-slate-600 tracking-wider flex items-center gap-2 font-Manrope">
                <span>Home</span>
                <div className="relative w-2 h-3 flex items-center justify-center shrink-0">
                  <Image src="/Product/details/right aroow.svg" alt="arrow" fill className="object-contain opacity-60" />
                </div>
                <span>Products</span>
                <div className="relative w-2 h-3 flex items-center justify-center shrink-0">
                  <Image src="/Product/details/right aroow.svg" alt="arrow" fill className="object-contain opacity-60" />
                </div>
                <span>Chicken</span>
                <div className="relative w-2 h-3 flex items-center justify-center shrink-0">
                  <Image src="/Product/details/right aroow.svg" alt="arrow" fill className="object-contain opacity-60" />
                </div>
                <span className="text-slate-900 font-semibold">{chickenParts[selectedPartIdx].name}</span>
              </div>

              {/* Title Section */}
              <div className="space-y-0">
                <span className="text-[13px] font-semibold text-[#127431] tracking-widest uppercase font-manrope">CHICKEN</span>
                <h2 className="text-5xl font-bold text-slate-900 leading-none tracking-tight font-barlow-condensed uppercase">
                  CHICKEN <span className="text-[#127431]">{chickenParts[selectedPartIdx].name}</span>
                </h2>
              </div>

              {/* Description */}
              <p className="text-[13px] font-medium text-slate-700 leading-snug font-manrope">
                {chickenParts[selectedPartIdx].desc}
              </p>

              {/* Red Line Separator */}
              <div className="w-20 h-[2px] bg-[#D62828]" />

              {/* Package Weight specs */}
              <div className="flex items-center gap-4 py-1.5 border-y border-slate-200/50">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-semibold text-slate-900 tracking-wider uppercase font-manrope">PACKAGE WEIGHT</span>
                  <span className="text-xl font-bold text-slate-800 font-barlow-condensed">{chickenParts[selectedPartIdx].weight}</span>
                </div>
                <div className="w-[1px] h-6 bg-slate-300" />
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5">
                    <Image src="/Product/details/pack.webp" alt="Pack Icon" fill className="object-contain" />
                  </div>
                  <span className="text-[12px] font-semibold text-slate-900 tracking-wider uppercase font-manrope">MEATIN PACK</span>
                </div>
              </div>

              {/* Nutrition Info Cards */}
              <div className="space-y-1.5">
                <h4 className="text-[12px] font-semibold text-slate-900 tracking-wider uppercase font-manrope">NUTRITION INFORMATION (PER 100g)</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'PROTEIN', val: chickenParts[selectedPartIdx].nutrition.protein, icon: '/Product/details/protien.svg' },
                    { label: 'CALORIES', val: chickenParts[selectedPartIdx].nutrition.calories, icon: '/Product/details/calories.svg' },
                    { label: 'FAT', val: chickenParts[selectedPartIdx].nutrition.fat, icon: '/Product/details/fat.svg' },
                    { label: 'CARBS', val: chickenParts[selectedPartIdx].nutrition.carbs, icon: '/Product/details/carbs.svg' },
                  ].map((nut, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-2 text-center flex flex-col items-center justify-between min-h-[80px] shadow-sm">
                      <div className="relative w-6 h-6">
                        <Image src={nut.icon} alt={nut.label} fill className="object-contain" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-900 tracking-wider uppercase font-manrope">{nut.label}</span>
                      <span className="text-[12px] font-bold text-slate-800 font-barlow-condensed">{nut.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share buttons */}
              <div className="space-y-1.5">
                <h4 className="text-[12px] font-semibold text-slate-900 tracking-wider uppercase font-manrope">SHARE THIS PRODUCT</h4>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#127431] hover:bg-[#0B4F20] text-white text-[13px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 tracking-wider font-manrope cursor-pointer transition-colors shadow-sm">
                    <div className="relative w-4 h-4 shrink-0">
                      <Image src="/Footer/whatsapp.webp" alt="WhatsApp" fill className="object-contain" />
                    </div>
                    <span>WhatsApp</span>
                  </button>
                  <button className="flex-1 bg-[#3B5998] hover:bg-[#2D4373] text-white text-[13px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 tracking-wider font-manrope cursor-pointer transition-colors shadow-sm">
                    <div className="relative w-4 h-4 shrink-0">
                      <Image src="/Product/details/facebook.svg" alt="Facebook" fill className="object-contain" />
                    </div>
                    <span>Facebook</span>
                  </button>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[13px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 tracking-wider font-manrope cursor-pointer transition-colors shadow-sm">
                    <div className="relative w-4 h-4 shrink-0">
                      <Image src="/Product/details/link.webp" alt="Link" fill className="object-contain" />
                    </div>
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>

              <div className="border border-slate-200/80 bg-[#FAF0F0] rounded-2xl overflow-hidden shadow-sm relative flex gap-0 items-stretch">
              
              {/* Left - Square image */}
              <div className="relative w-[160px] shrink-0">
                <Image src="/Product/details/bottomCard.webp" alt="Recipe" fill className="object-cover" />
              </div>

              {/* Right - Content */}
              <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-extrabold text-[#D62828] tracking-widest uppercase font-manrope">
                    WHAT'S COOKING?
                  </span>
                  <span className="bg-[#D62828] text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider font-manrope">
                    TRENDING
                  </span>
                </div>

                {/* Title */}
                <h5 className="text-[16px] font-bold text-slate-900 leading-tight font-manrope">
                  Spicy Chicken {chickenParts[selectedPartIdx].name} Fry
                </h5>

                {/* Description */}
                <p className="text-[13px] text-slate-600 leading-relaxed font-manrope">
                  A Spicy and flavourful recipe that brings out the best in every {chickenParts[selectedPartIdx].name.toLowerCase()}.
                </p>

                {/* CTA Button */}
                <button className="w-full bg-[#D62828] hover:bg-[#b52020] text-white text-[14px] font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest font-manrope cursor-pointer transition-colors shadow-sm mt-1">
                  <span>EXPLORE RECIPE</span>
                  <span className="text-lg">→</span>
                </button>
              </div>

            </div>
            </div>

            
          </div>

        </div>
      </section>

      {/* 3. Recipes Section */}
      <section className="bg-[#EBFFE6]/20 py-20 px-4 md:px-16 border-t border-slate-100 relative z-30 select-none">
        <div className="max-w-[1200px] mx-auto space-y-12">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[2px] bg-[#D62828]" />
                <span className="text-[10px] font-black text-[#D62828] tracking-widest uppercase font-inter">RECIPES</span>
              </div>
              <h2 className="text-4xl font-extrabold text-[#153520] tracking-tight uppercase leading-none font-barlow-condensed">
                MEAT MADE <span className="text-[#82B224]">DELICIOUS.</span>
              </h2>
              <p className="text-[13px] font-medium text-slate-500 leading-relaxed font-inter">
                Explore trending meat recipes in quick, easy & delicious short-form videos.
              </p>
            </div>
            
            {/* Filter buttons */}
            <div className="flex gap-2">
              <button className="bg-[#D62828] text-white text-[10px] font-black py-2 px-6 rounded-full uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm">
                Most Popular
              </button>
              <button className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-[10px] font-black py-2 px-6 rounded-full uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm">
                New Recipes
              </button>
            </div>
          </div>

          {/* Recipes Grid (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Chicken Curry',
                label: 'BEST FOR CURRY',
                desc: 'Classic and flavourful chicken curry perfect with rice, chapati or dosa.',
                img: '/Product/recipies/leg1.webp',
                time: '35 mins',
                servings: '4 Servings',
                diff: 'Easy'
              },
              {
                title: 'BBQ Chicken Leg',
                label: 'BEST FOR BBQ',
                desc: 'Juicy and smoky BBQ chicken leg perfect for weekend grilling.',
                img: '/Product/recipies/leg2.webp',
                time: '45 mins',
                servings: '4 Servings',
                diff: 'Easy'
              },
              {
                title: 'Crispy Fried Chicken',
                label: 'BEST FOR FRY',
                desc: 'Crispy outside, tender inside. Perfect as a snack or side dish.',
                img: '/Product/recipies/leg3.webp',
                time: '25 mins',
                servings: '3 Servings',
                diff: 'Easy'
              },
              {
                title: 'Grilled Chicken Leg',
                label: 'BEST FOR FRY',
                desc: 'Healthy and delicious grilled chicken leg mild spices.',
                img: '/Product/recipies/leg4.webp',
                time: '30 mins',
                servings: '4 Servings',
                diff: 'Easy'
              }
            ].map((recipe, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
                
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image src={recipe.img} alt={recipe.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-[#D62828] text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {recipe.label}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h4 className="text-[16px] font-extrabold text-slate-800 leading-tight uppercase font-inter">{recipe.title}</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed font-inter">{recipe.desc}</p>
                  </div>

                  {/* Spec Row */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <div className="relative w-3.5 h-3.5">
                        <img src="/Product/recipies/easy.svg" alt="Difficulty" className="w-full h-full object-contain filter opacity-60" />
                      </div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider font-inter">{recipe.diff}</span>
                    </div>
                    <div className="w-[1px] h-3 bg-slate-200" />
                    <div className="flex items-center gap-1">
                      <div className="relative w-3.5 h-3.5">
                        <img src="/Product/recipies/time.svg" alt="Time" className="w-full h-full object-contain filter opacity-60" />
                      </div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider font-inter">{recipe.time}</span>
                    </div>
                    <div className="w-[1px] h-3 bg-slate-200" />
                    <div className="flex items-center gap-1">
                      <div className="relative w-3.5 h-3.5">
                        <Image src="/Product/recipies/servings.png" alt="Servings" fill className="object-contain filter opacity-60" />
                      </div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider font-inter">{recipe.servings}</span>
                    </div>
                  </div>
                </div>

                {/* View Recipe Button */}
                <div className="px-5 pb-5">
                  <button className="w-full bg-[#82B224] hover:bg-[#6C971B] text-white text-[10px] font-black py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 uppercase tracking-wider transition-colors cursor-pointer font-inter shadow-sm shadow-[#82B224]/10">
                    <span>View Recipe</span>
                    <div className="relative w-3 h-3">
                      <img src="/Product/recipies/rightArrow.svg" alt="Arrow" className="w-full h-full object-contain filter brightness-0 invert" />
                    </div>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom Panel Categories Section - Exactly matching mockup curve & overlapping mascot */}
      <section className="bg-[#EBFFE6] rounded-t-[60px] pt-12 pb-6 relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] mt-[-60px]">
        <div className="px-16 relative flex flex-col md:flex-row gap-8 items-center">
          
          {/* Overlapping Mascot on the left */}
          <div className="w-[180px] h-[270px] md:w-[220px] md:h-[330px] relative -mt-44 md:-mt-24 shrink-0 pointer-events-none drop-shadow-lg">
            <Image 
              src="/Product/Chicken/Banner/image 282.webp" 
              alt="Chicken Mascot" 
              fill 
              className="object-contain"
            />
          </div>

          {/* Heading and Categories grid */}
          <div className="flex-1 space-y-8 flex flex-col items-center">
            <div className="space-y-2 text-center -ml-[13%]">
              <h3 className="text-5xl font-bold text-[#127431] font-barlow-condensed tracking-widest uppercase">
                CATEGORIES
              </h3>
              <div className="w-32 h-[2.5px] bg-[#D62828] mx-auto mt-3 mb-1" />
              <p className="text-[15px] font-normal text-slate-500 tracking-wider font-inter">
                Premium quality meat, delivery fresh to your life.
              </p>
            </div>

            {/* Category Circular Badges horizontal list */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-around px-12 -ml-[10%] w-full">
              {categories.map((cat, idx) => (
                <React.Fragment key={idx}>
                  <Link 
                    href={cat.href}
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-full border-[5px] border-[#CCCCCC] bg-white flex items-center justify-center shadow-md shadow-slate-200/50 group-hover:scale-105 transition-all duration-300">
                      <div className="w-[68px] h-[68px] rounded-full bg-[#82B224] border-2 border-white flex items-center justify-center">
                        <div className="relative w-12 h-12">
                          <Image 
                            src={cat.icon} 
                            alt={cat.name} 
                            fill 
                            sizes="36px"
                            className="object-contain filter brightness-0 invert" 
                          />
                        </div>
                      </div>
                    </div>
                    <span className="text-[14px] font-black text-slate-800 tracking-wider uppercase group-hover:text-[#638913] transition-colors">
                      {cat.name}
                    </span>
                  </Link>

                  {idx < categories.length - 1 && (
                    <div className="hidden sm:block w-[1px] h-10 bg-slate-300/60 self-start mt-5 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
