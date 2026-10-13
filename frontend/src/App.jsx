import { useEffect, useState, useRef } from "react";
import { useUser, useClerk } from "@clerk/react";
import confetti from "canvas-confetti";
import { BeamBorder } from "@/components/ui/border-beam";
import { BorderBeam } from "@/components/ui/border-beam-search";
import { EarthBlaze } from "@/components/ui/earth-blaze";
import { BackgroundGradientGlow } from "@/components/ui/background-gradient-glow";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { MentorChatModule } from "./components/ui/mentor-chat";
import ContactWithGlobe from "./components/ui/contact-with-globe";
import FindJobModule from "./components/ui/find-job";
import Auth from "./Auth";
import {
  LayoutDashboard,
  FileUser,
  Compass,
  Video,
  Brain,
  MessageSquare,
  Globe,
  Briefcase,
  CalendarDays,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Upload,
  Clock,
  Target,
  CheckCircle2,
  MessageCircle,
  Send,
  LogOut,
  Check,
  AlertCircle,
  RefreshCw,
  Volume2,
  Mic,
  MicOff,
  Award,
  ChevronRight,
  Zap,
  Copy,
  FileText,
  ArrowRight,
  BookOpen,
  Star,
  HelpCircle,
  User,
  Phone,
  Mail,
  GraduationCap,
  Building2,
  Camera,
  Trash2,
  Edit3,
  Bookmark,
  Shield,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import "./App.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
    ? ""
    : "http://127.0.0.1:8000");

const TARGET_ROLES = [
  { id: "fullstack_developer", label: "Full Stack Developer" },
  { id: "software_developer", label: "Software Developer (SDE)" },
  { id: "frontend_developer", label: "Frontend Developer (React)" },
  { id: "backend_developer", label: "Backend Developer (Python/Node)" },
  { id: "ai_ml_engineer", label: "AI & Machine Learning Engineer" },
  { id: "data_analyst", label: "Data Analyst & BI Specialist" },
];

const SAMPLE_RESUMES = {
  fullstack: `Alex Candidate
alex.candidate@example.com | +91 98765 43210 | Bangalore, India
LinkedIn: linkedin.com/in/alexcandidate | GitHub: github.com/alexcandidate

PROFESSIONAL SUMMARY
Results-driven Full Stack Engineer with 3+ years of experience designing and scaling production web applications. Proven track record of accelerating API performance by 38% and leading microservices architecture serving 120,000+ monthly active users.

EDUCATION
- B.Tech in Computer Science | National Institute of Technology (2020 - 2024) | GPA: 8.8/10.0

TECHNICAL SKILLS
- Programming: Python, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3
- Frameworks & Libraries: React 19, FastAPI, Node.js, Next.js, Tailwind CSS
- Databases & Cloud: PostgreSQL, Redis, Docker, AWS (S3, EC2), Git, Linux
- Core Competencies: RESTful APIs, System Design, Data Structures & Algorithms

PROFESSIONAL EXPERIENCE
Senior Full Stack Developer | Nexus Cloud Tech | 2023 – Present
- Architected and deployed 14+ RESTful microservices using Python FastAPI and PostgreSQL, cutting API latency by 42% for 90,000 daily requests.
- Engineered dynamic dashboard in React 19 and Tailwind CSS, increasing user session engagement by 27% across web clients.
- Automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle time from 45 minutes to under 8 minutes.
- Implemented Redis caching layer and connection pooling, boosting database throughput by 3.5x during high-traffic events.

KEY PROJECTS
- CloudFlow Task Engine: Built distributed task orchestration web app in React, FastAPI, and Docker. Handled 500+ concurrent jobs.
- DevPulse Analytics: Created real-time developer monitoring tool using WebSockets, PostgreSQL, and Chart.js.

CERTIFICATIONS
- AWS Certified Developer Associate (2023)`
};

