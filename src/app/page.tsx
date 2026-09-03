"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import TrustedQualityBanner from "@/components/layout/TrustedQualityBanner";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 60, damping: 14 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function HomePage() {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  const certSectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: certScrollProgress } = useScroll({
    target: certSectionRef,
    offset: ["start end", "end start"],
  });
  const rawTruckY = useTransform(certScrollProgress, [0, 1], [-150, 1600]);
  const truckY = useSpring(rawTruckY, {
    stiffness: 250,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0001,
  });
  const certTruckOpacity = useTransform(
    certScrollProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );

  const section2Ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: section2ScrollProgress } = useScroll({
    target: section2Ref,
    offset: ["start 90%", "end 10%"],
  });

  const truckScrollX = useTransform(
    section2ScrollProgress,
    [0, 1],
    ["75vw", "-10vw"],
  );
  const truckScrollOpacity = useTransform(
    section2ScrollProgress,
    [0, 0.15, 0.85, 1],
    [0.2, 1, 1, 0.5],
  );
  const smoothTruckX = useSpring(truckScrollX, {
    stiffness: 250,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0001,
  });
  const smoothTruckOpacity = useSpring(truckScrollOpacity, {
    stiffness: 250,
    damping: 30,
    restDelta: 0.0001,
  });

  const roadScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["-1008px", "0px", "0px"],
  );
  const curbScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["-192px", "0px", "0px"],
  );

  const sign1ScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["-300px", "70vw", "70vw"],
  );
  const sign2ScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["-300px", "20vw", "20vw"],
  );
  const sign3ScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["100vw", "45vw", "45vw"],
  );
  const sign4ScrollX = useTransform(
    section2ScrollProgress,
    [0, 0.35, 1],
    ["100vw", "85vw", "85vw"],
  );

  const truckX = smoothTruckX;
  const truckOpacity = certTruckOpacity;

  const [currentFrame, setCurrentFrame] = React.useState(1);
  const [pointerEvents, setPointerEvents] = React.useState<"auto" | "none">(
    "auto",
  );
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    // Preload all frames to avoid flickering
    const totalFrames = 240;
    (window as any).__HERO_FRAMES__ = (window as any).__HERO_FRAMES__ || {};
    for (let i = 1; i <= totalFrames; i++) {
      const frameStr = String(i).padStart(5, "0");
      const url = `/Home/Hero/video-frames/${frameStr}.webp`;
      if (!(window as any).__HERO_FRAMES__[url]) {
        const img = new window.Image();
        img.src = url;
        (window as any).__HERO_FRAMES__[url] = img;
      }
    }

    // Trigger scroll bounds re-measurement once preloader reveals DOM
    const t1 = setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    const t2 = setTimeout(() => window.dispatchEvent(new Event("resize")), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // GPU-accelerated canvas drawing loop for smooth 60FPS video sequence
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameStr = String(currentFrame).padStart(5, "0");
    const frameUrl = `/Home/Hero/video-frames/${frameStr}.webp`;

    let img =
      typeof window !== "undefined"
        ? (window as any).__HERO_FRAMES__?.[frameUrl]
        : null;
    if (!img) {
      img = new window.Image();
      img.src = frameUrl;
    }

    const draw = () => {
      const containerWidth = canvas.clientWidth || window.innerWidth;
      const containerHeight = canvas.clientHeight || window.innerHeight;

      if (
        canvas.width !== containerWidth ||
        canvas.height !== containerHeight
      ) {
        canvas.width = containerWidth;
        canvas.height = containerHeight;
      }

      const imgWidth = img.naturalWidth || img.width || 1920;
      const imgHeight = img.naturalHeight || img.height || 1080;

      const hRatio = canvas.width / imgWidth;
      const vRatio = canvas.height / imgHeight;
      const ratio = Math.max(hRatio, vRatio);
      const shiftX = (canvas.width - imgWidth * ratio) / 2;
      const shiftY = (canvas.height - imgHeight * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        imgWidth,
        imgHeight,
        shiftX,
        shiftY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
    };

    if (img.complete) {
      draw();
    } else {
      img.onload = draw;
    }
  }, [currentFrame]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalFrames = 240;
    const frame = Math.min(
      totalFrames,
      Math.max(1, Math.floor(latest * totalFrames)),
    );
    setCurrentFrame(frame);
    if (latest > 0.4) {
      setPointerEvents("none");
    } else {
      setPointerEvents("auto");
    }
  });

  const heroContentOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const heroContentY = useTransform(smoothProgress, [0, 0.35], [0, -40]);

  const storySteps = [
    {
      title: "RESPONSIBLE BEGINNINGS",
      desc: "We source from trusted farms that follow responsible farming practices.",
      icon: "/Home/brand-story/brand-story-icons/responsible-beginnings.svg",
      image: "/Home/brand-story/images/responsible-beginnings.webp",
    },
    {
      title: "HEALTHY LIVESTOCK",
      desc: "Healthy livestock is the foundation of fresh, quality meat products.",
      icon: "/Home/brand-story/brand-story-icons/healthy-livestock.svg",
      image: "/Home/brand-story/images/healthy-livestock.webp",
    },
    {
      title: "SCIENTIFIC PROCESSING",
      desc: "Every product is processed using modern technology and strict hygiene standards.",
      icon: "/Home/brand-story/brand-story-icons/scientific-processing.svg",
      image: "/Home/brand-story/images/scientific-processing.webp",
    },
    {
      title: "QUALITY WITHOUT COMPROMISE",
      desc: "Every batch is carefully checked to ensure safety, freshness, and quality.",
      icon: "/Home/brand-story/brand-story-icons/quality-without-compromise.svg",
      image: "/Home/brand-story/images/quality-without-compromise.webp",
    },
    {
      title: "HYGIENIC PACKAGING",
      desc: "Products are packed in clean, safe conditions to lock in freshness.",
      icon: "/Home/brand-story/brand-story-icons/hygienic-packaging.svg",
      image: "/Home/brand-story/images/hygienic-packaging.webp",
    },
    {
      title: "DELIVERED WITH TRUST",
      desc: "Our cold-chain delivery keeps every product fresh from our facility to your doorstep.",
      icon: "/Home/brand-story/brand-story-icons/delivered-with-trust.svg",
      image: "/Home/brand-story/images/delivered-with-trust.webp",
    },
  ];

  const certificates = [
    {
      name: "FSSAI",
      sub: "CERTIFIED",
      desc: "Food Safety and Standards Authority of India Certified.",
      icon: "/Home/certifications/fssai-icon-image.webp",
      certificateImage: "/Home/certifications/fssai.webp",
      pdf: "/Home/certifications/certificates/FSSAI Central License (New)-2025-30 (1).pdf",
    },
    {
      name: "ISO",
      sub: "CERTIFIED",
      desc: "International Organization for Standardization.",
      icon: "/Home/certifications/iso-icon-image.webp",
      certificateImage: "/Home/certifications/iso-certificate-image.webp",
    },
    {
      name: "HACCP",
      sub: "CERTIFIED",
      desc: "Hazard Analysis and Critical Control Points Compliant.",
      icon: "/Home/certifications/haccp-icon-image.webp",
      certificateImage: "/Home/certifications/haccp-certificate-image.webp",
    },
    {
      name: "HALAL",
      sub: "CERTIFIED",
      desc: "Halal Certified Process and Product Assurance.",
      icon: "/Home/certifications/halal-icon-image.webp",
      certificateImage: "/Home/certifications/halal-certificate-image.webp",
      pdf: "/Home/certifications/certificates/Halal Cerificate 2025-2028.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0] overflow-x-clip font-manrope">
      {/* 1. HERO BANNER WITH STICKY SCROLL SEQUENCE */}
      <section ref={heroRef} className="relative w-full h-[300vh] bg-black">
        <div className="sticky top-0 left-0 w-full h-screen flex items-center bg-black overflow-hidden">
          {/* Background Frame Sequence Canvas */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover object-center brightness-[0.75] lg:brightness-100"
            />
            {/* Gradients for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 lg:via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="w-full max-w-[1400px] lg:max-w-[95vw] mx-auto px-6 sm:px-8 lg:px-[2.5vw] relative z-10 pt-[6rem]">
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
                    South India&apos;s{" "}
                    <span className="text-[#87B71D] font-bold">Largest</span>{" "}
                    Multi Species{" "}
                    <span className="text-[#87B71D] font-bold">Meat</span>{" "}
                    Processing Plant
                  </p>
                </motion.div>
              </div>

              {/* Right stamp overlay badge */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                  className="relative w-64 h-32 sm:w-72 sm:h-36 lg:w-80 lg:h-40 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] hidden sm:block lg:hidden"
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

          {/* Fixed bottom-right badge attached to the sticky hero container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
            className="absolute bottom-6 right-6 lg:bottom-8 lg:right-10 w-64 h-32 sm:w-72 sm:h-36 lg:w-80 lg:h-40 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] hidden lg:block z-20"
          >
            <Image
              src="/AboutUs/keralas-original.webp"
              alt="Kerala's Original Meat Badge"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. SECOND SECTION (MEATIN COLD CHAIN LOGISTICS TRUCK) */}
      <section
        ref={section2Ref}
        className="relative w-full bg-[#EBF6E4] pt-12 pb-24 sm:pt-16 sm:pb-28 md:pt-20 md:pb-32 overflow-hidden flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat min-h-[300px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[440px]"
        style={{
          backgroundImage: "url('/Home/truck-section/truck-section-bg.webp')",
        }}
      >
        {/* Animated Truck Assembly Moving Right-To-Left as User Scrolls Down */}
        <div className="w-full max-w-[95%] px-4 sm:px-8 relative z-10 flex justify-start items-center my-auto">
          <motion.div
            style={{ x: smoothTruckX, opacity: smoothTruckOpacity }}
            className="relative w-full aspect-[4096/1339] max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[620px] xl:max-w-[740px] 2xl:max-w-[850px]"
          >
            {/* Ground Soft Shadow */}
            <div className="absolute -bottom-[4%] left-[4%] right-[4%] h-[12%] bg-black/20 blur-lg rounded-full z-0" />

            {/* Vector Truck SVG with animated rotating tires */}
            <motion.div
              animate={{ y: [-1.5, 1.5, -1.5] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
            >
              <Image
                src="/Home/truck-section/truckWithTire.svg"
                alt="Meatin Cold Chain Delivery Truck with Animated Rotating Tires"
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Trailing Rope Hook attached vertically centered to the back of truck trailer */}
            <motion.div
              animate={{ rotate: [-14, -6, -14], y: [-2, 3, -2] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "left center" }}
              className="absolute left-[97%] top-[16%] w-[22%] aspect-[317/194] z-10 pointer-events-none filter drop-shadow-md "
            >
              <Image
                src="/Home/truck-section/hoock.webp"
                alt="Truck Rope Hook"
                fill
                className="object-contain rotate-[12deg]"
              />

              {/* Delivered Fresh Vector Banner attached to the end of the rope hook */}
              <motion.div
                animate={{
                  rotate: [-4, 4, -4],
                  y: [-4, 5, -4],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                style={{ transformOrigin: "left center" }}
                className="absolute left-[85%] top-[18%] w-[270%] aspect-[499/157] filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
              >
                <Image
                  src="/Home/truck-section/delivered-fresh-text.svg"
                  alt="Delivered Fresh"
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave SVG transition divider matching the Brand Story top color */}
        <div className="absolute bottom-0 left-0 right-0 h-[35px] sm:h-[55px] md:h-[90px] w-full z-20 pointer-events-none overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-[35px] sm:h-[55px] md:h-[90px]"
            viewBox="0 0 1920 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0C755.182 107.73 1158.5 130.5 1920 0V130.5H0V0Z"
              fill="#064823"
            />
          </svg>
        </div>
      </section>

      {/* 3. BRAND STORY / TIMELINE SECTION */}
      <section
        className="relative w-full pt-10 pb-10 text-white overflow-hidden"
        style={{
          background: "radial-gradient(circle at center, #458A3F 0%, #064823 100%)",
        }}
      >
        {/* Absolute Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
          <Image
            src="/Home/section-bg.webp"
            alt="Background pattern"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="w-full max-w-[1400px] lg:max-w-[92vw] mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center mb-4 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 sm:w-12 bg-white" />
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white font-manrope">
                BRAND STORY
              </h4>
              <div className="h-[1.5px] w-8 sm:w-12 bg-white" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-[4vw] font-normal font-chau tracking-tight leading-none mb-4">
              More Than Meat. It&apos;s{" "}
              <span className="text-[#FFC72C]">Our</span> Promise.
            </h2>
            <p className="text-[#F6F5F0]/90 text-sm sm:text-base max-w-2xl mx-auto font-manrope font-semibold leading-relaxed">
              From farm tp fork, every step we talk is guided by science, driven
              by care and delivered with trust.
            </p>
          </motion.div>

          {/* Timeline Cards Grid with Alternating Staggered Heights */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 xl:gap-4 items-stretch pt-8 pb-2"
          >
            {storySteps.map((step, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-[20px] border border-white/80 shadow-lg hover:shadow-2xl flex flex-col justify-between h-max overflow-hidden group min-h-[360px] relative ${idx % 2 === 0 ? 'xl:-mt-10' : 'xl:mt-14'}`}
                >
                  {/* Top Image Frame (with icon and title inside) */}
                  <div className="relative w-full h-[300px] overflow-hidden flex flex-col justify-end pb-4 items-center">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover object-top"
                    />
                    {/* Bottom gradient fade to white */}
                    <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

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
                  <div className="bg-white pb-8 px-4 flex-1 flex flex-col items-center justify-start text-center relative z-20 -mt-px">
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
      <section ref={certSectionRef} className="relative w-full pt-10 pb-4 lg:pt-12 lg:pb-6 overflow-hidden">
        {/* Section Background Image */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[#DCDBDB]">
          <Image
            src="/Home/gray-bg-image.webp"
            alt="Section background"
            fill
            className="object-cover opacity-[0.8]"
            priority
          />
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-5">
          {/* Creative vertical green truck graphics on left side gutter */}
          <motion.div
            style={{ y: truckY, opacity: truckOpacity }}
            className="absolute left-[-85px] xl:left-[-100px] top-[-100px] w-40 xl:w-44 h-[700px] hidden lg:block pointer-events-none z-0"
          >
            <div className="relative w-full h-full">
              <Image
                src="/Home/certifications/truck-image-certificates.webp"
                alt="Logistic transport graphic"
                fill
                className="object-contain object-top"
              />
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center mb-14 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 sm:w-12 bg-[#D4A437]" />
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#153520] font-manrope">
                OUR PROMISE
              </h4>
              <div className="h-[1.5px] w-8 sm:w-12 bg-[#D4A437]" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-[4vw] font-normal font-chau tracking-tight leading-none mb-4">
              <span className="text-[#D62828]">Certified</span>{" "}
              <span className="text-[#153520]">Excellence</span>
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
            viewport={{ once: false, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-y-16 md:gap-y-12 gap-x-6 lg:gap-x-8 lg:pl-12 xl:pl-24 items-stretch"
          >
            {certificates.map((cert, idx) => {
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white rounded-[28px] border border-slate-200/80 shadow-[0_12px_36px_rgba(0,0,0,0.035)] px-3.5 py-4 pt-12 flex flex-col justify-between items-center text-center relative hover:scale-[1.03] hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] hover:border-[#1F5A3C]/20 transition-all duration-300 ease-out min-h-[380px] certificate-parent-card"
                >
                  {/* Top Circle logo overlay badge */}
                  <div className="w-20 h-20 bg-white border border-slate-100 rounded-full flex items-center justify-center p-2 shadow-lg shadow-slate-200/60 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
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
                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#1F5A3C] font-barlow tracking-wide uppercase leading-none mb-1">{cert.name}</h4>
                    <span className="inline-block bg-[#7CB325] text-white px-3 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-2 leading-none">
                      {cert.sub}
                    </span>
                    <p className="text-[11px] text-slate-500 font-bold sm:max-w-none  mb-2 leading-normal flex items-center justify-center min-h-[32px]">
                      {cert.desc}
                    </p>
                  </div>

                  {/* Certificate Image Frame */}
                  <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden mb-2.5 h-[160px]">
                    <Image
                      src={cert.certificateImage}
                      alt={`${cert.name} Certificate`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Action Buttons Stack (One Below The Other) */}
                  <div className="flex flex-col gap-1.5 w-full mt-1">
                    <button
                      onClick={() => {
                        if (cert.pdf) {
                          window.open(cert.pdf, "_blank");
                        } else {
                          alert(
                            `${cert.name} certificate PDF is currently unavailable and will be updated soon.`,
                          );
                        }
                      }}
                      className="bg-[#153520] hover:bg-[#1c452b] text-white text-[11px] font-extrabold h-9 px-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 uppercase tracking-wider shadow-sm w-full whitespace-nowrap cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-[#D4A437] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>VIEW CERTIFICATE</span>
                    </button>
                    <button
                      onClick={() => {
                        if (cert.pdf) {
                          const link = document.createElement("a");
                          link.href = cert.pdf;
                          link.download =
                            cert.pdf.split("/").pop() || "certificate.pdf";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } else {
                          alert(
                            `${cert.name} certificate PDF is currently unavailable and will be updated soon.`,
                          );
                        }
                      }}
                      className="bg-white hover:bg-slate-50 border border-[#153520] text-[#153520] text-[11px] font-extrabold h-9 px-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 hover:shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider shadow-sm w-full whitespace-nowrap cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-[#153520] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>DOWNLOAD PDF</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* 4. TRUST BANNER (Combined seamlessly inside same section) */}
        <TrustedQualityBanner className="pt-4 lg:pt-6 pb-2 lg:pb-4" />
      </section>
    </div>
  );
}
