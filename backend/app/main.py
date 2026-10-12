import csv
import json
import base64
from pathlib import Path
import os
from datetime import datetime, timedelta, timezone
from typing import Optional, List, Dict, Any

import jwt
from dotenv import load_dotenv
from pwdlib import PasswordHash
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form, Body, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from .database import SessionLocal, create_tables
from .models import (
    User,
    ResumeAnalysis,
    CareerPlan,
    InterviewSession,
    ScheduledInterview,
    TestAttempt
)
from .schemas import (
    UserCreate,
    UserResponse,
    UserRegister,
    UserLogin,
    UserProfileUpdate,
    TokenResponse,
    AuthResponse,
    GoogleLoginRequest,
    ScheduledInterviewCreate,
    ScheduledInterviewResponse,
    TestAttemptCreate
)
from .resume_analyzer import extract_text_from_file, analyze_resume_text
from .career_engine import CAREER_ROLE_SPECS, generate_personalized_guidance
from .interview_engine import (
    generate_interview_session,
    evaluate_interview_response,
    generate_meeting_link
)
from .test_engine import (
    get_all_exams,
    get_exam_questions,
    evaluate_exam_submission
)
from .mentor_engine import generate_mentor_reply

# Load environment variables
load_dotenv()

# Password hashing
password_hash = PasswordHash.recommended()

# JWT settings
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "mentor_ai_aura_secret_jwt_key_2026")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "120"))

