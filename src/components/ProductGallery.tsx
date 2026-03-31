"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const getImagePath = (img: string) => {
  if (!img) return '/assets/images/placeholder.webp';
  const fileName = decodeURIComponent(img).split(/[??]/)[0].split('/').pop();
  if (!fileName) return '/assets/images/placeholder.webp';
  return `/assets/images/${fileName.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`;
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative aspect-[4/5] md:aspect-square flex-shrink-0 w-20 md:w-full border-2 transition-all rounded-sm overflow-hidden ${activeIndex === i ? 'border-[#E07A5F]' : 'border-transparent opacity-60'}`}
          >
            <Image src={getImagePath(img)} alt={`${name} thumb ${i}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-grow relative aspect-[4/5] bg-white rounded-sm overflow-hidden border border-[#2A2A2A]/5 group shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image 
              src={getImagePath(images[activeIndex])} 
              alt={name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
