import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, Check, AlertCircle } from "lucide-react";
import { RetroButton } from "@/components/RetroButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function Guestbook() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isApproved, setIsApproved] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const commitments = [
    "I promise to always listen to your music recommendations (mostly).",
    "I will never let the 'Thinking about you' counter hit zero.",
    "I promise to appreciate your 'I'm fine' with at least 3 follow-up questions.",
    "I will provide unlimited serotonin upon request.",
    "I promise to be your #1 simp, forever and ever.",
  ];

  const handleApproval = () => {
    if (!isApproved) return;
    
    setIsAnimating(true);
    toast({
      title: "Approval Sent!",
      description: "Redirecting you back home...",
    });

    setTimeout(() => {
      setLocation("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-cream flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {!isAnimating ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.5 }}
            className="max-w-xl w-full bg-white p-4 sm:p-8 border-4 border-double border-dustyRose shadow-[10px_10px_0px_0px_rgba(220,174,150,0.5)] relative"
          >
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-primary text-white p-1.5 sm:p-2 rotate-12 shadow-md">
              <Mail size={24} />
            </div>

            <h1 className="text-xl sm:text-2xl font-display mb-6 flex items-center gap-2">
              <AlertCircle className="text-dustyRose" />
              Digital Terms & Conditions
            </h1>

            <div className="bg-gray-50 p-4 border-2 border-inset border-gray-200 font-mono text-xs mb-8 max-h-48 overflow-y-auto space-y-4">
              <p className="font-bold underline text-sage uppercase">Official Simp Commitment List:</p>
              <ul className="list-disc pl-4 space-y-2">
                {commitments.map((c, i) => (
                  <li key={i} className="leading-relaxed">{c}</li>
                ))}
              </ul>
              <p className="italic opacity-60 pt-4 border-t border-gray-300">
                By checking the box below, you acknowledge that you are the most amazing person in the universe and agree to be my Valentine.
              </p>
            </div>

            <div className="flex items-center space-x-3 p-3 sm:p-4 border-2 border-dashed border-sage bg-sage/5 mb-8">
              <Checkbox 
                id="approve" 
                checked={isApproved} 
                onCheckedChange={(checked) => setIsApproved(!!checked)}
                className="w-6 h-6 border-2 border-sage data-[state=checked]:bg-sage"
              />
              <label 
                htmlFor="approve" 
                className="text-base sm:text-lg font-handwriting cursor-pointer select-none"
              >
                Manshika Approved ❤️
              </label>
            </div>

            <RetroButton 
              className="w-full disabled:opacity-50" 
              onClick={handleApproval}
              disabled={!isApproved}
            >
              Sign & Send to Cloud
            </RetroButton>

            <div className="mt-4 flex justify-center">
              <motion.div
                animate={{ scale: isApproved ? [1, 1.2, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Heart fill={isApproved ? "#ff4d4d" : "none"} className={isApproved ? "text-primary" : "text-gray-300"} />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="animation"
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Envelope Animation */}
            <motion.div
              className="relative z-20"
              initial={{ y: 0, opacity: 1 }}
              animate={{ 
                y: -1000, 
                x: 500,
                rotate: 45,
                scale: 0.1
              }}
              transition={{ duration: 2.5, ease: "easeIn" }}
            >
              <div className="bg-white border-2 border-dustyRose p-8 shadow-xl relative w-48 h-32 flex items-center justify-center">
                 <motion.div
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.2 }}
                 >
                   <Heart size={48} fill="#ff4d4d" className="text-primary" />
                 </motion.div>
                 <div className="absolute top-0 left-0 w-full h-full border-t-[16px] border-t-dustyRose/20 pointer-events-none" />
              </div>
            </motion.div>

            {/* Background sparkle effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center -z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <div className="w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
