
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews
CREATE POLICY "Anyone can read reviews"
  ON public.reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can insert reviews
CREATE POLICY "Anyone can insert reviews"
  ON public.reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
