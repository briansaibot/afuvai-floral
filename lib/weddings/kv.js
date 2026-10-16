/* Tiny key-value store for the wedding booking system, on Postgres.
 * Uses POSTGRES_URL / DATABASE_URL (set automatically when a Vercel Storage database such as
 * Supabase or Neon is connected to the project). The table creates itself on first use.
 * Fallback: Supabase REST with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_KEY (run docs/weddings-booking.sql once). */
import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";

const dbUrl = () => process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || "";
let _sql = null, _ready = null;
function sql() {
  if (!_sql) {
    _sql = postgres(dbUrl(), { prepare: false, max: 1, idle_timeout: 20, onnotice: () => {}, ssl: /localhost|127\.0\.0\.1/.test(dbUrl()) ? false : "require" });
  }
  if (!_ready) {
    _ready = _sql`create table if not exists wedding_kv (
      store text not null, key text not null, value jsonb not null,
      updated_at timestamptz not null default now(), primary key (store, key))`.then(() => true, (e) => { _ready = null; throw e; });
  }
  return _ready.then(() => _sql);
}

let _sb = null;
function sb() {
  if (_sb) { return _sb; }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { throw new Error("Booking storage is not configured: connect a Postgres database (POSTGRES_URL) to the Vercel project."); }
  _sb = createClient(url, key, { auth: { persistSession: false } });
  return _sb;
}

function pgStore(store) {
  return {
    async get(key) {
      const db = await sql();
      const rows = await db`select value from wedding_kv where store = ${store} and key = ${key}`;
      return rows.length ? rows[0].value : null;
    },
    async setJSON(key, value) {
      const db = await sql();
      await db`insert into wedding_kv (store, key, value, updated_at) values (${store}, ${key}, ${db.json(value)}, now())
        on conflict (store, key) do update set value = excluded.value, updated_at = now()`;
    },
    async set(key, value) { return this.setJSON(key, value); },
    async delete(key) { const db = await sql(); await db`delete from wedding_kv where store = ${store} and key = ${key}`; },
    async values() { const db = await sql(); return db`select key, value from wedding_kv where store = ${store} limit 5000`; }
  };
}

function sbStore(store) {
  return {
    async get(key) {
      const { data, error } = await sb().from("wedding_kv").select("value").eq("store", store).eq("key", key).maybeSingle();
      if (error) { throw error; }
      return data ? data.value : null;
    },
    async setJSON(key, value) {
      const { error } = await sb().from("wedding_kv").upsert({ store, key, value, updated_at: new Date().toISOString() });
      if (error) { throw error; }
    },
    async set(key, value) { return this.setJSON(key, value); },
    async delete(key) { const { error } = await sb().from("wedding_kv").delete().eq("store", store).eq("key", key); if (error) { throw error; } },
    async values() { const { data, error } = await sb().from("wedding_kv").select("key,value").eq("store", store).limit(5000); if (error) { throw error; } return data || []; }
  };
}

export function getStore(store) { return dbUrl() ? pgStore(store) : sbStore(store); }
