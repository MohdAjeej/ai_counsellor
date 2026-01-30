# Fix: EPERM / "operation not permitted" on .next folder

If you see:
```
Error: EPERM: operation not permitted, open '...\frontend\.next\trace'
```

## Quick fix

1. **Stop the dev server** – Press `Ctrl+C` in the terminal where `npm run dev` is running.

2. **Delete the `.next` folder** (PowerShell, from project root):
   ```powershell
   cd "C:\Users\azizp\Downloads\humanity foundation\frontend"
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   ```

3. **Start again:**
   ```powershell
   npm run dev
   ```

## Why it happens

- Another process (e.g. another `npm run dev`, antivirus, or file indexer) is using files in `.next`.
- Port 3000 was in use, so Next tried 3001 – you may have had two dev servers running.

## Optional: use only port 3000

To free port 3000 and avoid two servers:

1. Close all terminals running `npm run dev`.
2. In Task Manager, end any `node.exe` processes if needed.
3. Delete `.next` as above, then run `npm run dev` again.

The `.next` folder is recreated automatically when you run `npm run dev`.
