import { Cloud, Maximize, Plug, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "78%", label: "Faster Detection" },
  { value: "92%", label: "Fewer False Positives" },
  { value: "60%", label: "Reduced Breach Costs" },
];

const advantages = [
  { icon: Cloud, label: "Cloud-Native (Kubernetes)" },
  { icon: Maximize, label: "Scalable to 50,000 Endpoints" },
  { icon: Plug, label: "Open API Integration" },
  { icon: RefreshCw, label: "Self-Healing System" },
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 relative">
      <div className="cyber-line mb-16" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-display tracking-widest uppercase mb-3">Impact</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Measurable <span className="text-primary text-glow">Results</span>
          </h2>
        </motion.div>

        {/* Animated Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-8 rounded-xl border border-primary/20 bg-primary/5"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="text-5xl md:text-6xl font-display font-bold text-primary text-glow mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground font-display text-sm tracking-wider uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Advantages */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border card-glow-hover"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <adv.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{adv.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
