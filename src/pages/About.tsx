import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Shield, Target, Users, Zap } from "lucide-react";

const values = [
  { icon: Shield, title: "Security First", desc: "Every decision we make starts with protecting our clients." },
  { icon: Target, title: "Precision", desc: "99.7% detection accuracy through continuous ML improvement." },
  { icon: Users, title: "Partnership", desc: "We embed with your team as trusted security advisors." },
  { icon: Zap, title: "Innovation", desc: "Quantum-resistant encryption and autonomous AI response." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          About <span className="text-primary text-glow">SecureBot</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
          SecureBot was founded with a single mission: make enterprise-grade cybersecurity accessible through artificial intelligence.
          Our team of security researchers, ML engineers, and enterprise architects build adaptive defense systems that evolve faster than threats.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-display font-bold mb-8">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card border border-border rounded-xl p-6 card-glow-hover">
              <v.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-display font-bold mb-6">Our Mission</h2>
        <div className="bg-card border border-border rounded-xl p-8 border-glow">
          <p className="text-foreground text-lg leading-relaxed">
            By 2025, cybercrime costs will reach $10.5 trillion annually. Traditional signature-based systems miss 60% of zero-day attacks.
            We're changing that with behavioral analysis, ensemble ML models, and autonomous threat response — protecting enterprises
            from threats that haven't been invented yet.
          </p>
        </div>
      </section>
    </main>
    <FooterSection />
  </div>
);

export default About;
