import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PlayerProvider } from "@/contexts/PlayerContext";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import LibraryPage from "./pages/Library";
import PlaylistDetails from "./pages/PlaylistDetails";
import NowPlaying from "./pages/NowPlaying";
import SearchPage from "./pages/SearchPage";
import Settings from "./pages/Settings";
import MiniPlayer from ".//components/MiniPlayer";
import BottomNav from "./components/BottomNav";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout() {
  const { pathname } = useLocation();
  const showNav = ["/library", "/search", "/settings"].some((p) => pathname.startsWith(p));
  const showMini = showNav || pathname.startsWith("/playlist");

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/playlist/:id" element={<PlaylistDetails />} />
        <Route path="/now-playing" element={<NowPlaying />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showMini && <MiniPlayer />}
      {showNav && <BottomNav />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlayerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </PlayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
