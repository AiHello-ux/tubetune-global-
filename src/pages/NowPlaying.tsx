import { useNavigate } from "react-router-dom";
import { ChevronDown, Heart, SkipBack, SkipForward, Play, Pause, Shuffle, Repeat, Repeat1 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/contexts/PlayerContext";

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function NowPlaying() {
  const navigate = useNavigate();
  const {
    currentTrack, isPlaying, currentTime, duration,
    shuffle, repeat, togglePlay, next, previous, seek,
    toggleShuffle, toggleRepeat, playlist,
  } = usePlayer();

  if (!currentTrack) {
    navigate("/library");
    return null;
  }

  const playlistTitle = "Playlist";

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto px-6 py-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}>
          <ChevronDown className="w-7 h-7 text-foreground" />
        </button>
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Playing from</p>
          <p className="text-sm font-semibold text-foreground">{playlistTitle}</p>
        </div>
        <div className="w-7" />
      </div>

      {/* Artwork */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <img
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
          className="w-72 h-72 rounded-3xl object-cover shadow-2xl"
        />
      </div>

      {/* Track Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-foreground truncate">{currentTrack.title}</h2>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
        <Heart className="w-6 h-6 text-muted-foreground shrink-0 ml-3 cursor-pointer hover:text-primary transition-colors" />
      </div>

      {/* Progress */}
      <div className="mb-6">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={([v]) => seek(v)}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 mb-10">
        <button onClick={toggleShuffle} className={shuffle ? "text-primary" : "text-muted-foreground"}>
          <Shuffle className="w-5 h-5" />
        </button>
        <button onClick={previous}>
          <SkipBack className="w-7 h-7 text-foreground" fill="currentColor" />
        </button>
        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 text-background" fill="currentColor" />
          ) : (
            <Play className="w-7 h-7 text-background ml-1" fill="currentColor" />
          )}
        </button>
        <button onClick={next}>
          <SkipForward className="w-7 h-7 text-foreground" fill="currentColor" />
        </button>
        <button onClick={toggleRepeat} className={repeat !== "none" ? "text-primary" : "text-muted-foreground"}>
          {repeat === "one" ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
