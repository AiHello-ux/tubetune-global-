import { useNavigate } from "react-router-dom";
import { X, Youtube, User, ChevronRight, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { getApiKey, setApiKey, removeApiKey } from "@/lib/youtube";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const [apiKey, setApiKeyLocal] = useState(getApiKey() || "");
  const [saved, setSaved] = useState(!!getApiKey());

  const handleSave = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
      setSaved(true);
    }
  };

  const handleRemove = () => {
    removeApiKey();
    setApiKeyLocal("");
    setSaved(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <button onClick={() => navigate(-1)}>
          <X className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-2xl p-5 flex items-center gap-4">
          <Avatar className="w-14 h-14">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Guest User</p>
            <p className="text-xs text-muted-foreground">guest@tubetune.app</p>
            <span className="inline-block mt-1 text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">Free Plan</span>
          </div>
        </div>
      </div>

      {/* YouTube API Key */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-500" /> YouTube Account
        </h2>
        <div className="bg-card rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="password"
              placeholder="Enter YouTube API Key"
              value={apiKey}
              onChange={(e) => { setApiKeyLocal(e.target.value); setSaved(false); }}
              className="flex-1 h-10 bg-secondary border-0 rounded-lg text-foreground text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="rounded-lg flex-1 text-xs" onClick={handleSave} disabled={!apiKey.trim() || saved}>
              {saved ? "Connected ✓" : "Save Key"}
            </Button>
            {saved && (
              <Button size="sm" variant="destructive" className="rounded-lg text-xs" onClick={handleRemove}>
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
          <Button variant="secondary" size="sm" className="w-full rounded-lg text-xs">
            Sync Playlists Now
          </Button>
        </div>
      </div>

      {/* Account */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Account</h2>
        <div className="bg-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Profile Information</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="px-5 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Preferences</h2>
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Audio Quality</span>
            <span className="text-sm text-primary font-medium">High</span>
          </div>
        </div>
      </div>

      {/* Storage */}
      <div className="px-5">
        <h2 className="text-sm font-semibold text-foreground mb-3">Storage</h2>
        <div className="bg-card rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Cache Usage</span>
            <span className="text-muted-foreground">24 MB / 500 MB</span>
          </div>
          <Progress value={5} className="h-2" />
          <Button variant="secondary" size="sm" className="w-full rounded-lg text-xs">
            Clear Cache
          </Button>
        </div>
      </div>
    </div>
  );
}
