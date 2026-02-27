export interface ScanResult {
  domain: string;
  timestamp: string;
  threatScore: number;
  anomalousTraffic: number;
  suspiciousIPs: number;
  botProbability: number;
  exfiltrationLikelihood: number;
  aiConfidence: number;
  trafficData: { time: string; normal: number; anomalous: number }[];
  riskHeatmap: { category: string; score: number; fullMark: number }[];
  zeroDayResults: {
    scriptExecutionDetected: boolean;
    payloadDetonated: boolean;
    exploitSimilarity: number;
    zeroDayProbability: number;
    cveSimilarity: number;
    behavioralFingerprint: string;
    riskClassification: "Critical" | "High" | "Medium" | "Low";
  };
  responseActions: {
    blockedIP: string;
    isolatedEndpoint: string;
    payloadNeutralized: boolean;
    firewallRule: string;
    patchRecommendation: string;
  };
  mlModels: { name: string; confidence: number; status: string }[];
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function seeded(h: number, idx: number, min: number, max: number): number {
  const v = ((h * (idx + 1) * 2654435761) >>> 0) % 1000;
  return min + (v / 1000) * (max - min);
}

const randomIP = (h: number) =>
  `${(h % 223) + 1}.${(h >> 3) % 256}.${(h >> 6) % 256}.${(h >> 9) % 256}`;

export function generateScanResult(domain: string): ScanResult {
  const h = hash(domain);
  const threatScore = Math.round(seeded(h, 1, 68, 98));
  const aiConfidence = +(seeded(h, 2, 96.5, 99.9)).toFixed(1);
  const anomalousTraffic = +(seeded(h, 3, 1.2, 14.8)).toFixed(1);
  const suspiciousIPs = Math.round(seeded(h, 4, 0, 12));
  const botProbability = +(seeded(h, 5, 3, 28)).toFixed(1);
  const exfiltrationLikelihood = +(seeded(h, 6, 0.5, 18)).toFixed(1);

  const hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
  const trafficData = hours.map((time, i) => ({
    time,
    normal: Math.round(seeded(h, 10 + i, 400, 900)),
    anomalous: Math.round(seeded(h, 20 + i, 5, 80)),
  }));

  const riskHeatmap = [
    { category: "SQL Injection", score: Math.round(seeded(h, 30, 10, 95)), fullMark: 100 },
    { category: "XSS", score: Math.round(seeded(h, 31, 10, 90)), fullMark: 100 },
    { category: "DDoS", score: Math.round(seeded(h, 32, 5, 70)), fullMark: 100 },
    { category: "Phishing", score: Math.round(seeded(h, 33, 5, 60)), fullMark: 100 },
    { category: "Malware", score: Math.round(seeded(h, 34, 5, 85)), fullMark: 100 },
    { category: "Data Leak", score: Math.round(seeded(h, 35, 5, 75)), fullMark: 100 },
  ];

  const classifications: ScanResult["zeroDayResults"]["riskClassification"][] = ["Low", "Medium", "High", "Critical"];
  const classIdx = Math.min(3, Math.floor(seeded(h, 40, 0, 4)));

  return {
    domain,
    timestamp: new Date().toISOString(),
    threatScore,
    anomalousTraffic,
    suspiciousIPs,
    botProbability,
    exfiltrationLikelihood,
    aiConfidence,
    trafficData,
    riskHeatmap,
    zeroDayResults: {
      scriptExecutionDetected: h % 3 !== 0,
      payloadDetonated: h % 5 !== 0,
      exploitSimilarity: +(seeded(h, 41, 12, 78)).toFixed(1),
      zeroDayProbability: +(seeded(h, 42, 2, 35)).toFixed(1),
      cveSimilarity: +(seeded(h, 43, 20, 85)).toFixed(1),
      behavioralFingerprint: `BEH-${h.toString(16).slice(0, 8).toUpperCase()}`,
      riskClassification: classifications[classIdx],
    },
    responseActions: {
      blockedIP: randomIP(h),
      isolatedEndpoint: `/api/v${(h % 3) + 1}/data`,
      payloadNeutralized: true,
      firewallRule: `BLOCK_INBOUND_${h.toString(16).slice(0, 6).toUpperCase()}`,
      patchRecommendation: `Update TLS to 1.3, patch CVE-2025-${(h % 9000) + 1000}`,
    },
    mlModels: [
      { name: "Neural Network", confidence: +(seeded(h, 50, 97, 99.9)).toFixed(1), status: "Active" },
      { name: "Random Forest", confidence: +(seeded(h, 51, 96, 99.5)).toFixed(1), status: "Active" },
      { name: "Isolation Forest", confidence: +(seeded(h, 52, 95, 99.2)).toFixed(1), status: "Active" },
      { name: "Adversarial GAN", confidence: +(seeded(h, 53, 94, 99.0)).toFixed(1), status: "Active" },
    ],
  };
}

export const SCAN_STEPS = [
  "Initializing AI engine",
  "Mapping network behavior",
  "Running deep behavioral analysis",
  "Executing zero-day sandbox detonation",
  "Performing ensemble ML verification",
  "Generating automated response plan",
  "Finalizing threat intelligence report",
];

export function validateUrl(input: string): { valid: boolean; url: string; error?: string } {
  let url = input.trim();
  if (!url) return { valid: false, url: "", error: "Please enter a domain or URL" };
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes(".")) return { valid: false, url, error: "Invalid domain format" };
    return { valid: true, url: parsed.hostname };
  } catch {
    return { valid: false, url, error: "Invalid URL format" };
  }
}
