import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Reports() {
  const dictionary = [
    { term: "Haa vo to hai", meaning: "I didn't pay attention to what you just said." },
    { term: "Yes yes I'm toh fine", meaning: "You better double check, I might infact NOT be fine." },
    { term: "Good onlyy", meaning: "I want to talk to you more <3" },
    { term: "Ab aisa krega", meaning: "Female in male dominated field. Ab to teri fielding set..." },
    { term: "Interesting", meaning: "Interesting indeed!" },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="container mx-auto max-w-4xl space-y-12">
        <section className="bg-white p-4 sm:p-8 border-4 border-double border-dustyRose shadow-[8px_8px_0px_0px_rgba(220,174,150,0.5)]">
          <header className="border-b-2 border-sage pb-4 mb-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between sm:items-end">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display">Simp Progress Report</h1>
              <p className="font-mono text-xs opacity-50">Subject ID: Manshika | Report #001</p>
            </div>
            <div className="sm:text-right font-mono text-[10px]">
              DATE: {new Date().toLocaleDateString()}
            </div>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-sage/10 p-4 border border-sage">
                <p className="text-xs font-bold uppercase text-sage mb-1">Status Summary</p>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between border-b border-sage/20 pb-1">
                    <span>Days since we first met:</span>
                    <span className="font-bold">57</span>
                  </div>
                  <div className="flex justify-between border-b border-sage/20 pb-1">
                    <span>Times called "cuteeu":</span>
                    <span className="font-bold">131 (Too less)</span>
                  </div>
                  <div className="flex justify-between border-b border-sage/20 pb-1">
                    <span>Probability of simp:</span>
                    <span className="text-primary font-bold">99.9%</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 border border-red-200">
                <p className="text-xs font-bold uppercase text-red-500 mb-1">System Error</p>
                <p className="font-mono text-xs text-red-700">
                  CRITICAL_FAILURE: Hours spent thinking about her exceeds maximum integer value [64-bit Overflow].
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-dustyRose">
              <div className="w-32 h-32 rounded-full border-8 border-dustyRose flex items-center justify-center relative">
                <span className="text-2xl font-bold">99.9%</span>
                <motion.div 
                  className="absolute inset-0 border-8 border-primary rounded-full border-t-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <p className="mt-4 font-display text-sm text-center">SIMPOMETER LEVEL: CRITICAL</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 sm:p-8 border-4 border-double border-sage shadow-[8px_8px_0px_0px_rgba(156,175,136,0.5)]">
          <h2 className="text-xl sm:text-2xl font-display mb-6 border-b-2 border-dustyRose pb-2">The Manshika-to-English Dictionary</h2>
          <div className="space-y-4">
            {dictionary.map((item) => (
              <div key={item.term} className="flex gap-4 items-start group">
                <div className="bg-dustyRose text-white font-mono text-xs px-2 py-1 rotate-[-2deg] shrink-0 group-hover:rotate-0 transition-transform">
                  "{item.term}"
                </div>
                <div className="font-handwriting text-xl text-vintageBlack border-b border-dotted border-gray-300 w-full pb-1">
                  {item.meaning}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-[10px] text-center opacity-40 italic">Note: Translations are subject to change based on mood and coffee intake.</p>
        </section>
      </div>
    </div>
  );
}
