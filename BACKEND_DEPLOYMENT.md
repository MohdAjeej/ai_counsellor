# Backend deployment (FastAPI + PostgreSQL)

Deploy the **backend** (Python FastAPI + PostgreSQL) on one of these platforms. The **frontend** stays on Vercel.

---

## Recommended platforms

| Platform   | Best for        | Free tier | PostgreSQL |
|-----------|------------------|-----------|------------|
| **Railway** | Easiest, one-click | Yes       | Yes (add-on) |
| **Render**  | Simple, good docs  | Yes       | Yes (free tier) |
| **Fly.io**  | Global, containers | Yes       | Yes (add-on) |

---

## 1. Railway (recommended)

1. Go to [railway.app](https://railway.app) and sign in (e.g. GitHub).
2. **New Project** → **Deploy from GitHub** → select your repo.
3. **Important:** Set **Root Directory** to **`backend`** (so Railway sees `Dockerfile` and `requirements.txt`). If you skip this, you get "Error creating build plan with Railpack."
4. Railway will detect the **Dockerfile** in `backend/` and build with Docker (no Railpack needed).
5. Add **PostgreSQL**: in the project → **New** → **Database** → **PostgreSQL**. Railway sets `DATABASE_URL` automatically.
6. In the **backend service** → **Variables**, add:
   - `SECRET_KEY` – a long random string (e.g. from `openssl rand -hex 32`)
   - `GEMINI_API_KEY` – your Gemini API key
   - `GEMINI_MODEL` – e.g. `gemini-2.0-flash`
   - `CORS_ORIGINS` – your frontend URL, e.g. `https://your-app.vercel.app` (comma-separated if you have several)
7. **Settings** → **Deploy**: ensure **Root Directory** is `backend`. Build uses the Dockerfile; start command is in `railway.json` (or set **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`).
8. Deploy. Copy the public URL (e.g. `https://xxx.railway.app`) and set it as `NEXT_PUBLIC_API_URL` in Vercel (frontend).

---

## 2. Render

1. Go to [render.com](https://render.com) and sign in.
2. **New** → **Web Service** → connect your repo.
3. **Root Directory**: `backend`.
4. **Environment**: Python 3.
5. **Build Command**: `pip install -r requirements.txt`
6. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. **New** → **PostgreSQL** to create a database; copy the **Internal Database URL** (or External if you need it from outside Render).
8. In the **Web Service** → **Environment**:
   - `DATABASE_URL` = the PostgreSQL URL from step 7
   - `SECRET_KEY` = long random string
   - `GEMINI_API_KEY` = your Gemini key
   - `GEMINI_MODEL` = e.g. `gemini-2.0-flash`
   - `CORS_ORIGINS` = `https://your-app.vercel.app`
9. Deploy. Use the Render URL as `NEXT_PUBLIC_API_URL` in Vercel.

---

## 3. Fly.io

1. Install [flyctl](https://fly.io/docs/hackers/install-flyctl/) and sign in: `fly auth login`.
2. In your repo root: `cd backend` then `fly launch` (follow prompts; choose a region).
3. Add Postgres: `fly postgres create` (or attach an existing one).
4. Set secrets:
   ```bash
   fly secrets set SECRET_KEY="your-secret"
   fly secrets set GEMINI_API_KEY="your-key"
   fly secrets set GEMINI_MODEL="gemini-2.0-flash"
   fly secrets set CORS_ORIGINS="https://your-app.vercel.app"
   fly secrets set DATABASE_URL="postgresql://..."   # if not auto-linked
   ```
5. Deploy: `fly deploy` (from `backend` or with correct context).
6. Use the Fly URL (e.g. `https://your-app.fly.dev`) as `NEXT_PUBLIC_API_URL` in Vercel.

---

## Environment variables (all platforms)

| Variable                   | Required | Example / notes |
|---------------------------|----------|------------------|
| `DATABASE_URL`            | Yes      | `postgresql://user:pass@host:5432/dbname` (often set by platform) |
| `SECRET_KEY`              | Yes      | Long random string for JWT |
| `GEMINI_API_KEY`          | Yes      | From Google AI Studio |
| `GEMINI_MODEL`            | No       | e.g. `gemini-2.0-flash` (default in code) |
| `CORS_ORIGINS`            | Yes (prod) | Your Vercel URL, e.g. `https://ai-counsellor.vercel.app` |
| `ALGORITHM`               | No       | `HS256` (default) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No    | `30` (default) |

---

## After deployment

1. **Frontend**: In Vercel → **Settings** → **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL` = your backend URL (e.g. `https://xxx.railway.app` or `https://xxx.onrender.com`).
2. **Database**: Tables are created on first request (`Base.metadata.create_all` in `main.py`). To seed universities, run your seed script once (e.g. locally with `DATABASE_URL` pointing to the deployed DB, or via a one-off job on the platform).
3. **CORS**: If the frontend is on a different domain, `CORS_ORIGINS` must include that exact URL (no trailing slash is safest).

---

## Quick summary

- **Easiest**: Railway (GitHub → New Project → backend as root, add Postgres, set env vars).
- **Also easy**: Render (Web Service + PostgreSQL, set root to `backend`, same env vars).
- **More control**: Fly.io (CLI, Postgres add-on, `fly secrets` for env).

Use the same env vars everywhere; only the **backend URL** and **CORS_ORIGINS** change per deployment.
