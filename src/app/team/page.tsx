'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Shield, Award, Users, Thermometer } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  category: 'Leadership' | 'Culinary & Sourcing' | 'Science & Operations';
  bio: string;
  quote: string;
  image: string;
  linkedin: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Aarav Mehta",
    role: "Founder & CEO",
    category: "Leadership",
    bio: "A visionary entrepreneur with over 15 years of experience in agritech and food supply chains. Aarav founded MEATIn with a mission to bring world-class meat processing hygiene and ethical sourcing directly to households.",
    quote: "Trust begins with transparency. We want our patrons to know exactly where their food comes from.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=600",
    linkedin: "https://linkedin.com",
    email: "aarav@meatinfoods.com",
  },
  {
    name: "Chef Sarah Jenkins",
    role: "Chief Culinary Officer",
    category: "Culinary & Sourcing",
    bio: "An award-winning meat specialist and chef who trained at Michelin-starred establishments. Sarah curates all our marinades, checks cut specifications, and leads recipe development for MEATIn kitchen products.",
    quote: "Great cooking relies on great cuts. We treat meat as both a science and a high art form.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600",
    linkedin: "https://linkedin.com",
    email: "sarah@meatinfoods.com",
  },
  {
    name: "Dr. Rajesh Iyer",
    role: "Head of Food Science & QA",
    category: "Science & Operations",
    bio: "Holding a Ph.D. in Food Technology, Rajesh oversees our microbiological lab, cold-chain safety benchmarks, and scientific meat aging/processing controls to guarantee zero-contamination standards.",
    quote: "Our strict biological standards ensure every pack is as safe as it is succulent.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600&h=600",
    linkedin: "https://linkedin.com",
    email: "rajesh@meatinfoods.com",
  },
  {
    name: "Elena Rostova",
    role: "Director of Cold Chain Logistics",
    category: "Science & Operations",
    bio: "Elena manages our farm-to-table transit network. She designed the proprietary IoT real-time temperature tracking mechanism that ensures our meats never cross 4°C during distribution.",
    quote: "Precision in temperature is our baseline. Freshness is our absolute promise.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=600",
    linkedin: "https://linkedin.com",
    email: "elena@meatinfoods.com",
  },
  {
    name: "Marcus Vance",
    role: "Head of Ethical Farm Sourcing",
    category: "Culinary & Sourcing",
    bio: "Marcus spends 80% of his time visiting certified partner farms. He ensures that animals are reared humanely, fed 100% organic feed, and raised completely free from growth hormones.",
    quote: "Healthy, happy livestock translates to healthier, superior flavor profiles on your plate.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=600",
    linkedin: "https://linkedin.com",
    email: "marcus@meatinfoods.com",
  },
  {
    name: "Priya Sharma",
    role: "VP of Customer Advocacy",
    category: "Leadership",
    bio: "Priya leads our customer experience division. She ensures that every feedback point is channeled directly back into production and that MEATIn remains a customer-first brand.",
    quote: "We don't just deliver fresh food; we cultivate relationships built on absolute reliability.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=600&h=600",
    linkedin: "https://linkedin.com",
    email: "priya@meatinfoods.com",
  }
];

const coreValues = [
  {
    icon: <Shield className="w-8 h-8 text-[#D62828]" />,
    title: "Uncompromised Hygiene",
    desc: "Every cut is processed in clean rooms adhering to international food-safety and sterilization protocols."
  },
  {
    icon: <Award className="w-8 h-8 text-[#1F5A3C]" />,
    title: "Ethical Sourcing",
    desc: "We exclusively partner with free-range, antibiotic-free farms that raise livestock humanely and sustainably."
  },
  {
    icon: <Thermometer className="w-8 h-8 text-[#D62828]" />,
    title: "Controlled Cold Chain",
    desc: "Our active temperature monitoring system keeps all cuts pristine from processing right to your doorstep."
  },
  {
    icon: <Users className="w-8 h-8 text-[#1F5A3C]" />,
    title: "Customer Centricity",
    desc: "A responsive team listening to your cravings, customizing cuts, and guaranteeing complete satisfaction."
  }
];

