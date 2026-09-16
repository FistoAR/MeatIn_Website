'use client';

import React from 'react';

export default function VlogPage() {
  return (
    <div className="w-full bg-white font-inter relative flex flex-col justify-center overflow-hidden pt-24 sm:pt-28">
      {/* Full Width Video with Light Background */}
      <div className="w-full relative overflow-hidden bg-slate-100 min-h-[70vh] md:min-h-[85vh]">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/vlog/hero.jpg"
        >
          <source src="/vlog/vlog-video.mp4" type="video/mp4" />
          <source src="/vlog/vlog-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}




