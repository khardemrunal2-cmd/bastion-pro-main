import { Building2, Heart, ShoppingCart, Landmark, AlertTriangle, TrendingUp, Bug } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Bug, value: "12,000+", label: "New Malware Samples Daily" },
  { icon: TrendingUp, value: "$10.5T", label: "Projected Cybercrime Cost" },
  { icon: AlertTriangle, value: "Zero-Day", label: "Attacks Rising 143% YoY" },
];

const industries = [
  { icon: Landmark, label: "Banks & Finance", domain: "bankofamerica.com" },
  { icon: Heart, label: "Healthcare", domain: "mayoclinic.org" },
  { icon: ShoppingCart, label: "E-Commerce", domain: "shopify.com" },
  { icon: Building2, label: "Enterprises", domain: "microsoft.com" },
];

interface ProblemSectionProps {
  onScanIndustry?: (domain: string) => void;
}

const ProblemSection = ({ onScanIndustry }: ProblemSectionProps) => {
  const handleIndustryClick = (domain: string) => {
    if (onScanIndustry) {
      onScanIndustry(domain);
    }
  };

  return (
    <section id="problem" className="py-24 relative">
      <div className="cyber-line mb-16" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-display tracking-widest uppercase mb-3">The Crisis</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            The Rising Cyber Threat <span className="text-primary text-glow">Crisis</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Organizations face an unprecedented volume of sophisticated attacks — and traditional defenses are failing.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative p-8 rounded-xl bg-card border border-border card-glow card-glow-hover text-center group"
            >
              <stat.icon className="w-8 h-8 text-cyber-danger mx-auto mb-4 group-hover:text-primary transition-colors" />
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{stat.value}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Vulnerable Industries */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground mb-6 font-display tracking-wider uppercase">Industries at Risk — Click to Scan</p>
          <div className="flex flex-wrap justify-center gap-6">
            {industries.map((ind, i) => (
              <motion.button
                key={i}
                onClick={() => handleIndustryClick(ind.domain)}
                className="flex items-center gap-3 px-6 py-3 rounded-lg border border-border bg-secondary/50 hover:border-primary/40 hover:bg-primary/10 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(180 100% 50% / 0.2)" }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ind.icon className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">{ind.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
