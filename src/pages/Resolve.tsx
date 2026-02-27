import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Shield, CheckCircle, Circle, Loader2, ArrowRight, AlertTriangle, Lock, Activity, Zap, Cpu, FileCheck, Server, Database, Globe, Bug, Eye, Fingerprint, Network, ShieldAlert, ShieldCheck, Terminal } from "lucide-react";

interface ResolutionStep {
  id: number;
  title: string;
  description: string;
  logs: string[];
}

interface DetectedIssue {
  issue: string;
  severity: "critical" | "high" | "medium" | "low";
  status: string;
}

interface ActionTaken {
  action: string;
  target: string;
  status: string;
}

// Dynamic issue generation based on threat score
const generateDetectedIssues = (threatScore: number): DetectedIssue[] => {
  const issues: DetectedIssue[] = [];
  const rand = Math.random();
  
  if (threatScore > 70) {
    issues.push(
      { issue: "SQL Injection Vulnerability - POST /api/user", severity: "critical", status: "Patched" },
      { issue: "Remote Code Execution Risk - /api/execute", severity: "critical", status: "Blocked" },
      { issue: "XSS Payload Detected - /api/search", severity: "high", status: "Sanitized" },
      { issue: "Suspicious IP Cluster - 12 addresses", severity: "high", status: "Blacklisted" },
      { issue: "Brute Force Attack Pattern - /login", severity: "medium", status: "Rate Limited" },
      { issue: "Data Exfiltration Attempt - DNS Tunnel", severity: "high", status: "Blocked" }
    );
  } else if (threatScore > 40) {
    issues.push(
      { issue: "Cross-Site Scripting (XSS) - /api/input", severity: "high", status: "Sanitized" },
      { issue: "Open Redirect Vulnerability - /api/redirect", severity: "medium", status: "Fixed" },
      { issue: "Insecure API Endpoint - /api/debug", severity: "high", status: "Secured" },
      { issue: "Bot Traffic Detection - 15 sources", severity: "medium", status: "Rate Limited" },
      { issue: "Suspicious Login Patterns - 3 attempts", severity: "low", status: "Monitored" }
    );
  } else {
    issues.push(
      { issue: "Minor Security Headers Missing", severity: "low", status: "Applied" },
      { issue: "Outdated TLS Version", severity: "medium", status: "Updated" },
      { issue: "Verbose Error Messages", severity: "low", status: "Masked" }
    );
  }
  
  return issues;
};

// Dynamic actions based on issues - generate specific actions for each detected issue
const generateActionsTaken = (issues: DetectedIssue[]): ActionTaken[] => {
  const actions: ActionTaken[] = [];
  
  issues.forEach((issue) => {
    if (issue.issue.includes("SQL Injection")) {
      actions.push({
        action: "Parameterized queries enforced",
        target: "Database layer - " + issue.issue.split(" - ")[1],
        status: "Applied"
      });
    }
    if (issue.issue.includes("Remote Code Execution")) {
      actions.push({
        action: "Input validation strengthened",
        target: "API endpoints - " + issue.issue.split(" - ")[1],
        status: "Applied"
      });
    }
    if (issue.issue.includes("XSS")) {
      actions.push({
        action: "Content Security Policy updated",
        target: "Web server - " + issue.issue.split(" - ")[1],
        status: "Applied"
      });
    }
    if (issue.issue.includes("IP Cluster")) {
      actions.push({
        action: "IP range blocked",
        target: "Firewall - " + issue.issue.split(" - ")[1],
        status: "Blocked"
      });
    }
    if (issue.issue.includes("Brute Force")) {
      actions.push({
        action: "Account lockout policy enforced",
        target: "Auth service - " + issue.issue.split(" - ")[1],
        status: "Active"
      });
    }
    if (issue.issue.includes("Exfiltration") || issue.issue.includes("DNS Tunnel")) {
      actions.push({
        action: "DNS monitoring enabled",
        target: "Network - " + issue.issue.split(" - ")[1],
        status: "Active"
      });
    }
    if (issue.issue.includes("Open Redirect")) {
      actions.push({
        action: "URL validation added",
        target: "API - " + issue.issue.split(" - ")[1],
        status: "Applied"
      });
    }
    if (issue.issue.includes("Insecure API")) {
      actions.push({
        action: "API authentication required",
        target: "Endpoint - " + issue.issue.split(" - ")[1],
        status: "Secured"
      });
    }
    if (issue.issue.includes("Bot Traffic")) {
      actions.push({
        action: "Bot detection activated",
        target: "CDN - " + issue.issue.split(" - ")[1],
        status: "Active"
      });
    }
    if (issue.issue.includes("Login Patterns")) {
      actions.push({
        action: "MFA enforcement",
        target: "Auth - " + issue.issue.split(" - ")[1],
        status: "Applied"
      });
    }
    if (issue.issue.includes("Security Headers")) {
      actions.push({
        action: "Security headers added",
        target: "HTTP response",
        status: "Applied"
      });
    }
    if (issue.issue.includes("TLS")) {
      actions.push({
        action: "TLS 1.3 enforced",
        target: "Web server config",
        status: "Updated"
      });
    }
    if (issue.issue.includes("Error Messages")) {
      actions.push({
        action: "Generic error responses",
        target: "Application layer",
        status: "Applied"
      });
    }
  });
  
  // Add baseline actions
  actions.push(
    { action: "Threat intelligence updated", target: "Global database", status: "Synced" },
    { action: "ML models retrained", target: "Detection engine", status: "Active" }
  );
  
  return actions;
};

