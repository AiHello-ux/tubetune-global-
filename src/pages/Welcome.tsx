import { useNavigate } from "react-router-dom";
import { Music, Zap, Library, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Zap, title: "Instant Sync", desc: "Connect your YouTube library in seconds" },
  { icon: Music, title: "Audio Optimized", desc: "Stream music without the video overhead" },
  { icon: Library, title: "Clean Library", desc: "All your playlists, beautifully organized" },
];

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background px-6 py-10 max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
            <Music className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">TubeTune</h1>
            <p className="text-sm text-muted-foreground">Your YouTube Music Player</p>
          </div>
        </div>

        {/* Features */}
        <div className="w-full space-y-4 mt-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4 bg-card rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-3 mt-8">
        <Button
          className="w-full h-12 rounded-full text-base font-semibold gap-2"
          onClick={() => navigate("/login")}
        >
          Sign In with Google
          <ChevronRight className="w-4 h-4" />
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <span className="text-primary cursor-pointer">Terms of Service</span> &{" "}
          <span className="text-primary cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
