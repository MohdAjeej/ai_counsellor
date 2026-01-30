# Quick Start Guide - How to Run AI Counsellor

Follow these steps to get the application running on your machine.

## Prerequisites Check

Before starting, make sure you have:
- ✅ Python 3.9+ installed (`python --version`)
- ✅ Node.js 18+ installed (`node --version`)
- ✅ PostgreSQL installed and running
- ✅ Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

## Step 1: Set Up PostgreSQL Database

1. **Start PostgreSQL** (if not already running)

2. **Create the database:**

   **Windows (PowerShell):**
   ```powershell
   # Option 1: Using psql
   cd "C:\Program Files\PostgreSQL\15\bin"
   .\psql.exe -U postgres
   # Then in psql: CREATE DATABASE ai_counsellor;
   
   # Option 2: Using pgAdmin GUI
   # Open pgAdmin → Right-click Databases → Create → Database → Name: ai_counsellor
   ```
   
   **macOS/Linux:**
   ```bash
   createdb ai_counsellor
   ```
   
   **Or using SQL:**
   ```sql
   CREATE DATABASE ai_counsellor;
   ```

## Step 2: Set Up Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create `.env` file** in the `backend/` directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/ai_counsellor
   SECRET_KEY=your-secret-key-change-this-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   GEMINI_API_KEY=your-gemini-api-key-here
   ```
   
   **Important:** Replace:
   - `username` and `password` with your PostgreSQL credentials
   - `your-gemini-api-key-here` with your actual Gemini API key
   - `your-secret-key-change-this-in-production` with a random secret string

6. **Start the backend server:**
   ```bash
   uvicorn main:app --reload
   ```
   
   You should see:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:8000
   ```

7. **Seed the database with sample universities** (in a new terminal):
   ```bash
   cd backend
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   python seed_universities.py
   ```

## Step 3: Set Up Frontend

1. **Open a new terminal** and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env.local` file** in the `frontend/` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   ```

## Step 4: Access the Application

1. **Open your browser** and go to: `http://localhost:3000`

2. **Register a new account** or login

3. **Complete onboarding** (4 steps)

4. **Start using the platform!**

## Troubleshooting

### Backend won't start

**Database connection error:**
```
sqlalchemy.exc.OperationalError: could not connect to server
```
- Check PostgreSQL is running: `pg_isready` or check services
- Verify DATABASE_URL in `.env` is correct
- Make sure database `ai_counsellor` exists

**Port already in use:**
```
ERROR:    [Errno 48] Address already in use
```
- Change port: `uvicorn main:app --reload --port 8001`
- Update `NEXT_PUBLIC_API_URL` in frontend `.env.local` to match

**Gemini API error:**
```
ValueError: GEMINI_API_KEY not found
```
- Make sure `.env` file exists in `backend/` directory
- Verify GEMINI_API_KEY is set correctly

### Frontend won't start

**Port already in use:**
```
Error: listen EADDRINUSE: address already in use :::3000
```
- Kill the process using port 3000, or
- Run on different port: `npm run dev -- -p 3001`

**API connection error:**
- Make sure backend is running on `http://localhost:8000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local` matches backend URL
- Check browser console for CORS errors

**Module not found errors:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules .next
npm install
```

### Database issues

**Tables not created:**
- Backend automatically creates tables on first run
- Check backend logs for errors
- Verify database connection in `.env`

**No universities showing:**
- Run the seed script: `python seed_universities.py`
- Check database has universities: `SELECT COUNT(*) FROM universities;`

## Verify Everything is Working

1. ✅ Backend running: Visit `http://localhost:8000/docs` (should show API docs)
2. ✅ Frontend running: Visit `http://localhost:3000` (should show landing page)
3. ✅ Database connected: Backend starts without errors
4. ✅ Universities seeded: Check `/api/universities` endpoint or seed script output

## Quick Commands Reference

**Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm run dev
```

**Seed Database:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python seed_universities.py
```

## Next Steps After Running

1. Register a new account
2. Complete the 4-step onboarding
3. Explore the dashboard
4. Chat with AI Counsellor
5. Discover and shortlist universities
6. Lock universities to access application guidance
7. Manage application to-dos

Enjoy using AI Counsellor! 🎓

