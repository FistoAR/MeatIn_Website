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
  {
    name: "Mohanan Pilankuvittil",
    role: "Project Consultant",
    image: "/MeetOurTeam/led-by-persons/Mohanan Pilankuvittil.webp",
  }
];

const directors: TeamMember[] = [
  // Row 1 (5 cards)
  {
    name: "Mohamed Asharaf K",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Mohamed Asharaf K.webp",
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
    <div className="w-full bg-[#FCFAF7] text-[#1E293B] overflow-x-hidden font-manrope">
      
      {/* Hero Section */}
      <section className="relative w-full bg-white border-b border-slate-100 pt-[85px] sm:pt-[95px] lg:pt-[95px] overflow-hidden flex flex-col justify-center">
        <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-5 px-6 sm:px-12 lg:px-[4vw] py-6 lg:py-14 flex flex-col justify-center items-center text-center lg:items-start lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full flex flex-col items-center lg:items-start"
            >
              <h2 className="text-[#153520] font-black font-manrope tracking-widest text-xs sm:text-sm uppercase mb-2">
                OUR PEOPLE. OUR STRENGTH.
              </h2>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5vw] xl:text-[4.8vw] font-extrabold font-barlow tracking-relaxed leading-none uppercase mb-4 lg:whitespace-nowrap text-center lg:text-left">
                <span className="text-[#1F5A3C] mr-3">MEET</span>
                <span className="text-[#D62828]">THE TEAM</span>
              </h1>
              
              <p className="text-black font-medium text-sm sm:text-base lg:text-[1vw] xl:text-lg leading-relaxed max-w-lg mb-4">
                The leadership team driving MEATIN's vision of delivering farm-fresh, hygienically processed meat with uncompromising quality and trust.
              </p>
              
              {/* Custom Leaf Underline Asset */}
              <div className="relative w-full max-w-[350px] sm:max-w-[450px] h-6 flex justify-center lg:justify-start">
                <div className="relative w-full h-full">
                  <Image
                    src="/MeetOurTeam/hero/hero-leaf-underline.svg"
                    alt="Underline"
                    fill
                    className="object-contain object-center lg:object-left"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Image with Fade Effect */}
          <div className="lg:col-span-7 relative w-full h-[250px] sm:h-[350px] lg:h-auto lg:min-h-[38vh] overflow-hidden">
            <Image
              src="/MeetOurTeam/hero/meet-our-team-header-image.webp"
              alt="Boardroom"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Gradient Mask on the Left (for desktop overlay blend) */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent hidden lg:block" />
          </div>

        </div>
      </section>

      {/* Led By / Executive Leadership Section */}
      <section className="relative pt-10 lg:py-10 bg-[#FCFAF7] overflow-hidden">
        {/* Mockup Background Doodles */}
        {/* Top-Left Paper Airplane Doodle */}
        <div className="absolute top-[5%] sm:top-[8%] left-[-3%] sm:left-[-1%] w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] lg:w-[320px] lg:h-[320px] select-none pointer-events-none rotate-[5deg] opacity-[0.8]">
          <Image src="/MeetOurTeam/doodles-bg/arrow-doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Middle-Left Leaf Branch Doodle */}
        <div className="absolute bottom-[5%] sm:bottom-[8%] left-[-4%] sm:left-[0%] w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] lg:w-[340px] lg:h-[340px] select-none pointer-events-none rotate-[15deg]">
          <Image src="/MeetOurTeam/doodles-bg/leaf-sparkle-doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Top-Right Lightbulb Doodle */}
        <div className="absolute top-[2%] sm:top-[8%] right-[-3%] sm:right-[-1%] w-[200px] h-[160px] sm:w-[240px] sm:h-[240px] lg:w-[340px] lg:h-[340px] select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/big_bult_light_growth_doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Bottom-right: Arrow/cursor doodle */}
        <div className="absolute bottom-[8%] right-[-1%] w-[130px] h-[130px] sm:w-[180px] sm:h-[180px] lg:w-[240px] lg:h-[240px]  select-none pointer-events-none rotate-[-10deg]">
          <Image src="/MeetOurTeam/doodles-bg/arrow_right_doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        <div className="w-full max-w-[1400px] lg:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw]">
          
          {/* Centered LED BY Title with Gold Separator Lines */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center">
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold font-barlow text-[#153520] tracking-relaxed uppercase px-4 sm:px-6">
              LED BY
            </h2>
            
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
            </div>
          </div>

          {/* Flexbox layout to cleanly wrap and center the rows */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-16 lg:gap-x-[3vw] xl:gap-x-[2.5vw] lg:gap-y-20 max-w-7xl xl:max-w-[1350px] 2xl:max-w-[1400px] mx-auto">
            {ledByMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                className="group relative flex flex-col items-center w-[270px] sm:w-[260px] md:w-[260px] lg:w-[260px] xl:w-[275px] 2xl:w-[285px]"
              >
                {/* Photo container */}
                <div className="relative w-full h-[220px] sm:h-[240px] md:h-[240px] lg:h-[210px] xl:h-[240px] 2xl:h-[250px]">
                  {/* Left partition (approx 6%): Right-angled red triangle */}
                  <div className="absolute left-0 bottom-0 w-0 h-0 border-b-[12px] border-b-[#D62828] border-l-[15px] border-l-transparent z-10" />

                  {/* Right partition: Portrait Image */}
                  <div className="absolute right-0 bottom-0 w-[94%] h-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                      sizes="260px"
                    />
                  </div>
                  
                  {/* Floating blue LinkedIn icon */}
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-[#0077B5] hover:bg-[#005582] transition-colors flex items-center justify-center text-white shadow-md active:scale-90"
                  >
                    <Linkedin className="w-4 h-4 fill-white text-transparent" />
                  </a>
                </div>

                {/* Bright green box */}
                <div className="relative w-full bg-[#7CB325] text-white pl-[15px] pr-3 py-3 sm:pl-[15px] sm:pr-4 sm:py-4 flex flex-col items-start">
                  <h3 className="text-lg sm:text-xl xl:text-[1.4rem] 2xl:text-2xl font-bold text-white font-barlow tracking-relaxed leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-md font-semibold text-white/95 tracking-wider mt-1 flex items-center gap-1.5 font-manrope">
                    <span className="text-white/80">★</span> {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="relative py-20 lg:py-28 bg-[#FCFAF7] overflow-hidden border-t border-slate-100">
        
        {/* Background Doodles */}
        {/* Top-right: Big bulb/growth doodle */}
        <div className="absolute top-[0%] right-[-2%] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[260px] lg:h-[260px]  select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/handshake_doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Bottom-left: Leaf sparkle doodle */}
        <div className="absolute bottom-[5%] left-[0%] w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] lg:w-[290px] lg:h-[290px]  select-none pointer-events-none rotate-[15deg]">
          <Image src="/MeetOurTeam/doodles-bg/leaf-sparkle-doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Top-left: Paper airplane doodle */}
        <div className="absolute top-[8%] left-[-2%] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] lg:w-[260px] lg:h-[260px]  select-none pointer-events-none rotate-[5deg]">
          <Image src="/MeetOurTeam/doodles-bg/arrow-doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Left center: Bulb+growth chart doodle */}
        <div className="absolute top-[35%] left-[-1%] w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] lg:w-[320px] lg:h-[320px]  select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/bulb_light_growth_doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Right center: Handshake doodle */}
        <div className="absolute top-[30%] right-[-1%] w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] lg:w-[280px] lg:h-[280px]  select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/big_bult_light_growth_doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Bottom-right: Arrow/cursor doodle */}
        <div className="absolute bottom-[8%] right-[-1%] w-[130px] h-[130px] sm:w-[180px] sm:h-[180px] lg:w-[240px] lg:h-[240px]  select-none pointer-events-none rotate-[-10deg]">
          <Image src="/MeetOurTeam/doodles-bg/arrow_right_doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>

        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw]">

          {/* Centered DIRECTORS Title with Gold Separator Lines */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center">
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-barlow text-[#153520] tracking-relaxed uppercase px-4 sm:px-6">
              DIRECTORS
            </h2>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
            </div>
          </div>

          {/* Directors Grid — 5 per row on large desktop, 4 on laptop, wraps below */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-14 lg:gap-x-[2vw] xl:gap-x-[1.8vw] lg:gap-y-16 max-w-[1300px] xl:max-w-[1400px] 2xl:max-w-[1500px] mx-auto">
            {directors.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 5) * 0.08 }}
                className="group relative flex flex-col items-center w-[220px] sm:w-[220px] md:w-[220px] lg:w-[210px] xl:w-[220px] 2xl:w-[230px]"
              >
                {/* Photo container */}
                <div className="relative w-full h-[200px] sm:h-[210px] lg:h-[200px] xl:h-[210px]">
                  {/* Left partition: Right-angled red triangle */}
                  <div className="absolute left-0 bottom-0 w-0 h-0 border-b-[12px] border-b-[#D62828] border-l-[15px] border-l-transparent z-10" />
                  {/* Right partition: Portrait */}
                  <div className="absolute right-0 bottom-0 w-[94%] h-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                      sizes="230px"
                    />
                  </div>
                  {/* LinkedIn icon */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 w-7 h-7 rounded-full bg-[#0077B5] hover:bg-[#005582] transition-colors flex items-center justify-center text-white shadow-md active:scale-90"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-white text-transparent" />
                  </a>
                </div>

                {/* Green name block */}
                <div className="relative w-full bg-[#7CB325] text-white pl-[15px] pr-3 py-3 sm:pl-[15px] sm:pr-4 sm:py-3 flex flex-col items-start">
                  <h3 className="text-base sm:text-lg font-bold text-white font-barlow tracking-wide leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-white/95 tracking-wider mt-1 flex items-center gap-1.5 font-manrope">
                    <span className="text-white/80">★</span> {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reusable Careers Banner */}
      <CareersBanner />

    </div>
  );
}
