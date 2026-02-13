import { useNavigate } from "react-router-dom";
import { Music, ListMusic, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background px-6 py-10 max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Branding */}
        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center">
          <Music className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your music</p>
        </div>

        {/* Feature bullets */}
        <div className="w-full space-y-3">
          {[
            { icon: ListMusic, text: "Sync Playlists from YouTube" },
            { icon: Headphones, text: "High Fidelity Audio Streaming" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3 text-muted-foreground">
              <f.icon className="w-5 h-5 text-primary" />
              <span className="text-sm">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 mt-8">
        <Button
          className="w-full h-12 rounded-full text-base font-semibold"
          onClick={() => navigate("/library")}
        >
          Continue with Google
        </Button>
        <Button
          variant="ghost"
          className="w-full h-12 rounded-full text-base text-muted-foreground"
          onClick={() => navigate("/library")}
        >
          Try Guest Mode
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-4">
          <span className="text-primary cursor-pointer">Terms</span> ·{" "}
          <span className="text-primary cursor-pointer">Privacy</span> ·{" "}
          <span className="text-primary cursor-pointer">Help</span>
        </p>
      </div>
    </div>
  );
}
