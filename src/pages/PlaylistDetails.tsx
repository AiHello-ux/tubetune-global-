import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Play, Shuffle, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockPlaylists, mockTracks } from "@/lib/mock-data";
import { usePlayer } from "@/contexts/PlayerContext";

export default function PlaylistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { play } = usePlayer();

  const playlist = mockPlaylists.find((p) => p.id === id) || mockPlaylists[0];
  const tracks = playlist.tracks || mockTracks;

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto pb-32">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Playlist Info */}
      <div className="px-5 flex flex-col items-center text-center gap-3 mb-5">
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-48 h-48 rounded-2xl object-cover shadow-xl"
        />
        <h1 className="text-xl font-bold text-foreground">{playlist.title}</h1>
        <p className="text-sm text-muted-foreground">{playlist.source} · {tracks.length} songs</p>
        <div className="flex gap-3 mt-2">
          <Button
            className="rounded-full px-8 h-11 text-sm font-semibold gap-2"
            onClick={() => tracks.length > 0 && play(tracks[0], tracks)}
          >
            <Play className="w-4 h-4" fill="currentColor" /> Play
          </Button>
          <Button
            variant="secondary"
            className="rounded-full px-8 h-11 text-sm font-semibold gap-2"
            onClick={() => {
              if (tracks.length === 0) return;
              const shuffled = [...tracks].sort(() => Math.random() - 0.5);
              play(shuffled[0], shuffled);
            }}
          >
            <Shuffle className="w-4 h-4" /> Shuffle
          </Button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-5 space-y-1">
        {tracks.map((track, i) => (
          <div
            key={track.id}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-card active:scale-[0.98] transition-all"
            onClick={() => play(track, tracks)}
          >
            <span className="text-xs text-muted-foreground w-5 text-right">{i + 1}</span>
            <img src={track.thumbnail} alt={track.title} className="w-11 h-11 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
              <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
            </div>
            <span className="text-xs text-muted-foreground">{track.duration}</span>
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}
