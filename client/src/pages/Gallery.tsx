import { Polaroid } from "@/components/Polaroid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GALLERY_SECTIONS } from "@shared/app-config";

export default function Gallery() {
  const sections = GALLERY_SECTIONS;

  return (
    <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-display text-vintageBlack mb-4 underline decoration-dustyRose">The Gallery</h1>
          <p className="font-mono text-sm opacity-60">Memory.exe [Status: Loading...]</p>
        </header>

        <Tabs defaultValue="me" className="w-full">
          <TabsList className="w-full md:w-auto h-auto flex-nowrap overflow-x-auto gap-2 bg-sage/15 justify-start">
            {sections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="font-display text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-dustyRose whitespace-nowrap shrink-0"
              >
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <div className="bg-white/50 p-4 border-2 border-dashed border-sage my-6 text-center">
                <h2 className="text-2xl font-display mb-2">{section.title}</h2>
                <p className="font-handwriting text-xl text-dustyRose">{section.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 place-items-center">
                {section.photos.map((photo, idx) => (
                  <div key={`${section.id}-${idx}`} className="relative group">
                    <div className="absolute inset-0 bg-vintageBlack/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      <span className="bg-white px-3 py-1 font-mono text-xs border border-vintageBlack">DEVELOPING...</span>
                    </div>
                    <Polaroid
                      src={photo.src}
                      caption={photo.caption}
                      rotation={idx % 2 === 0 ? 3 : -3}
                    />
                  </div>
                ))}
              </div>

              {section.photos.length === 0 && section.id === "us" ? (
                <div className="mt-6 mx-auto max-w-md bg-white/70 border-2 border-dashed border-dustyRose p-6 text-center">
                  <p className="font-display text-lg text-dustyRose">Me &amp; You: Coming Soon</p>
                  <p className="mt-2 font-mono text-xs text-sage">
                    Reserved for our future memories. No photos yet, just anticipation.
                  </p>
                </div>
              ) : null}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
