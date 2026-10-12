# 🌟 Mentor AI Aura

**Mentor AI Aura** is an all-in-one AI-powered career accelerator and mentorship platform. It provides end-to-end guidance for software developers and tech candidates through intelligent resume auditing, role-tailored career roadmaps, real-time AI mock interviews, interactive skill assessments, and smart AI chat assistance.

---

## 🚀 Key Features

1. **📄 Real-Time Resume & ATS Auditor**
   - Upload PDF/TXT resumes or paste raw resume text.
   - Comprehensive ATS scoring against 6 target tech roles (Full Stack, SDE, Frontend, Backend, AI/ML, Data Analyst).
   - Detailed missing skills, strengths, formatting insights, and actionable bullet improvements using the Google X-Y-Z formula.

2. **🧭 AI Career Path Navigator**
   - Personalized career roadmap based on your current level and target role.
   - Core technical competencies, certifications, and high-impact portfolio project suggestions.

3. **🎙️ Interactive AI Mock Interview Suite**
   - Practice technical, behavioral, and role-specific questions with AI speech / text feedback.
   - Instant response scoring, strengths evaluation, and suggested improvements.

4. **📝 Exam & Skill Assessments**
   - Multiple-choice technical tests covering Python, React, System Design, SQL, and Data Structures.
   - Instant score calculation and performance breakdown.

5. **💬 24/7 AI Career Mentor Chat**
   - Instant expert guidance for salary negotiation, system design prep, ATS optimization, and tech stack choices.

6. **🔐 Modern Authentication & Google OAuth 2.0**
   - JWT authentication with secure password hashing.
   - Native Google OAuth 2.0 Account Chooser integration (`prompt=select_account`).
   - Profile management with customizable goals, education, and avatar customization.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 6, Tailwind CSS 3, Lucide React, Motion, Canvas Confetti
- **Backend:** FastAPI, Python 3.11+, Pydantic v2, PyJWT, Pwdlib (Argon2), PyPDF, SQLAlchemy
- **Database:** PostgreSQL (production) with automatic SQLite fallback for zero-config local run
- **Hosting / Serverless:** Vercel (Frontend + Serverless Python API) or Render/Railway/Docker

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Clone Repository
```bash
git clone https://github.com/anupam06114s/mentorai.git
cd mentorai
```

### 2. Backend Setup
```bash
# Create and activate virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server (runs on http://127.0.0.1:8000)
uvicorn backend.app.main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App will run at http://localhost:5173
```

---

## 🚀 Deploy on Vercel

Mentor AI Aura is pre-configured for full-stack deployment on Vercel with zero extra build tools.

### Option A: 1-Click Import (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import `https://github.com/anupam06114s/mentorai`.
3. Keep the **Root Directory** as `./` (default).
4. Vercel automatically reads [`vercel.json`](vercel.json):
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **API Functions:** Automatically routes backend endpoints (`/auth/*`, `/api/*`, `/resume/*`, `/career/*`, `/interview/*`, `/test/*`, `/mentor/*`) to `api/index.py` serverless function.
5. (Optional) In **Environment Variables**, add:
   - `JWT_SECRET_KEY`: A secure random secret string
   - `DATABASE_URL`: Your PostgreSQL connection string (if using external PostgreSQL like Supabase or Neon; otherwise SQLite is automatically used in `/tmp/mentorpilot.db`)
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth 2.0 Web Client ID
6. Click **Deploy**! 🎉

### Option B: Deploy Frontend Only to Vercel (with external backend)
If you prefer hosting the FastAPI backend on Railway, Render, or Fly.io:
1. Import repository into Vercel.
2. In Project Settings > Environment Variables:
   - Set `VITE_API_URL` to your backend URL (e.g., `https://your-backend.railway.app`).
3. Deploy! The frontend will route all API calls to your external backend.

---

## 🔒 Environment Variables Reference

See [`.env.example`](.env.example) for reference:

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | SQLite fallback if empty |
| `JWT_SECRET_KEY` | Secret key used for signing JWT access tokens | `mentor_ai_aura_secret_jwt_key_2026` |
| `JWT_ALGORITHM` | JWT signing algorithm | `HS256` |
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration duration | `120` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 2.0 Web Client ID | Demo Client ID fallback |
| `VITE_API_URL` | Backend URL for production frontend | Relative `""` on Vercel |

---

## 📄 License
MIT License. Built with ❤️ for developers and job seekers.
