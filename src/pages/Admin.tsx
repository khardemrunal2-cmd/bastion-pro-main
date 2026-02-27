import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!data) {
        setIsAdmin(false);
        return;
      }
      setIsAdmin(true);
      fetchRequests();
    };
    checkAccess();
  }, [navigate]);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("demo_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load requests");
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("demo_requests").update({ status }).eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      toast.success(`Status updated to ${status}`);
    }
  };

  const deleteRequest = async (id: string) => {
    const { error } = await supabase.from("demo_requests").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      toast.success("Request deleted");
    }
  };

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-2 text-destructive">Access Denied</h1>
            <p className="text-muted-foreground">You do not have admin privileges.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold">
            Admin <span className="text-primary text-glow">Dashboard</span>
          </h1>
          <Button variant="outline" size="sm" onClick={fetchRequests} className="border-primary/40 text-primary hover:bg-primary/10 gap-1">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 text-center card-glow">
            <p className="text-3xl font-display font-bold text-primary">{requests.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Requests</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center card-glow">
            <p className="text-3xl font-display font-bold text-primary">
              {requests.filter((r) => r.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Pending</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center card-glow">
            <p className="text-3xl font-display font-bold text-primary">
              {requests.filter((r) => r.status === "contacted").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Contacted</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No demo requests yet.</div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-card border border-border rounded-xl p-6 card-glow-hover">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{req.name}</h3>
                      <Badge variant={req.status === "pending" ? "secondary" : "default"}>
                        {req.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{req.email} · {req.company}</p>
                    {req.message && <p className="text-sm text-foreground/80 mt-2">{req.message}</p>}
                    <p className="text-xs text-muted-foreground">{new Date(req.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {req.status === "pending" && (
                      <Button size="sm" onClick={() => updateStatus(req.id, "contacted")} className="text-xs">
                        Mark Contacted
                      </Button>
                    )}
                    {req.status === "contacted" && (
                      <Button size="sm" onClick={() => updateStatus(req.id, "closed")} variant="secondary" className="text-xs">
                        Close
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => deleteRequest(req.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
