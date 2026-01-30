@echo off
echo Starting AI Counsellor Backend...
echo.

cd /d "%~dp0backend"

if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found.
    echo Run this first: cd backend ^&^& python -m venv venv ^&^& venv\Scripts\activate ^&^& pip install -r requirements.txt
    pause
    exit /b 1
)

call venv\Scripts\activate.bat

echo Backend starting at http://localhost:8000
echo Open http://localhost:8000/docs in browser to test.
echo Press Ctrl+C to stop.
echo.

uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause
