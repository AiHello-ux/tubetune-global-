import { useNavigate } from "react-router-dom";
import { Plus, RefreshCw, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockPlaylists } from "@/lib/mock-data";
import { getApiKey } from "@/lib/youtube";

export default function LibraryPage() {
  const navigate = useNavigate();
  const hasKey = !!getApiKey();

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto pb-36">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3">
        <h1 className="text-2xl font-bold text-foreground">TubeTune</h1>
        <Avatar className="w-9 h-9 cursor-pointer" onClick={() => navigate("/settings")}>
          <AvatarFallback className="bg-secondary text-foreground text-sm">U</AvatarFallback>
        </Avatar>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="playlists" className="px-5">
        <TabsList className="w-full bg-secondary/50 rounded-xl h-10">
          <TabsTrigger value="playlists" className="flex-1 rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Playlists</TabsTrigger>
          <TabsTrigger value="albums" className="flex-1 rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Albums</TabsTrigger>
          <TabsTrigger value="artists" className="flex-1 rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Artists</TabsTrigger>
          <TabsTrigger value="downloads" className="flex-1 rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="mt-4 space-y-5">
          {/* YouTube Status */}
          <div className="bg-card rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Youtube className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {hasKey ? "YouTube Connected" : "Connect YouTube"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {hasKey ? "Synced" : "Add API key in Settings"}
                </p>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="text-primary">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          {/* Recently Fetched */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Recently Fetched</h2>
            <div className="space-y-3">
              {mockPlaylists.map((pl) => (
                <div
                  key={pl.id}
                  className="flex items-center gap-3 bg-card rounded-xl p-3 cursor-pointer active:scale-[0.98] transition-transform"
                  onClick={() => navigate(`/playlist/${pl.id}`)}
                >
                  <img
                    src={pl.thumbnail}
                    alt={pl.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{pl.title}</p>
                    <p className="text-xs text-muted-foreground">{pl.trackCount} videos · {pl.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="albums" className="mt-4">
          <p className="text-center text-muted-foreground text-sm py-10">No albums synced yet</p>
        </TabsContent>
        <TabsContent value="artists" className="mt-4">
          <p className="text-center text-muted-foreground text-sm py-10">No artists synced yet</p>
        </TabsContent>
        <TabsContent value="downloads" className="mt-4">
          <p className="text-center text-muted-foreground text-sm py-10">No downloads yet</p>
        </TabsContent>
      </Tabs>

      {/* FAB */}
      <button
        className="fixed bottom-40 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg active:scale-95 transition-transform z-30"
        onClick={() => {}}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
