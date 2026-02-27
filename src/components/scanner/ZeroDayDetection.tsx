import { useEffect, useState } from "react";
import type { ScanResult } from "@/lib/scanEngine";
import { Bug, AlertTriangle, Fingerprint, FileWarning } from "lucide-react";

interface Props {
  result: ScanResult;
}

const riskColor = (r: string) => {
  switch (r) {
    case "Critical": return "text-[hsl(var(--cyber-danger))]";
    case "High": return "text-[hsl(var(--cyber-warning))]";
    case "Medium": return "text-[hsl(var(--cyber-warning))] opacity-80";
    default: return "text-[hsl(var(--cyber-success))]";
  }
};

const LogLine = ({ delay, children }: { delay: number; children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      {children}
    </div>
  );
};

const ZeroDayDetection = ({ result }: Props) => {
  const zd = result.zeroDayResults;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Bug className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-display font-bold">Adversarial AI Sandbox Results</h3>
      </div>

      {/* Risk badge */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Risk Classification:</span>
        <span className={`font-display font-bold text-lg ${riskColor(zd.riskClassification)}`}>
          {zd.riskClassification.toUpperCase()}
        </span>
      </div>

      {/* Sandbox execution log */}
      <div className="bg-[hsl(var(--cyber-dark))] rounded-xl border border-border p-5 font-mono text-sm space-y-2 overflow-hidden">
        <div className="text-primary/60 text-xs mb-3">/// SANDBOX EXECUTION LOG — {result.domain}</div>
        <LogLine delay={100}>
          <span className="text-muted-foreground">[00:00.12]</span>{" "}
          <span className={zd.scriptExecutionDetected ? "text-[hsl(var(--cyber-danger))]" : "text-[hsl(var(--cyber-success))]"}>
            Unknown script execution: {zd.scriptExecutionDetected ? "⚠ DETECTED" : "✓ Not detected"}
          </span>
        </LogLine>
        <LogLine delay={300}>
          <span className="text-muted-foreground">[00:01.84]</span>{" "}
          <span className={zd.payloadDetonated ? "text-[hsl(var(--cyber-warning))]" : "text-[hsl(var(--cyber-success))]"}>
            Payload detonation in isolated container: {zd.payloadDetonated ? "⚠ DETONATED" : "✓ Clean"}
          </span>
        </LogLine>
        <LogLine delay={500}>
          <span className="text-muted-foreground">[00:03.21]</span>{" "}
          Exploit similarity: <span className="text-primary">{zd.exploitSimilarity}%</span>
        </LogLine>
        <LogLine delay={700}>
          <span className="text-muted-foreground">[00:04.67]</span>{" "}
          Zero-day probability: <span className="text-[hsl(var(--cyber-warning))]">{zd.zeroDayProbability}%</span>
        </LogLine>
        <LogLine delay={900}>
          <span className="text-muted-foreground">[00:05.93]</span>{" "}
          CVE similarity match: <span className="text-primary">{zd.cveSimilarity}%</span>
        </LogLine>
        <LogLine delay={1100}>
          <span className="text-muted-foreground">[00:07.41]</span>{" "}
          Behavioral fingerprint: <span className="text-foreground">{zd.behavioralFingerprint}</span>
        </LogLine>
        <LogLine delay={1300}>
          <span className="text-muted-foreground">[00:08.00]</span>{" "}
          <span className="text-[hsl(var(--cyber-success))]">✓ Sandbox analysis complete</span>
        </LogLine>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: FileWarning, label: "Exploit Similarity", value: `${zd.exploitSimilarity}%` },
          { icon: AlertTriangle, label: "Zero-Day Prob.", value: `${zd.zeroDayProbability}%` },
          { icon: Bug, label: "CVE Match", value: `${zd.cveSimilarity}%` },
          { icon: Fingerprint, label: "Fingerprint", value: zd.behavioralFingerprint },
        ].map((s, i) => (
          <div key={i} className="bg-card/60 backdrop-blur-sm rounded-lg border border-border p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <s.icon className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <span className="text-sm font-display font-bold">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZeroDayDetection;
