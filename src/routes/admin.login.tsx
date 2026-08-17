import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { KolamDivider } from "@/components/wedding/Ornaments";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success("Successfully logged in");
      navigate({ to: "/admin" });
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="floral-field min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[var(--sage-deep)] text-[var(--cream)] border-[var(--blush)]/40 kolam-frame">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="font-display tracking-[0.25em] text-[var(--gold)] uppercase text-lg">Admin Login</CardTitle>
          <KolamDivider />
          <CardDescription className="text-[var(--cream)]/80">
            Enter your credentials to access the wedding dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required 
                className="bg-[var(--olive)] border-[var(--blush)]/40 text-[var(--cream)] placeholder:text-[var(--cream)]/40 focus-visible:ring-[var(--gold)]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="bg-[var(--olive)] border-[var(--blush)]/40 text-[var(--cream)] focus-visible:ring-[var(--gold)]"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[var(--gold)] text-[var(--sage-deep)] hover:bg-[var(--gold)]/90 mt-6"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
