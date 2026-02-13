import { Link, useLocation } from "wouter";
import { Heart, Image as ImageIcon, FileText, BookOpen, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/guestbook", label: "Guestbook", icon: BookOpen },
  ];

  return (
    <nav className="bg-sage/20 border-b-2 border-sage p-2 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex justify-center gap-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a className={cn(
              "flex items-center gap-2 px-3 py-1 border-2 border-transparent hover:border-dustyRose hover:bg-white/50 transition-all font-mono text-sm",
              location === item.href && "border-dustyRose bg-white/80 text-vintageBlack font-bold shadow-[2px_2px_0px_0px_rgba(220,174,150,1)]"
            )}>
              <item.icon size={16} className={cn(location === item.href && "text-primary")} />
              <span>{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
