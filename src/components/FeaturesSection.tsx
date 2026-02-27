import { Network, Layers, Box, Globe, FileText } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Network, title: "Adaptive Neural Networks", desc: "Self-evolving AI models that continuously learn from new threat patterns and attack vectors." },
  { icon: Layers, title: "Multi-Layered Defense", desc: "7 distinct security layers providing defense-in-depth from network perimeter to endpoint." },
  { icon: Box, title: "Sandboxed Execution", desc: "Isolated detonation environments for safe analysis of suspicious files and payloads." },
  { icon: Globe, title: "Threat Intelligence API", desc: "Real-time feeds from 18 global threat intelligence sources for comprehensive coverage." },
  { icon: FileText, title: "Automated Reporting", desc: "Compliance-ready reports for GDPR, HIPAA, and PCI-DSS with one-click generation." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="cyber-line mb-16" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-display tracking-widest uppercase mb-3">Core Features</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Enterprise-Grade <span className="text-primary text-glow">Capabilities</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-xl bg-card border border-border card-glow card-glow-hover group overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-3">{feat.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
