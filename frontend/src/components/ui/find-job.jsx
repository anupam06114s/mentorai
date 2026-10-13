import React, { useState, useEffect, useMemo, useCallback } from "react";
import confetti from "canvas-confetti";
import Card from "./course-design-cards";
import {
  Briefcase,
  Search,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Filter,
  ExternalLink,
  SlidersHorizontal,
  Zap,
  Flame,
  Award,
  ArrowUpRight,
  Layers,
  Send,
  X,
  Landmark,
  Shield,
  GraduationCap,
  Train,
  HeartPulse,
  RefreshCw,
  AlertCircle
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
    ? ""
    : "http://127.0.0.1:8000");

// Default initial fallback data in case backend is offline
const INITIAL_FALLBACK_JOBS = [
  {
    id: "govt-isro-scientist-2026",
    title: "Scientist / Engineer 'SC' (Computer Science, ECE, Mechanical)",
    company: "ISRO - Indian Space Research Organisation",
    sector: "government",
    category: "PSU & Engineering",
    location: "Bengaluru / Sriharikota",
    workMode: "On-site",
    type: "Central Govt (Permanent)",
    experience: "Fresher Eligible (B.Tech 65%+ or GATE)",
    salary: "Pay Level 10: ₹56,100 - ₹1,77,500/mo + HRA/DA",
    salaryNumeric: 65,
    postedTime: "Active Recruitment",
    matchScore: 97,
    featured: true,
    skills: ["Algorithms", "C/C++", "Aerospace Systems", "Python", "Linux Kernel"],
    eligibility: "B.E/B.Tech in CSE / ECE / Mechanical / Electrical with 65%+ or 6.84 CGPA.",
    description: "Design mission-critical satellite telemetry, orbital navigation software, and rocket stage guidance algorithms.",
    applyUrl: "https://www.isro.gov.in/careers",
    source: "Official ISRO Portal",
    logoColor: "from-amber-600 to-orange-700",
    applicants: 1420
  },
  {
    id: "govt-nic-scientist-b",
    title: "Scientist B / Scientific Officer (Cloud, AI & Systems)",
    company: "National Informatics Centre (NIC) / MeitY",
    sector: "government",
    category: "Software & IT",
    location: "New Delhi / State Capitals",
    workMode: "Hybrid",
    type: "Central Govt Permanent",
    experience: "0-2 Years (Freshers Eligible)",
    salary: "Pay Level 10: ₹56,100 - ₹1,77,500/mo",
    salaryNumeric: 60,
    postedTime: "Active Notice",
    matchScore: 95,
    featured: true,
    skills: ["Cloud Architecture", "PostgreSQL", "Docker", "Python", "FastAPI"],
    eligibility: "B.E/B.Tech/MCA/M.Sc in Computer Science, IT, Electronics with 60%+.",
    description: "Architect mission-critical national digital public infrastructure handling 200M+ citizens daily.",
    applyUrl: "https://www.calicut.nielit.in/nic21/",
    source: "NIELIT / NIC Portal",
    logoColor: "from-blue-600 to-indigo-800",
    applicants: 2150
  },
  {
    id: "job-pvt-1",
    title: "Full Stack AI Engineer",
    company: "Anthropic / Claude Platform",
    sector: "private",
    category: "Software & IT",
    location: "Remote / Bengaluru",
    workMode: "Hybrid",
    type: "Full-Time",
    experience: "1-4 Years",
    salary: "₹36 - 55 LPA",
    salaryNumeric: 45,
    postedTime: "Active Role",
    matchScore: 96,
    featured: true,
    skills: ["React 19", "TypeScript", "Node.js", "Python", "Vector DB", "LLM APIs"],
    eligibility: "Bachelor's degree or equivalent hands-on experience in full-stack architecture.",
    description: "Build generative AI interfaces, streaming inference APIs, and interactive workflows for next-gen models.",
    applyUrl: "https://anthropic.com/careers",
    source: "Company Careers Portal",
    logoColor: "from-amber-500 to-orange-600",
    applicants: 42
  },
  {
    id: "govt-sbi-po",
    title: "Probationary Officer (PO) - Scale I",
    company: "State Bank of India (SBI)",
    sector: "government",
    category: "Banking & Finance",
    location: "Pan India Branches",
    workMode: "On-site",
    type: "Public Sector Bank",
    experience: "Fresher Eligible (Any Graduate)",
    salary: "Basic ₹41,960 + Allowances (CTC ~₹18 - 22 LPA)",
    salaryNumeric: 48,
    postedTime: "Active Notification",
    matchScore: 91,
    featured: true,
    skills: ["Quantitative Aptitude", "Financial Analysis", "Banking Regulations", "Risk Management"],
    eligibility: "Graduation in any discipline from a recognized University. Final year students eligible.",
    description: "Drive core commercial banking operations, digital credit underwriting, and treasury operations.",
    applyUrl: "https://sbi.co.in/careers",
    source: "State Bank of India",
    logoColor: "from-cyan-600 to-blue-700",
    applicants: 5400
  }
];

