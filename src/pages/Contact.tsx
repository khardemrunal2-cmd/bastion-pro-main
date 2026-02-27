import { useState } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("demo_requests").insert({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        message: message.trim(),
      });

      if (error) throw error;

      toast.success("Message sent! We'll be in touch within 24 hours.");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (error: any) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Get in <span className="text-primary text-glow">Touch</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact form */}
            <div className="bg-card border border-border rounded-xl p-8 card-glow">
              <h2 className="font-display text-xl font-semibold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required maxLength={100} className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" required maxLength={255} className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp" required maxLength={100} className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your security needs..." rows={4} maxLength={1000} className="bg-secondary border-border" />
                </div>
                <Button type="submit" className="w-full font-display tracking-wider uppercase" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-8 pt-4">
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-6">
                  Ready to protect your enterprise? Reach out and our security team will respond within 24 hours.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:contact@securebot.ai" className="text-foreground hover:text-primary transition-colors">contact@securebot.ai</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-foreground">+1 (555) 000-1234</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground">San Francisco, CA</span>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 border-glow">
                <h3 className="font-display font-semibold mb-2">Enterprise Demo</h3>
                <p className="text-muted-foreground text-sm">
                  Request a personalized demo of our AI-powered threat detection engine. See real-time behavioral analysis in action.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default Contact;
