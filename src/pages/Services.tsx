import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Brain, Layers, Shield, Wifi, FileText, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Brain, title: "AI Threat Detection", desc: "Adaptive neural networks analyze network behavior in real-time, detecting anomalies invisible to rule-based systems." },
  { icon: Layers, title: "Multi-Layer Defense", desc: "7 layers of security: network, application, data, endpoint, cloud, identity, and behavioral." },
  { icon: Shield, title: "Zero-Day Protection", desc: "Sandboxed execution environments test suspicious payloads before they reach your infrastructure." },
  { icon: Globe, title: "Threat Intelligence", desc: "18 global threat intelligence feeds aggregated and correlated in real-time for comprehensive coverage." },
  { icon: FileText, title: "Compliance Reporting", desc: "Automated GDPR, HIPAA, and PCI-DSS compliance reports generated on demand." },
  { icon: Wifi, title: "IoT Security", desc: "Extending AI-driven protection to IoT endpoints with lightweight edge agents." },
];

const Services = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Our <span className="text-primary text-glow">Services</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Enterprise-grade cybersecurity powered by artificial intelligence. Scalable to 50,000+ endpoints.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-xl p-6 card-glow-hover group">
              <s.icon className="w-8 h-8 text-primary mb-4 group-hover:drop-shadow-[0_0_10px_hsl(180_100%_50%/0.5)] transition-all" />
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-display font-bold mb-4">Ready to secure your enterprise?</h2>
        <Link to="/contact">
          <Button className="font-display tracking-wider uppercase px-8 py-4 text-sm">
            Get Started
          </Button>
        </Link>
      </section>
    </main>
    <FooterSection />
  </div>
);

export default Services;
