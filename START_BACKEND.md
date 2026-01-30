# How to Start the Backend Server

## Quick Start

1. **Open a terminal/PowerShell window**

2. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

3. **Activate virtual environment:**
   
   **Windows (PowerShell):**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
   
   **Windows (Command Prompt):**
   ```cmd
   venv\Scripts\activate.bat
   ```
   
   **macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```

4. **Check if .env file exists:**
   ```bash
   # Windows
   dir .env
   
   # macOS/Linux
   ls .env
   ```
   
   If it doesn't exist, create it with:
   ```env
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/ai_counsellor
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

5. **Start the server:**
   ```bash
   uvicorn main:app --reload
   ```

6. **You should see:**
   ```
   INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
   INFO:     Started reloader process
   INFO:     Started server process
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   ```

7. **Test it:**
   - Open browser: `http://localhost:8000/docs`
   - You should see the API documentation

## Troubleshooting

### Error: "No module named 'uvicorn'"
**Solution:** Install dependencies first
```bash
pip install -r requirements.txt
```

### Error: "ModuleNotFoundError: No module named 'fastapi'"
**Solution:** Install dependencies
```bash
pip install -r requirements.txt
```

### Error: "Could not connect to database"
**Solution:** 
1. Make sure PostgreSQL is running
2. Check DATABASE_URL in .env file
3. Verify database `ai_counsellor` exists

### Error: "Address already in use"
**Solution:** Port 8000 is already in use
```bash
# Use a different port
uvicorn main:app --reload --port 8001
```
Then update `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

### Error: "Execution Policy" (Windows PowerShell)
**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Verify Backend is Running

1. **Check terminal output** - Should show "Uvicorn running"
2. **Open browser** - Go to `http://localhost:8000/docs`
3. **Check health endpoint** - Go to `http://localhost:8000/api/health`
   - Should return: `{"status":"healthy"}`

## Keep Backend Running

- **Don't close the terminal** - Backend must stay running
- **Keep it in foreground** - You'll see request logs
- **To stop:** Press `Ctrl+C` in the terminal

## Next Steps

Once backend is running:
1. Start frontend in a **new terminal window**
2. Try registration again
3. Check backend terminal for request logs
