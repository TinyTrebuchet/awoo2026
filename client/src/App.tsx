import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Playlist from "@/pages/Playlist";
import Reports from "@/pages/Reports";
import Guestbook from "@/pages/Guestbook";
import LoveBlog from "@/pages/LoveBlog";
import NotFound from "@/pages/not-found";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Navbar } from "@/components/Navbar";
import { LoveUnlockProvider } from "@/context/love-unlock";
import { PlayerProvider } from "@/context/player-context";

function Router() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[url('/heart.png')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-cream/70 backdrop-blur-[1px] pointer-events-none" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/reports" component={Reports} />
            <Route path="/guestbook" component={Guestbook} />
            <Route path="/love">{() => <LoveBlog />}</Route>
            <Route component={NotFound} />
          </Switch>
        </main>
        <MusicPlayer />
      </div>
    </div>
  );
}

function App() {
  return (
    <LoveUnlockProvider>
      <PlayerProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </PlayerProvider>
    </LoveUnlockProvider>
  );
}

export default App;
