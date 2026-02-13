export interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  videoId: string;
  source?: string;
}

export interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  trackCount: number;
  source: string;
  tracks?: Track[];
}

export interface SearchResult {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  type: 'video' | 'playlist' | 'channel';
  videoId?: string;
}
