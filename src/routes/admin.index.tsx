import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetchRsvps();
  }, []);

  async function fetchRsvps() {
    try {
      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setFetchError(error.message);
        toast.error("Failed to load RSVPs: " + error.message);
        return;
      }
      console.log("Fetched RSVPs:", data);
      setRsvps(data || []);
    } catch (error: any) {
      console.error("Error fetching RSVPs:", error);
      setFetchError(error.message);
      toast.error("Failed to load RSVPs");
    } finally {
      setLoading(false);
    }
  }

  async function deleteRsvp(id: string, name: string) {
    const password = prompt(`To delete RSVP from "${name}", enter the admin password:`);
    if (password !== "Wedding@2026") {
      if (password !== null) toast.error("Incorrect password");
      return;
    }
    try {
      const { error } = await supabase.from("rsvps").delete().eq("id", id);
      if (error) throw error;
      setRsvps((prev) => prev.filter((r) => r.id !== id));
      toast.success(`Deleted RSVP from ${name}`);
    } catch (error: any) {
      toast.error("Failed to delete: " + error.message);
    }
  }

  const totalGuests = rsvps.reduce((acc, curr) => acc + (curr.attending ? curr.guests : 0), 0);
  const attendingCount = rsvps.filter(r => r.attending).length;
  const decliningCount = rsvps.filter(r => !r.attending).length;

  if (loading) return <div className="flex min-h-[200px] items-center justify-center">Loading dashboard...</div>;

  if (fetchError) {
    return (
      <div className="space-y-4 text-center py-12">
        <p className="text-red-500 font-medium">Error loading RSVPs: {fetchError}</p>
        <button onClick={() => { setFetchError(null); setLoading(true); fetchRsvps(); }} className="underline">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Overview</h2>
        <button
          onClick={() => { setLoading(true); fetchRsvps(); }}
          className="text-sm underline hover:no-underline"
        >
          Refresh
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rsvps.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expected Guests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Declined</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{decliningCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent RSVPs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead className="max-w-[200px]">Message</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsvps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No RSVPs found. Submit a test RSVP from the main site first.
                    </TableCell>
                  </TableRow>
                ) : (
                  rsvps.map((rsvp) => (
                    <TableRow key={rsvp.id}>
                      <TableCell className="font-medium">
                        <div>{rsvp.full_name}</div>
                        <div className="text-xs text-muted-foreground">{rsvp.email}</div>
                        <div className="text-xs text-muted-foreground">{rsvp.phone}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={rsvp.attending ? "default" : "destructive"}>
                          {rsvp.attending ? "Attending" : "Declined"}
                        </Badge>
                      </TableCell>
                      <TableCell>{rsvp.guests}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {rsvp.events?.map((e: string) => (
                            <Badge key={e} variant="outline" className="text-[10px]">
                              {e}
                            </Badge>
                          ))}
                        </div>
                        {rsvp.food_preference && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            Diet: {rsvp.food_preference}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {rsvp.message}
                      </TableCell>
                      <TableCell className="text-right text-xs">
                        {new Date(rsvp.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => deleteRsvp(rsvp.id, rsvp.full_name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
