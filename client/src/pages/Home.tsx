import { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw } from "lucide-react";
import { Polaroid } from "@/components/Polaroid";
import { RetroButton } from "@/components/RetroButton";
import {
  COMPLIMENTS,
  VALENTINE_ACCEPTED_SCENE,
} from "@shared/app-config";

const HOME_FEATURED_POLAROIDS = [
  {
    src: "/photos/me/WhatsApp%20Image%202026-02-14%20at%2016.23.38%20(2).jpeg",
    caption: "Me",
    rotation: -4,
    delay: 0,
  },
  {
    src: "/photos/you/WhatsApp%20Image%202026-02-14%20at%2017.05.37%20(2).jpeg",
    caption: "You",
    rotation: 4,
    delay: 0.1,
  },
] as const;

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
    <div className="min-h-screen relative overflow-x-hidden pb-36 sm:pb-32">
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
        <div
          className={`bg-white/80 backdrop-blur-sm p-5 sm:p-8 md:p-12 border-4 border-double border-dusty-rose shadow-[10px_10px_0px_0px_rgba(220,174,150,0.5)] text-center w-full ${
            valentineStatus === "accepted" ? "max-w-5xl" : "max-w-2xl"
          }`}
        >
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
                  Hi Manshika,<br />
                  <span className="text-primary text-xl md:text-3xl mt-4 block">will you be my Valentine? </span>
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
                        <span>grrr</span> <span className="text-base">&gt;:(</span> <span>grrr</span>
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
                        {isYesFuming ? "STOP CLICKING NO!" : "YES ABSOLUTELY!"}
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
                className="space-y-4 sm:space-y-5 relative rounded-md px-0.5 sm:px-1 py-2"
              >
                <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl text-primary animate-bounce text-center">
                  {VALENTINE_ACCEPTED_SCENE.headline.replace("❤️", "").trim()}
                </h2>

                <div className="relative z-10 grid md:grid-cols-[1.15fr_1fr] gap-4 md:gap-5 items-stretch text-left">
                  <div className="relative border border-dustyRose/50 bg-white/85 overflow-hidden min-h-[320px] md:min-h-[420px]">
                    <img
                      src="/heart.png"
                      alt="Heart"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 right-0 m-3 sm:m-4 p-3 sm:p-4 space-y-2 text-center md:text-left bg-white/78 rounded-md">
                      <p className="font-mono text-sm text-vintageBlack font-semibold">
                        {VALENTINE_ACCEPTED_SCENE.subline}
                      </p>
                      <p className="font-handwriting text-2xl md:text-3xl">
                        {VALENTINE_ACCEPTED_SCENE.promiseLine}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/80 border border-dustyRose/50 p-4 h-full flex flex-col">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-dustyRose mb-3">
                      Timeline: Month One
                    </p>
                    <div className="space-y-3 flex-1">
                      {VALENTINE_ACCEPTED_SCENE.timelineEvents.map((event, idx) => (
                        <motion.div
                          key={`${event.title}-${idx}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.15 }}
                          className="grid grid-cols-[16px_1fr] gap-2 items-start"
                        >
                          <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                          <div>
                            <p className="font-display text-sm text-vintageBlack">
                              {event.title}
                            </p>
                            <p className="font-mono text-[10px] text-gray-500">{event.date}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <p className="mt-4 font-mono text-[11px] text-sage">
                      {VALENTINE_ACCEPTED_SCENE.futureLine}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Modules */}
        <div className="grid md:grid-cols-2 items-start gap-8 sm:gap-12 mt-14 sm:mt-24 w-full max-w-5xl">
          
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
          <div className="relative py-2 sm:py-4 flex items-center justify-center">
            <div className="flex flex-nowrap items-center justify-center gap-3 sm:gap-5">
              {HOME_FEATURED_POLAROIDS.map((photo) => (
                <Polaroid
                  key={photo.src}
                  src={photo.src}
                  caption={photo.caption}
                  rotation={photo.rotation}
                  delay={photo.delay}
                  hoverScale={1.03}
                  className="w-32 sm:w-44 md:w-48"
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
