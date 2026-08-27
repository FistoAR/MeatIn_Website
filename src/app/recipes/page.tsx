'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function RecipeDetailPage() {
  // Balanced 7 items and 6 items for clean vertical layout
  const ingredientsCol1 = [
    '500 g MEATIN Chicken (Curry Cut)',
    '2 tbsp Oil',
    '1 Large Onion, sliced',
    '1 tbsp Ginger Garlic Paste',
    '1 Large Tomato, chopped',
    '1 tsp Red Chilli Powder',
    '½ tsp Turmeric Powder',
  ];

  const ingredientsCol2 = [
    '1 tsp Coriander Powder',
    '1 tsp Garam Masala',
    'Salt to Taste',
    'Curry Leaves',
    'Fresh Coriander Leaves',
    'Water as Needed',
  ];

  const stepsList = [
    'Heat oil in a pan and sauté the sliced onions until golden brown.',
    'Add ginger garlic paste and sauté until the raw smell disappears.',
    'Add chopped tomatoes and cook until soft.',
    'Add chilli powder, turmeric, coriander powder and salt. Mix well.',
    'Add MEATIN Chicken (Curry Cut) and mix well with the masala.',
    'Add water as needed, cover and cook on medium heat until the chicken is tender.',
    'Add garam masala and curry leaves. Simmer for 2 minutes.',
    'Garnish with fresh coriander and serve hot.',
  ];

  return (
    <div className="relative min-h-screen bg-[#F7F9F5] text-slate-800 font-inter antialiased flex flex-col selection:bg-[#82B224] selection:text-white overflow-x-hidden">
      {/* Centered Single Doodle Background Image (Smaller & Centered) */}
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <Image
          src="/Recipies/doodle.webp"
          alt="Doodle Pattern Background"
          width={920}
          height={750}
          priority
          className="w-full h-auto object-contain opacity-90 mx-auto"
        />
      </div>

      {/* Decorative Chicken Bowl Graphic: Flush Left Bottom (Responsive Edge Alignment) */}
      <div className="absolute left-0 bottom-0 z-10 pointer-events-none w-[180px] sm:w-[240px] md:w-[290px] lg:w-[330px] h-auto">
        <Image
          src="/Recipies/leftBottomleaf.webp"
          alt="Chicken & Spices Decorative"
          width={360}
          height={280}
          className="w-full h-auto object-contain object-left-bottom"
        />
      </div>

      {/* Decorative Pepper Bowl Graphic: Flush Right Side (Responsive Edge Alignment) */}
      <div className="absolute right-0 top-[58%] -translate-y-1/2 z-10 pointer-events-none w-[120px] sm:w-[170px] md:w-[210px] lg:w-[250px] h-auto">
        <Image
          src="/Recipies/rightCenterleaf.webp"
          alt="Spices Bowl Decorative"
          width={300}
          height={300}
          className="w-full h-auto object-contain object-right"
        />
      </div>

      {/* Main Content Area with Full AOS Animations & Mobile Responsiveness */}
      <main className="relative z-20 flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-24 pb-28 space-y-10 sm:space-y-14 font-inter">
        {/* Top Hero Section: Dish Image Card (Left) + Recipe Overview (Right - Vertically Centered) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Recipe Hero Image Card with AOS */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] rounded-md overflow-hidden shadow-xl group flex flex-col justify-end select-none border border-slate-200/50"
          >
            {/* Main Dish Image */}
            <Image
              src="/Recipies/recipieChicken.webp"
              alt="Chicken Curry"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Overlay Content */}
            <div className="relative z-10 p-5 sm:p-8 space-y-2.5 sm:space-y-3 font-inter">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-inter tracking-tight leading-tight">
                Chicken Curry
              </h1>
              <p className="text-xs sm:text-base font-medium text-slate-200 font-inter max-w-[480px] leading-relaxed">
                Classic and flavourful chicken curry perfect with rice, chapati or dosa.
              </p>

              {/* Specs Badge Row */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 pt-1 sm:pt-2 text-xs sm:text-sm font-bold text-slate-200 font-inter">
                <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                  <span className="text-base sm:text-lg">🍳</span>
                  <span>Easy</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                  <span className="text-base sm:text-lg">⏱️</span>
                  <span>35 mins</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                  <span className="text-base sm:text-lg">👥</span>
                  <span>4 Servings</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Recipe Description & Specs Details with AOS */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6 font-inter py-1"
          >
            <div className="space-y-6">
              {/* ABOUT THIS RECIPE */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#153520] tracking-wider uppercase font-inter">
                    ABOUT THIS RECIPE
                  </h3>
                  {/* Decorative Leaf Icon */}
                  <div className="relative w-14 sm:w-20 h-8 sm:h-10 shrink-0">
                    <Image
                      src="/Recipies/leaf.webp"
                      alt="Leaf illustration"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="w-full border-b border-dashed border-slate-400/80" />
                <p className="text-xs sm:text-[15px] font-medium text-slate-800 leading-relaxed font-inter">
                  A flavorful traditional chicken curry made with tender MEATIN chicken pieces and aromatic Indian spices. Perfect with hot rice, chapati or parotta.
                </p>
              </motion.div>

              {/* TIPS */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-3"
              >
                <div className="w-full border-b border-dashed border-slate-400/80" />
                <h4 className="text-base sm:text-lg font-extrabold text-[#153520] tracking-wider uppercase font-inter">
                  TIPS
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-800 font-inter">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#82B224] shrink-0 mt-1.5" />
                    <span>Cook uncovered for a few extra minutes for a thicker gravy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#82B224] shrink-0 mt-1.5" />
                    <span>Marinate the chicken with curd and spices for 30 minutes for extra flavor.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#82B224] shrink-0 mt-1.5" />
                    <span>Add a little pepper powder for a spicier taste.</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* 3-Column Spec Box: Prep Time, Cook Time, Calories */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-md border border-slate-300/80 rounded-2xl p-3.5 sm:p-5 shadow-sm grid grid-cols-3 divide-x divide-slate-200 items-center text-center font-inter mt-3"
            >
              {/* Prep Time */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-2">
                <div className="relative w-7 h-7 sm:w-10 sm:h-10 shrink-0">
                  <Image
                    src="/Recipies/prep time.webp"
                    alt="Prep Time"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center sm:text-left font-inter">
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider font-inter">
                    Prep Time
                  </span>
                  <span className="block text-[11px] sm:text-sm font-semibold text-slate-700 font-inter">
                    15 mins
                  </span>
                </div>
              </div>

              {/* Cook Time */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-2">
                <div className="relative w-7 h-7 sm:w-10 sm:h-10 shrink-0">
                  <Image
                    src="/Recipies/cookTime.webp"
                    alt="Cook Time"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center sm:text-left font-inter">
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider font-inter">
                    Cook Time
                  </span>
                  <span className="block text-[11px] sm:text-sm font-semibold text-slate-700 font-inter">
                    25 mins
                  </span>
                </div>
              </div>

              {/* Calories */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-2">
                <div className="relative w-7 h-7 sm:w-10 sm:h-10 shrink-0">
                  <Image
                    src="/Recipies/calories.webp"
                    alt="Calories"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center sm:text-left font-inter">
                  <span className="block text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider font-inter">
                    Calories
                  </span>
                  <span className="block text-[11px] sm:text-sm font-semibold text-slate-700 font-inter">
                    350 kcal
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Bottom Section: INGREDIENTS (Left) & STEPS (Right) with AOS */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full py-4 select-none font-inter"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start font-inter">
            {/* Left Column: INGREDIENTS with AOS */}
            <div className="lg:col-span-5 space-y-4 relative font-inter pb-24 lg:pb-32">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="relative w-7 h-7 shrink-0">
                  <Image
                    src="/Recipies/reicon_food-tray.webp"
                    alt="Ingredients"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#153520] tracking-wider uppercase font-inter">
                  INGREDIENTS
                </h3>
              </motion.div>

              {/* Dashed Separator */}
              <div className="w-full border-b border-dashed border-slate-400/80" />

              {/* 2-Column Bulleted List with AOS staggered entrance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1 font-inter">
                {/* Column 1 */}
                <div className="space-y-3 font-inter">
                  {ingredientsCol1.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 font-inter"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#82B224] shrink-0 mt-1 shadow-sm" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="space-y-3 font-inter">
                  {ingredientsCol2.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: (idx + ingredientsCol1.length) * 0.04 }}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 font-inter"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#82B224] shrink-0 mt-1 shadow-sm" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Center Dashed Divider (Desktop) */}
            <div className="hidden lg:block absolute top-4 bottom-4 left-[43%] w-[1px] border-r-2 border-dashed border-emerald-700/30" />

            {/* Right Column: STEPS with AOS */}
            <div className="lg:col-span-7 space-y-4 relative font-inter pl-0 lg:pl-6 pb-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="relative w-7 h-7 shrink-0">
                  <Image
                    src="/Recipies/cookTime.webp"
                    alt="Steps"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#153520] tracking-wider uppercase font-inter">
                  STEPS
                </h3>
              </motion.div>

              {/* Dashed Separator */}
              <div className="w-full border-b border-dashed border-slate-400/80" />

              {/* Numbered Steps List (1-8) with AOS staggered entrance */}
              <div className="space-y-3.5 pt-1 font-inter relative z-10">
                {stepsList.map((stepText, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex items-start gap-3.5 text-xs sm:text-sm font-semibold text-slate-800 font-inter leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#5F8617] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-md font-inter mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{stepText}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
