import { useEffect, useState } from "react";
import type { ScanResult } from "@/lib/scanEngine";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Shield, AlertTriangle, Activity, Bot, Database, Brain } from "lucide-react";

interface Props {
  result: ScanResult;
}

const ScoreRing = ({ score, size = 140 }: { score: number; size?: number }) => {
  const [animated, setAnimated] = useState(0);
  const color = score >= 90 ? "hsl(var(--cyber-success))" : score >= 70 ? "hsl(var(--cyber-warning))" : "hsl(var(--cyber-danger))";
  const label = score >= 90 ? "SECURE" : score >= 70 ? "MODERATE" : "HIGH RISK";
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 100);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={circ - (circ * animated) / 100}
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
      </svg>
      <div className="flex flex-col items-center z-10">
        <span className="text-3xl font-display font-bold text-center" style={{ color }}>{animated}</span>
        <span className="text-xs text-muted-foreground text-center">/100</span>
      </div>
      <span className="text-sm font-display font-bold tracking-wider mt-1 text-center" style={{ color }}>{label}</span>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, unit }: { icon: any; label: string; value: string | number; unit?: string }) => (
  <div className="bg-card/60 backdrop-blur-sm rounded-lg border border-border p-4 card-glow-hover h-20 flex flex-col justify-between">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-primary shrink-0" />
      <span className="text-xs text-muted-foreground uppercase tracking-wider truncate">{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-display font-bold text-foreground">{value}</span>
      <span className="text-sm text-muted-foreground">{unit}</span>
    </div>
  </div>
);

const BehavioralAnalysis = ({ result }: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-display font-bold">Behavioral Threat Analysis</h3>
      </div>

      {/* Score + Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-1 flex justify-center">
          <div className="relative">
            <ScoreRing score={result.threatScore} />
          </div>
        </div>
        <div className="md:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={Activity} label="Anomalous Traffic" value={result.anomalousTraffic} unit="%" />
          <StatCard icon={AlertTriangle} label="Suspicious IPs" value={result.suspiciousIPs} unit="found" />
          <StatCard icon={Bot} label="Bot Probability" value={result.botProbability} unit="%" />
          <StatCard icon={Database} label="Exfiltration Risk" value={result.exfiltrationLikelihood} unit="%" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-5">
          <h4 className="text-sm font-display font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Traffic Anomaly Graph
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={result.trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 20% 18%)" />
              <XAxis dataKey="time" tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(220 25% 10%)", border: "1px solid hsl(210 20% 18%)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="normal" stackId="1" stroke="hsl(180 100% 50%)" fill="hsl(180 100% 50% / 0.2)" />
              <Area type="monotone" dataKey="anomalous" stackId="1" stroke="hsl(0 80% 55%)" fill="hsl(0 80% 55% / 0.3)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-5">
          <h4 className="text-sm font-display font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" /> Risk Heatmap
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={result.riskHeatmap}>
              <PolarGrid stroke="hsl(210 20% 18%)" />
              <PolarAngleAxis dataKey="category" tick={{ fill: "hsl(210 15% 55%)", fontSize: 10 }} />
              <PolarRadiusAxis tick={false} domain={[0, 100]} />
              <Radar dataKey="score" stroke="hsl(180 100% 50%)" fill="hsl(180 100% 50% / 0.25)" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card/60 backdrop-blur-sm rounded-lg border border-border p-4 flex items-center gap-3">
        <Brain className="w-5 h-5 text-primary" />
        <span className="text-sm text-muted-foreground">AI Confidence:</span>
        <span className="font-display font-bold text-primary text-glow-sm">{result.aiConfidence}%</span>
      </div>
    </div>
  );
};

export default BehavioralAnalysis;
