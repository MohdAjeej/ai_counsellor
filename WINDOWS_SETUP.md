# Windows Setup Guide - AI Counsellor

## Creating PostgreSQL Database on Windows

### Option 1: Using psql (Recommended)

1. **Open PowerShell** and navigate to your PostgreSQL bin directory (usually):
   ```powershell
   cd "C:\Program Files\PostgreSQL\15\bin"
   ```
   (Replace `15` with your PostgreSQL version number)

2. **Connect to PostgreSQL:**
   ```powershell
   .\psql.exe -U postgres
   ```
   (Enter your PostgreSQL password when prompted)

3. **Create the database:**
   ```sql
   CREATE DATABASE ai_counsellor;
   ```

4. **Exit psql:**
   ```sql
   \q
   ```

### Option 2: Using pgAdmin (GUI)

1. **Open pgAdmin** (usually in Start Menu)

2. **Connect to your PostgreSQL server** (enter password if needed)

3. **Right-click on "Databases"** → **Create** → **Database**

4. **Enter database name:** `ai_counsellor`

5. **Click "Save"**

### Option 3: Add PostgreSQL to PATH

1. **Find your PostgreSQL bin directory** (usually `C:\Program Files\PostgreSQL\15\bin`)

2. **Add to PATH:**
   - Open System Properties → Environment Variables
   - Edit "Path" in System variables
   - Add: `C:\Program Files\PostgreSQL\15\bin`
   - Click OK

3. **Restart PowerShell** and then:
   ```powershell
   createdb -U postgres ai_counsellor
   ```

### Option 4: Let the App Create It (If you have permissions)

If your PostgreSQL user has CREATE DATABASE permissions, you can skip this step. The app will try to connect, but you'll need to create it manually first.

## Quick Check: Is PostgreSQL Running?

```powershell
# Check if PostgreSQL service is running
Get-Service -Name postgresql*
```

If not running:
```powershell
# Start PostgreSQL service (as Administrator)
Start-Service postgresql-x64-15
```
(Replace `15` with your version)

## Complete Windows Setup Steps

### 1. Verify PostgreSQL is Running
```powershell
Get-Service -Name postgresql*
```

### 2. Create Database (choose one method above)

### 3. Set Up Backend
```powershell
cd "C:\Users\azizp\Downloads\humanity foundation\backend"
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**If you get execution policy error:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 4. Create Backend .env File
Create `backend\.env` file with:
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/ai_counsellor
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GEMINI_API_KEY=your-gemini-api-key-here
```

**Important:** Replace:
- `postgres` with your PostgreSQL username (usually `postgres`)
- `yourpassword` with your PostgreSQL password
- `your-gemini-api-key-here` with your actual API key

### 5. Start Backend
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

### 6. Seed Database (New PowerShell Window)
```powershell
cd "C:\Users\azizp\Downloads\humanity foundation\backend"
.\venv\Scripts\Activate.ps1
python seed_universities.py
```

### 7. Set Up Frontend (New PowerShell Window)
```powershell
cd "C:\Users\azizp\Downloads\humanity foundation\frontend"
npm install
```

Create `frontend\.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 8. Start Frontend
```powershell
npm run dev
```

## Troubleshooting Windows Issues

### PostgreSQL Not Found
- Make sure PostgreSQL is installed
- Check installation path: `C:\Program Files\PostgreSQL\[version]\bin`
- Add to PATH or use full path to `psql.exe`

### Virtual Environment Activation Error
```powershell
# If you get execution policy error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Database Connection Error
- Verify PostgreSQL service is running
- Check username/password in DATABASE_URL
- Make sure database `ai_counsellor` exists
- Check PostgreSQL is listening on port 5432

### Port Already in Use
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process (replace PID with actual process ID)
taskkill /PID [PID] /F
```

## Quick Test

After setup, test the connection:
```powershell
# In backend directory with venv activated
python -c "from database import engine; engine.connect(); print('Database connected!')"
```

