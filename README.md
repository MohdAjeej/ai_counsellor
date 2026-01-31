# AI Counsellor - Study Abroad Decision Platform

A guided, stage-based platform designed to help students make confident and informed study-abroad decisions. Instead of overwhelming users with listings or generic chat responses, the platform uses a structured AI Counsellor that deeply understands a student's academic background, goals, budget, and readiness, and then guides them step by step from profile building to university shortlisting and application preparation.

## 🎯 Key Features

- **Structured Onboarding**: Collects academic background, study goals, budget, and exam readiness
- **AI Counsellor**: Powered by Google Gemini, provides personalized guidance and recommendations
- **University Discovery**: Filter and explore universities matched to your profile
- **Smart Shortlisting**: Organize universities into Dream, Target, and Safe categories
- **University Locking**: Commitment step that unlocks application guidance
- **Application Guidance**: Actionable to-dos and timelines for locked universities
- **Stage-Based Progression**: Clear journey from onboarding to application

## ⚡ Vercel deploy (frontend)

**Set Root Directory to `frontend`** in Vercel → Project → **Settings** → **General** → **Root Directory** → `frontend` → Save. Then redeploy. Otherwise the build may fail when running from repo root.

## 📁 Project Structure

```
humanity foundation/
├── backend/              # FastAPI backend
│   ├── main.py          # Main application entry
│   ├── models.py        # Database models
│   ├── schemas.py       # Pydantic schemas
│   ├── auth.py          # Authentication logic
│   ├── ai_counsellor.py # AI integration
│   ├── university_service.py # University matching logic
│   ├── seed_universities.py  # Database seeding script
│   └── requirements.txt
├── frontend/            # Next.js frontend
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   ├── lib/             # Utilities and API client
│   └── package.json
├── SETUP.md             # Detailed setup instructions
└── README.md
```

## 🛠 Tech Stack

- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python) with SQLAlchemy ORM
- **Database**: PostgreSQL
- **AI**: Google Gemini API
- **State Management**: Zustand
- **Authentication**: JWT tokens

## 🚀 Quick Start

See [SETUP.md](./SETUP.md) for detailed setup instructions.

### Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL 12+
- Google Gemini API key

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file with:
# DATABASE_URL=postgresql://user:password@localhost:5432/ai_counsellor
# GEMINI_API_KEY=your-api-key
# SECRET_KEY=your-secret-key

uvicorn main:app --reload
python seed_universities.py  # Seed sample universities
```

### Frontend

```bash
cd frontend
npm install

# Create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📋 User Flow

1. **Landing Page** → Sign up / Login
2. **Onboarding** → Complete profile (4-step form)
3. **Dashboard** → View progress and quick actions
4. **AI Counsellor** → Chat for personalized guidance
5. **University Discovery** → Explore and filter universities
6. **Shortlisting** → Organize into Dream/Target/Safe
7. **Locking** → Commit to universities
8. **Application** → Manage to-dos and timelines

## 🔐 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/profile` - Create/update profile
- `POST /api/counsellor/chat` - Chat with AI
- `GET /api/universities` - Get universities
- `POST /api/universities/shortlist` - Shortlist university
- `POST /api/universities/lock` - Lock university
- `GET /api/todos` - Get to-dos
- `POST /api/todos` - Create to-do

Full API documentation available at `http://localhost:8000/docs` when backend is running.

## 🎨 Features in Detail

### AI Counsellor
- Context-aware conversations
- Profile analysis and recommendations
- Risk assessment for universities
- Actionable guidance

### University Matching
- Budget-based filtering
- GPA requirement matching
- Country preferences
- Acceptance rate considerations

### Stage Management
- Onboarding → Dashboard → Discovery → Shortlisting → Application
- Each stage unlocks the next
- Clear progress indicators

## 📝 Notes

- This is a functional prototype, not production-ready
- University data is seeded with sample data
- AI responses depend on Gemini API availability
- Authentication tokens expire after 30 minutes

## 🤝 Contributing

This is a prototype project. For production use, consider:
- Real university data API integration
- Enhanced AI prompt engineering
- More robust error handling
- Performance optimization
- Security hardening

## 📄 License

This project is created for educational/demonstration purposes.

