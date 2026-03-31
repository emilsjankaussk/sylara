"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  title: string;
  content: string;
}

interface ProductAccordionProps {
  items: AccordionItem[];
}

export default function ProductAccordion({ items }: ProductAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-[#2A2A2A]/10">
      {items.map((item, index) => (
        <div key={index} className="border-b border-[#2A2A2A]/10">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full py-6 flex items-center justify-between group transition-all"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] group-hover:text-[#E07A5F] transition-colors">{item.title}</span>
            {openIndex === index ? (
              <Minus size={16} strokeWidth={1.5} className="text-[#E07A5F]" />
            ) : (
              <Plus size={16} strokeWidth={1.5} className="text-[#2A2A2A]/40 group-hover:text-[#E07A5F]" />
            )}
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pb-8 text-sm leading-relaxed text-[#2A2A2A]/60 font-body">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
