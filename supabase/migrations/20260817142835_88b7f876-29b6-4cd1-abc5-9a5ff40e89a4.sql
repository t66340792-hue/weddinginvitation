CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  attending boolean NOT NULL DEFAULT true,
  events text[] NOT NULL DEFAULT '{}',
  food_preference text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.rsvps TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rsvps TO authenticated;
GRANT ALL ON public.rsvps TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.admin_users (
  user_id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.admin_users TO authenticated;
GRANT ALL ON public.admin_users TO service_role;

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own admin row readable" ON public.admin_users
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = _user_id)
$$;

CREATE POLICY "anyone can submit rsvp" ON public.rsvps
FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "admins read rsvps" ON public.rsvps
FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "admins update rsvps" ON public.rsvps
FOR UPDATE TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "admins delete rsvps" ON public.rsvps
FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));