'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

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
  {
    name: "Mohamed Gadhafi Pilakal",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Mohamed Gadhafi Pilakal.webp",
  },
  {
    name: "Nasir Neriyar",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Nasir Neriyar.webp",
  },
  {
    name: "Nazeer VM",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Nazeer VM.webp",
  },
  {
    name: "Rafi Abdu Rahman",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Rafi Abdu Rahman.webp",
  },
  {
    name: "Rooshid Mohiyudheen C A",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Rooshid Mohiyudheen C A.webp",
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
  {
    name: "Arshad Asharaf",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Arshad Asharaf.webp",
  },
  {
    name: "Hydros Villan",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Hydros Villan.webp",
  },
  {
    name: "Jadeer Akthar M.",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Jadeer Akthar M.webp",
  },
  {
    name: "Mohamed Asharaf K.",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Mohamed Asharaf K.webp",
  },
  {
    name: "Moosakutty MM",
    role: "Director",
    image: "/MeetOurTeam/directors-persons/Moosakutty MM.webp",
  }
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
        <div className="absolute bottom-[5%] sm:bottom-[25%] left-[-4%] sm:left-[0%] w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] lg:w-[340px] lg:h-[340px] select-none pointer-events-none rotate-[15deg]">
          <Image src="/MeetOurTeam/doodles-bg/leaf-sparkle-doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        {/* Top-Right Lightbulb Doodle */}
        <div className="absolute top-[2%] sm:top-[8%] right-[-3%] sm:right-[-1%] w-[200px] h-[160px] sm:w-[240px] sm:h-[240px] lg:w-[340px] lg:h-[340px] select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/big_bult_light_growth_doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        <div className="w-full max-w-[1400px] lg:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw]">
          
          {/* Centered LED BY Title with Gold Separator Lines */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center">
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold font-barlow text-[#153520] tracking-wider uppercase px-4 sm:px-6">
              LED BY
            </h2>
            
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A437]" />
              <div className="h-[2px] w-12 sm:w-20 bg-[#D4A437]" />
            </div>
          </div>

          {/* Flexbox layout to cleanly wrap and center the rows */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-16 lg:gap-x-[3vw] xl:gap-x-[3.5vw] lg:gap-y-20 max-w-7xl mx-auto">
            {ledByMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                className="group relative flex flex-col items-center w-[250px] sm:w-[240px] md:w-[240px] lg:w-[220px] xl:w-[250px] 2xl:w-[260px]"
              >
                {/* Photo container */}
                <div className="relative w-full h-[220px] sm:h-[240px] md:h-[240px] lg:h-[210px] xl:h-[240px] 2xl:h-[250px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                    sizes="260px"
                  />
                  
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

                {/* Bright green box with top-left red accent cut */}
                <div className="relative w-full bg-[#7CB325] text-white p-4 pt-5 pb-5 flex flex-col items-start min-h-[85px]">
                  {/* Left edge top diagonal red flag accent */}
                  <div className="absolute left-0 top-0 -translate-y-full w-0 h-0 border-b-[12px] border-b-[#D62828] border-r-[20px] border-r-transparent" />
                  
                  <h3 className="text-[17px] font-bold text-white font-barlow tracking-wide uppercase leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-semibold text-white/90 uppercase tracking-wider mt-1.5 flex items-center gap-1 font-manrope">
                    <span className="text-white/80">★</span> {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Handshake callout banner */}
      <section className="py-16 bg-[#1F5A3C] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Handshake Doodle floating */}
        <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-28 h-28 opacity-[0.08] select-none pointer-events-none hidden md:block">
          <Image src="/MeetOurTeam/doodles-bg/handshake_doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        
        <div className="w-full max-w-[1400px] lg:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw] relative z-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <span className="text-[#D62828] uppercase font-bold tracking-widest text-xs font-manrope mb-4">
              COLLABORATION & INTEGRITY
            </span>
            <blockquote className="text-lg sm:text-xl lg:text-[1.5vw] font-manrope leading-relaxed text-white/95 max-w-2xl">
              "We leverage cutting-edge culinary technology and sustainable agricultural standards to promise the highest quality meat experience."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section className="relative py-20 lg:py-28 bg-white border-t border-slate-100">
        
        {/* Floating Doodles */}
        <div className="absolute top-1/3 right-[5%] w-24 h-24 opacity-[0.06] select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/bulb_light_growth_doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>
        <div className="absolute bottom-1/4 left-[5%] w-28 h-28 opacity-[0.05] select-none pointer-events-none">
          <Image src="/MeetOurTeam/doodles-bg/arrow-doodle.webp" alt="Doodle" fill className="object-contain" />
        </div>

        <div className="w-full max-w-[1400px] lg:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw]">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-manrope text-[#1F5A3C] tracking-wide uppercase">
              Board of Directors
            </h2>
            <div className="w-12 h-1 bg-[#D62828] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-[2vw]">
            {directors.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                className="group bg-white border border-slate-50 hover:border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center p-4 sm:p-5"
              >
                {/* Director Avatar Rounded Square */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="160px"
                  />
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-slate-800 font-manrope tracking-wide uppercase group-hover:text-[#D62828] transition-colors line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-[10px] font-bold text-[#1F5A3C] uppercase tracking-widest mt-1">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 lg:py-20 bg-[#1f5a3c]/5 border-t border-slate-100">
        <div className="w-full max-w-[1400px] lg:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw] text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-manrope text-[#1F5A3C] tracking-wide uppercase">
              Want to join our mission?
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              We are always on the lookout for food scientists, logistics experts, recipe builders, and individuals who care deeply about food safety and hygiene.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-block bg-[#D62828] hover:bg-red-700 text-white font-bold font-manrope text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-95 hover:shadow-lg"
              >
                Send Us Your Resume
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
