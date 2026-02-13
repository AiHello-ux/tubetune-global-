import { useState } from "react";
import { Search as SearchIcon, Mic, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { genres, mockTracks } from "@/lib/mock-data";
import { searchVideos } from "@/lib/youtube";
import { usePlayer } from "@/contexts/PlayerContext";
import { Track } from "@/lib/types";
import { getApiKey } from "@/lib/youtube";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(["Chill lofi", "The Weeknd", "Gym playlist"]);
  const { play } = usePlayer();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setRecentSearches((prev) => [query, ...prev.filter((s) => s !== query)].slice(0, 5));
    if (getApiKey()) {
      setLoading(true);
      try {
        const r = await searchVideos(query);
        setResults(r);
      } catch { setResults([]); }
      setLoading(false);
    } else {
      // Mock search
      setResults(mockTracks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || t.artist.toLowerCase().includes(query.toLowerCase())));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto pb-36">
      {/* Search Bar */}
      <div className="px-5 pt-6 pb-3">
        <h1 className="text-2xl font-bold text-foreground mb-4">Search</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Songs, playlists, artists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 pr-10 h-11 bg-card border-0 rounded-xl text-foreground placeholder:text-muted-foreground"
          />
          {query ? (
            <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => { setQuery(""); setResults([]); }}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          ) : (
            <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-5">
        <Tabs defaultValue="all">
          <TabsList className="bg-transparent gap-2 h-8 p-0">
            {["All", "Playlists", "Songs", "Artists"].map((t) => (
              <TabsTrigger
                key={t}
                value={t.toLowerCase()}
                className="rounded-full px-4 h-8 text-xs bg-secondary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="px-5 mt-4 flex-1">
        {results.length === 0 && !loading ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-foreground">Recent Searches</h2>
                  <button className="text-xs text-primary" onClick={() => setRecentSearches([])}>Clear</button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      className="flex items-center gap-3 w-full text-left py-2"
                      onClick={() => { setQuery(s); }}
                    >
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Browse All */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3">Browse All</h2>
              <div className="grid grid-cols-2 gap-3">
                {genres.map((g) => (
                  <div
                    key={g.name}
                    className={`bg-gradient-to-br ${g.color} rounded-xl p-4 h-24 flex items-end cursor-pointer active:scale-[0.97] transition-transform`}
                    onClick={() => { setQuery(g.name); }}
                  >
                    <span className="text-sm font-bold text-white">{g.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {results.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-card active:scale-[0.98] transition-all"
                onClick={() => play(r, results)}
              >
                <img src={r.thumbnail} alt={r.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
