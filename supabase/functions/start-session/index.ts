import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeadersFor } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  Deno.env.get("SUPABASE_SECRET_KEY") ??
  "";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

export default {
  fetch: async (req: Request) => {
    const cors = corsHeadersFor(req.headers.get("origin"));

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const { data, error } = await supabase
      .from("game_sessions")
      .insert({})
      .select("id")
      .single();

    if (error || !data) {
      return new Response(JSON.stringify({ error: "Could not start session" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ sessionId: data.id }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  },
};
