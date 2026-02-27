import type { ScanResult } from "@/lib/scanEngine";
import { History, TrendingUp, RotateCcw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  history: ScanResult[];
  onRescan: (domain: string) => void;
}

const ScanDashboard = ({ history, onRescan }: Props) => {
  if (history.length === 0) return null;

  const trendData = [...history].reverse().slice(-10).map((r, i) => ({
    scan: `#${i + 1}`,
    score: r.threatScore,
    domain: r.domain,
  }));

  const scoreColor = (s: number) =>
    s >= 90 ? "text-[hsl(var(--cyber-success))]" : s >= 70 ? "text-[hsl(var(--cyber-warning))]" : "text-[hsl(var(--cyber-danger))]";

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 mt-12">
      <div className="flex items-center gap-3">
        <History className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-display font-bold">Scan Dashboard</h3>
      </div>

      {/* Trend graph */}
      {trendData.length > 1 && (
        <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-5">
          <h4 className="text-sm font-display font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Domain Risk Trend
          </h4>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={trendData}>
              <XAxis dataKey="scan" tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} />
              <YAxis domain={[50, 100]} tick={{ fill: "hsl(210 15% 55%)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(220 25% 10%)", border: "1px solid hsl(210 20% 18%)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="score" stroke="hsl(180 100% 50%)" fill="hsl(180 100% 50% / 0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* History table */}
      <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left p-3 font-display text-xs uppercase tracking-wider">Domain</th>
                <th className="text-left p-3 font-display text-xs uppercase tracking-wider">Score</th>
                <th className="text-left p-3 font-display text-xs uppercase tracking-wider">Date</th>
                <th className="text-right p-3" />
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 10).map((r, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="p-3 font-mono">{r.domain}</td>
                  <td className={`p-3 font-display font-bold ${scoreColor(r.threatScore)}`}>{r.threatScore}</td>
                  <td className="p-3 text-muted-foreground">{new Date(r.timestamp).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onRescan(r.domain)}
                      className="text-primary hover:text-primary/80 transition-colors cursor-pointer"
                      title="Rescan"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScanDashboard;
