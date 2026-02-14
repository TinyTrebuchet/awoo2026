import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, Volume2, Disc } from "lucide-react";
import { motion } from "framer-motion";
import { MUSIC_PLAYER_PLAYLIST } from "@shared/app-config";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist = MUSIC_PLAYER_PLAYLIST;

  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    if (currentSongIndex >= playlist.length) {
      setCurrentSongIndex(0);
    }
  }, [currentSongIndex, playlist.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSong]);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    // Keep the playlist flowing after each track ends.
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 w-64 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] p-1 shadow-xl font-sans text-xs">
      {/* Winamp Title Bar */}
      <div className="bg-[#000080] text-white px-2 py-1 mb-2 flex items-center justify-between">
        <span className="font-bold truncate">WINAMP - {currentSong.title}</span>
        <div className="flex gap-1">
          <button className="bg-[#c0c0c0] text-black w-3 h-3 flex items-center justify-center border border-t-white border-l-white border-r-[#808080] border-b-[#808080]">_</button>
          <button className="bg-[#c0c0c0] text-black w-3 h-3 flex items-center justify-center border border-t-white border-l-white border-r-[#808080] border-b-[#808080]">x</button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={currentSong.url} 
        onEnded={handleNext}
      />

      {/* Display */}
      <div className="bg-black text-[#00ff00] font-mono p-2 mb-2 border-2 border-inset border-[#808080] h-12 flex items-center justify-between overflow-hidden">
         <div className="whitespace-nowrap animate-marquee">
           {isPlaying ? `>>> PLAYING: ${currentSong.title} <<<` : "READY..."}
         </div>
         <motion.div 
           animate={{ rotate: isPlaying ? 360 : 0 }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         >
           <Disc className="w-5 h-5 ml-2" />
         </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1 active:translate-y-[1px]"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button 
          onClick={handleNext}
          className="p-1 active:translate-y-[1px]"
        >
          <SkipForward className="w-4 h-4" />
        </button>
        
        {/* Volume Slider */}
        <div className="flex items-center gap-1 flex-1 ml-2">
          <Volume2 className="w-3 h-3 text-gray-600" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-300 appearance-none border border-gray-500" 
          />
        </div>
      </div>
      
      <div className="mt-1 text-[10px] text-gray-600 text-center uppercase">
        Vibe Level: {volume > 0.8 ? "MAXIMUM" : volume > 0.4 ? "CHILL" : "QUIET"}
      </div>
    </div>
  );
}
