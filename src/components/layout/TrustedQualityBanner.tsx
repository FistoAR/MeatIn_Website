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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full bg-white rounded-[24px] shadow-md border border-[#E5EAE1] overflow-hidden relative z-10"
        >
          {/* Top Right MEATIN Logo (Desktop >= 1024px) */}
          <div className="hidden lg:block absolute top-6 right-8 z-20 w-40 xl:w-44 h-20 xl:h-22 pointer-events-none">
            <Image
              src="/logo.webp"
              alt="MEATIN Logo"
              fill
              className="object-contain object-right-top"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-1 xl:pt-3">

            {/* Left Column: Text content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="px-6 py-6 sm:px-12 md:pl-16 md:pr-4 flex flex-col justify-center space-y-3 w-full lg:-mr-[55%] z-10"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-[40px] min-[500px]:text-[42px] sm:text-[44px] lg:text-[2rem] xl:text-[2.85rem] font-bold font-barlow-condensed leading-[1.15] tracking-tight"
              >
                <span className="text-[#153520] block min-[500px]:inline min-[1025px]:block">Trusted Quality </span>
                <span className="text-[#D62828] block min-[500px]:inline min-[1025px]:block">Delivery Fresh.</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-sm sm:text-md text-slate-700 xl:text-[1rem] font-semibold tracking-[-0.02em] leading-relaxed xl:leading-[1.5] max-w-[330px] sm:max-w-none min-[1025px]:max-w-[330px] xl:max-w-[40%] font-manrope"
              >
                Processed under certified food safety standards and maintained through a reliable cold chain for exceptional freshness and taste.
              </motion.p>

              <motion.div variants={fadeInUp} className="pt-2">
                <Link
                  href="/know-your-meat"
                  className="inline-flex items-center gap-3 px-4 py-2 bg-[#153520] hover:bg-[#1a4428] text-white rounded-lg font-bold text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] xl:mb-5"
                >
                  <span>Shop Now</span>
                  <span className="text-base">→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
              className="relative w-full aspect-[12/5] sm:aspect-[12/4.5] lg:aspect-auto lg:h-[320px] lg:self-end z-0"
            >
              {/* MEATIN Logo (Mobile / Tablet < 1024px anchored above products) */}
              <div className="lg:hidden absolute top-0 right-4 sm:top-2 sm:right-6 z-20 w-24 sm:w-32 h-12 sm:h-16 pointer-events-none">
                <Image
                  src="/logo.webp"
                  alt="MEATIN Logo"
                  fill
                  className="object-contain object-right-top"
                />
              </div>

              <Image
                src="/TrustedQualityBanner/trusted-quality-banner-img.webp"
                alt="Trusted Quality background and products"
                fill
                className="object-contain object-right-bottom"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
