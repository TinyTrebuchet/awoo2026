import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Reports from "@/pages/Reports";
import Guestbook from "@/pages/Guestbook";
import NotFound from "@/pages/not-found";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Navbar } from "@/components/Navbar";

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
          <Route component={NotFound} />
        </Switch>
      </main>
      <MusicPlayer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
