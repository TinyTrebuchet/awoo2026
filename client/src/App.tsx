import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Reports from "@/pages/Reports";
import Guestbook from "@/pages/Guestbook";
import LoveBlog from "@/pages/LoveBlog";
import NotFound from "@/pages/not-found";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Navbar } from "@/components/Navbar";
import { LoveUnlockProvider } from "@/context/love-unlock";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/reports" component={Reports} />
          <Route path="/guestbook" component={Guestbook} />
          <Route path="/love">{() => <LoveBlog />}</Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <MusicPlayer />
    </div>
  );
}

function App() {
  return (
    <LoveUnlockProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </LoveUnlockProvider>
  );
}

export default App;
