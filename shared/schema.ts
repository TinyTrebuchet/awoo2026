import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const compliments = pgTable("compliments", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
});

export const songs = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
});

export const insertComplimentSchema = createInsertSchema(compliments).pick({
  text: true,
});

export const insertSongSchema = createInsertSchema(songs).pick({
  title: true,
  url: true,
});

export type Compliment = typeof compliments.$inferSelect;
export type InsertCompliment = z.infer<typeof insertComplimentSchema>;
export type Song = typeof songs.$inferSelect;
export type InsertSong = z.infer<typeof insertSongSchema>;
