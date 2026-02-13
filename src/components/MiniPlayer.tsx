import { useNavigate } from "react-router-dom";
import { Play, Pause, SkipForward } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";

export default function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, next } = usePlayer();
  const navigate = useNavigate();

  if (!currentTrack) return null;

  return (
    <div
      className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md px-3 z-40"
    >
      <div
        className="bg-card/95 backdrop-blur-lg rounded-2xl p-3 flex items-center gap-3 shadow-xl border border-border/50 cursor-pointer"
        onClick={() => navigate("/now-playing")}
      >
        <img
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
          className="w-11 h-11 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{currentTrack.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-background" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 text-background ml-0.5" fill="currentColor" />
          )}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="shrink-0"
        >
          <SkipForward className="w-5 h-5 text-foreground" fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
