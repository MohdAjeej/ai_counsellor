# Backend deploy – all code (Railway / Docker)

These files are already in `backend/`. Use them to deploy (e.g. Railway: Root Directory = `backend`, Builder = Dockerfile).

---

## 1. `backend/Dockerfile`

```dockerfile
# Railway (and others): use this so the build plan works. Railway builds with Dockerfile when present.
FROM python:3.11-slim

WORKDIR /app

# Install dependencies first for better layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Railway sets PORT at runtime; default for local
ENV PORT=8000
EXPOSE 8000

# start.sh reads PORT from env so Railway's $PORT is used
COPY start.sh .
RUN chmod +x start.sh
CMD ["./start.sh"]
```

---

## 2. `backend/start.sh`

```sh
#!/bin/sh
# Use PORT from env (Railway sets it); default 8000
exec uvicorn main:app --host 0.0.0.0 --port "${PORT:-8000}"
```

---

## 3. `backend/railway.json`

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "startCommand": "./start.sh",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 90
  }
}
```

---

## 4. `backend/requirements.txt`

```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
python-dotenv==1.0.0
pydantic[email]==2.5.0
pydantic-settings==2.1.0
email-validator>=2.0.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
google-generativeai==0.3.2
httpx==0.25.2
alembic==1.12.1
```

---

## 5. `backend/.dockerignore`

```
# Don't copy into Docker image
.env
.env.*
.git
__pycache__
*.pyc
*.pyo
.venv
venv
*.egg-info
.pytest_cache
.coverage
htmlcov
*.md
```

---

## 6. Variables to set on Railway (backend service)

| Variable | Required | Example |
|----------|----------|---------|
| `DATABASE_URL` | Yes | From PostgreSQL service → Variables/Connect |
| `SECRET_KEY` | Yes | `openssl rand -hex 32` |
| `GEMINI_API_KEY` | Yes | From Google AI Studio |
| `GEMINI_MODEL` | No | `gemini-2.0-flash` |
| `CORS_ORIGINS` | Yes (prod) | `https://your-app.vercel.app` |

---

## Deploy steps (Railway)

1. New Project → Deploy from GitHub → select repo.
2. Root Directory: **backend**. Builder: **Dockerfile**.
3. Add PostgreSQL: New → Database → PostgreSQL.
4. Backend service → Variables: set `DATABASE_URL` (from Postgres), `SECRET_KEY`, `GEMINI_API_KEY`, `CORS_ORIGINS`.
5. Settings → Networking → Generate Domain.
6. Redeploy. Use the generated URL as `NEXT_PUBLIC_API_URL` in Vercel.

---

## Vercel backend (optional)

To deploy the **backend** on Vercel (serverless), use these files. Set **Root Directory** to `backend` in the Vercel project.

### `backend/vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "pip install -r requirements.txt",
  "framework": null,
  "functions": {
    "app.py": {
      "maxDuration": 60
    }
  }
}
```

### `backend/app.py` (Vercel FastAPI entrypoint)

```python
# Vercel FastAPI entrypoint: must be app.py, index.py, or server.py
from main import app
```

**Vercel steps:** New Project → Import repo → **Root Directory** = `backend` → add env vars (`DATABASE_URL`, `SECRET_KEY`, `GEMINI_API_KEY`, `CORS_ORIGINS`) → Deploy. Use an external PostgreSQL (e.g. Neon, Railway Postgres); Vercel does not host Postgres.
