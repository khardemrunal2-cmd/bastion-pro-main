import { useEffect, useState } from "react";
import type { ScanResult } from "@/lib/scanEngine";
import { Cpu, CheckCircle } from "lucide-react";

interface Props {
  result: ScanResult;
}

const ConfidenceDial = ({ value }: { value: number }) => {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 200);
    return () => clearTimeout(t);
  }, [value]);

  const size = 160;
  const r = 65;
  const circ = Math.PI * r; // half circle
  const offset = circ - (circ * animated) / 100;

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <path
          d={`M ${size * 0.1} ${size / 2 + 10} A ${r} ${r} 0 0 1 ${size * 0.9} ${size / 2 + 10}`}
          fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" strokeLinecap="round"
        />
        <path
          d={`M ${size * 0.1} ${size / 2 + 10} A ${r} ${r} 0 0 1 ${size * 0.9} ${size / 2 + 10}`}
          fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 2s ease-out", filter: "drop-shadow(0 0 6px hsl(180 100% 50% / 0.5))" }}
        />
      </svg>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className="text-3xl font-display font-bold text-primary text-glow">{animated.toFixed(1)}%</span>
        <span className="text-xs text-muted-foreground">Model Confidence</span>
      </div>
    </div>
  );
};

const MLDashboard = ({ result }: Props) => {
  const avgConfidence = result.mlModels.reduce((a, m) => a + m.confidence, 0) / result.mlModels.length;
  const falsePositiveRate = (100 - avgConfidence).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Cpu className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-display font-bold">Ensemble ML Model Dashboard</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Confidence dial */}
        <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6 flex flex-col items-center">
          <ConfidenceDial value={avgConfidence} />
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div>
              <span className="text-muted-foreground">False Positive Rate: </span>
              <span className="font-display font-bold text-[hsl(var(--cyber-success))]">{falsePositiveRate}%</span>
            </div>
          </div>
        </div>

        {/* Models list */}
        <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-5 space-y-3">
          <h4 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-wider mb-3">Active Models</h4>
          {result.mlModels.map((model, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <CheckCircle className="w-4 h-4 text-[hsl(var(--cyber-success))]" />
              <span className="flex-1 text-sm font-medium">{model.name}</span>
              <span className="font-mono text-sm text-primary">{model.confidence}%</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[hsl(var(--cyber-success)/0.1)] text-[hsl(var(--cyber-success))] border border-[hsl(var(--cyber-success)/0.2)]">
                {model.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MLDashboard;
