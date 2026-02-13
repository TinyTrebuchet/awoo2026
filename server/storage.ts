import { db } from "./db";
import {
  compliments,
  songs,
  type Compliment,
  type Song,
  type InsertCompliment,
  type InsertSong
} from "@shared/schema";

export interface IStorage {
  getCompliments(): Promise<Compliment[]>;
  createCompliment(compliment: InsertCompliment): Promise<Compliment>;
  getSongs(): Promise<Song[]>;
  createSong(song: InsertSong): Promise<Song>;
}

export class DatabaseStorage implements IStorage {
  async getCompliments(): Promise<Compliment[]> {
    return await db.select().from(compliments);
  }

  async createCompliment(insertCompliment: InsertCompliment): Promise<Compliment> {
    const [compliment] = await db.insert(compliments).values(insertCompliment).returning();
    return compliment;
  }

  async getSongs(): Promise<Song[]> {
    return await db.select().from(songs);
  }

  async createSong(insertSong: InsertSong): Promise<Song> {
    const [song] = await db.insert(songs).values(insertSong).returning();
    return song;
  }
}

export const storage = new DatabaseStorage();
