import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function Reports() {
  const dictionary = [
    { term: "I'm fine", meaning: "I am definitely not fine and you should know why." },
    { term: "Do whatever you want", meaning: "Do exactly what I want, not what you want." },
    { term: "Whatever", meaning: "I've run out of words to describe how wrong you are." },
    { term: "I'm sleepy", meaning: "Stay awake and talk to me for 3 more hours please." },
  ];

  return (
    <div className="min-h-screen p-8 bg-cream">
      <div className="container mx-auto max-w-4xl space-y-12">
        <section className="bg-white p-8 border-4 border-double border-dustyRose shadow-[8px_8px_0px_0px_rgba(220,174,150,0.5)]">
          <header className="border-b-2 border-sage pb-4 mb-6 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-display">Simp Progress Report</h1>
              <p className="font-mono text-xs opacity-50">Subject ID: Manshika | Report #001</p>
            </div>
            <div className="text-right font-mono text-[10px]">
              DATE: {new Date().toLocaleDateString()}
            </div>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-sage/10 p-4 border border-sage">
                <p className="text-xs font-bold uppercase text-sage mb-1">Status Summary</p>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between border-b border-sage/20 pb-1">
                    <span>Days since meeting:</span>
                    <span className="font-bold">30</span>
                  </div>
                  <div className="flex justify-between border-b border-sage/20 pb-1">
                    <span>Total "GM" Texts:</span>
                    <span className="font-bold">30/30 (Perfect Score)</span>
                  </div>
                  <div className="flex justify-between border-b border-sage/20 pb-1">
                    <span>Probability of simp:</span>
                    <span className="text-primary font-bold">100%</span>
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
                <span className="text-2xl font-bold">100%</span>
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

        <section className="bg-white p-8 border-4 border-double border-sage shadow-[8px_8px_0px_0px_rgba(156,175,136,0.5)]">
          <h2 className="text-2xl font-display mb-6 border-b-2 border-dustyRose pb-2">The Manshika-to-English Dictionary</h2>
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
