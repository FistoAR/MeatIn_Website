'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

// Typing Animation Component for Section Titles
const TitleTyping: React.FC<{ text: string }> = ({ text }) => {
  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      transition={{ staggerChildren: 0.07 }}
      className="inline-block"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          transition={{ duration: 0.2 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Column 1 Staggered Variants
const firstContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const firstItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

// Container and item variants for staggered fade-in of text links (Smooth Medium Speed)
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.5,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const Footer: React.FC = () => {
  const [activeAutoIndex, setActiveAutoIndex] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const [isFooterInView, setIsFooterInView] = useState<boolean>(false);
  const hoverIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Total links count is 8 (4 Quick Links + 4 Explore)
  const totalItems = 8;

  useEffect(() => {
    if (isFooterInView && !isUserHovering) {
      // Force start at 0 (Home link) immediately when footer enters view
      setActiveAutoIndex(0);

      hoverIntervalRef.current = setInterval(() => {
        setActiveAutoIndex((prev) => (prev + 1) % totalItems);
      }, 1500);
    } else {
      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current);
      }
    }

    return () => {
      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current);
      }
    };
  }, [isFooterInView, isUserHovering]);

  // Helper to determine if an item should show the active scale/color highlight
  const getHighlightClass = (index: number) => {
    const isActive = activeAutoIndex === index && !isUserHovering;
    return isActive
      ? 'text-[#FFB300] scale-105 duration-300'
      : 'text-white/90 hover:text-[#FFB300] hover:scale-105 transition-all duration-300';
  };

  return (
    <motion.footer
      onViewportEnter={() => setIsFooterInView(true)}
      onViewportLeave={() => setIsFooterInView(false)}
      className="relative w-full bg-[#5A841A] text-white pt-6 sm:pt-10 pb-6 overflow-hidden font-inter"
    >
      
      {/* Doodle Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/Footer/doodle.webp"
          alt="Footer Background Pattern"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <Container className="relative z-10 max-w-full px-5 sm:px-6 lg:px-[1.5vw]">
        
        {/* Main Flex Container */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-0 pb-10 border-b border-white/20 w-full">
          
          {/* Column 1: Brand Info & Social Icons (Fades in one-by-one from left) */}
          <motion.div 
            variants={firstContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="w-full lg:w-[24%] space-y-8 shrink-0 lg:border-r lg:border-white/20 lg:pr-8 pb-6 lg:pb-0"
          >
            {/* Logo */}
            <motion.div variants={firstItemVariants} className="flex items-center">
              <Link
                href="/"
                className="inline-block hover:opacity-95 transition-opacity"
              >
                <Image
                  src="/logo.webp"
                  alt="MEATIN Logo"
                  width={150}
                  height={55}
                  className="w-36 h-auto object-contain shadow-sm"
                  priority
                />
              </Link>
            </motion.div>

            <motion.h4 variants={firstItemVariants} className="font-chau text-base sm:text-lg text-white tracking-wide uppercase">
              MEATIN FARMS AND FOODS LLP
            </motion.h4>

            <motion.div variants={firstItemVariants} className="space-y-4">
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
                Premium quality meat, ethically sourced and fresh cut for
                unforgettable culinary experiences.
              </p>

              {/* Social Icons with Circular Backgrounds */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-slate-200/90 hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src="/Footer/facebook.webp"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-slate-200/90 hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src="/Footer/instagram.webp"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </a>
                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-slate-200/90 hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src="/Footer/youtuble.webp"
                    alt="YouTube"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </a>
                <a
                  href="https://wa.me/919946616162"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-slate-200/90 hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src="/Footer/whatsapp.webp"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Links and Contact Wrapper (Tracks Hover State to pause auto-hover) */}
          <div 
            className="grid grid-cols-2 sm:flex sm:flex-row justify-between items-stretch gap-6 sm:gap-0 w-full lg:w-[62%]"
            onMouseEnter={() => setIsUserHovering(true)}
            onMouseLeave={() => setIsUserHovering(false)}
          >
            {/* Column 2: QUICK LINKS (Fades in from left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="w-full sm:w-[45%] lg:w-[24%] space-y-6 shrink-0 lg:border-r lg:border-white/20 lg:px-8 pb-6 lg:pb-0"
            >
              <div className="border-b-2 border-[#FFB300] pb-1 w-fit">
                <h3 className="font-chau text-base sm:text-lg text-white tracking-wide uppercase">
                  <TitleTyping text="QUICK LINKS" />
                </h3>
              </div>
              <motion.ul 
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="space-y-6 pt-1 text-sm sm:text-base font-medium"
              >
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/"
                    className={`flex items-center gap-2 sm:gap-3.5 origin-left ${getHighlightClass(0)}`}
                  >
                    <svg className="w-4 h-7 text-[#FFB300] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Home
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/about"
                    className={`flex items-center gap-2 sm:gap-3.5 origin-left ${getHighlightClass(1)}`}
                  >
                    <svg className="w-4 h-7 text-[#FFB300] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    About Us
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/know-your-meat"
                    className={`flex items-center gap-2 sm:gap-3.5 origin-left ${getHighlightClass(2)}`}
                  >
                    <svg className="w-4 h-7 text-[#FFB300] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Know Your Meat
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/contact"
                    className={`flex items-center gap-2 sm:gap-3.5 origin-left ${getHighlightClass(3)}`}
                  >
                    <svg className="w-4 h-7 text-[#FFB300] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Contact Us
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Column 3: EXPLORE (Fades in from left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
              className="w-full sm:w-[45%] lg:w-[32%] space-y-6 shrink-0 lg:border-r lg:border-white/20 lg:px-8 pb-6 lg:pb-0"
            >
              <div className="border-b-2 border-[#FFB300] pb-1 w-fit">
                <h3 className="font-chau text-base sm:text-lg text-white tracking-wide uppercase">
                  <TitleTyping text="EXPLORE" />
                </h3>
              </div>
              <motion.ul 
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="space-y-6 pt-1 text-sm sm:text-base font-medium"
              >
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/recipes"
                    className={`flex items-center gap-2 sm:gap-3.5 origin-left ${getHighlightClass(4)}`}
                  >
                    <svg className="w-4 h-7 text-[#FFB300] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Recipes
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/franchise"
                    className={`flex items-center gap-2 sm:gap-3.5 origin-left ${getHighlightClass(5)}`}
                  >
                    <svg className="w-4 h-7 text-[#FFB300] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Franchise
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/team"
                    className={`flex items-center gap-2 sm:gap-3.5 origin-left ${getHighlightClass(6)}`}
                  >
                    <svg className="w-4 h-7 text-[#FFB300] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Meet Our Team
                  </Link>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <Link
                    href="/vlog"
                    className={`flex items-center gap-2 sm:gap-3.5 origin-left ${getHighlightClass(7)}`}
                  >
                    <svg className="w-4 h-7 text-[#FFB300] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 20 17 13 9 6" />
                    </svg>
                    Vlog
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Column 4: CONTACT US (Fades in from right) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="col-span-2 sm:col-span-1 w-full sm:w-[50%] lg:w-[35%] space-y-6 shrink-0 lg:pl-8 pb-6 lg:pb-0"
            >
              <div className="border-b-2 border-[#FFB300] pb-1 w-fit">
                <h3 className="font-chau text-base sm:text-lg text-white tracking-wide uppercase">
                  <TitleTyping text="CONTACT US" />
                </h3>
              </div>
              <ul className="space-y-6 pt-1 text-sm sm:text-base font-medium text-white/90">
                <li className="flex items-start gap-3">
                  <Image
                    src="/Footer/location.webp"
                    alt="Location"
                    width={20}
                    height={20}
                    className="w-5 h-5 shrink-0 object-contain"
                  />
                  <span className="leading-snug">
                    15/809E, Panchami Complex, Perumpilavu, Karikkad P.O, Thrissur
                    - 680519, Kerala, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Image
                    src="/Footer/call.webp"
                    alt="Phone"
                    width={20}
                    height={20}
                    className="w-5 h-5 shrink-0 object-contain"
                  />
                  <a
                    href="tel:+919946616162"
                    className="hover:text-[#FFB300] transition-colors"
                  >
                    +91 9946616162
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Image
                    src="/Footer/mail.webp"
                    alt="Mail"
                    width={20}
                    height={20}
                    className="w-5 h-5 shrink-0 object-contain"
                  />
                  <a
                    href="mailto:info@meatinfoods.com"
                    className="hover:text-[#FFB300] transition-colors break-all"
                  >
                    info@meatinfoods.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Column 5: Truck Image (Fades in from right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            className="w-full lg:w-[18%] flex items-center justify-center lg:justify-end shrink-0 lg:self-center"
          >
            <Image
              src="/Footer/rightside.webp"
              alt="MEATIN Delivery Truck"
              width={600}
              height={500}
              className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </motion.div>
        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/90 font-medium w-full">
          <p className="text-center sm:text-left">
            @ 2025 MEATIN FARMS AND FOODS LLP. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#privacy"
              className="hover:text-[#FFB300] transition-colors"
            >
              Privacy Policy
            </a>
            <span className="opacity-50">|</span>
            <a href="#terms" className="hover:text-[#FFB300] transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>

      </Container>
    </motion.footer>
  );
};

export default Footer;
