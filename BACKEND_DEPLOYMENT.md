# Backend deployment (FastAPI + PostgreSQL)

Deploy the **backend** (Python FastAPI + PostgreSQL) on one of these platforms. The **frontend** stays on Vercel.

---

## Recommended platforms

| Platform   | Best for        | Free tier | PostgreSQL |
|-----------|------------------|-----------|------------|
| **Railway** | Easiest, one-click | Yes       | Yes (add-on) |
| **Render**  | Simple, good docs  | Yes       | Yes (free tier) |
| **Koyeb**   | Docker, simple     | Yes       | Yes (add-on) |
| **Fly.io**  | Global, containers | Yes       | Yes (add-on) |

---

## 1. Railway (recommended)

1. Go to [railway.app](https://railway.app) and sign in (e.g. GitHub).
2. **New Project** → **Deploy from GitHub** → select your repo.
3. **Root Directory:** Either:
   - Set **Root Directory** to **`backend`** (Railway uses `backend/Dockerfile`), or
   - Leave root as **`.`** (repo root). A **root-level `Dockerfile`** and **`railway.json`** are included so Railway builds the backend from root and you don’t get "Railpack could not determine how to build the app."
4. Railway will use the **Dockerfile** (from root or from `backend/`) and build with Docker (no Railpack).
5. Add **PostgreSQL**: in the project → **New** → **Database** → **PostgreSQL**. Railway sets `DATABASE_URL` automatically.
6. In the **backend service** → **Variables**, add:
   - `SECRET_KEY` – a long random string (e.g. from `openssl rand -hex 32`)
   - `GEMINI_API_KEY` – your Gemini API key
   - `GEMINI_MODEL` – e.g. `gemini-2.0-flash`
   - `CORS_ORIGINS` – your frontend URL, e.g. `https://your-app.vercel.app` (comma-separated if you have several)
   - `DATABASE_URL` is usually **auto-set** when you link PostgreSQL to the service; if not, copy it from the PostgreSQL service → **Connect**.
7. **Settings** → **Deploy**: ensure **Root Directory** is `backend` (or leave empty if using root Dockerfile). Build uses the Dockerfile; start command is `./start.sh` (set in `railway.json`—do **not** use `uvicorn ... $PORT` directly, as `$PORT` may not be expanded).
8. Deploy. Copy the public URL (e.g. `https://xxx.railway.app`) and set it as `NEXT_PUBLIC_API_URL` in Vercel (frontend).

### Railway: variables to set (Service → Variables)

| Variable | Required | Where to get it / example |
|----------|----------|---------------------------|
| `DATABASE_URL` | Yes | Usually **auto-set** when you add PostgreSQL and link it to the service. If not, copy from PostgreSQL service → Connect → Postgres connection URL. |
| `SECRET_KEY` | Yes | Long random string (e.g. run `openssl rand -hex 32` locally and paste). |
| `GEMINI_API_KEY` | Yes | Your API key from [Google AI Studio](https://aistudio.google.com/apikey). |
| `GEMINI_MODEL` | No | e.g. `gemini-2.0-flash` (default in code). |
| `CORS_ORIGINS` | Yes (prod) | Your Vercel frontend URL, e.g. `https://your-app.vercel.app` (comma-separated if several). |
| `ALGORITHM` | No | `HS256` (default). |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | `30` (default). |

---

## 2. Render

1. Go to [render.com](https://render.com) and sign in.
2. **New** → **Web Service** → connect your repo.
3. **Root Directory**: `backend`.
4. **Environment**: Python 3.
5. **Build Command**: `pip install -r requirements.txt`
6. **Start Command**: `./start.sh` (uses `backend/start.sh` so `PORT` is set correctly).
7. **New** → **PostgreSQL** to create a database; copy the **Internal Database URL** (or External if you need it from outside Render).
8. In the **Web Service** → **Environment**:
   - `DATABASE_URL` = the PostgreSQL URL from step 7
   - `SECRET_KEY` = long random string
   - `GEMINI_API_KEY` = your Gemini key
   - `GEMINI_MODEL` = e.g. `gemini-2.0-flash`
   - `CORS_ORIGINS` = `https://your-app.vercel.app`
9. Deploy. Use the Render URL as `NEXT_PUBLIC_API_URL` in Vercel.

---

## 3. Koyeb (Docker)

1. Go to [koyeb.com](https://www.koyeb.com) and sign in.
2. **Create App** → **Docker** → connect your GitHub repo.
3. **Dockerfile path**: `backend/Dockerfile` (or set **Root directory** to `backend` and use `Dockerfile`).
4. **Port**: leave default or set to `8000`; Koyeb sets `PORT` at runtime (use `backend/start.sh` in the image).
5. **Add PostgreSQL**: Koyeb → **Data** → **PostgreSQL**; create a database and copy the connection URL.
6. **Environment variables** (in the service → **Variables**):
   - `DATABASE_URL` = PostgreSQL URL
   - `SECRET_KEY`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `CORS_ORIGINS` (same as table above).
7. Deploy. Use the Koyeb URL (e.g. `https://your-app.koyeb.app`) as `NEXT_PUBLIC_API_URL` in Vercel.

---

## 4. Fly.io

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

## Fix: SQLAlchemy e3q8 / connection errors on deploy

If you see **sqlalche.me/e/20/e3q8** or connection/OperationalError when deploying:

1. **DATABASE_URL** must be set in the platform (Railway/Render/etc.). If you added PostgreSQL, link it to the backend service so `DATABASE_URL` is set automatically.
2. **postgres:// vs postgresql://** – Some platforms set `postgres://`; the app converts it to `postgresql://` in code. If you set `DATABASE_URL` manually, use `postgresql://...`.
3. **Check the URL** – In Railway: PostgreSQL service → **Variables** or **Connect** → copy the URL. In Render: PostgreSQL → **Internal Database URL**. Paste it into your backend service’s `DATABASE_URL` (no quotes in the dashboard).
4. **Tables** – Tables are created on app startup. If the DB is unreachable at startup, the app still starts but logs a warning; fix `DATABASE_URL` and redeploy.

---

## After deployment

1. **Frontend**: In Vercel → **Settings** → **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL` = your backend URL (e.g. `https://xxx.railway.app` or `https://xxx.onrender.com`).
2. **Database**: Tables are created on first request (`Base.metadata.create_all` in `main.py`). To seed universities, run your seed script once (e.g. locally with `DATABASE_URL` pointing to the deployed DB, or via a one-off job on the platform).
3. **CORS**: If the frontend is on a different domain, `CORS_ORIGINS` must include that exact URL (no trailing slash is safest).

---

## Quick summary

- **Railway**: GitHub → New Project → Root Directory `backend`, Builder Dockerfile, add Postgres, set env vars.
- **Render**: Web Service + PostgreSQL, Root Directory `backend`, Start Command `./start.sh`, same env vars.
- **Koyeb**: Docker deploy from repo, Dockerfile path `backend/Dockerfile`, add Postgres, set env vars.
- **Fly.io**: CLI (`fly launch` from `backend`), Postgres add-on, `fly secrets` for env.

Use the same env vars everywhere; only the **backend URL** and **CORS_ORIGINS** change per deployment.
