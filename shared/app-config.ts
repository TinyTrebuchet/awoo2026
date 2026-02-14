export const LOVE_UNLOCK_CONFIG = {
  unlockCode: "love",
  lockCode: "loveyoutoo",
  bufferMaxLength: 40,
} as const;

const LOCAL_MUSIC_FILES = [
  "1 - Dooron Dooron - Paresh Pahuja.mp3",
  "2 - Apocalypse - Cigarettes After Sex.mp3",
  "3 - Fly Me To The Moon - The Macarons Project.mp3",
  "4 - Just the Two of Us - Lucy Ellis.mp3",
  "5 - The Night We Met - Lord Huron.mp3",
  "6 - La Vie En Rose - Arron Rebustes.mp3",
  "7 - Dandelions (Waltz) - Lucy Ellis.mp3",
  "8 - Actually Romantic - Taylor Swift.mp3",
  "9 - All of Me - Before You Exit.mp3",
  "10 - We Fell In Love In October - Girl in Red.mp3",
] as const;
const SECRET_MUSIC_FILE = "<3 - We Fell in Love In October (Cover) - Gaurav.mp3";

const ME_PHOTO_FILES = [
  "WhatsApp Image 2026-02-14 at 16.23.36 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.36 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.36.jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.37 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.37 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.37.jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.38 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.38 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.38 (3).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.38.jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.39 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.39 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.39.jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.40 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.40 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 16.23.40.jpeg",
  "WhatsApp Image 2026-02-14 at 16.59.37.jpeg",
] as const;

const YOU_PHOTO_FILES = [
  "WhatsApp Image 2026-02-14 at 17.05.36 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.36 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.36.jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.37 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.37 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.37 (3).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.37.jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.38 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.38 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.38.jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.39 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.39 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.39 (3).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.40 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.40 (2).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.40 (3).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.40.jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.41 (1).jpeg",
  "WhatsApp Image 2026-02-14 at 17.05.41.jpeg",
  "WhatsApp Image 2026-02-14 at 17.06.28.jpeg",
  "WhatsApp Image 2026-02-14 at 17.08.34.jpeg",
] as const;

const mapGalleryPhotos = (folder: "me" | "you", files: readonly string[], prefix: string) =>
  files.map((fileName, idx) => ({
    src: `/photos/${folder}/${encodeURIComponent(fileName)}`,
    caption: `${prefix} ${String(idx + 1).padStart(2, "0")}`,
  }));

  export const COMPLIMENTS = [
    "You’re my favorite notification.",
    "Your smile is basically my daily serotonin boost.",
    "If you were a bug, I’d mark it as “won’t fix” because you’re perfect.",
    "Objection — your cuteness is leading the witness (me).",
    "You + me = chaotic & cute.",
    "No, I did not use ChatGPT to write this.",
    "Are you Wi‑Fi? Because I’m feeling a strong connection.",
    "I don’t need caffeine, I just need you to say \"wydd\".",
    "Hearing your voice solves my worst day in a second like magic.",
    "You’re the plot twist my heart was waiting for.",
    "You’re cute enough to make me forget what I was working on in office.",
    "You make “good on paper” feel overrated — you just feel right.",
  ] as const;

export const GALLERY_SECTIONS = [
  {
    id: "me",
    title: "Me",
    description: "Just a simp in his natural habitat.",
    photos: mapGalleryPhotos("me", ME_PHOTO_FILES, "Me Era"),
  },
  {
    id: "you",
    title: "You",
    description: "The reason for the simp's existence.",
    photos: mapGalleryPhotos("you", YOU_PHOTO_FILES, "You Glow"),
  },
  {
    id: "us",
    title: "Me & You",
    description: "The best combination since Ctrl+C and Ctrl+V.",
    photos: [],
  },
] as const;

export interface PlaylistTrack {
  id: number;
  serial: number;
  title: string;
  composer: string;
  displayTitle: string;
  url: string;
}

export const MUSIC_PLAYER_PLAYLIST: PlaylistTrack[] = [...LOCAL_MUSIC_FILES]
  .map((fileName) => {
    const parsed = fileName.match(/^(\d+)\s-\s(.+)\s-\s(.+)\.mp3$/i);
    if (!parsed) {
      return null;
    }
    const serial = Number(parsed[1]);
    const title = parsed[2].trim();
    const composer = parsed[3].trim();
    return {
      id: serial,
      serial,
      title,
      composer,
      displayTitle: `${title} - ${composer}`,
      url: `/music/${encodeURIComponent(fileName)}`,
    };
  })
  .filter((track): track is PlaylistTrack => track !== null)
  .sort((a, b) => a.serial - b.serial);

export const SECRET_PLAYLIST_TRACK: PlaylistTrack = {
  id: 1001,
  serial: 11,
  title: "We Fell in Love In October (Cover)",
  composer: "Gaurav",
  displayTitle: "We Fell in Love In October (Cover) - Gaurav",
  url: `/music/${encodeURIComponent(SECRET_MUSIC_FILE)}`,
};

export const LOVE_BLOG_CONTENT = {
  entryLabel: "Private Entry #001",
  heading: "My Dearest Cuteuu,",
  body:
    "Not a day goes by when I don't think of you, sometimes for hours on end. You look as beautiful as a soft, fragrant, stray pink tulip thriving in the wild. Your hair is so soft and silky, I could run my fingers through it all day. Your eyes are so beautiful, I could get lost in them for hours. Your voice is so sweet, I could listen forever. Your laugh is so cute, and your smile somehow fixes everything.\n\nTalking to you is the best part of my day. I love when you call to wake me up in the morning. It feels like waking up to a warm and pleasant hug after a cold winter night.\n\nI don't really believe in fate, but I do believe in luck, and I feel incredibly lucky to have stumbled upon you. You made me realize that it doesn't have to be good on paper to feel right in the heart. We feel so orthogonal at times, yet somehow our jigsaw pieces fit perfectly.\n\nI absolutely love your kindness, sincerity, and ambition - such simple words, yet surprisingly rare to find. I feel comfortable being fully myself around you, and I poured my heart into making this digital scrapbook for you because normal cards and texts felt way too small for everything I wanted to say.\n\nI could ramble forever about how much you mean to me, but I will save a little for the next entry. I hope we get to meet soon and do all the lovey-dovey couple things we keep planning.",
  signoffLine1: "Yours forever,",
  signoffLine2: "Simp #1",
  sealText: "Sealed with 100% love <3",
  psText:
    "PS: Miss you very much!",
  hideHint: '(Type "love you too" to hide this page from the navbar again)',
} as const;

export const VALENTINE_ACCEPTED_SCENE = {
  headline: "YAYYYYY ❤️",
  subline: "Valentine.exe installed successfully.",
  promiseLine: "Best decision you ever made baby, I promise!",
  backgroundPhoto:
    "/photos/me/WhatsApp%20Image%202026-02-14%20at%2016.23.36.jpeg",
  timelineEvents: [
    { title: "Met on Hinge", date: "Jan 12, 2026" },
    { title: "Exchanged numbers", date: "Jan 15, 2026" },
    { title: "Talked till 4 AM", date: "Jan 26, 2026" },
    { title: "First valentine's", date: "Feb 14, 2026" },
  ],
  futureLine: ">>> many more chapters loading...",
} as const;