const RESOLUTION_STEPS: ResolutionStep[] = [
  {
    id: 1,
    title: "Mapping Network Behavior",
    description: "Detect abnormal IP clusters, request bursts, and lateral movement",
    logs: [
      "Scanning inbound IP ranges...",
      "Analyzing request patterns...",
      "Detecting abnormal traffic clusters...",
      "Identifying lateral movement vectors...",
      "Blocking malicious IP ranges..."
    ]
  },
  {
    id: 2,
    title: "Running Deep Behavioral Analysis",
    description: "Session fingerprinting, automation detection, and login anomaly analysis",
    logs: [
      "Analyzing session fingerprints...",
      "Detecting automation patterns...",
      "Identifying compromised sessions...",
      "Analyzing login anomalies...",
      "Isolating threat actors..."
    ]
  },
  {
    id: 3,
    title: "Executing Zero-Day Sandbox Detonation",
    description: "Execute suspicious payloads in sandbox and detect unknown malware",
    logs: [
      "Initializing sandbox environment...",
      "Detonating suspicious payloads...",
      "Analyzing behavioral patterns...",
      "Detecting memory injections...",
      "Updating threat signatures..."
    ]
  },
  {
    id: 4,
    title: "Performing Ensemble ML Verification",
    description: "Multiple ML models validate threats and recalculate severity",
    logs: [
      "Running Neural Network classifier...",
      "Running Random Forest model...",
      "Running Isolation Forest anomaly detection...",
      "Cross-validating threat scores...",
      "Calculating confidence metrics..."
    ]
  },
  {
    id: 5,
    title: "Generating Automated Response Plan",
    description: "Deploy firewall rules, enable WAF, and apply rate limiting",
    logs: [
      "Generating remediation playbook...",
      "Deploying firewall rules...",
      "Enforcing WAF policies...",
      "Applying adaptive rate limits...",
      "Resetting compromised credentials..."
    ]
  },
  {
    id: 6,
    title: "Finalizing Threat Intelligence Report",
    description: "Recalculate system risk and generate remediation summary",
    logs: [
      "Compiling threat intelligence...",
      "Calculating risk reduction...",
      "Generating detailed report...",
      "Archiving findings...",
      "Report generation complete"
    ]
  }
];

