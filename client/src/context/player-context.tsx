import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  MUSIC_PLAYER_PLAYLIST,
  SECRET_PLAYLIST_TRACK,
  type PlaylistTrack,
} from "@shared/app-config";

const PLAYER_STORAGE_KEY = "awoo-player-state-v1";

interface PersistedPlayerState {
  currentSongIndex: number;
  currentTime: number;
  isPlaying: boolean;
  volume: number;
}

interface PlayerContextValue {
  playlist: PlaylistTrack[];
  basePlaylistLength: number;
  currentSongIndex: number;
  currentSong: PlaylistTrack;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  playTrackAt: (index: number) => void;
  seekTo: (seconds: number) => void;
  secretUnlocked: boolean;
  secretTapCount: number;
  registerSecretTap: () => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);
const FALLBACK_TRACK: PlaylistTrack = {
  id: 0,
  serial: 0,
  title: "No track loaded",
  composer: "System",
  displayTitle: "No track loaded - System",
  url: "",
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const basePlaylistLength = MUSIC_PLAYER_PLAYLIST.length;
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretTapCount, setSecretTapCount] = useState(0);
  const playlist = useMemo(
    () =>
      secretUnlocked
        ? [...MUSIC_PLAYER_PLAYLIST, SECRET_PLAYLIST_TRACK]
        : MUSIC_PLAYER_PLAYLIST,
    [secretUnlocked],
  );
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pendingSeekTime, setPendingSeekTime] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = playlist[currentSongIndex] ?? playlist[0];

  useEffect(() => {
    if (!playlist.length) {
      return;
    }

    const raw = localStorage.getItem(PLAYER_STORAGE_KEY);
    if (!raw) {
      setCurrentSongIndex(0);
      setCurrentTime(0);
      setIsPlaying(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as PersistedPlayerState;
      const safeIndex =
        Number.isFinite(parsed.currentSongIndex) &&
        parsed.currentSongIndex >= 0 &&
        parsed.currentSongIndex < playlist.length
          ? parsed.currentSongIndex
          : 0;
      const safeTime = Number.isFinite(parsed.currentTime) && parsed.currentTime > 0 ? parsed.currentTime : 0;
      const safeVolume =
        Number.isFinite(parsed.volume) && parsed.volume >= 0 && parsed.volume <= 1
          ? parsed.volume
          : 0.5;
      setCurrentSongIndex(safeIndex);
      setCurrentTime(safeTime);
      setPendingSeekTime(safeTime);
      setVolume(safeVolume);
      setIsPlaying(parsed.isPlaying ?? true);
    } catch {
      setCurrentSongIndex(0);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  }, [playlist.length]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (!playlist.length) return;
    const payload: PersistedPlayerState = {
      currentSongIndex,
      currentTime,
      isPlaying,
      volume,
    };
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(payload));
  }, [currentSongIndex, currentTime, isPlaying, volume, playlist.length]);

  const next = () => {
    if (!playlist.length) return;
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
    setPendingSeekTime(0);
    setIsPlaying(true);
  };

  const prev = () => {
    if (!playlist.length) return;
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
    setPendingSeekTime(0);
    setIsPlaying(true);
  };

  const playTrackAt = (index: number) => {
    if (index < 0 || index >= playlist.length) return;
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setPendingSeekTime(0);
    setIsPlaying(true);
  };

  const seekTo = (seconds: number) => {
    if (!audioRef.current) return;
    const target = Math.max(0, seconds);
    audioRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const registerSecretTap = () => {
    if (secretUnlocked) {
      return;
    }
    setSecretTapCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setSecretUnlocked(true);
        return 5;
      }
      return next;
    });
  };

  const value = useMemo<PlayerContextValue>(
    () => ({
      playlist,
      basePlaylistLength,
      currentSongIndex,
      currentSong,
      isPlaying,
      volume,
      currentTime,
      duration,
      setVolume,
      togglePlay: () => setIsPlaying((prev) => !prev),
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      next,
      prev,
      playTrackAt,
      seekTo,
      secretUnlocked,
      secretTapCount,
      registerSecretTap,
    }),
    [
      playlist,
      basePlaylistLength,
      currentSongIndex,
      currentSong,
      isPlaying,
      volume,
      currentTime,
      duration,
      secretUnlocked,
      secretTapCount,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {currentSong ? (
        <audio
          ref={audioRef}
          src={currentSong.url}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration || 0);
            if (pendingSeekTime !== null && pendingSeekTime > 0) {
              event.currentTarget.currentTime = pendingSeekTime;
              setPendingSeekTime(null);
            }
          }}
          onEnded={next}
        />
      ) : null}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    // Prevent hard crashes during transient HMR/provider remounts.
    const currentSong = MUSIC_PLAYER_PLAYLIST[0] ?? FALLBACK_TRACK;
    return {
      playlist: MUSIC_PLAYER_PLAYLIST,
      basePlaylistLength: MUSIC_PLAYER_PLAYLIST.length,
      currentSongIndex: 0,
      currentSong,
      isPlaying: false,
      volume: 0.5,
      currentTime: 0,
      duration: 0,
      setVolume: () => {},
      togglePlay: () => {},
      play: () => {},
      pause: () => {},
      next: () => {},
      prev: () => {},
      playTrackAt: () => {},
      seekTo: () => {},
      secretUnlocked: false,
      secretTapCount: 0,
      registerSecretTap: () => {},
    };
  }
  return context;
}
