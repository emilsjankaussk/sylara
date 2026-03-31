import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles, Calendar, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function SubscriptionLanding() {
  const benefits = [
    {
      title: "15% Savings Forever",
      description: "Enjoy a permanent 15% discount on every subscription order. No exceptions.",
      icon: <Zap className="text-[#E07A5F]" size={24} />
    },
    {
      title: "Free EU Shipping",
      description: "Subscriptions always ship free, regardless of the order value. Every time.",
      icon: <Check className="text-[#8A9A86]" size={24} />
    },
    {
      title: "Total Flexibility",
      description: "Swap products, skip a month, or cancel anytime from your ritual dashboard.",
      icon: <Calendar className="text-[#E07A5F]" size={24} />
    },
    {
      title: "Priority Access",
      description: "Subscribers get first access to limited editions and new laboratory launches.",
      icon: <Sparkles className="text-[#E07A5F]" size={24} />
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <TrustBar />
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-white border-b border-[#2A2A2A]/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
            <span className="text-[25vw] font-heading font-bold uppercase">RITUAL</span>
        </div>
        <div className="container-normal px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#E07A5F] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">Consistency is Key</span>
            <h1 className="text-6xl md:text-8xl font-heading mb-8 leading-tight">The SYLARA Ritual <br/><span className="italic text-[#8A9A86]">Subscription.</span></h1>
            <p className="text-xl text-[#2A2A2A]/60 mb-12 leading-relaxed">Never run out of your daily essentials. Build your custom routine, save 15%, and let us handle the rest. Your skin will thank you.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/collections/all" className="inline-flex justify-center items-center gap-3 px-12 py-6 bg-[#2A2A2A] text-white uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-[#E07A5F] transition-all rounded-sm shadow-xl">
                    Build Your Ritual <ArrowRight size={16} />
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 container-normal px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 bg-white border border-[#2A2A2A]/5 rounded-sm hover:shadow-xl hover:shadow-[#2A2A2A]/5 transition-all duration-500">
              <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center mb-8">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-heading mb-4">{benefit.title}</h3>
              <p className="text-sm text-[#2A2A2A]/60 leading-relaxed font-body">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 bg-[#8A9A86] text-white overflow-hidden relative">
        <div className="container-normal px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 block">The Process</span>
              <h2 className="text-5xl font-heading mb-12 leading-tight">Simple. Transparent. <br/>Tailored to you.</h2>
              
              <div className="space-y-12">
                <div className="flex gap-6">
                  <span className="text-4xl font-heading italic text-white/30">01</span>
                  <div>
                    <h4 className="text-xl font-heading mb-2">Choose Your Essentials</h4>
                    <p className="text-white/70 text-sm leading-relaxed">Select "Subscribe & Save" on any product page. Build a routine that fits your unique skin needs.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="text-4xl font-heading italic text-white/30">02</span>
                  <div>
                    <h4 className="text-xl font-heading mb-2">Set Your Frequency</h4>
                    <p className="text-white/70 text-sm leading-relaxed">Most customers prefer delivery every 30 or 60 days. You're in control of the pace.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="text-4xl font-heading italic text-white/30">03</span>
                  <div>
                    <h4 className="text-xl font-heading mb-2">Glow on Autopilot</h4>
                    <p className="text-white/70 text-sm leading-relaxed">Receive your ritual right when you need it. Manage everything from your SYLARA account.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative aspect-square w-full max-w-lg rounded-sm overflow-hidden shadow-2xl">
              <Image src="/assets/images/gen2.webp" alt="Subscription Ritual" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Guarantee */}
      <section className="py-32 container-narrow px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-heading mb-6">Frequently Asked Questions</h2>
          <p className="text-[#2A2A2A]/50 max-w-xl mx-auto">Everything you need to know about the SYLARA subscription experience.</p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white p-8 border border-[#2A2A2A]/5 rounded-sm">
            <h4 className="text-lg font-heading mb-4 italic text-[#E07A5F]">Can I swap products in my subscription?</h4>
            <p className="text-sm text-[#2A2A2A]/60 leading-relaxed">Yes! You can swap any product in your upcoming delivery directly from your account dashboard up to 48 hours before shipment.</p>
          </div>
          <div className="bg-white p-8 border border-[#2A2A2A]/5 rounded-sm">
            <h4 className="text-lg font-heading mb-4 italic text-[#E07A5F]">Is there a minimum commitment?</h4>
            <p className="text-sm text-[#2A2A2A]/60 leading-relaxed">No. We want you to love your ritual. You can cancel your subscription at any time after your first delivery.</p>
          </div>
          <div className="bg-white p-8 border border-[#2A2A2A]/5 rounded-sm text-center">
            <ShieldCheck size={32} className="mx-auto text-[#8A9A86] mb-6" strokeWidth={1} />
            <h4 className="text-lg font-heading mb-4">Our Consistency Promise</h4>
            <p className="text-sm text-[#2A2A2A]/60 leading-relaxed max-w-md mx-auto">Skincare works best when used consistently. Our subscription is designed to remove the friction from your self-care journey.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
