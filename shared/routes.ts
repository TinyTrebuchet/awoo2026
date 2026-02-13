import { z } from 'zod';
import { insertComplimentSchema, insertSongSchema, compliments, songs } from './schema';

export const api = {
  compliments: {
    list: {
      method: 'GET' as const,
      path: '/api/compliments' as const,
      responses: {
        200: z.array(z.custom<typeof compliments.$inferSelect>()),
      },
    },
  },
  songs: {
    list: {
      method: 'GET' as const,
      path: '/api/songs' as const,
      responses: {
        200: z.array(z.custom<typeof songs.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
