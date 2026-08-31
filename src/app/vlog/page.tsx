'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';

export default function VlogComingSoonPage() {
  return (
    <div className="min-h-[85vh] bg-white text-slate-900 font-inter flex flex-col items-center justify-center pt-36 pb-20 px-4 relative overflow-hidden">
      {/* Background Subtle Gradient Blurs in Red, Yellow, and Green */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#D62828]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-[#D4A437]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-[#1F5A3C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Top Decorative Tri-Color Dots */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-[#D62828] shadow-sm animate-pulse" />
          <span className="w-3 h-3 rounded-full bg-[#D4A437] shadow-sm animate-pulse delay-100" />
          <span className="w-3 h-3 rounded-full bg-[#1F5A3C] shadow-sm animate-pulse delay-200" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D62828]/10 text-[#D62828] border border-[#D62828]/20 font-black text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MEATIN VLOG</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-barlow-condensed uppercase leading-none">
          THIS PAGE IS{' '}
          <span className="text-[#D62828] relative inline-block">
            COMING SOON
            <span className="absolute left-0 right-0 -bottom-1 h-1.5 bg-gradient-to-r from-[#D62828] via-[#D4A437] to-[#1F5A3C] rounded-full" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-base sm:text-lg max-w-md mx-auto font-medium leading-relaxed pt-2">
          We are preparing something special for you. Stay tuned for exciting recipes, video guides, and stories!
        </p>

        {/* Color Accent Indicator Pill */}
        <div className="inline-flex items-center gap-6 pt-2 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828]">
            <span className="w-2 h-2 rounded-full bg-[#D62828]" /> Fresh Recipes
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4A437]">
            <span className="w-2 h-2 rounded-full bg-[#D4A437]" /> Quality Secrets
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F5A3C]">
            <span className="w-2 h-2 rounded-full bg-[#1F5A3C]" /> Farm Stories
          </div>
        </div>

        {/* Back to Home CTA */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#D62828] hover:bg-red-700 text-white font-bold text-sm px-7 py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-md hover:shadow-xl active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
