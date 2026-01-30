# Backend must be running before registration

The message **"Cannot connect to server"** means the **backend is not running**. Start it first, then try again.

---

## Option 1: Double-click (Windows)

1. Double-click **`start-backend.bat`** in the project folder.
2. A terminal will open and start the backend.
3. Wait until you see: **`Uvicorn running on http://127.0.0.1:8000`**
4. **Leave that window open.** Do not close it.
5. In your browser, try **Sign up** again.

---

## Option 2: Manual (PowerShell)

1. Open **PowerShell**.
2. Go to the project folder and into `backend`:
   ```powershell
   cd "C:\Users\azizp\Downloads\humanity foundation\backend"
   ```
3. Activate the virtual environment:
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
4. Start the server:
   ```powershell
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
5. Wait until you see: **`Uvicorn running on http://127.0.0.1:8000`**
6. **Leave that window open.** Try **Sign up** again in the browser.

---

## Check that the backend is running

- Open: **http://localhost:8000/docs**  
  You should see the API documentation page.
- Or open: **http://localhost:8000/api/health**  
  You should see: `{"status":"healthy"}`

If those work, registration in the app should work too.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Start backend (use `start-backend.bat` or PowerShell commands above). |
| 2 | Keep the backend terminal window open. |
| 3 | In the app, try **Sign up** again. |

The frontend runs on **http://localhost:3000**.  
The backend must run on **http://localhost:8000** at the same time.
