import { useState, useEffect } from "react";
import { Shield, Menu, X, LogIn } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        setIsAdmin(!!data);
      } else {
        setIsAdmin(false);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        setIsAdmin(!!data);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_8px_hsl(180_100%_50%/0.6)] transition-all" />
          <span className="font-display font-bold text-lg">SecureBot</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                location.pathname === "/admin" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Admin
            </Link>
          )}
          {user ? (
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-primary/40 text-primary hover:bg-primary/10">
              Logout
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10 gap-1">
                <LogIn className="w-4 h-4" /> Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground cursor-pointer" aria-label="Toggle menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium tracking-wide uppercase py-2 transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="block text-sm font-medium tracking-wide uppercase py-2 text-muted-foreground hover:text-primary">
              Admin
            </Link>
          )}
          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-sm font-medium text-primary cursor-pointer">Logout</button>
          ) : (
            <Link to="/auth" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-primary">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