export const FindJobModule = ({ userProfile }) => {
  const [jobs, setJobs] = useState(INITIAL_FALLBACK_JOBS);
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all"); // "all" | "government" | "private"
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedWorkMode, setSelectedWorkMode] = useState("All");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "matches" | "remote" | "govt" | "saved" | "applied"

  // User Actions
  const [savedJobs, setSavedJobs] = useState(["govt-isro-scientist-2026", "job-pvt-1"]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [activeJobModal, setActiveJobModal] = useState(null);
  const [applySuccessMessage, setApplySuccessMessage] = useState(null);

  // Available Categories list from jobs
  const availableCategories = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => {
      if (j.category) set.add(j.category);
    });
    return ["All", ...Array.from(set).sort()];
  }, [jobs]);

  // Fetch live jobs from API
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setErrorNotice(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs?limit=80`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.warn("[FindJobModule] Could not fetch live jobs, using cached data:", err);
      setErrorNotice("Using offline verified jobs. Live API will auto-reconnect.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Toggle Save Job
  const handleToggleSave = (jobId, e) => {
    e?.stopPropagation();
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  // 1-Click Apply
  const handleApply = (job, e) => {
    e?.stopPropagation();
    if (appliedJobs.includes(job.id)) return;

    setAppliedJobs((prev) => [...prev, job.id]);
    setApplySuccessMessage({
      jobTitle: job.title,
      company: job.company,
      applyUrl: job.applyUrl,
      sector: job.sector
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setApplySuccessMessage(null);
    }, 4500);
  };

  // Filter Jobs Locally for instant sub-millisecond interaction
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Sector filter
      if (selectedSector !== "all" && job.sector !== selectedSector) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All" && job.category !== selectedCategory) {
        return false;
      }

      // Location filter
      if (selectedLocation !== "All") {
        const locLower = job.location.toLowerCase();
        if (selectedLocation === "India" && !locLower.includes("india") && !locLower.includes("bengaluru") && !locLower.includes("delhi") && !locLower.includes("mumbai") && !locLower.includes("hyderabad")) {
          return false;
        } else if (selectedLocation === "Remote" && !locLower.includes("remote")) {
          return false;
        } else if (selectedLocation !== "India" && selectedLocation !== "Remote" && !locLower.includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // Work mode
      if (selectedWorkMode !== "All" && job.workMode !== selectedWorkMode) {
        return false;
      }

      // Quick Tabs
      if (activeTab === "matches" && (job.matchScore || 0) < 92) return false;
      if (activeTab === "remote" && job.workMode !== "Remote") return false;
      if (activeTab === "govt" && job.sector !== "government") return false;
      if (activeTab === "saved" && !savedJobs.includes(job.id)) return false;
      if (activeTab === "applied" && !appliedJobs.includes(job.id)) return false;

      // Keyword Search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const fullText = (
          `${job.title} ${job.company} ${(job.skills || []).join(" ")} ${job.category} ${job.location} ${job.eligibility || ""} ${job.description || ""}`
        ).toLowerCase();
        if (!fullText.includes(q)) return false;
      }

      return true;
    });
  }, [jobs, selectedSector, selectedCategory, selectedLocation, selectedWorkMode, activeTab, searchTerm, savedJobs, appliedJobs]);

  const govtCount = useMemo(() => jobs.filter((j) => j.sector === "government").length, [jobs]);
  const privateCount = useMemo(() => jobs.filter((j) => j.sector === "private").length, [jobs]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Toast Notification */}
      {applySuccessMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-slate-900/95 text-emerald-200 border border-emerald-500/50 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-bounce max-w-md">
          <CheckCircle2 size={22} className="text-emerald-400 shrink-0" />
          <div className="text-xs">
            <strong className="text-sm font-semibold block text-white">Application Recorded!</strong>
            <span className="text-slate-300">
              Saved to your profile. Official Portal:{" "}
              <a
                href={applySuccessMessage.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline font-semibold inline-flex items-center gap-0.5"
              >
                Open Official Portal <ArrowUpRight size={11} />
              </a>
            </span>
          </div>
        </div>
      )}

      {/* Top Centered Header: Available Jobs */}
      <div className="text-center py-6 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/10 border border-slate-900/15 text-slate-800 text-xs font-bold mb-3 backdrop-blur-md shadow-sm">
          <Sparkles size={14} className="text-indigo-600" />
          <span>REAL-TIME JOB SEARCH • {jobs.length} ACTIVE VACANCIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight" style={{ color: "#0f172a" }}>
          Available Jobs
        </h1>

        {/* Sync / Stat row */}
        <div className="flex items-center justify-center flex-wrap gap-3.5 mt-4">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-xs text-amber-300 shadow-md border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>🏛️ Govt / PSU: <strong>{govtCount}</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-xs text-cyan-300 shadow-md border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>🏢 Private Tech: <strong>{privateCount}</strong></span>
          </div>
          <button
            onClick={() => fetchJobs(searchTerm)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500/40 text-xs font-bold transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            title="Sync latest live vacancies in real-time"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
            <span>{isLoading ? "Syncing..." : "Sync Live Feed"}</span>
          </button>
        </div>
      </div>

      {/* Main Sector Selector Tabs (All, Govt, Private) */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-white/15 w-full max-w-xl">
        <button
          type="button"
          onClick={() => {
            setSelectedSector("all");
            setActiveTab("all");
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            selectedSector === "all"
              ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <Layers size={15} />
          <span>All Jobs ({jobs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedSector("government");
            setActiveTab("all");
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            selectedSector === "government"
              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25"
              : "text-amber-300/80 hover:text-amber-200 hover:bg-amber-500/10"
          }`}
        >
          <Landmark size={15} />
          <span>🏛️ Government ({govtCount})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedSector("private");
            setActiveTab("all");
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            selectedSector === "private"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <Building2 size={15} />
          <span>🏢 Private ({privateCount})</span>
        </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/85 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Keyword Search */}
          <div className="md:col-span-5 relative flex items-center">
            <Search size={18} className="absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, organization (ISRO, SBI, Google), skill, or exam..."
              className="w-full bg-slate-950/80 border border-white/15 focus:border-cyan-400 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/15 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 outline-none cursor-pointer"
            >
              {availableCategories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/15 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 outline-none cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="India">🇮🇳 Pan India</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Delhi">Delhi NCR</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Remote">🌐 Remote Worldwide</option>
            </select>
          </div>

          {/* Work Mode */}
          <div className="md:col-span-2">
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/15 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 outline-none cursor-pointer"
            >
              <option value="All">All Work Modes</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site / Office</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 flex-wrap gap-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: "all", label: "All Openings", icon: Briefcase },
              { id: "matches", label: "🎯 92%+ AI Synergy", icon: Zap },
              { id: "remote", label: "🌐 100% Remote", icon: Building2 },
              { id: "govt", label: `🏛️ Sarkari Only (${govtCount})`, icon: Landmark },
              { id: "saved", label: `🔖 Saved (${savedJobs.length})`, icon: Bookmark },
              { id: "applied", label: `✓ Applied (${appliedJobs.length})`, icon: CheckCircle2 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
                    activeTab === tab.id
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-white">{filteredJobs.length}</strong> matching verified openings
          </div>
        </div>
      </div>

      {/* Jobs Grid using Course Design Cards */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/60 border border-white/10 rounded-3xl">
          <AlertCircle size={40} className="mx-auto text-amber-400 mb-3" />
          <h3 className="text-lg font-bold text-white">No Matching Openings Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or clearing your filters to see more results.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSelectedLocation("All");
              setSelectedWorkMode("All");
              setSelectedSector("all");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="job-cards-grid">
          {filteredJobs.map((job, idx) => {
            const isGovt = job.sector === "government";
            const colorClass = isGovt
              ? idx % 2 === 0
                ? "orange"
                : "red"
              : idx % 2 === 0
              ? "green"
              : "blue";

            const cardData = {
              id: job.id,
              colorClass,
              date: job.postedTime || "Active Notice",
              title: job.title,
              company: job.company,
              location: job.location,
              workMode: job.workMode,
              sector: job.sector,
              description: job.description,
              progressPercent: `${job.matchScore || 85}%`,
              progressValue: `${job.matchScore || 85}% Match`,
              salary: job.salary,
              skills: job.skills,
              applyUrl: job.applyUrl,
              countdownText: "Apply Now"
            };

            return (
              <Card
                key={job.id}
                data={cardData}
                onApply={(e) => handleApply(job, e)}
              />
            );
          })}
        </div>
      )}

      {/* Detailed Job Modal */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveJobModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${activeJobModal.logoColor || "from-slate-700 to-slate-900"} flex items-center justify-center text-white font-extrabold text-2xl shadow-xl border border-white/20 shrink-0`}
              >
                {activeJobModal.sector === "government" ? (
                  <Landmark size={28} className="text-amber-200" />
                ) : (
                  activeJobModal.company?.charAt(0) || "P"
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-white">{activeJobModal.title}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      activeJobModal.sector === "government"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    }`}
                  >
                    {activeJobModal.sector === "government" ? "🏛️ Government / PSU" : "🏢 Private"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {activeJobModal.matchScore || 90}% AI Match
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-0.5">
                  {activeJobModal.company} • {activeJobModal.location} ({activeJobModal.workMode})
                </p>
              </div>
            </div>

            {/* Details Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Compensation / Scale</span>
                <strong className="text-xs sm:text-sm text-emerald-400 font-semibold block mt-0.5">
                  {activeJobModal.salary}
                </strong>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Experience Requirement</span>
                <strong className="text-xs sm:text-sm text-slate-200 font-semibold block mt-0.5">
                  {activeJobModal.experience || "Freshers Eligible"}
                </strong>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Category</span>
                <strong className="text-xs sm:text-sm text-cyan-300 font-semibold block mt-0.5">
                  {activeJobModal.category}
                </strong>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-slate-400 block">Recruitment Status</span>
                <strong className="text-xs sm:text-sm text-slate-200 font-semibold block mt-0.5">
                  {activeJobModal.postedTime}
                </strong>
              </div>
            </div>

            {/* Eligibility & Education */}
            {activeJobModal.eligibility && (
              <div className="space-y-1.5 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap size={15} /> Eligibility Criteria & Qualification
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeJobModal.eligibility}
                </p>
              </div>
            )}

            {/* Role Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
                Job Overview & Scope
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeJobModal.description}
              </p>
            </div>

            {/* Skills Requirements */}
            {activeJobModal.skills && activeJobModal.skills.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
                  Key Competencies & Technologies
                </h4>
                <div className="flex items-center flex-wrap gap-2">
                  {activeJobModal.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Source attribution */}
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>Verified feed source:</span>
              <strong className="text-slate-300">{activeJobModal.source || "Official Recruitment API"}</strong>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10 flex-wrap">
              <a
                href={activeJobModal.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 flex items-center gap-1.5 transition-all"
              >
                <span>Visit Official Portal</span>
                <ExternalLink size={14} className="text-cyan-400" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveJobModal(null)}
                  className="text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    handleApply(activeJobModal, e);
                    setActiveJobModal(null);
                  }}
                  disabled={appliedJobs.includes(activeJobModal.id)}
                  className={`text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg ${
                    appliedJobs.includes(activeJobModal.id)
                      ? "bg-emerald-900/60 border border-emerald-500/40 text-emerald-300"
                      : activeJobModal.sector === "government"
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-400 hover:to-orange-500 shadow-amber-500/30"
                      : "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-cyan-500/30"
                  }`}
                >
                  {appliedJobs.includes(activeJobModal.id) ? (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Applied Successfully</span>
                    </>
                  ) : (
                    <>
                      <span>1-Click AI Apply</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindJobModule;
