# Deploy backend – all code and steps

Use this checklist to deploy the **backend** (FastAPI + PostgreSQL). All required code is already in the repo.

---

## 1. Backend deployment code (already in repo)

| File | Purpose |
|------|--------|
| `backend/Dockerfile` | Docker image: Python 3.11, install deps, run `./start.sh` |
| `backend/start.sh` | Starts uvicorn with `PORT` from env (Railway sets this) |
| `backend/railway.json` | Tells Railway: use Dockerfile, healthcheck `/health`, timeout 90s |
| `backend/requirements.txt` | Python dependencies (FastAPI, SQLAlchemy, etc.) |
| `backend/.env.example` | Example env vars (copy for local; **do not** use in production) |
| `backend/.dockerignore` | Excludes `.env`, `venv`, etc. from Docker build |
| **Root (if Railway builds from repo root):** | |
| `Dockerfile` (root) | Copies `backend/` and runs same app |
| `railway.json` (root) | Same deploy config for root build |

**Application code (used by Docker):**  
`backend/main.py`, `backend/database.py`, `backend/models.py`, `backend/schemas.py`, `backend/auth.py`, `backend/ai_counsellor.py`, `backend/university_service.py`, `backend/seed_universities.py`

---

## 2. Deploy on Railway (step-by-step)

### A. Create project and backend service

1. Go to [railway.app](https://railway.app) → sign in (e.g. GitHub).
2. **New Project** → **Deploy from GitHub repo** → select your repo (`ai_counsellor` or your repo name).
3. **Root Directory** (in project or service settings):
   - **Option A:** Set to **`backend`** → Railway uses `backend/Dockerfile` and `backend/railway.json`.
   - **Option B:** Leave root as **`.`** (repo root) → Railway uses root `Dockerfile` and root `railway.json` (both point at `backend/`).
4. Ensure **Builder** is **Dockerfile** (not Railpack/Nixpacks). In service → **Settings** → **Build** → Builder: **Dockerfile**.

### B. Add PostgreSQL and set variables

5. In the same project: **New** → **Database** → **PostgreSQL**. Wait until it’s provisioned.
6. Open the **PostgreSQL** service → **Variables** or **Connect** → copy the **connection URL** (e.g. `DATABASE_URL` or “Postgres URL”).
7. Open your **backend (API) service** → **Variables** → **Add Variable** (or **Raw Editor**). Set:

| Variable | Value | Required |
|----------|--------|----------|
| `DATABASE_URL` | Paste the Postgres URL from step 6 | **Yes** |
| `SECRET_KEY` | Long random string (e.g. run `openssl rand -hex 32` and paste) | **Yes** |
| `GEMINI_API_KEY` | Your key from [Google AI Studio](https://aistudio.google.com/apikey) | **Yes** |
| `GEMINI_MODEL` | `gemini-2.0-flash` (or your choice) | No (has default) |
| `CORS_ORIGINS` | Your frontend URL, e.g. `https://your-app.vercel.app` | **Yes** for production |

8. **Deploy**: push a commit or use **Deploy** → **Redeploy**.
9. After deploy: open **Settings** → **Networking** → **Generate Domain** to get a public URL (e.g. `https://xxx.railway.app`).

### C. Connect frontend to backend

10. In **Vercel** (frontend): **Settings** → **Environment Variables** → add:
    - **Name:** `NEXT_PUBLIC_API_URL`  
    - **Value:** your Railway backend URL (e.g. `https://xxx.railway.app`)  
11. Redeploy the frontend so it uses the new API URL.

---

## 3. Verify deployment

- **Health:** Open `https://YOUR-RAILWAY-URL/health` in a browser. You should see `{"status":"healthy"}`.
- **API root:** `https://YOUR-RAILWAY-URL/` → `{"message":"AI Counsellor API","version":"1.0.0"}`.
- If you see a warning in logs: *“DATABASE_URL points to localhost”* → set `DATABASE_URL` in the backend service to the Postgres URL from the PostgreSQL service and redeploy (see [BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md)).

---

## 4. Optional: seed universities

Tables are created on first startup. To seed university data:

- **Option A (local):** Set `DATABASE_URL` in local `backend/.env` to your **Railway Postgres URL**, then run:
  ```bash
  cd backend
  pip install -r requirements.txt
  python seed_universities.py
  ```
- **Option B:** Use a one-off job on Railway (if you add a script/command for it) or run the same command in a temporary shell that has `DATABASE_URL` set.

---

## Quick reference

- **Backend URL:** Railway service → Settings → Networking → Generated domain.
- **Postgres URL:** PostgreSQL service → Variables / Connect → copy `DATABASE_URL`.
- **Frontend:** Vercel → `NEXT_PUBLIC_API_URL` = backend URL; `CORS_ORIGINS` on backend = Vercel frontend URL.

All code needed to build and run the backend is in the repo; you only need to set the variables and deploy.
