import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  const scrollToTop = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 relative">
      <div className="cyber-line mb-16" />
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-display font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          From Reactive Defense to{" "}
          <span className="text-primary text-glow">Proactive Protection</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Scan your infrastructure now and get an AI-powered security intelligence report in seconds.
        </motion.p>

        <motion.button
          onClick={scrollToTop}
          className="px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-lg text-sm tracking-wider uppercase hover:shadow-[0_0_30px_hsl(180_100%_50%/0.4)] transition-all duration-300 flex items-center gap-2 cursor-pointer mx-auto"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Start Your Free Scan
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
};

export default CTASection;
