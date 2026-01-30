# Troubleshooting Guide - Registration Failed

If you're getting "Registration failed. Please try again." error, check the following:

## 1. Check Backend is Running

Make sure the backend server is running:

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Test the backend:**
- Open browser and go to: `http://localhost:8000/docs`
- You should see the API documentation page
- If you see "This site can't be reached", the backend is not running

## 2. Check Database Connection

Make sure PostgreSQL is running and the database exists:

**Windows:**
```powershell
# Check if PostgreSQL service is running
Get-Service -Name postgresql*

# If not running, start it
Start-Service postgresql-x64-15  # Replace 15 with your version
```

**Verify database exists:**
```sql
-- Connect to PostgreSQL
psql -U postgres

-- List databases
\l

-- You should see 'ai_counsellor' in the list
```

## 3. Check Environment Variables

Make sure `backend/.env` file exists and has correct values:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/ai_counsellor
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GEMINI_API_KEY=your-gemini-api-key-here
```

**Important:**
- Replace `yourpassword` with your actual PostgreSQL password
- Replace `your-secret-key-here` with a generated secret key
- Replace `your-gemini-api-key-here` with your Gemini API key

## 4. Check Frontend API URL

Make sure `frontend/.env.local` has the correct API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 5. Check Browser Console

Open browser Developer Tools (F12) and check:
- **Console tab**: Look for any JavaScript errors
- **Network tab**: 
  - Try registering again
  - Look for the `/api/auth/register` request
  - Check if it's failing (red status)
  - Click on it to see the error details

## 6. Common Error Messages

### "Cannot connect to server"
- Backend is not running
- Wrong API URL in `.env.local`
- Backend is running on different port

### "Email already registered"
- User with this email already exists
- Try a different email or login instead

### "Database connection error"
- PostgreSQL is not running
- Wrong DATABASE_URL in `.env`
- Database `ai_counsellor` doesn't exist

### "500 Internal Server Error"
- Check backend terminal for error messages
- Usually a database or code issue

## 7. Quick Fixes

### Restart Everything

1. **Stop backend** (Ctrl+C in terminal)
2. **Stop frontend** (Ctrl+C in terminal)
3. **Start backend:**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload
   ```
4. **Start frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

### Clear Browser Cache

- Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) to hard refresh
- Or clear browser cache and cookies

### Check Backend Logs

Look at the backend terminal when you try to register. You should see:
- Request logs
- Any error messages
- Database connection status

## 8. Test Backend Directly

Test the registration endpoint directly:

**Using curl:**
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "full_name": "Test User"
  }'
```

**Using browser:**
- Go to `http://localhost:8000/docs`
- Find `POST /api/auth/register`
- Click "Try it out"
- Enter test data
- Click "Execute"
- Check the response

## 9. Still Not Working?

1. **Check all files are saved**
2. **Verify no typos in `.env` files**
3. **Make sure you're using the correct ports** (8000 for backend, 3000 for frontend)
4. **Check firewall/antivirus** isn't blocking connections
5. **Try a different browser**

## Need More Help?

Check the backend terminal output - it usually shows the exact error that's causing the registration to fail.
