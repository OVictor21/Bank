# Running the project locally

## Prerequisites
- **Node.js 20.19+ or 22+** (Vite 8 requires it). Check: `node -v`
- npm (comes with Node)
- Git

## Steps

1. **Clone the repo**
   ```bash
   git clone https://github.com/OVictor21/Bank.git
   cd Bank
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root (same folder as `package.json`).
   This file is gitignored on purpose — get the values from the team.
   ```
   VITE_SUPABASE_URL=https://zkgzuxbjlteqqlbuujol.supabase.co
   VITE_SUPABASE_ANON_KEY=<the anon public key from the team>
   ```
   > The `anon` key is safe to share within the team — it is the public client key
   > (Row Level Security protects the data). Do NOT put the `service_role` key here.

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open the printed URL (default http://localhost:5173).

## Common issues
- **Blank page / "supabaseUrl is required"** → `.env` is missing or misnamed.
  It must be exactly `.env` in the repo root, and you must restart `npm run dev`
  after creating it (Vite only reads env vars at startup).
- **`npm run dev` fails about Node version** → upgrade Node to 20.19+ or 22+.
- **Login/signup "Email is invalid"** → use a real-looking domain (e.g. `@gmail.com`);
  Supabase rejects `@example.com`.

## Notes
- The database schema is already applied to the shared Supabase project, so you
  do not need to run any SQL to use the app.
- The `supabase/functions/` (Increase BaaS) code is only needed for the real-money
  work and is deployed separately — not required to run the app locally.
