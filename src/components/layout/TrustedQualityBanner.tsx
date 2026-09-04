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
          className="w-full bg-[#F5F5F5] rounded-[24px] sm:rounded-[32px] shadow-xl border border-gray-200/80 overflow-hidden relative min-h-[340px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[420px] xl:min-h-[450px] flex flex-col md:flex-row items-stretch"
        >
          {/* Background Image Texture */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/TrustedQualityBanner/banner-bg.webp"
              alt="Banner Background"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Bottom Wood Counter Table Block */}
          <div className="absolute bottom-0 left-0 right-0 h-[32px] sm:h-[40px] md:h-[48px] lg:h-[54px] xl:h-[60px] z-10 pointer-events-none">
            <Image
              src="/TrustedQualityBanner/bottom-wood-block.webp"
              alt="Wood Counter Table"
              fill
              className="object-cover object-bottom"
            />
          </div>

          {/* Top Right MEATIN Logo */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 w-28 sm:w-36 lg:w-40 xl:w-44 h-12 sm:h-16 lg:h-20 pointer-events-none">
            <Image
              src="/meatin-logo.webp"
              alt="MEATIN Logo"
              fill
              className="object-contain object-right-top"
            />
          </div>

          {/* Top Center Kerala's Original Meat Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-28 sm:w-36 md:w-44 lg:w-48 xl:w-52 h-10 sm:h-12 md:h-14 lg:h-16 pointer-events-none hidden sm:block"
          >
            <Image
              src="/TrustedQualityBanner/keralas-original-meat.webp"
              alt="Kerala's Original Meat Badge"
              fill
              className="object-contain object-center"
            />
          </motion.div>

          {/* Left Column: Heading, Paragraph & Shop Now Button */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="relative z-20 px-6 pt-8 pb-4 sm:px-10 md:px-12 lg:pl-14 xl:pl-16 lg:py-10 flex flex-col justify-center w-full md:w-[45%] lg:w-[40%] space-y-3.5 sm:space-y-4"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-[34px] min-[400px]:text-[38px] sm:text-[44px] lg:text-[44px] xl:text-[54px] 2xl:text-[60px] font-extrabold font-barlow-condensed leading-[1.05] tracking-tight"
            >
              <span className="text-[#122A1A] block">Trusted Quality</span>
              <span className="text-[#D62828] block mt-0.5">Delivery Fresh.</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base text-slate-700 font-medium tracking-tight leading-relaxed max-w-[420px] font-manrope"
            >
              Processed under certified food safety standards and maintained through a reliable cold chain for exceptional freshness and taste.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-1">
              <Link
                href="/know-your-meat"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 bg-[#122A1A] hover:bg-[#1C422A] text-white rounded-lg font-bold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] group"
              >
                <span>Shop Now</span>
                <span className="text-base sm:text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Area: Products & Person Composition */}
          <div className="relative z-20 w-full md:w-[55%] lg:w-[60%] flex-1 flex items-end justify-end pb-[26px] sm:pb-[34px] md:pb-[40px] lg:pb-[46px] xl:pb-[52px] pr-2 sm:pr-6 md:pr-8 lg:pr-10 xl:pr-14">
            
            {/* Product Composition Container */}
            <div className="relative w-full max-w-[700px] h-[220px] sm:h-[260px] md:h-[290px] lg:h-[320px] xl:h-[360px] flex items-end justify-end">
              
              {/* Packed Chicken Products */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-20 w-[42%] sm:w-[38%] md:w-[36%] lg:w-[37%] xl:w-[36%] h-[75%] sm:h-[78%] md:h-[82%] bottom-0 mr-[-5%]"
              >
                <Image
                  src="/TrustedQualityBanner/packed-chicken-products.webp"
                  alt="Packed Chicken Products"
                  fill
                  className="object-contain object-bottom filter drop-shadow-lg"
                  priority
                />
              </motion.div>

              {/* Chicken in Bowl (Placed on Wood Block in front of products) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-[-1px] left-[26%] sm:left-[28%] md:left-[28%] lg:left-[29%] xl:left-[30%] z-30 w-[20%] sm:w-[18%] md:w-[17%] aspect-[140/90] pointer-events-none"
              >
                <Image
                  src="/TrustedQualityBanner/chicken-in-bowl.webp"
                  alt="Fresh Raw Chicken in Bowl"
                  fill
                  className="object-contain object-bottom filter drop-shadow-md"
                />
              </motion.div>

              {/* Person Holding Packed Chicken */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-20 w-[52%] sm:w-[48%] md:w-[46%] lg:w-[47%] xl:w-[46%] h-[98%] sm:h-[100%] lg:h-[104%] bottom-0"
              >
                <Image
                  src="/TrustedQualityBanner/person-holding-packed-chicken.webp"
                  alt="Person Holding Packed Chicken"
                  fill
                  className="object-contain object-bottom filter drop-shadow-xl"
                  priority
                />
              </motion.div>

              {/* Knife on Wooden Board (Bottom Right corner) */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-[-1px] right-0 sm:right-2 md:right-4 z-30 w-[26%] sm:w-[24%] md:w-[22%] aspect-[180/70] pointer-events-none"
              >
                <Image
                  src="/TrustedQualityBanner/knife-in-wooden.webp"
                  alt="Kitchen Knife on Wooden Block"
                  fill
                  className="object-contain object-bottom filter drop-shadow-md"
                />
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
