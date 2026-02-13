const API_KEY_STORAGE = "tubetune_yt_api_key";

export function getApiKey(): string | null {
  return localStorage.getItem(API_KEY_STORAGE);
}

export function setApiKey(key: string) {
  localStorage.setItem(API_KEY_STORAGE, key);
}

export function removeApiKey() {
  localStorage.removeItem(API_KEY_STORAGE);
}

const BASE = "https://www.googleapis.com/youtube/v3";

export async function searchYouTube(query: string, type: string = "video", maxResults = 10) {
  const key = getApiKey();
  if (!key) throw new Error("No API key configured");
  const res = await fetch(
    `${BASE}/search?part=snippet&q=${encodeURIComponent(query)}&type=${type}&maxResults=${maxResults}&key=${key}`
  );
  if (!res.ok) throw new Error("YouTube API error");
  return res.json();
}

export async function getPlaylists(maxResults = 25) {
  const key = getApiKey();
  if (!key) throw new Error("No API key configured");
  const res = await fetch(
    `${BASE}/playlists?part=snippet,contentDetails&mine=true&maxResults=${maxResults}&key=${key}`
  );
  if (!res.ok) throw new Error("YouTube API error");
  return res.json();
}

export async function getPlaylistItems(playlistId: string, maxResults = 50) {
  const key = getApiKey();
  if (!key) throw new Error("No API key configured");
  const res = await fetch(
    `${BASE}/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=${maxResults}&key=${key}`
  );
  if (!res.ok) throw new Error("YouTube API error");
  return res.json();
}

export async function searchVideos(query: string, maxResults = 20) {
  const data = await searchYouTube(query, "video", maxResults);
  return (data.items || []).map((item: any) => ({
    id: item.id.videoId,
    videoId: item.id.videoId,
    title: item.snippet.title,
    artist: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
    duration: "",
    type: "video" as const,
  }));
}
