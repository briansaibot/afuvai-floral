/* Tiny key-value store on Supabase (table wedding_kv, see docs/weddings-booking.sql).
 * Same shape as the Netlify Blobs API the booking code was written against. */
import { createClient } from "@supabase/supabase-js";

let _sb = null;
function sb() {
  if (_sb) { return _sb; }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) { throw new Error("Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY)."); }
  _sb = createClient(url, key, { auth: { persistSession: false } });
  return _sb;
}
export function getStore(store) {
  return {
    async get(key, opt) {
      const { data, error } = await sb().from("wedding_kv").select("value").eq("store", store).eq("key", key).maybeSingle();
      if (error) { throw error; }
      if (!data) { return null; }
      return opt && opt.type === "json" ? data.value : (typeof data.value === "string" ? data.value : JSON.stringify(data.value));
    },
    async setJSON(key, value) {
      const { error } = await sb().from("wedding_kv").upsert({ store, key, value, updated_at: new Date().toISOString() });
      if (error) { throw error; }
    },
    async set(key, value) { return this.setJSON(key, value); },
    async delete(key) {
      const { error } = await sb().from("wedding_kv").delete().eq("store", store).eq("key", key);
      if (error) { throw error; }
    },
    async values() {
      const { data, error } = await sb().from("wedding_kv").select("key,value").eq("store", store).limit(5000);
      if (error) { throw error; }
      return data || [];
    }
  };
}
