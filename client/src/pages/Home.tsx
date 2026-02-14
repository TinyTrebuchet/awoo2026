import { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw } from "lucide-react";
import { Polaroid } from "@/components/Polaroid";
import { RetroButton } from "@/components/RetroButton";
import { COMPLIMENTS, HOME_POLAROID_PHOTOS } from "@shared/app-config";

export default function Home() {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [valentineStatus, setValentineStatus] = useState<"pending" | "accepted">("pending");
  const [currentCompliment, setCurrentCompliment] = useState("Click the button for love!");
  const noHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (noHoverTimeoutRef.current) {
        clearTimeout(noHoverTimeoutRef.current);
      }
    };
  }, []);

  const handleNoHover = () => {
    const isMobile = window.innerWidth < 640;
    const range = isMobile ? 80 : 200;
    const x = Math.random() * range - range / 2;
    const y = Math.random() * range - range / 2;
    setNoBtnPosition({ x, y });
  };

  const queueNoHover = () => {
    if (noHoverTimeoutRef.current) {
      clearTimeout(noHoverTimeoutRef.current);
    }
    // Small delay lets occasional clicks through before the button runs away.
    noHoverTimeoutRef.current = setTimeout(handleNoHover, 180);
  };

  const clearNoHoverQueue = () => {
    if (noHoverTimeoutRef.current) {
      clearTimeout(noHoverTimeoutRef.current);
      noHoverTimeoutRef.current = null;
    }
  };

  const handleNoClick = () => {
    setNoClickCount((prev) => prev + 1);
    handleNoHover();
  };

  const isYesFuming = noClickCount > 0 && noClickCount % 10 === 0;

  const handleYesClick = () => {
    setValentineStatus("accepted");
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const generateCompliment = useCallback(() => {
    setCurrentCompliment(COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-36 sm:pb-32 bg-cream">
      <div className="scanlines" />

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center justify-center min-h-[80vh] relative z-10">
        
        {/* Floating Hearts BG */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400"
              initial={{ y: "100vh", x: Math.random() * 100 + "vw", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 1, 0] }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                delay: Math.random() * 10 
              }}
            >
              <Heart size={Math.random() * 30 + 10} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm p-5 sm:p-8 md:p-12 border-4 border-double border-dusty-rose shadow-[10px_10px_0px_0px_rgba(220,174,150,0.5)] text-center max-w-2xl w-full">
          <AnimatePresence mode="wait">
            {valentineStatus === "pending" ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="space-y-8"
              >
                <h1 className="text-2xl sm:text-3xl md:text-5xl leading-tight text-vintage-black">
                  Manshika,<br />
                  <span className="text-primary text-xl md:text-3xl mt-4 block">will you be my Valentine?</span>
                </h1>
                
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-12 min-h-[8rem] sm:h-32 w-full">
                  <div className="relative w-full sm:w-auto">
                    {isYesFuming && (
                      <motion.div
                        aria-hidden
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-red-600 whitespace-nowrap"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: [0.4, 1, 0.4], y: [4, -2, 4] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        <span>fff</span> <span className="text-base">&gt;:(</span> <span>fff</span>
                      </motion.div>
                    )}
                    <motion.div
                      animate={isYesFuming ? { x: [0, -3, 3, -2, 2, 0] } : { x: 0 }}
                      transition={isYesFuming ? { duration: 0.45, repeat: Infinity } : { duration: 0.2 }}
                      className="w-full sm:w-auto"
                    >
                      <RetroButton
                        onClick={handleYesClick}
                        className={`w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 text-white ${
                          isYesFuming
                            ? "bg-red-500 hover:bg-red-600 border-red-700"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {isYesFuming ? "YES. STOP CLICKING NO." : "YES ABSOLUTELY!"}
                      </RetroButton>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onHoverStart={queueNoHover}
                    onHoverEnd={clearNoHoverQueue}
                    className="w-full sm:w-auto"
                  >
                    <RetroButton 
                      variant="secondary"
                      className="w-full sm:w-auto text-sm opacity-80"
                      title="Nice try!"
                      onClick={handleNoClick}
                    >
                      No (Impossible)
                    </RetroButton>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="accepted"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-6xl text-primary animate-bounce">YAY! ❤️</h2>
                <p className="font-handwriting text-3xl">Best decision you ever made.</p>
                <div className="flex justify-center gap-4 text-4xl">
                  <span>🎉</span><span>🍫</span><span>🌹</span>
                </div>
                <p className="text-sm font-mono text-gray-500 mt-8">
                  (Type "LOVE" on your keyboard for a secret surprise)
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Modules */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mt-14 sm:mt-24 w-full max-w-5xl">
          
          {/* Compliment Generator */}
          <div className="bg-paper-white p-6 border-2 border-sage border-dashed relative">
            <div className="absolute -top-3 left-4 bg-sage text-white px-2 py-1 text-xs font-display">
              SEROTONIN_DISPENSER.EXE
            </div>
            <div className="h-32 flex items-center justify-center text-center font-handwriting text-2xl p-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentCompliment}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  "{currentCompliment}"
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="text-center mt-4">
              <RetroButton onClick={generateCompliment} variant="secondary" className="w-full flex items-center justify-center gap-2">
                <RefreshCw size={16} /> New Compliment
              </RetroButton>
            </div>
          </div>

          {/* Polaroid Gallery */}
          <div className="relative min-h-[14rem] sm:h-64 flex items-center justify-center overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-300 bg-white/50 backdrop-blur-sm -z-10 rotate-1" />
             <div className="flex scale-90 sm:scale-100 -space-x-8 sm:-space-x-12 hover:space-x-2 sm:hover:space-x-4 transition-all duration-500">
                {HOME_POLAROID_PHOTOS.map((photo) => (
                  <Polaroid
                    key={photo.src}
                    src={photo.src}
                    caption={photo.caption}
                    rotation={photo.rotation}
                    delay={photo.delay}
                  />
                ))}
             </div>
          </div>

        </div>
      </main>

      <footer className="py-8 text-center font-mono text-xs text-gray-400">
        <p>Made with &lt;3 by your favorite nerd</p>
        <p className="mt-2 text-[10px] opacity-50">v1.0.4 | 100% Simp Certified</p>
      </footer>
    </div>
  );
}
