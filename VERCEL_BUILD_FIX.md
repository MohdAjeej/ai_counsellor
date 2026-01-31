# Fix Vercel build (Running "vercel build" at root)

If your build log shows **Commit: 4372409** (or any commit) and the build fails or does nothing useful, do **one** of the following.

---

## Option 1: Set Root Directory (recommended)

1. Go to [vercel.com](https://vercel.com) → your project → **Settings** → **General**.
2. Find **Root Directory** → click **Edit**.
3. Enter **`frontend`** (no slash).
4. Click **Save**.
5. Go to **Deployments** → open the latest deployment → **Redeploy**.

Vercel will then build from the `frontend` folder, detect Next.js, and run `npm install` + `npm run build` there. No root `vercel.json` needed.

---

## Option 2: Build from repo root (root vercel.json)

The repo root has a **`vercel.json`** that runs install and build inside `frontend/`:

- **Install:** `cd frontend && npm install`
- **Build:** `cd frontend && npm run build`
- **Output:** `frontend/.next`

For this to work, Vercel must be building a commit that **includes** this root `vercel.json`. If your build log shows an older commit (e.g. 4372409) that doesn’t have it:

1. Push the latest code:  
   `git add vercel.json && git commit -m "Vercel: root vercel.json" && git push`
2. In Vercel, trigger a new deployment (or push again so it auto-deploys).

---

## Summary

- **Easiest:** Use **Option 1** and set Root Directory to **`frontend`**.
- **Alternative:** Use **Option 2** and ensure the commit Vercel builds includes the root **`vercel.json`**, then redeploy.
