import datetime
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr


class UserRegister(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class GoogleLoginRequest(BaseModel):
    name: Optional[str] = "Candidate"
    email: Optional[EmailStr] = None
    avatar_url: Optional[str] = ""


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    avatar_url: Optional[str] = ""
    education: Optional[str] = ""
    college: Optional[str] = ""
    degree: Optional[str] = ""
    career_interests: Optional[str] = ""
    target_role: Optional[str] = "Full Stack Developer"
    created_at: Optional[datetime.datetime] = None

    model_config = {
        "from_attributes": True
    }


class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    education: Optional[str] = None
    college: Optional[str] = None
    degree: Optional[str] = None
    career_interests: Optional[str] = None
    target_role: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class ScheduledInterviewCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    target_role: str
    resume_filename: Optional[str] = ""
    preferred_date: str
    time_slot: str
    timezone: Optional[str] = "IST (UTC+5:30)"
    message: Optional[str] = ""


class ScheduledInterviewResponse(BaseModel):
    id: int
    user_id: int
    full_name: str
    email: str
    phone: str
    target_role: str
    resume_filename: Optional[str] = ""
    preferred_date: str
    time_slot: str
    timezone: str
    message: Optional[str] = ""
    status: str
    meeting_link: Optional[str] = ""
    created_at: datetime.datetime

    model_config = {
        "from_attributes": True
    }


class TestAttemptCreate(BaseModel):
    exam_name: str
    category: str
    total_questions: int
    correct_answers: int
    incorrect_answers: int
    unanswered: int
    score: float
    accuracy_percent: float
    time_taken_seconds: int
    report: Dict[str, Any]
