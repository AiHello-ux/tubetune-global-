import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Settings } from "lucide-react";

const tabs = [
  { path: "/library", icon: Home, label: "Home" },
  { path: "/search", icon: Search, label: "Search" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur-lg border-t border-border/50 z-50">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom,8px)]">
        {tabs.map((t) => {
          const active = pathname.startsWith(t.path);
          return (
            <button
              key={t.path}
              onClick={() => navigate(t.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 ${active ? "text-primary" : "text-muted-foreground"}`}
            >
              <t.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
