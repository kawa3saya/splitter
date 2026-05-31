import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

let client: SupabaseClient<Database> | undefined;

function getClient(): SupabaseClient<Database> {
  if (client) {
    return client;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are not configured");
  }

  client = createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return client;
}

// The client is created lazily on first use rather than at module load.
// `next build` imports this module while collecting page data, but the
// Supabase service role key is a runtime-only secret that is not available
// at build time. Deferring creation keeps the build independent of it.
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop) {
    const value = Reflect.get(getClient(), prop);
    return typeof value === "function" ? value.bind(getClient()) : value;
  },
});
