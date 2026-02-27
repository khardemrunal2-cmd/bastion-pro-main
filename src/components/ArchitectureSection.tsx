import { Monitor, Server, Cpu, Database } from "lucide-react";
import { motion } from "framer-motion";

const layers = [
  {
    icon: Monitor,
    title: "Frontend",
    color: "text-cyber-success",
    items: ["React Dashboard", "Live Threat Visualization", "Real-time Alerts"],
  },
  {
    icon: Server,
    title: "Backend",
    color: "text-primary",
    items: ["Node.js Microservices", "REST & GraphQL APIs", "Event-Driven Architecture"],
  },
  {
    icon: Cpu,
    title: "AI Engine",
    color: "text-cyber-accent2",
    items: ["TensorFlow & PyTorch", "Ensemble ML Models", "Adversarial Training"],
  },
  {
    icon: Database,
    title: "Data Layer",
    color: "text-cyber-warning",
    items: ["Time-Series DB", "Graph Database", "Elasticsearch Cluster"],
  },
];

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="py-24 bg-gradient-section relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-display tracking-widest uppercase mb-3">Architecture</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            System <span className="text-primary text-glow">Architecture</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {i < layers.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary/30" />
              )}
              <div className="p-6 rounded-xl bg-card border border-border card-glow card-glow-hover h-full">
                <layer.icon className={`w-8 h-8 ${layer.color} mb-4`} />
                <h3 className="font-display font-semibold mb-4">{layer.title}</h3>
                <ul className="space-y-2">
                  {layer.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
