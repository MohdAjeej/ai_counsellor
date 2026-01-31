# Vercel deployment – fix 404 and build from root

The Next.js app lives in the **`frontend`** folder. A root **`vercel.json`** is included so the build works when Vercel builds from the repo root (install/build run inside `frontend/`). If the build still fails, set Root Directory to **`frontend`**.

## 1. Option A: Build from repo root (default)

The repo root has **`vercel.json`** with:

- `installCommand`: `cd frontend && npm install`
- `buildCommand`: `cd frontend && npm run build`
- `outputDirectory`: `frontend/.next`

No dashboard change needed; push and redeploy.

## 2. Option B: Set Root Directory to `frontend`

If the build fails or you prefer a single app root:

1. Open your project on [Vercel](https://vercel.com).
2. Go to **Settings** → **General**.
3. Under **Root Directory**, click **Edit**.
4. Set it to **`frontend`** (no leading slash).
5. Save and redeploy.

## 3. Redeploy

- **Redeploy**: Deployments → select latest → **Redeploy** (or push a new commit).

## 4. Build settings (optional)

If you set Root Directory to `frontend`, these are usually detected:

- **Framework Preset**: Next.js  
- **Build Command**: `npm run build` or `next build`  
- **Output Directory**: leave default (Next.js uses `.next`)  
- **Install Command**: `npm install`

## 5. Favicon

- `frontend/app/icon.svg` is included so `/favicon.ico` and app icon requests resolve.
- If you still see favicon 404s, add a `favicon.ico` in `frontend/public/`.

## 6. Environment variables

If the frontend calls an API, set in Vercel:

- **Settings** → **Environment Variables**
- Add `NEXT_PUBLIC_API_URL` = your backend URL (e.g. `https://your-backend.railway.app` or similar).

After setting **Root Directory** to **`frontend`** and redeploying, the 404s for `/` and favicon should stop.
