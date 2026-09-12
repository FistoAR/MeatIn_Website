"use client";

// Re-eval HMR compilation
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

export default function KnowYourMeatPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsSectionRef = useRef<HTMLDivElement>(null);
  const centerCircleRef = useRef<HTMLDivElement>(null);
  const stationaryImgRef = useRef<HTMLImageElement>(null);
  const [activeStage, setActiveStage] = useState<
    "skin" | "skinless" | "inside"
  >("skin");
  const [activeMeatType, setActiveMeatType] = useState<
    "chicken" | "beef" | "goat"
  >("chicken");
  const [selectedPartIdx, setSelectedPartIdx] = useState(0);
  const [manuallySelectedPartIdx, setManuallySelectedPartIdx] = useState(0);
  const [activeViewTab, setActiveViewTab] = useState<
    "raw" | "platter" | "packed" | "3d"
  >("raw");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isLandedInSection2, setIsLandedInSection2] = useState(false);
  const [hasSelectedAnyPart, setHasSelectedAnyPart] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [highlightedCategoryIdx, setHighlightedCategoryIdx] = useState(0);

  useEffect(() => {
    const categoryTimer = setInterval(() => {
      setHighlightedCategoryIdx((prev) => (prev + 1) % 6);
    }, 1600);
    return () => clearInterval(categoryTimer);
  }, []);

  // GLB Model paths for 360 viewer (using updated GLB models from /Product/details/glb/)
  const partGlbMap: Record<string, string> = {
    Wing: "/Product/details/glb/wing.glb",
    wing: "/Product/details/glb/wing.glb",
    Wings: "/Product/details/glb/wing.glb",
    wings: "/Product/details/glb/wing.glb",
    Heart: "/Product/details/glb/heart.glb",
    heart: "/Product/details/glb/heart.glb",
    Drumette: "/Product/details/glb/drumsticks.glb",
    drumette: "/Product/details/glb/drumsticks.glb",
    Thigh: "/Product/details/glb/thighs.glb",
    thigh: "/Product/details/glb/thighs.glb",
    Thighs: "/Product/details/glb/thighs.glb",
    thighs: "/Product/details/glb/thighs.glb",
    Neck: "/Product/details/glb/neck.glb",
    neck: "/Product/details/glb/neck.glb",
    Breast: "/Product/details/glb/breast.glb",
    breast: "/Product/details/glb/breast.glb",
    Back: "/Product/details/glb/chest.glb",
    back: "/Product/details/glb/chest.glb",
    Chest: "/Product/details/glb/chest.glb",
    chest: "/Product/details/glb/chest.glb",
    Liver: "/Product/details/glb/liver.glb",
    liver: "/Product/details/glb/liver.glb",
    Drumstick: "/Product/details/glb/drumsticks.glb",
    drumstick: "/Product/details/glb/drumsticks.glb",
    Drumsticks: "/Product/details/glb/drumsticks.glb",
    drumsticks: "/Product/details/glb/drumsticks.glb",
    Gizzard: "/Product/details/glb/gizzard.glb",
    gizzard: "/Product/details/glb/gizzard.glb",
    Feet: "/Product/details/glb/feet.glb",
    feet: "/Product/details/glb/feet.glb",
    Head: "/Product/details/glb/head.glb",
    head: "/Product/details/glb/head.glb",
    Tenderloin: "/Product/details/glb/tenderloins.glb",
    tenderloin: "/Product/details/glb/tenderloins.glb",
    Tenderloins: "/Product/details/glb/tenderloins.glb",
    tenderloins: "/Product/details/glb/tenderloins.glb",
  };

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Dynamically load Google <model-viewer> web component script for 360 GLB models
    if (
      typeof window !== "undefined" &&
      !document.querySelector('script[src*="model-viewer"]')
    ) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
      document.body.appendChild(script);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMeatTabChange = (type: "chicken" | "beef" | "goat") => {
    setActiveMeatType(type);
    setHasSelectedAnyPart(false);
    setSelectedPartIdx(0);
    setManuallySelectedPartIdx(0);
    setActiveStage("skin");
    if (typeof window !== "undefined") {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        lenis.resize();
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "instant" as ScrollBehavior,
          block: "start",
        });
      }
    }
  };

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
    if (animatingPart) {
      let isCancelled = false;
      let rafId: number;

      // Instantly dismiss flying animation if user manually scrolls on desktop or mobile
      const handleUserScroll = () => {
        setIsLandedInSection2(true);
        setAnimatingPart(null);
        if (typeof window !== "undefined" && (window as any).lenis) {
          (window as any).lenis.scrollTo(
            window.pageYOffset || document.documentElement.scrollTop,
            { immediate: true }
          );
        }
      };

      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) > 1 || Math.abs(e.deltaX) > 1) {
          handleUserScroll();
        }
      };

      let touchStartY = 0;
      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches && e.touches[0]) {
          touchStartY = e.touches[0].clientY;
        }
      };
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches && e.touches[0]) {
          if (Math.abs(e.touches[0].clientY - touchStartY) > 4) {
            handleUserScroll();
          }
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          [
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            "Space",
            "Home",
            "End",
          ].includes(e.code)
        ) {
          handleUserScroll();
        }
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("keydown", handleKeyDown, { passive: true });

      const updateTarget = () => {
        if (isCancelled) return;

        let exactTarget:
          | { top: number; left: number; width: number; height: number }
          | null = null;

        if (detailsSectionRef.current) {
          const dRect = detailsSectionRef.current.getBoundingClientRect();

          // Priority 1: Directly measure the actual stationary image element
          if (stationaryImgRef.current) {
            const imgR = stationaryImgRef.current.getBoundingClientRect();
            if (imgR.width > 0 && imgR.height > 0) {
              exactTarget = {
                // When detailsSection reaches top: 0, img center is at (imgR.top - dRect.top) + imgR.height / 2
                top: imgR.top - dRect.top + imgR.height / 2,
                left: imgR.left - dRect.left + imgR.width / 2,
                width: imgR.width,
                height: imgR.height,
              };
            }
          }

          // Priority 2: Measure centerCircleRef container if image not yet laid out
          if (!exactTarget && centerCircleRef.current) {
            const cr = centerCircleRef.current.getBoundingClientRect();
            if (cr.width > 0 && cr.height > 0) {
              const isWing = animatingPart.name.toLowerCase().includes("wing");
              const targetW =
                typeof window !== "undefined"
                  ? window.innerWidth >= 768
                    ? window.innerWidth * (isWing ? 0.35 : 0.2)
                    : window.innerWidth >= 640
                      ? window.innerWidth * (isWing ? 0.65 : 0.50)
                      : window.innerWidth * (isWing ? 0.75 : 0.60)
                  : cr.width;

              exactTarget = {
                top: cr.top - dRect.top + cr.height / 2,
                left: cr.left - dRect.left + cr.width / 2,
                width: targetW,
                height: cr.height,
              };
            }
          }
        }

        if (exactTarget) {
          setAnimatingPart((prev) => {
            if (!prev) return null;
            if (
              prev.targetRect &&
              Math.abs(prev.targetRect.top - exactTarget.top) < 0.5 &&
              Math.abs(prev.targetRect.left - exactTarget.left) < 0.5 &&
              Math.abs(prev.targetRect.width - exactTarget.width) < 0.5 &&
              Math.abs(prev.targetRect.height - exactTarget.height) < 0.5
            ) {
              return prev;
            }
            return {
              ...prev,
              targetRect: exactTarget,
            };
          });
        }

        rafId = requestAnimationFrame(updateTarget);
      };

      rafId = requestAnimationFrame(updateTarget);
      return () => {
        isCancelled = true;
        cancelAnimationFrame(rafId);
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [animatingPart?.timestamp]);

  const handlePartClick = (
    e: React.MouseEvent<HTMLElement>,
    item: { name: string; img: string },
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Resolve selected part index immediately
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

    setHasSelectedAnyPart(true);
    setIsLandedInSection2(false);

    // 2. Immediately unhide both details section and recipe section in DOM to guarantee full scroll headroom
    if (detailsSectionRef.current) {
      detailsSectionRef.current.classList.remove("hidden");
      detailsSectionRef.current.classList.add("block");
      void detailsSectionRef.current.offsetHeight;
    }
    const recipesEl = document.querySelector(
      ".recipe-section-wrap"
    ) as HTMLElement | null;
    if (recipesEl) {
      recipesEl.classList.remove("hidden");
      recipesEl.classList.add("block");
    }

    // Update stationary image preview immediately if ref is already present
    if (stationaryImgRef.current) {
      stationaryImgRef.current.src = item.img;
    }

    // Notify Lenis smooth scroll of new document height
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.resize();
    }

    // 3. Compute starting position from clicked circular callout
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

    // 4. Compute destination position relative to detailsSection container
    let targetRect:
      | { top: number; left: number; width: number; height: number }
      | undefined;

    if (detailsSectionRef.current) {
      const dRect = detailsSectionRef.current.getBoundingClientRect();

      // Priority 1: Direct measurement of stationary image element
      if (stationaryImgRef.current) {
        const imgR = stationaryImgRef.current.getBoundingClientRect();
        if (imgR.width > 0 && imgR.height > 0) {
          targetRect = {
            top: imgR.top - dRect.top + imgR.height / 2,
            left: imgR.left - dRect.left + imgR.width / 2,
            width: imgR.width,
            height: imgR.height,
          };
        }
      }

      // Priority 2: Showcase container measurement
      if (!targetRect && centerCircleRef.current) {
        const cr = centerCircleRef.current.getBoundingClientRect();
        if (cr.width > 0 && cr.height > 0) {
          const isWing = item.name.toLowerCase().includes("wing");
          const targetW =
            typeof window !== "undefined"
              ? window.innerWidth >= 768
                ? window.innerWidth * (isWing ? 0.35 : 0.2)
                : window.innerWidth >= 640
                  ? window.innerWidth * (isWing ? 0.65 : 0.50)
                  : window.innerWidth * (isWing ? 0.75 : 0.60)
              : cr.width;
          targetRect = {
            top: cr.top - dRect.top + cr.height / 2,
            left: cr.left - dRect.left + cr.width / 2,
            width: targetW,
            height: cr.height,
          };
        }
      }
    }

    // Priority 3: Fallback calculation
    if (!targetRect && typeof window !== "undefined") {
      const isMob = window.innerWidth < 768;
      const isWing = item.name.toLowerCase().includes("wing");
      const isShort = window.innerHeight <= 620;
      const isMed = window.innerHeight <= 750;
      const boxW =
        window.innerWidth >= 768
          ? isShort
            ? 320
            : isMed
              ? 380
              : window.innerWidth >= 1400
                ? 480
                : 440
          : window.innerWidth >= 640
            ? window.innerWidth * (isWing ? 0.65 : 0.50)
            : window.innerWidth * (isWing ? 0.75 : 0.60);
      const boxH = isMob ? Math.min(270, window.innerHeight * 0.33) : boxW;
      const targetLeft = isMob
        ? window.innerWidth * 0.5
        : window.innerWidth * 0.25 - 40;
      const targetTop = isMob
        ? 74 + Math.min(270, window.innerHeight * 0.33) / 2
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

    // 5. Smooth scroll directly to the destination details section with layout-shift auto-correction
    const fastSmoothScrollToElement = (
      targetEl: HTMLElement,
      duration = 650
    ) => {
      if (typeof window !== "undefined" && (window as any).lenis) {
        const lenis = (window as any).lenis;
        lenis.resize();
        lenis.scrollTo(targetEl, {
          duration: duration / 1000,
          offset: 0,
          immediate: false,
        });

        // Periodic realignment checkpoints to neutralize mobile browser address bar collapse & Section 2 reflow
        const checkPoints = [150, 300, 450, 650];
        checkPoints.forEach((ms) => {
          setTimeout(() => {
            if (targetEl && targetEl.isConnected) {
              lenis.resize();
              const currentTop = targetEl.getBoundingClientRect().top;
              if (Math.abs(currentTop) > 2) {
                lenis.scrollTo(targetEl, {
                  duration: 0.25,
                  offset: 0,
                  immediate: false,
                });
              }
            }
          }, ms);
        });
        return;
      }

      // Native fallback
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (detailsSectionRef.current) {
      fastSmoothScrollToElement(detailsSectionRef.current, 650);
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
      platterImg: "/Product/Chicken/Platters/wings.webp",
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
      platterImg: "/Product/Chicken/Platters/heart.webp",
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
      platterImg: "/Product/Chicken/Platters/drumette.webp",
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
      platterImg: "/Product/Chicken/Platters/thig.webp",
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
      platterImg: "/Product/Chicken/Platters/neck.webp",
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
      platterImg: "/Product/Chicken/Platters/brest.webp",
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
      platterImg: "/Product/Chicken/Platters/bact.webp",
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
      platterImg: "/Product/Chicken/Platters/liver.webp",
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
      platterImg: "/Product/Chicken/Platters/drumstick.webp",
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
      platterImg: "/Product/Chicken/Platters/gizzard.webp",
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

  const partRecipesMap: Record<
    string,
    Array<{
      title: string;
      label: string;
      desc: string;
      img: string;
      time: string;
      servings: string;
      diff: string;
    }>
  > = {
    wing: [
      {
        title: "Spicy Chicken Wing Fry",
        label: "BEST FOR FRY",
        desc: "Crispy and spicy chicken wings tossed in fiery chili glaze.",
        img: "/Recipies/wing/spicy-chicken-wing-fry.webp",
        time: "25 mins",
        servings: "3 Servings",
        diff: "Easy",
      },
      {
        title: "Honey Glazed BBQ Wings",
        label: "BEST FOR BBQ",
        desc: "Sweet and smoky glazed chicken wings cooked to sticky perfection.",
        img: "/Recipies/wing/honey-glazed-bbq-wings.webp",
        time: "35 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Garlic Parmesan Wings",
        label: "BEST FOR SNACK",
        desc: "Tender wings coated in rich garlic butter and parmesan cheese.",
        img: "/Recipies/wing/garlic-parmesan-wings.webp",
        time: "30 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Buffalo Wing Platter",
        label: "BEST FOR STARTER",
        desc: "Classic American style buffalo wings served with creamy ranch dip.",
        img: "/Recipies/wing/buffalo-wing-platter.webp",
        time: "20 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
    ],
    heart: [
      {
        title: "Spicy Heart Skewers",
        label: "BEST FOR GRILL",
        desc: "Tender grilled chicken hearts seasoned with black pepper & herbs.",
        img: "/Recipies/heart/spicy-heart-skewers.webp",
        time: "20 mins",
        servings: "3 Servings",
        diff: "Easy",
      },
      {
        title: "Chicken Heart Pepper Fry",
        label: "BEST FOR FRY",
        desc: "Sautéed chicken hearts with crushed black pepper & curry leaves.",
        img: "/Recipies/heart/chicken-heart-pepper-fry.webp",
        time: "25 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "South Indian Heart Curry",
        label: "BEST FOR CURRY",
        desc: "Rich and aromatic chicken heart curry in coconut gravy.",
        img: "/Recipies/heart/south-indian-heart-curry.webp",
        time: "35 mins",
        servings: "4 Servings",
        diff: "Medium",
      },
      {
        title: "Garlic Butter Heart Stir-Fry",
        label: "BEST FOR STIR-FRY",
        desc: "Cleaned chicken hearts tossed with garlic, butter & veggies.",
        img: "/Recipies/heart/garlic-butter-heart-stir-fry.webp",
        time: "15 mins",
        servings: "2 Servings",
        diff: "Easy",
      },
    ],
    drumette: [
      {
        title: "Crispy Fried Drumettes",
        label: "BEST FOR FRY",
        desc: "Golden deep-fried drumettes with crunchy seasoned batter.",
        img: "/Recipies/drumette/crispy-fried-drumettes.webp",
        time: "25 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Tangy BBQ Drumette Roast",
        label: "BEST FOR BBQ",
        desc: "Marinated drumettes slow-roasted in rich tangy barbecue sauce.",
        img: "/Recipies/drumette/tangy-bbq-drumette-roast.webp",
        time: "40 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Spicy Lollipop Drumettes",
        label: "BEST FOR STARTER",
        desc: "Lollipop style drumettes served with spicy schezwan dip.",
        img: "/Recipies/drumette/spicy-lollipop-drumettes.webp",
        time: "30 mins",
        servings: "4 Servings",
        diff: "Medium",
      },
      {
        title: "Herb Roasted Drumette Platter",
        label: "BEST FOR ROAST",
        desc: "Oven-baked drumettes with rosemary, thyme, and olive oil.",
        img: "/Recipies/drumette/hearb-roasted-drumette-platter.webp",
        time: "35 mins",
        servings: "3 Servings",
        diff: "Easy",
      },
    ],
    thigh: [
      {
        title: "Creamy Chicken Thigh Curry",
        label: "BEST FOR CURRY",
        desc: "Tender bone-in chicken thighs cooked in rich onion gravy.",
        img: "/Recipies/thigh/cremy-chicken-thigh-curry.webp",
        time: "40 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Smoky Grilled Chicken Thigh",
        label: "BEST FOR GRILL",
        desc: "Char-broiled chicken thighs marinated in rustic Indian spices.",
        img: "/Recipies/thigh/smoky-grilled-chicken-thigh.webp",
        time: "35 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Crispy Fried Thigh Steaks",
        label: "BEST FOR FRY",
        desc: "Juicy thigh cuts battered and fried to crispy perfection.",
        img: "/Recipies/thigh/crispy-fried-thigh-steaks.webp",
        time: "30 mins",
        servings: "3 Servings",
        diff: "Easy",
      },
      {
        title: "Slow Cooked Thigh Roast",
        label: "BEST FOR ROAST",
        desc: "Succulent chicken thighs slow-cooked with aromatic spices.",
        img: "/Recipies/thigh/slow-cooked-thigh-roast.webp",
        time: "50 mins",
        servings: "4 Servings",
        diff: "Medium",
      },
    ],
    neck: [
      {
        title: "Nutritious Neck Soup",
        label: "BEST FOR SOUP",
        desc: "Nourishing and collagen-rich chicken neck bone soup with herbs.",
        img: "/Recipies/neck/nutritious-neck-soup.webp",
        time: "45 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Spicy Neck Pepper Masala",
        label: "BEST FOR GRAVY",
        desc: "Flavorful chicken necks sautéed with spicy black pepper gravy.",
        img: "/Recipies/neck/spicy-neck-pepper-masala.webp",
        time: "35 mins",
        servings: "4 Servings",
        diff: "Medium",
      },
      {
        title: "Traditional Bone Broth Stock",
        label: "BEST FOR BROTH",
        desc: "Slow-simmered chicken neck stock packed with wholesome nutrients.",
        img: "/Recipies/neck/traditional-bone-broth-stock.webp",
        time: "60 mins",
        servings: "6 Servings",
        diff: "Easy",
      },
      {
        title: "South Indian Neck Fry",
        label: "BEST FOR FRY",
        desc: "Spicy and crisp fried chicken necks seasoned with curry leaves.",
        img: "/Recipies/neck/south-indian-neck-fry.webp",
        time: "30 mins",
        servings: "3 Servings",
        diff: "Easy",
      },
    ],
    breast: [
      {
        title: "Grilled Lemon Herb Breast",
        label: "BEST FOR HEALTHY",
        desc: "Lean boneless breast fillets grilled with fresh lemon & olive oil.",
        img: "/Recipies/breast/healthy-chicken-breast-salad.webp",
        time: "20 mins",
        servings: "2 Servings",
        diff: "Easy",
      },
      {
        title: "Creamy Butter Breast Curry",
        label: "BEST FOR CURRY",
        desc: "Boneless chicken breast in rich velvety tomato butter gravy.",
        img: "/Recipies/breast/grilled-lemon-herb-breast.webp",
        time: "30 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Crispy Chicken Breast Nuggets",
        label: "BEST FOR SNACK",
        desc: "Bite-sized chicken breast nuggets served with garlic aioli dip.",
        img: "/Recipies/breast/creamy-butter-breat-curry.webp",
        time: "25 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Healthy Chicken Breast Salad",
        label: "BEST FOR FITNESS",
        desc: "Sliced grilled breast on garden greens with light dressing.",
        img: "/Recipies/breast/crisppy-breast-nuggets.webp",
        time: "15 mins",
        servings: "2 Servings",
        diff: "Easy",
      },
    ],
    back: [
      {
        title: "Rich Back Bone Broth",
        label: "BEST FOR BROTH",
        desc: "Collagen-dense chicken back bone broth simmered for deep flavor.",
        img: "/Recipies/back/spicy-back-piece-curry.webp",
        time: "90 mins",
        servings: "6 Servings",
        diff: "Easy",
      },
      {
        title: "Spicy Back Piece Curry",
        label: "BEST FOR CURRY",
        desc: "Traditional country-style chicken back curry with coconut milk.",
        img: "/Recipies/back/chicken-back-soup-base.webp",
        time: "40 mins",
        servings: "4 Servings",
        diff: "Medium",
      },
      {
        title: "Chicken Back Soup Base",
        label: "BEST FOR SOUP",
        desc: "Flavor-packed chicken stock base for rich winter soups.",
        img: "/Recipies/back/masala-roasted-back-cuts.webp",
        time: "45 mins",
        servings: "5 Servings",
        diff: "Easy",
      },
      {
        title: "Masala Roasted Back Cuts",
        label: "BEST FOR ROAST",
        desc: "Spicy oven-roasted chicken back cuts with caramelized onions.",
        img: "/Recipies/back/rich-back-bone-broth.webp",
        time: "35 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
    ],
    liver: [
      {
        title: "Chicken Liver Pepper Fry",
        label: "BEST FOR FRY",
        desc: "Tender chicken liver sautéed with caramelized onions and pepper.",
        img: "/Recipies/liver/chicken-liver-pepper-fry.webp",
        time: "20 mins",
        servings: "3 Servings",
        diff: "Easy",
      },
      {
        title: "Rich Chicken Liver Masala",
        label: "BEST FOR CURRY",
        desc: "Thick spicy liver curry cooked with traditional aromatic spices.",
        img: "/Recipies/liver/garlic-butter-liver.webp",
        time: "25 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Garlic Butter Liver Skewers",
        label: "BEST FOR GRILL",
        desc: "Marinated liver cubes grilled on skewers with herb butter.",
        img: "/Recipies/liver/rich-chicken-liver.webp",
        time: "15 mins",
        servings: "3 Servings",
        diff: "Easy",
      },
      {
        title: "Creamy Liver Pate Spread",
        label: "BEST FOR SPREAD",
        desc: "Smooth and rich chicken liver pate infused with thyme and butter.",
        img: "/Recipies/liver/cremy-liver-pate-spread.webp",
        time: "30 mins",
        servings: "6 Servings",
        diff: "Medium",
      },
    ],
    drumstick: [
      {
        title: "Spicy Tandoori Drumsticks",
        label: "BEST FOR TANDOORI",
        desc: "Classic tandoori drumsticks charred over open flame.",
        img: "/Recipies/drumstick/drumstick-1.webp",
        time: "35 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Crispy Fried Drumstick Box",
        label: "BEST FOR FRY",
        desc: "Golden crunchy drumsticks seasoned with Southern spices.",
        img: "/Recipies/drumstick/drumstick-2.webp",
        time: "30 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Chettinad Drumstick Curry",
        label: "BEST FOR CURRY",
        desc: "Fiery South Indian drumstick curry with freshly ground spices.",
        img: "/Recipies/drumstick/drumstick-3.webp",
        time: "40 mins",
        servings: "4 Servings",
        diff: "Medium",
      },
      {
        title: "Garlic Butter Glazed Leg",
        label: "BEST FOR ROAST",
        desc: "Oven-roasted drumsticks brushed with rich garlic herb butter.",
        img: "/Recipies/drumstick/drumstick-4.webp",
        time: "35 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
    ],
    gizzard: [
      {
        title: "Crunchy Gizzard Pepper Fry",
        label: "BEST FOR FRY",
        desc: "Chewy and crispy fried gizzards with green chillies & pepper.",
        img: "/Recipies/gizzard/gizzard-1.webp",
        time: "30 mins",
        servings: "4 Servings",
        diff: "Easy",
      },
      {
        title: "Spicy Braised Gizzard Gravy",
        label: "BEST FOR GRAVY",
        desc: "Slow-braised gizzards in rich caramelized onion gravy.",
        img: "/Recipies/gizzard/gizzard-2.webp",
        time: "45 mins",
        servings: "4 Servings",
        diff: "Medium",
      },
      {
        title: "Grilled Gizzard Skewers",
        label: "BEST FOR GRILL",
        desc: "Marinated chicken gizzards grilled to savory perfection.",
        img: "/Recipies/gizzard/gizzard-3.webp",
        time: "25 mins",
        servings: "3 Servings",
        diff: "Easy",
      },
      {
        title: "Pickled Gizzard Delicacy",
        label: "BEST FOR SNACK",
        desc: "Tangy and spicy pickled gizzards infused with mustard oil.",
        img: "/Recipies/gizzard/gizzard-4.webp",
        time: "40 mins",
        servings: "6 Servings",
        diff: "Medium",
      },
    ],
  };

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

  // Ensure activeStage is reset to "skin" and scroll is at top whenever returning to chicken tab
  useEffect(() => {
    if (activeMeatType === "chicken") {
      setActiveStage("skin");
    }
  }, [activeMeatType]);

  // Update active stage and titles based on scroll progress (only for chicken)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (activeMeatType !== "chicken") return;
    if (latest <= 0.35) {
      setActiveStage("skin");
    } else if (latest > 0.35 && latest < 0.58) {
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
          name: "BACK",
          desc: "Great for stocks,\nsoups & broths",
          img: "/Product/Chicken/ChickenParts/bact.webp",
          id: "back",
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
      href: "/know-your-meat",
      icon: "/Product/Chicken/Banner/image 298.webp",
    },
    {
      name: "BUFFALO",
      href: "/know-your-meat",
      icon: "/Product/Chicken/Banner/image 298 (1).webp",
    },
    {
      name: "MUTTON",
      href: "/know-your-meat",
      icon: "/Product/Chicken/Banner/image 298 (2).webp",
    },
    {
      name: "DUCK",
      href: "/know-your-meat",
      icon: "/Product/Chicken/Banner/image 298 (3).webp",
    },
    {
      name: "QUAIL",
      href: "/know-your-meat",
      icon: "/Product/Chicken/Banner/image 298 (4).webp",
    },
    {
      name: "BURGER PATTY",
      href: "/know-your-meat",
      icon: "/Product/Chicken/Banner/burger-patty.webp",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFCF7] relative font-manrope selection:bg-black/10 selection:text-slate-900">
      {/* Background Doodle Repeat Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.6] bg-repeat"
        style={{
          backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
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
            transform: translateY(-55px) !important;
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
          /* Section 2 details responsive width offsets */
          @media (min-width: 768px) and (max-width: 1023px) {
            .detail-showcase-box {
              margin-left: 0px !important;
            }
            .detail-carousel-bar {
              margin-left: 0px !important;
            }
          }
          @media (min-width: 1024px) and (max-width: 1279px) {
            .detail-showcase-box {
              margin-left: -12px !important;
            }
            .detail-carousel-bar {
              margin-left: -12px !important;
            }
          }
          @media (min-width: 1280px) and (max-width: 1535px) {
            .detail-showcase-box {
              margin-left: -28px !important;
            }
            .detail-carousel-bar {
              margin-left: -32px !important;
            }
          }
          @media (min-width: 1536px) {
            .detail-showcase-box {
              margin-left: -48px !important;
            }
            .detail-carousel-bar {
              margin-left: -64px !important;
            }
          }

          /* 70% / 30% Split for Details Section Left Column */
          @media (min-width: 768px) {
            .detail-left-col {
              height: 100% !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
              padding-top: 0px !important;
              padding-bottom: 0px !important;
              gap: 0px !important;
            }
            .detail-top-70 {
              height: 70% !important;
              max-height: 70% !important;
              flex: 0 0 70% !important;
              width: 100% !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              position: relative !important;
              overflow: visible !important;
            }
            .detail-bottom-30 {
              height: 30% !important;
              max-height: 30% !important;
              flex: 0 0 30% !important;
              width: 100% !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              position: relative !important;
              padding-bottom: 28px !important;
            }
            .detail-top-70 .detail-showcase-box {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .detail-top-70 .detail-showcase-box:not(.is-3d) {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .detail-top-70 .detail-showcase-box:not(.is-3d) img {
              width: 100% !important;
              height: 100% !important;
              max-height: 100% !important;
              max-width: 100% !important;
              object-fit: contain !important;
            }
            .detail-top-70 .detail-showcase-box.is-3d {
              width: 100% !important;
              height: 46vh !important;
              max-width: 100% !important;
              max-height: 48vh !important;
            }
            .detail-right-col {
              height: 100% !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: flex-start !important;
              align-items: flex-start !important;
              padding-bottom: 2vh !important;
            }
            .detail-carousel-btn {
              width: 106px !important;
            }
            @media (min-width: 1280px) {
              .detail-carousel-btn {
                width: 122px !important;
              }
            }
            @media (min-width: 1536px) {
              .detail-carousel-btn {
                width: 138px !important;
              }
            }
          }

          /* Section 2 details responsive height tiers for medium & laptop viewports */
          /* 3D Model Viewer full space mode */
          .detail-showcase-box.is-3d {
            width: 100% !important;
            max-width: 100% !important;
            height: 48vh !important;
            max-height: 52vh !important;
          }
          @media (min-height: 711px) {
            .detail-showcase-box.is-3d {
              height: 56vh !important;
              max-height: 60vh !important;
            }
          }
          @media (min-height: 800px) {
            .detail-showcase-box.is-3d {
              height: 64vh !important;
              max-height: 70vh !important;
            }
          }

          /* Tier 1: Ultra-compact (height <= 630px) */
          @media (max-height: 630px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 80px !important;
              padding-bottom: 2px !important;
            }
            .detail-left-col {
              padding-top: 0px !important;
              padding-bottom: 2px !important;
              justify-content: center !important;
              gap: 14px !important;
            }
            .detail-showcase-box:not(.is-3d) {
              width: min(290px, 40vh) !important;
              height: min(290px, 40vh) !important;
              max-height: 42vh !important;
            }
            .detail-carousel-bar {
              margin-top: 2px !important;
              gap: 4px !important;
            }
            .detail-carousel-btn {
              width: 88px !important;
            }
            .detail-right-col {
              justify-content: flex-start !important;
              align-items: flex-start !important;
            }
          }

          /* Tier 2: Compact laptops (height 631px to 710px, e.g. 1305x651, 1519x695) */
          @media (min-height: 631px) and (max-height: 710px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 86px !important;
              padding-bottom: 4px !important;
            }
            .detail-left-col {
              padding-top: 0px !important;
              padding-bottom: 4px !important;
              justify-content: center !important;
              gap: 16px !important;
            }
            .detail-showcase-box:not(.is-3d) {
              width: min(340px, 46vh) !important;
              height: min(340px, 46vh) !important;
              max-height: 48vh !important;
            }
            .detail-carousel-bar {
              margin-top: 4px !important;
              gap: 6px !important;
            }
            .detail-carousel-btn {
              width: 98px !important;
            }
            .detail-right-col {
              justify-content: flex-start !important;
              align-items: flex-start !important;
            }
          }

          /* Tier 3: Medium laptops (height 711px to 790px) */
          @media (min-height: 711px) and (max-height: 790px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 92px !important;
              padding-bottom: 6px !important;
            }
            .detail-left-col {
              padding-top: 0px !important;
              padding-bottom: 6px !important;
              justify-content: center !important;
              gap: 20px !important;
            }
            .detail-showcase-box:not(.is-3d) {
              width: min(380px, 48vh) !important;
              height: min(380px, 48vh) !important;
              max-height: 50vh !important;
            }
            .detail-carousel-bar {
              margin-top: 6px !important;
            }
            .detail-carousel-btn {
              width: 112px !important;
            }
            .detail-right-col {
              justify-content: flex-start !important;
              align-items: flex-start !important;
            }
          }

          /* Tier 4: Standard & tall desktop screens (height >= 791px) */
          @media (min-height: 791px) and (min-width: 768px) {
            .detail-section-wrap {
              padding-top: 96px !important;
              padding-bottom: 12px !important;
            }
            .detail-showcase-box:not(.is-3d) {
              width: min(460px, 46vw) !important;
              height: min(460px, 46vw) !important;
              max-width: 44vw !important;
              max-height: 62vh !important;
            }
            .detail-right-col {
              justify-content: flex-start !important;
              align-items: flex-start !important;
            }
          }

          @media (min-width: 1400px) and (min-height: 820px) {
            .detail-showcase-box:not(.is-3d) {
              width: 480px !important;
              height: 480px !important;
              max-width: 44vw !important;
              max-height: 62vh !important;
            }
            .detail-carousel-btn {
              width: 130px !important;
            }
          }

          @media (min-width: 1600px) and (min-height: 860px) {
            .detail-showcase-box:not(.is-3d) {
              width: 500px !important;
              height: 500px !important;
              max-width: 46vw !important;
              max-height: 68vh !important;
            }
            .detail-carousel-btn {
              width: 144px !important;
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
            aspect-ratio: 3 / 3.3 !important;
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
            background-image: url("/Product/know-your-meat-bg.webp") !important;
            background-size: 500px !important;
            background-repeat: repeat !important;
            background-color: #FAF6F0 !important;
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
            overflow-y: visible !important;
            overflow-x: hidden !important;
            padding-top: 74px !important;
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
            padding-top: 0px !important;
            padding-bottom: 0px !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .detail-top-70 {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            margin-top: 0px !important;
            margin-bottom: 8px !important;
          }
          .detail-showcase-box {
            width: min(340px, 88vw) !important;
            height: min(270px, 33vh) !important;
            max-width: 88vw !important;
            max-height: 35vh !important;
            margin-left: 0px !important;
            margin-top: 0px !important;
          }
          .detail-carousel-bar {
            margin-left: 0px !important;
            gap: 6px !important;
            top: 0px !important;
          }
          .detail-carousel-btn {
            width: min(88px, 22vw) !important;
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

          .detail-title span {
            color: #F2CE07 !important;
          }

          .detail-desc {
            font-size: 13px !important;
            line-clamp: none !important;
            display: block !important;
            -webkit-line-clamp: unset !important;
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
            margin-top: 6px !important;
            border-radius: 14px !important;
            align-items: center !important;
            padding: 10px !important;
            gap: 10px !important;
          }
          .detail-cooking-card > div:first-child {
            width: 78px !important;
            min-width: 78px !important;
            height: 78px !important;
            border-radius: 10px !important;
            align-self: center !important;
            overflow: hidden !important;
          }
        
          .detail-cooking-content {
            padding: 0px !important;
            gap: 4px !important;
          }
          .detail-cooking-content span:first-child {
            font-size: 14px !important;
          }
          .detail-cooking-content h5 {
            font-size: 13px !important;
            line-height: 1.25 !important;
          }
          .detail-cooking-content p {
            font-size: 11px !important;
            line-height: 1.35 !important;
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
        className={`relative w-full z-10 bg-[#FDFCF7] ${
          activeMeatType === "chicken" ? "h-[200vh]" : "h-[100vh]"
        }`}
      >
        {/* Section 1 Doodle Repeat Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.6] bg-repeat"
          style={{
            backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
            backgroundSize: "800px",
          }}
        />
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-16 md:pt-20 lg:pt-24 xl:pt-32 pb-4 viz-sticky-wrap">
          {/* Main Visualizer Content Area */}
          <div className="flex-1 w-full px-4 md:px-8 flex items-center justify-center relative pt-2 viz-main-wrap">
            {/* Top Right Sub-category tabs */}
            <div className="absolute top-0 right-4 lg:right-12 flex items-stretch bg-white border border-[#CCCCCC] shadow-sm z-40 text-[13px] md:text-[14px] font-bold tracking-wider h-9 md:h-10 select-none viz-switcher-container">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                onClick={() => handleMeatTabChange("chicken")}
                className={`px-6 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${
                  activeMeatType === "chicken"
                    ? "bg-[#064823] text-white"
                    : "text-slate-700 hover:bg-slate-50 border-r border-[#CCCCCC]"
                }`}
              >
                CHICKEN
                {activeMeatType === "chicken" && (
                  <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#064823] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
                )}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.22, ease: "easeOut" }}
                onClick={() => handleMeatTabChange("beef")}
                className={`px-8 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${
                  activeMeatType === "beef"
                    ? "bg-[#064823] text-white"
                    : "text-slate-700 hover:bg-slate-50 border-r border-[#CCCCCC]"
                }`}
              >
                BEEF
                {activeMeatType === "beef" && (
                  <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#064823] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
                )}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.34, ease: "easeOut" }}
                onClick={() => handleMeatTabChange("goat")}
                className={`px-8 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${activeMeatType === "goat"
                  ? "bg-[#064823] text-white"
                  : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                GOAT
                {activeMeatType === "goat" && (
                  <div className="absolute bottom-[-7.5px] left-1/2 transform -translate-x-1/2 w-[14px] h-[14px] bg-[#064823] rotate-45 border-r border-b border-[#CCCCCC] z-10" />
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
                      ? "/Product/Chicken/green-hen.svg"
                      : activeMeatType === "beef"
                        ? "/Product/Chicken/beef.svg"
                        : "/Product/Chicken/goat.svg"
                  }
                  alt={activeMeatType}
                  className="w-7 h-7 md:w-9 md:h-9 object-contain"
                />
                <span className="text-lg md:text-xl font-bold text-[#D98A00] tracking-[2px] uppercase font-barlow-condensed leading-none">
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
                className="text-4xl md:text-5xl font-bold font-barlow-condensed tracking-wide uppercase leading-none text-[#222222] viz-title-main"
              >
                {activeMeatType === "chicken" ? (
                  activeStage === "skin" ? (
                    <>
                      WITH <span className="text-[#8DC541]">SKIN</span>
                    </>
                  ) : activeStage === "skinless" ? (
                    <>
                      WITHOUT <span className="text-[#8DC541]">SKIN</span>
                    </>
                  ) : (
                    <>
                      WHOLE <span className="text-[#8DC541]">CHICKEN</span>
                    </>
                  )
                ) : (
                  <>
                    WITH <span className="text-[#8DC541]">SKIN</span>
                  </>
                )}
              </motion.h2>

              {/* Row 3: Tagline */}
              <motion.p
                key={`title-tagline-${activeMeatType}-${activeStage}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.42, ease: "easeOut" }}
                className="text-[14px] md:text-[16px] font-medium text-slate-600 tracking-wide font-inter viz-title-tagline mt-1"
              >
                Know the cuts Choose the best.
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
                                  ? "border-[#608D12] ring-4 ring-[#608D12]/40 scale-110 shadow-2xl bg-emerald-50"
                                  : "border-[#608D12] group-hover:border-[#608D12] group-hover:scale-105 group-hover:shadow-xl"
                              }`}
                            >
                              <span className="absolute -top-1 -left-1 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter bg-[#D62828] text-white shadow viz-card-badge">
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
                                    ? "bg-[#608D12] text-white shadow-lg ring-2 ring-[#608D12]/40"
                                    : "bg-[#608D12] group-hover:bg-[#4d730d] group-hover:shadow-md"
                                }`}
                              >
                                <span className="text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-extrabold viz-card-pill-text text-white">
                                  {item.name}
                                </span>
                              </div>
                              {/* Description */}
                              <p
                                className={`text-[11px] lg:text-[12px] xl:text-[13px] font-semibold text-slate-700 leading-tight whitespace-pre-line font-manrope max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] line-clamp-3 transition-all duration-300 viz-card-desc-text pl-10 lg:pl-12 xl:pl-13 ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""}`}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 440;
                          const d = `M ${sx} 100 L 520 100 L 635 185`;
                          return (
                            <g key="line-wing">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 440;
                          const d = `M ${sx} 240 L 520 200 L 625 305`;
                          return (
                            <g key="line-drumette">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 440;
                          const d = `M ${sx} 380 L 520 330 L 635 345`;
                          return (
                            <g key="line-thigh">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 1015;
                          const d = `M ${sx} 90 L 960 70 L 745 125`;
                          return (
                            <g key="line-neck">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 1015;
                          const d = `M ${sx} 240 L 960 200 L 790 200`;
                          return (
                            <g key="line-brest">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = 1015;
                          const d = `M ${sx} 390 L 960 330 L 860 345`;
                          return (
                            <g key="line-drumstick">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 465 : 420;
                          const d = `M ${sx} 75 L 530 75 L 620 170`;
                          return (
                            <g key="inside-wing">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 455 : 410;
                          const d = `M ${sx} 180 L 540 170 L 745 195`;
                          return (
                            <g key="inside-heart">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 455 : 410;
                          const d = `M ${sx} 300 L 520 250 L 625 305`;
                          return (
                            <g key="inside-drumette">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 465 : 420;
                          const d = `M ${sx} 410 L 520 355 L 645 325`;
                          return (
                            <g key="inside-thigh">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 985 : 1040;
                          const d = `M ${sx} 50 L 950 55 L 755 110`;
                          return (
                            <g key="inside-neck">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 995 : 1050;
                          const d = `M ${sx} 155 L 940 150 L 820 170`;
                          return (
                            <g key="inside-brest">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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

                        {/* BACK (#7) → spine/back bone in cavity */}
                        {(() => {
                          const active = isPartActive("BACK") || isPartActive("BACT");
                          const isHovered = isPartHovered("BACK") || isPartHovered("BACT");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 1025 : 1080;
                          const d = `M ${sx} 245 L 950 190 L 750 165`;
                          return (
                            <g key="inside-back">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
                                className="transition-opacity duration-300"
                              />
                              {active && (
                                <motion.path
                                  key={`yellow-in-back-${selectedPartIdx}-${isHovered ? "h" : "n"}`}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 1015 : 1070;
                          const d = `M ${sx} 345 L 950 270 L 760 240`;
                          return (
                            <g key="inside-liver">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 975 : 1030;
                          const d = `M ${sx} 425 L 950 340 L 865 340`;
                          return (
                            <g key="inside-drumstick">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sy = isHovered ? 395 : 430;
                          const d = `M 750 ${sy} L 760 310`;
                          return (
                            <g key="inside-gizzard">
                              <path
                                d={d}
                                stroke="#222222"
                                strokeWidth={1.8}
                                strokeDasharray="4 4"
                                opacity={active ? 0.35 : 0.85}
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
                    {/* Background Golden Outline Circle SVG behind chicken */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none z-0 -translate-y-5 sm:-translate-y-6 lg:-translate-y-7">
                      <img
                        src="/Product/Chicken/bg-circle.svg"
                        alt="Background Circle"
                        className="w-[67%] h-[67%] object-contain"
                      />
                    </div>

                    {/* Layer 1: Cavity (Bottom Layer) */}
                    <div className="absolute inset-0 w-full h-full z-0">
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
                                  ? "border-[#608D12] ring-4 ring-[#608D12]/40 scale-110 shadow-2xl bg-emerald-50"
                                  : "border-[#608D12] group-hover:border-[#608D12] group-hover:scale-105 group-hover:shadow-xl"
                              }`}
                            >
                              <span className="absolute -top-1 -left-1 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter bg-[#D62828] text-white shadow viz-card-badge">
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
                                    ? "bg-[#608D12] text-white shadow-lg ring-2 ring-[#608D12]/40"
                                    : "bg-[#608D12] group-hover:bg-[#4d730d] group-hover:shadow-md"
                                }`}
                              >
                                <span className="text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-extrabold viz-card-pill-text text-white">
                                  {item.name}
                                </span>
                              </div>
                              {/* Description */}
                              <p
                                className={`text-[11px] lg:text-[12px] xl:text-[13px] font-semibold text-slate-700 leading-tight whitespace-pre-line font-manrope max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] line-clamp-3 transition-all duration-300 viz-card-desc-text pl-10 lg:pl-12 xl:pl-13 ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""}`}
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
                          <span className="text-[#064823] font-black text-[14px] leading-none">
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
                                  ? "border-[#608D12] ring-4 ring-[#608D12]/40 scale-110 shadow-2xl bg-emerald-50"
                                  : "border-[#608D12] group-hover:border-[#608D12] group-hover:scale-105 group-hover:shadow-xl"
                              }`}
                            >
                              <span className="absolute -top-1 -left-1 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter bg-[#D62828] text-white shadow viz-card-badge">
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
                                    ? "bg-[#608D12] text-white shadow-lg ring-2 ring-[#608D12]/40"
                                    : "bg-[#608D12] group-hover:bg-[#4d730d] group-hover:shadow-md"
                                }`}
                              >
                                <span className="text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-extrabold viz-card-pill-text text-white">
                                  {item.name}
                                </span>
                              </div>
                              {/* Description */}
                              <p
                                className={`text-[11px] lg:text-[12px] xl:text-[13px] font-semibold text-slate-700 leading-tight whitespace-pre-line font-manrope max-w-[160px] lg:max-w-[180px] xl:max-w-[200px] line-clamp-3 transition-all duration-300 viz-card-desc-text pl-10 lg:pl-12 xl:pl-13 ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""}`}
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
                  className="relative -top-[3vh] w-full max-w-[780px] xl:max-w-[850px] h-[340px] sm:h-[400px] md:h-[440px] lg:h-[480px] max-h-[50vh] lg:max-h-[54vh] flex items-center justify-center z-20 viz-beef-img-wrap"
                >
                  <Image
                    src={
                      activeMeatType === "beef"
                        ? "/Product/GoatBeef/beef-image.webp"
                        : "/Product/GoatBeef/goat-image.webp"
                    }
                    alt={activeMeatType}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>

                {/* Bottom Grassland Bar with 4 Feature Badges (Animal stands directly on this hill - 100vw full width) */}
                <div
                  className="w-screen absolute bottom-[-2vh] left-1/2 transform -translate-x-1/2 h-[175px] bg-no-repeat flex items-end pb-5 px-8 justify-center z-10 viz-grassland-bar"
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

      {/* 2. Categories Section */}
      <section
        className={`bg-[#EBFFE6] relative z-30 transition-all duration-500 recipe-bottom-banner  overflow-visible ${
          activeMeatType === "chicken"
            ? "rounded-t-[50px] sm:rounded-t-[60px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] pt-4 sm:pt-5 pb-3 sm:pb-4 mt-0 "
            : "rounded-none shadow-none mt-0 pt-6 sm:pt-8 pb-3 sm:pb-4 "
        }`}
      >
        <div className="relative py-[3vh] ">
          {/* Overlapping Mascot on the left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[45vw] sm:w-[45vw] h-[35vh] sm:h-[30vh]  relative md:w-[20vw] md:h-[40vh]  md:absolute md:left-[1vw] -top-[10vh] md:-top-[10vh] md:mt-0 shrink-0 pointer-events-none drop-shadow-2xl -mb-[7vh] md:-mb-[0vh] z-20 mx-auto md:mx-0"
          >
            <Image
              src="/Product/chicken-gif.gif"
              alt="Chicken Mascot"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Heading and Categories grid */}
          <div className="w-full space-y-3 sm:space-y-4 flex flex-col items-center justify-center px-[5vw] -pl-[3vw]">
            <div className="space-y-2 text-center w-full flex flex-col items-center justify-center">
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
                className="text-4xl md:text-5xl font-bold text-[#064823] font-barlow-condensed tracking-widest uppercase inline-flex justify-center select-none"
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
                className="w-32 h-[2.5px] bg-[#F7840F] mx-auto mt-3 mb-1 origin-center"
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
                className="text-[15px] font-normal text-slate-800 tracking-wider font-inter inline-flex flex-wrap justify-center select-none"
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

            {/* Category Circular Badges */}
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
              className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:items-center sm:justify-around items-center justify-items-center gap-y-6 gap-x-4 sm:gap-0 px-4 sm:px-8 w-full md:pl-[180px] lg:pl-[220px] xl:pl-[240px]"
            >
              {categories.map((cat, idx) => {
                const isHighlighted = idx === highlightedCategoryIdx;
                return (
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
                      animate={
                        isHighlighted
                          ? { scale: [1, 1.14, 1.08] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="group flex flex-col items-center gap-2 cursor-pointer">
                        <div
                          className={`w-20 h-20 rounded-full border-[5px] bg-white flex items-center justify-center transition-all duration-500 ${
                            isHighlighted
                              ? "border-[#F2CE07] ring-4 ring-[#F2CE07]/40 shadow-xl shadow-[#F2CE07]/30 scale-108"
                              : "border-[#CCCCCC] shadow-md shadow-slate-200/50 group-hover:scale-105 group-hover:border-[#82B224]"
                          }`}
                        >
                          <div
                            className={`w-[68px] h-[68px] rounded-full border-2 border-white flex items-center justify-center transition-all duration-500 bg-[#82B224] ${
                              isHighlighted ? "scale-105 shadow-inner" : ""
                            }`}
                          >
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
                        <span
                          className={`text-[14px] font-black tracking-wider uppercase transition-all duration-300 ${
                            isHighlighted
                              ? "text-[#127431] scale-110"
                              : "text-slate-800 group-hover:text-[#127431]"
                          }`}
                        >
                          {cat.name}
                        </span>
                      </div>
                    </motion.div>

                    {idx < categories.length - 1 && (
                      <div className="hidden sm:block w-[1px] h-10 bg-slate-300/60 self-start mt-5 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Details Section - 1:1 Match with Reference Layout */}
      <section
        ref={detailsSectionRef}
        className={`relative z-30 w-full min-h-screen pt-8 lg:pt-[2.5vw] pb-6 sm:pb-8 lg:pb-0 flex flex-col justify-between m-0 overflow-x-hidden bg-[#8DC541] transition-all duration-700 detail-section-wrap ${
          hasSelectedAnyPart && activeMeatType === "chicken"
            ? "block opacity-100 pointer-events-auto"
            : "hidden opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image
            src="/Product/details/section-images/product-details-bg.webp"
            alt="Section Background"
            fill
            priority
            className="object-cover object-center w-full h-full"
          />

          {/* Floating single leaf - left side */}
          <div className="hidden lg:block absolute top-[16vw] left-[1.5vw] w-[4.5vw] h-auto z-10 opacity-90 animate-pulse">
            <Image
              src="/Product/details/section-images/single-leaf-image-1.webp"
              alt="Leaf"
              width={120}
              height={120}
              className="w-full h-auto object-contain"
            />
          </div>
          {/* Floating single leaf - right side */}
          <div className="hidden lg:block absolute bottom-[18vw] right-[2vw] w-[5.5vw] h-auto z-10 opacity-90 animate-pulse">
            <Image
              src="/Product/details/section-images/single-leaf-image-right-corner.webp"
              alt="Leaf"
              width={140}
              height={140}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* TOP MAIN CONTENT CONTAINER */}
        <div className="relative w-full max-w-[100vw] mx-auto px-4 lg:px-[3.5vw] flex-1 flex flex-col justify-start z-10 pt-2 lg:pt-[0.5vw]">
          
          {/* Top Left Slogan Badge: Goodness Begins at Our Farms + Two Leaves */}
          <div className="hidden lg:flex flex-col items-start absolute top-[1.2vw] left-[3.5vw] z-20 pointer-events-none">
            <div className="w-[13.5vw] h-auto">
              <Image
                src="/Product/details/section-images/goodness-begins-image.webp"
                alt="Goodness Begins at Our Farms"
                width={260}
                height={160}
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
            <div className="w-[7.5vw] h-auto -mt-[1.2vw] ml-[2vw]">
              <Image
                src="/Product/details/section-images/two-leaves-images.webp"
                alt="Leaves"
                width={140}
                height={100}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Top Center Title Header */}
          <div className="text-center w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[42vw] mx-auto z-20 pt-1 lg:pt-[0.2vw]">
            <h4 className="text-xs sm:text-sm lg:text-[1.15vw] font-black text-slate-800 tracking-widest uppercase font-barlow-condensed leading-none">
              FRESH PREMIUM CHICKEN
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.2vw] font-black text-[#E31E24] tracking-tight uppercase font-barlow-condensed leading-none mt-1 lg:mt-[0.3vw] drop-shadow-sm">
              {chickenParts[manuallySelectedPartIdx]?.name || "CHICKEN DRUMSTICK"}
            </h2>
            <p className="text-xs sm:text-sm lg:text-[0.78vw] font-semibold text-slate-700 font-manrope leading-relaxed max-w-[92%] sm:max-w-[80%] lg:max-w-[36vw] mx-auto mt-2 lg:mt-[0.5vw]">
              {chickenParts[manuallySelectedPartIdx]?.desc ||
                "Succulent chicken drumsticks cut with precision. Perfect for grilling, roasting, or frying, offering rich flavor and tender texture in every bite."}
            </p>
          </div>

          {/* Top Right Sidebar */}
          <div className="hidden lg:flex flex-col items-end gap-[1vw] absolute top-[1.2vw] right-[3.5vw] z-20 pointer-events-none">
            {/* Nutrition Card */}
            <div className="bg-[#FAF5E9]/90 backdrop-blur-sm rounded-[0.9vw] p-[0.75vw] border border-amber-900/10 shadow-md w-[14vw] flex flex-col gap-[0.4vw] pointer-events-auto">
              <div className="flex items-center gap-[0.4vw]">
                <div className="w-[1.4vw] h-[1.4vw] relative">
                  <Image
                    src="/Product/details/section-images/pure-natural-nutrition.webp"
                    alt="Nutrition"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[0.75vw] font-black text-[#E31E24] tracking-wider uppercase font-barlow-condensed">
                  NUTRITION HIGHLIGHTS
                </span>
              </div>
              <div className="grid grid-cols-2 gap-[0.3vw] pt-[0.2vw] border-t border-slate-200/80 text-[0.65vw] font-bold text-slate-800 font-manrope">
                <div>Protein: <span className="font-extrabold text-[#064823]">24g</span></div>
                <div>Calories: <span className="font-extrabold text-[#064823]">165 kcal</span></div>
                <div>Fat: <span className="font-extrabold text-[#064823]">7.5g</span></div>
                <div>Carbs: <span className="font-extrabold text-[#064823]">0g</span></div>
              </div>
            </div>

            {/* Benefits Badge image */}
            <div className="w-[13.5vw] h-auto">
              <Image
                src="/Product/details/section-images/benefits-texts.svg"
                alt="Pure & Natural Meat"
                width={260}
                height={160}
                className="w-full h-auto object-contain drop-shadow"
              />
            </div>
          </div>

          {/* CENTER PRODUCT ORBIT DISPLAY */}
          <div className="relative w-full max-w-[92vw] sm:max-w-[70vw] lg:max-w-[46vw] h-[250px] sm:h-[320px] lg:h-[25vw] mx-auto mt-4 sm:mt-6 lg:mt-[1.2vw] flex items-center justify-center">
            
            {/* Base Wooden Cutting Board (ONLY SHOW WHEN activeViewTab === "raw") */}
            {activeViewTab === "raw" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <Image
                  src="/Product/details/section-images/round-wooden-block.webp"
                  alt="Wooden Chopping Board"
                  width={750}
                  height={500}
                  className="w-[280px] sm:w-[360px] lg:w-[42vw] h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            )}

            {/* Main Center Selected Cut / Model Display */}
            <div className="relative w-[220px] sm:w-[280px] lg:w-[34vw] h-[180px] sm:h-[230px] lg:h-[22vw] flex items-center justify-center z-10">
              {activeViewTab === "raw" && (
                <Image
                  src={chickenParts[manuallySelectedPartIdx]?.img || "/Product/Chicken/ChickenParts/drumstick.webp"}
                  alt={chickenParts[manuallySelectedPartIdx]?.name || "Cut"}
                  width={550}
                  height={420}
                  className="w-[180px] sm:w-[240px] lg:w-[28vw] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              )}

              {activeViewTab === "packed" && (
                <Image
                  src={(chickenParts[manuallySelectedPartIdx] as any)?.pouchImg || "/Product/details/section-images/packedProduct.webp"}
                  alt="Packed Pouch"
                  width={500}
                  height={500}
                  className="w-[150px] sm:w-[200px] lg:w-[24vw] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              )}

              {activeViewTab === "platter" && (
                <Image
                  src={chickenParts[manuallySelectedPartIdx]?.platterImg || "/Product/Chicken/Platters/drumstick.webp"}
                  alt="Prepared Platter"
                  width={550}
                  height={420}
                  className="w-[180px] sm:w-[240px] lg:w-[28vw] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              )}

              {activeViewTab === "3d" && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black/10 backdrop-blur-md rounded-2xl border border-white/40 p-4 shadow-2xl">
                  <span className="text-white text-xs sm:text-sm lg:text-[1vw] font-bold font-manrope mb-2 uppercase tracking-wide">
                    Interactive 3D View ({chickenParts[manuallySelectedPartIdx]?.name})
                  </span>
                  <Image
                    src={chickenParts[manuallySelectedPartIdx]?.img || "/Product/Chicken/ChickenParts/drumstick.webp"}
                    alt="3D Preview"
                    width={400}
                    height={300}
                    className="w-[140px] sm:w-[180px] lg:w-[20vw] h-auto object-contain animate-pulse"
                  />
                </div>
              )}
            </div>

            {/* ORBIT BADGE 1: Top-Left (Single Raw Cut) */}
            <div
              onClick={() => setActiveViewTab("raw")}
              className="absolute -top-3 -left-1 sm:-top-4 sm:-left-3 lg:-top-[0.8vw] lg:-left-[3.5vw] z-30 group cursor-pointer"
            >
              {/* Curved Arrow */}
              <div className="hidden lg:block absolute -bottom-[1.2vw] -right-[2.4vw] w-[4vw] h-auto pointer-events-none z-10">
                <Image
                  src="/Product/details/section-images/arrow-top-left.svg"
                  alt="Arrow"
                  width={80}
                  height={80}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className={`w-11 h-11 sm:w-13 sm:h-13 lg:w-[4.8vw] lg:h-[4.8vw] rounded-full bg-white shadow-xl border-2 flex items-center justify-center p-1.5 lg:p-[0.55vw] hover:scale-110 transition-transform ${activeViewTab === "raw" ? "border-[#E31E24] ring-2 ring-[#E31E24]/30" : "border-slate-100"}`}>
                <Image
                  src={chickenParts[manuallySelectedPartIdx]?.img || "/Product/Chicken/ChickenParts/drumstick.webp"}
                  alt="Raw Cut"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* ORBIT BADGE 2: Bottom-Left (Pouch / Packaged) */}
            <div
              onClick={() => setActiveViewTab("packed")}
              className="absolute -bottom-3 -left-1 sm:-bottom-4 sm:-left-3 lg:bottom-[0.5vw] lg:-left-[4.8vw] z-30 group cursor-pointer"
            >
              {/* Curved Arrow */}
              <div className="hidden lg:block absolute -top-[1.2vw] -right-[2.4vw] w-[4vw] h-auto pointer-events-none z-10">
                <Image
                  src="/Product/details/section-images/arrow-bottom-left.svg"
                  alt="Arrow"
                  width={80}
                  height={80}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className={`w-11 h-11 sm:w-13 sm:h-13 lg:w-[4.8vw] lg:h-[4.8vw] rounded-full bg-white shadow-xl border-2 flex items-center justify-center p-1.5 lg:p-[0.55vw] hover:scale-110 transition-transform ${activeViewTab === "packed" ? "border-[#E31E24] ring-2 ring-[#E31E24]/30" : "border-slate-100"}`}>
                <Image
                  src={(chickenParts[manuallySelectedPartIdx] as any)?.pouchImg || "/Product/details/section-images/packedProduct.webp"}
                  alt="Pouch Pack"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* ORBIT BADGE 3: Top-Right (Bowl / Platter) */}
            <div
              onClick={() => setActiveViewTab("platter")}
              className="absolute -top-3 -right-1 sm:-top-4 sm:-right-3 lg:-top-[0.8vw] lg:-right-[3.5vw] z-30 group cursor-pointer"
            >
              {/* Curved Arrow */}
              <div className="hidden lg:block absolute -bottom-[1.2vw] -left-[2.4vw] w-[4vw] h-auto pointer-events-none z-10">
                <Image
                  src="/Product/details/section-images/arrow-top-right.svg"
                  alt="Arrow"
                  width={80}
                  height={80}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className={`w-11 h-11 sm:w-13 sm:h-13 lg:w-[4.8vw] lg:h-[4.8vw] rounded-full bg-white shadow-xl border-2 flex items-center justify-center p-1.5 lg:p-[0.55vw] hover:scale-110 transition-transform ${activeViewTab === "platter" ? "border-[#064823] ring-2 ring-[#064823]/30" : "border-slate-100"}`}>
                <Image
                  src={chickenParts[manuallySelectedPartIdx]?.platterImg || "/Product/Chicken/Platters/drumstick.webp"}
                  alt="Platter"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* ORBIT BADGE 4: Bottom-Right (View in 360°) */}
            <div
              onClick={() => setActiveViewTab(activeViewTab === "3d" ? "raw" : "3d")}
              className="absolute -bottom-3 -right-1 sm:-bottom-4 sm:-right-3 lg:bottom-[0.5vw] lg:-right-[4.8vw] z-30 group cursor-pointer"
            >
              {/* Curved Arrow */}
              <div className="hidden lg:block absolute -top-[1.2vw] -left-[2.4vw] w-[4vw] h-auto pointer-events-none z-10">
                <Image
                  src="/Product/details/section-images/arrow-bottom-right.svg"
                  alt="Arrow"
                  width={80}
                  height={80}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-[5vw] lg:h-[5vw] rounded-full bg-white shadow-xl border-2 flex flex-col items-center justify-center p-1 lg:p-[0.25vw] hover:scale-110 transition-transform ${activeViewTab === "3d" ? "border-[#E31E24] ring-2 ring-[#E31E24]/30" : "border-slate-100"}`}>
                <Image
                  src="/Product/details/360.webp"
                  alt="360 View"
                  width={40}
                  height={40}
                  className="w-5 h-5 lg:w-[1.8vw] lg:h-[1.8vw] object-contain"
                />
                <span className="text-[9px] lg:text-[0.55vw] font-black text-slate-800 tracking-tight leading-none mt-0.5 lg:mt-[0.15vw] uppercase font-manrope whitespace-nowrap">
                  View in 360°
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM GREEN FOOTER SECTION */}
        <div className="relative w-full z-30 pb-4 sm:pb-6 lg:pb-[1.8vw] px-4 sm:px-8 lg:px-[3.5vw] mt-6 sm:mt-8 lg:mt-[2vw]">
          
          {/* Center Stamp Badge (Positioned directly over top wave curve) */}
          <div className="w-[110px] sm:w-[140px] lg:w-[8vw] h-auto absolute -top-[2.2vw] left-1/2 transform -translate-x-1/2 z-40 drop-shadow-md">
            <Image
              src="/Product/details/section-images/keralas_original-meat.webp"
              alt="Kerala's Original Meat"
              width={170}
              height={110}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Bottom Green Container Row */}
          <div className="relative z-30 w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-[1.5vw] pt-2">
            
            {/* 1. Bottom Left Recipe Card */}
            <div className="relative w-full max-w-[340px] lg:max-w-none lg:w-[21.5vw] bg-[#FDFBF2] rounded-2xl lg:rounded-[1vw] p-3 lg:p-[0.65vw] lg:pr-[1.2vw] shadow-lg border border-white/80 flex items-center gap-3 lg:gap-[0.8vw]">
              {/* Chef Icon Red Circular Badge on top-left corner */}
              <div className="absolute -top-3 -left-3 lg:-top-[0.8vw] lg:-left-[0.8vw] w-8 h-8 lg:w-[2.3vw] lg:h-[2.3vw] rounded-full bg-[#E31E24] shadow-md flex items-center justify-center p-1.5 lg:p-[0.5vw] z-40">
                <Image
                  src="/Product/details/section-images/chef-icon.svg"
                  alt="Chef Icon"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>

              {/* Recipe Dish Image */}
              <div className="w-20 h-20 lg:w-[7.2vw] lg:h-[7.2vw] rounded-xl lg:rounded-[0.7vw] overflow-hidden relative shrink-0 shadow-sm border border-slate-100">
                <Image
                  src="/Product/details/bottomCard.webp"
                  alt="Recipe"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text & CTA Button */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="text-xs lg:text-[0.78vw] font-black text-[#E31E24] tracking-widest uppercase font-barlow-condensed leading-none">
                  WHAT'S COOKING?
                </span>
                <h5 className="text-xs lg:text-[0.78vw] font-bold text-slate-900 leading-tight font-manrope mt-1 lg:mt-[0.15vw] truncate">
                  Spicy Chicken {chickenParts[manuallySelectedPartIdx]?.name || "Drumstick"} Fry
                </h5>
                <p className="text-[10px] lg:text-[0.58vw] font-medium text-slate-600 leading-tight mt-1 lg:mt-[0.2vw] line-clamp-2 max-w-full lg:max-w-[11vw]">
                  A Spicy and flavourful recipe For a perfect family meal.
                </p>

                <Link
                  href={`/recipes?part=${chickenParts[manuallySelectedPartIdx]?.name.toLowerCase() || "drumstick"}`}
                  className="mt-2 lg:mt-[0.55vw] bg-[#E31E24] hover:bg-[#c9181d] text-white text-[10px] lg:text-[0.58vw] font-extrabold py-1 lg:py-[0.35vw] px-2.5 lg:px-[0.85vw] rounded-md lg:rounded-[0.4vw] uppercase tracking-wider inline-flex items-center gap-1 lg:gap-[0.3vw] shadow transition-colors w-max"
                >
                  <span>EXPLORE RECIPE</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* 2. Center 4 Feature SVGs directly rendered */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 lg:gap-[1.2vw] flex-1">
              {/* Feature 1 */}
              <img
                src="/Product/details/section-images/farm-fresh.svg"
                alt="Farm Fresh"
                className="h-10 sm:h-12 lg:h-[6.2vw] w-auto object-contain drop-shadow-sm"
              />

              {/* Divider */}
              <div className="hidden lg:block w-[1.5px] h-[3.8vw] bg-white/40" />

              {/* Feature 2 */}
              <img
                src="/Product/details/section-images/hygienic-processing.svg"
                alt="Hygienic Processing"
                className="h-10 sm:h-12 lg:h-[6.2vw] w-auto object-contain drop-shadow-sm"
              />

              {/* Divider */}
              <div className="hidden lg:block w-[1.5px] h-[3.8vw] bg-white/40" />

              {/* Feature 3 */}
              <img
                src="/Product/details/section-images/quality-checked.svg"
                alt="Quality Checked"
                className="h-10 sm:h-12 lg:h-[6.2vw] w-auto object-contain drop-shadow-sm"
              />

              {/* Divider */}
              <div className="hidden lg:block w-[1.5px] h-[3.8vw] bg-white/40" />

              {/* Feature 4 */}
              <img
                src="/Product/details/section-images/ready-natural-taste.svg"
                alt="Ready Natural Taste"
                className="h-10 sm:h-12 lg:h-[6.2vw] w-auto object-contain drop-shadow-sm"
              />
            </div>

            {/* 3. Right Truck Vector Graphic Banner */}
            <div className="flex items-center justify-end shrink-0">
              <img
                src="/Product/details/section-images/keep-fresh-delivered-fresh.svg"
                alt="Keep Fresh Delivered Fresh"
                className="h-10 sm:h-12 lg:h-[5.5vw] w-auto object-contain drop-shadow-sm"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Section 4: Recipes Section */}
      <section
        className={`relative z-20 w-full bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-[4vw] overflow-hidden transition-all duration-700 ${
          hasSelectedAnyPart && activeMeatType === "chicken"
            ? "block opacity-100 pointer-events-auto"
            : "hidden opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Doodle Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-[0.6] filter brightness-0"
          style={{
            backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
            backgroundSize: "800px",
          }}
        />
        <div className="w-full space-y-12 relative z-10 recipe-container-wrap">
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
                  className="w-5 h-[2px] bg-[#8DC541] origin-left"
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
                <span className="text-[#064823] block">
                  {`${chickenParts[manuallySelectedPartIdx]?.name || "CHICKEN"} RECIPES`
                    .split("")
                    .map((char, charIdx) => (
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
                <span className="text-[#F7840F] block">
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
              className="hidden md:block w-[2px] h-[70px] bg-[#F7840F] rounded-full shrink-0"
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
                Explore trending{" "}
                {chickenParts[manuallySelectedPartIdx]?.name.toLowerCase() ||
                  "chicken"}{" "}
                recipes in quick, easy &amp; delicious short-form videos.
              </p>

              {/* Filter buttons */}
              <div className="flex gap-3 recipe-filter-btns">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-[#064823] hover:bg-[#0a5e30] text-white text-[13px] font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto recipe-grid-wrap"
          >
            {(
              partRecipesMap[
                chickenParts[manuallySelectedPartIdx]?.name
                  .toLowerCase()
                  .trim() || "breast"
              ] || partRecipesMap["breast"]
            ).map((recipe, idx) => (
              <Link
                href={`/recipes?part=${chickenParts[manuallySelectedPartIdx]?.name.toLowerCase().trim() || "breast"}&recipeId=${chickenParts[manuallySelectedPartIdx]?.name.toLowerCase().trim() || "breast"}-${idx + 1}&title=${encodeURIComponent(recipe.title)}`}
                key={idx}
                className="block cursor-pointer"
              >
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
                  className="relative aspect-[3/3.3] w-full rounded-2xl overflow-hidden shadow-xl group flex flex-col justify-end p-4 select-none recipe-card-box cursor-pointer border border-slate-200/40"
                >
                  {/* Background Image */}
                  <Image
                    src={recipe.img}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark Black Gradient Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-[80%] z-10 bg-gradient-to-t from-black/95 via-black/80 to-transparent pointer-events-none" />

                  {/* Top-Left Red Badge Pill */}
                  <span className="absolute top-4 left-4 z-20 bg-[#064823] text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-md uppercase tracking-wider shadow-lg pointer-events-none">
                    {recipe.label}
                  </span>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-3 font-inter">
                    {/* Recipe Title */}
                    <h3
                      className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold text-white font-barlow-condensed tracking-wide uppercase leading-tight group-hover:text-[#E1C609] transition-colors truncate whitespace-nowrap"
                      title={recipe.title}
                    >
                      {recipe.title}
                    </h3>

                    {/* Spec Row (Easy, Time, Servings) */}
                    <div className="flex items-center gap-3 text-[12px] font-bold text-slate-300 font-manrope recipe-card-spec">
                      <div className="flex items-center gap-1.5">
                        <div className="relative w-4 h-4 shrink-0">
                          <img
                            src="/Product/recipies/easy.svg"
                            alt="Difficulty"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span>{recipe.diff}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="relative w-5 h-5 shrink-0">
                          <img
                            src="/Product/recipies/time.svg"
                            alt="Time"
                            className="w-full h-full object-contain"
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
                            className="object-contain"
                          />
                        </div>
                        <span>{recipe.servings}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-[#F7840F] hover:bg-[#e0730b] text-white text-[12px] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-colors cursor-pointer font-inter shadow-md mt-1 recipe-card-btn">
                      <span>VIEW RECIPE & STEPS →</span>
                    </button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
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
                ? 74 + Math.min(270, window.innerHeight * 0.33) / 2
                : "46.3vh",
            left: animatingPart.targetRect
              ? animatingPart.targetRect.left
              : typeof window !== "undefined" && window.innerWidth < 768
                ? "50vw"
                : "calc(25vw - 0.5rem)",
            width: animatingPart.targetRect
              ? animatingPart.targetRect.width
              : typeof window !== "undefined"
                ? window.innerWidth >= 768
                  ? window.innerWidth *
                    (animatingPart.name.toLowerCase().includes("wing")
                      ? 0.35
                      : 0.2)
                  : window.innerWidth >= 640
                    ? window.innerWidth *
                      (animatingPart.name.toLowerCase().includes("wing")
                        ? 0.65
                        : 0.50)
                    : window.innerWidth *
                      (animatingPart.name.toLowerCase().includes("wing")
                        ? 0.75
                        : 0.60)
                : 240,
            height: animatingPart.targetRect
              ? animatingPart.targetRect.height
              : typeof window !== "undefined" && window.innerWidth < 768
                ? Math.min(270, window.innerHeight * 0.33)
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
            }, 900);
          }}
          className="fixed pointer-events-none flex items-center justify-center z-[99999]"
        >
          <motion.img
            src={animatingPart.img}
            alt={animatingPart.name}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        </motion.div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white hover:scale-115 active:scale-95 transition-all w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/25 rounded-full cursor-pointer"
              aria-label="Close Fullscreen View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
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
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            >
              <img
                src={lightboxImage}
                alt="Product Fullscreen Preview"
                className={`object-contain rounded-2xl select-none filter drop-shadow-2xl ${
                  lightboxImage.includes("packedProduct")
                    ? "max-w-full max-h-[85vh]"
                    : "w-[80vw] max-w-[500px] sm:max-w-[650px] md:max-w-[750px] lg:max-w-[850px] max-h-[85vh]"
                }`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
