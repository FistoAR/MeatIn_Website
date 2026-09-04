'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import CareersBanner from '@/components/layout/CareersBanner';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  email?: string;
  shiftImage?: boolean;
}

const ledByMembers: TeamMember[] = [
  {
    name: "Mr. SHIBU K.MOHAMED",
    role: "Chairman",
    image: "/MeetOurTeam/led-by-persons/Mr. SHIBU K.MOHAMED.webp",
  },
  {
    name: "Mr. RAFEEQUE ARAKKAKATTIL",
    role: "Chief Executive Officer",
    image: "/MeetOurTeam/led-by-persons/Mr. RAFEEQUE ARAKKAKATTIL.webp",
  },
  {
    name: "Mr. ALI VARIKUNNATH",
    role: "Managing Director",
    image: "/MeetOurTeam/led-by-persons/Mr. ALI VARIKUNNATH.webp",
  },
];

const directors: TeamMember[] = [
  {
    name: "Mohanan Pilankuvittil",
    role: "Project Consultant",
    image: "/MeetOurTeam/led-by-persons/Mohanan Pilankuvittil.webp",
  },
  {
    name: "Anfas K Mohamed",
    role: "Director & CMO",
    image: "/MeetOurTeam/led-by-persons/Anfas K Mohamed.webp",
  },
  {
    name: "Anas Kamaru",
    role: "Director & Plant Manager",
    image: "/MeetOurTeam/led-by-persons/Anas Kamaru.webp",
  },
  // Row 1 (5 cards)
  {
    name: "Mohamed Asharaf K",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Mohamed Asharaf K.webp",
    shiftImage: true,
  },
  {
    name: "Nazeer VM",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Nazeer VM.webp",
  },
  {
    name: "Jadeer Akthar M",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Jadeer Akthar M.webp",
  },
  {
    name: "Arshad Asharaf",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Arshad Asharaf.webp",
  },
  {
    name: "Rooshid Mohiyudheen C A",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Rooshid Mohiyudheen C A.webp",
  },
  // Row 2 (4 cards)
  {
    name: "Nasir Neriyar",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Nasir Neriyar.webp",
    shiftImage: true,
  },
  {
    name: "Moosakutty MM",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Moosakutty MM.webp",
  },
  {
    name: "Sabeer Abdul Rahman",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Sabeer Abdul Rahman.webp",
  },
  {
    name: "Abbas Chemban",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Abbas Chemban.webp",
  },
  // Row 3 (3 cards)
  {
    name: "Hydros Villan",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Hydros Villan.webp",
  },
  {
    name: "Rafi Abdu Rahman",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Rafi Abdu Rahman.webp",
  },
  {
    name: "Mohamed Gadhafi Pilakal",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Mohamed Gadhafi Pilakal.webp",
  },
];

