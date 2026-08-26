import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TrustedQualityBanner() {
  return (
    <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-white rounded-[24px] shadow-md border border-[#E5EAE1] overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          
          {/* Left Column: Text content */}
          <div className="md:col-span-6 lg:col-span-5 px-6 py-6 sm:px-12 md:pl-16 md:pr-4 flex flex-col justify-center space-y-4">
            <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-black font-barlow-condensed leading-[1.05] tracking-tight">
              <span className="text-[#153520] block">Trusted Quality</span>
              <span className="text-[#D62828] block">Delivery Fresh.</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed max-w-[420px] font-manrope">
              Processed under certified food safety standards and maintained through a reliable cold chain for exceptional freshness and taste.
            </p>

            <div className="pt-2">
              <Link 
                href="/products" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#153520] hover:bg-[#1a4428] text-white rounded-lg font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                <span>Shop Now</span>
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Product Image (styled to blend and scale seamlessly) */}
          <div className="relative md:col-span-6 lg:col-span-7 w-full h-[210px] sm:h-[280px] md:h-[320px] lg:h-[350px]">
            <Image
              src="/TrustedQualityBanner/trusted-quality-banner-image.webp"
              alt="Trusted Quality background and products"
              fill
              className="object-cover object-right-bottom md:object-contain md:object-right-bottom"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </motion.div>
    </div>
  );
}
