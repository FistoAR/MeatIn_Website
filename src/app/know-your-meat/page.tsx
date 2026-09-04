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
  const [activeStage, setActiveStage] = useState<
    "skin" | "skinless" | "inside"
  >("skin");
  const [activeMeatType, setActiveMeatType] = useState<
    "chicken" | "beef" | "goat"
  >("chicken");
  const [selectedPartIdx, setSelectedPartIdx] = useState(0);
  const [manuallySelectedPartIdx, setManuallySelectedPartIdx] = useState(0);
  const [activeViewTab, setActiveViewTab] = useState<"raw" | "packed" | "3d">(
    "raw",
  );
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

  // GLB Model paths for 360 viewer
  const partGlbMap: Record<string, string> = {
    Wing: "/Product/details/partsGLB/wings.glb",
    wing: "/Product/details/partsGLB/wings.glb",
    Heart: "/Product/details/partsGLB/heart.glb",
    heart: "/Product/details/partsGLB/heart.glb",
    Drumette: "/Product/details/partsGLB/drumtee.glb",
    drumette: "/Product/details/partsGLB/drumtee.glb",
    Thigh: "/Product/details/partsGLB/thigh.glb",
    thigh: "/Product/details/partsGLB/thigh.glb",
    Neck: "/Product/details/partsGLB/neck.glb",
    neck: "/Product/details/partsGLB/neck.glb",
    Breast: "/Product/details/partsGLB/Breast.glb",
    breast: "/Product/details/partsGLB/Breast.glb",
    Back: "/Product/details/partsGLB/back.glb",
    back: "/Product/details/partsGLB/back.glb",
    Liver: "/Product/details/partsGLB/liver.glb",
    liver: "/Product/details/partsGLB/liver.glb",
    Drumstick: "/Product/details/partsGLB/Drumstick.glb",
    drumstick: "/Product/details/partsGLB/Drumstick.glb",
    Gizzard: "/Product/details/partsGLB/gizzard.glb",
    gizzard: "/Product/details/partsGLB/gizzard.glb",
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
      document.head.appendChild(script);
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
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "instant" as ScrollBehavior });
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
      icon: "/Product/Chicken/Banner/image 298.webp",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFCF7] relative font-manrope selection:bg-black/10 selection:text-slate-900">
      {/* Background Doodle Repeat Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.25] bg-repeat"
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
              justify-content: center !important;
              padding-top: 0px !important;
              overflow-y: hidden !important;
            }
            .detail-inner-gap {
              gap: 4px !important;
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
              gap: 8px !important;
              justify-content: center !important;
              padding-top: 0px !important;
              overflow-y: hidden !important;
            }
            .detail-inner-gap {
              gap: 10px !important;
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
              padding-top: 96px !important;
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
            aspect-ratio: 3 / 2.8 !important;
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
        className={`relative w-full z-10 bg-[#FDFCF7] ${activeMeatType === "chicken" ? "h-[200vh]" : "h-[100vh]"
          }`}
      >
        {/* Section 1 Doodle Repeat Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.25] bg-repeat"
          style={{
            backgroundImage: 'url("/Product/Chicken/doodle.webp")',
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
                className={`px-6 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${activeMeatType === "chicken"
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
                onClick={() => handleMeatTabChange("beef")}
                className={`px-8 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${activeMeatType === "beef"
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
                onClick={() => handleMeatTabChange("goat")}
                className={`px-8 flex items-center justify-center uppercase relative font-bold cursor-pointer transition-colors viz-switcher-btn ${activeMeatType === "goat"
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
              className={`absolute left-1/2 transform -translate-x-1/2 text-center z-30 flex flex-col items-center viz-title-block ${activeMeatType === "chicken" ? "top-2" : "top-6"
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
                      WITH <span className="text-[#608D12]">SKIN</span>
                    </>
                  ) : activeStage === "skinless" ? (
                    <>
                      WITHOUT <span className="text-[#608D12]">SKIN</span>
                    </>
                  ) : (
                    <>
                      WHOLE <span className="text-[#608D12]">CHICKEN</span>
                    </>
                  )
                ) : (
                  <>
                    WITH <span className="text-[#608D12]">SKIN</span>
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
                            className={`flex items-center relative select-none cursor-pointer group ${selected ? "z-40 scale-105 selected-part" : "z-10"
                              }`}
                          >
                            {/* Circle Thumbnail */}
                            <div
                              className={`relative w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] xl:w-[85px] xl:h-[85px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 lg:p-2 shadow-md z-10 shrink-0 transition-all duration-300 viz-card-circle ${selected
                                ? "border-[#608D12] ring-4 ring-[#608D12]/40 scale-110 shadow-2xl bg-emerald-50"
                                : "border-[#608D12] group-hover:border-[#608D12] group-hover:scale-105 group-hover:shadow-xl"
                                }`}
                            >
                              <span
                                className="absolute -top-1 -left-1 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter bg-[#D62828] text-white shadow viz-card-badge"
                              >
                                {idx + 1}
                              </span>
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className={`object-contain transition-transform duration-300 ${selected
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
                                className={`min-w-[130px] lg:min-w-[145px] xl:min-w-[155px] pl-10 lg:pl-12 xl:pl-13 pr-7 lg:pr-9 xl:pr-10 py-0.5 lg:py-1 rounded-full inline-flex items-center self-start transition-all duration-300 viz-card-pill ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""} ${selected
                                  ? "bg-[#608D12] text-white shadow-lg ring-2 ring-[#608D12]/40"
                                  : "bg-[#608D12] group-hover:bg-[#4d730d] group-hover:shadow-md"
                                  }`}
                              >
                                <span
                                  className="text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-extrabold viz-card-pill-text text-white"
                                >
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

                        {/* BACT (#7) → spine/back bone in cavity */}
                        {(() => {
                          const active = isPartActive("BACT");
                          const isHovered = isPartHovered("BACT");
                          const color = active ? "#F2CE07" : "#222222";
                          const r = active ? 4.5 : 3.5;
                          const sx = isHovered ? 1025 : 1080;
                          const d = `M ${sx} 245 L 950 190 L 750 165`;
                          return (
                            <g key="inside-bact">
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
                            className={`absolute bottom-[-45px] md:bottom-[-55px] left-[45%] transform -translate-x-[45%] flex items-center select-none cursor-pointer group viz-gizzard-pos ${selected ? "z-40 scale-105 selected-part" : "z-30"
                              }`}
                          >
                            {/* Circle Thumbnail */}
                            <div
                              className={`relative w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] xl:w-[85px] xl:h-[85px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 lg:p-2 shadow-md z-10 shrink-0 transition-all duration-300 viz-card-circle ${selected
                                ? "border-[#F2CE07] ring-4 ring-[#F2CE07]/60 scale-110 shadow-2xl bg-amber-50"
                                : "border-[#D62828] group-hover:border-[#F2CE07] group-hover:scale-105 group-hover:shadow-xl"
                                }`}
                            >
                              <span
                                className={`absolute -top-1 -left-1 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] xl:w-[22px] xl:h-[22px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter transition-colors duration-300 viz-card-badge ${selected
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
                                  className={`object-contain transition-transform duration-300 ${selected
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
                                className={`min-w-[130px] lg:min-w-[145px] xl:min-w-[155px] pl-10 lg:pl-12 xl:pl-13 pr-7 lg:pr-9 xl:pr-10 py-0.5 lg:py-1 rounded-full inline-flex items-center self-start transition-all duration-300 viz-card-pill ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""} ${selected
                                  ? "bg-[#F2CE07] text-black shadow-lg ring-2 ring-[#F2CE07]/40"
                                  : "bg-[#D62828] group-hover:bg-[#b01c1c] group-hover:shadow-md"
                                  }`}
                              >
                                <span
                                  className={`text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-semibold viz-card-pill-text ${selected
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
                            className={`w-[48px] h-[48px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 shadow-sm transition-all ${selected
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
                            className={`flex items-center relative select-none cursor-pointer group ${selected ? "z-40 scale-105 selected-part" : "z-10"
                              }`}
                          >
                            {/* Circle Thumbnail */}
                            <div
                              className={`relative w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] xl:w-[85px] xl:h-[85px] rounded-full border-2 bg-white flex items-center justify-center p-1.5 lg:p-2 shadow-md z-10 shrink-0 transition-all duration-300 viz-card-circle ${selected
                                ? "border-[#608D12] ring-4 ring-[#608D12]/40 scale-110 shadow-2xl bg-emerald-50"
                                : "border-[#608D12] group-hover:border-[#608D12] group-hover:scale-105 group-hover:shadow-xl"
                                }`}
                            >
                              <span
                                className="absolute -top-1 -left-1 w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] rounded-full flex items-center justify-center text-[11px] lg:text-[12px] xl:text-[13px] font-black z-20 font-inter bg-[#D62828] text-white shadow viz-card-badge"
                              >
                                {callouts[activeStage].left.length + idx + 1}
                              </span>
                              <div className="relative w-full h-full rounded-full overflow-hidden">
                                <Image
                                  src={item.img}
                                  alt={item.name}
                                  fill
                                  className={`object-contain transition-transform duration-300 ${selected
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
                                className={`min-w-[130px] lg:min-w-[145px] xl:min-w-[155px] pl-10 lg:pl-12 xl:pl-13 pr-7 lg:pr-9 xl:pr-10 py-0.5 lg:py-1 rounded-full inline-flex items-center self-start transition-all duration-300 viz-card-pill ${selected ? "pl-14 lg:pl-16 xl:pl-17" : ""} ${selected
                                  ? "bg-[#608D12] text-white shadow-lg ring-2 ring-[#608D12]/40"
                                  : "bg-[#608D12] group-hover:bg-[#4d730d] group-hover:shadow-md"
                                  }`}
                              >
                                <span
                                  className="text-[14px] lg:text-[15px] xl:text-[17px] tracking-widest uppercase font-barlow-condensed leading-none font-extrabold viz-card-pill-text text-white"
                                >
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
                  className="relative w-full max-w-[780px] xl:max-w-[850px] h-[340px] sm:h-[400px] md:h-[440px] lg:h-[480px] max-h-[50vh] lg:max-h-[54vh] flex items-center justify-center -translate-y-8 lg:-translate-y-12 z-20 viz-beef-img-wrap"
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
                  className="w-screen absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 h-[175px] bg-no-repeat flex items-end pb-5 px-8 justify-center z-10 viz-grassland-bar"
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
      <section className="bg-[#EBFFE6] rounded-t-[60px] pt-10 pb-6 relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 recipe-bottom-banner overflow-visible mt-12 md:mt-16">
        <div className="px-6 md:px-16 relative flex flex-col md:flex-row gap-6 md:gap-8 items-center max-w-[1400px] mx-auto">
          {/* Overlapping Mascot on the left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[180px] h-[270px] md:w-[220px] md:h-[330px] relative -mt-20 md:-mt-28 shrink-0 pointer-events-none drop-shadow-lg"
          >
            <Image
              src="/Product/Chicken/Banner/image 282.webp"
              alt="Chicken Mascot"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Heading and Categories grid */}
          <div className="flex-1 space-y-6 flex flex-col items-center w-full">
            <div className="space-y-2 text-center w-full">
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
                className="text-4xl md:text-5xl font-bold text-[#127431] font-barlow-condensed tracking-widest uppercase inline-flex justify-center select-none"
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
              className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:items-center sm:justify-around items-center justify-items-center gap-y-6 gap-x-4 sm:gap-0 px-4 sm:px-8 w-full"
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
                      animate={isHighlighted ? { scale: [1, 1.14, 1.08] } : { scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="flex flex-col items-center gap-3 cursor-pointer group">
                        <div
                          className={`w-20 h-20 rounded-full border-[5px] bg-white flex items-center justify-center transition-all duration-500 ${isHighlighted
                            ? "border-[#F2CE07] ring-4 ring-[#F2CE07]/40 shadow-xl shadow-[#F2CE07]/30 scale-108"
                            : "border-[#CCCCCC] shadow-md shadow-slate-200/50 group-hover:scale-105 group-hover:border-[#82B224]"
                            }`}
                        >
                          <div
                            className={`w-[68px] h-[68px] rounded-full border-2 border-white flex items-center justify-center transition-all duration-500 bg-[#82B224] ${isHighlighted ? "scale-105 shadow-inner" : ""
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
                          className={`text-[14px] font-black tracking-wider uppercase transition-all duration-300 ${isHighlighted ? "text-[#127431] scale-110" : "text-slate-800 group-hover:text-[#127431]"
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

      {/* 3. Interactive Details Section - Only shown when activeMeatType === "chicken" */}
      <section
        ref={detailsSectionRef}
        className={`relative z-30 w-full h-screen min-h-screen max-h-screen pt-[85px] md:pt-[95px] lg:pt-[105px] pb-4 flex items-center justify-center m-0 overflow-y-auto md:overflow-hidden transition-all duration-700 detail-section-wrap ${hasSelectedAnyPart && activeMeatType === "chicken"
          ? "block opacity-100 pointer-events-auto"
          : "hidden opacity-0 pointer-events-none"
          }`}
      >
        {/* Pure Code Background: Darker Green (#46660E) + Doodle Pattern + Cream Paper Right Panel with Layered Ripped Edge */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Base Section 2 Off-White Cream Background (Left side behind product image) */}
          <div className="absolute inset-0 bg-[#FAF7F2]" />

          {/* Doodle Pattern Overlay across Left Cream Background */}
          <div
            className="absolute inset-0 opacity-[0.25] bg-repeat pointer-events-none"
            style={{
              backgroundImage: 'url("/Product/Chicken/doodle.webp")',
              backgroundSize: "800px",
            }}
          />

          {/* Procedural Paper Tear SVG Filter Definition */}
          <svg
            className="absolute w-0 h-0 pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="real-paper-tear"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.015 0.035"
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="4.0"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="displaced"
                />

                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.002 0.02"
                  numOctaves="2"
                  result="spotNoise"
                />
                <feColorMatrix
                  in="spotNoise"
                  type="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 4 -1.8"
                  result="spotMask"
                />

                <feDropShadow
                  in="displaced"
                  dx="-3"
                  dy="1.5"
                  stdDeviation="2"
                  floodColor="#061208"
                  floodOpacity="0.3"
                  result="fullShadow"
                />

                <feComposite
                  in="fullShadow"
                  in2="spotMask"
                  operator="in"
                  result="sporadicShadow"
                />

                <feMerge>
                  <feMergeNode in="sporadicShadow" />
                  <feMergeNode in="displaced" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Desktop Right Side Bright Green Panel */}
          <div className="hidden md:block absolute top-0 bottom-0 right-0 left-[46%] lg:left-[48%] xl:left-[50%] z-0 bg-[#7CB324]">
            {/* Real Procedural Hand-Torn Paper SVG Edge Divider */}
            <svg
              className="absolute top-0 bottom-0 -left-[45px] h-full w-[50px] overflow-visible"
              viewBox="0 0 50 1000"
              preserveAspectRatio="none"
              style={{ filter: "url(#real-paper-tear)" }}
            >
              {/* Dotted Dark Olive Green Torn Fiber Shadow 1 */}
              <path
                d="M 35.0 175.0 L 34.7 181.2 L 33.9 187.5 L 31.9 193.8 L 30.7 200.0 L 30.3 206.2 L 28.0 212.5 L 27.6 218.8 L 29.3 225.0 L 28.7 231.2 L 29.4 237.5 L 29.7 243.8 L 31.5 250.0 L 32.2 256.2 L 32.2 262.5 L 33.6 268.8"
                fill="none"
                stroke="#5B8817"
                strokeWidth="3"
                strokeDasharray="2 3"
                strokeLinecap="round"
                className="opacity-40"
                transform="translate(-2, 0)"
              />

              {/* Dotted Dark Olive Green Torn Fiber Shadow 2 */}
              <path
                d="M 31.2 512.5 L 30.1 518.8 L 29.7 525.0 L 26.8 531.2 L 25.7 537.5 L 24.5 543.8 L 24.2 550.0 L 23.5 556.2 L 24.0 562.5 L 24.5 568.8 L 23.1 575.0 L 24.5 581.2 L 24.4 587.5 L 25.4 593.8 L 27.9 600.0 L 27.1 606.2"
                fill="none"
                stroke="#5B8817"
                strokeWidth="3"
                strokeDasharray="2 3"
                strokeLinecap="round"
                className="opacity-40"
                transform="translate(-2, 0)"
              />

              {/* Dotted Dark Olive Green Torn Fiber Shadow 3 */}
              <path
                d="M 29.0 775.0 L 29.6 781.2 L 27.6 787.5 L 27.9 793.8 L 27.8 800.0 L 26.9 806.2 L 25.7 812.5 L 25.4 818.8 L 26.5 825.0 L 27.6 831.2 L 28.7 837.5 L 28.5 843.8 L 31.2 850.0 L 32.1 856.2 L 32.8 862.5 L 33.0 868.8"
                fill="none"
                stroke="#5B8817"
                strokeWidth="3"
                strokeDasharray="2 3"
                strokeLinecap="round"
                className="opacity-40"
                transform="translate(-2, 0)"
              />

              {/* Main Green Paper Sheet Path */}
              <path
                d="M 50 0 L 31.8 0.0 L 31.3 6.2 L 32.2 12.5 L 30.9 18.8 L 33.2 25.0 L 32.5 31.2 L 33.3 37.5 L 32.4 43.8 L 32.7 50.0 L 32.7 56.2 L 34.6 62.5 L 35.0 68.8 L 33.5 75.0 L 35.1 81.2 L 35.2 87.5 L 35.0 93.8 L 34.7 100.0 L 34.3 106.2 L 35.3 112.5 L 36.3 118.8 L 35.0 125.0 L 34.8 131.2 L 36.2 137.5 L 34.8 143.8 L 35.2 150.0 L 34.3 156.2 L 36.1 162.5 L 34.0 168.8 L 35.0 175.0 L 34.7 181.2 L 33.9 187.5 L 31.9 193.8 L 30.7 200.0 L 30.3 206.2 L 28.0 212.5 L 27.6 218.8 L 29.3 225.0 L 28.7 231.2 L 29.4 237.5 L 29.7 243.8 L 31.5 250.0 L 32.2 256.2 L 32.2 262.5 L 33.6 268.8 L 32.6 275.0 L 32.4 281.2 L 31.3 287.5 L 31.1 293.8 L 32.8 300.0 L 31.0 306.2 L 32.4 312.5 L 31.2 318.8 L 30.7 325.0 L 32.6 331.2 L 32.5 337.5 L 32.6 343.8 L 31.0 350.0 L 31.0 356.2 L 30.4 362.5 L 31.4 368.8 L 31.9 375.0 L 30.9 381.2 L 32.8 387.5 L 32.1 393.8 L 30.5 400.0 L 32.5 406.2 L 32.3 412.5 L 31.3 418.8 L 32.1 425.0 L 32.2 431.2 L 30.6 437.5 L 31.0 443.8 L 30.9 450.0 L 32.1 456.2 L 32.6 462.5 L 30.3 468.8 L 32.2 475.0 L 31.5 481.2 L 31.8 487.5 L 30.5 493.8 L 31.3 500.0 L 30.3 506.2 L 31.2 512.5 L 30.1 518.8 L 29.7 525.0 L 26.8 531.2 L 25.7 537.5 L 24.5 543.8 L 24.2 550.0 L 23.5 556.2 L 24.0 562.5 L 24.5 568.8 L 23.1 575.0 L 24.5 581.2 L 24.4 587.5 L 25.4 593.8 L 27.9 600.0 L 27.1 606.2 L 26.3 612.5 L 27.3 618.8 L 25.4 625.0 L 26.0 631.2 L 26.9 637.5 L 26.5 643.8 L 25.3 650.0 L 26.0 656.2 L 26.8 662.5 L 26.3 668.8 L 24.9 675.0 L 25.5 681.2 L 26.4 687.5 L 27.3 693.8 L 26.2 700.0 L 26.8 706.2 L 27.4 712.5 L 27.4 718.8 L 27.5 725.0 L 27.2 731.2 L 26.4 737.5 L 27.5 743.8 L 27.5 750.0 L 27.3 756.2 L 28.4 762.5 L 29.7 768.8 L 29.0 775.0 L 29.6 781.2 L 27.6 787.5 L 27.9 793.8 L 27.8 800.0 L 26.9 806.2 L 25.7 812.5 L 25.4 818.8 L 26.5 825.0 L 27.6 831.2 L 28.7 837.5 L 28.5 843.8 L 31.2 850.0 L 32.1 856.2 L 32.8 862.5 L 33.0 868.8 L 33.5 875.0 L 33.8 881.2 L 33.3 887.5 L 35.1 893.8 L 35.6 900.0 L 35.1 906.2 L 35.0 912.5 L 35.1 918.8 L 33.5 925.0 L 33.7 931.2 L 34.1 937.5 L 34.3 943.8 L 35.2 950.0 L 33.8 956.2 L 34.9 962.5 L 34.8 968.8 L 35.0 975.0 L 33.5 981.2 L 34.4 987.5 L 33.8 993.8 L 32.9 1000.0 L 50 1000 Z"
                className="fill-[#7CB324]"
              />
            </svg>
          </div>
        </div>

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
        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-stretch px-4 md:px-10 lg:px-16">
          {/* Left Column (50% flex) - Green panel area with centered preview & bottom carousel */}
          <motion.div
            key={`detail-left-${manuallySelectedPartIdx}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 relative h-auto md:h-full flex flex-col items-center justify-around py-4 md:py-8 px-6 select-none"
          >
            {/* Center Showcase Box */}
            <div className="relative w-[430px] h-[430px] sm:w-[480px] sm:h-[480px] md:w-[420px] md:h-[420px] max-h-[65vh] flex items-center justify-center md:-ml-20 detail-showcase-box">
              {/* Showcase Box Content: Interactive 3D Model Viewer OR 2D Product Image */}
              <div
                ref={centerCircleRef}
                className="relative w-full h-full flex items-center justify-center z-30"
              >
                {activeViewTab === "3d" ? (
                  /* CLEAN INTERACTIVE 360° 3D GLB MODEL VIEWER */
                  <div className="relative w-full h-full flex items-center justify-center pointer-events-auto z-40">
                    {/* Google <model-viewer> Web Component (Scaled up on mobile to match image size) */}
                    <div className="w-full h-full relative flex items-center justify-center scale-[2.4] sm:scale-[1.8] md:scale-100 transition-transform duration-300">
                      {/* @ts-ignore */}
                      <model-viewer
                        src={
                          partGlbMap[
                          chickenParts[manuallySelectedPartIdx].name
                          ] || "/Product/details/partsGLB/Drumstick.glb"
                        }
                        alt={`360 3D Model of ${chickenParts[manuallySelectedPartIdx].name}`}
                        auto-rotate
                        camera-controls
                        shadow-intensity="1.5"
                        shadow-softness="0.8"
                        exposure="1.15"
                        camera-orbit="0deg 75deg 80%"
                        rotation-per-second="30deg"
                        interaction-prompt="none"
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "transparent",
                          filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.35))",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  /* 2D Image View (Raw or Packed) */
                  <div
                    className={`relative w-full h-full flex items-center justify-center transition-all duration-300 pointer-events-none ${isLandedInSection2
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
                      className={`w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-300 ${activeViewTab === "raw"
                        ? "scale-[7] sm:scale-[2.8] md:scale-100"
                        : "scale-[1.3] md:scale-100"
                        }`}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Carousel Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center justify-center gap-2.5 sm:gap-3.5 z-30 md:-ml-20"
            >
              {/* Left Arrow Button */}
              <button
                onClick={() => {
                  setActiveViewTab((prev) =>
                    prev === "raw" ? "3d" : prev === "3d" ? "packed" : "raw",
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
                className={`relative w-[95px] sm:w-[110px] aspect-[679/738] rounded-2xl overflow-hidden p-2 transition-all duration-300 cursor-pointer detail-carousel-btn bg-[#FEF6DB] ${activeViewTab === "raw"
                  ? "border-4 border-[#D62828] scale-105 shadow-lg"
                  : "border border-[#F5E5B8] hover:scale-105"
                  }`}
                title="Raw Cut View"
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
                className={`relative w-[95px] sm:w-[110px] aspect-[679/738] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer detail-carousel-btn ${activeViewTab === "packed"
                  ? "border-4 border-[#D62828] scale-105 shadow-lg"
                  : "border-2 border-[#D62828] hover:scale-105"
                  }`}
                title="Packed Product View"
              >
                <img
                  src="/Product/details/packedProduct.webp"
                  alt="Packed Product"
                  className="w-full h-full object-cover scale-[1.28]"
                />
              </button>

              {/* Thumbnail 3: 360 Image with 3D View Intimation Tag */}
              <button
                onClick={() => setActiveViewTab("3d")}
                className={`relative w-[95px] sm:w-[110px] aspect-[679/738] rounded-2xl overflow-hidden p-1.5 transition-all duration-300 cursor-pointer detail-carousel-btn flex flex-col items-center justify-between ${activeViewTab === "3d"
                  ? "border-4 border-[#F2CE07] bg-white/50 scale-105"
                  : "border-2 border-white/60 bg-white/20 hover:bg-white/40"
                  }`}
                title="Click to view 360° 3D Model"
              >
                {/* 360 Image */}
                <div className="relative w-full h-[65%] flex items-center justify-center">
                  <img
                    src="/Product/details/360.webp"
                    alt="360 View"
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
                {/* Intimation badge below 360 image */}
                <span className="w-full text-center bg-[#F2CE07] text-slate-900 font-extrabold text-[9px] sm:text-[10px] py-0.5 rounded-lg uppercase tracking-wider font-manrope shadow-sm border border-white/90">
                  3D View
                </span>
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={() => {
                  setActiveViewTab((prev) =>
                    prev === "raw"
                      ? "packed"
                      : prev === "packed"
                        ? "3d"
                        : "raw",
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
            className="w-full md:w-1/2 h-auto md:h-full px-4 md:px-8 lg:px-12 xl:px-14 flex flex-col justify-center detail-right-col overflow-hidden py-2 selection:bg-[#8CC63F] selection:text-white"
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
              className="text-[12px] sm:text-[13px] xl:text-[14px] font-semibold text-[#2E5E14] tracking-wider flex items-center gap-1.5 font-manrope mb-2 sm:mb-2.5 lg:mb-3"
            >
              <Link
                href="/"
                className="relative inline-block hover:text-[#14421A] transition-all duration-200 cursor-pointer hover:underline"
              >
                Home
              </Link>
              <span className="text-[#2E5E14]/70 text-[11px]">&gt;</span>
              <Link
                href="/know-your-meat"
                className="relative inline-block hover:text-[#14421A] transition-all duration-200 cursor-pointer hover:underline"
              >
                Products
              </Link>
              <span className="text-[#2E5E14]/70 text-[11px]">&gt;</span>
              <button
                onClick={() => {
                  setHasSelectedAnyPart(false);
                  setIsLandedInSection2(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="relative inline-block hover:text-[#14421A] transition-all duration-200 cursor-pointer hover:underline"
              >
                Chicken
              </button>
              <span className="text-[#2E5E14]/70 text-[11px]">&gt;</span>
              <span className="text-[#2E5E14] font-bold">
                {chickenParts[manuallySelectedPartIdx].name}
              </span>
            </motion.div>

            <div className="flex flex-col detail-inner-gap">
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
                className="space-y-0.5 mb-2 sm:mb-2.5 lg:mb-3"
              >
                <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-bold text-[#D62828] tracking-wider uppercase font-manrope block">
                  CHICKEN
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[68px] [@media(min-width:1024px)]:text-[3.6vw] font-bold text-[#14421A] leading-[0.95] tracking-wide font-barlow-condensed uppercase detail-title">
                  CHICKEN{" "}
                  <span className="text-white">
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
                className="text-[12px] sm:text-[13px] lg:text-[14px] xl:text-[15px] font-medium text-[#1C3A18] leading-relaxed font-manrope max-w-[600px] xl:max-w-[640px] detail-desc mb-2 sm:mb-2.5 lg:mb-3"
              >
                {chickenParts[manuallySelectedPartIdx].desc}
              </motion.p>

              {/* Green Line Separator */}
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
                className="w-14 sm:w-18 h-[2.5px] bg-[#5B8920] origin-left mb-2.5 sm:mb-3 lg:mb-3.5"
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
                className="flex items-center gap-3 sm:gap-4 lg:gap-5 py-2 sm:py-2.5 lg:py-3 border-t border-b border-[#87BB3A]/40 mb-2.5 sm:mb-3 lg:mb-3.5"
              >
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-extrabold text-[#14421A] tracking-wider uppercase font-manrope whitespace-nowrap">
                    PACKAGE WEIGHT
                  </span>
                  <span className="text-lg sm:text-xl lg:text-2xl font-black text-[#14421A] font-barlow-condensed whitespace-nowrap ml-1">
                    {chickenParts[manuallySelectedPartIdx].weight}
                  </span>
                </div>
                <div className="w-[1.5px] h-5 bg-[#14421A]/40 shrink-0 mx-1" />
                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0">
                    <Image
                      src="/Product/details/pack.webp"
                      alt="Pack Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-extrabold text-[#14421A] tracking-wider uppercase font-manrope whitespace-nowrap">
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
                className="space-y-2 mb-2.5 sm:mb-3 lg:mb-3.5"
              >
                <h4 className="text-[12px] sm:text-[13px] lg:text-[14px] font-extrabold text-[#14421A] tracking-wider uppercase font-manrope">
                  NUTRITION INFORMATION (PER 100g)
                </h4>
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3 detail-nutrition-grid">
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
                      className="bg-white rounded-2xl p-2.5 sm:p-3 text-center flex flex-col items-center justify-between min-h-[76px] sm:min-h-[86px] lg:min-h-[94px] xl:min-h-[100px] gap-1 shadow-sm border border-white detail-nutrition-card"
                    >
                      <div className="relative w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7">
                        <Image
                          src={nut.icon}
                          alt={nut.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-bold text-[#111111] tracking-wider uppercase font-manrope">
                        {nut.label}
                      </span>
                      <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-extrabold text-black font-barlow-condensed">
                        {nut.val}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Cooking recipe card */}
              <Link
                href={`/recipes?part=${chickenParts[manuallySelectedPartIdx].name.toLowerCase()}&recipeId=${chickenParts[manuallySelectedPartIdx].name.toLowerCase()}-1`}
                className="block w-full"
              >
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
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="group border border-[#E4D5D3] bg-[#EFE4E2] rounded-2xl overflow-hidden shadow-sm relative flex gap-0 items-stretch detail-cooking-card cursor-pointer mt-2"
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
                  <div className="flex-1 p-4 lg:p-5 flex flex-col justify-between gap-1.5 detail-cooking-content">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <span className="text-[17px] lg:text-[19px] font-bold text-[#D62828] tracking-widest uppercase font-barlow-condensed">
                        WHAT'S COOKING?
                      </span>
                      <span className="bg-[#D62828] text-white text-[9px] lg:text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider font-manrope shadow-sm">
                        TRENDING
                      </span>
                    </div>

                    {/* Title */}
                    <h5 className="text-[14px] lg:text-[15.5px] font-extrabold text-[#111111] leading-tight font-manrope group-hover:text-[#D62828] transition-colors">
                      Spicy Chicken {chickenParts[manuallySelectedPartIdx].name}{" "}
                      Fry
                    </h5>

                    {/* Description */}
                    <p className="text-[11.5px] lg:text-[12.5px] text-[#444444] leading-relaxed font-manrope">
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
                      className="w-auto inline-flex items-center justify-center self-start bg-[#D62828] text-white text-[10.5px] lg:text-[11.5px] font-extrabold py-1.5 px-4 rounded-xl whitespace-nowrap gap-1.5 uppercase tracking-wider font-manrope cursor-pointer transition-colors shadow-sm mt-1"
                    >
                      <span>EXPLORE RECIPE</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Recipes Section (Hidden by default, shown ONLY after part is selected in Section 1) */}
      <section
        className={`relative z-30 w-full bg-[#E4E4E4] pt-16 pb-28 px-4 md:px-12 lg:px-20 recipe-section-wrap overflow-hidden select-none transition-all duration-700 ${hasSelectedAnyPart
          ? "block opacity-100"
          : "hidden opacity-0 pointer-events-none"
          }`}
      >
        {/* Background Doodle Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-50 filter brightness-0"
          style={{
            backgroundImage: 'url("/Product/Chicken/doodle.webp")',
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
                  className="relative aspect-[3/2.8] w-full rounded-2xl overflow-hidden shadow-xl group flex flex-col justify-end p-4 select-none recipe-card-box cursor-pointer border border-slate-200/40"
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
                  <span className="absolute top-4 left-4 z-20 bg-[#D62828] text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-md uppercase tracking-wider shadow-lg pointer-events-none">
                    {recipe.label}
                  </span>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-3 font-inter">
                    {/* Recipe Title */}
                    <h3 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold text-white font-barlow-condensed tracking-wide uppercase leading-tight group-hover:text-[#E1C609] transition-colors truncate whitespace-nowrap" title={recipe.title}>
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
                    <button className="w-full bg-[#82B224] hover:bg-[#6C971B] text-white text-[12px] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-colors cursor-pointer font-inter shadow-md mt-1 recipe-card-btn">
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
          <motion.img
            src={animatingPart.img}
            alt={animatingPart.name}
            initial={{ scale: 1 }}
            animate={{
              scale:
                typeof window !== "undefined" && window.innerWidth < 640
                  ? 7
                  : typeof window !== "undefined" && window.innerWidth < 768
                    ? 2.8
                    : 1,
            }}
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
                className={`object-contain rounded-2xl select-none filter drop-shadow-2xl ${lightboxImage.includes("packedProduct")
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
