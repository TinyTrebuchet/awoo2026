export const LOVE_UNLOCK_CONFIG = {
  unlockCode: "love",
  lockCode: "loveyoutoo",
  bufferMaxLength: 40,
} as const;

export const COMPLIMENTS = [
  "Your laugh is my favorite notifin.",
  "10/10 even when sleepy.",
  "You have the best music taste.",
  "Smiling looks good on you.",
  "You make the world less boring.",
  "Professional overthinker (affectionate).",
  "CEO of being cute.",
] as const;

export const HOME_POLAROID_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop",
    caption: "Cute Cat",
    rotation: -5,
    delay: 0,
  },
  {
    src: "https://pixabay.com/get/g945805de3fef1267b8c3be1a629addcc4f59747e39b5b5ea46cf1dcc30c3b7fa5e3632cbd9e2ecd35e70042ae85893a8aa3d3e96ad301143c6acc39b48e0415b_1280.jpg",
    caption: "Our Vibe",
    rotation: 3,
    delay: 0.1,
  },
  {
    src: "https://pixabay.com/get/g27378d8074a33604fb36d13b8646b2008c921e19b44004bef327bdcfab1657088864db19356c23db2cbc3a89be74925fded4684f5434e363630248c90ff43bce_1280.jpg",
    caption: "Flowers 4 U",
    rotation: -2,
    delay: 0.2,
  },
] as const;

export const GALLERY_SECTIONS = [
  {
    id: "me",
    title: "Me",
    description: "Just a simp in his natural habitat.",
    photos: [
      { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=500&fit=crop&q=80", caption: "Coming Soon #1" },
      { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=500&fit=crop&q=70&sat=-20", caption: "Coming Soon #2" },
    ],
  },
  {
    id: "you",
    title: "You",
    description: "The reason for the simp's existence.",
    photos: [
      { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=500&fit=crop&q=80&hue=15", caption: "Coming Soon #1" },
      { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=500&fit=crop&q=70&blur=8", caption: "Coming Soon #2" },
    ],
  },
  {
    id: "us",
    title: "Me & You",
    description: "The best combination since Ctrl+C and Ctrl+V.",
    photos: [
      { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=500&fit=crop&q=10&blur=50", caption: "Coming Soon..." },
    ],
  },
] as const;

export const ROMANTIC_SONGS = [
  { title: "Fly Me to the Moon (Piano) - Frank Sinatra", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Telephone Number (Piano)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Apocalypse (Piano)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Dooron Dooron (Instrumental)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "The Night We Met (Piano)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "La Vie en Rose (Piano)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Just the Two of Us (Instrumental)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Kuch Khaas (Instrumental)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
] as const;

export const MUSIC_PLAYER_PLAYLIST = ROMANTIC_SONGS.map((song, idx) => ({
  id: idx + 1,
  title: song.title,
  url: song.url,
}));

export const LOVE_BLOG_CONTENT = {
  entryLabel: "Private Entry #001",
  heading: "My Dearest Manshika,",
  body: [
    "If you found this page, you already know the password is love. Honestly, that is the summary of everything I do.",
    "I built this tiny digital scrapbook for you because normal cards felt too small for how much I wanted to say.",
    "I love that your smile can fix my worst day, and I love that your chaos somehow matches mine perfectly.",
    "I promise to always debug your code (or bravely pretend to), listen to your playlists, and share my fries.",
  ],
  signoffLine1: "Yours forever,",
  signoffLine2: "Simp #1",
  sealText: "Sealed with 100% soft launch romance",
  psText:
    "PS: This page auto-unlocks when someone types LOVE because that is our plot twist.",
  hideHint: '(Type "love you too" to hide this page from the navbar again)',
} as const;
