import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.compliments.list.path, async (_req, res) => {
    const compliments = await storage.getCompliments();
    res.json(compliments);
  });

  app.get(api.songs.list.path, async (_req, res) => {
    const songs = await storage.getSongs();
    res.json(songs);
  });

  await seedDatabase();

  return httpServer;
}

// Seed function
export async function seedDatabase() {
  const existingCompliments = await storage.getCompliments();
  if (existingCompliments.length === 0) {
    const seedCompliments = [
      "Your laugh is my favorite notification.",
      "10/10 even when sleepy.",
      "You have the best music taste.",
      "Smiling looks good on you.",
      "You make the world less boring.",
      "Professional overthinker (affectionate).",
      "CEO of being cute.",
    ];
    for (const text of seedCompliments) {
      await storage.createCompliment({ text });
    }
  }

  const existingSongs = await storage.getSongs();
  if (existingSongs.length === 0) {
    // Placeholder songs - in a real app these would be real MP3 links
    const seedSongs = [
      { title: "Fly Me To The Moon", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { title: "Lofi Beats to Simp To", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    ];
    for (const song of seedSongs) {
      await storage.createSong(song);
    }
  }
}
