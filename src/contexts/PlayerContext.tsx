import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { Track } from "@/lib/types";

interface PlayerState {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  shuffle: boolean;
  repeat: "none" | "all" | "one";
  volume: number;
}

interface PlayerContextType extends PlayerState {
  play: (track: Track, playlist?: Track[]) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setVolume: (v: number) => void;
  playerRef: React.MutableRefObject<any>;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be inside PlayerProvider");
  return ctx;
}

declare global {
  interface Window { onYouTubeIframeAPIReady?: () => void; YT?: any; }
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    playlist: [],
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    shuffle: false,
    repeat: "none",
    volume: 80,
  });

  const playerRef = useRef<any>(null);
  const intervalRef = useRef<number | null>(null);
  const apiReady = useRef(false);

  useEffect(() => {
    if (window.YT) { apiReady.current = true; return; }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => { apiReady.current = true; };
  }, []);

  const startTimeUpdate = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setState(s => ({
          ...s,
          currentTime: playerRef.current.getCurrentTime(),
          duration: playerRef.current.getDuration?.() || s.duration,
        }));
      }
    }, 500);
  }, []);

  const initPlayer = useCallback((videoId: string) => {
    const tryInit = () => {
      if (!window.YT?.Player) { setTimeout(tryInit, 200); return; }
      if (playerRef.current?.destroy) playerRef.current.destroy();
      const container = document.getElementById("yt-player-container");
      if (!container) return;
      playerRef.current = new window.YT.Player("yt-player", {
        height: "1", width: "1", videoId,
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1 },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(state.volume);
            e.target.playVideo();
            setState(s => ({ ...s, isPlaying: true, duration: e.target.getDuration() }));
            startTimeUpdate();
          },
          onStateChange: (e: any) => {
            if (e.data === 0) { /* ended */ next(); }
            setState(s => ({ ...s, isPlaying: e.data === 1 }));
          },
        },
      });
    };
    tryInit();
  }, [state.volume, startTimeUpdate]);

  const play = useCallback((track: Track, playlist?: Track[]) => {
    setState(s => ({
      ...s,
      currentTrack: track,
      playlist: playlist || s.playlist,
      currentTime: 0,
    }));
    initPlayer(track.videoId);
  }, [initPlayer]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (state.isPlaying) { playerRef.current.pauseVideo(); }
    else { playerRef.current.playVideo(); }
    setState(s => ({ ...s, isPlaying: !s.isPlaying }));
  }, [state.isPlaying]);

  const getNextIndex = useCallback((dir: 1 | -1) => {
    if (!state.currentTrack || state.playlist.length === 0) return -1;
    const idx = state.playlist.findIndex(t => t.id === state.currentTrack!.id);
    if (state.shuffle) return Math.floor(Math.random() * state.playlist.length);
    const next = idx + dir;
    if (next >= state.playlist.length) return state.repeat === "all" ? 0 : -1;
    if (next < 0) return state.repeat === "all" ? state.playlist.length - 1 : -1;
    return next;
  }, [state.currentTrack, state.playlist, state.shuffle, state.repeat]);

  const next = useCallback(() => {
    if (state.repeat === "one" && state.currentTrack) { play(state.currentTrack, state.playlist); return; }
    const idx = getNextIndex(1);
    if (idx >= 0) play(state.playlist[idx], state.playlist);
  }, [getNextIndex, play, state.repeat, state.currentTrack, state.playlist]);

  const previous = useCallback(() => {
    if (state.currentTime > 3 && playerRef.current) { playerRef.current.seekTo(0, true); return; }
    const idx = getNextIndex(-1);
    if (idx >= 0) play(state.playlist[idx], state.playlist);
  }, [getNextIndex, play, state.currentTime, state.playlist]);

  const seek = useCallback((time: number) => {
    playerRef.current?.seekTo(time, true);
    setState(s => ({ ...s, currentTime: time }));
  }, []);

  const toggleShuffle = useCallback(() => setState(s => ({ ...s, shuffle: !s.shuffle })), []);
  const toggleRepeat = useCallback(() => setState(s => ({
    ...s, repeat: s.repeat === "none" ? "all" : s.repeat === "all" ? "one" : "none",
  })), []);
  const setVolume = useCallback((v: number) => {
    playerRef.current?.setVolume(v);
    setState(s => ({ ...s, volume: v }));
  }, []);

  return (
    <PlayerContext.Provider value={{ ...state, play, togglePlay, next, previous, seek, toggleShuffle, toggleRepeat, setVolume, playerRef }}>
      {children}
      <div id="yt-player-container" className="fixed -top-[100px] -left-[100px] w-[1px] h-[1px] overflow-hidden">
        <div id="yt-player" />
      </div>
    </PlayerContext.Provider>
  );
}
