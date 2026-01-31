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
