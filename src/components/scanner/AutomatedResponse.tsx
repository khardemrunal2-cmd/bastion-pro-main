import { useState } from "react";
import type { ScanResult } from "@/lib/scanEngine";
import { Shield, Ban, Unplug, Bomb, Flame, Wrench, CheckCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Props {
  result: ScanResult;
}

const AutomatedResponse = ({ result }: Props) => {
  const [autoMitigate, setAutoMitigate] = useState(false);
  const ra = result.responseActions;

  const actions = [
    { icon: Ban, label: "Malicious IP blocked", value: ra.blockedIP, status: "Blocked" },
    { icon: Unplug, label: "Suspicious endpoint isolated", value: ra.isolatedEndpoint, status: "Isolated" },
    { icon: Bomb, label: "Payload neutralized", value: ra.payloadNeutralized ? "Threat neutralized" : "Pending", status: ra.payloadNeutralized ? "Neutralized" : "Pending" },
    { icon: Flame, label: "Firewall rule generated", value: ra.firewallRule, status: "Active" },
    { icon: Wrench, label: "Patch recommendation", value: ra.patchRecommendation, status: "Generated" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-display font-bold">AI Auto-Containment Actions</h3>
        </div>
      </div>

      <div className="space-y-2">
        {actions.map((action, i) => (
          <div key={i} className="flex items-center gap-4 bg-card/60 backdrop-blur-sm rounded-lg border border-border p-4 card-glow-hover">
            <action.icon className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{action.label}</div>
              <div className="text-xs text-muted-foreground font-mono truncate">{action.value}</div>
            </div>
            <span className="text-xs font-display font-bold text-[hsl(var(--cyber-success))] px-2 py-1 rounded bg-[hsl(var(--cyber-success)/0.1)] border border-[hsl(var(--cyber-success)/0.2)]">
              {action.status}
            </span>
          </div>
        ))}
      </div>

      {/* Auto mitigation toggle */}
      <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-primary/20 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display font-semibold text-sm">Enable Automatic Mitigation</span>
            <p className="text-xs text-muted-foreground mt-1">Automatically contain and neutralize detected threats</p>
          </div>
          <Switch checked={autoMitigate} onCheckedChange={setAutoMitigate} />
        </div>
        {autoMitigate && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[hsl(var(--cyber-success)/0.08)] border border-[hsl(var(--cyber-success)/0.2)] animate-fade-in">
            <CheckCircle className="w-4 h-4 text-[hsl(var(--cyber-success))]" />
            <span className="text-sm text-[hsl(var(--cyber-success))]">
              Threat contained successfully. No lateral movement detected.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomatedResponse;
