# Setup Guide - AI Counsellor Platform

This guide will help you set up and run the AI Counsellor platform locally.

## Prerequisites

- Python 3.9+ installed
- Node.js 18+ and npm installed
- PostgreSQL 12+ installed and running
- Google Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/ai_counsellor
   SECRET_KEY=your-secret-key-here-change-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

6. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE ai_counsellor;
   ```

7. **Run the backend server:**
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

8. **Seed universities data (optional but recommended):**
   ```bash
   python seed_universities.py
   ```

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the `frontend/` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## Database Schema

The database schema is automatically created when you first run the backend. The following tables will be created:

- `users` - User accounts
- `user_profiles` - User onboarding and profile data
- `universities` - University information
- `shortlisted_universities` - User's shortlisted universities
- `locked_universities` - User's locked/committed universities
- `todo_tasks` - Application to-do tasks

## Running the Application

1. **Start PostgreSQL** (if not running as a service)

2. **Start the backend:**
   ```bash
   cd backend
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   uvicorn main:app --reload
   ```

3. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## First Time Setup Flow

1. Register a new account on the landing page
2. Complete the onboarding process (4 steps)
3. Explore the dashboard
4. Chat with the AI Counsellor
5. Discover and shortlist universities
6. Lock universities to proceed to application stage
7. Manage application to-dos

## Troubleshooting

### Backend Issues

- **Database connection error**: Make sure PostgreSQL is running and the DATABASE_URL in `.env` is correct
- **Gemini API error**: Verify your GEMINI_API_KEY is valid and has quota remaining
- **Port already in use**: Change the port in the uvicorn command: `uvicorn main:app --reload --port 8001`

### Frontend Issues

- **API connection error**: Verify `NEXT_PUBLIC_API_URL` in `.env.local` matches your backend URL
- **Build errors**: Delete `node_modules` and `.next` folder, then run `npm install` again
- **TypeScript errors**: Run `npm run build` to see detailed error messages

## API Documentation

Once the backend is running, you can access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Production Deployment

For production deployment:

1. Set secure `SECRET_KEY` in environment variables
2. Use a production PostgreSQL database
3. Configure CORS properly for your domain
4. Build the frontend: `npm run build`
5. Use a production server like Gunicorn for the backend
6. Set up proper SSL/TLS certificates

## Notes

- The application uses JWT tokens for authentication
- Tokens expire after 30 minutes (configurable)
- University data is seeded with sample data - in production, you'd want to use a real university API or database
- The AI Counsellor uses Google Gemini API - make sure you have API quota available

