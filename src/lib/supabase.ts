import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface Product {
  id: string;
  name: string;
  brand: string;
  status: string;
  created_at: string;
  updated_at: string;
  financial?: Record<string, unknown>;
  gate2?: Record<string, unknown>;
  gate3?: Record<string, unknown>;
  psf?: Record<string, unknown>;
  gate2_complete: boolean;
  gate3_complete: boolean;
  psf_complete: boolean;
}
