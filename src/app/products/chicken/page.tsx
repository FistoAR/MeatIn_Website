"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

export default function ChickenProductPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsSectionRef = useRef<HTMLDivElement>(null);
  const centerCircleRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<
    "skin" | "skinless" | "inside"
  >("skin");
  const [activeMeatType, setActiveMeatType] = useState<
    "chicken" | "beef" | "goat"
  >("chicken");
  const [selectedPartIdx, setSelectedPartIdx] = useState(0);
  const [manuallySelectedPartIdx, setManuallySelectedPartIdx] = useState(0);
  const [activeViewTab, setActiveViewTab] = useState<"raw" | "packed">("raw");
  const [isLandedInSection2, setIsLandedInSection2] = useState(false);
  const [hasSelectedAnyPart, setHasSelectedAnyPart] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectPartManually = (idx: number) => {
    setSelectedPartIdx(idx);
    setManuallySelectedPartIdx(idx);
    setActiveViewTab("raw");
    setIsLandedInSection2(true);
    setHasSelectedAnyPart(true);
  };

  useEffect(() => {
    if (activeStage !== "inside") {
      const validIndices = [0, 2, 3, 4, 5, 8];
      if (!validIndices.includes(selectedPartIdx)) {
        setSelectedPartIdx(0);
      }
    }
  }, [activeStage]);

  useEffect(() => {
    if (!mounted || hoveredPart !== null) return;

    const interval = setInterval(() => {
      if (activeStage === "inside") {
        setSelectedPartIdx((prev) => (prev + 1) % 10);
      } else {
        const validIndices = [0, 2, 3, 4, 5, 8];
        setSelectedPartIdx((prev) => {
          const currPos = validIndices.indexOf(prev);
          const nextPos =
            currPos === -1 ? 0 : (currPos + 1) % validIndices.length;
          return validIndices[nextPos];
        });
      }
    }, 3500); // 3.5s auto-selection cycle for slow, graceful line drawing

    return () => clearInterval(interval);
  }, [mounted, activeStage, hoveredPart]);

  const [animatingPart, setAnimatingPart] = useState<{
    img: string;
    name: string;
    startRect: { top: number; left: number; width: number; height: number };
    targetRect?: { top: number; left: number; width: number; height: number };
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    if (animatingPart && !animatingPart.targetRect && centerCircleRef.current) {
      const updateTarget = () => {
        if (!centerCircleRef.current) return;
        const cr = centerCircleRef.current.getBoundingClientRect();
        if (cr.width > 0 && cr.height > 0) {
          let targetY = 0;
          if (
            detailsSectionRef.current &&
            detailsSectionRef.current.offsetTop > 0
          ) {
            targetY = detailsSectionRef.current.offsetTop;
          } else if (containerRef.current) {
            targetY =
              containerRef.current.offsetTop +
              containerRef.current.offsetHeight;
          }
          const currentScrollY =
            window.pageYOffset || document.documentElement.scrollTop;
          const scrollDiff = targetY - currentScrollY;

          setAnimatingPart((prev) =>
            prev
              ? {
                  ...prev,
                  targetRect: {
                    top: cr.top - scrollDiff + cr.height / 2,
                    left: cr.left + cr.width / 2,
                    width: cr.width,
                    height: cr.height,
                  },
                }
              : null,
          );
        }
      };

      updateTarget();
      const raf = requestAnimationFrame(updateTarget);
      return () => cancelAnimationFrame(raf);
    }
  }, [animatingPart, hasSelectedAnyPart]);

  const handlePartClick = (
    e: React.MouseEvent<HTMLElement>,
    item: { name: string; img: string },
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setHasSelectedAnyPart(true);
    setIsLandedInSection2(false);

    if (detailsSectionRef.current) {
      detailsSectionRef.current.classList.remove("hidden");
      detailsSectionRef.current.classList.add("block");
    }

    const targetEl = e.currentTarget;
    const circleEl =
      targetEl.querySelector(".w-\\[85px\\]") ||
      targetEl.querySelector("img")?.parentElement ||
      targetEl;

    const r = circleEl.getBoundingClientRect();
    const startTop = r.top !== undefined && r.top !== 0 ? r.top : 150;
    const startLeft = r.left !== undefined && r.left !== 0 ? r.left : 150;
    const startWidth = r.width || 85;
    const startHeight = r.height || 85;

    let targetY = 0;
    if (detailsSectionRef.current && detailsSectionRef.current.offsetTop > 0) {
      targetY = detailsSectionRef.current.offsetTop;
    } else if (containerRef.current) {
      targetY =
        containerRef.current.offsetTop + containerRef.current.offsetHeight;
    }

    const currentScrollY =
      window.pageYOffset || document.documentElement.scrollTop;
    const scrollDiff = targetY - currentScrollY;

    let targetRect:
      | { top: number; left: number; width: number; height: number }
      | undefined;

    if (centerCircleRef.current) {
      const cr = centerCircleRef.current.getBoundingClientRect();
      if (cr.width > 0 && cr.height > 0) {
        targetRect = {
          top: cr.top - scrollDiff + cr.height / 2,
          left: cr.left + cr.width / 2,
          width: cr.width,
          height: cr.height,
        };
      }
    }

    if (!targetRect && typeof window !== "undefined") {
      const isMob = window.innerWidth < 768;
      const isShort = window.innerHeight <= 620;
      const isMed = window.innerHeight <= 750;
      const boxW = isMob
        ? 280
        : isShort
          ? 320
          : isMed
            ? 380
            : window.innerWidth >= 1400
              ? 480
              : 440;
      const boxH = boxW;
      const targetLeft = isMob
        ? window.innerWidth * 0.5
        : window.innerWidth * 0.25 - 40;
      const targetTop = isMob
        ? window.innerHeight * 0.27
        : window.innerHeight * 0.46;
      targetRect = {
        top: targetTop,
        left: targetLeft,
        width: boxW,
        height: boxH,
      };
    }

    setAnimatingPart({
      img: item.img,
      name: item.name,
      startRect: {
        top: startTop,
        left: startLeft,
        width: startWidth,
        height: startHeight,
      },
      targetRect,
      timestamp: Date.now(),
    });

    const normalized = item.name.toLowerCase().trim();
    const foundIdx = chickenParts.findIndex((part) => {
      const partName = part.name.toLowerCase().trim();
      if (normalized === "brest" && partName === "breast") return true;
      if (normalized === "bact" && partName === "back") return true;
      return (
        partName === normalized ||
        normalized.includes(partName) ||
        partName.includes(normalized)
      );
    });

    if (foundIdx !== -1) {
      setSelectedPartIdx(foundIdx);
      setManuallySelectedPartIdx(foundIdx);
      setActiveViewTab("raw");
    }

    const fastSmoothScrollTo = (targetY: number, duration = 650) => {
      const startY = window.pageYOffset || document.documentElement.scrollTop;
      const distance = targetY - startY;
      if (Math.abs(distance) < 5) return;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startY + distance * easeOut);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    let scrollTargetY = 0;
    if (detailsSectionRef.current && detailsSectionRef.current.offsetTop > 0) {
      scrollTargetY = detailsSectionRef.current.offsetTop;
    } else if (containerRef.current) {
      scrollTargetY =
        containerRef.current.offsetTop + containerRef.current.offsetHeight;
    }

    if (scrollTargetY > 0) {
      fastSmoothScrollTo(scrollTargetY, 650);
    }
  };

  const isPartSelected = (itemName: string) => {
    const normalized = itemName.toLowerCase().trim();
    const currentPartName =
      chickenParts[selectedPartIdx]?.name.toLowerCase().trim() || "";
    if (normalized === "brest" && currentPartName === "breast") return true;
    if (normalized === "bact" && currentPartName === "back") return true;
    return (
      normalized === currentPartName ||
      currentPartName.includes(normalized) ||
      normalized.includes(currentPartName)
    );
  };

  const isPartActive = (itemName: string) => {
    if (hoveredPart !== null) {
      const normHover = hoveredPart.toLowerCase().trim();
      const normItem = itemName.toLowerCase().trim();
      if (normHover === "brest" && normItem === "breast") return true;
      if (normItem === "brest" && normHover === "breast") return true;
      if (normHover === "bact" && normItem === "back") return true;
      if (normItem === "bact" && normHover === "back") return true;
      return (
        normHover === normItem ||
        normHover.includes(normItem) ||
        normItem.includes(normHover)
      );
    }
    return isPartSelected(itemName);
  };

  const isPartHovered = (itemName: string) => {
    if (hoveredPart === null || activeStage !== "inside") return false;
    const normHover = hoveredPart.toLowerCase().trim();
    const normItem = itemName.toLowerCase().trim();
    if (normHover === "brest" && normItem === "breast") return true;
    if (normItem === "brest" && normHover === "breast") return true;
    if (normHover === "bact" && normItem === "back") return true;
    if (normItem === "bact" && normHover === "back") return true;
    return (
      normHover === normItem ||
      normHover.includes(normItem) ||
      normItem.includes(normHover)
    );
  };

  const chickenParts = [
    {
      name: "Wing",
      img: "/Product/Chicken/ChickenParts/wing.webp",
      desc: "Crispy and delicious chicken wings, perfect for deep frying, barbecue, or baking with your favorite glaze.",
      weight: "500g",
      nutrition: {
        protein: "18.5 g",
        calories: "203 kcal",
        fat: "14.0 g",
        carbs: "0 g",
      },
    },
    {
      name: "Heart",
      img: "/Product/Chicken/ChickenParts/heart.webp",
      desc: "Clean and trimmed chicken hearts. High in protein and iron with a firm, chewy texture, excellent for skewers and stir-fries.",
      weight: "500g",
      nutrition: {
        protein: "16.0 g",
        calories: "150 kcal",
        fat: "9.0 g",
        carbs: "0 g",
      },
    },
    {
      name: "Drumette",
      img: "/Product/Chicken/ChickenParts/drumette.webp",
      desc: "Juicy and meaty drumettes, the perfect party starter. Great for spicy buffalo wings or crispy batter fry.",
      weight: "500g",
      nutrition: {
        protein: "19.0 g",
        calories: "170 kcal",
        fat: "9.5 g",
        carbs: "0 g",
      },
    },
    {
      name: "Thigh",
      img: "/Product/Chicken/ChickenParts/thig.webp",
      desc: "Flavorful and tender chicken thighs, bone-in and skin-on. Holds moisture perfectly for slow cooking and roasts.",
      weight: "500g",
      nutrition: {
        protein: "18.0 g",
        calories: "209 kcal",
        fat: "15.0 g",
        carbs: "0 g",
      },
    },
    {
      name: "Neck",
      img: "/Product/Chicken/ChickenParts/neck.webp",
      desc: "Rich bone-in chicken necks, perfect for preparing highly nutritious stocks, soups, and slow-cooked gravies.",
      weight: "500g",
      nutrition: {
        protein: "16.0 g",
        calories: "180 kcal",
        fat: "12.0 g",
        carbs: "0 g",
      },
    },
    {
      name: "Breast",
      img: "/Product/Chicken/ChickenParts/brest.webp",
      desc: "Lean and protein-rich boneless chicken breast fillets. Extremely versatile and perfect for healthy salads, grilling, and baking.",
      weight: "500g",
      nutrition: {
        protein: "23.0 g",
        calories: "165 kcal",
        fat: "3.6 g",
        carbs: "0 g",
      },
    },
    {
      name: "Back",
      img: "/Product/Chicken/ChickenParts/bact.webp",
      desc: "Clean-cut chicken backs, rich in marrow and collagen. The ultimate choice for deep, flavorful bone broths and stocks.",
      weight: "500g",
      nutrition: {
        protein: "15.0 g",
        calories: "220 kcal",
        fat: "17.0 g",
        carbs: "0 g",
      },
    },
    {
      name: "Liver",
      img: "/Product/Chicken/ChickenParts/liver.webp",
      desc: "Fresh and nutrient-dense chicken liver, rich in iron, vitamin A, and essential vitamins. Soft texture and rich taste.",
      weight: "500g",
      nutrition: {
        protein: "17.2 g",
        calories: "119 kcal",
        fat: "4.8 g",
        carbs: "0 g",
      },
    },
    {
      name: "Drumstick",
      img: "/Product/Chicken/ChickenParts/drumstick.webp",
      desc: "Tender and juicy drumsticks, perfectly cut and hygienically packed to retain natural freshness and rich taste in every bite.",
      weight: "500g",
      nutrition: {
        protein: "20.4 g",
        calories: "160 kcal",
        fat: "7.0 g",
        carbs: "0 g",
      },
    },
    {
      name: "Gizzard",
      img: "/Product/Chicken/ChickenParts/gizzard.webp",
      desc: "Tough and highly flavorful chicken gizzards. Firm texture that becomes beautifully tender when braised or slow-cooked.",
      weight: "500g",
      nutrition: {
        protein: "18.0 g",
        calories: "94 kcal",
        fat: "2.0 g",
        carbs: "0 g",
      },
    },
  ];

  // Track page scroll inside the interactive visualizer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate clip path values for the scroll-peel layers
  // Layer 3 (Skin): Peels off from scroll progress 0.05 to 0.40
  const skinProgress = useTransform(scrollYProgress, [0.05, 0.4], [120, -20]);
  const skinClipPath = useTransform(
    skinProgress,
    (p) => `polygon(0 0, ${p}% 0, ${p - 25}% 100%, 0 100%)`,
  );

  // Layer 2 (Skinless Meat): Peels off from scroll progress 0.42 to 0.70 to reveal the inside
  const meatProgress = useTransform(scrollYProgress, [0.42, 0.7], [120, -20]);
  const meatClipPath = useTransform(
    meatProgress,
    (p) => `polygon(0 0, ${p}% 0, ${p - 25}% 100%, 0 100%)`,
  );

  // Update active stage and titles based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActiveStage("skin");
    } else if (latest >= 0.35 && latest < 0.58) {
      setActiveStage("skinless");
    } else {
      setActiveStage("inside");
    }
  });

  // Main Header Text Config based on scroll phase
  const headerTitle = {
    skin: { main: "WITH SKIN", sub: "CHICKEN", isWhite: false },
    skinless: { main: "WITHOUT SKIN", sub: "CHICKEN", isWhite: false },
    inside: { main: "WHOLE CHICKEN", sub: "CHICKEN", isWhite: true },
  };

  // Shared base parts for skin & skinless layers (identical — no duplication)
  const baseParts = {
    left: [
      {
        name: "WING",
        desc: "Great for frying,\ngrilling & BBQ",
        img: "/Product/Chicken/ChickenParts/wing.webp",
        id: "wing",
      },
      {
        name: "DRUMETTE",
        desc: "Juicy & tender.\nPerfect for snacks",
        img: "/Product/Chicken/ChickenParts/drumette.webp",
        id: "drumette",
      },
      {
        name: "THIGH",
        desc: "Tender & flavourful.\nIdeal for curries & roasts",
        img: "/Product/Chicken/ChickenParts/thig.webp",
        id: "thigh",
      },
    ],
    right: [
      {
        name: "NECK",
        desc: "Great for stocks\n& Soups",
        img: "/Product/Chicken/ChickenParts/neck.webp",
        id: "neck",
      },
      {
        name: "BREST",
        desc: "Lean & protein rich. Best\nfor grilling & healthy meals",
        img: "/Product/Chicken/ChickenParts/brest.webp",
        id: "brest",
      },
      {
        name: "DRUMSTICK",
        desc: "Juicy & meaty.\nPerfect for curries & grilling",
        img: "/Product/Chicken/ChickenParts/drumstick.webp",
        id: "drumstick",
      },
    ],
    bottom: [] as { name: string; desc: string; img: string; id: string }[],
  };

  // Callouts data — skin & skinless share baseParts, inside adds organ/back cuts
  const callouts = {
    skin: baseParts,
    skinless: baseParts,
    inside: {
      left: [
        baseParts.left[0], // WING
        {
          name: "HEART",
          desc: "High protein &\nrich in iron.",
          img: "/Product/Chicken/ChickenParts/heart.webp",
          id: "heart",
        },
        baseParts.left[1], // DRUMETTE
        baseParts.left[2], // THIGH
      ],
      right: [
        baseParts.right[0], // NECK
        baseParts.right[1], // BREST
        {
          name: "BACT",
          desc: "Great for stocks,\nsoups & broths",
          img: "/Product/Chicken/ChickenParts/bact.webp",
          id: "bact",
        },
        {
          name: "LIVER",
          desc: "Rich in Iron\n& Vitamins",
          img: "/Product/Chicken/ChickenParts/liver.webp",
          id: "liver",
        },
        baseParts.right[2], // DRUMSTICK
      ],
      bottom: [
        {
          name: "GIZZARD",
          desc: "Tough &\nFlavourful",
          img: "/Product/Chicken/ChickenParts/gizzard.webp",
          id: "gizzard",
        },
      ],
    },
  };

  // Categories under the white panel
  const categories = [
    {
      name: "CHICKEN",
      href: "/products/chicken",
      icon: "/Product/Chicken/Banner/image 298.webp",
    },
    {
      name: "BUFFALO",
      href: "/products/buffalo",
      icon: "/Product/Chicken/Banner/image 298 (1).webp",
    },
    {
      name: "MUTTON",
      href: "/products/mutton",
      icon: "/Product/Chicken/Banner/image 298 (2).webp",
    },
    {
      name: "DUCK",
      href: "/products/duck",
      icon: "/Product/Chicken/Banner/image 298 (3).webp",
    },
    {
      name: "QUAIL",
      href: "/products/quail",
      icon: "/Product/Chicken/Banner/image 298 (4).webp",
    },
    {
      name: "BURGER PATTY",
      href: "/products/burger-patty",
      icon: "/Product/Chicken/Banner/image 298.webp",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#E4E4E4] relative font-manrope selection:bg-white/20 selection:text-white">
      {/* Background Doodle Repeat Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.7] bg-repeat"
        style={{
          backgroundImage: 'url("/Product/Chicken/doodle.webp")',
          backgroundSize: "800px",
        }}
      />

      {/* Interactive Visualizer Container */}
      <style>{`
        @media (max-height: 750px) {
          .viz-sticky-wrap {
            padding-top: 88px !important;
            padding-bottom: 4px !important;
          }
          .viz-beef-img-wrap {
            height: 350px !important;
            max-height: 48vh !important;
            transform: translateY(-24px) !important;
          }
          .viz-grid-wrap {
            margin-top: 0px !important;
            max-width: 1200px !important;
          }
          .viz-center-col {
            height: 380px !important;
          }
          .viz-chicken-box {
            width: 330px !important;
            height: 330px !important;
          }
          .viz-card-circle {
            width: 68px !important;
            height: 68px !important;
            padding: 4px !important;
          }
          .viz-card-badge {
            width: 18px !important;
            height: 18px !important;
            font-size: 11px !important;
          }
          .viz-card-desc-wrap {
            height: 72px !important;
            margin-left: -20px !important;
          }
          .viz-card-pill {
            min-width: 120px !important;
            padding: 3px 20px 3px 26px !important;
          }
          .viz-card-pill-text {
            font-size: 13.5px !important;
          }
          .viz-card-desc-text {
            font-size: 10.5px !important;
            max-width: 155px !important;
            padding-left: 26px !important;
          }
          .viz-inside-list {
            gap: 11px !important;
          }
          .viz-gizzard-pos {
            bottom: -58px !important;
          }
          .selected-part .viz-card-pill {
            padding-left: 36px !important;
          }
          .selected-part .viz-card-desc-text {
            padding-left: 36px !important;
          }
          .viz-switcher-container {
            top: 8px !important;
            height: 32px !important;
            font-size: 11px !important;
          }
          .viz-switcher-btn {
            padding-left: 14px !important;
            padding-right: 14px !important;
            font-size: 11px !important;
          }
          .viz-switcher-btn div {
            width: 10px !important;
            height: 10px !important;
            bottom: -5px !important;
          }
          .viz-title-sub {
            font-size: 18px !important;
          }
          .viz-title-sub span {
            font-size: 18px !important;
          }
          .viz-title-sub img {
            width: 26px !important;
            height: 26px !important;
          }
          .viz-title-main {
            font-size: 36px !important;
          }
          .viz-title-tagline {
            font-size: 14px !important;
          }
          /* Section 2 details responsive overrides for height breakpoints */
          @media (max-height: 620px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 100px !important;
              padding-bottom: 4px !important;
            }
            .detail-showcase-box {
              width: 320px !important;
              height: 320px !important;
            }
            .detail-right-col {
              gap: 4px !important;
              justify-content: flex-start !important;
              padding-top: 0px !important;
            }
            .detail-inner-gap {
              gap: 4px !important;
            }
            .detail-title {
              font-size: 26px !important;
            }
            .detail-desc {
              font-size: 12px !important;
              line-height: 1.2 !important;
              max-width: 480px !important;
              line-clamp: 2 !important;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .detail-nutrition-grid {
              gap: 6px !important;
            }
            .detail-nutrition-card {
              min-height: 48px !important;
              padding: 3px !important;
              gap: 1px !important;
            }
            .detail-nutrition-card .relative {
              width: 16px !important;
              height: 16px !important;
            }
            .detail-nutrition-card span {
              font-size: 9.5px !important;
            }
            .detail-nutrition-card span:last-of-type {
              font-size: 11.5px !important;
            }
            .detail-share-btn {
              padding-top: 3px !important;
              padding-bottom: 3px !important;
              font-size: 10px !important;
            }
            .detail-share-btn .relative {
              width: 12px !important;
              height: 12px !important;
            }
            .detail-cooking-card {
              margin-top: 2px !important;
            }
            .detail-cooking-img {
              width: 95px !important;
            }
            .detail-cooking-content {
              padding: 6px 10px !important;
              gap: 2px !important;
            }
            .detail-cooking-content span {
              font-size: 11.5px !important;
            }
            .detail-cooking-content h5 {
              font-size: 12px !important;
            }
            .detail-cooking-content p {
              font-size: 10.5px !important;
              line-height: 1.2 !important;
              line-clamp: 1 !important;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .detail-cooking-content button {
              font-size: 10px !important;
              padding: 4px 10px !important;
              width: auto !important;
              max-width: max-content !important;
              white-space: nowrap !important;
            }
          }

          @media (min-height: 621px) and (max-height: 665px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 108px !important;
              padding-bottom: 6px !important;
            }
            .detail-showcase-box {
              width: 360px !important;
              height: 360px !important;
            }
            .detail-right-col {
              gap: 6px !important;
              justify-content: flex-start !important;
              padding-top: 0px !important;
            }
            .detail-inner-gap {
              gap: 6px !important;
            }
            .detail-title {
              font-size: 28px !important;
            }
            .detail-desc {
              font-size: 12.5px !important;
              line-height: 1.28 !important;
              max-width: 500px !important;
              line-clamp: 2 !important;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .detail-nutrition-grid {
              gap: 7px !important;
            }
            .detail-nutrition-card {
              min-height: 50px !important;
              padding: 4px !important;
              gap: 1px !important;
            }
            .detail-nutrition-card .relative {
              width: 17px !important;
              height: 17px !important;
            }
            .detail-nutrition-card span {
              font-size: 9.5px !important;
            }
            .detail-share-btn {
              padding-top: 4px !important;
              padding-bottom: 4px !important;
              font-size: 10.5px !important;
            }
            .detail-cooking-card {
              margin-top: 6px !important;
            }
            .detail-cooking-img {
              width: 105px !important;
            }
            .detail-cooking-content {
              padding: 7px 11px !important;
              gap: 2.5px !important;
            }
            .detail-cooking-content button {
              font-size: 10.5px !important;
              padding: 4.5px 11px !important;
              width: auto !important;
              max-width: max-content !important;
              white-space: nowrap !important;
            }
          }

          @media (min-height: 666px) and (max-height: 750px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 110px !important;
              padding-bottom: 8px !important;
            }
            .detail-showcase-box {
              width: 400px !important;
              height: 400px !important;
              max-width: 42vw !important;
              max-height: 56vh !important;
            }
            .detail-right-col {
              gap: 10px !important;
              justify-content: flex-start !important;
              padding-top: 0px !important;
            }
            .detail-inner-gap {
              gap: 10px !important;
            }
            .detail-title {
              font-size: 30px !important;
            }
            .detail-desc {
              font-size: 13px !important;
              line-height: 1.3 !important;
              max-width: 520px !important;
              line-clamp: 2 !important;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .detail-nutrition-grid {
              gap: 7px !important;
            }
            .detail-nutrition-card {
              min-height: 52px !important;
              padding: 4px !important;
              gap: 1px !important;
            }
            .detail-nutrition-card .relative {
              width: 18px !important;
              height: 18px !important;
            }
            .detail-nutrition-card span {
              font-size: 10px !important;
            }
            .detail-share-btn {
              padding-top: 4px !important;
              padding-bottom: 4px !important;
              font-size: 11px !important;
            }
            .detail-cooking-card {
              margin-top: 8px !important;
            }
            .detail-cooking-img {
              width: 110px !important;
            }
            .detail-cooking-content {
              padding: 8px 12px !important;
              gap: 2.5px !important;
            }
            .detail-cooking-content button {
              font-size: 10.5px !important;
              padding: 4.5px 11px !important;
              width: auto !important;
              max-width: max-content !important;
              white-space: nowrap !important;
            }
          }

          @media (min-height: 751px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 118px !important;
              padding-bottom: 12px !important;
            }
            .detail-showcase-box {
              width: 440px !important;
              height: 440px !important;
              max-width: 42vw !important;
              max-height: 60vh !important;
            }
            .detail-right-col {
              gap: 10px !important;
              justify-content: flex-start !important;
            }
            .detail-inner-gap {
              gap: 10px !important;
            }
            .detail-desc {
              font-size: 15px !important;
              line-height: 1.4 !important;
              max-width: 580px !important;
            }
          }

          @media (min-width: 1400px) and (min-height: 800px) {
            .detail-showcase-box {
              width: 480px !important;
              height: 480px !important;
              max-width: 44vw !important;
              max-height: 62vh !important;
            }
          }
          /* Section 3 recipes responsive overrides */
          .recipe-section-wrap {
            padding-top: 32px !important;
            padding-bottom: 75px !important;
          }
          .recipe-container-wrap {
            gap: 16px !important;
          }
          .recipe-container-wrap > * + * {
            margin-top: 16px !important;
          }
          .recipe-title-text {
            font-size: 34px !important;
          }
          .recipe-desc-text {
            font-size: 14.5px !important;
            max-width: 400px !important;
          }
          .recipe-grid-wrap {
            gap: 16px !important;
          }
          .recipe-card-box {
            aspect-ratio: 3 / 3.6 !important;
            padding: 14px !important;
          }
          .recipe-card-badge {
            font-size: 10px !important;
            padding: 4px 8px !important;
          }
          .recipe-card-title {
            font-size: 18px !important;
          }
          .recipe-card-desc {
            font-size: 11px !important;
            line-clamp: 1 !important;
            -webkit-line-clamp: 1 !important;
          }
          .recipe-card-spec {
            font-size: 10.5px !important;
            gap: 8px !important;
          }
          .recipe-card-btn {
            font-size: 11px !important;
            padding-top: 6px !important;
            padding-bottom: 6px !important;
          }
          .recipe-bottom-banner {
            margin-top: -25px !important;
          }
        }
        @media (max-width: 767px) {
          /* Section 1 Visualizer Mobile Overrides */
          .viz-sticky-wrap {
            padding-top: 80px !important;
            justify-content: flex-start !important;
            align-items: center !important;
          }
          .viz-title-sub {
            display: none !important;
          }
          .viz-title-main {
            font-size: 38px !important;
            line-height: 1 !important;
          }
          .viz-title-tagline {
            font-size: 12px !important;
            margin-top: 2px !important;
          }
          .viz-switcher-btn {
            padding: 0px 14px !important;
            font-size: 11px !important;
            flex: 1 !important;
          }
          .viz-switcher-btn div {
            display: none !important;
          }
          .viz-title-block {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            margin-top: 12px !important;
            order: 2 !important;
            flex-shrink: 0 !important;
            z-index: 10 !important;
          }
          .viz-switcher-container {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            left: auto !important;
            margin-top: 0px !important;
            justify-content: center !important;
            width: auto !important;
            max-width: none !important;
            height: 36px !important;
            z-index: 50 !important;
            order: 1 !important;
            flex-shrink: 0 !important;
            border-radius: 8px !important;
            overflow: hidden !important;
          }
          .viz-main-wrap {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            padding-top: 0px !important;
            gap: 8px !important;
          }
          .viz-grid-wrap {
            order: 3 !important;
            flex-direction: column !important;
            height: auto !important;
            flex: 1 !important;
            justify-content: flex-start !important;
            padding-top: 0px !important;
            margin-top: 16px !important;
            gap: 6px !important;
          }
          .viz-center-col {
            width: 100% !important;
            height: 260px !important;
            margin-top: 0px !important;
          }
          .viz-chicken-box {
            width: 270px !important;
            height: 270px !important;
          }
          .viz-gizzard-pos {
            display: none !important;
          }
          .viz-center-col svg {
            display: none !important;
          }
          .viz-beef-section {
            order: 3 !important;
            height: auto !important;
            min-height: 0 !important;
            justify-content: flex-start !important;
            padding-bottom: 0px !important;
            flex: 1 !important;
          }
          .viz-beef-section > div:first-child {
            width: 100% !important;
            max-width: 100vw !important;
            height: 220px !important;
            transform: none !important;
          }
          .viz-grassland-bar {
            position: relative !important;
            top: auto !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            width: 100% !important;
            height: auto !important;
            background-image: none !important;
            background-color: #3d5c0a !important;
            border-radius: 16px !important;
            padding: 16px !important;
            align-items: center !important;
            justify-content: center !important;
            margin-top: 8px !important;
          }
          .viz-grassland-bar > div {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px 16px !important;
            width: 100% !important;
            flex-wrap: unset !important;
            align-items: center !important;
            justify-items: start !important;
          }
          .viz-grassland-bar > div > div:not(.viz-divider) {
            gap: 8px !important;
            font-size: 13px !important;
          }
          .viz-grassland-bar .viz-divider {
            display: none !important;
          }

          /* Section 2 detail mobile overrides - only apply layout when visible */
          .detail-section-wrap.block {
            background-image: url("/Product/Chicken/doodle.webp") !important;
            background-size: 500px !important;
            background-repeat: repeat !important;
            background-color: #FAF6F0 !important;
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
            overflow-y: visible !important;
            overflow-x: hidden !important;
            padding-top: 98px !important;
            padding-bottom: 40px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
          }
          .detail-section-wrap > div {
            flex-direction: column !important;
            align-items: center !important;
            height: auto !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
            gap: 0px !important;
          }
          .detail-section-wrap .w-full.md\:w-1\/2:first-child {
            width: 100% !important;
            height: auto !important;
            padding-top: 12px !important;
            padding-bottom: 0px !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .detail-showcase-box {
            width: 260px !important;
            height: 260px !important;
            margin-left: 0px !important;
            margin-top: 0px !important;
          }
          .detail-showcase-box > div:first-child {
            width: 48px !important;
            height: 48px !important;
            top: -16px !important;
            right: 8px !important;
          }
          .detail-section-wrap .flex.items-center.justify-center.gap-5 {
            margin-left: 0px !important;
            gap: 10px !important;
          }
          .detail-carousel-btn {
            width: 72px !important;
          }
          .detail-right-col {
            width: 100% !important;
            height: auto !important;
            padding-left: 8px !important;
            padding-right: 8px !important;
            padding-top: 16px !important;
            margin-top: 8px !important;
            gap: 12px !important;
            overflow-y: visible !important;
            justify-content: flex-start !important;
          }
          .detail-title {
            font-size: 28px !important;
            line-height: 1.15 !important;
          }
          .detail-desc {
            font-size: 13px !important;
            line-clamp: none !important;
            display: block !important;
            -webkit-line-clamp: unset !important;
          }
          .detail-inner-gap {
            gap: 20px !important;
          }
          .detail-nutrition-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 6px !important;
          }
          .detail-nutrition-card {
            min-height: 70px !important;
            padding: 8px 4px !important;
            gap: 4px !important;
            border-radius: 10px !important;
          }
          .detail-nutrition-card .relative.w-8 {
            width: 22px !important;
            height: 22px !important;
          }
          .detail-nutrition-card span:first-of-type {
            font-size: 9px !important;
            letter-spacing: 0.03em !important;
          }
          .detail-nutrition-card span:last-of-type {
            font-size: 12px !important;
          }
          .detail-share-btn {
            font-size: 11px !important;
            padding: 8px 12px !important;
          }
          .detail-cooking-card {
            flex-direction: row !important;
            height: auto !important;
            margin-top: 4px !important;
            border-radius: 14px !important;
          }
          .detail-cooking-img {
            width: 110px !important;
            min-height: 160px !important;
            flex-shrink: 0 !important;
          }
          .detail-cooking-content {
            padding: 12px 14px !important;
            gap: 8px !important;
          }
          .detail-cooking-content span:first-child {
            font-size: 15px !important;
          }
          .detail-cooking-content h5 {
            font-size: 13px !important;
            line-height: 1.3 !important;
          }
          .detail-cooking-content p {
            font-size: 11px !important;
            line-height: 1.4 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
          .detail-cooking-content button {
            width: auto !important;
            max-width: max-content !important;
            white-space: nowrap !important;
            font-size: 10px !important;
            padding: 5px 12px !important;
            border-radius: 8px !important;
            gap: 5px !important;
            letter-spacing: 0.08em !important;
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className={`relative w-full z-10 bg-[#638913] ${
          activeMeatType === "chicken" ? "h-[200vh]" : "h-[100vh]"
        }`}
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-16 md:pt-20 lg:pt-24 xl:pt-32 pb-4 viz-sticky-wrap">
          {/* Main Visualizer Content Area */}
          <div className="flex-1 w-full px-4 md:px-8 flex items-center justify-center relative pt-2 viz-main-wrap">
            {/* Top Right Sub-category tabs */}
            <div className="absolute top-0 right-4 lg:right-12 flex items-stretch bg-white border border-[#CCCCCC] shadow-sm z-40 text-[13px] md:text-[14px] font-bold tracking-wider h-9 md:h-10 select-none viz-switcher-container">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                onClick={() => setActiveMeatType("chicken")}
                className={`px-6 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${
                  activeMeatType === "chicken"
                    ? "bg-[#D62828] text-white"
                    : "text-slate-700 hover:bg-slate-50 border-r border-[#CCCCCC]"
                }`}
              >
                CHICKEN
                {activeMeatType === "chicken" && (
                  <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#D62828] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
                )}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.22, ease: "easeOut" }}
                onClick={() => setActiveMeatType("beef")}
                className={`px-8 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${
                  activeMeatType === "beef"
                    ? "bg-[#D62828] text-white"
                    : "text-slate-700 hover:bg-slate-50 border-r border-[#CCCCCC]"
                }`}
              >
                BEEF
                {activeMeatType === "beef" && (
                  <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#D62828] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
                )}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.34, ease: "easeOut" }}
                onClick={() => setActiveMeatType("goat")}
                className={`px-8 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${
                  activeMeatType === "goat"
                    ? "bg-[#D62828] text-white"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                GOAT
                {activeMeatType === "goat" && (
                  <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#D62828] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
                )}
              </motion.button>
            </div>

            {/* Title Section (Centered above animal visualizer - 100% centered horizontally) */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 text-center z-30 flex flex-col items-center viz-title-block ${
                activeMeatType === "chicken" ? "top-2" : "top-6"
              }`}
            >
              {/* Row 1: Icon + sub-label */}
              <motion.div
                key={`title-sub-${activeMeatType}-${activeStage}`}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="flex items-center justify-center gap-2 viz-title-sub"
              >
                <img
                  src={
                    activeMeatType === "chicken"
                      ? "/Product/Chicken/chick.svg"
                      : activeMeatType === "beef"
                        ? "/Product/GoatBeef/beef.svg"
                        : "/Product/GoatBeef/goat.svg"
                  }
                  alt={activeMeatType}
                  className="w-7 h-7 md:w-9 md:h-9 object-contain"
                />
                <span className="text-lg md:text-xl font-bold text-[#F2CE07] tracking-[2px] uppercase font-barlow-condensed leading-none">
                  {activeMeatType === "chicken"
                    ? headerTitle[activeStage].sub
                    : activeMeatType.toUpperCase()}
                </span>
              </motion.div>

              {/* Row 2: Main heading */}
              <motion.h2
                key={`title-main-${activeMeatType}-${activeStage}`}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold font-barlow-condensed tracking-wide uppercase leading-none text-white viz-title-main"
              >
                WITH <span className="text-[#153520]">SKIN</span>
              </motion.h2>

              {/* Yellow underline */}
              <motion.div
                key={`title-line-${activeMeatType}-${activeStage}`}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.32, ease: "easeOut" }}
                className="w-[50%] h-[2px] bg-[#F2CE07] rounded-full my-0.5"
              />

              {/* Row 3: Tagline */}
              <motion.p
                key={`title-tagline-${activeMeatType}-${activeStage}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.42, ease: "easeOut" }}
                className="text-[14px] md:text-[16px] font-semibold text-white/90 tracking-wide font-inter viz-title-tagline"
              >
                Know the cuts &nbsp;Choose the best.
              </motion.p>
            </div>

            {/* Main Visualizer Content Area */}
            {activeMeatType === "chicken" ? (
              <div className="w-full max-w-[1400px] mx-auto h-full flex items-center justify-between mt-4 md:mt-6 relative viz-grid-wrap">
                <div className="hidden md:flex w-[30%] z-30 flex-col justify-center items-end h-full pt-6 md:pt-10">
                  <div
                    className={`relative w-fit flex flex-col ${activeStage === "inside" ? "gap-3 md:gap-5 lg:gap-7 viz-inside-list" : "gap-6 md:gap-10"}`}
                  >
                    <AnimatePresence mode="popLayout">
                      {callouts[activeStage].left.map((item, idx) => {
                        const selected = isPartActive(item.name);
                        return (
                          <motion.div
                            key={`${activeStage === "inside" ? "inside" : "outer"}-left-${item.id}`}
                            onClick={(e) => handlePartClick(e, item)}
                            onMouseEnter={() => setHoveredPart(item.name)}
                            onMouseLeave={() => setHoveredPart(null)}
                            whileHover={{ scale: 1.1, x: -6 }}
                            initial={{
                              opacity: 0,
                              x: -220,
                            }}
                            animate={{
                              opacity: 1,
                              x:
                                activeStage === "inside"
                                  ? -Math.round(
                                      Math.sin(
                                        (Math.PI * idx) /
                                          Math.max(
                                            callouts[activeStage].left.length -
                                              1,
                                            1,
                                          ),
                                      ) * 60,
                                    )
                                  : -Math.round(
                                      Math.sin(
                                        (Math.PI * idx) /
                                          Math.max(
                                            callouts[activeStage].left.length -
                                              1,
                                            1,
                                          ),
                                      ) * 20,
                                    ),
                            }}
                            exit={{
                              opacity: 0,
                              x: -220,
                            }}
                            transition={{
                              duration: 0.95,
                              delay: idx * 0.12,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`flex items-center relative select-none cursor-pointer group ${
                              selected ? "z-40 scale-105 selected-part" : "z-10"
                            }`}
                          >
                            {/* Circle Thumbnail */}
                            <div
                              className={`relative w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] xl:w-[85px] xl:h-[85px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 lg:p-2 shadow-md z-10 shrink-0 transition-all duration-300 viz-card-circle ${
                                selected
                                  ? "border-[#F2CE07] ring-4 ring-[#F2CE07]/60 scale-110 shadow-2xl bg-amber-50"
                                  : "border-[#D62828] group-hover:border-[#F2CE07] group-hover:scale-105 group-hover:shadow-xl"
                              }`}
                            >
                              <span
                                className={`absolute -top-1 -left-1 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] xl:w-[22px] xl:h-[22px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter transition-colors duration-300 viz-card-badge ${
                                  selected
                                    ? "bg-[#F2CE07] text-black shadow"
                                    : "bg-[#D62828] text-white group-hover:bg-[#F2CE07] group-hover:text-black"
                                }`}
                              >
                                {idx + 1}
                              </span>
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className={`object-contain transition-transform duration-300 ${
                                    selected
                                      ? "scale-115"
                                      : "group-hover:scale-110"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Right: Pill + Description stacked — constrained to circle height */}
                            <div className="flex flex-col gap-0.5 lg:gap-1 h-[75px] lg:h-[85px] xl:h-[95px] overflow-hidden justify-center -ml-6 lg:-ml-8 viz-card-desc-wrap">
                              {/* Name Pill */}
                              <div
                                className={`min-w-[130px] lg:min-w-[145px] xl:min-w-[155px] pl-10 lg:pl-12 xl:pl-13 pr-7 lg:pr-9 xl:pr-10 py-0.5 lg:py-1 rounded-full inline-flex items-center self-start transition-all duration-300 viz-card-pill ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""} ${
                                  selected
                                    ? "bg-[#F2CE07] text-black shadow-lg ring-2 ring-[#F2CE07]/40"
                                    : "bg-[#D62828] group-hover:bg-[#b01c1c] group-hover:shadow-md"
                                }`}
                              >
                                <span
                                  className={`text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-semibold viz-card-pill-text ${
                                    selected
                                      ? "text-black font-extrabold"
                                      : "text-white"
                                  }`}
                                >
                                  {item.name}
                                </span>
                              </div>
                              {/* Description */}
                              <p
                                className={`text-[11px] lg:text-[12px] xl:text-[13px] font-medium text-white leading-tight whitespace-pre-line font-manrope max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] line-clamp-3 transition-all duration-300 viz-card-desc-text pl-10 lg:pl-12 xl:pl-13 ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""}`}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Center Chicken Stack with EXACT matching width/height */}
                <motion.div
                  key={`center-chicken-${activeMeatType}`}
                  initial={{ opacity: 0, y: 140, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.15,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full md:w-[40%] flex items-center justify-center relative h-[340px] sm:h-[380px] lg:h-[430px] xl:h-[480px] viz-center-col"
                >
                  {/* Dynamic SVG Connecting Lines — spans full 3-column width */}
                  <svg
                    className="absolute top-0 pointer-events-none z-40"
                    style={{ left: "-75%", width: "250%", height: "100%" }}
                    viewBox="0 0 1500 480"
                    fill="none"
                  >
                    <defs>
                      <filter
                        id="yellowGlow"
                        x="-30%"
                        y="-30%"
                        width="160%"
                        height="160%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="0"
                          stdDeviation="3"
                          floodColor="#F2CE07"
                          floodOpacity="0.9"
                        />
                      </filter>
                    </defs>
                    {activeStage !== "inside" ? (
                      // Skin & Skinless: angled elbow lines reaching exact target parts on chicken
                      <>
                        {/* WING → upper-left wing tip */}
                        {(() => {
                          const active = isPartActive("WING");
                          const isHovered = isPartHovered("WING");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = 440;
                          const d = `M ${sx} 100 L 520 100 L 635 185`;
                          return (
                            <g key="line-wing">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-wing-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="100"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="635"
                                cy="185"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="635"
                                    cy="185"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="635"
                                    cy="185"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* DRUMETTE → mid-left wing joint */}
                        {(() => {
                          const active = isPartActive("DRUMETTE");
                          const isHovered = isPartHovered("DRUMETTE");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = 440;
                          const d = `M ${sx} 240 L 520 200 L 625 305`;
                          return (
                            <g key="line-drumette">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-drumette-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="240"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="625"
                                cy="305"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="625"
                                    cy="305"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="625"
                                    cy="305"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* THIGH → lower-left thigh */}
                        {(() => {
                          const active = isPartActive("THIGH");
                          const isHovered = isPartHovered("THIGH");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = 440;
                          const d = `M ${sx} 380 L 520 330 L 635 345`;
                          return (
                            <g key="line-thigh">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-thigh-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="380"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="635"
                                cy="345"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="635"
                                    cy="345"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="635"
                                    cy="345"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* NECK → chicken neck stem */}
                        {(() => {
                          const active = isPartActive("NECK");
                          const isHovered = isPartHovered("NECK");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = 1015;
                          const d = `M ${sx} 90 L 960 70 L 745 125`;
                          return (
                            <g key="line-neck">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-neck-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="90"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="745"
                                cy="125"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="745"
                                    cy="125"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="745"
                                    cy="125"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* BREST → center breast */}
                        {(() => {
                          const active = isPartActive("BREST");
                          const isHovered = isPartHovered("BREST");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = 1015;
                          const d = `M ${sx} 240 L 960 200 L 790 200`;
                          return (
                            <g key="line-brest">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-brest-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="240"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="790"
                                cy="200"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="790"
                                    cy="200"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="790"
                                    cy="200"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* DRUMSTICK → lower-right drumstick leg */}
                        {(() => {
                          const active = isPartActive("DRUMSTICK");
                          const isHovered = isPartHovered("DRUMSTICK");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = 1015;
                          const d = `M ${sx} 390 L 960 330 L 860 345`;
                          return (
                            <g key="line-drumstick">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-drumstick-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="390"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="860"
                                cy="345"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="860"
                                    cy="345"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="860"
                                    cy="345"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}
                      </>
                    ) : (
                      // Inside cavity — solid white non-crossing angled elbow lines stopping ~2vw before parts
                      <>
                        {/* WING (#1) → ~2vw before left wing tip */}
                        {(() => {
                          const active = isPartActive("WING");
                          const isHovered = isPartHovered("WING");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 465 : 420;
                          const d = `M ${sx} 75 L 530 75 L 620 170`;
                          return (
                            <g key="inside-wing">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-wing-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="75"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="620"
                                cy="170"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="620"
                                    cy="170"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="620"
                                    cy="170"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* HEART (#2) → heart organ in chest cavity */}
                        {(() => {
                          const active = isPartActive("HEART");
                          const isHovered = isPartHovered("HEART");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 455 : 410;
                          const d = `M ${sx} 180 L 540 170 L 745 195`;
                          return (
                            <g key="inside-heart">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-heart-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="180"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="745"
                                cy="195"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="745"
                                    cy="195"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="745"
                                    cy="195"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* DRUMETTE (#3) → ~2vw before left shoulder/drumette joint */}
                        {(() => {
                          const active = isPartActive("DRUMETTE");
                          const isHovered = isPartHovered("DRUMETTE");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 455 : 410;
                          const d = `M ${sx} 300 L 520 250 L 625 305`;
                          return (
                            <g key="inside-drumette">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-drumette-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="300"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="625"
                                cy="305"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="625"
                                    cy="305"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="625"
                                    cy="305"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* THIGH (#4) → lower-left thigh */}
                        {(() => {
                          const active = isPartActive("THIGH");
                          const isHovered = isPartHovered("THIGH");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 465 : 420;
                          const d = `M ${sx} 410 L 520 355 L 645 325`;
                          return (
                            <g key="inside-thigh">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-thigh-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="410"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="645"
                                cy="325"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="645"
                                    cy="325"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="645"
                                    cy="325"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* NECK (#5) → neck stem base */}
                        {(() => {
                          const active = isPartActive("NECK");
                          const isHovered = isPartHovered("NECK");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 985 : 1040;
                          const d = `M ${sx} 50 L 950 55 L 755 110`;
                          return (
                            <g key="inside-neck">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-neck-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="50"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="755"
                                cy="110"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="755"
                                    cy="110"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="755"
                                    cy="110"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* BREST (#6) → right breast muscle wall (lower) & reaches count 6 circle */}
                        {(() => {
                          const active = isPartActive("BREST");
                          const isHovered = isPartHovered("BREST");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 995 : 1050;
                          const d = `M ${sx} 155 L 940 150 L 820 170`;
                          return (
                            <g key="inside-brest">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-brest-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="155"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="820"
                                cy="170"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="820"
                                    cy="170"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="820"
                                    cy="170"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* BACT (#7) → spine/back bone in cavity */}
                        {(() => {
                          const active = isPartActive("BACT");
                          const isHovered = isPartHovered("BACT");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 1025 : 1080;
                          const d = `M ${sx} 245 L 950 190 L 750 165`;
                          return (
                            <g key="inside-bact">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-bact-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="245"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="750"
                                cy="165"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="750"
                                    cy="165"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="750"
                                    cy="165"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* LIVER (#8) → liver organ in cavity */}
                        {(() => {
                          const active = isPartActive("LIVER");
                          const isHovered = isPartHovered("LIVER");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 1015 : 1070;
                          const d = `M ${sx} 345 L 950 270 L 760 240`;
                          return (
                            <g key="inside-liver">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-liver-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="345"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="760"
                                cy="240"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="760"
                                    cy="240"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="760"
                                    cy="240"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* DRUMSTICK (#9) → ~2vw before right drumstick leg */}
                        {(() => {
                          const active = isPartActive("DRUMSTICK");
                          const isHovered = isPartHovered("DRUMSTICK");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 975 : 1030;
                          const d = `M ${sx} 425 L 950 340 L 865 340`;
                          return (
                            <g key="inside-drumstick">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-drumstick-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx={sx}
                                cy="425"
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="865"
                                cy="340"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="865"
                                    cy="340"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="865"
                                    cy="340"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}

                        {/* GIZZARD (#10) → gizzard organ in lower cavity */}
                        {(() => {
                          const active = isPartActive("GIZZARD");
                          const isHovered = isPartHovered("GIZZARD");
                          const color = active ? "#F2CE07" : "white";
                          const r = active ? 4.5 : 3.5;
                          const sy = isHovered ? 395 : 430;
                          const d = `M 750 ${sy} L 760 310`;
                          return (
                            <g key="inside-gizzard">
                              <path
                                d={d}
                                stroke="white"
                                strokeWidth={1.5}
                                opacity={active ? 0.3 : 1}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-gizzard-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
                                  d={d}
                                  stroke="#F2CE07"
                                  strokeWidth={2.5}
                                  filter="url(#yellowGlow)"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 1.25,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                />
                              )}
                              <circle
                                cx="750"
                                cy={sy}
                                r={r}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              <circle
                                cx="760"
                                cy="310"
                                r={active ? 7.5 : 3.5}
                                fill={color}
                                filter={active ? "url(#yellowGlow)" : undefined}
                                className="transition-all duration-300"
                              />
                              {active && (
                                <g className="pointer-events-none">
                                  <motion.circle
                                    cx="760"
                                    cy="310"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={2}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                  <motion.circle
                                    cx="760"
                                    cy="310"
                                    r={7.5}
                                    fill="none"
                                    stroke="#F2CE07"
                                    strokeWidth={1.5}
                                    initial={{ r: 7.5, opacity: 0.9 }}
                                    animate={{
                                      r: [7.5, 22],
                                      opacity: [0.9, 0],
                                    }}
                                    transition={{
                                      duration: 1.4,
                                      delay: 0.7,
                                      repeat: Infinity,
                                      ease: "easeOut",
                                    }}
                                  />
                                </g>
                              )}
                            </g>
                          );
                        })()}
                      </>
                    )}
                  </svg>

                  {/* Exact Stacked chicken viewport */}
                  <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] aspect-square flex items-center justify-center viz-chicken-box">
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
                    {activeStage === "inside" &&
                      callouts.inside.bottom.map((item) => {
                        const selected = isPartActive(item.name);
                        return (
                          <motion.div
                            key="gizzard"
                            onClick={(e) => handlePartClick(e, item)}
                            onMouseEnter={() => setHoveredPart(item.name)}
                            onMouseLeave={() => setHoveredPart(null)}
                            whileHover={{ scale: 1.1, y: -6 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute bottom-[-45px] md:bottom-[-55px] left-[45%] transform -translate-x-[45%] flex items-center select-none cursor-pointer group viz-gizzard-pos ${
                              selected ? "z-40 scale-105 selected-part" : "z-30"
                            }`}
                          >
                            {/* Circle Thumbnail */}
                            <div
                              className={`relative w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] xl:w-[85px] xl:h-[85px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 lg:p-2 shadow-md z-10 shrink-0 transition-all duration-300 viz-card-circle ${
                                selected
                                  ? "border-[#F2CE07] ring-4 ring-[#F2CE07]/60 scale-110 shadow-2xl bg-amber-50"
                                  : "border-[#D62828] group-hover:border-[#F2CE07] group-hover:scale-105 group-hover:shadow-xl"
                              }`}
                            >
                              <span
                                className={`absolute -top-1 -left-1 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] xl:w-[22px] xl:h-[22px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter transition-colors duration-300 viz-card-badge ${
                                  selected
                                    ? "bg-[#F2CE07] text-black shadow"
                                    : "bg-[#D62828] text-white group-hover:bg-[#F2CE07] group-hover:text-black"
                                }`}
                              >
                                {callouts[activeStage].left.length +
                                  callouts[activeStage].right.length +
                                  1}
                              </span>
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className={`object-contain transition-transform duration-300 ${
                                    selected
                                      ? "scale-115"
                                      : "group-hover:scale-110"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Right: Pill + Description stacked — constrained to circle height */}
                            <div className="flex flex-col gap-0.5 lg:gap-1 h-[75px] lg:h-[85px] xl:h-[95px] overflow-hidden justify-center -ml-6 lg:-ml-8 viz-card-desc-wrap">
                              {/* Name Pill */}
                              <div
                                className={`min-w-[130px] lg:min-w-[145px] xl:min-w-[155px] pl-10 lg:pl-12 xl:pl-13 pr-7 lg:pr-9 xl:pr-10 py-0.5 lg:py-1 rounded-full inline-flex items-center self-start transition-all duration-300 viz-card-pill ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""} ${
                                  selected
                                    ? "bg-[#F2CE07] text-black shadow-lg ring-2 ring-[#F2CE07]/40"
                                    : "bg-[#D62828] group-hover:bg-[#b01c1c] group-hover:shadow-md"
                                }`}
                              >
                                <span
                                  className={`text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-semibold viz-card-pill-text ${
                                    selected
                                      ? "text-black font-extrabold"
                                      : "text-white"
                                  }`}
                                >
                                  {item.name}
                                </span>
                              </div>
                              {/* Description */}
                              <p
                                className={`text-[11px] lg:text-[12px] xl:text-[13px] font-medium text-white leading-tight whitespace-pre-line font-manrope max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] line-clamp-3 transition-all duration-300 viz-card-desc-text pl-10 lg:pl-12 xl:pl-13 ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""}`}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                </motion.div>

                {/* Mobile Only: Swipeable Callouts Carousel & Selected Part Card */}
                <div className="flex md:hidden flex-col items-center w-full mt-1 gap-2 z-30 select-none">
                  {/* Wrapped Circle Thumbnail Grid */}
                  <div className="flex flex-wrap items-center gap-3 w-full px-4 py-2 justify-center">
                    {callouts[activeStage].left
                      .concat(callouts[activeStage].right)
                      .concat(
                        activeStage === "inside" ? callouts.inside.bottom : [],
                      )
                      .map((item, idx) => {
                        const normalized = item.name.toLowerCase().trim();
                        const chickenPartIdx = chickenParts.findIndex((pt) => {
                          const ptName = pt.name.toLowerCase().trim();
                          if (normalized === "brest" && ptName === "breast")
                            return true;
                          if (normalized === "bact" && ptName === "back")
                            return true;
                          return ptName === normalized;
                        });
                        const selected = chickenPartIdx === selectedPartIdx;

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (chickenPartIdx !== -1) {
                                setSelectedPartIdx(chickenPartIdx);
                              }
                            }}
                            className={`w-[48px] h-[48px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 shadow-sm transition-all ${
                              selected
                                ? "border-[#F2CE07] ring-2 ring-[#F2CE07] scale-110"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </button>
                        );
                      })}
                  </div>

                  {/* Selected Part Details Card */}
                  {(() => {
                    const allParts = callouts[activeStage].left
                      .concat(callouts[activeStage].right)
                      .concat(
                        activeStage === "inside" ? callouts.inside.bottom : [],
                      );
                    const currentPart =
                      allParts.find((p) => {
                        const normalized = p.name.toLowerCase().trim();
                        const foundIdx = chickenParts.findIndex((pt) => {
                          const ptName = pt.name.toLowerCase().trim();
                          if (normalized === "brest" && ptName === "breast")
                            return true;
                          if (normalized === "bact" && ptName === "back")
                            return true;
                          return ptName === normalized;
                        });
                        return foundIdx === selectedPartIdx;
                      }) || allParts[0];

                    if (!currentPart) return null;

                    return (
                      <div
                        onClick={(e) => handlePartClick(e, currentPart)}
                        className="w-[92%] max-w-[360px] bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg active:scale-95 transition-transform duration-200 cursor-pointer"
                      >
                        {/* Circle image */}
                        <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center p-1.5 shrink-0 border-2 border-[#F2CE07] shadow-sm">
                          <img
                            src={currentPart.img}
                            alt={currentPart.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0 text-left">
                          <span className="block text-[16px] font-black uppercase tracking-wider text-[#F2CE07] truncate leading-tight">
                            {currentPart.name}
                          </span>
                          <p className="text-[12px] font-medium text-white/80 line-clamp-1 leading-snug mt-0.5">
                            {currentPart.desc}
                          </p>
                        </div>
                        {/* CTA */}
                        <div className="w-8 h-8 rounded-full bg-[#F2CE07] flex items-center justify-center shrink-0 shadow-sm">
                          <span className="text-[#153520] font-black text-[14px] leading-none">
                            →
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Right Side Callout Section */}
                <div className="hidden md:flex w-[30%] z-30 flex-col justify-center h-full pt-16">
                  <div
                    className={`relative w-full flex flex-col ${activeStage === "inside" ? "gap-2 viz-inside-list" : "gap-12"}`}
                  >
                    <AnimatePresence mode="popLayout">
                      {callouts[activeStage].right.map((item, idx) => {
                        const selected = isPartActive(item.name);
                        return (
                          <motion.div
                            key={`${activeStage === "inside" ? "inside" : "outer"}-right-${item.id}`}
                            onClick={(e) => handlePartClick(e, item)}
                            onMouseEnter={() => setHoveredPart(item.name)}
                            onMouseLeave={() => setHoveredPart(null)}
                            whileHover={{ scale: 1.1, x: 6 }}
                            initial={{
                              opacity: 0,
                              x: 220,
                            }}
                            animate={{
                              opacity: 1,
                              x:
                                activeStage === "inside"
                                  ? Math.round(
                                      Math.sin(
                                        (Math.PI * idx) /
                                          Math.max(
                                            callouts[activeStage].right.length -
                                              1,
                                            1,
                                          ),
                                      ) * 60,
                                    )
                                  : Math.round(
                                      Math.sin(
                                        (Math.PI * idx) /
                                          Math.max(
                                            callouts[activeStage].right.length -
                                              1,
                                            1,
                                          ),
                                      ) * 20,
                                    ),
                            }}
                            exit={{
                              opacity: 0,
                              x: 220,
                            }}
                            transition={{
                              duration: 0.95,
                              delay: idx * 0.12,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`flex items-center relative select-none cursor-pointer group ${
                              selected ? "z-40 scale-105 selected-part" : "z-10"
                            }`}
                          >
                            {/* Circle Thumbnail */}
                            <div
                              className={`relative w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] xl:w-[85px] xl:h-[85px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 lg:p-2 shadow-md z-10 shrink-0 transition-all duration-300 viz-card-circle ${
                                selected
                                  ? "border-[#F2CE07] ring-4 ring-[#F2CE07]/60 scale-110 shadow-2xl bg-amber-50"
                                  : "border-[#D62828] group-hover:border-[#F2CE07] group-hover:scale-105 group-hover:shadow-xl"
                              }`}
                            >
                              <span
                                className={`absolute -top-1 -left-1 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] xl:w-[22px] xl:h-[22px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter transition-colors duration-300 viz-card-badge ${
                                  selected
                                    ? "bg-[#F2CE07] text-black shadow"
                                    : "bg-[#D62828] text-white group-hover:bg-[#F2CE07] group-hover:text-black"
                                }`}
                              >
                                {callouts[activeStage].left.length + idx + 1}
                              </span>
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className={`object-contain transition-transform duration-300 ${
                                    selected
                                      ? "scale-115"
                                      : "group-hover:scale-110"
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Right: Pill + Description stacked — constrained to circle height */}
                            <div className="flex flex-col gap-0.5 lg:gap-1 h-[75px] lg:h-[85px] xl:h-[95px] overflow-hidden justify-center -ml-6 lg:-ml-8 viz-card-desc-wrap">
                              {/* Name Pill */}
                              <div
                                className={`min-w-[130px] lg:min-w-[145px] xl:min-w-[155px] pl-10 lg:pl-12 xl:pl-13 pr-7 lg:pr-9 xl:pr-10 py-0.5 lg:py-1 rounded-full inline-flex items-center self-start transition-all duration-300 viz-card-pill ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""} ${
                                  selected
                                    ? "bg-[#F2CE07] text-black shadow-lg ring-2 ring-[#F2CE07]/40"
                                    : "bg-[#D62828] group-hover:bg-[#b01c1c] group-hover:shadow-md"
                                }`}
                              >
                                <span
                                  className={`text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-semibold viz-card-pill-text ${
                                    selected
                                      ? "text-black font-extrabold"
                                      : "text-white"
                                  }`}
                                >
                                  {item.name}
                                </span>
                              </div>
                              {/* Description */}
                              <p
                                className={`text-[11px] lg:text-[12px] xl:text-[13px] font-medium text-white leading-tight whitespace-pre-line font-manrope max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] line-clamp-3 transition-all duration-300 viz-card-desc-text pl-10 lg:pl-12 xl:pl-13 ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""}`}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ) : (
              /* Beef & Goat Visualizer - 100% Mockup Match */
              <div className="w-full h-full relative flex flex-col items-center justify-end pb-12 z-30 viz-beef-section">
                {/* Central Animal Photo — positioned so hooves touch the grassland hill */}
                <motion.div
                  key={`beefgoat-${activeMeatType}`}
                  initial={{ opacity: 0, y: 140, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.15,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative w-full max-w-[780px] xl:max-w-[850px] h-[340px] sm:h-[400px] md:h-[440px] lg:h-[480px] max-h-[50vh] lg:max-h-[54vh] flex items-center justify-center -translate-y-8 lg:-translate-y-12 z-20 viz-beef-img-wrap"
                >
                  <Image
                    src={
                      activeMeatType === "beef"
                        ? "/Product/GoatBeef/beef.webp"
                        : "/Product/GoatBeef/goat.webp"
                    }
                    alt={activeMeatType}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>

                {/* Bottom Grassland Bar with 4 Feature Badges (Animal stands directly on this hill) */}
                <div
                  className="w-full absolute bottom-[-15px] left-0 right-0 h-[175px] bg-no-repeat flex items-end pb-5 px-8 justify-center z-10 viz-grassland-bar"
                  style={{
                    backgroundImage: 'url("/Product/GoatBeef/grassLand.webp")',
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center bottom",
                  }}
                >
                  <div className="flex flex-wrap items-center justify-center gap-8 text-white font-barlow-condensed font-medium uppercase text-lg tracking-wider mb-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#E1C609] flex items-center justify-center p-1.5 bg-black/5">
                        <img
                          src="/Product/GoatBeef/natural.svg"
                          alt="Natural"
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <span className="font-medium">100% NATURAL</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/40 hidden sm:block" />

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#E1C609] flex items-center justify-center p-1.5 bg-black/5">
                        <img
                          src="/Product/GoatBeef/higinical.svg"
                          alt="Hygienically"
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <span className="font-medium">
                        HYGIENICALLY PROCESSED
                      </span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/40 hidden sm:block" />

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#E1C609] flex items-center justify-center p-1.5 bg-black/5">
                        <img
                          src="/Product/GoatBeef/safe.svg"
                          alt="Safe"
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <span className="font-medium">SAFE & HEALTHY</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/40 hidden sm:block" />

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#E1C609] flex items-center justify-center p-1.5 bg-black/5">
                        <img
                          src="/Product/GoatBeef/perfectforRecipie.svg"
                          alt="Perfect"
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <span className="font-medium">
                        PERFECT FOR EVERY RECIPE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Interactive Details Section - Only shown when activeMeatType === "chicken" */}
      <section
        ref={detailsSectionRef}
        className={`relative z-30 w-full h-screen min-h-screen max-h-screen pt-[130px] md:pt-[135px] lg:pt-[140px] pb-4 bg-cover bg-center flex items-center justify-center m-0 overflow-y-auto md:overflow-hidden transition-all duration-700 detail-section-wrap ${
          hasSelectedAnyPart && activeMeatType === "chicken"
            ? "block opacity-100 pointer-events-auto"
            : "hidden opacity-0 pointer-events-none"
        }`}
        style={{ backgroundImage: 'url("/Product/details/bg.webp")' }}
      >
        {/* Mobile-only close button */}
        <button
          onClick={() => setHasSelectedAnyPart(false)}
          className="md:hidden absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:bg-white active:scale-90 transition-all duration-200 border border-slate-200"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-full h-full flex flex-col md:flex-row items-stretch px-4 md:px-10 lg:px-16">
          {/* Left Column (50% flex) - Green panel area with centered preview & bottom carousel */}
          <motion.div
            key={`detail-left-${manuallySelectedPartIdx}`}
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 relative h-auto md:h-full flex flex-col items-center justify-around py-4 md:py-8 px-6 select-none"
          >
            {/* Center Showcase Box */}
            <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] max-h-[65vh] flex items-center justify-center md:-ml-20 detail-showcase-box">
              {/* 360 spin badge - only shown for raw view (first card) */}
              {activeViewTab === "raw" && (
                <motion.div
                  initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute -top-10 -right-4 w-24 h-24 z-30 pointer-events-none drop-shadow-xl"
                >
                  <Image
                    src="/Product/details/360.webp"
                    alt="360 View"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              )}

              {/* Large Product Image (Ref attached for flying animation landing) */}
              <div
                ref={centerCircleRef}
                className="relative w-full h-full flex items-center justify-center pointer-events-none z-30"
              >
                <div
                  className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${
                    isLandedInSection2
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                >
                  <img
                    src={
                      activeViewTab === "raw"
                        ? chickenParts[manuallySelectedPartIdx].img
                        : "/Product/details/packedProduct.webp"
                    }
                    alt={chickenParts[manuallySelectedPartIdx].name}
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Carousel Controls Bar (natural flex item flowing with space-around) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center justify-center gap-5 z-30 md:-ml-20"
            >
              {/* Left Arrow Button */}
              <button
                onClick={() => {
                  setActiveViewTab((prev) =>
                    prev === "raw" ? "packed" : "raw",
                  );
                }}
                className="w-8 h-8 rounded-full bg-white text-slate-800 shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
                title="Previous Card"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Thumbnail 1: Raw Cut Part Image */}
              <button
                onClick={() => setActiveViewTab("raw")}
                className={`relative w-[125px] aspect-[679/738] rounded-2xl overflow-hidden p-2 transition-all duration-300 cursor-pointer detail-carousel-btn ${
                  activeViewTab === "raw"
                    ? "border-4 border-[#F2CE07] bg-amber-50 scale-105"
                    : "border-2 border-white/60 bg-white/20 hover:bg-white/40"
                }`}
              >
                <img
                  src={chickenParts[manuallySelectedPartIdx].img}
                  alt="Raw Cut"
                  className="w-full h-full object-contain"
                />
              </button>

              {/* Thumbnail 2: Packed Product Image */}
              <button
                onClick={() => setActiveViewTab("packed")}
                className={`relative w-[125px] aspect-[679/738] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer detail-carousel-btn ${
                  activeViewTab === "packed"
                    ? "border-4 border-[#F2CE07] scale-105"
                    : "border-2 border-white/60 bg-white/20 hover:bg-white/40"
                }`}
              >
                <img
                  src="/Product/details/packedProduct.webp"
                  alt="Packed Product"
                  className="w-full h-full object-cover scale-[1.28]"
                />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={() => {
                  setActiveViewTab((prev) =>
                    prev === "raw" ? "packed" : "raw",
                  );
                }}
                className="w-8 h-8 rounded-full bg-white text-slate-800 shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
                title="Next Card"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column (50% flex) - Product Detail Specs */}
          <motion.div
            key={`detail-right-${manuallySelectedPartIdx}-${isMobile ? "m" : isLandedInSection2}`}
            initial="hidden"
            animate={
              !isMobile
                ? isLandedInSection2
                  ? "visible"
                  : "hidden"
                : undefined
            }
            whileInView={isMobile ? "visible" : undefined}
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.07,
                  delayChildren: 0.05,
                },
              },
            }}
            className="w-full md:w-1/2 h-auto md:h-full px-4 md:px-8 lg:px-10 xl:px-12 flex flex-col gap-2.5 md:gap-3 select-none detail-right-col overflow-hidden pb-4 justify-start"
          >
            {/* Breadcrumbs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 30, y: 10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              initial={isMobile ? { opacity: 0, y: 25 } : undefined}
              whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] xl:text-[14px] font-medium text-slate-600 tracking-wider flex items-center gap-2 font-Manrope"
            >
              <Link
                href="/"
                className="relative inline-block hover:text-[#127431] transition-all duration-200 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#127431] hover:after:w-full after:transition-all after:duration-300 hover:-translate-y-[1px]"
              >
                Home
              </Link>
              <div className="relative w-2 h-3 flex items-center justify-center shrink-0">
                <Image
                  src="/Product/details/right aroow.svg"
                  alt="arrow"
                  fill
                  className="object-contain opacity-60"
                />
              </div>
              <Link
                href="/products"
                className="relative inline-block hover:text-[#127431] transition-all duration-200 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#127431] hover:after:w-full after:transition-all after:duration-300 hover:-translate-y-[1px]"
              >
                Products
              </Link>
              <div className="relative w-2 h-3 flex items-center justify-center shrink-0">
                <Image
                  src="/Product/details/right aroow.svg"
                  alt="arrow"
                  fill
                  className="object-contain opacity-60"
                />
              </div>
              <button
                onClick={() => {
                  setHasSelectedAnyPart(false);
                  setIsLandedInSection2(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="relative inline-block hover:text-[#127431] transition-all duration-200 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#127431] hover:after:w-full after:transition-all after:duration-300 hover:-translate-y-[1px]"
              >
                Chicken
              </button>
              <div className="relative w-2 h-3 flex items-center justify-center shrink-0">
                <Image
                  src="/Product/details/right aroow.svg"
                  alt="arrow"
                  fill
                  className="object-contain opacity-60"
                />
              </div>
              <span className="text-slate-900 font-semibold">
                {chickenParts[manuallySelectedPartIdx].name}
              </span>
            </motion.div>

            <div className="flex flex-col gap-2.5 md:gap-3 detail-inner-gap">
              {/* Title Section */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30, y: 10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                initial={isMobile ? { opacity: 0, y: 30 } : undefined}
                whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-0.5 lg:space-y-1"
              >
                <span className="text-[17px] lg:text-[19px] font-semibold text-[#127431] tracking-wide uppercase font-manrope">
                  CHICKEN
                </span>
                <h2 className="text-4xl lg:text-5xl xl:text-[52px] font-bold text-slate-900 leading-none tracking-wide font-barlow-condensed uppercase detail-title">
                  CHICKEN{" "}
                  <span className="text-[#127431]">
                    {chickenParts[manuallySelectedPartIdx].name}
                  </span>
                </h2>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, x: 30, y: 10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                initial={isMobile ? { opacity: 0, y: 25 } : undefined}
                whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13px] lg:text-[14px] xl:text-[15px] font-medium text-slate-700 leading-relaxed font-manrope max-w-[550px] xl:max-w-[580px] detail-desc"
              >
                {chickenParts[manuallySelectedPartIdx].desc}
              </motion.p>

              {/* Red Line Separator */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scaleX: 0 },
                  visible: {
                    opacity: 1,
                    scaleX: 1,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                initial={isMobile ? { opacity: 0, scaleX: 0 } : undefined}
                whileInView={isMobile ? { opacity: 1, scaleX: 1 } : undefined}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="w-20 h-[2px] bg-[#D62828] origin-left my-0.5 lg:my-1"
              />

              {/* Package Weight specs */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30, y: 10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                initial={isMobile ? { opacity: 0, y: 25 } : undefined}
                whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 py-1.5 lg:py-2.5 border-y border-slate-200/50"
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[13px] md:text-[15px] font-medium text-slate-900 tracking-wider uppercase font-manrope whitespace-nowrap">
                    PACKAGE WEIGHT
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-800 font-barlow-condensed whitespace-nowrap">
                    {chickenParts[manuallySelectedPartIdx].weight}
                  </span>
                </div>
                <div className="w-[1px] h-6 bg-slate-300 shrink-0" />
                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative w-4 h-4 md:w-5 md:h-5 shrink-0">
                    <Image
                      src="/Product/details/pack.webp"
                      alt="Pack Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[13px] md:text-[15px] font-medium text-slate-900 tracking-wider uppercase font-manrope whitespace-nowrap">
                    MEATIN PACK
                  </span>
                </div>
              </motion.div>

              {/* Nutrition Info Cards */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30, y: 10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                initial={isMobile ? { opacity: 0, y: 30 } : undefined}
                whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5 lg:space-y-2"
              >
                <h4 className="text-[14px] lg:text-[15px] font-medium text-slate-900 tracking-wider uppercase font-manrope">
                  NUTRITION INFORMATION (PER 100g)
                </h4>
                <div className="grid grid-cols-4 gap-3 lg:gap-4 detail-nutrition-grid">
                  {[
                    {
                      label: "PROTEIN",
                      val: chickenParts[manuallySelectedPartIdx].nutrition
                        .protein,
                      icon: "/Product/details/protien.svg",
                    },
                    {
                      label: "CALORIES",
                      val: chickenParts[manuallySelectedPartIdx].nutrition
                        .calories,
                      icon: "/Product/details/calories.svg",
                    },
                    {
                      label: "FAT",
                      val: chickenParts[manuallySelectedPartIdx].nutrition.fat,
                      icon: "/Product/details/fat.svg",
                    },
                    {
                      label: "CARBS",
                      val: chickenParts[manuallySelectedPartIdx].nutrition
                        .carbs,
                      icon: "/Product/details/carbs.svg",
                    },
                  ].map((nut, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-xl p-2 text-center flex flex-col items-center justify-between min-h-[75px] lg:min-h-[80px] gap-1.5 shadow-sm detail-nutrition-card"
                    >
                      <div className="relative w-7 h-7 lg:w-8 lg:h-8">
                        <Image
                          src={nut.icon}
                          alt={nut.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[12px] lg:text-[13px] font-medium text-slate-900 tracking-wider uppercase font-manrope">
                        {nut.label}
                      </span>
                      <span className="text-[14px] lg:text-[15px] font-bold text-slate-800 font-barlow-condensed">
                        {nut.val}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Share buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30, y: 10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                initial={isMobile ? { opacity: 0, y: 25 } : undefined}
                whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5 lg:space-y-2"
              >
                <h4 className="text-[14px] lg:text-[15px] font-medium text-slate-900 tracking-wider uppercase font-manrope">
                  SHARE THIS PRODUCT
                </h4>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{
                      scale: 1.04,
                      y: -2,
                      backgroundColor: "#0b4f20",
                      boxShadow: "0 8px 20px rgba(18, 116, 49, 0.3)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 bg-[#127431] text-white text-[13px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 tracking-wider font-manrope cursor-pointer transition-colors shadow-sm detail-share-btn"
                  >
                    <div className="relative w-4 h-4 shrink-0">
                      <Image
                        src="/Footer/whatsapp.webp"
                        alt="WhatsApp"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>WhatsApp</span>
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.04,
                      y: -2,
                      backgroundColor: "#2d4373",
                      boxShadow: "0 8px 20px rgba(59, 89, 152, 0.3)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 bg-[#3B5998] text-white text-[13px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 tracking-wider font-manrope cursor-pointer transition-colors shadow-sm detail-share-btn"
                  >
                    <div className="relative w-4 h-4 shrink-0">
                      <Image
                        src="/Product/details/facebook.svg"
                        alt="Facebook"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>Facebook</span>
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.04,
                      y: -2,
                      borderColor: "#127431",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-slate-200 text-slate-700 text-[13px] font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 tracking-wider font-manrope cursor-pointer transition-colors shadow-sm detail-share-btn"
                  >
                    <div className="relative w-4 h-4 shrink-0">
                      <Image
                        src="/Product/details/link.webp"
                        alt="Link"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>Copy Link</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Cooking recipe card */}
              <Link href="/recipes" className="block w-full">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 30, y: 15 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  initial={isMobile ? { opacity: 0, y: 35 } : undefined}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 14px 30px -5px rgba(214, 40, 40, 0.18)",
                    borderColor: "#D62828",
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="group border border-slate-200/80 bg-[#FAF0F0] rounded-2xl overflow-hidden shadow-sm relative flex gap-0 items-stretch detail-cooking-card cursor-pointer"
                >
                  {/* Left - Square image */}
                  <div className="relative w-[130px] lg:w-[150px] shrink-0 detail-cooking-img overflow-hidden">
                    <Image
                      src="/Product/details/bottomCard.webp"
                      alt="Recipe"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Right - Content */}
                  <div className="flex-1 p-4 lg:p-5 flex flex-col justify-between gap-2 detail-cooking-content">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <span className="text-[18px] lg:text-[20px] font-semibold text-[#D62828] tracking-widest uppercase font-barlow-condensed">
                        WHAT'S COOKING?
                      </span>
                      <span className="bg-[#D62828] text-white text-[9px] lg:text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider font-manrope shadow-sm">
                        TRENDING
                      </span>
                    </div>

                    {/* Title */}
                    <h5 className="text-[15px] lg:text-[16px] font-bold text-slate-900 leading-tight font-manrope group-hover:text-[#D62828] transition-colors">
                      Spicy Chicken {chickenParts[manuallySelectedPartIdx].name}{" "}
                      Fry
                    </h5>

                    {/* Description */}
                    <p className="text-[12px] lg:text-[13px] text-slate-600 leading-relaxed font-inter">
                      A Spicy and flavourful recipe that brings out the best in
                      every{" "}
                      {chickenParts[manuallySelectedPartIdx].name.toLowerCase()}
                      .
                    </p>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "#b52020",
                        boxShadow: "0 6px 16px rgba(214, 40, 40, 0.35)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="w-auto inline-flex items-center justify-center self-start bg-[#D62828] text-white text-[10.5px] lg:text-[11.5px] font-bold py-1.5 px-3.5 rounded-xl whitespace-nowrap gap-1.5 uppercase tracking-wider font-manrope cursor-pointer transition-colors shadow-sm mt-1"
                    >
                      <span>EXPLORE RECIPE</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Recipes Section */}
      <section className="relative z-30 w-full bg-[#E4E4E4] pt-16 pb-28 px-4 md:px-12 lg:px-20 recipe-section-wrap overflow-hidden select-none">
        {/* Background Doodle Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-70"
          style={{
            backgroundImage: 'url("/Product/Chicken/doodle.webp")',
            backgroundSize: "800px",
          }}
        />
        <div className="max-w-[1400px] mx-auto space-y-12 relative z-10 recipe-container-wrap">
          {/* Section Header: Title, Description, and Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-start gap-6 md:gap-10 pb-2">
            {/* Left Column: RECIPES tagline + MEAT MADE DELICIOUS Title */}
            <div className="space-y-2 shrink-0 select-none">
              {/* Tagline */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
                className="flex items-center gap-2"
              >
                <motion.span
                  variants={{
                    hidden: { scaleX: 0, opacity: 0 },
                    visible: { scaleX: 1, opacity: 1 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-5 h-[2px] bg-[#87B71D] origin-left"
                />
                <span className="text-[13px] font-bold text-slate-700 tracking-widest uppercase font-manrope inline-flex">
                  {"RECIPES".split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      variants={{
                        hidden: { opacity: 0, y: 3 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.04 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.div>

              {/* Title: MEAT MADE DELICIOUS */}
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.12,
                    },
                  },
                }}
                className="text-5xl md:text-6xl font-bold font-barlow-condensed tracking-wide uppercase leading-[0.95] recipe-title-text"
              >
                <span className="text-[#127431] block">
                  {"MEAT MADE".split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      variants={{
                        hidden: { opacity: 0, y: -6 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.05 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
                <span className="text-[#D62828] block">
                  {"DELICIOUS.".split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      variants={{
                        hidden: { opacity: 0, y: -6 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h2>
            </div>

            {/* Vertical Red Divider Line */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block w-[2px] h-[70px] bg-[#D62828]  rounded-full shrink-0"
            />

            {/* Right Column: Paragraph + Filter buttons directly below paragraph */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col justify-between py-1 mt-8 gap-4 md:gap-5"
            >
              <p className="text-[17px] md:text-[18px] font-medium text-slate-700 max-w-[480px] leading-snug font-manrope recipe-desc-text">
                Explore trending meat recipes in quick, easy &amp; delicious
                short-form videos.
              </p>

              {/* Filter buttons */}
              <div className="flex gap-3 recipe-filter-btns">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-[#D62828] text-white text-[13px] font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm"
                >
                  Most Popular
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-[13px] font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm"
                >
                  New Recipes
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Recipes Grid (4 Full-Image Cards with Dark Gradient Overlay) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.22,
                  delayChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 recipe-grid-wrap"
          >
            {[
              {
                title: "Chicken Curry",
                label: "BEST FOR CURRY",
                desc: "Classic and flavourful chicken curry perfect with rice, chapati or dosa.",
                img: "/Product/recipies/leg1.webp",
                time: "35 mins",
                servings: "4 Servings",
                diff: "Easy",
              },
              {
                title: "BBQ Chicken Leg",
                label: "BEST FOR BBQ",
                desc: "Juicy and smoky BBQ chicken leg perfect for weekend grilling.",
                img: "/Product/recipies/leg2.webp",
                time: "45 mins",
                servings: "4 Servings",
                diff: "Easy",
              },
              {
                title: "Crispy Fried Chicken",
                label: "BEST FOR FRY",
                desc: "Crispy outside, tender inside. Perfect as a snack or side dish.",
                img: "/Product/recipies/leg3.webp",
                time: "25 mins",
                servings: "3 Servings",
                diff: "Easy",
              },
              {
                title: "Grilled Chicken Leg",
                label: "BEST FOR FRY",
                desc: "Healthy and delicious grilled chicken leg mild spices.",
                img: "/Product/recipies/leg4.webp",
                time: "30 mins",
                servings: "4 Servings",
                diff: "Easy",
              },
            ].map((recipe, idx) => (
              <Link href="/recipes" key={idx} className="block cursor-pointer">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 55 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  initial={isMobile ? { opacity: 0, y: 45 } : undefined}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={
                    isMobile
                      ? { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                      : undefined
                  }
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 35px -5px rgba(0, 0, 0, 0.3)",
                  }}
                  className="relative aspect-[3/4.2] w-full rounded-2xl overflow-hidden shadow-xl group flex flex-col justify-end p-5 select-none recipe-card-box cursor-pointer"
                >
                  {/* Background Image */}
                  <Image
                    src={recipe.img}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top-Left Red Badge Pill */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-[#D62828] text-white text-[12px] font-semibold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-md font-inter recipe-card-badge">
                      {recipe.label}
                    </span>
                  </div>

                  {/* Overlay Content (Bottom) */}
                  <div className="relative z-20 flex flex-col gap-3">
                    <div className="space-y-1">
                      <h4 className="text-2xl font-semibold text-white font-barlow-condensed tracking-wide uppercase leading-tight recipe-card-title">
                        {recipe.title}
                      </h4>
                      <p className="text-[13px] font-medium text-slate-300 leading-snug font-inter line-clamp-2 recipe-card-desc">
                        {recipe.desc}
                      </p>
                    </div>

                    {/* Spec Row (Easy, Time, Servings) */}
                    <div className="flex items-center gap-3 text-[12px] font-bold text-slate-300 font-manrope recipe-card-spec">
                      <div className="flex items-center gap-1.5">
                        <div className="relative w-4 h-4 shrink-0">
                          <img
                            src="/Product/recipies/easy.svg"
                            alt="Difficulty"
                            className="w-full h-full object-contain "
                          />
                        </div>
                        <span>{recipe.diff}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="relative w-5 h-5 shrink-0">
                          <img
                            src="/Product/recipies/time.svg"
                            alt="Time"
                            className="w-full h-full object-contain "
                          />
                        </div>
                        <span>{recipe.time}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="relative w-5 h-5 shrink-0">
                          <Image
                            src="/Product/recipies/servings.png"
                            alt="Servings"
                            fill
                            className="object-contain "
                          />
                        </div>
                        <span>{recipe.servings}</span>
                      </div>
                    </div>

                    {/* View Recipe Lime-Green Button */}
                    <button className="w-full bg-[#82B224] hover:bg-[#6C971B] text-white text-[12px] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-colors cursor-pointer font-inter shadow-md mt-1 recipe-card-btn">
                      <span>View Recipe</span>
                      <div className="relative w-3.5 h-3.5 shrink-0">
                        <img
                          src="/Product/recipies/rightArrow.svg"
                          alt="Arrow"
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                    </button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom Panel Categories Section - Exactly matching mockup curve & overlapping mascot */}
      <section className="bg-[#EBFFE6] rounded-t-[60px] pt-12 pb-6 relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] mt-[-60px] recipe-bottom-banner overflow-visible">
        <div className="px-16 relative flex flex-col md:flex-row gap-8 items-center">
          {/* Overlapping Mascot on the left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[180px] h-[270px] md:w-[220px] md:h-[330px] relative -mt-20 md:-mt-30 shrink-0 pointer-events-none drop-shadow-lg"
          >
            <Image
              src="/Product/Chicken/Banner/image 282.webp"
              alt="Chicken Mascot"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Heading and Categories grid */}
          <div className="flex-1 space-y-8 flex flex-col items-center">
            <div className="space-y-2 text-center -ml-[13%]">
              {/* CATEGORIES Typewriter Title */}
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="text-5xl font-bold text-[#127431] font-barlow-condensed tracking-widest uppercase inline-flex justify-center select-none"
              >
                {"CATEGORIES".split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={{
                      hidden: { opacity: 0, scale: 0.5, y: -10 },
                      visible: { opacity: 1, scale: 1, y: 0 },
                    }}
                    transition={{ duration: 0.08, ease: "easeOut" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h3>

              {/* Red Line expand from center */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                className="w-32 h-[2.5px] bg-[#D62828] mx-auto mt-3 mb-1 origin-center"
              />

              {/* Subtitle Typewriter Text */}
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.25,
                    },
                  },
                }}
                className="text-[15px] font-normal text-slate-500 tracking-wider font-inter inline-flex flex-wrap justify-center select-none"
              >
                {"Premium quality meat, delivery fresh to your life."
                  .split("")
                  .map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      variants={{
                        hidden: { opacity: 0, y: 4 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.04 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
              </motion.p>
            </div>

            {/* Category Circular Badges - 2-col grid on mobile, horizontal row on desktop */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:items-center sm:justify-around items-center justify-items-center gap-y-6 gap-x-4 sm:gap-0 px-8 sm:px-12 sm:-ml-[10%] w-full"
            >
              {categories.map((cat, idx) => (
                <React.Fragment key={idx}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.7, y: 25 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: "easeOut" },
                      },
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 rounded-full border-[5px] border-[#CCCCCC] bg-white flex items-center justify-center shadow-md shadow-slate-200/50 transition-all duration-300">
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
                      <span className="text-[14px] font-black text-slate-800 tracking-wider uppercase transition-colors">
                        {cat.name}
                      </span>
                    </div>
                  </motion.div>

                  {idx < categories.length - 1 && (
                    <div className="hidden sm:block w-[1px] h-10 bg-slate-300/60 self-start mt-5 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Shared Element Flying Overlay - Bonds Section 1 and Section 2 */}
      {animatingPart && (
        <motion.div
          key={`fly-${animatingPart.name}-${animatingPart.timestamp}`}
          initial={{
            position: "fixed",
            top:
              animatingPart.startRect.top + animatingPart.startRect.height / 2,
            left:
              animatingPart.startRect.left + animatingPart.startRect.width / 2,
            width: animatingPart.startRect.width,
            height: animatingPart.startRect.height,
            opacity: 1,
            x: "-50%",
            y: "-50%",
            scale: 1,
            zIndex: 99999,
          }}
          animate={{
            top: animatingPart.targetRect
              ? animatingPart.targetRect.top
              : typeof window !== "undefined" && window.innerWidth < 768
                ? "27vh"
                : "46.3vh",
            left: animatingPart.targetRect
              ? animatingPart.targetRect.left
              : typeof window !== "undefined" && window.innerWidth < 768
                ? "50vw"
                : "calc(25vw - 0.5rem)",
            width: animatingPart.targetRect
              ? animatingPart.targetRect.width
              : typeof window !== "undefined" && window.innerWidth < 768
                ? 280
                : typeof window !== "undefined" && window.innerHeight <= 620
                  ? 320
                  : typeof window !== "undefined" && window.innerHeight <= 750
                    ? 380
                    : typeof window !== "undefined" && window.innerWidth >= 1400
                      ? 480
                      : 440,
            height: animatingPart.targetRect
              ? animatingPart.targetRect.height
              : typeof window !== "undefined" && window.innerWidth < 768
                ? 280
                : typeof window !== "undefined" && window.innerHeight <= 620
                  ? 320
                  : typeof window !== "undefined" && window.innerHeight <= 750
                    ? 380
                    : typeof window !== "undefined" && window.innerWidth >= 1400
                      ? 480
                      : 440,
            opacity: 1,
            x: "-50%",
            y: "-50%",
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={() => {
            setIsLandedInSection2(true);
            setTimeout(() => {
              setAnimatingPart(null);
            }, 450);
          }}
          className="fixed pointer-events-none flex items-center justify-center z-[99999]"
        >
          <img
            src={animatingPart.img}
            alt={animatingPart.name}
            className="w-full h-full object-contain"
          />
        </motion.div>
      )}
    </div>
  );
}
