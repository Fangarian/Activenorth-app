# Supabase Setup — Activenorth Guest Declaration App

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up / log in
2. Click **New project**
3. Give it a name (e.g. `activenorth`), choose a region close to Norway (e.g. Frankfurt `eu-central-1`)
4. Set a strong database password and save it somewhere safe
5. Click **Create new project** — it takes about a minute to provision

---

## 2. Run the SQL script

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **+ New query**
3. Paste the entire SQL block below and click **Run**

```sql
-- Tables

CREATE TABLE tour_groups (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name             TEXT NOT NULL,
  date             DATE NOT NULL DEFAULT CURRENT_DATE,
  expected_guests  INTEGER,
  sort_order       INTEGER DEFAULT 99,
  bus_number       INTEGER,       -- 1 or 2
  group_type       TEXT,          -- 'dog' or 'snow'
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE signatures (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name       TEXT NOT NULL,    -- first + last combined
  first_name       TEXT NOT NULL,
  last_name        TEXT NOT NULL,
  date_of_birth    DATE NOT NULL,
  nationality      TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT NOT NULL,
  tour_group_id    UUID REFERENCES tour_groups(id),
  signature_data   TEXT NOT NULL,    -- base64 PNG, never delete
  signed_at        TIMESTAMPTZ DEFAULT NOW(),
  waiver_version   TEXT NOT NULL,    -- e.g. '1.0', '1.1'
  children         JSONB DEFAULT '[]',  -- array of {name, age}
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE no_shows (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_group_id    UUID REFERENCES tour_groups(id),
  count            INTEGER NOT NULL DEFAULT 1,
  names            TEXT,              -- optional comma-separated names
  recorded_date    DATE NOT NULL,
  recorded_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE waiver_versions (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  version          TEXT NOT NULL UNIQUE,  -- e.g. '1.0', '1.1'
  content_html     TEXT NOT NULL,         -- full HTML content of the waiver
  uploaded_at      TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by      TEXT,
  is_active        BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_sigs_group    ON signatures(tour_group_id);
CREATE INDEX idx_groups_date   ON tour_groups(date);
CREATE INDEX idx_noshows_group ON no_shows(tour_group_id);

-- Enable Row Level Security
ALTER TABLE tour_groups     ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatures      ENABLE ROW LEVEL SECURITY;
ALTER TABLE no_shows        ENABLE ROW LEVEL SECURITY;
ALTER TABLE waiver_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (password protection is handled in the app)
CREATE POLICY "all tour_groups"    ON tour_groups     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "select signatures"  ON signatures      FOR SELECT USING (true);
CREATE POLICY "insert signatures"  ON signatures      FOR INSERT WITH CHECK (true);
-- No DELETE policy on signatures — legal records, never delete
CREATE POLICY "all no_shows"       ON no_shows        FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "all waiver_versions" ON waiver_versions FOR ALL USING (true) WITH CHECK (true);
```

---

## 3. Get your API credentials

1. In Supabase, go to **Project Settings** → **API**
2. Copy two values:
   - **Project URL** (looks like `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ…`)

---

## 4. Add credentials to the HTML files

Open **both** `guest.html` and `staff.html` in a text editor.

At the top of each file, find this block (it appears near the top inside a `<script>` tag):

```js
const SUPABASE_URL  = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON = 'YOUR_SUPABASE_ANON_KEY';
```

Replace:
- `YOUR_SUPABASE_URL` → your Project URL
- `YOUR_SUPABASE_ANON_KEY` → your anon public key

Example:
```js
const SUPABASE_URL  = 'https://abcdefgh.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

---

## 5. Change the staff passwords

In `staff.html`, find this block:

```js
const USERS = {
  admin: { password: 'CHANGE_ME_ADMIN', role: 'admin' },
  camp:  { password: 'CHANGE_ME_CAMP',  role: 'camp'  }
};
```

Replace `CHANGE_ME_ADMIN` and `CHANGE_ME_CAMP` with your chosen passwords.

---

## 6. Add your first waiver

After deploying, log in to `staff.html` as admin, go to **Waiver Manager**, paste in your declaration HTML, set version `1.0`, and click **Upload and Activate**.

---

## Important notes

- **Signatures are permanent legal records** — there is no DELETE policy on the `signatures` table. Never expose a delete button in the UI.
- The `anon` key is safe to include in browser-facing code. It only has the permissions defined by the RLS policies above.
- The `signatures` table has no UPDATE policy either — records are immutable once created.
