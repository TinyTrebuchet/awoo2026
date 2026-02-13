import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, RefreshCw } from "lucide-react";
import { useCompliments } from "@/hooks/use-compliments";
import { Polaroid } from "@/components/Polaroid";
import { RetroButton } from "@/components/RetroButton";
import { MusicPlayer } from "@/components/MusicPlayer";
import LoveBlog from "@/pages/LoveBlog";

export default function Home() {
  const [showBlog, setShowBlog] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [valentineStatus, setValentineStatus] = useState<"pending" | "accepted">("pending");
  const [currentCompliment, setCurrentCompliment] = useState("Click the button for love!");
  
  const { data: compliments } = useCompliments();
  
  // Secret code listener
  useEffect(() => {
    let buffer = "";
    const handleKey = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();
      if (buffer.length > 20) buffer = buffer.slice(-20);
      
      if (buffer.endsWith("love") && !showBlog) {
        setShowBlog(true);
        buffer = "";
      }
      if (buffer.endsWith("loveyoutoo") && showBlog) {
        setShowBlog(false);
        buffer = "";
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showBlog]);

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoBtnPosition({ x, y });
  };

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
    if (compliments && compliments.length > 0) {
      const random = compliments[Math.floor(Math.random() * compliments.length)];
      setCurrentCompliment(random.text);
    } else {
      const fallbacks = [
        "Your smile is proof that magic exists.",
        "You're smarter than Google and prettier than Pinterest.",
        "If you were a vegetable, you'd be a cute-cumber.",
        "My life is better with you in it.",
      ];
      setCurrentCompliment(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    }
  }, [compliments]);

  if (showBlog) {
    return <LoveBlog onBack={() => setShowBlog(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-32 bg-cream">
      <div className="scanlines" />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[80vh] relative z-10">
        
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
        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 border-4 border-double border-dusty-rose shadow-[10px_10px_0px_0px_rgba(220,174,150,0.5)] text-center max-w-2xl w-full">
          <AnimatePresence mode="wait">
            {valentineStatus === "pending" ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="space-y-8"
              >
                <h1 className="text-3xl md:text-5xl leading-tight text-vintage-black">
                  Manshika,<br />
                  <span className="text-primary text-xl md:text-3xl mt-4 block">will you be my Valentine?</span>
                </h1>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12 h-32">
                  <RetroButton 
                    onClick={handleYesClick} 
                    className="text-lg px-8 py-4 bg-primary text-white hover:bg-primary/90"
                  >
                    YES ABSOLUTELY!
                  </RetroButton>
                  
                  <motion.div
                    animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onHoverStart={handleNoHover}
                  >
                    <RetroButton 
                      variant="secondary"
                      className="text-sm opacity-80"
                      title="Nice try!"
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
        <div className="grid md:grid-cols-2 gap-12 mt-24 w-full max-w-5xl">
          
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
          <div className="relative h-64 flex items-center justify-center">
             <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-300 bg-white/50 backdrop-blur-sm -z-10 rotate-1" />
             <div className="flex -space-x-12 hover:space-x-4 transition-all duration-500">
                {/* Unsplash placeholders with descriptive alt text */}
                <Polaroid 
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop" 
                  caption="Cute Cat" 
                  rotation={-5} 
                  delay={0}
                />
                <Polaroid 
                  src="https://pixabay.com/get/g945805de3fef1267b8c3be1a629addcc4f59747e39b5b5ea46cf1dcc30c3b7fa5e3632cbd9e2ecd35e70042ae85893a8aa3d3e96ad301143c6acc39b48e0415b_1280.jpg" 
                  caption="Our Vibe" 
                  rotation={3} 
                  delay={0.1} 
                />
                <Polaroid 
                  src="https://pixabay.com/get/g27378d8074a33604fb36d13b8646b2008c921e19b44004bef327bdcfab1657088864db19356c23db2cbc3a89be74925fded4684f5434e363630248c90ff43bce_1280.jpg" 
                  caption="Flowers 4 U" 
                  rotation={-2} 
                  delay={0.2} 
                />
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
