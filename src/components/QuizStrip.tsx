"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function QuizStrip() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      question: "What's your primary skin goal?",
      options: ["Hydration & Glow", "Clear & Balance", "Soothe & Repair", "Anti-Aging"],
    },
    {
      question: "How does your skin feel by midday?",
      options: ["Dry & Tight", "Oily & Shiny", "Normal", "Sensitive / Red"],
    },
    {
      question: "Which texture do you prefer?",
      options: ["Lightweight Gel", "Rich Cream", "Facial Oil", "Doesn't Matter"],
    }
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handleReset = () => setStep(0);

  return (
    <section className="bg-[#8A9A86] py-16 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
      <div className="container-normal px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            {step < steps.length ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-sm tracking-widest uppercase mb-4 block opacity-80">Find Your Routine • Step {step + 1} of 3</span>
                <h2 className="text-3xl md:text-5xl font-heading mb-10 text-white">{steps[step].question}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {steps[step].options.map((option) => (
                    <button
                      key={option}
                      onClick={handleNext}
                      className="py-4 px-6 border border-white/30 rounded-sm hover:bg-white hover:text-[#8A9A86] transition-colors text-sm font-medium tracking-wide"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white text-[#2A2A2A] p-8 md:p-12 rounded-sm shadow-xl"
              >
                <h2 className="text-3xl font-heading mb-4">Your Perfect Match: The Hydration Kit</h2>
                <p className="text-[#2A2A2A]/70 mb-8">Based on your answers, we recommend focusing on barrier repair and deep hydration with Hyaluronic Acid and Ceramides.</p>
                <div className="flex justify-center gap-4">
                  <button onClick={handleReset} className="px-6 py-3 border border-[#2A2A2A]/20 text-sm uppercase tracking-wider hover:bg-[#2A2A2A]/5">
                    Retake Quiz
                  </button>
                  <button className="px-8 py-3 bg-[#E07A5F] text-white text-sm uppercase tracking-wider hover:bg-[#c96a51] flex items-center gap-2">
                    Shop Your Routine <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
