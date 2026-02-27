import { Shield, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import ScanInput from "@/components/scanner/ScanInput";
import ScanProgress from "@/components/scanner/ScanProgress";
import type { ScanPhase } from "@/hooks/useScan";

interface HeroSectionProps {
  scanPhase: ScanPhase;
  currentStep: number;
  domain: string;
  error: string;
  onScan: (url: string) => void;
}

const HeroSection = ({ scanPhase, currentStep, domain, error, onScan }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-px bg-primary/20 animate-scan-line" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {scanPhase === "idle" && (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium tracking-wider uppercase">SecureBot</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in [animation-delay:0.2s] opacity-0">
              AI-Powered Cybersecurity for{" "}
              <span className="text-primary text-glow">Modern Enterprises</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in [animation-delay:0.4s] opacity-0">
              Enter your domain below to run a comprehensive AI security scan — no signup required.
            </p>

            <div className="animate-fade-in [animation-delay:0.6s] opacity-0">
              <ScanInput onScan={onScan} error={error} />
            </div>
          </>
        )}

        {scanPhase === "scanning" && (
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <Shield className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-primary font-medium tracking-wider uppercase">Scanning in Progress</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-8">
              Analyzing <span className="text-primary text-glow">{domain}</span>
            </h2>
            <ScanProgress currentStep={currentStep} domain={domain} />
          </div>
        )}
      </div>

      {/* Scroll indicator (only when idle) */}
      {scanPhase === "idle" && (
        <button
          onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float cursor-pointer bg-transparent border-none"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </button>
      )}
    </section>
  );
};

export default HeroSection;
