import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      
      // We do manual client-side redirection for simplicity since 
      // the route could be accessed directly
      if (!session && window.location.pathname !== "/admin/login") {
        navigate({ to: "/admin/login" });
      } else if (session && window.location.pathname === "/admin/login") {
        navigate({ to: "/admin" });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && window.location.pathname !== "/admin/login") {
        navigate({ to: "/admin/login" });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  const isLoginPage = window.location.pathname === "/admin/login";

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="admin-surface flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center gap-4">
          <h1 className="font-display text-xl font-semibold">Wedding Dashboard</h1>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            const message = "You are joyfully invited to the wedding of Eswar & Veena! 🌸 Please join us in our celebrations. Tap the link to view our wedding invitation and submit your RSVP: " + window.location.origin;
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
          }}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Invitation
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => supabase.auth.signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <Outlet />
      </main>
    </div>
  );
}
