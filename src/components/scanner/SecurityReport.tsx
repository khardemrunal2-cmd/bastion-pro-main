import type { ScanResult } from "@/lib/scanEngine";
import { Download, RotateCcw, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generatePDFReport } from "@/lib/generateReport";
import BehavioralAnalysis from "./BehavioralAnalysis";
import ZeroDayDetection from "./ZeroDayDetection";
import AutomatedResponse from "./AutomatedResponse";
import MLDashboard from "./MLDashboard";

interface Props {
  result: ScanResult;
  onRescan: () => void;
}

const SecurityReport = ({ result, onRescan }: Props) => {
  const navigate = useNavigate();
  const hasThreats = result.threatScore > 20;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Security Intelligence Report
          </h2>
          <p className="text-muted-foreground text-sm mt-1 font-mono">
            {result.domain} — {new Date(result.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasThreats && (
            <button
              onClick={() => navigate("/resolve")}
              className="px-4 py-2 bg-green-600 text-white font-display font-semibold rounded-lg text-xs tracking-wider uppercase hover:bg-green-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" /> Resolve Detected Threats
            </button>
          )}
          <button
            onClick={onRescan}
            className="px-4 py-2 border border-primary/40 text-primary font-display font-semibold rounded-lg text-xs tracking-wider uppercase hover:bg-primary/10 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Rescan
          </button>
          <button
            onClick={() => generatePDFReport(result)}
            className="px-4 py-2 bg-primary text-primary-foreground font-display font-semibold rounded-lg text-xs tracking-wider uppercase hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download PDF Report
          </button>
        </div>
      </div>

      <div className="cyber-line" />

      {/* Report sections */}
      <BehavioralAnalysis result={result} />
      <div className="cyber-line" />
      <ZeroDayDetection result={result} />
      <div className="cyber-line" />
      <AutomatedResponse result={result} />
      <div className="cyber-line" />
      <MLDashboard result={result} />
    </div>
  );
};

export default SecurityReport;
