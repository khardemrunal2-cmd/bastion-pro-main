import { motion } from "framer-motion";

const milestones = [
  { date: "Q2 2024", title: "Quantum-Resistant Encryption", desc: "Post-quantum cryptographic algorithms for future-proof security." },
  { date: "Q3 2024", title: "IoT Security Extension", desc: "Expand protection to IoT devices and edge computing environments." },
  { date: "Q4 2024", title: "Autonomous AI Response", desc: "Fully autonomous threat response with zero human intervention." },
  { date: "2025", title: "Blockchain Verification", desc: "Decentralized threat intelligence sharing via blockchain ledger." },
];

const RoadmapSection = () => {
  return (
    <section id="roadmap" className="py-24 bg-gradient-section relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-display tracking-widest uppercase mb-3">Roadmap</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            What's <span className="text-primary text-glow">Next</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 md:-translate-x-px" />

          <div className="space-y-12">
            {milestones.map((ms, i) => (
              <motion.div
                key={i}
                className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-2 shadow-[0_0_10px_hsl(180_100%_50%/0.5)]" />

                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] p-6 rounded-xl bg-card border border-border card-glow-hover ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <span className="text-xs font-display text-primary tracking-widest uppercase">{ms.date}</span>
                  <h3 className="font-display font-semibold text-lg mt-2 mb-2">{ms.title}</h3>
                  <p className="text-muted-foreground text-sm">{ms.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
