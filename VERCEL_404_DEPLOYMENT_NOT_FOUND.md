# Fix: 404 DEPLOYMENT_NOT_FOUND on Vercel

When you see:

```
404: NOT_FOUND
Code: DEPLOYMENT_NOT_FOUND
ID: bom1::...
```

it means the URL you opened points to a **deployment that Vercel can’t find** (deleted, failed, or wrong link).

---

## What to do

### 1. Use the correct project URL

- Go to [vercel.com](https://vercel.com) → **Dashboard** → your project.
- Open the **Deployments** tab.
- Use the **Production** URL shown at the top (e.g. `https://your-project.vercel.app`), or the URL from the latest **successful** deployment (green checkmark).
- Do **not** use old preview URLs, build logs, or links from failed deployments.

### 2. Redeploy so a new deployment exists

- In the project → **Deployments**.
- If the latest deployment **failed** (red X), click it → **Redeploy** (or **Redeploy** from the three dots).
- Or push a new commit so Vercel creates a new deployment:
  ```bash
  git commit --allow-empty -m "Trigger Vercel redeploy"
  git push
  ```
- After the new deployment succeeds, open the URL shown for that deployment (Production or the new deployment URL).

### 3. Set Root Directory (if builds keep failing)

If deployments fail and then disappear or never become “Ready”:

- **Settings** → **General** → **Root Directory** → set to **`frontend`** → Save.
- Push a commit or click **Redeploy** on the latest deployment so a new build runs from `frontend/`.

### 4. Check domain / project

- **Settings** → **Domains**: make sure the domain you’re opening is linked to this project.
- If you have multiple projects/teams, confirm you’re in the right project and using **its** Production URL.

---

## Summary

- **DEPLOYMENT_NOT_FOUND** = the deployment for that URL doesn’t exist (failed, deleted, or wrong link).
- **Fix:** Use the **Production** or latest **successful** deployment URL from the Vercel project, and **redeploy** if the current deployment failed.
