import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 45, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1
    }
  }
};

export default function TrustedQualityBanner({ className }: { className?: string }) {
  return (
    <div className={`w-full relative z-10 ${className ?? 'pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8'}`}>
      <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="w-full bg-[#F5F5F5] rounded-[20px] sm:rounded-[28px] shadow-xl border border-gray-200/80 overflow-hidden relative min-h-[190px] sm:min-h-[220px] lg:min-h-[350px] xl:min-h-[370px] flex flex-col lg:flex-row items-stretch"
        >
          {/* Card Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/TrustedQualityBanner/banner-bg.webp"
              alt="Banner Background"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Top Right Absolute: MEATiN Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.25, type: "spring", stiffness: 120, damping: 14 }}
            className="absolute top-3 right-4 sm:top-4 sm:right-5 lg:top-5 lg:right-6 z-50 w-20 sm:w-26 lg:w-30 xl:w-34 h-8 sm:h-11 lg:h-13 pointer-events-none"
          >
            <Image
              src="/meatin-logo.webp"
              alt="MEATiN Logo"
              fill
              className="object-contain object-right-top"
            />
          </motion.div>

          {/* Text Content Area: 100% width on screens <= 990px (below lg), 35%/32% on desktop (lg+) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="relative z-20 px-4 pt-4 pb-2 sm:px-7 md:px-8 lg:pl-10 xl:pl-12 py-4 sm:py-5 lg:py-7 flex flex-col justify-center w-full lg:w-[32%] space-y-1.5 sm:space-y-2.5 shrink-0"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-[25px] min-[400px]:text-[29px] sm:text-[34px] lg:text-[38px] xl:text-[44px] font-bold font-barlow-condensed leading-[1.05] tracking-tight pr-24 min-[450px]:pr-28 sm:pr-32 lg:pr-0"
            >
              <span className="text-[#064823] block">Trusted Quality</span>
              <span className="text-[#F7840F] block mt-0.5">Delivery Fresh.</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[11px] sm:text-xs lg:text-sm text-slate-700 font-medium tracking-tight leading-relaxed font-manrope w-full max-w-lg lg:max-w-[340px] pr-8 sm:pr-12 lg:pr-0"
            >
              Processed under certified food safety standards and maintained through a reliable cold chain for exceptional freshness and taste.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-0.5">
              <Link
                href="/know-your-meat"
                className="inline-flex items-center gap-1 px-3 sm:px-5 py-1 sm:py-1.5 bg-[#064823] hover:bg-[#0a5e30] text-white rounded-md font-bold text-[10px] sm:text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] group"
              >
                <span>Shop Now</span>
                <span className="text-[10px] sm:text-xs md:text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Graphics Area (2nd Partition): Wrapped below (100% width) on screens <= 990px (below lg), 68% on desktop */}
          <div className="relative z-20 w-full lg:w-[68%] flex-1 h-[130px] sm:h-[160px] lg:h-auto min-h-[130px] sm:min-h-[160px] lg:min-h-full flex flex-col justify-end overflow-hidden">
            
            {/* Kerala's Original Meat Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -30, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.9, delay: 0.35, type: "spring", stiffness: 110, damping: 13 }}
              className="absolute top-1 sm:top-2 lg:top-[8%] left-1/2 -translate-x-1/2 lg:left-[8%] lg:translate-x-0 z-30 w-[75px] sm:w-[100px] md:w-[120px] lg:w-[149px] xl:w-[171px] h-[32px] sm:h-[42px] md:h-[50px] lg:h-[64px] pointer-events-none"
            >
              <Image
                src="/TrustedQualityBanner/keralas-original-meat.webp"
                alt="Kerala's Original Meat Badge"
                fill
                className="object-contain object-center lg:object-left-top"
              />
            </motion.div>

            {/* Person Holding Chicken */}
            <motion.div
              initial={{ opacity: 0, y: 85, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute right-[2%] sm:right-[6%] md:right-[10%] lg:left-1/2 lg:-translate-x-1/2 bottom-0 z-10 w-[125px] sm:w-[165px] md:w-[195px] lg:w-[285px] xl:w-[320px] h-[85%] sm:h-[90%] lg:h-[95%] pointer-events-none"
            >
              <Image
                src="/TrustedQualityBanner/person-holding-packed-chicken.webp"
                alt="Person Holding Packed Chicken"
                fill
                className="object-contain object-bottom filter drop-shadow-2xl"
                priority
              />
            </motion.div>

          </div>

          {/* Full Width Bottom Wood Cover (z-20) */}
          <div className="absolute bottom-0 left-0 right-0 h-[16px] sm:h-[20px] md:h-[24px] lg:h-[30px] xl:h-[34px] z-20 pointer-events-none">
            <Image
              src="/TrustedQualityBanner/bottom-wood-block.webp"
              alt="Wood Counter Table"
              fill
              className="object-cover object-bottom"
            />
          </div>

          {/* Absolute Items Overlay (Packed Chicken, Chicken in Bowl, Knife) Sitting Directly ON Top of Wooden Bar (z-30) */}
          <div className="absolute bottom-0 right-0 w-full lg:w-[68%] z-30 flex items-end justify-between px-2 sm:px-5 lg:px-6 pb-1 sm:pb-1.5 lg:pb-2.5 pointer-events-none">
            
            {/* Left Group: Packed Chicken + Chicken in Bowl */}
            <div className="flex items-end gap-1 sm:gap-2.5">
              {/* Packed Chicken Products */}
              <motion.div
                initial={{ opacity: 0, y: 65, x: -35, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.0, delay: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                className="relative z-30 w-[140px] sm:w-[200px] md:w-[240px] lg:w-[340px] xl:w-[370px] aspect-[260/170]"
              >
                <Image
                  src="/TrustedQualityBanner/packed-chicken-products.webp"
                  alt="Packed Chicken Products"
                  fill
                  className="object-contain object-bottom filter drop-shadow-lg"
                  priority
                />
              </motion.div>

              {/* Chicken in Bowl */}
              <motion.div
                initial={{ opacity: 0, y: 55, scale: 0.5, rotate: 8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, delay: 0.6, type: "spring", stiffness: 120, damping: 14 }}
                className="relative z-40 w-[45px] sm:w-[68px] md:w-[82px] lg:w-[120px] xl:w-[130px] aspect-[140/90]"
              >
                <Image
                  src="/TrustedQualityBanner/chicken-in-bowl.webp"
                  alt="Fresh Raw Chicken in Bowl"
                  fill
                  className="object-contain object-bottom filter drop-shadow-md"
                />
              </motion.div>
            </div>

            {/* Right Group: Knife Image (Fixed desktop visibility and position) */}
            <motion.div
              initial={{ opacity: 0, y: 35, x: 25, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 110, damping: 14 }}
              className="relative z-40 w-[55px] sm:w-[75px] md:w-[90px] lg:w-[125px] xl:w-[145px] aspect-[180/70] mb-0.5 mr-1 sm:mr-2 lg:mr-3"
            >
              <Image
                src="/TrustedQualityBanner/knife-in-wooden.webp"
                alt="Kitchen Knife on Wooden Block"
                fill
                className="object-contain object-bottom filter drop-shadow-md"
              />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
