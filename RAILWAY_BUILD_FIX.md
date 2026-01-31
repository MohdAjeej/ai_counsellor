# Fix: "Script start.sh not found" / "Railpack could not determine how to build the app"

Railway is using **Railpack** instead of the **Dockerfile**. Force it to use the Dockerfile:

---

## Step 1: Set Root Directory

1. Railway → your **backend service** → **Settings**.
2. Find **Root Directory** (under **Source** or **Build**).
3. Set it to **`backend`** (so Railway sees `backend/Dockerfile` and `backend/start.sh`).
4. Save.

---

## Step 2: Set Builder to Dockerfile

1. In the same service → **Settings** → **Build** (or **Deploy**).
2. Find **Builder** (or **Build method**).
3. Change from **Railpack** / **Nixpacks** to **Dockerfile**.
4. **Dockerfile path**: leave default **`Dockerfile`** (Railway will use `backend/Dockerfile` because Root Directory is `backend`).
5. Save.

---

## Step 3: Redeploy

1. Go to **Deployments**.
2. Click **⋯** on the latest deployment → **Redeploy**, or push a new commit.

---

## Summary

| Setting        | Value     |
|----------------|-----------|
| Root Directory | `backend` |
| Builder        | Dockerfile |
| Dockerfile path| `Dockerfile` |

After this, Railway will build with `backend/Dockerfile` and start with `./start.sh` (no Railpack).
