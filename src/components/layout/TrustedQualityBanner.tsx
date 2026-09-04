import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 60, damping: 14 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export default function TrustedQualityBanner({ className }: { className?: string }) {
  return (
    <div className={`w-full relative z-10 ${className ?? 'pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8'}`}>
      <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full bg-[#F5F5F5] rounded-[20px] sm:rounded-[28px] shadow-xl border border-gray-200/80 overflow-hidden relative min-h-[280px] sm:min-h-[310px] md:min-h-[330px] lg:min-h-[350px] xl:min-h-[370px] flex flex-col md:flex-row items-stretch"
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

          {/* Left 30% Flex: Content Area */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="relative z-20 px-5 pt-6 pb-5 sm:px-7 md:px-8 lg:pl-10 xl:pl-12 py-5 sm:py-6 lg:py-7 flex flex-col justify-center w-full md:w-[35%] lg:w-[32%] space-y-2.5 sm:space-y-3 shrink-0"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-[26px] min-[400px]:text-[30px] sm:text-[34px] lg:text-[38px] xl:text-[44px] font-bold font-barlow-condensed leading-[1.05] tracking-tight"
            >
              <span className="text-[#122A1A] block">Trusted Quality</span>
              <span className="text-[#D62828] block mt-0.5">Delivery Fresh.</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[11px] sm:text-xs lg:text-sm text-slate-700 font-medium tracking-tight leading-relaxed font-manrope max-w-[340px]"
            >
              Processed under certified food safety standards and maintained through a reliable cold chain for exceptional freshness and taste.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-0.5">
              <Link
                href="/know-your-meat"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 bg-[#122A1A] hover:bg-[#1C422A] text-white rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] group"
              >
                <span>Shop Now</span>
                <span className="text-sm sm:text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right 70% Flex Area */}
          <div className="relative z-20 w-full md:w-[65%] lg:w-[68%] flex-1 min-h-[220px] sm:min-h-[260px] md:min-h-full flex flex-col justify-end overflow-hidden">
            
            {/* Top Right Absolute: MEATIN Logo */}
            <div className="absolute top-2.5 right-3 sm:top-4 sm:right-5 lg:top-5 lg:right-6 z-30 w-20 sm:w-26 lg:w-30 xl:w-34 h-8 sm:h-11 lg:h-13 pointer-events-none">
              <Image
                src="/meatin-logo.webp"
                alt="MEATIN Logo"
                fill
                className="object-contain object-right-top"
              />
            </div>

            {/* Top Left Absolute (~20% top/left): Kerala's Original Meat Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-[6%] sm:top-[8%] left-[3%] sm:left-[6%] lg:left-[8%] z-30 w-[100px] sm:w-[125px] md:w-[150px] lg:w-[175px] xl:w-[200px] h-[44px] sm:h-[52px] md:h-[63px] lg:h-[75px] pointer-events-none"
            >
              <Image
                src="/TrustedQualityBanner/keralas-original-meat.webp"
                alt="Kerala's Original Meat Badge"
                fill
                className="object-contain object-left-top"
              />
            </motion.div>

            {/* Person Holding Chicken (Centered in right flex split, z-10 behind bottom wood bar) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-[170px] sm:w-[220px] md:w-[250px] lg:w-[285px] xl:w-[320px] h-[85%] sm:h-[90%] lg:h-[95%] pointer-events-none"
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
          <div className="absolute bottom-0 left-0 right-0 h-[18px] sm:h-[22px] md:h-[26px] lg:h-[30px] xl:h-[34px] z-20 pointer-events-none">
            <Image
              src="/TrustedQualityBanner/bottom-wood-block.webp"
              alt="Wood Counter Table"
              fill
              className="object-cover object-bottom"
            />
          </div>

          {/* Absolute Items Overlay (Packed Chicken, Chicken in Bowl, Knife) Sitting Directly ON Top of Wooden Bar (z-30) */}
          <div className="absolute -bottom-1.5 right-0 w-full md:w-[65%] lg:w-[68%] z-30 flex items-end justify-between px-2 sm:px-4 lg:px-6 pb-[4px] sm:pb-[8px] md:pb-[10px] lg:pb-[12px] pointer-events-none">
            
            {/* Left Group: Packed Chicken + Chicken in Bowl */}
            <div className="flex items-end gap-1.5 sm:gap-3">
              {/* Packed Chicken Products */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-30 w-[180px] sm:w-[260px] md:w-[300px] lg:w-[340px] xl:w-[370px] aspect-[260/170]"
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
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative z-40 w-[60px] sm:w-[90px] md:w-[105px] lg:w-[120px] xl:w-[130px] aspect-[140/90]"
              >
                <Image
                  src="/TrustedQualityBanner/chicken-in-bowl.webp"
                  alt="Fresh Raw Chicken in Bowl"
                  fill
                  className="object-contain object-bottom filter drop-shadow-md"
                />
              </motion.div>
            </div>

            {/* Right Group: Knife Image */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative z-30 w-[60px] sm:w-[82px] md:w-[95px] lg:w-[105px] aspect-[180/70]"
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
