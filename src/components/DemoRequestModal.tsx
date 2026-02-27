import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DemoRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoRequestModal = ({ open, onOpenChange }: DemoRequestModalProps) => {
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

      toast.success("Demo request submitted! We'll be in touch soon.");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      onOpenChange(false);
    } catch (error: any) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Request a Demo</DialogTitle>
          <DialogDescription>
            Fill in your details and our team will schedule a personalized demo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="modal-name">Full Name</Label>
            <Input id="modal-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required maxLength={100} className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modal-email">Work Email</Label>
            <Input id="modal-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" required maxLength={255} className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modal-company">Company</Label>
            <Input id="modal-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp" required maxLength={100} className="bg-secondary border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modal-message">Message (optional)</Label>
            <Textarea id="modal-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your needs..." rows={3} maxLength={1000} className="bg-secondary border-border" />
          </div>
          <Button type="submit" className="w-full font-display tracking-wider uppercase" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestModal;
