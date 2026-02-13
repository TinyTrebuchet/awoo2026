import { motion } from "framer-motion";
import { RetroButton } from "@/components/RetroButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";

interface LoveBlogProps {
  onBack: () => void;
}

export default function LoveBlog({ onBack }: LoveBlogProps) {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto space-y-12 pb-32">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-4 border-b-4 border-double border-dusty-rose pb-8"
      >
        <h1 className="text-4xl md:text-6xl text-primary animate-pulse">
          <Heart className="inline-block w-8 h-8 md:w-12 md:h-12 mr-4 text-red-500 fill-red-500" />
          The Secret Blog
          <Heart className="inline-block w-8 h-8 md:w-12 md:h-12 ml-4 text-red-500 fill-red-500" />
        </h1>
        <p className="font-serif italic text-lg text-muted-foreground">
          "Confidential Files: Project Valentine"
        </p>
      </motion.header>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Letter Section */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-paper-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)] border border-gray-200 rotate-[-1deg]"
        >
          <h2 className="text-2xl mb-4 font-handwriting text-3xl border-b border-gray-300 pb-2">My Dearest Manshika,</h2>
          <p className="font-handwriting text-2xl leading-relaxed text-gray-800">
            If you found this page, you know the password is love. That's pretty much the summary of everything I do. 
            I built this weird little digital garden just for you because regular cards are boring and I wanted to make something
            that feels as unique as you are.
            <br/><br/>
            I promise to always debug your code (or at least try), listen to your playlists, and share my fries.
            <br/><br/>
            Yours,<br/>
            Simp #1
          </p>
        </motion.div>

        {/* Stats Table */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white border-2 border-vintage-black p-4 shadow-[8px_8px_0px_0px_var(--vintage-black)]"
        >
          <h3 className="text-sm font-display mb-4 bg-vintage-black text-white p-2 inline-block">Progress Report: Feb 2024</h3>
          <ScrollArea className="h-[300px] border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Metric</TableHead>
                  <TableHead className="font-bold text-right">Value</TableHead>
                  <TableHead className="font-bold text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-mono text-sm">
                {[
                  { metric: "Simp Rate", value: "110%", status: "CRITICAL" },
                  { metric: "Cute Aggression", value: "High", status: "STABLE" },
                  { metric: "Miss You Hours", value: "24/7", status: "CONSTANT" },
                  { metric: "Date Nights Planned", value: "∞", status: "PENDING" },
                  { metric: "Hugs Distributed", value: "Not Enough", status: "LOW" },
                  { metric: "Jokes Laughed At", value: "All", status: "GOOD" },
                ].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.metric}</TableCell>
                    <TableCell className="text-right">{row.value}</TableCell>
                    <TableCell className="text-right text-green-600">{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </motion.div>
      </div>

      {/* Dictionary */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-sage/20 border-2 border-sage border-dashed p-8 rounded-lg"
      >
        <h3 className="font-display text-lg text-secondary-foreground mb-6">Manshika-to-English Dictionary</h3>
        <div className="grid md:grid-cols-3 gap-6 font-mono text-sm">
          <div className="bg-white p-4 shadow-sm">
            <strong className="block text-accent mb-1">"I'm fine"</strong>
            <span className="text-gray-600">Translation: I require immediate attention and possibly chocolate.</span>
          </div>
          <div className="bg-white p-4 shadow-sm">
            <strong className="block text-accent mb-1">"Whatever"</strong>
            <span className="text-gray-600">Translation: I have a strong opinion but I'm testing you.</span>
          </div>
          <div className="bg-white p-4 shadow-sm">
            <strong className="block text-accent mb-1">"Do what you want"</strong>
            <span className="text-gray-600">Translation: DANGER. Do NOT do what you want.</span>
          </div>
        </div>
      </motion.div>

      <div className="text-center pt-8">
        <RetroButton onClick={onBack} variant="primary">
          Back to Reality
        </RetroButton>
        <p className="mt-4 text-xs font-mono text-gray-500">
          (Type "love you too" to return home quickly)
        </p>
      </div>
    </div>
  );
}
