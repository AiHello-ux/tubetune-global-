import { Playlist, Track } from "./types";

export const mockTracks: Track[] = [
  { id: "1", title: "Blinding Lights", artist: "The Weeknd", thumbnail: "https://img.youtube.com/vi/4NRXx6U8ABQ/mqdefault.jpg", duration: "3:20", videoId: "4NRXx6U8ABQ" },
  { id: "2", title: "Levitating", artist: "Dua Lipa", thumbnail: "https://img.youtube.com/vi/TUVcZfQe-Kw/mqdefault.jpg", duration: "3:23", videoId: "TUVcZfQe-Kw" },
  { id: "3", title: "Save Your Tears", artist: "The Weeknd", thumbnail: "https://img.youtube.com/vi/XXYlFuWEuKI/mqdefault.jpg", duration: "3:35", videoId: "XXYlFuWEuKI" },
  { id: "4", title: "Stay", artist: "The Kid LAROI & Justin Bieber", thumbnail: "https://img.youtube.com/vi/kTJczUoc26U/mqdefault.jpg", duration: "2:21", videoId: "kTJczUoc26U" },
  { id: "5", title: "Peaches", artist: "Justin Bieber", thumbnail: "https://img.youtube.com/vi/tQ0yjYUFKAE/mqdefault.jpg", duration: "3:18", videoId: "tQ0yjYUFKAE" },
  { id: "6", title: "Montero", artist: "Lil Nas X", thumbnail: "https://img.youtube.com/vi/6swmTBVI83k/mqdefault.jpg", duration: "2:17", videoId: "6swmTBVI83k" },
];

export const mockPlaylists: Playlist[] = [
  { id: "1", title: "Top Hits 2024", thumbnail: "https://img.youtube.com/vi/4NRXx6U8ABQ/mqdefault.jpg", trackCount: 25, source: "YouTube Music", tracks: mockTracks },
  { id: "2", title: "Chill Vibes", thumbnail: "https://img.youtube.com/vi/TUVcZfQe-Kw/mqdefault.jpg", trackCount: 18, source: "YouTube", tracks: mockTracks.slice(1, 5) },
  { id: "3", title: "Workout Mix", thumbnail: "https://img.youtube.com/vi/kTJczUoc26U/mqdefault.jpg", trackCount: 30, source: "YouTube Music", tracks: mockTracks.slice(2) },
  { id: "4", title: "Late Night Drives", thumbnail: "https://img.youtube.com/vi/XXYlFuWEuKI/mqdefault.jpg", trackCount: 12, source: "YouTube", tracks: mockTracks.slice(0, 4) },
];

export const genres = [
  { name: "Pop", color: "from-pink-500 to-purple-600" },
  { name: "Hip-Hop", color: "from-orange-500 to-red-600" },
  { name: "Rock", color: "from-red-500 to-rose-700" },
  { name: "Electronic", color: "from-cyan-500 to-blue-600" },
  { name: "R&B", color: "from-violet-500 to-purple-700" },
  { name: "Jazz", color: "from-amber-500 to-yellow-600" },
];
