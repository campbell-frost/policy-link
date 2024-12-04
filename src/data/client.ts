import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

export const supabase = createClient<Database>(process.env.SUPABASE_PUBLIC_URL!, process.env.SUPABASE_PUBLIC_ANON_KEY!)