# Vercel deployment – fix 404 NOT_FOUND

The Next.js app lives in the **`frontend`** folder. Vercel must use it as the project root.

## 1. Set Root Directory in Vercel

1. Open your project on [Vercel](https://vercel.com).
2. Go to **Settings** → **General**.
3. Under **Root Directory**, click **Edit**.
4. Set it to **`frontend`** (no leading slash).
5. Save.

## 2. Redeploy

- **Redeploy**: Deployments → select latest → **Redeploy** (or push a new commit).

## 3. Build settings (optional)

If you set Root Directory to `frontend`, these are usually detected:

- **Framework Preset**: Next.js  
- **Build Command**: `npm run build` or `next build`  
- **Output Directory**: leave default (Next.js uses `.next`)  
- **Install Command**: `npm install`

## 4. Favicon

- `frontend/app/icon.svg` is included so `/favicon.ico` and app icon requests resolve.
- If you still see favicon 404s, add a `favicon.ico` in `frontend/public/`.

## 5. Environment variables

If the frontend calls an API, set in Vercel:

- **Settings** → **Environment Variables**
- Add `NEXT_PUBLIC_API_URL` = your backend URL (e.g. `https://your-backend.railway.app` or similar).

After setting **Root Directory** to **`frontend`** and redeploying, the 404s for `/` and favicon should stop.
