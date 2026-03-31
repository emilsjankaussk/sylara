"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-[#E07A5F] text-white">
      <div className="container-narrow px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-heading mb-6 text-white">Join the SYLARA Community</h2>
        <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto">
          Subscribe to our newsletter and receive 10% off your first order, plus early access to new launches and exclusive skincare tips.
        </p>
        
        {subscribed ? (
          <div className="bg-white/10 p-6 rounded-sm backdrop-blur-sm inline-block mx-auto">
            <p className="flex items-center justify-center gap-2 text-lg font-medium">
              <Check size={24} /> You&apos;re on the list! Check your inbox for your 10% off code.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-transparent border border-white/50 px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:border-white rounded-sm transition-colors"
              required
            />
            <button 
              type="submit" 
              className="bg-white text-[#E07A5F] px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-[#FDFBF7] transition-colors flex justify-center items-center gap-2 rounded-sm"
            >
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