export default function TeamPage() {
  return (
    <div className="w-full bg-[#fcfcfc] text-slate-900 overflow-x-hidden font-manrope">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#1f5a3c]/5 overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[#1F5A3C]/5 blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-[#D62828]/5 blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />

        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[4.5vw] font-extrabold font-chau tracking-tight leading-tight uppercase text-[#1F5A3C] mb-6">
              Meet The <span className="text-[#D62828]">Experts</span> Behind MEATIn
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-[1.1vw] text-slate-600 leading-relaxed font-medium">
              We are a dedicated team of food scientists, culinary professionals, logistics innovators, and sustainable farmers working together to deliver premium, clean, and delicious meat to your home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Philosophy Section */}
      <section className="py-16 lg:py-24 border-y border-slate-100 bg-white">
        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw]">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold font-chau text-slate-800 tracking-wide uppercase">
              Our Core Guiding Principles
            </h2>
            <div className="w-16 h-1 bg-[#D62828] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[1.5vw]">
            {coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 lg:p-[1.8vw] rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="p-3 bg-slate-50 rounded-xl mb-4">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 font-inter">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders & Leadership Quote Callout */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1F5A3C] to-[#123624] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="w-full max-w-[1400px] lg:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw] relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#D62828] uppercase font-bold tracking-wider text-xs sm:text-sm font-inter">
              Our Philosophy
            </span>
            <blockquote className="mt-6 text-xl sm:text-2xl lg:text-[2.2vw] font-chau leading-snug text-white/95">
              "We believe that clean, nutrient-rich and ethical meat shouldn't be a luxury. Through scientific rigor, direct partner sourcing, and strict temperature control, we are raising the standards of meat delivery, one meal at a time."
            </blockquote>
            <div className="mt-8">
              <p className="font-bold text-lg font-inter text-white">Dr. Aarav Mehta</p>
              <p className="text-[#D62828] text-sm font-medium">Founder & CEO, MEATIn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 lg:py-32">
        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw]">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-chau text-slate-800 tracking-wide uppercase">
              Meet the Visionaries
            </h2>
            <p className="text-slate-500 mt-2 max-w-lg mx-auto text-sm sm:text-base">
              The experts pioneering cold chain logistics, gastronomy, and veterinary science.
            </p>
            <div className="w-16 h-1 bg-[#D62828] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[2.5vw]">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
                className="group relative bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Member Image & Overlay */}
                <div className="relative aspect-square w-full bg-slate-200 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-extrabold tracking-wider px-3 py-1.5 rounded-full uppercase shadow-sm">
                    {member.category}
                  </span>

                  {/* Glassmorphism Quote Overlay */}
                  <div className="absolute inset-0 bg-[#1F5A3C]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6 text-center text-white backdrop-blur-xs">
                    <p className="italic text-sm sm:text-base font-medium mb-4 leading-relaxed">
                      "{member.quote}"
                    </p>
                    <div className="flex justify-center gap-4 mt-2">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 hover:bg-[#D62828] text-white transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={`mailto:${member.email}`} className="p-2 rounded-full bg-white/20 hover:bg-[#D62828] text-white transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Member Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800 font-chau tracking-wide uppercase transition-colors group-hover:text-[#D62828]">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#1F5A3C] uppercase tracking-widest mt-1">
                      {member.role}
                    </p>
                    <p className="text-sm text-slate-500 mt-4 leading-relaxed font-medium">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Join Us Section */}
      <section className="py-16 lg:py-24 bg-[#1f5a3c]/5 border-t border-slate-100">
        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-[1.5vw] text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-chau text-slate-800 tracking-wide uppercase">
              Want to join our mission?
            </h2>
            <p className="text-slate-600 mt-4 text-base leading-relaxed">
              We are always on the lookout for food scientists, logistics experts, recipe builders, and individuals who care deeply about food safety and hygiene.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-block bg-[#D62828] hover:bg-red-700 text-white font-bold font-inter text-sm px-8 py-4 rounded-2xl uppercase tracking-wider transition-all shadow-md active:scale-95 hover:shadow-lg"
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