export default function TeamPage() {
  return (
    <div className="w-full bg-[#FCFAF7] text-[#1E293B] overflow-x-clip font-manrope">

      {/* Hero Section */}
      <section className="relative w-full pt-[85px] sm:pt-[95px] lg:pt-[95px] bg-white flex items-center overflow-hidden">
        {/* Full Edge-to-Edge Hero Image Container */}
        <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[390px] flex items-center overflow-hidden">
          {/* Edge to Edge Image */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/MeetOurTeam/hero/meet-our-team-hero-image.webp"
              alt="MEATIN Boardroom"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Hero Content Overlay with Glassy Frosted Card */}
          <div className="relative z-10 w-full max-w-[1400px] lg:max-w-[88vw] mx-auto px-4 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-[340px] sm:max-w-[460px] lg:max-w-[500px] bg-white/70 backdrop-blur-md border border-white/70 rounded-3xl p-5 sm:p-8 shadow-xl"
            >
              <h2 className="text-[#1E3B2B] font-extrabold font-manrope tracking-widest text-[10px] sm:text-xs uppercase mb-1.5">
                OUR PEOPLE. OUR STRENGTH.
              </h2>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-barlow tracking-normal leading-none uppercase mb-3 text-left">
                <span className="text-[#127431] mr-2">MEET</span>
                <span className="text-[#D62828]">THE TEAM</span>
              </h1>

              <p className="text-slate-800 font-medium text-xs sm:text-sm lg:text-base leading-relaxed mb-4 max-w-md">
                The leadership team driving MEATIN's vision of delivering farm-fresh, hygienically processed meat with uncompromising quality and trust.
              </p>

              {/* Original Hero Leaf Underline SVG Asset */}
              <div className="relative w-full max-w-[280px] sm:max-w-[360px] h-6 mt-1">
                <Image
                  src="/MeetOurTeam/hero/hero-leaf-underline.svg"
                  alt="Leaf Underline"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Led By / Executive Leadership Section */}
      <section className="relative pt-10 lg:py-10 bg-[#FCFAF7] overflow-hidden">
        {/* Background Doodles */}
        {/* Top-Left: Growth chart doodle */}
        <div className="absolute top-[2%] left-[-5%] sm:left-[-2%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[230px] xl:h-[230px] 2xl:w-[260px] 2xl:h-[260px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/left-side-growth-image.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Mid-Left: Support hands holding people doodle */}
        <div className="absolute top-[65%] left-[-4%] sm:left-[8%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[230px] xl:h-[230px] 2xl:w-[270px] 2xl:h-[270px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/support-image-hand.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Mid-Right: Handshake right-side doodle */}
        <div className="absolute top-[60%] right-[-5%] sm:right-[-2%] w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[240px] xl:h-[240px] 2xl:w-[280px] 2xl:h-[280px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/right-shake-right-side.webp" alt="Doodle" fill className="object-contain" />
        </div>
        <div className="relative z-10 w-full max-w-[1400px] lg:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw]">

          {/* Centered LED BY Title with Gold Separator Lines */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-16"
          >
            <div className="flex items-center">
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-barlow text-[#60860E] tracking-relaxed uppercase px-4 sm:px-6">
              LED BY
            </h2>

            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
            </div>
          </motion.div>

          {/* Flexbox layout to cleanly wrap and center the rows */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-16 lg:gap-x-[3vw] xl:gap-x-[2.5vw] lg:gap-y-20 max-w-7xl xl:max-w-[1350px] 2xl:max-w-[1400px] mx-auto">
            {ledByMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                className="group relative flex flex-col items-center w-[270px] sm:w-[260px] md:w-[260px] lg:w-[260px] xl:w-[275px] 2xl:w-[285px] transition-transform duration-500 hover:scale-[1.03]"
              >
                {/* Photo container */}
                <div className="flex items-end relative w-full h-[220px] sm:h-[240px] md:h-[240px] lg:h-[210px] xl:h-[240px] 2xl:h-[250px] overflow-hidden">
                  {/* Left partition (approx 6%): Right-angled red triangle */}
                  <div className="left-0 bottom-0 w-0 h-0 border-b-[12px] border-b-[#D62828] border-l-[15px] border-l-transparent z-10" />

                  {/* Right partition: Portrait Image */}
                  <div className={`relative flex-1 right-0 bottom-0 h-full ${member.shiftImage ? "w-[calc(100%)]" : "w-full"}`}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="260px"
                    />
                  </div>
                </div>

                {/* Bright green box */}
                <div className="relative w-full h-[70px] sm:h-[70px] bg-[#60860E] text-white pl-[15px] pr-4 sm:pr-5 flex flex-col justify-center items-start">
                  <h3 className="text-sm min-[380px]:text-base sm:text-[1.1rem] lg:text-[1.05rem] xl:text-[1.1rem] 2xl:text-[1.2rem] font-bold text-white font-barlow tracking-relaxed leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-md font-semibold text-white/95 tracking-wider mt-1 flex items-center gap-1.5 font-manrope">
                    <span className="text-white/80">★</span> {member.role}
                  </p>
                  
                  {/* Floating blue LinkedIn icon */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-[#0077B5] hover:bg-[#005582] transition-colors flex items-center justify-center text-white shadow-md active:scale-90"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="relative py-20 lg:py-28 bg-[#FCFAF7] overflow-hidden border-t border-slate-100">

        {/* Background Doodles */}
        {/* Mid-Left: Together piece left side doodle */}
        <div className="absolute top-[35%] left-[-5%] sm:left-[-3%] w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[170px] lg:h-[170px] xl:w-[200px] xl:h-[200px] 2xl:w-[240px] 2xl:h-[240px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/together-piece-left-side.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Mid-Right: Together piece right side doodle */}
        <div className="absolute top-[40%] right-[-5%] sm:right-[-3.2%] w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[175px] lg:h-[175px] xl:w-[210px] xl:h-[210px] 2xl:w-[250px] 2xl:h-[250px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/together-piece-right-side.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Bottom-Left: Handshake left side doodle */}
        <div className="absolute bottom-[5%] left-[-5%] sm:left-[-2%] w-[105px] h-[105px] sm:w-[150px] sm:h-[150px] lg:w-[190px] lg:h-[190px] xl:w-[230px] xl:h-[230px] 2xl:w-[270px] 2xl:h-[270px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/handshake-left-side.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Bottom-Right: Growth image right side doodle */}
        <div className="absolute bottom-[5%] right-[-5%] sm:right-[-2%] w-[100px] h-[100px] sm:w-[145px] sm:h-[145px] lg:w-[180px] lg:h-[180px] xl:w-[220px] xl:h-[220px] 2xl:w-[260px] 2xl:h-[260px] z-0 opacity-40 sm:opacity-60 lg:opacity-100 select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/growth-image-right-side.webp" alt="Doodle" fill className="object-contain" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw]">

          {/* Centered DIRECTORS Title with Gold Separator Lines */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-16"
          >
            <div className="flex items-center">
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-barlow text-[#60860E] tracking-relaxed uppercase px-4 sm:px-6">
              DIRECTORS
            </h2>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
            </div>
          </motion.div>

          {/* Directors Grid — 5 per row on large desktop, 4 on laptop, wraps below */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-14 lg:gap-x-[2vw] xl:gap-x-[1.8vw] lg:gap-y-16 max-w-[1300px] xl:max-w-[1400px] 2xl:max-w-[1500px] mx-auto">
            {directors.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 5) * 0.08 }}
                className="group relative flex flex-col items-center w-[220px] sm:w-[220px] md:w-[220px] lg:w-[210px] xl:w-[220px] 2xl:w-[230px] transition-transform duration-500 hover:scale-[1.03]"
              >
                {/* Photo container */}
                <div className="flex items-end relative w-full h-[200px] sm:h-[210px] lg:h-[200px] xl:h-[210px] overflow-hidden">
                  {/* Left partition: Right-angled red triangle */}
                  <div className="left-0 bottom-0 w-0 h-0 border-b-[12px] border-b-[#D62828] border-l-[15px] border-l-transparent z-10" />
                  {/* Right partition: Portrait */}
                  <div className={`relative flex-1 right-0 bottom-0 h-full ${member.shiftImage ? "w-[calc(100%)]" : "w-full"}`}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain object-bottom"
                      sizes="230px"
                    />
                  </div>
                </div>

                {/* Green name block */}
                <div className="relative w-full h-[70px] sm:h-[70px] bg-[#60860E] text-white pl-[15px] pr-4 sm:pr-5 flex flex-col justify-center items-start">
                  <h3 className="text-sm sm:text-[0.95rem] xl:text-[1.05rem] font-bold text-white font-barlow tracking-wide leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-white/95 tracking-wider mt-1 flex items-center gap-1.5 font-manrope">
                    <span className="text-white/80">★</span> {member.role}
                  </p>
                  
                  {/* LinkedIn icon */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-[#0077B5] hover:bg-[#005582] transition-colors flex items-center justify-center text-white shadow-md active:scale-90"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET OUR TEAM BANNER SECTION */}
      <section className="relative z-10 pt-12 pb-24 sm:pt-16 sm:pb-32 lg:pb-36 bg-[#FCFAF7] overflow-hidden">
        {/* Background Side Doodles around the banner as seen in Reference Image 3 */}
        {/* Left Side Handshake Doodle */}
        <div className="absolute top-[8%] left-[0.5%] lg:left-[2%] xl:left-[3%] w-[120px] sm:w-[170px] lg:w-[220px] xl:w-[260px] aspect-square pointer-events-none select-none z-0 opacity-80">
          <Image
            src="/MeetOurTeam/doodles-bg/handshake-left-side.webp"
            alt="Handshake doodle left"
            fill
            className="object-contain"
          />
        </div>

        {/* Right Side Growth Arrow Doodle */}
        <div className="absolute top-[5%] right-[0.5%] lg:right-[2%] xl:right-[3%] w-[110px] sm:w-[160px] lg:w-[210px] xl:w-[250px] aspect-square pointer-events-none select-none z-0 opacity-80">
          <Image
            src="/MeetOurTeam/doodles-bg/growth-image-right-side.webp"
            alt="Growth doodle right"
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1280px] xl:max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full bg-[#FAFDF7] rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-200/80 overflow-hidden relative min-h-[340px] sm:min-h-[380px] md:min-h-[410px] lg:min-h-[430px] flex flex-col md:flex-row items-stretch"
          >
            {/* Background Texture & Soft Gradient Overlay */}
            <div className="absolute inset-0 z-0 bg-[#FAFDF7]">
              <Image
                src="/Home/section-bg.webp"
                alt="Background Pattern"
                fill
                className="object-cover object-center opacity-15"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAFDF7] via-[#FAFDF7]/90 to-transparent z-0 pointer-events-none" />
            </div>

            {/* Right Side Green Curved Graphic (right-side-bg.svg) */}
            <div className="absolute top-0 right-0 w-[60%] sm:w-[55%] md:w-[50%] lg:w-[48%] h-full z-0 pointer-events-none">
              <Image
                src="/MeetOurTeam/banner/right-side-bg.svg"
                alt="Green Background Graphic"
                fill
                className="object-cover object-right"
              />
            </div>

            {/* Left Side Column: Title, Stamps, Subtext & Dashed Arrow */}
            <div className="relative z-20 px-6 py-6 sm:px-8 md:px-10 lg:pl-12 lg:py-8 flex flex-col justify-between w-full md:w-[54%] lg:w-[52%] xl:w-[50%]">
              
              <div className="space-y-4">
                {/* Upper Row: Title Block on Left + Stamp & Food Sketches on Right */}
                <div className="flex flex-col min-[520px]:flex-row items-start justify-between gap-4 relative">
                  
                  {/* Left: MEET OUR TEAM title with Dashed Border Corner/Side Frame */}
                  <div className="relative pt-2 pl-3 sm:pl-4 border-l-2 border-dashed border-[#8DC541]">
                    {/* Top Dashed Line extending over title */}
                    <div className="absolute top-0 left-0 w-12 sm:w-16 h-0 border-t-2 border-dashed border-[#8DC541]" />
                    
                    <h2 className="text-[34px] min-[400px]:text-[42px] sm:text-[50px] lg:text-[56px] xl:text-[62px] font-black font-barlow-condensed leading-[0.92] tracking-tight uppercase">
                      <span className="text-[#8DC541] block">MEET</span>
                      <span className="text-[#153520] block">OUR TEAM</span>
                    </h2>
                  </div>

                  {/* Right: Food Meat Sketches + Good Food Happens Stamp Overlay */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-1">
                    {/* Food Meat Sketches Doodle */}
                    <div className="relative w-16 sm:w-20 lg:w-24 aspect-square">
                      <Image
                        src="/MeetOurTeam/banner/food-image.webp"
                        alt="Food Meat Sketches"
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Good Food Happens Stamp */}
                    <div className="relative w-28 sm:w-36 lg:w-40 xl:w-44 aspect-[180/70]">
                      <Image
                        src="/MeetOurTeam/banner/good-food-happens-text.webp"
                        alt="Good Food Happens"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                </div>

                {/* Subheading & Paragraph Description */}
                <div className="space-y-1 pt-1 max-w-[420px]">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold font-manrope text-[#153520] tracking-tight">
                    The People Behind Freshness
                  </h3>
                  <p className="text-xs sm:text-sm md:text-sm lg:text-base text-slate-600 font-medium font-manrope leading-relaxed">
                    Passionate professionals working together to bring quality and care to your table.
                  </p>
                </div>
              </div>

              {/* Vector Loop Arrow (Dashed Arrow below text pointing toward team) */}
              <div className="relative pt-3 sm:pt-4 pl-16 sm:pl-24 md:pl-28">
                <div className="relative w-24 sm:w-28 lg:w-32 aspect-[172/90]">
                  <Image
                    src="/MeetOurTeam/banner/leflt-side-vector-design.svg"
                    alt="Dashed Arrow Vector"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>

            </div>

            {/* Right Side Column: Team Members Image & Floating Green Badge Overlay */}
            <div className="relative z-20 w-full md:w-[50%] lg:w-[52%] xl:w-[54%] flex items-end justify-end min-h-[280px] sm:min-h-[320px] md:min-h-full pr-2 sm:pr-4 md:pr-6 lg:pr-8 pb-0">
              
              {/* Team Members Image */}
              <div className="relative w-full max-w-[700px] h-[270px] sm:h-[320px] md:h-[360px] lg:h-[390px] xl:h-[425px]">
                <Image
                  src="/MeetOurTeam/banner/persons-image.webp"
                  alt="MEATIN Team Members"
                  fill
                  className="object-contain object-bottom filter drop-shadow-xl"
                  priority
                />
              </div>

              {/* Floating Green Badge Overlay on Bottom Right Curve (Matching SVG badge positioning) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-30 bg-[#8DC541] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-white/40 flex items-center gap-2.5 sm:gap-3"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 flex items-center justify-center shrink-0 text-white bg-white/10">
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                    <path d="M12 8l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div className="font-manrope">
                  <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight tracking-wide">
                    One Team. One Purpose.
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-white/90 font-medium leading-tight">
                    Better Chicken. Better Lives.
                  </p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* Position Absolute Centered Bottom Doodle (without green background) */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-[11%] w-[280px] sm:w-[440px] md:w-[540px] lg:w-[660px] h-[100px] sm:h-[150px] md:h-[180px] lg:h-[220px] pointer-events-none select-none z-20">
          <Image
            src="/MeetOurTeam/doodles-bg/bottom-doodle.webp"
            alt="Bottom Doodle"
            fill
            className="object-contain object-bottom opacity-75"
          />
        </div>
      </section>

    </div>
  );
}
