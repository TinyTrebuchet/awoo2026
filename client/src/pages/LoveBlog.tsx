import { motion } from "framer-motion";
import { RetroButton } from "@/components/RetroButton";
import { Heart, Sparkles, Flower2 } from "lucide-react";
import { useLocation } from "wouter";
import { LOVE_BLOG_CONTENT } from "@shared/app-config";

interface LoveBlogProps {
  onBack?: () => void;
}

export default function LoveBlog({ onBack }: LoveBlogProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-4xl mx-auto space-y-8 sm:space-y-12 pb-36 sm:pb-32">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-4 border-b-4 border-double border-dusty-rose pb-8"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <div className="hidden sm:flex h-px w-10 md:w-14 bg-dustyRose/60" />
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-100 border border-dustyRose/70 flex items-center justify-center shadow-sm"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500" />
          </motion.div>
          <h1 className="px-4 sm:px-6 py-2 sm:py-2.5 border border-dustyRose/60 bg-white/70 rounded-2xl text-2xl sm:text-4xl md:text-5xl text-primary font-display shadow-[4px_4px_0px_0px_rgba(220,174,150,0.35)]">
            My Secret Love Blog
          </h1>
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-100 border border-dustyRose/70 flex items-center justify-center shadow-sm"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500" />
          </motion.div>
          <div className="hidden sm:flex h-px w-10 md:w-14 bg-dustyRose/60" />
        </div>
        <p className="font-serif italic text-lg text-muted-foreground">
          "Confidential Files: Project Valentine"
        </p>
      </motion.header>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative bg-paper-white border-2 border-dustyRose/50 p-5 sm:p-8 md:p-10 rounded-lg shadow-[10px_10px_0px_0px_rgba(220,174,150,0.35)] overflow-hidden"
      >
        <div className="absolute top-4 right-4 text-pink-500 rotate-12 opacity-80">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-16 right-12 text-rose-400 -rotate-6 opacity-70">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div className="absolute -bottom-8 -right-8 h-36 w-36 bg-pink-200/40 rounded-full blur-2xl" />
        <div className="absolute -top-8 -left-8 h-32 w-32 bg-rose-200/35 rounded-full blur-2xl" />

        <div className="relative z-10">
          <p className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-3">
            {LOVE_BLOG_CONTENT.entryLabel}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 font-handwriting text-primary border-b border-dustyRose/50 pb-2">
            {LOVE_BLOG_CONTENT.heading}
          </h2>
          <div className="space-y-4 sm:space-y-5">
            {LOVE_BLOG_CONTENT.body
              .split(/\n{2,}/)
              .map((paragraph, idx) => (
                <p
                  key={`${paragraph.slice(0, 24)}-${idx}`}
                  className="font-handwriting text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-800"
                >
                  {paragraph}
                </p>
              ))}
            <p className="font-handwriting text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-800 pt-2">
              {LOVE_BLOG_CONTENT.signoffLine1}
              <br />
              {LOVE_BLOG_CONTENT.signoffLine2}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2.5 text-vintageBlack/80">
            <Flower2 className="w-5 h-5 rotate-6 opacity-80 shrink-0 text-sage" />
            <div className="inline-flex items-center gap-1.5 bg-white/90 border border-vintageBlack/40 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wide text-vintageBlack rounded-sm shadow-sm">
              <Heart className="w-3 h-3 text-dustyRose fill-dustyRose" />
              {LOVE_BLOG_CONTENT.sealText}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white/60 border border-dashed border-sage p-5 rounded-md"
      >
        <p className="text-sm font-mono text-center text-gray-600">
          {LOVE_BLOG_CONTENT.psText}
        </p>
      </motion.div>

      <div className="text-center pt-2">
        {onBack ? (
          <RetroButton onClick={onBack} variant="primary">
            Back to Reality
          </RetroButton>
        ) : (
          <RetroButton onClick={() => setLocation("/")} variant="primary">
            Back to Home
          </RetroButton>
        )}
        <p className="mt-4 text-xs font-mono text-gray-500">
          {LOVE_BLOG_CONTENT.hideHint}
        </p>
      </div>
    </div>
  );
}
