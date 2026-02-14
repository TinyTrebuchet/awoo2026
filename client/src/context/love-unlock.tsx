import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LOVE_UNLOCK_CONFIG } from "@shared/app-config";

interface LoveUnlockContextValue {
  loveUnlocked: boolean;
}

const LoveUnlockContext = createContext<LoveUnlockContextValue | undefined>(undefined);

interface LoveUnlockProviderProps {
  children: ReactNode;
}

export function LoveUnlockProvider({ children }: LoveUnlockProviderProps) {
  const [loveUnlocked, setLoveUnlocked] = useState(false);

  useEffect(() => {
    let buffer = "";

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.length !== 1) {
        return;
      }

      buffer += event.key.toLowerCase();
      if (buffer.length > LOVE_UNLOCK_CONFIG.bufferMaxLength) {
        buffer = buffer.slice(-LOVE_UNLOCK_CONFIG.bufferMaxLength);
      }

      const normalizedBuffer = buffer.replace(/\s+/g, "");

      if (normalizedBuffer.endsWith(LOVE_UNLOCK_CONFIG.lockCode)) {
        setLoveUnlocked(false);
        buffer = "";
      } else if (normalizedBuffer.endsWith(LOVE_UNLOCK_CONFIG.unlockCode)) {
        setLoveUnlocked(true);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const value = useMemo(() => ({ loveUnlocked }), [loveUnlocked]);

  return <LoveUnlockContext.Provider value={value}>{children}</LoveUnlockContext.Provider>;
}

export function useLoveUnlock() {
  const context = useContext(LoveUnlockContext);
  if (!context) {
    throw new Error("useLoveUnlock must be used within LoveUnlockProvider");
  }
  return context;
}
