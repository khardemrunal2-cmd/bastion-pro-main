import { Brain, ScanEye, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  { icon: Brain, title: "Behavioral Analysis", desc: "Deep learning models profile normal network behavior to detect anomalies in real-time." },
  { icon: ScanEye, title: "Zero-Day Detection", desc: "Identifies previously unknown threats using adversarial AI and sandboxed detonation." },
  { icon: Zap, title: "Automated Response", desc: "Instant containment and remediation — no human intervention required." },
  { icon: Target, title: "99.7% Accuracy", desc: "Ensemble ML models achieve near-perfect detection with minimal false positives." },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-24 bg-gradient-section relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-display tracking-widest uppercase mb-3">Our Solution</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            AI-Powered Threat <span className="text-primary text-glow">Detection Engine</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              className="flex gap-5 p-6 rounded-xl bg-card border border-border card-glow-hover group"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <cap.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cap.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workflow diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {["Data Ingestion", "AI Analysis", "Threat Classification", "Auto Response"].map((step, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <div className="px-6 py-3 rounded-lg border border-primary/30 bg-primary/5 text-center">
                <span className="text-xs font-display text-primary tracking-wider uppercase">{step}</span>
              </div>
              {i < 3 && (
                <div className="hidden md:block w-8 h-px bg-primary/40" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
