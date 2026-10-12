import re
from typing import Dict, Any, List

def generate_mentor_reply(user_message: str, history: List[Dict[str, str]] = None) -> str:
    msg = user_message.lower().strip()
    
    # 1. Resume / ATS questions
    if any(k in msg for k in ["resume", "ats", "cv", "score", "format", "bullet"]):
        return (
            "### 🎯 Pro ATS & Resume Strategy\n\n"
            "To maximize your interview callback rate, follow these 4 proven principles:\n\n"
            "1. **Use the Google X-Y-Z Formula** for bullet points:\n"
            "   * *'Accomplished [X], as measured by [Y], by doing [Z].'*\n"
            "   * *Example:* *'Accelerated API response times by 40% (latency down to 85ms) by implementing Redis caching and database indexing in FastAPI.'*\n\n"
            "2. **Single-Column, Clean Layout:** Avoid dual-column graphics, text boxes, and tables that confuse ATS parsers like Workday, Greenhouse, and Lever.\n\n"
            "3. **Target 350 - 650 words:** Dense, quantifiable achievements beat fluff words every single time.\n\n"
            "4. **Tailor Keywords:** Match 8-12 exact hard skills mentioned in the job description (e.g., Docker, PostgreSQL, React, AWS).\n\n"
            "👉 *Tip: Head over to our **Resume Analyzer** tab to upload your document and get an instant real-time ATS audit!*"
        )
    
    # 2. Tech Stack / Framework comparison
    if any(k in msg for k in ["framework", "react", "next", "vue", "angular", "node", "fastapi", "django", "springboot", "stack"]):
        return (
            "### ⚡ Tech Stack Guidance & Market Insights\n\n"
            "Here is how modern high-growth stacks break down in 2026:\n\n"
            "* **Frontend:** **React 19 + TypeScript + Tailwind CSS** is the unrivaled industry leader for startups and mid-market companies. For enterprise scale with SEO, **Next.js 15 (App Router)** is the premier choice.\n"
            "* **Backend & APIs:** \n"
            "  - **FastAPI / Python:** Perfect for AI-driven products, high-throughput microservices, and rapid iteration.\n"
            "  - **Node.js (TypeScript / NestJS):** Great for real-time collaboration and full-stack TypeScript unified teams.\n"
            "  - **Go / Java (Spring Boot):** The choice for high-volume financial, enterprise, and cloud infrastructure systems.\n"
            "* **Databases:** **PostgreSQL** paired with **Redis** handles 95% of use-cases exceptionally well.\n\n"
            "💡 *My Recommendation:* Pick **React + FastAPI + PostgreSQL** or **Next.js + Node + PostgreSQL**. Master one end-to-end stack before switching tools."
        )

    # 3. Fresher / Getting First Job / FAANG
    if any(k in msg for k in ["fresher", "first job", "faang", "crack", "internship", "campus", "beginner", "start"]):
        return (
            "### 🚀 Blueprint to Crack Your First High-Paying Tech Role\n\n"
            "Here is the exact 4-step roadmap high-performing candidates follow:\n\n"
            "1. **Master 1 Core Language + DSA (Months 1-3):**\n"
            "   - Pick Python or Java/C++.\n"
            "   - Solve 120-150 curated LeetCode Medium problems (Arrays, Two Pointers, Trees, Graphs, DP).\n"
            "2. **Build 2 Production-Grade Capstones (Months 3-5):**\n"
            "   - Avoid generic clones (like basic to-do lists).\n"
            "   - Build a real problem-solving app (e.g., Real-time Collaborative Tool, AI-Powered Workflow Assistant, or Distributed Analytics Engine) with deployed URLs and clean GitHub documentation.\n"
            "3. **Active Technical Branding (Continuous):**\n"
            "   - Post your architecture learnings on LinkedIn / X.\n"
            "   - Keep your GitHub commit graph green with well-documented READMEs.\n"
            "4. **Targeted Cold Outreach & Referrals:**\n"
            "   - Don't just click 'Easy Apply'. Reach out directly to Engineering Managers with a concise 3-line pitch + live project demo link.\n\n"
            "Which target role are you aiming for: Software Engineer, Full Stack, or AI/ML?"
        )

    # 4. Mock Interview prep
    if any(k in msg for k in ["interview", "mock", "prepare", "behavioral", "star", "hr"]):
        return (
            "### 🎙️ Cracking Tech & Behavioral Interviews\n\n"
            "Interviews test two main dimensions: **Technical Competence** and **Systematic Communication**.\n\n"
            "1. **Behavioral Questions (The STAR Method):**\n"
            "   * **S (Situation):** Set the stage in 20 seconds.\n"
            "   * **T (Task):** Define the challenge or responsibility.\n"
            "   * **A (Action):** What specific actions did YOU take? (Use 'I', not just 'we').\n"
            "   * **R (Result):** Conclude with business metrics, time saved, or percentage improvements.\n\n"
            "2. **System Design & Coding:**\n"
            "   * Never jump straight into code. Ask clarifying scope questions first.\n"
            "   * Talk aloud through your thought process: explain brute force first, then optimize time/space complexity.\n\n"
            "👉 *You can practice this right now in our **Mock Interview** tab with real AI evaluation!*"
        )

    # Default supportive response
    return (
        f"### 💡 Career Insight for: *\"{user_message}\"*\n\n"
        "Here are 3 concrete action steps to move forward right now:\n\n"
        "1. **Clarify the Milestone:** Break down your career objective into a 30-day tangible output (e.g., shipping a portfolio project or mastering a core framework).\n"
        "2. **Audit Your Skills:** Check our **Career Guidance** roadmap to identify which essential skills you already possess vs. what recruiters are actively screening for.\n"
        "3. **Validate Your Resume:** Upload your resume to our **Resume Analyzer** to verify your ATS score and keyword density.\n\n"
        "What specific role or company are you preparing for next? Let me know and I'll tailor a daily study plan for you!"
    )
