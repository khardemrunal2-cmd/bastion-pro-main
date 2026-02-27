import { useState, useCallback, useRef } from "react";
import { ScanResult, generateScanResult, validateUrl, SCAN_STEPS } from "@/lib/scanEngine";

export type ScanPhase = "idle" | "scanning" | "complete";

export interface ScanState {
  phase: ScanPhase;
  currentStep: number;
  domain: string;
  result: ScanResult | null;
  error: string;
  history: ScanResult[];
}

export function useScan() {
  const [state, setState] = useState<ScanState>({
    phase: "idle",
    currentStep: -1,
    domain: "",
    result: null,
    error: "",
    history: () => {
      try {
        const saved = localStorage.getItem("securebot_scan_history");
        return saved ? JSON.parse(saved) : [];
      } catch { return []; }
    },
  } as any);

  // Initialize history from localStorage
  const [history, setHistory] = useState<ScanResult[]>(() => {
    try {
      const saved = localStorage.getItem("securebot_scan_history");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  };

  const startScan = useCallback((input: string) => {
    clearTimers();
    const validation = validateUrl(input);
    if (!validation.valid) {
      setState(s => ({ ...s, error: validation.error || "Invalid URL", phase: "idle" }));
      return;
    }

    const domain = validation.url;
    setState(s => ({ ...s, phase: "scanning", currentStep: 0, domain, error: "", result: null }));

    // Show all steps at once (no animation)
    setState(s => ({ ...s, currentStep: SCAN_STEPS.length - 1 }));

    // Complete scan immediately
    const result = generateScanResult(domain);
    setState(s => ({ ...s, phase: "complete", result, currentStep: SCAN_STEPS.length }));
    setHistory(prev => {
      const updated = [result, ...prev].slice(0, 20);
      localStorage.setItem("securebot_scan_history", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setState({ phase: "idle", currentStep: -1, domain: "", result: null, error: "", history: [] });
  }, []);

  return { ...state, history, startScan, reset };
}