# Create FastAPI application
app = FastAPI(
    title="Mentor AI Aura",
    description="AI-powered platform for resume analysis, career guidance, exam preparation, and interview practice",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    try:
        create_tables()
    except Exception as e:
        print(f"[DB] Startup table initialization notice: {e}")

# Database session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create JWT access token
def create_access_token(user_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": str(user_id),
        "exp": expire,
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def get_current_user(token: str, db: Session) -> User:
    # Support instant demo token seamlessly with real DB user
    if token == "demo_guest_token_2026":
        demo_user = db.query(User).filter(User.email == "demo@mentoraiaura.com").first()
        if not demo_user:
            demo_user = User(
                name="Alex Candidate",
                email="demo@mentoraiaura.com",
                phone="+91 98765 43210",
                education="B.Tech in Computer Science",
                college="National Institute of Technology",
                degree="Bachelor of Technology",
                career_interests="Full Stack Web, AI Systems, Cloud Engineering",
                target_role="Full Stack Developer",
                hashed_password=password_hash.hash("DemoPassword123")
            )
            db.add(demo_user)
            db.commit()
            db.refresh(demo_user)
        return demo_user

    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        user_id = int(payload.get("sub", ""))
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication session",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

security = HTTPBearer(auto_error=False)

def get_current_user_required(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    return get_current_user(credentials.credentials, db)

def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db),
) -> Optional[User]:
    if not credentials:
        return None
    try:
        return get_current_user(credentials.credentials, db)
    except Exception:
        return None

# Root and Health
@app.get("/")
def root():
    return {
        "app": "Mentor AI Aura",
        "status": "online",
        "version": "2.0.0"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Mentor AI Aura"}

# =====================================================================
# 🔐 AUTHENTICATION ENDPOINTS
# =====================================================================
@app.post("/auth/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == str(user_data.email).lower()).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    new_user = User(
        name=user_data.name.strip(),
        email=str(user_data.email).lower(),
        hashed_password=password_hash.hash(user_data.password),
        phone="",
        avatar_url="",
        education="",
        college="",
        degree="",
        career_interests="Software Development",
        target_role="Full Stack Developer"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = create_access_token(new_user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": new_user
    }

@app.post("/auth/google", response_model=AuthResponse)
def google_auth(payload: GoogleLoginRequest, db: Session = Depends(get_db)):
    email_val = str(payload.email or "candidate.google@mentoraiaura.com").strip().lower()
    name_val = (payload.name or email_val.split("@")[0]).strip()
    if name_val.lower() == "ashu":
        name_val = "Ashutosh Pandey"

    user = db.query(User).filter(User.email == email_val).first()
    if not user:
        user = User(
            name=name_val,
            email=email_val,
            hashed_password=password_hash.hash("google_oauth_auth_credential_2026"),
            phone="",
            avatar_url=payload.avatar_url or f"https://ui-avatars.com/api/?name={name_val}&background=4285F4&color=fff",
            education="B.Tech Computer Science",
            college="Institute of Engineering & Technology",
            degree="Bachelor of Technology",
            career_interests="AI & Software Engineering",
            target_role="Full Stack Developer"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        # Update avatar or name if provided
        if payload.avatar_url and not user.avatar_url:
            user.avatar_url = payload.avatar_url
            db.commit()

    # Also persist to registered_users.csv if missing
    csv_path = Path(__file__).resolve().parent.parent.parent / "registered_users.csv"
    if csv_path.exists():
        try:
            with open(csv_path, mode="r", encoding="utf-8") as f:
                content = f.read()
            if email_val not in content.lower():
                with open(csv_path, mode="a", encoding="utf-8") as f:
                    f.write(f"\n{user.id},{name_val},{email_val}")
        except Exception:
            pass

    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }

@app.get("/auth/google/accounts")
def get_recent_google_accounts(db: Session = Depends(get_db)):
    accounts = []
    seen_emails = set()
    google_colors = ["4285F4", "EA4335", "34A853", "FBBC05", "673AB7"]

    # 1. Load users from registered_users.csv
    csv_path = Path(__file__).resolve().parent.parent.parent / "registered_users.csv"
    if csv_path.exists():
        try:
            with open(csv_path, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    email = (row.get("Email") or "").strip()
                    name = (row.get("Name") or "").strip()
                    if name.lower() == "ashu":
                        name = "Ashutosh Pandey"
                    if email and "@" in email and email.lower() not in seen_emails:
                        seen_emails.add(email.lower())
                        color = google_colors[len(accounts) % len(google_colors)]
                        accounts.append({
                            "id": row.get("ID") or str(len(accounts) + 1),
                            "name": name or email.split("@")[0],
                            "email": email,
                            "avatar_url": f"https://ui-avatars.com/api/?name={name or 'User'}&background={color}&color=fff&bold=true"
                        })
        except Exception:
            pass

    # 2. Load users from database
    users = db.query(User).order_by(User.id.desc()).all()
    for u in users:
        if u.email and u.email.lower() not in seen_emails:
            seen_emails.add(u.email.lower())
            color = google_colors[len(accounts) % len(google_colors)]
            accounts.append({
                "id": str(u.id),
                "name": u.name,
                "email": u.email,
                "avatar_url": u.avatar_url or f"https://ui-avatars.com/api/?name={u.name}&background={color}&color=fff&bold=true"
            })

    # Prioritize gmail.com accounts at the top, then others
    def sort_key(acc):
        email = acc.get("email", "").lower()
        if "gmail.com" in email:
            return 0
        if "googlemail.com" in email:
            return 1
        return 2

    accounts.sort(key=sort_key)
    return accounts

@app.post("/auth/login", response_model=TokenResponse)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == str(user_data.email).lower()).first()
    if not user or not user.hashed_password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    try:
        valid = password_hash.verify(user_data.password, user.hashed_password)
    except Exception:
        valid = False

    if not valid:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token(user.id)
    return {"access_token": token, "token_type": "bearer"}

@app.post("/auth/logout")
def logout():
    return {"message": "Session terminated successfully"}

# =====================================================================
# 👤 USER PROFILE ENDPOINTS (FEATURE 5 & 6)
# =====================================================================
@app.get("/auth/me", response_model=UserResponse)
@app.get("/api/profile", response_model=UserResponse)
def get_user_profile(user: User = Depends(get_current_user_required)):
    return user

@app.put("/api/profile", response_model=UserResponse)
def update_user_profile(
    profile_data: UserProfileUpdate,
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    if profile_data.name is not None and len(profile_data.name.strip()) >= 2:
        user.name = profile_data.name.strip()
    if profile_data.phone is not None:
        user.phone = profile_data.phone.strip()
    if profile_data.education is not None:
        user.education = profile_data.education.strip()
    if profile_data.college is not None:
        user.college = profile_data.college.strip()
    if profile_data.degree is not None:
        user.degree = profile_data.degree.strip()
    if profile_data.career_interests is not None:
        user.career_interests = profile_data.career_interests.strip()
    if profile_data.target_role is not None:
        user.target_role = profile_data.target_role.strip()

    db.commit()
    db.refresh(user)
    return user

@app.post("/api/profile/photo")
async def upload_profile_photo(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    # Validate content type
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image format. Supported formats are JPEG, PNG, and WebP."
        )

    content = await file.read()
    if len(content) > 5 * 1024 * 1024:  # 5MB limit
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds maximum limit of 5MB."
        )

    # Encode as persistent Base64 Data URL so it persists seamlessly in SQLite/Postgres
    b64_data = base64.b64encode(content).decode("utf-8")
    mime = file.content_type or "image/png"
    data_url = f"data:{mime};base64,{b64_data}"

    user.avatar_url = data_url
    db.commit()
    db.refresh(user)
    return {"message": "Profile photo updated successfully", "avatar_url": user.avatar_url}

@app.delete("/api/profile/photo")
def remove_profile_photo(
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    user.avatar_url = ""
    db.commit()
    db.refresh(user)
    return {"message": "Profile photo removed", "avatar_url": ""}

# =====================================================================
# 1. 📄 RESUME ANALYZER (MODULE 1)
# =====================================================================
@app.post("/api/resume/analyze")
async def analyze_resume_endpoint(
    file: UploadFile = File(None),
    raw_text: str = Form(""),
    job_role: str = Form("fullstack_developer"),
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    extracted_text = ""
    filename = "Pasted Resume Content"

    if file and file.filename:
        filename = file.filename
        content = await file.read()
        extracted_text = extract_text_from_file(file.filename, content)
    elif raw_text:
        extracted_text = raw_text

    if not extracted_text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No readable resume content found. Please upload a PDF, DOCX, or TXT file."
        )

    result = analyze_resume_text(extracted_text, target_role=job_role)
    result["filename"] = filename
    result["analyzed_at"] = datetime.now(timezone.utc).isoformat()

    # Save to user history if authenticated
    if user:
        analysis_record = ResumeAnalysis(
            user_id=user.id,
            filename=filename,
            target_role=job_role,
            ats_score=result["ats_score"],
            extracted_data_json=json.dumps(result.get("extracted_info", {})),
            analysis_json=json.dumps(result)
        )
        db.add(analysis_record)
        db.commit()
        db.refresh(analysis_record)
        result["saved_analysis_id"] = analysis_record.id

    return result

@app.get("/api/resume/history")
def get_resume_history(
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    records = db.query(ResumeAnalysis).filter(ResumeAnalysis.user_id == user.id).order_by(ResumeAnalysis.created_at.desc()).limit(15).all()
    history = []
    for r in records:
        history.append({
            "id": r.id,
            "filename": r.filename,
            "target_role": r.target_role,
            "ats_score": r.ats_score,
            "created_at": r.created_at.isoformat() if r.created_at else "",
            "extracted_data": json.loads(r.extracted_data_json or "{}"),
            "analysis": json.loads(r.analysis_json or "{}")
        })
    return history

# =====================================================================
# 2. 🧭 CAREER GUIDANCE (MODULE 2)
# =====================================================================
@app.post("/api/career/personalized")
def get_personalized_career(
    data: Dict[str, Any] = Body(...),
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    target_role = data.get("target_role", "software_developer")
    user_skills = data.get("skills", [])
    user_interests = data.get("interests", "")
    custom_job_desc = data.get("job_description", "")

    # If user has profile info, incorporate it
    if user:
        if not user_interests and user.career_interests:
            user_interests = user.career_interests
        if not target_role and user.target_role:
            target_role = user.target_role

    guidance = generate_personalized_guidance(
        user_skills=user_skills,
        user_interests=user_interests,
        target_role=target_role,
        custom_job_desc=custom_job_desc
    )
    return guidance

@app.post("/api/career/save-plan")
def save_career_plan(
    data: Dict[str, Any] = Body(...),
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    target_role = data.get("target_role", "Software Developer")
    plan = CareerPlan(
        user_id=user.id,
        target_role=target_role,
        readiness_percent=int(data.get("readiness_percent", 0)),
        skills_known_json=json.dumps(data.get("existing_skills", [])),
        skills_gap_json=json.dumps(data.get("missing_skills", [])),
        roadmap_json=json.dumps(data.get("roadmap_steps", []))
    )
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return {"message": "Career plan saved successfully", "id": plan.id}

@app.get("/api/career/saved-plans")
def get_saved_career_plans(
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    plans = db.query(CareerPlan).filter(CareerPlan.user_id == user.id).order_by(CareerPlan.created_at.desc()).all()
    return [
        {
            "id": p.id,
            "target_role": p.target_role,
            "readiness_percent": p.readiness_percent,
            "skills_known": json.loads(p.skills_known_json or "[]"),
            "skills_gap": json.loads(p.skills_gap_json or "[]"),
            "roadmap": json.loads(p.roadmap_json or "[]"),
            "created_at": p.created_at.isoformat() if p.created_at else ""
        }
        for p in plans
    ]

# =====================================================================
# 3. 🎙️ MOCK INTERVIEW (MODULE 3)
# =====================================================================
# A. AI Voice Interview
@app.post("/api/interview/start-session")
def start_voice_interview(
    data: Dict[str, Any] = Body(...),
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    role = data.get("role", "fullstack_developer")
    mode = data.get("mode", "mixed")  # technical, hr, project_based, mixed
    resume_text = data.get("resume_text", "")

    # If no resume text passed, check user's last uploaded resume
    if not resume_text and user:
        last_resume = db.query(ResumeAnalysis).filter(ResumeAnalysis.user_id == user.id).order_by(ResumeAnalysis.created_at.desc()).first()
        if last_resume:
            resume_text = last_resume.extracted_data_json or ""

    questions = generate_interview_session(role=role, mode=mode, resume_text=resume_text)
    return {
        "role": role,
        "mode": mode,
        "total_questions": len(questions),
        "questions": questions
    }

@app.post("/api/interview/evaluate-answer")
def evaluate_single_answer(data: Dict[str, Any] = Body(...)):
    question = data.get("question", "")
    answer = data.get("answer", "")
    key_points = data.get("key_points", [])
    if not answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be blank")
    return evaluate_interview_response(question, answer, key_points)

@app.post("/api/interview/complete-session")
def complete_interview_session(
    data: Dict[str, Any] = Body(...),
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    role = data.get("role", "Full Stack Developer")
    mode = data.get("mode", "mixed")
    overall_score = int(data.get("overall_score", 0))
    report = data.get("report", {})

    if user:
        session_record = InterviewSession(
            user_id=user.id,
            role=role,
            mode=mode,
            overall_score=overall_score,
            report_json=json.dumps(report)
        )
        db.add(session_record)
        db.commit()
        db.refresh(session_record)
        return {"message": "Session saved", "session_id": session_record.id}

    return {"message": "Session evaluated"}

@app.get("/api/interview/history")
def get_interview_history(
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    records = db.query(InterviewSession).filter(InterviewSession.user_id == user.id).order_by(InterviewSession.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "role": r.role,
            "mode": r.mode,
            "overall_score": r.overall_score,
            "report": json.loads(r.report_json or "{}"),
            "created_at": r.created_at.isoformat() if r.created_at else ""
        }
        for r in records
    ]

# B. Schedule Interview (Human Interviewer with real Jitsi Meet link)
@app.post("/api/interview/schedule", response_model=ScheduledInterviewResponse)
def schedule_interview_request(
    data: ScheduledInterviewCreate,
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    # Check for duplicate booking on same date and timeslot
    existing = db.query(ScheduledInterview).filter(
        ScheduledInterview.preferred_date == data.preferred_date,
        ScheduledInterview.time_slot == data.time_slot,
        ScheduledInterview.status != "Cancelled"
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"The selected time slot ({data.time_slot} on {data.preferred_date}) is already booked. Please pick an alternative time slot."
        )

    # Automatically generate real Jitsi Meet video conference URL
    interview_req = ScheduledInterview(
        user_id=user.id,
        full_name=data.full_name,
        email=str(data.email),
        phone=data.phone,
        target_role=data.target_role,
        resume_filename=data.resume_filename or "Profile Resume",
        preferred_date=data.preferred_date,
        time_slot=data.time_slot,
        timezone=data.timezone or "IST (UTC+5:30)",
        message=data.message or "",
        status="Approved"  # Auto-approved with active real conference room
    )
    db.add(interview_req)
    db.commit()
    db.refresh(interview_req)

    # Assign legitimate meeting link
    meeting_link = generate_meeting_link(interview_req.id)
    interview_req.meeting_link = meeting_link
    db.commit()
    db.refresh(interview_req)

    return interview_req

@app.get("/api/interview/scheduled", response_model=List[ScheduledInterviewResponse])
def get_user_scheduled_interviews(
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    return db.query(ScheduledInterview).filter(ScheduledInterview.user_id == user.id).order_by(ScheduledInterview.created_at.desc()).all()

@app.get("/api/admin/interviews", response_model=List[ScheduledInterviewResponse])
def get_all_interviews_admin(
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    return db.query(ScheduledInterview).order_by(ScheduledInterview.created_at.desc()).all()

@app.put("/api/admin/interviews/{interview_id}/status")
def update_interview_status(
    interview_id: int,
    data: Dict[str, str] = Body(...),
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    interview = db.query(ScheduledInterview).filter(ScheduledInterview.id == interview_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")

    new_status = data.get("status", "Approved")
    interview.status = new_status
    if new_status == "Approved" and not interview.meeting_link:
        interview.meeting_link = generate_meeting_link(interview.id)

    db.commit()
    db.refresh(interview)
    return {"message": "Status updated", "status": interview.status, "meeting_link": interview.meeting_link}

# =====================================================================
# 4. 🧠 MOCK TEST (MODULE 4)
# =====================================================================
@app.get("/api/tests/exams")
def list_mock_exams():
    return get_all_exams()

@app.get("/api/tests/questions/{exam_id}")
def get_exam_questions_endpoint(exam_id: str):
    return get_exam_questions(exam_id)

@app.post("/api/tests/submit-attempt")
def submit_exam_attempt(
    data: Dict[str, Any] = Body(...),
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    exam_id = data.get("exam_id", "ssc_cgl")
    answers = data.get("answers", {})  # { question_id: selected_index }
    time_taken = int(data.get("time_taken_seconds", 0))

    evaluation = evaluate_exam_submission(exam_id, answers, time_taken)

    # Save to database if authenticated
    if user:
        attempt_record = TestAttempt(
            user_id=user.id,
            exam_name=evaluation["exam_id"],
            category=data.get("category", "Exam Assessment"),
            total_questions=evaluation["total_questions"],
            correct_answers=evaluation["correct_answers"],
            incorrect_answers=evaluation["incorrect_answers"],
            unanswered=evaluation["unanswered"],
            score=evaluation["score"],
            accuracy_percent=evaluation["accuracy_percent"],
            time_taken_seconds=time_taken,
            report_json=json.dumps(evaluation)
        )
        db.add(attempt_record)
        db.commit()
        db.refresh(attempt_record)
        evaluation["saved_attempt_id"] = attempt_record.id

    return evaluation

@app.get("/api/tests/history")
def get_test_history(
    user: User = Depends(get_current_user_required),
    db: Session = Depends(get_db)
):
    attempts = db.query(TestAttempt).filter(TestAttempt.user_id == user.id).order_by(TestAttempt.created_at.desc()).all()
    return [
        {
            "id": a.id,
            "exam_name": a.exam_name,
            "category": a.category,
            "total_questions": a.total_questions,
            "correct_answers": a.correct_answers,
            "incorrect_answers": a.incorrect_answers,
            "score": a.score,
            "accuracy_percent": a.accuracy_percent,
            "time_taken_seconds": a.time_taken_seconds,
            "created_at": a.created_at.isoformat() if a.created_at else "",
            "report": json.loads(a.report_json or "{}")
        }
        for a in attempts
    ]

# =====================================================================
# 5. 💬 AI MENTOR CHAT
# =====================================================================
@app.post("/api/mentor/chat")
def mentor_chat(data: dict = Body(...)):
    message = data.get("message", "")
    history = data.get("history", [])
    if not message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    reply = generate_mentor_reply(message, history)
    return {"reply": reply}
