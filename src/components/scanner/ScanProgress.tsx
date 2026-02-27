import { SCAN_STEPS } from "@/lib/scanEngine";
import { CheckCircle, Loader2, Circle } from "lucide-react";

interface ScanProgressProps {
  currentStep: number;
  domain: string;
}

const ScanProgress = ({ currentStep, domain }: ScanProgressProps) => {
  const progress = Math.min(100, ((currentStep + 1) / SCAN_STEPS.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground font-mono mb-1">TARGET</p>
        <p className="text-primary font-display font-bold text-lg text-glow">{domain}</p>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 w-full rounded-full bg-secondary overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-primary to-[hsl(var(--cyber-success))] rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 h-full w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse"
          style={{ left: `${Math.max(0, progress - 10)}%` }}
        />
      </div>

      {/* Steps */}
      <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-5 font-mono text-sm space-y-3">
        {SCAN_STEPS.map((step, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-500 ${
                isDone ? "text-[hsl(var(--cyber-success))]" : isActive ? "text-primary" : "text-muted-foreground/40"
              }`}
            >
              {isDone ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
              ) : (
                <Circle className="w-4 h-4 shrink-0" />
              )}
              <span className={isActive ? "text-glow-sm" : ""}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScanProgress;
