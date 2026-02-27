import { useState } from "react";
import { Search, AlertCircle } from "lucide-react";

interface ScanInputProps {
  onScan: (url: string) => void;
  error: string;
}

const ScanInput = ({ onScan, error }: ScanInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScan(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-2 p-1.5 rounded-xl border border-primary/30 bg-card/80 backdrop-blur-sm shadow-[0_0_30px_hsl(180_100%_50%/0.08)]">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter domain (e.g. example.com)"
          className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-foreground placeholder:text-muted-foreground font-mono text-sm"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-primary-foreground font-display font-semibold rounded-lg text-sm tracking-wider uppercase hover:shadow-[0_0_30px_hsl(180_100%_50%/0.4)] transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Search className="w-4 h-4" />
          Run Security Scan
        </button>
      </div>
      {error && (
        <div className="flex items-center gap-2 mt-3 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </form>
  );
};

export default ScanInput;
