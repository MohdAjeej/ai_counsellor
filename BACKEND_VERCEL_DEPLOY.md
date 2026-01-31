# Deploy backend on Vercel (separate project)

The **backend** (FastAPI) must be a **separate Vercel project** from the frontend. Use the same GitHub repo and set **Root Directory** to **`backend`**.

---

## Step 1: Create a new Vercel project for the backend

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. **Import** the same repo: `MohdAjeej/ai_counsellor` (or your repo name).
3. **Important:** Before deploying, set **Root Directory**:
   - Click **Edit** next to "Root Directory".
   - Enter **`backend`** (no slash).
   - Confirm.

---

## Step 2: Environment variables

In the same project setup (or after: **Settings** → **Environment Variables**), add:

| Name | Value | Required |
|------|--------|----------|
| `DATABASE_URL` | Your PostgreSQL URL (e.g. Neon, Railway Postgres, Supabase) | Yes |
| `SECRET_KEY` | Long random string (e.g. `openssl rand -hex 32`) | Yes |
| `GEMINI_API_KEY` | Your Google AI Studio API key | Yes |
| `CORS_ORIGINS` | Your frontend URL, e.g. `https://your-frontend.vercel.app` | Yes |
| `GEMINI_MODEL` | `gemini-2.0-flash` (optional) | No |

Vercel does **not** host PostgreSQL. Use an external DB (Neon, Railway, Supabase, etc.) and put its connection URL in `DATABASE_URL`.

---

## Step 3: Deploy

- Click **Deploy**. Vercel will build from the `backend` folder, install deps from `requirements.txt`, and expose your FastAPI app as serverless functions.
- After deploy, copy the **Production URL** (e.g. `https://ai-counsellor-backend.vercel.app`).

---

## Step 4: Connect frontend to backend

- In your **frontend** Vercel project → **Settings** → **Environment Variables**.
- Add **`NEXT_PUBLIC_API_URL`** = your backend URL (e.g. `https://ai-counsellor-backend.vercel.app`).
- Redeploy the frontend so it uses the new API URL.

---

## Summary

- **Two Vercel projects:** one for frontend (Root Directory = `frontend`), one for backend (Root Directory = `backend`).
- **Backend project:** Root Directory = **`backend`**, add `DATABASE_URL`, `SECRET_KEY`, `GEMINI_API_KEY`, `CORS_ORIGINS`, then deploy.
- **Database:** Use an external PostgreSQL (Neon, Railway, Supabase); set `DATABASE_URL` in the backend project.

---

## Fix: 404 DEPLOYMENT_NOT_FOUND / "Nothing shows"

### 1. Use the correct URL

- **DEPLOYMENT_NOT_FOUND** means the link you opened points to a deployment that doesn’t exist (failed build, deleted, or wrong URL).
- **Do this:**
  1. Go to [vercel.com](https://vercel.com) → your **backend** project (the one with Root Directory = `backend`).
  2. Open the **Deployments** tab.
  3. Find a deployment with a **green checkmark** (succeeded).
  4. Use that deployment’s **Visit** link, or use the **Production URL** shown at the top of the project (e.g. `https://ai-counsellor-backend.vercel.app`).
- **Do not** use:
  - Links from **failed** deployments (red X).
  - Old preview URLs or URLs that contain a deployment ID.

### 2. If the latest deployment failed

- In **Deployments**, if the latest one has a red X, click it and fix the build error (or see the build logs).
- Then click **Redeploy** (or push a new commit) so a new deployment is created.
- After a **successful** deployment, use **its** URL (Production or the new deployment’s Visit link).

### 3. Check that the backend responds

- Open the **Production URL** in the browser (e.g. `https://your-backend.vercel.app`).
- You should see: `{"message":"AI Counsellor API","version":"1.0.0"}`.
- Try: `https://your-backend.vercel.app/health` → should show `{"status":"healthy"}`.
- If you get 404 on the **Production URL** itself, the deployment may have failed or the project may be misconfigured; check **Root Directory** = `backend` and redeploy.

### 4. Frontend: set backend URL

- In your **frontend** Vercel project → **Settings** → **Environment Variables**.
- Set **`NEXT_PUBLIC_API_URL`** = your backend **Production URL** (no trailing slash), e.g. `https://ai-counsellor-backend.vercel.app`.
- Redeploy the frontend so it uses this URL.
