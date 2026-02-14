import { motion } from "framer-motion";
import { Heart, Music2, PlayCircle, Sparkles, Waves } from "lucide-react";
import { usePlayer } from "@/context/player-context";
import { RetroButton } from "@/components/RetroButton";

export default function Playlist() {
  const { playlist, currentSongIndex, isPlaying, playTrackAt } = usePlayer();

  return (
    <div className="min-h-screen p-4 sm:p-8 pb-36 sm:pb-32">
      <div className="container mx-auto max-w-4xl">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center mb-8 sm:mb-10 bg-white/75 border-4 border-double border-dustyRose px-4 sm:px-8 py-6 sm:py-8 shadow-[8px_8px_0px_0px_rgba(220,174,150,0.45)]"
        >
          <div className="absolute top-3 left-3 text-rose-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute top-3 right-3 text-pink-500">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-display text-vintageBlack">
            Our makeout playlist &lt;3
          </h1>
          <p className="mt-3 font-handwriting text-xl sm:text-2xl text-dustyRose">
            pick a song and let the butterflies do their thing
          </p>
        </motion.header>

        <div className="space-y-3">
          {playlist.map((track, idx) => {
            const isActive = idx === currentSongIndex;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`p-3 sm:p-4 border-2 ${
                  isActive
                    ? "border-dustyRose bg-dustyRose/15 shadow-[4px_4px_0px_0px_rgba(220,174,150,0.4)]"
                    : "border-sage/50 bg-white/80"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-sage/20 border border-sage flex items-center justify-center font-mono text-xs sm:text-sm">
                    {track.serial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-display text-vintageBlack truncate">
                      {track.title}
                    </p>
                    <p className="text-xs sm:text-sm font-mono text-gray-600 truncate">
                      {track.composer}
                    </p>
                  </div>
                  <RetroButton
                    onClick={() => playTrackAt(idx)}
                    className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs ${
                      isActive && isPlaying ? "bg-primary text-white border-dustyRose" : ""
                    }`}
                    aria-label={`Play ${track.displayTitle}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      <PlayCircle size={14} />
                      {isActive && isPlaying ? "Playing" : "Play"}
                    </span>
                  </RetroButton>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 sm:mt-8 p-4 sm:p-5 border-2 border-dashed border-sage bg-white/60 text-center"
        >
          <p className="inline-flex items-center gap-2 text-sm sm:text-base font-mono text-gray-700">
            <Music2 className="w-4 h-4" />
            More tracks coming soon...
            <Waves className="w-4 h-4" />
          </p>
        </motion.div>
      </div>
    </div>
  );
}