const Resolve = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logPanelRef = useRef<HTMLDivElement>(null);
  const [detectedIssues, setDetectedIssues] = useState<DetectedIssue[]>([]);
  const [actionsTaken, setActionsTaken] = useState<ActionTaken[]>([]);

  // Simulated scan result - in production, get from context/state
  const threatScore = 78;
  const domain = "example.com";
  
  // Random values for stats - generated each render (these will be regenerated on Run Again)
  const ipsBlocked = Math.floor(5 + Math.random() * 20);
  const sessionsTerminated = Math.floor(20 + Math.random() * 50);
  const rateLimits = Math.floor(2 + Math.random() * 5);
  const firewallRules = Math.floor(5 + Math.random() * 10);
  const wafPolicies = Math.floor(3 + Math.random() * 8);
  const headersApplied = Math.floor(8 + Math.random() * 10);
  const falsePositiveReduction = Math.floor(20 + Math.random() * 25);
  
  // Calculate scores
  const beforeScore = threatScore;
  const afterScore = Math.max(5, Math.round(threatScore * (0.15 + Math.random() * 0.2)));
  const riskReduction = Math.round((1 - afterScore / beforeScore) * 100);
  const aiConfidenceBefore = 91;
  const aiConfidenceAfter = Math.min(99, aiConfidenceBefore + Math.round(riskReduction * 0.1));
  const threatNeutralizationRate = Math.min(99, 70 + Math.round(riskReduction * 0.3));

  useEffect(() => {
    if (logPanelRef.current) {
      logPanelRef.current.scrollTop = logPanelRef.current.scrollHeight;
    }
  }, [logs]);

  const startResolution = () => {
    // Generate new random issues and actions each time
    const newIssues = generateDetectedIssues(threatScore);
    const newActions = generateActionsTaken(newIssues);
    setDetectedIssues(newIssues);
    setActionsTaken(newActions);
    
    setIsRunning(true);
    setCurrentStep(0);
    setLogs(["[THREAT RESOLUTION ENGINE]", "Initializing autonomous remediation workflow...", ""]);
    
    let stepIndex = 0;
    let logIndex = 0;
    
    const runStep = () => {
      if (stepIndex >= RESOLUTION_STEPS.length) {
        setIsComplete(true);
        setIsRunning(false);
        return;
      }

      const step = RESOLUTION_STEPS[stepIndex];
      
      setLogs(prev => [...prev, `[STEP ${step.id}/6] ${step.title}`, ""]);

      const runLogs = () => {
        if (logIndex >= step.logs.length) {
          setCurrentStep(stepIndex + 1);
          logIndex = 0;
          stepIndex++;
          setTimeout(runStep, 200);
          return;
        }

        setLogs(prev => [...prev, `  → ${step.logs[logIndex]}`]);
        logIndex++;
        setTimeout(runLogs, 80 + Math.random() * 50);
      };

      runLogs();
    };

    setTimeout(runStep, 100);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      default: return "text-blue-500";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/10 border-red-500/30";
      case "high": return "bg-orange-500/10 border-orange-500/30";
      case "medium": return "bg-yellow-500/10 border-yellow-500/30";
      default: return "bg-blue-500/10 border-blue-500/30";
    }
  };

  if (threatScore <= 20) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-16 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-green-500" />
          <h1 className="text-3xl font-display font-bold mb-4">System Secure</h1>
          <p className="text-muted-foreground mb-8">No significant threats detected. Your system is protected.</p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold mb-3">Threat Resolution Engine</h1>
          <p className="text-muted-foreground text-lg">Autonomous AI Remediation Workflow</p>
          <p className="text-sm text-muted-foreground mt-2 font-mono">{domain} — {new Date().toLocaleString()}</p>
        </div>

        {!isRunning && !isComplete && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-8 mb-8">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-amber-500" />
              <h2 className="text-2xl font-display font-bold mb-4">Threats Detected</h2>
              <p className="text-muted-foreground mb-6">
                Your scan detected a risk score of <span className="text-red-400 font-bold">{threatScore}</span>. 
                <br />
                <span className="text-sm">{detectedIssues.length} security issues identified requiring immediate attention.</span>
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleGoBack}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={startResolution}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Resolve Detected Threats
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step Pipeline */}
        {(isRunning || isComplete) && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
              {RESOLUTION_STEPS.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep && isRunning;
                
                return (
                  <div
                    key={step.id}
                    className={`p-3 rounded-lg border text-center ${
                      isCompleted 
                        ? "bg-green-500/10 border-green-500/30" 
                        : isActive 
                          ? "bg-blue-500/10 border-blue-500/30"
                          : "bg-card/30 border-border"
                    }`}
                  >
                    <div className="flex justify-center mb-1">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : isActive ? (
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className={`text-xs font-medium ${
                      isCompleted ? "text-green-500" : isActive ? "text-blue-500" : "text-muted-foreground"
                    }`}>
                      {step.title.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Log Panel */}
            <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-4 mb-6">
              <h3 className="text-sm font-mono font-medium mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Remediation Logs
              </h3>
              <div 
                ref={logPanelRef}
                className="bg-black/60 rounded-lg p-4 h-48 overflow-y-auto font-mono text-xs space-y-0.5"
              >
                {logs.map((log, index) => (
                  <div 
                    key={index} 
                    className={`${
                      log.startsWith("[STEP") ? "text-amber-400 font-semibold" : 
                      log.startsWith("  →") ? "text-green-400" : 
                      log.startsWith("[") ? "text-blue-400 font-medium" : 
                      "text-muted-foreground"
                    }`}
                  >
                    {log}
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Processing...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Final Report */}
        {isComplete && (
          <div className="max-w-5xl mx-auto">
            {/* Score Comparison */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Before Resolution</p>
                <p className="text-5xl font-display font-bold text-red-500">{beforeScore}</p>
                <p className="text-sm text-muted-foreground mt-2">Risk Score</p>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-green-500/30 p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">After Resolution</p>
                <p className="text-5xl font-display font-bold text-green-500">{afterScore}</p>
                <p className="text-sm text-muted-foreground mt-2">Risk Score</p>
              </div>
            </div>

            {/* Status Banner */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6 text-center">
              <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <h2 className="text-2xl font-display font-bold text-green-500 mb-2">Threats Neutralized</h2>
              <p className="text-muted-foreground">
                AI Confidence: {aiConfidenceBefore}% → {aiConfidenceAfter}%
              </p>
            </div>

            {/* Detailed Report Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Detected Issues */}
              <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6">
                <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-amber-500" />
                  Detected Issues ({detectedIssues.length})
                </h3>
                <div className="space-y-3">
                  {detectedIssues.map((issue, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getSeverityBg(issue.severity)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`w-4 h-4 ${getSeverityColor(issue.severity)}`} />
                          <span className="text-sm font-medium">{issue.issue}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded ${getSeverityBg(issue.severity)} ${getSeverityColor(issue.severity)}`}>
                          {issue.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 ml-6">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-500">{issue.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions to Take - Recommendations */}
              <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6">
                <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Recommended Actions ({actionsTaken.length})
                </h3>
                <div className="space-y-3">
                  {actionsTaken.map((action, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{action.action}</p>
                        <p className="text-xs text-muted-foreground">{action.target}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Network & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Network className="w-5 h-5 text-cyan-500" />
                  <h4 className="font-medium">Network Security</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IPs Blocked</span>
                    <span className="font-mono text-green-500">{ipsBlocked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sessions Terminated</span>
                    <span className="font-mono text-green-500">{sessionsTerminated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate Limits Applied</span>
                    <span className="font-mono text-green-500">{rateLimits}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-5 h-5 text-purple-500" />
                  <h4 className="font-medium">System Hardening</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Firewall Rules</span>
                    <span className="font-mono text-green-500">{firewallRules}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">WAF Policies</span>
                    <span className="font-mono text-green-500">{wafPolicies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Headers Applied</span>
                    <span className="font-mono text-green-500">{headersApplied}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Fingerprint className="w-5 h-5 text-amber-500" />
                  <h4 className="font-medium">ML Analysis</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Models Used</span>
                    <span className="font-mono">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">False Positives</span>
                    <span className="font-mono text-green-500">-{falsePositiveReduction}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidence Boost</span>
                    <span className="font-mono text-green-500">+{aiConfidenceAfter - aiConfidenceBefore}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Stats */}
            <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-6 mb-6">
              <h3 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-green-500" />
                Resolution Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl font-display font-bold text-green-500">{riskReduction}%</p>
                  <p className="text-sm text-muted-foreground">Risk Reduction</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-green-500">{threatNeutralizationRate}%</p>
                  <p className="text-sm text-muted-foreground">Threats Neutralized</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-blue-500">{detectedIssues.length}</p>
                  <p className="text-sm text-muted-foreground">Issues Resolved</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-green-500">Secured</p>
                  <p className="text-sm text-muted-foreground">System Status</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => { setIsComplete(false); setCurrentStep(0); setLogs([]); }}
                className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Run Again
              </button>
              <button
                onClick={handleGoBack}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Return to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default Resolve;
