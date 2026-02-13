import { motion } from "framer-motion";

interface PolaroidProps {
  src: string;
  caption: string;
  rotation?: number;
  delay?: number;
}

export function Polaroid({ src, caption, rotation = 0, delay = 0 }: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 10, filter: "none" }}
      className="bg-white p-3 pb-8 shadow-lg w-48 inline-block transform transition-all duration-300 relative group"
      style={{ filter: "sepia(0.3) contrast(1.1) brightness(1.1)" }}
    >
      <div className="aspect-square bg-gray-200 overflow-hidden border border-gray-100 relative">
        <img 
          src={src} 
          alt={caption} 
          className="w-full h-full object-cover transition-all duration-700 blur-[2px] group-hover:blur-0" 
        />
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 pointer-events-none" />
      </div>
      <p 
        className="text-center font-handwriting text-xl mt-3 text-gray-800 rotate-[-1deg]"
        style={{ fontFamily: "'Caveat', cursive" }}
      >
        {caption}
      </p>
      
      {/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 rotate-2 backdrop-blur-[1px] shadow-sm z-20" />
    </motion.div>
  );
}
