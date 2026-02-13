import { Polaroid } from "@/components/Polaroid";
import { motion } from "framer-motion";

export default function Gallery() {
  const sections = [
    { title: "Me", description: "Just a simp in his natural habitat." },
    { title: "You", description: "The reason for the simp's existence." },
    { title: "Me & You", description: "The best combination since Ctrl+C and Ctrl+V." },
  ];

  return (
    <div className="min-h-screen p-8 bg-cream">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-display text-vintageBlack mb-4 underline decoration-dustyRose">The Gallery</h1>
          <p className="font-mono text-sm opacity-60">Memory.exe [Status: Loading...]</p>
        </header>

        <div className="grid md:grid-cols-3 gap-12">
          {sections.map((section, idx) => (
            <div key={section.title} className="flex flex-col items-center">
              <div className="bg-white/50 p-4 border-2 border-dashed border-sage mb-4 w-full text-center">
                <h2 className="text-xl font-display mb-2">{section.title}</h2>
                <p className="font-handwriting text-lg text-dustyRose">{section.description}</p>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-vintageBlack/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <span className="bg-white px-3 py-1 font-mono text-xs border border-vintageBlack">DEVELOPING...</span>
                </div>
                <Polaroid 
                  src={`https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop&q=10&blur=50`} 
                  caption="Coming Soon..." 
                  rotation={idx % 2 === 0 ? 3 : -3}
                />
              </div>
              <p className="mt-4 font-mono text-[10px] text-sage">File size: [Pending Capture]</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