export default function App() {
  const { user: clerkUser, isSignedIn: isClerkSignedIn, isLoaded: isClerkLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerk();

  const [page, setPage] = useState("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("access_token");
    if (!token || token === "demo_guest_token_2026") {
      localStorage.removeItem("access_token");
      return false;
    }
    return true;
  });

  // Sync Clerk authentication with backend
  useEffect(() => {
    if (isClerkLoaded && isClerkSignedIn && clerkUser) {
      const email = clerkUser.primaryEmailAddress?.emailAddress || "";
      const name = clerkUser.fullName || clerkUser.firstName || email.split("@")[0] || "User";
      const avatar_url = clerkUser.imageUrl || "";

      fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, avatar_url })
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            setUserProfile(prev => ({
              ...prev,
              ...data.user,
              name: name,
              email: email,
              avatar_url: avatar_url || data.user?.avatar_url
            }));
            setIsLoggedIn(true);
          } else {
            setUserProfile(prev => ({ ...prev, name, email, avatar_url }));
            setIsLoggedIn(true);
          }
        })
        .catch(() => {
          setUserProfile(prev => ({ ...prev, name, email, avatar_url }));
          setIsLoggedIn(true);
        });
    }
  }, [isClerkLoaded, isClerkSignedIn, clerkUser]);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    id: 1,
    name: "Alex Candidate",
    email: "demo@mentoraiaura.com",
    phone: "+91 98765 43210",
    avatar_url: "",
    education: "B.Tech in Computer Science",
    college: "National Institute of Technology",
    degree: "Bachelor of Technology",
    career_interests: "Full Stack Web, AI Systems, Cloud Engineering",
    target_role: "Full Stack Developer",
    created_at: new Date().toISOString()
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...userProfile });
  const [profileNotification, setProfileNotification] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);

  // 1. Resume Analyzer State
  const [resumeTab, setResumeTab] = useState("analyze"); // analyze | history
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [targetRole, setTargetRole] = useState("fullstack_developer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [atsResult, setAtsResult] = useState(null);
  const [resumeHistory, setResumeHistory] = useState([]);
  const [rawTextMode, setRawTextMode] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // 2. Career Guidance State
  const [careerTab, setCareerTab] = useState("roadmap"); // roadmap | saved
  const [selectedCareerRole, setSelectedCareerRole] = useState("software_developer");
  const [customJobDesc, setCustomJobDesc] = useState("");
  const [careerGuidanceData, setCareerGuidanceData] = useState(null);
  const [savedCareerPlans, setSavedCareerPlans] = useState([]);
  const [careerNotification, setCareerNotification] = useState("");

  // 3. Mock Interview State
  const [interviewSection, setInterviewSection] = useState("ai_voice"); // ai_voice | schedule | history | admin
  const [interviewRole, setInterviewRole] = useState("fullstack_developer");
  const [interviewMode, setInterviewMode] = useState("mixed"); // technical | hr | project_based | mixed
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [interviewAnswer, setInterviewAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [interviewTimer, setInterviewTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);

  // Schedule Interview Form State
  const [scheduleForm, setScheduleForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    target_role: "Full Stack Developer",
    preferred_date: "",
    time_slot: "10:00 AM - 10:45 AM",
    timezone: "IST (UTC+5:30)",
    message: ""
  });
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [scheduleStatusMsg, setScheduleStatusMsg] = useState("");

  // 4. Mock Test State
  const [testView, setTestView] = useState("select"); // select | taking | result | history
  const [allExams, setAllExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("ssc_cgl");
  const [activeTestQuestions, setActiveTestQuestions] = useState([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [testUserAnswers, setTestUserAnswers] = useState({}); // { qid: optionIdx }
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [testTimerSeconds, setTestTimerSeconds] = useState(900); // 15 mins
  const [testTimerRunning, setTestTimerRunning] = useState(false);
  const [testResultData, setTestResultData] = useState(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [testHistory, setTestHistory] = useState([]);

  // Camera stream ref
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recognitionRef = useRef(null);

  // Helper auth token getter
  function getAuthToken() {
    const token = localStorage.getItem("access_token");
    if (!token || token === "demo_guest_token_2026") return "";
    return token;
  }

  // Fetch initial user profile and data
  useEffect(() => {
    if (!isLoggedIn) return;
    const token = getAuthToken();
    if (!token) {
      setIsLoggedIn(false);
      localStorage.removeItem("access_token");
      return;
    }

    fetch(`${API_BASE_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          setIsLoggedIn(false);
          localStorage.removeItem("access_token");
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setIsLoggedIn(true);
          setUserProfile(data);
          setEditFormData(data);
          setScheduleForm(prev => ({
            ...prev,
            full_name: data.name || "",
            email: data.email || "",
            phone: data.phone || ""
          }));
        }
      })
      .catch(() => {});

    // Preload exams list
    fetch(`${API_BASE_URL}/api/tests/exams`)
      .then(res => res.ok ? res.json() : [])
      .then(exams => setAllExams(exams))
      .catch(() => {});
  }, [isLoggedIn]);

  // Handle Voice Dictation SpeechRecognition
  function toggleVoiceDictation() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Microphone speech recognition is not supported in this browser. Please type your answer.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + " ";
        }
        setInterviewAnswer(transcript.trim());
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    }
  }

  // Text-to-speech speaker
  function speakText(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#`_]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  // Timer countdown for Mock Test
  useEffect(() => {
    let interval = null;
    if (testTimerRunning && testTimerSeconds > 0) {
      interval = setInterval(() => {
        setTestTimerSeconds(s => {
          if (s <= 1) {
            handleFinalTestSubmit();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testTimerRunning, testTimerSeconds]);

  // Load Career Guidance when role changes
  useEffect(() => {
    if (page === "career") {
      fetch(`${API_BASE_URL}/api/career/personalized`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          target_role: selectedCareerRole,
          job_description: customJobDesc
        })
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) setCareerGuidanceData(data);
        })
        .catch(() => {});
    }
  }, [page, selectedCareerRole, customJobDesc]);

  // -------------------------------------------------------------------------
  // PROFILE EDIT & PHOTO MANAGEMENT (FEATURE 5)
  // -------------------------------------------------------------------------
  async function handleSaveProfile(e) {
    e.preventDefault();
    setProfileNotification("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(editFormData)
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      setUserProfile(updated);
      setIsEditingProfile(false);
      setProfileNotification("✅ Profile details saved successfully!");
      setTimeout(() => setProfileNotification(""), 3500);
    } catch (err) {
      setProfileNotification(`❌ Error: ${err.message}`);
    }
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, or WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}/api/profile/photo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        body: formData
      });
      if (!res.ok) throw new Error("Photo upload failed");
      const data = await res.json();
      setUserProfile(prev => ({ ...prev, avatar_url: data.avatar_url }));
      setProfileNotification("✅ Profile photo updated!");
      setTimeout(() => setProfileNotification(""), 3000);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleRemovePhoto() {
    if (!window.confirm("Remove profile photo and restore default avatar?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile/photo`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (!res.ok) throw new Error("Photo removal failed");
      setUserProfile(prev => ({ ...prev, avatar_url: "" }));
      setProfileNotification("✅ Profile photo removed");
      setTimeout(() => setProfileNotification(""), 3000);
    } catch (err) {
      alert(err.message);
    }
  }

  // Camera capture for profile photo
  async function startCamera() {
    setShowCameraModal(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      alert("Unable to access camera. Please check permissions or upload a photo from device.");
      setShowCameraModal(false);
    }
  }

  function stopCamera() {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setShowCameraModal(false);
  }

  function captureCameraPhoto() {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    const v = videoRef.current;
    const minDim = Math.min(v.videoWidth, v.videoHeight);
    const startX = (v.videoWidth - minDim) / 2;
    const startY = (v.videoHeight - minDim) / 2;
    ctx.drawImage(v, startX, startY, minDim, minDim, 0, 0, 400, 400);

    canvas.toBlob(async (blob) => {
      stopCamera();
      if (!blob) return;
      const file = new File([blob], "camera_avatar.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch(`${API_BASE_URL}/api/profile/photo`, {
          method: "POST",
          headers: { Authorization: `Bearer ${getAuthToken()}` },
          body: formData
        });
        if (res.ok) {
          const data = await res.json();
          setUserProfile(prev => ({ ...prev, avatar_url: data.avatar_url }));
          setProfileNotification("✅ Camera photo captured and saved!");
          setTimeout(() => setProfileNotification(""), 3000);
        }
      } catch (err) {
        alert(err.message);
      }
    }, "image/png");
  }

  // -------------------------------------------------------------------------
  // LOGOUT (FEATURE 6)
  // -------------------------------------------------------------------------
  function handleConfirmLogout() {
    fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" }).catch(() => {});
    localStorage.removeItem("access_token");
    localStorage.removeItem("guest_mode");
    try {
      if (clerkSignOut) clerkSignOut();
    } catch {}
    setShowLogoutConfirm(false);
    setIsLoggedIn(false);
    setPage("dashboard");
  }

  // -------------------------------------------------------------------------
  // 1. RESUME ANALYZER (MODULE 1)
  // -------------------------------------------------------------------------
  async function triggerAtsAnalysis(file, textContent, role = targetRole) {
    setIsAnalyzing(true);
    setScanStep(0);
    setScanProgress(20);
    setAtsResult(null);

    const t1 = setTimeout(() => { setScanStep(1); setScanProgress(45); }, 400);
    const t2 = setTimeout(() => { setScanStep(2); setScanProgress(75); }, 800);
    const t3 = setTimeout(() => { setScanStep(3); setScanProgress(95); }, 1300);

    const formData = new FormData();
    formData.append("job_role", role);
    if (file) formData.append("file", file);
    else if (textContent) formData.append("raw_text", textContent);

    try {
      const res = await fetch(`${API_BASE_URL}/api/resume/analyze`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        body: formData
      });

      if (!res.ok) throw new Error("Resume analysis failed");
      const data = await res.json();
      setScanProgress(100);

      setTimeout(() => {
        setIsAnalyzing(false);
        setAtsResult(data);
        if (data.ats_score >= 70) {
          confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
        }
      }, 500);
    } catch {
      setIsAnalyzing(false);
      alert("Error analyzing resume. Please ensure file is valid PDF or DOCX.");
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }

  async function loadResumeHistory() {
    setResumeTab("history");
    try {
      const res = await fetch(`${API_BASE_URL}/api/resume/history`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (res.ok) {
        const list = await res.json();
        setResumeHistory(list);
      }
    } catch {}
  }

  // -------------------------------------------------------------------------
  // 3. MOCK INTERVIEW ACTIONS (MODULE 3)
  // -------------------------------------------------------------------------
  async function startMockInterviewSession() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/interview/start-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          role: interviewRole,
          mode: interviewMode
        })
      });
      if (!res.ok) throw new Error("Failed to start session");
      const data = await res.json();
      setInterviewQuestions(data.questions);
      setCurrentQIndex(0);
      setInterviewAnswer("");
      setCurrentEvaluation(null);
      setInterviewTimer(120);
      setIsTimerActive(true);

      if (autoSpeak && data.questions.length > 0) {
        speakText(data.questions[0].question);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function submitInterviewAnswer() {
    if (!interviewAnswer.trim()) return alert("Please record or type an answer first.");
    setIsEvaluating(true);
    setIsTimerActive(false);

    const currentQ = interviewQuestions[currentQIndex];
    try {
      const res = await fetch(`${API_BASE_URL}/api/interview/evaluate-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQ.question,
          answer: interviewAnswer,
          key_points: currentQ.key_points
        })
      });
      if (!res.ok) throw new Error("Answer evaluation failed");
      const evalData = await res.json();
      setCurrentEvaluation(evalData);
      if (evalData.score >= 8) {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsEvaluating(false);
    }
  }

  function nextInterviewQuestion() {
    if (currentQIndex + 1 < interviewQuestions.length) {
      const nextIdx = currentQIndex + 1;
      setCurrentQIndex(nextIdx);
      setInterviewAnswer("");
      setCurrentEvaluation(null);
      setInterviewTimer(120);
      setIsTimerActive(true);
      if (autoSpeak) {
        speakText(interviewQuestions[nextIdx].question);
      }
    } else {
      // Complete and save session
      fetch(`${API_BASE_URL}/api/interview/complete-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          role: interviewRole,
          mode: interviewMode,
          overall_score: currentEvaluation?.score || 8,
          report: { total: interviewQuestions.length, last_eval: currentEvaluation }
        })
      }).catch(() => {});

      alert("🎉 Interview practice session completed and saved to your account!");
      setInterviewQuestions([]);
    }
  }

  // Schedule Interview Request Handler
  async function handleScheduleInterviewSubmit(e) {
    e.preventDefault();
    setScheduleStatusMsg("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/interview/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(scheduleForm)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Booking failed");

      setScheduleStatusMsg("✅ Interview scheduled successfully! Meeting room link created.");
      loadScheduledInterviews();
      confetti({ particleCount: 60, spread: 60 });
    } catch (err) {
      setScheduleStatusMsg(`❌ ${err.message}`);
    }
  }

  async function loadScheduledInterviews() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/interview/scheduled`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (res.ok) {
        const list = await res.json();
        setScheduledInterviews(list);
      }
    } catch {}
  }

  // -------------------------------------------------------------------------
  // 4. MOCK TEST ACTIONS (MODULE 4)
  // -------------------------------------------------------------------------
  async function startMockTest(examId) {
    setSelectedExamId(examId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/tests/questions/${examId}`);
      if (!res.ok) throw new Error("Failed to load questions");
      const questions = await res.json();
      setActiveTestQuestions(questions);
      setActiveQuestionIdx(0);
      setTestUserAnswers({});
      setMarkedForReview(new Set());
      setTestTimerSeconds(900);
      setTestTimerRunning(true);
      setTestView("taking");
    } catch (err) {
      alert(err.message);
    }
  }

  function handleSelectTestOption(qId, optionIdx) {
    setTestUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  }

  function toggleMarkForReview(qId) {
    setMarkedForReview(prev => {
      const updated = new Set(prev);
      if (updated.has(qId)) updated.delete(qId);
      else updated.add(qId);
      return updated;
    });
  }

  async function handleFinalTestSubmit() {
    setTestTimerRunning(false);
    setShowSubmitConfirm(false);

    try {
      const res = await fetch(`${API_BASE_URL}/api/tests/submit-attempt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          exam_id: selectedExamId,
          answers: testUserAnswers,
          time_taken_seconds: 900 - testTimerSeconds
        })
      });
      if (!res.ok) throw new Error("Submission failed");
      const result = await res.json();
      setTestResultData(result);
      setTestView("result");
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      alert(err.message);
    }
  }

  async function loadTestHistory() {
    setTestView("history");
    try {
      const res = await fetch(`${API_BASE_URL}/api/tests/history`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (res.ok) {
        const list = await res.json();
        setTestHistory(list);
      }
    } catch {}
  }

  // -------------------------------------------------------------------------
  // RENDER WORKSPACE VIEWS
  // -------------------------------------------------------------------------
  function renderMainContent() {
    // =======================================================================
    // 1. RESUME ANALYZER
    // =======================================================================
    if (page === "resume") {
      const score = atsResult?.ats_score || 0;
      const scoreColor = score >= 75 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

      return (
        <section className="feature-workspace">
          <div className="workspace-header">
            <div className="feature-icon purple"><FileUser size={26} /></div>
            <div>
              <h2>Resume Analyzer</h2>
              <p>AI-powered PDF resume scanner, ATS compliance evaluator, and keyword optimization engine.</p>
            </div>
            <div className="header-actions">
              <button
                className={`tab-btn ${resumeTab === "analyze" ? "active" : ""}`}
                onClick={() => setResumeTab("analyze")}
              >
                Scan Resume
              </button>
              <button
                className={`tab-btn ${resumeTab === "history" ? "active" : ""}`}
                onClick={loadResumeHistory}
              >
                Previous Analyses ({resumeHistory.length})
              </button>
            </div>
          </div>

          {resumeTab === "history" ? (
            <div className="panel history-panel">
              <div className="history-head">
                <h3>Saved Resume Analyses History</h3>
                <p>Review past audit results and track how your ATS scores have improved over time.</p>
              </div>
              {resumeHistory.length === 0 ? (
                <p className="muted" style={{ padding: "20px 0" }}>No saved resume analyses found. Upload your first resume to generate history!</p>
              ) : (
                <div className="history-list">
                  {resumeHistory.map(item => (
                    <div key={item.id} className="history-row">
                      <div className="h-score-badge" style={{ backgroundColor: `${item.ats_score >= 70 ? "#10b981" : "#f59e0b"}20`, color: item.ats_score >= 70 ? "#10b981" : "#f59e0b" }}>
                        <strong>{item.ats_score}</strong>
                        <small>ATS</small>
                      </div>
                      <div className="h-info">
                        <strong>{item.filename}</strong>
                        <span>Role: {item.target_role.replace(/_/g, " ").toUpperCase()} • {new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                      <button
                        className="secondary-btn"
                        onClick={() => {
                          setAtsResult(item.analysis);
                          setResumeTab("analyze");
                        }}
                      >
                        View Analysis <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Upload Card */}
              {!atsResult && !isAnalyzing && (
                <div className="panel upload-card">
                  <div
                    className={`upload-zone ${dragActive ? "drag-active" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        setResumeFile(file);
                        setResumeFileName(file.name);
                        triggerAtsAnalysis(file, "", targetRole);
                      }
                    }}
                  >
                    <div className="upload-icon-pulse"><Upload size={38} /></div>
                    <strong>Upload your resume in PDF format</strong>
                    <span>Extracts education, skills, projects & certifications • Instant ATS Evaluation</span>
                    <label className="browse-btn">
                      Choose PDF Resume
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setResumeFile(file);
                            setResumeFileName(file.name);
                            triggerAtsAnalysis(file, "", targetRole);
                          }
                        }}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>

                  <div className="role-selector-row">
                    <span className="field-hint"><Target size={16} /> Target Job Role for Skills Matching:</span>
                    <select
                      className="role-dropdown"
                      value={targetRole}
                      onChange={(e) => {
                        setTargetRole(e.target.value);
                        if (resumeFile || pastedText) triggerAtsAnalysis(resumeFile, pastedText, e.target.value);
                      }}
                    >
                      {TARGET_ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                    </select>
                  </div>

                  <div className="quick-sample-row">
                    <button
                      className="secondary-btn"
                      onClick={() => {
                        setResumeFileName("Alex_Candidate_Resume.pdf");
                        setPastedText(SAMPLE_RESUMES.fullstack);
                        triggerAtsAnalysis(null, SAMPLE_RESUMES.fullstack, targetRole);
                      }}
                    >
                      <Sparkles size={15} /> Try Sample Resume (Full Stack)
                    </button>
                    <button className="link-btn" onClick={() => setRawTextMode(!rawTextMode)}>
                      <FileText size={15} /> {rawTextMode ? "Hide Paste Area" : "Or Paste Resume Content"}
                    </button>
                  </div>

                  {rawTextMode && (
                    <div className="paste-area-box">
                      <textarea
                        rows={6}
                        placeholder="Paste resume text directly here..."
                        value={pastedText}
                        onChange={(e) => setPastedText(e.target.value)}
                      />
                      <button
                        className="primary-btn"
                        onClick={() => {
                          if (!pastedText.trim()) return alert("Please paste resume text.");
                          triggerAtsAnalysis(null, pastedText, targetRole);
                        }}
                      >
                        Analyze Pasted Content <ArrowUpRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Scanning Animation */}
              {isAnalyzing && (
                <div className="panel scanning-panel">
                  <div className="radar-scanner"><Sparkles className="pulse-sparkle" size={42} /></div>
                  <h3>Evaluating Resume Quality & ATS Compliance...</h3>
                  <div className="scan-progress-bar">
                    <div className="scan-progress-fill" style={{ width: `${scanProgress}%` }} />
                  </div>
                  <ul className="scan-steps-list">
                    <li className={scanStep >= 0 ? "active" : ""}><CheckCircle2 size={16} /> Extracting contact, education, and credentials</li>
                    <li className={scanStep >= 1 ? "active" : ""}><CheckCircle2 size={16} /> Analyzing technical skills against {targetRole.replace(/_/g, " ")}</li>
                    <li className={scanStep >= 2 ? "active" : ""}><CheckCircle2 size={16} /> Detecting unclear descriptions & quantifiable metrics</li>
                    <li className={scanStep >= 3 ? "active" : ""}><CheckCircle2 size={16} /> Compiling quality assessment and next steps</li>
                  </ul>
                </div>
              )}

              {/* Results Dashboard */}
              {atsResult && !isAnalyzing && (
                <div className="ats-results-container">
                  {/* Summary Banner */}
                  <div className="panel ats-summary-banner">
                    <div className="score-radial-block">
                      <svg className="radial-svg" viewBox="0 0 100 100">
                        <circle className="radial-bg" cx="50" cy="50" r="42" />
                        <circle
                          className="radial-fill"
                          cx="50"
                          cy="50"
                          r="42"
                          style={{
                            stroke: scoreColor,
                            strokeDasharray: 264,
                            strokeDashoffset: 264 - (264 * score) / 100
                          }}
                        />
                      </svg>
                      <div className="radial-text">
                        <span className="score-num" style={{ color: scoreColor }}>{score}</span>
                        <span className="score-sub">/ 100 ATS</span>
                      </div>
                    </div>

                    <div className="summary-details">
                      <div className="summary-badge" style={{ backgroundColor: `${scoreColor}15`, color: scoreColor }}>
                        <Sparkles size={15} /> {atsResult.quality_assessment?.rating || "Evaluated"}
                      </div>
                      <h3>Quality Assessment Reasoning</h3>
                      <p>{atsResult.quality_assessment?.reason}</p>
                      <div className="summary-meta-row">
                        <span><strong>Candidate:</strong> {atsResult.extracted_info?.candidate_name || "Applicant"}</span>
                        <span><strong>Email:</strong> {atsResult.extracted_info?.email}</span>
                        <span><strong>Phone:</strong> {atsResult.extracted_info?.phone}</span>
                        <span><strong>Words:</strong> {atsResult.word_count}</span>
                      </div>
                    </div>

                    <div className="summary-actions">
                      <button className="secondary-btn" onClick={() => setAtsResult(null)}>
                        <RefreshCw size={15} /> Re-scan Another
                      </button>
                    </div>
                  </div>

                  {/* Extracted Information Card */}
                  <div className="panel extracted-info-card">
                    <h4>📋 Extracted Information from Resume</h4>
                    <div className="extracted-grid">
                      <div>
                        <strong>🎓 Education:</strong>
                        <p>{atsResult.extracted_info?.education?.length ? atsResult.extracted_info.education.join(" • ") : "No explicit degree detected"}</p>
                      </div>
                      <div>
                        <strong>📜 Certifications:</strong>
                        <p>{atsResult.extracted_info?.certifications?.length ? atsResult.extracted_info.certifications.join(" • ") : "None detected"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="feedback-split-grid">
                    <div className="panel feedback-card">
                      <h4>✨ Strengths Identified</h4>
                      <ul>
                        {atsResult.strengths?.map((s, i) => <li key={i}><Check size={16} /> <span>{s}</span></li>)}
                      </ul>
                    </div>
                    <div className="panel feedback-card">
                      <h4>⚠️ Weaknesses & Missing Skills</h4>
                      <ul>
                        {atsResult.weaknesses?.map((w, i) => <li key={i}><AlertCircle size={16} /> <span>{w}</span></li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="keywords-grid">
                    <div className="panel keyword-box green-box">
                      <div className="box-title"><CheckCircle2 size={18} /><h4>Found Target Skills ({atsResult.skills?.found_count})</h4></div>
                      <div className="chips-wrap">
                        {atsResult.skills?.found.map((s, i) => <span key={i} className="chip chip-success">✓ {s}</span>)}
                      </div>
                    </div>
                    <div className="panel keyword-box amber-box">
                      <div className="box-title"><AlertCircle size={18} /><h4>Underrepresented / Missing Skills ({atsResult.skills?.missing_count})</h4></div>
                      <div className="chips-wrap">
                        {atsResult.skills?.missing.map((s, i) => <span key={i} className="chip chip-warning">+ {s}</span>)}
                      </div>
                    </div>
                  </div>

                  {/* Unclear descriptions & Project improvement opportunities */}
                  {atsResult.unclear_descriptions?.length > 0 && (
                    <div className="panel unclear-box">
                      <h4>🔍 Identified Unclear Descriptions</h4>
                      <p className="muted small">ATS parsers favor specific impact over passive duties.</p>
                      <div className="unclear-list">
                        {atsResult.unclear_descriptions.map((item, i) => (
                          <div key={i} className="unclear-item">
                            <em>"{item.phrase}"</em>
                            <span>→ {item.issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Concrete Rewrite Suggestions */}
                  {atsResult.rewrite_suggestions?.length > 0 && (
                    <div className="panel rewrite-box">
                      <div className="rewrite-title"><Zap size={20} /><h4>Content Improvement Suggestions (Preserving User Experience)</h4></div>
                      <div className="rewrites-list">
                        {atsResult.rewrite_suggestions.map((item, i) => (
                          <div key={i} className="rewrite-item">
                            <div className="rewrite-before"><span className="rw-tag before">Original phrasing</span><p>{item.original}</p></div>
                            <div className="rewrite-after"><span className="rw-tag after">Actionable Improvement</span><p>{item.revised}</p></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  <div className="panel next-steps-box">
                    <h4>🚀 Recommended Next Steps</h4>
                    <ul>
                      {atsResult.recommended_next_steps?.map((step, i) => <li key={i}>• {step}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      );
    }

    // =======================================================================
    // 2. CAREER GUIDANCE
    // =======================================================================
    if (page === "career") {
      const guidance = careerGuidanceData;

      return (
        <section className="feature-workspace">
          <div className="workspace-header">
            <div className="feature-icon blue"><Compass size={26} /></div>
            <div>
              <h2>Career Guidance</h2>
              <p>Personalized AI roadmaps, skill gap analysis, and placement guidance for top tech and government roles.</p>
            </div>
            <div className="header-actions">
              <button
                className={`tab-btn ${careerTab === "roadmap" ? "active" : ""}`}
                onClick={() => setCareerTab("roadmap")}
              >
                Roadmap Explorer
              </button>
              <button
                className={`tab-btn ${careerTab === "saved" ? "active" : ""}`}
                onClick={async () => {
                  setCareerTab("saved");
                  const res = await fetch(`${API_BASE_URL}/api/career/saved-plans`, {
                    headers: { Authorization: `Bearer ${getAuthToken()}` }
                  });
                  if (res.ok) setSavedCareerPlans(await res.json());
                }}
              >
                Saved Career Plans
              </button>
            </div>
          </div>

          {careerNotification && <div className="toast-banner">{careerNotification}</div>}

          {careerTab === "saved" ? (
            <div className="panel history-panel">
              <h3>Your Saved Career Plans</h3>
              {savedCareerPlans.length === 0 ? (
                <p className="muted" style={{ padding: "20px 0" }}>No saved career plans yet. Click "Save this Career Plan" on any role roadmap!</p>
              ) : (
                <div className="history-list">
                  {savedCareerPlans.map(plan => (
                    <div key={plan.id} className="history-row">
                      <div className="h-info">
                        <strong>{plan.target_role}</strong>
                        <span>Saved on {new Date(plan.created_at).toLocaleDateString()} • {plan.readiness_percent}% Job Readiness</span>
                      </div>
                      <span className="done-label">{plan.skills_known?.length} skills mastered</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Role Picker */}
              <div className="career-tabs-row">
                {guidance?.recommended_roles?.map(r => (
                  <button
                    key={r.id}
                    className={`career-tab ${selectedCareerRole === r.id ? "active" : ""}`}
                    onClick={() => setSelectedCareerRole(r.id)}
                  >
                    <strong>{r.title}</strong>
                    <small>{r.category} • {r.salary}</small>
                  </button>
                ))}
              </div>

              {guidance && (
                <div className="panel career-overview-card">
                  <div className="career-info-top">
                    <div>
                      <span className="role-chip">{guidance.badge}</span>
                      <h3>{guidance.target_role}</h3>
                      <p>{guidance.overview}</p>
                    </div>
                    <div className="salary-box">
                      <span className="sal-label">Expected Salary</span>
                      <strong>{guidance.avg_salary.in}</strong>
                      <small>US: {guidance.avg_salary.us}</small>
                    </div>
                  </div>

                  {/* Skill Gap Analysis */}
                  <div className="skill-gap-section">
                    <div className="skill-gap-header">
                      <div>
                        <h4>Skill Gap & Readiness Analysis</h4>
                        <p>Comparing your active profile against industry standards for {guidance.target_role}.</p>
                      </div>
                      <div className="gap-meter">
                        <span className="gap-percent">{guidance.readiness_percent}% Ready</span>
                      </div>
                    </div>

                    <div className="gap-columns">
                      <div>
                        <h5>✓ Mastered Skills:</h5>
                        <div className="chips-wrap">
                          {guidance.existing_skills?.map((s, i) => <span key={i} className="chip chip-success">{s}</span>)}
                          {guidance.existing_skills?.length === 0 && <span className="muted small">None detected yet</span>}
                        </div>
                      </div>
                      <div>
                        <h5>⚠️ Skills You Need to Learn:</h5>
                        <div className="chips-wrap">
                          {guidance.missing_skills?.map((s, i) => <span key={i} className="chip chip-warning">+ {s}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Roadmap Steps */}
                  <h4 style={{ margin: "24px 0 16px" }}>Actionable Preparation Roadmap</h4>
                  <div className="phases-timeline">
                    {guidance.roadmap_steps?.map((step, idx) => (
                      <div key={idx} className="phase-card">
                        <div className="phase-marker">{idx + 1}</div>
                        <div className="phase-content">
                          <div className="phase-head">
                            <h5>{step.step}</h5>
                            <span className="duration-pill"><Clock size={13} /> {step.duration}</span>
                          </div>
                          <ul className="phase-topics">
                            {step.focus?.map((f, fi) => <li key={fi}>• {f}</li>)}
                          </ul>
                          <div className="milestone-project"><strong>🚀 Deliverable:</strong> {step.deliverable}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Placement Guidance */}
                  <div className="placement-guidance-box">
                    <div className="pg-card">
                      <h5>🏢 Private Company Placements (FAANG & Startups):</h5>
                      <p>{guidance.placement_guidance?.private_companies}</p>
                    </div>
                    <div className="pg-card">
                      <h5>🏛️ Government & PSU Examinations:</h5>
                      <p>{guidance.placement_guidance?.govt_exams}</p>
                    </div>
                  </div>

                  <div className="career-cta-row">
                    <button
                      className="primary-btn"
                      onClick={async () => {
                        const res = await fetch(`${API_BASE_URL}/api/career/save-plan`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${getAuthToken()}`
                          },
                          body: JSON.stringify(guidance)
                        });
                        if (res.ok) {
                          setCareerNotification("✅ Career plan saved to your account!");
                          setTimeout(() => setCareerNotification(""), 3500);
                        }
                      }}
                    >
                      <Bookmark size={16} /> Save this Career Plan
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={() => {
                        setInterviewRole(selectedCareerRole);
                        setPage("interview");
                      }}
                    >
                      Start Mock Interview for this Role <Video size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      );
    }

    // =======================================================================
    // 3. MOCK INTERVIEW
    // =======================================================================
    if (page === "interview") {
      const currentQ = interviewQuestions[currentQIndex];

      return (
        <section className="feature-workspace">
          <div className="workspace-header">
            <div className="feature-icon orange"><Video size={26} /></div>
            <div>
              <h2>Mock Interview</h2>
              <p>Practice voice-based AI interviews with real evaluation or schedule video calls with human interviewers.</p>
            </div>
            <div className="header-actions">
              <button
                className={`tab-btn ${interviewSection === "ai_voice" ? "active" : ""}`}
                onClick={() => setInterviewSection("ai_voice")}
              >
                AI Voice Interview
              </button>
              <button
                className={`tab-btn ${interviewSection === "schedule" ? "active" : ""}`}
                onClick={() => {
                  setInterviewSection("schedule");
                  loadScheduledInterviews();
                }}
              >
                Schedule Video Call
              </button>
              <button
                className={`tab-btn ${interviewSection === "history" ? "active" : ""}`}
                onClick={async () => {
                  setInterviewSection("history");
                  const res = await fetch(`${API_BASE_URL}/api/interview/history`, {
                    headers: { Authorization: `Bearer ${getAuthToken()}` }
                  });
                  if (res.ok) setInterviewHistory(await res.json());
                }}
              >
                Past Reports
              </button>
            </div>
          </div>

          {/* Section A: AI Voice Interview */}
          {interviewSection === "ai_voice" && (
            <>
              {interviewQuestions.length === 0 ? (
                <div className="panel interview-config-card">
                  <h3>Configure AI Voice Mock Interview</h3>
                  <p>Choose your target role, interview mode, and configure voice answering.</p>

                  <div className="config-grid">
                    <div>
                      <label>Target Role:</label>
                      <select value={interviewRole} onChange={(e) => setInterviewRole(e.target.value)}>
                        {TARGET_ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label>Interview Mode:</label>
                      <select value={interviewMode} onChange={(e) => setInterviewMode(e.target.value)}>
                        <option value="mixed">Mixed (Technical + Project + HR)</option>
                        <option value="technical">Technical In-Depth</option>
                        <option value="project_based">Project & Experience Deep-Dive</option>
                        <option value="hr">HR & Behavioral (STAR)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mic-consent-banner">
                    <Shield size={18} />
                    <span>Microphone Consent: Spoken answers are processed locally in your browser for text conversion. Audio is never stored without permission.</span>
                  </div>

                  <button className="primary-btn" onClick={startMockInterviewSession} style={{ marginTop: "18px" }}>
                    <Play size={16} /> Start AI Voice Interview Session
                  </button>
                </div>
              ) : (
                <div className="panel interview-card">
                  <div className="interview-card-top">
                    <span className="q-badge">Question {currentQIndex + 1} of {interviewQuestions.length}</span>
                    <button className="speak-btn" onClick={() => speakText(currentQ.question)} title="Repeat Question">
                      <Volume2 size={15} /> Repeat Voice
                    </button>
                    <div className="interview-timer-chip">
                      <Clock size={15} />
                      <span>{Math.floor(interviewTimer / 60)}:{(interviewTimer % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>

                  <h3 className="interview-q-title">{currentQ?.question}</h3>

                  <div className="answer-box">
                    <div className="answer-toolbar">
                      <span>Your Answer ({interviewAnswer.split(/\s+/).filter(Boolean).length} words):</span>
                      <button
                        type="button"
                        className={`voice-btn ${isListening ? "listening" : ""}`}
                        onClick={toggleVoiceDictation}
                      >
                        {isListening ? <><MicOff size={15} /> Stop Recording</> : <><Mic size={15} /> Speak Answer (Mic)</>}
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Speak or type your answer here..."
                      value={interviewAnswer}
                      onChange={(e) => setInterviewAnswer(e.target.value)}
                    />
                  </div>

                  <div className="interview-submit-row">
                    <button
                      className="primary-btn"
                      disabled={isEvaluating || !interviewAnswer.trim()}
                      onClick={submitInterviewAnswer}
                    >
                      {isEvaluating ? "Evaluating..." : "Submit Answer & Evaluate"} <Sparkles size={16} />
                    </button>
                    <button className="secondary-btn" onClick={nextInterviewQuestion}>
                      Skip / Next Question <ArrowRight size={16} />
                    </button>
                  </div>

                  {currentEvaluation && (
                    <div className="evaluation-result-card">
                      <div className="eval-top">
                        <div className="eval-score-circle">
                          <strong>{currentEvaluation.score}</strong>
                          <small>/ 10</small>
                        </div>
                        <div>
                          <h4>AI Answer Feedback</h4>
                          <p>{currentEvaluation.feedback}</p>
                        </div>
                      </div>

                      <div className="eval-meters">
                        <div><span>Relevance: <strong>{currentEvaluation.relevance_score}%</strong></span></div>
                        <div><span>Correctness: <strong>{currentEvaluation.correctness_score}%</strong></span></div>
                        <div><span>Completeness: <strong>{currentEvaluation.completeness_score}%</strong></span></div>
                        <div><span>Communication: <strong>{currentEvaluation.communication_score}%</strong></span></div>
                      </div>

                      {currentEvaluation.follow_up_question && (
                        <div className="follow-up-box">
                          <strong>🎯 Suggested Follow-Up Question:</strong>
                          <p>"{currentEvaluation.follow_up_question}"</p>
                        </div>
                      )}

                      <button className="primary-btn" onClick={nextInterviewQuestion} style={{ marginTop: "16px" }}>
                        Proceed to Next Question <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Section B: Schedule Interview with Video Conference */}
          {interviewSection === "schedule" && (
            <div className="schedule-interview-wrap">
              <div className="panel schedule-form-card">
                <h3>Request Human Interview (Live Video Call)</h3>
                <p>Book a 1-on-1 mock technical interview session with a human interviewer.</p>

                {scheduleStatusMsg && <div className="toast-banner">{scheduleStatusMsg}</div>}

                <form onSubmit={handleScheduleInterviewSubmit} className="interview-sched-form">
                  <div className="form-row">
                    <label>
                      Full Name
                      <input
                        type="text"
                        value={scheduleForm.full_name}
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, full_name: e.target.value }))}
                        required
                      />
                    </label>
                    <label>
                      Email Address
                      <input
                        type="email"
                        value={scheduleForm.email}
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Phone Number (with Country Code)
                      <input
                        type="text"
                        placeholder="+91 9876543210"
                        value={scheduleForm.phone}
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </label>
                    <label>
                      Target Job Role
                      <select
                        value={scheduleForm.target_role}
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, target_role: e.target.value }))}
                      >
                        {TARGET_ROLES.map(r => <option key={r.id} value={r.label}>{r.label}</option>)}
                      </select>
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Preferred Date
                      <input
                        type="date"
                        value={scheduleForm.preferred_date}
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, preferred_date: e.target.value }))}
                        required
                      />
                    </label>
                    <label>
                      Time Slot
                      <select
                        value={scheduleForm.time_slot}
                        onChange={(e) => setScheduleForm(prev => ({ ...prev, time_slot: e.target.value }))}
                      >
                        <option value="10:00 AM - 10:45 AM">10:00 AM - 10:45 AM</option>
                        <option value="02:00 PM - 02:45 PM">02:00 PM - 02:45 PM</option>
                        <option value="04:30 PM - 05:15 PM">04:30 PM - 05:15 PM</option>
                        <option value="07:00 PM - 07:45 PM">07:00 PM - 07:45 PM</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Optional Message / Areas of Focus
                    <textarea
                      rows={2}
                      placeholder="e.g. Focus on distributed systems and concurrency"
                      value={scheduleForm.message}
                      onChange={(e) => setScheduleForm(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </label>

                  <button type="submit" className="primary-btn">
                    Confirm & Schedule Interview <Video size={16} />
                  </button>
                </form>
              </div>

              {/* Scheduled Interviews List */}
              <div className="panel scheduled-list-card">
                <h4>Your Scheduled Video Calls ({scheduledInterviews.length})</h4>
                {scheduledInterviews.length === 0 ? (
                  <p className="muted small">No scheduled video interviews yet.</p>
                ) : (
                  <div className="scheduled-grid">
                    {scheduledInterviews.map(item => (
                      <div key={item.id} className="scheduled-item-card">
                        <div className="sic-head">
                          <span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span>
                          <span className="sic-date">{item.preferred_date} • {item.time_slot}</span>
                        </div>
                        <h5>{item.target_role}</h5>
                        <p>{item.full_name} ({item.email})</p>
                        {item.meeting_link && (
                          <a
                            href={item.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="join-video-btn"
                          >
                            <Video size={15} /> Join Video Interview (Jitsi Meet) <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section C: Past Reports */}
          {interviewSection === "history" && (
            <div className="panel history-panel">
              <h3>Past Interview History & Reports</h3>
              {interviewHistory.length === 0 ? (
                <p className="muted">No past interview sessions found.</p>
              ) : (
                <div className="history-list">
                  {interviewHistory.map(item => (
                    <div key={item.id} className="history-row">
                      <div className="h-score-badge"><strong>{item.overall_score}</strong><small>/10</small></div>
                      <div className="h-info">
                        <strong>{item.role} ({item.mode.toUpperCase()})</strong>
                        <span>Completed on {new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      );
    }

    // =======================================================================
    // 4. MOCK TEST
    // =======================================================================
    if (page === "tests") {
      const currentQ = activeTestQuestions[activeQuestionIdx];
      const isLastQ = activeQuestionIdx + 1 === activeTestQuestions.length;

      return (
        <section className="feature-workspace">
          <div className="workspace-header">
            <div className="feature-icon green"><Brain size={26} /></div>
            <div>
              <h2>Mock Test</h2>
              <p>Exam preparation for Government examinations (SSC, Banking) and Corporate placement assessments.</p>
            </div>
            <div className="header-actions">
              <button
                className={`tab-btn ${testView === "select" ? "active" : ""}`}
                onClick={() => setTestView("select")}
              >
                Exams Catalog
              </button>
              <button
                className={`tab-btn ${testView === "history" ? "active" : ""}`}
                onClick={loadTestHistory}
              >
                Test Attempt History
              </button>
            </div>
          </div>

          {/* Exam Selection Catalog */}
          {testView === "select" && (
            <div className="exam-catalog-grid">
              {allExams.map(exam => (
                <div key={exam.id} className="panel exam-card">
                  <span className="exam-cat-pill">{exam.category}</span>
                  <h3>{exam.title}</h3>
                  <p>{exam.description}</p>
                  <div className="exam-meta">
                    <span><Clock size={14} /> {exam.duration_minutes} Mins</span>
                    <span><Award size={14} /> {exam.total_marks} Marks</span>
                  </div>
                  <div className="exam-subjects-pills">
                    {exam.subjects.map((s, i) => <span key={i} className="chip">{s}</span>)}
                  </div>
                  <button className="primary-btn" onClick={() => startMockTest(exam.id)}>
                    Start Timed Test <Play size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Active Test Taking Interface */}
          {testView === "taking" && currentQ && (
            <div className="test-taking-container">
              <div className="panel test-topbar">
                <div>
                  <strong>{allExams.find(e => e.id === selectedExamId)?.title}</strong>
                  <span className="question-source-tag">
                    {currentQ.question_type === "Verified PYQ" ? "⭐ " : "🤖 "}
                    {currentQ.question_type}: {currentQ.source}
                  </span>
                </div>
                <div className="test-timer-clock">
                  <Clock size={16} />
                  <span>{Math.floor(testTimerSeconds / 60)}:{(testTimerSeconds % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              <div className="test-body-grid">
                {/* Main Question Panel */}
                <div className="panel test-q-card">
                  <div className="q-card-head">
                    <span className="q-num">Question {activeQuestionIdx + 1} of {activeTestQuestions.length}</span>
                    <span className="subj-label">{currentQ.subject}</span>
                    <label className="review-check">
                      <input
                        type="checkbox"
                        checked={markedForReview.has(currentQ.id)}
                        onChange={() => toggleMarkForReview(currentQ.id)}
                      />
                      <span>Mark for Review</span>
                    </label>
                  </div>

                  <h3 className="test-q-text">{currentQ.question}</h3>

                  <div className="test-options-list">
                    {currentQ.options.map((opt, idx) => (
                      <button
                        key={idx}
                        className={`test-opt-btn ${testUserAnswers[currentQ.id] === idx ? "selected" : ""}`}
                        onClick={() => handleSelectTestOption(currentQ.id, idx)}
                      >
                        <span className="opt-char">{String.fromCharCode(65 + idx)}</span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>

                  <div className="test-controls-row">
                    <button
                      className="secondary-btn"
                      disabled={activeQuestionIdx === 0}
                      onClick={() => setActiveQuestionIdx(i => i - 1)}
                    >
                      Previous
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={() => {
                        const updated = { ...testUserAnswers };
                        delete updated[currentQ.id];
                        setTestUserAnswers(updated);
                      }}
                    >
                      Clear Response
                    </button>
                    {!isLastQ ? (
                      <button className="primary-btn" onClick={() => setActiveQuestionIdx(i => i + 1)}>
                        Next Question <ArrowRight size={15} />
                      </button>
                    ) : (
                      <button className="primary-btn submit-btn" onClick={() => setShowSubmitConfirm(true)}>
                        Submit Test <Check size={15} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Palette Sidebar */}
                <div className="panel test-palette-card">
                  <h4>Question Palette</h4>
                  <div className="palette-grid">
                    {activeTestQuestions.map((q, idx) => {
                      const isAnswered = testUserAnswers[q.id] !== undefined;
                      const isReviewed = markedForReview.has(q.id);
                      let status = "unanswered";
                      if (isAnswered && isReviewed) status = "answered-review";
                      else if (isAnswered) status = "answered";
                      else if (isReviewed) status = "review";

                      return (
                        <button
                          key={idx}
                          className={`palette-num ${status} ${activeQuestionIdx === idx ? "active" : ""}`}
                          onClick={() => setActiveQuestionIdx(idx)}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="palette-legend">
                    <div><span className="p-dot answered" /> Answered ({Object.keys(testUserAnswers).length})</div>
                    <div><span className="p-dot unanswered" /> Unanswered</div>
                    <div><span className="p-dot review" /> Marked for Review</div>
                  </div>

                  <button
                    className="primary-btn submit-btn"
                    style={{ width: "100%", marginTop: "18px" }}
                    onClick={() => setShowSubmitConfirm(true)}
                  >
                    Submit Test
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit Confirmation Modal */}
          {showSubmitConfirm && (
            <div className="modal-overlay">
              <div className="panel confirm-modal">
                <h3>Submit Mock Test?</h3>
                <p>
                  You have answered <strong>{Object.keys(testUserAnswers).length}</strong> of {activeTestQuestions.length} questions.
                  Are you ready to submit and calculate your score?
                </p>
                <div className="confirm-btn-row">
                  <button className="secondary-btn" onClick={() => setShowSubmitConfirm(false)}>Resume Test</button>
                  <button className="primary-btn" onClick={handleFinalTestSubmit}>Confirm & Submit</button>
                </div>
              </div>
            </div>
          )}

          {/* Test Results Dashboard */}
          {testView === "result" && testResultData && (
            <div className="test-results-wrap">
              <div className="panel test-score-banner">
                <div className="score-badge-circle">
                  <strong>{testResultData.score}</strong>
                  <small>/ {testResultData.max_marks}</small>
                </div>
                <div>
                  <h3>Assessment Results: {testResultData.accuracy_percent}% Accuracy</h3>
                  <div className="score-meta-pills">
                    <span className="pill-c">✓ {testResultData.correct_answers} Correct</span>
                    <span className="pill-i">✗ {testResultData.incorrect_answers} Incorrect</span>
                    <span className="pill-u">○ {testResultData.unanswered} Unanswered</span>
                    <span>Time: {Math.floor(testResultData.time_taken_seconds / 60)}m {testResultData.time_taken_seconds % 60}s</span>
                  </div>
                </div>
                <button className="primary-btn" onClick={() => setTestView("select")}>
                  Take Another Test
                </button>
              </div>

              {/* Subject Breakdown */}
              <div className="panel subject-perf-card">
                <h4>Subject & Topic Performance</h4>
                <div className="subj-perf-grid">
                  {testResultData.subject_performance?.map((s, i) => (
                    <div key={i} className="subj-perf-item">
                      <span>{s.subject}</span>
                      <strong>{s.accuracy_percent}% ({s.correct}/{s.total})</strong>
                      <div className="bar-track">
                        <div className="bar-fill green" style={{ width: `${s.accuracy_percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Detailed Explanations */}
              <div className="panel q-explanations-card">
                <h4>Question-by-Question Detailed Review</h4>
                <div className="explanations-list">
                  {testResultData.questions_detail?.map((q, idx) => (
                    <div key={idx} className={`q-exp-item ${q.is_correct ? "correct" : q.is_unanswered ? "unanswered" : "incorrect"}`}>
                      <div className="q-exp-head">
                        <strong>Q{idx + 1}. {q.question}</strong>
                        <span className="q-tag">{q.question_type} ({q.source})</span>
                      </div>
                      <div className="q-opts-review">
                        <span>Your Answer: {q.selected_index !== null && q.selected_index >= 0 ? q.options[q.selected_index] : "Unanswered"}</span>
                        <span>Correct Answer: {q.options[q.correct_index]}</span>
                      </div>
                      <p className="exp-text"><strong>💡 Explanation:</strong> {q.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Test History */}
          {testView === "history" && (
            <div className="panel history-panel">
              <h3>Past Test Attempt History</h3>
              {testHistory.length === 0 ? (
                <p className="muted">No completed attempts recorded yet.</p>
              ) : (
                <div className="history-list">
                  {testHistory.map(item => (
                    <div key={item.id} className="history-row">
                      <div className="h-score-badge"><strong>{item.score}</strong><small>Marks</small></div>
                      <div className="h-info">
                        <strong>{allExams.find(e => e.id === item.exam_name)?.title || item.exam_name}</strong>
                        <span>{new Date(item.created_at).toLocaleDateString()} • {item.accuracy_percent}% Accuracy</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      );
    }

    // =======================================================================
    // 5. USER PROFILE PAGE (FEATURE 5 & 6)
    // =======================================================================
    if (page === "profile") {
      return (
        <section className="feature-workspace">
          <div className="workspace-header">
            <div className="feature-icon purple"><User size={26} /></div>
            <div>
              <h2>User Profile</h2>
              <p>Manage your authenticated account details, credentials, and profile photo.</p>
            </div>
          </div>

          {profileNotification && <div className="toast-banner">{profileNotification}</div>}

          <div className="profile-layout-grid">
            {/* Left Card: Photo & Quick Info */}
            <div className="panel profile-avatar-card">
              <div className="avatar-large-wrap">
                {userProfile.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Profile" className="avatar-img-large" loading="lazy" decoding="async" width="120" height="120" />
                ) : (
                  <div className="avatar-placeholder-large">
                    {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>

              <h3>{userProfile.name}</h3>
              <p>{userProfile.target_role || "Candidate"}</p>

              <div className="photo-actions-row">
                <label className="photo-upload-btn">
                  <Upload size={14} /> Upload Photo
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoUpload}
                    style={{ display: "none" }}
                  />
                </label>
                <button className="secondary-btn" onClick={startCamera}>
                  <Camera size={14} /> Take Photo
                </button>
                {userProfile.avatar_url && (
                  <button className="danger-btn" onClick={handleRemovePhoto}>
                    <Trash2 size={14} /> Remove
                  </button>
                )}
              </div>
            </div>

            {/* Right Card: Full Details & Edit Form */}
            <div className="panel profile-details-card">
              <div className="details-card-head">
                <h4>Account & Educational Details</h4>
                {!isEditingProfile ? (
                  <button className="secondary-btn" onClick={() => setIsEditingProfile(true)}>
                    <Edit3 size={15} /> Edit Profile
                  </button>
                ) : (
                  <button className="secondary-btn" onClick={() => setIsEditingProfile(false)}>
                    Cancel
                  </button>
                )}
              </div>

              {!isEditingProfile ? (
                <div className="profile-view-list">
                  <div className="p-item"><Mail size={16} /><div><label>Email Address</label><strong>{userProfile.email}</strong></div></div>
                  <div className="p-item"><Phone size={16} /><div><label>Phone Number</label><strong>{userProfile.phone || "Not added"}</strong></div></div>
                  <div className="p-item"><GraduationCap size={16} /><div><label>Education / Degree</label><strong>{userProfile.education || "Not added"}</strong></div></div>
                  <div className="p-item"><Building2 size={16} /><div><label>College / University</label><strong>{userProfile.college || "Not added"}</strong></div></div>
                  <div className="p-item"><Target size={16} /><div><label>Target Job Role</label><strong>{userProfile.target_role || "Not added"}</strong></div></div>
                  <div className="p-item"><Bookmark size={16} /><div><label>Career Interests</label><strong>{userProfile.career_interests || "Not added"}</strong></div></div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="profile-edit-form">
                  <label>
                    Full Name
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Phone Number
                    <input
                      type="text"
                      placeholder="+91 9876543210"
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    />
                  </label>
                  <label>
                    Education / Degree
                    <input
                      type="text"
                      value={editFormData.education}
                      onChange={(e) => setEditFormData({ ...editFormData, education: e.target.value })}
                    />
                  </label>
                  <label>
                    College / University
                    <input
                      type="text"
                      value={editFormData.college}
                      onChange={(e) => setEditFormData({ ...editFormData, college: e.target.value })}
                    />
                  </label>
                  <label>
                    Target Job Role
                    <input
                      type="text"
                      value={editFormData.target_role}
                      onChange={(e) => setEditFormData({ ...editFormData, target_role: e.target.value })}
                    />
                  </label>
                  <label>
                    Career Interests
                    <input
                      type="text"
                      value={editFormData.career_interests}
                      onChange={(e) => setEditFormData({ ...editFormData, career_interests: e.target.value })}
                    />
                  </label>
                  <button type="submit" className="primary-btn">
                    Save Changes <Check size={16} />
                  </button>
                </form>
              )}

              {/* ACCOUNT ACTIONS & LOGOUT (FEATURE 6) */}
              <div className="account-actions-box">
                <h4>Account Actions</h4>
                <p>Manage your authenticated session.</p>
                <button className="logout-danger-btn" onClick={() => setShowLogoutConfirm(true)}>
                  <LogOut size={16} /> Log Out from Mentor AI Aura
                </button>
              </div>
            </div>
          </div>

          {/* Camera Modal */}
          {showCameraModal && (
            <div className="modal-overlay">
              <div className="panel camera-modal">
                <h4>Take Profile Photo with Camera</h4>
                <video ref={videoRef} autoPlay playsInline className="camera-video-preview" />
                <div className="camera-actions-row">
                  <button className="primary-btn" onClick={captureCameraPhoto}>
                    <Camera size={16} /> Capture Photo
                  </button>
                  <button className="secondary-btn" onClick={stopCamera}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      );
    }

    if (page === "chat") {
      return <MentorChatModule userProfile={userProfile} />;
    }

    if (page === "jobs") {
      return <FindJobModule userProfile={userProfile} />;
    }

    if (page === "contact") {
      return <ContactWithGlobe />;
    }

    // =======================================================================
    // DEFAULT DASHBOARD VIEW
    // =======================================================================
    return (
      <>
        {/* Cosmic EarthBlaze Header with Animated BeamBorder */}
        <div className="dashboard-hero-wrapper">
          <BeamBorder
            size="md"
            colorVariant="colorful"
            theme="dark"
            active={true}
            strength={1.5}
            duration={3.5}
            beamWidth={2}
            borderRadius={24}
            className="w-full max-w-[1020px] mx-auto rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="earth-blaze-header-container">
              <EarthBlaze
                starCount={2400}
                galaxyBrightness={1.15}
                surfaceBrightness={1.1}
                illumination={1.2}
                auroraEnabled={true}
                interactive={true}
                className="rounded-3xl"
                style={{
                  height: 290,
                  minHeight: 260,
                  aspectRatio: "auto",
                  borderRadius: "24px",
                  overflow: "hidden",
                }}
              >
                <div className="earth-blaze-dashboard-overlay">
                  <div className="earth-blaze-brand-badge">
                    <div className="earth-blaze-logo-icon">
                      <Sparkles size={16} />
                    </div>
                    <span className="earth-blaze-brand-text">
                      Mentor AI <strong className="brand-aura-highlight">Aura</strong>
                    </span>
                  </div>

                  <div className="earth-blaze-welcome-bottom-right">
                    <h1 className="earth-blaze-welcome-heading">
                      <TextShimmer
                        text={`Welcome, ${userProfile?.name || "Candidate"}`}
                        as="span"
                        duration={2.4}
                        spread={36}
                        baseColor="#cbd5e1"
                        shimmerColor="#ffffff"
                        className="earth-blaze-shimmer-welcome"
                      />
                      <span className="welcome-wave-emoji">👋</span>
                    </h1>
                  </div>
                </div>
              </EarthBlaze>
            </div>
          </BeamBorder>
        </div>

        {/* 6 Main Modules Grid */}
        <div className="section-heading">
          <div>
            <h2>Core Modules</h2>
            <p>Select any module below to begin your career preparation.</p>
          </div>
          <span className="live-pill"><span /> 7 Modules Ready</span>
        </div>

        <div className="feature-grid">
          <button className="feature-card" onClick={() => setPage("resume")}>
            <div className="feature-icon resume"><FileUser size={40} /></div>
            <ArrowUpRight className="card-arrow" size={19} />
            <h3>Resume Analyzer</h3>
            <span className="card-link">Open Module <span>→</span></span>
          </button>

          <button className="feature-card" onClick={() => setPage("career")}>
            <div className="feature-icon career"><Compass size={40} /></div>
            <ArrowUpRight className="card-arrow" size={19} />
            <h3>Career Guidance</h3>
            <span className="card-link">Open Module <span>→</span></span>
          </button>

          <button className="feature-card" onClick={() => setPage("interview")}>
            <div className="feature-icon interview"><Video size={40} /></div>
            <ArrowUpRight className="card-arrow" size={19} />
            <h3>Mock Interview</h3>
            <span className="card-link">Open Module <span>→</span></span>
          </button>

          <button className="feature-card" onClick={() => setPage("tests")}>
            <div className="feature-icon tests"><Brain size={40} /></div>
            <ArrowUpRight className="card-arrow" size={19} />
            <h3>Mock Test</h3>
            <span className="card-link">Open Module <span>→</span></span>
          </button>

          <button className="feature-card" onClick={() => setPage("chat")}>
            <div className="feature-icon chat"><MessageSquare size={40} /></div>
            <ArrowUpRight className="card-arrow" size={19} />
            <h3>AI Mentor Chat</h3>
            <span className="card-link">Open Module <span>→</span></span>
          </button>

          <button className="feature-card" onClick={() => setPage("jobs")}>
            <div className="feature-icon jobs"><Briefcase size={40} /></div>
            <ArrowUpRight className="card-arrow" size={19} />
            <h3>Find Job</h3>
            <span className="card-link">Open Module <span>→</span></span>
          </button>

          <button className="feature-card" onClick={() => setPage("contact")}>
            <div className="feature-icon contact"><Mail size={40} /></div>
            <ArrowUpRight className="card-arrow" size={19} />
            <h3>Contact Us</h3>
            <span className="card-link">Open Module <span>→</span></span>
          </button>
        </div>

        {/* Lower Grid: Profile Quick Card & Preparation Progress */}
        <div className="lower-grid">
          <section className="panel progress-panel">
            <div className="panel-title">
              <div>
                <h3>Preparation Overview</h3>
                <p>Track your active career preparation milestones.</p>
              </div>
              <Target size={21} />
            </div>
            <div className="progress-track"><span style={{ width: "75%" }} /></div>
            <div className="progress-caption">
              <span>Overall Readiness</span>
              <strong>75% Complete</strong>
            </div>
            <div className="check-row"><CheckCircle2 size={17} /><span>Resume Analyzer ATS Scoring</span><span className="done-label">Active</span></div>
            <div className="check-row"><CheckCircle2 size={17} /><span>Career Guidance Roadmaps</span><span className="done-label">Personalized</span></div>
            <div className="check-row"><CheckCircle2 size={17} /><span>Mock Interview Voice Simulator</span><span className="done-label">Ready</span></div>
            <div className="check-row"><CheckCircle2 size={17} /><span>Competitive Exam Practice</span><span className="done-label">PYQ Bank</span></div>
          </section>

          <section className="panel mentor-card">
            <div className="mentor-avatar">
              {userProfile.avatar_url ? (
                <img src={userProfile.avatar_url} alt="User" loading="lazy" decoding="async" width="56" height="56" style={{ width: "100%", height: "100%", borderRadius: "12px", objectFit: "cover" }} />
              ) : (
                <Sparkles size={25} />
              )}
            </div>
            <span className="eyebrow">AUTHENTICATED PROFILE</span>
            <h3>{userProfile.name}</h3>
            <p>{userProfile.education || "Candidate"} • {userProfile.target_role || "Software Developer"}</p>
            <button className="primary-btn" onClick={() => setPage("profile")}>
              Manage Profile & Photos <ArrowUpRight size={17} />
            </button>
          </section>
        </div>
      </>
    );
  }

  // Auth gate
  if (!isLoggedIn && !isClerkSignedIn) {
    return (
      <Auth
        onLogin={(authedUser) => {
          const token = localStorage.getItem("access_token");
          if (!token || token === "demo_guest_token_2026") {
            setIsLoggedIn(false);
            return;
          }
          if (authedUser) {
            setUserProfile(prev => ({
              ...prev,
              name: authedUser.name || prev.name,
              email: authedUser.email || prev.email,
              avatar_url: authedUser.avatar_url || prev.avatar_url
            }));
          }
          setIsLoggedIn(true);
        }}
      />
    );
  }

  const pageTitle = {
    dashboard: "Dashboard",
    resume: "Resume Analyzer",
    career: "Career Guidance",
    interview: "Mock Interview",
    tests: "Mock Test",
    chat: "AI Mentor Aura Chat",
    jobs: "Find Job",
    contact: "Contact Us",
    profile: "User Profile",
  }[page] || "Dashboard";

  return (
    <div className="app-shell">
      {mobileMenu && (
        <button className="mobile-scrim" onClick={() => setMobileMenu(false)} aria-label="Close menu" />
      )}

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={22} /></div>
          <div>
            <strong>Mentor AI <span>Aura</span></strong>
            <small>CAREER & EXAM PLATFORM</small>
          </div>
          <button className="mobile-close" onClick={() => setMobileMenu(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="nav-label">MAIN MODULES (7)</div>
        <nav>
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "resume", label: "Resume Analyzer", icon: FileUser },
            { id: "career", label: "Career Guidance", icon: Compass },
            { id: "interview", label: "Mock Interview", icon: Video },
            { id: "tests", label: "Mock Test", icon: Brain },
            { id: "chat", label: "AI Mentor Chat", icon: MessageSquare },
            { id: "jobs", label: "Find Job", icon: Briefcase },
            { id: "contact", label: "Contact Us", icon: Mail },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${page === item.id ? "active" : ""}`}
                onClick={() => { setPage(item.id); setMobileMenu(false); }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {page === item.id && <span className="active-dot" />}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-spacer" />

        {/* Profile Nav Button */}
        <button
          className={`nav-item ${page === "profile" ? "active" : ""}`}
          onClick={() => { setPage("profile"); setMobileMenu(false); }}
        >
          <User size={19} />
          <span>My Profile</span>
        </button>

        <div className="profile-row" onClick={() => setPage("profile")} style={{ cursor: "pointer" }}>
          {userProfile.avatar_url ? (
            <img src={userProfile.avatar_url} alt="Avatar" className="profile-avatar-thumb" loading="lazy" decoding="async" width="36" height="36" />
          ) : (
            <div className="profile-avatar">{userProfile.name?.charAt(0).toUpperCase()}</div>
          )}
          <div className="profile-text">
            <strong>{userProfile.name}</strong>
            <span>{userProfile.target_role || "Candidate"}</span>
          </div>
          <Settings size={16} style={{ color: "#94a3b8" }} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`main-area ${page === "dashboard" ? "dashboard-full-aurora-bg" : ""} ${page === "chat" ? "chat-full-bleed-mode" : ""}`}>
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={() => setMobileMenu(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <div className="breadcrumb">
              Mentor AI Aura <span>/</span> <strong>{pageTitle}</strong>
            </div>
          </div>

          {/* Centered Glowing BorderBeam Search Module */}
          <div className="topbar-search-middle">
            <BorderBeam
              size="sm"
              colorVariant="colorful"
              theme="dark"
              active={true}
              strength={1.3}
              duration={3.1}
              beamWidth={2}
              borderRadius={64}
              className="topbar-beam-search-wrapper"
            >
              <div className="topbar-beam-search-box">
                <Search size={18} className="search-icon-dimmed" />
                <input
                  type="text"
                  placeholder="Search modules..."
                  className="beam-search-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const q = e.currentTarget.value.toLowerCase();
                      if (q.includes("resume")) setPage("resume");
                      else if (q.includes("career")) setPage("career");
                      else if (q.includes("interview")) setPage("interview");
                      else if (q.includes("test") || q.includes("exam")) setPage("tests");
                      else if (q.includes("chat")) setPage("chat");
                      else if (q.includes("job") || q.includes("hiring")) setPage("jobs");
                      else if (q.includes("contact") || q.includes("globe")) setPage("contact");
                      else if (q.includes("profile")) setPage("profile");
                    }
                  }}
                />
              </div>
            </BorderBeam>
          </div>

          <div className="top-actions">
            <button className="icon-btn" title="Live System"><Bell size={19} /><i /></button>
            <div
              className="top-avatar"
              title="View Profile"
              onClick={() => setPage("profile")}
              style={{ cursor: "pointer", overflow: "hidden" }}
            >
              {userProfile.avatar_url ? (
                <img src={userProfile.avatar_url} alt="Profile" loading="lazy" decoding="async" width="36" height="36" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                userProfile.name?.charAt(0).toUpperCase()
              )}
            </div>
          </div>
        </header>

        <div className={`page-content ${page === "chat" ? "page-content-chat-full" : ""}`}>
          {page !== "dashboard" && page !== "chat" && page !== "contact" && (
            <div className="page-intro">
              <div>
                <div className="eyebrow">MENTOR AI AURA <span>•</span> INTELLIGENT PLATFORM</div>
                <h1>
                  {pageTitle}
                  <span className="title-sparkle">✦</span>
                </h1>
                <p>Every milestone brings you closer to your target opportunity.</p>
              </div>
              <div className="date-chip">
                <Sparkles size={16} /> Mentor AI Aura
              </div>
            </div>
          )}

          {renderMainContent()}

          {page !== "chat" && (
            <footer>
              © 2026 Mentor AI Aura <span>• AI-Powered Career Guidance & Exam Preparation Platform.</span>
            </footer>
          )}
        </div>
      </main>

      {/* Logout Confirmation Dialog (FEATURE 6) */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="panel confirm-modal">
            <div className="confirm-icon-wrap"><LogOut size={24} /></div>
            <h3>Are you sure you want to log out?</h3>
            <p>Your current session will be securely terminated. You can log back in at any time.</p>
            <div className="confirm-btn-row">
              <button className="secondary-btn" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
              <button className="danger-btn" onClick={handleConfirmLogout}>
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
