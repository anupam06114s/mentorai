import re
import io
from typing import Dict, Any, List, Optional

try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None

ROLE_KEYWORDS = {
    "software_engineer": [
        "python", "java", "javascript", "c++", "data structures", "algorithms", 
        "git", "sql", "rest api", "docker", "ci/cd", "microservices", "unit testing", 
        "system design", "agile", "aws", "linux", "oop"
    ],
    "fullstack_developer": [
        "react", "node.js", "javascript", "typescript", "python", "fastapi", "postgresql", 
        "mongodb", "docker", "rest api", "html5", "css3", "git", "aws", "next.js", 
        "tailwind", "redux", "ci/cd", "system design"
    ],
    "frontend_developer": [
        "javascript", "typescript", "react", "html5", "css3", "tailwind", "next.js", 
        "redux", "responsive design", "rest api", "vite", "webpack", "ui/ux", "web performance", 
        "git", "jest", "dom", "figma"
    ],
    "backend_developer": [
        "python", "node.js", "fastapi", "django", "java", "spring boot", "postgresql", 
        "mongodb", "redis", "docker", "kubernetes", "rest api", "graphql", "microservices", 
        "aws", "sql", "orm", "jwt", "kafka", "ci/cd"
    ],
    "ai_ml_engineer": [
        "python", "machine learning", "deep learning", "pytorch", "tensorflow", "scikit-learn", 
        "pandas", "numpy", "nlp", "computer vision", "llm", "transformers", "data preprocessing", 
        "opencv", "huggingface", "sql", "docker", "model deployment"
    ],
    "data_scientist": [
        "python", "r", "sql", "pandas", "numpy", "data analysis", "statistics", 
        "data visualization", "matplotlib", "seaborn", "scikit-learn", "machine learning", 
        "tableau", "power bi", "feature engineering", "a/b testing", "big data"
    ],
    "devops_cloud": [
        "docker", "kubernetes", "aws", "azure", "ci/cd", "terraform", "ansible", 
        "linux", "bash", "jenkins", "github actions", "prometheus", "grafana", 
        "git", "helm", "networking", "cloud security", "python"
    ],
    "product_manager": [
        "product roadmap", "user stories", "agile", "scrum", "market research", "kpis", 
        "wireframing", "jira", "a/b testing", "data analytics", "stakeholder management", 
        "user research", "prd", "competitive analysis", "go-to-market"
    ]
}

ACTION_VERBS = [
    "accelerated", "achieved", "analyzed", "architected", "automated", "built", "collaborated",
    "created", "decreased", "delivered", "deployed", "designed", "developed", "engineered",
    "established", "executed", "expanded", "generated", "implemented", "improved", "increased",
    "initiated", "integrated", "launched", "led", "managed", "maximized", "mentored",
    "modernized", "optimized", "orchestrated", "overhauled", "reduced", "refactored",
    "resolved", "scaled", "spearheaded", "standardized", "streamlined", "transformed", "upgraded"
]

WEAK_PHRASES = [
    "worked on", "responsible for", "helped with", "assisted in", "handled", "participated in",
    "did duties", "tasked with", "involved in", "looked after", "fixed some bugs"
]

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF using pypdf."""
    if not PdfReader:
        return ""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        extracted = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted.append(text)
        return "\n".join(extracted)
    except Exception as e:
        return f"[PDF parsing error: {e}]"

def extract_text_from_file(filename: str, file_bytes: bytes) -> str:
    """Extract text based on file format."""
    lower_name = filename.lower()
    if lower_name.endswith(".pdf"):
        return extract_text_from_pdf(file_bytes)
    elif lower_name.endswith(".txt") or lower_name.endswith(".md"):
        try:
            return file_bytes.decode("utf-8", errors="replace")
        except Exception:
            return ""
    elif lower_name.endswith(".docx"):
        try:
            import zipfile
            import xml.etree.ElementTree as ET
            with zipfile.ZipFile(io.BytesIO(file_bytes)) as docx_zip:
                xml_content = docx_zip.read("word/document.xml")
                tree = ET.fromstring(xml_content)
                text_pieces = [elem.text for elem in tree.iter() if elem.text]
                return " ".join(text_pieces)
        except Exception:
            return re.sub(r'[^\x20-\x7E\n]', ' ', file_bytes.decode("latin-1", errors="ignore"))
    else:
        try:
            return file_bytes.decode("utf-8", errors="replace")
        except Exception:
            return file_bytes.decode("latin-1", errors="ignore")

def extract_resume_entities(text: str) -> Dict[str, Any]:
    """
    Extracts candidate name, contact, education, skills, projects, experience,
    and certifications from the text.
    """
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    clean_text = text.lower()
    
    # 1. Candidate Name: usually in the first 3 lines before contact details
    candidate_name = ""
    for line in lines[:5]:
        if not re.search(r'(@|phone|\+?\d|linkedin|github|resume|curriculum|portfolio)', line, re.I) and len(line.split()) <= 4:
            if re.match(r'^[A-Z][a-zA-Z\s\.\-]+$', line):
                candidate_name = line
                break
    if not candidate_name and lines:
        candidate_name = lines[0]

    # 2. Contact details
    emails = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    phones = re.findall(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    linkedin = bool(re.search(r'linkedin\.com', clean_text))
    github = bool(re.search(r'github\.com|portfolio|gitlab', clean_text))

    # 3. Education extraction
    degree_patterns = [
        r'\b(bachelor|b\.tech|b\.e\.|b\.s\.|bs|bca|master|m\.tech|m\.s\.|ms|mca|ph\.d|diploma)\b',
        r'\b(computer science|information technology|electronics|engineering|mathematics|data science)\b',
        r'\b(university|institute|college|school)\b'
    ]
    education_mentions = []
    for line in lines:
        if any(re.search(p, line, re.I) for p in degree_patterns):
            education_mentions.append(line)

    # 4. Certifications extraction
    cert_matches = []
    for line in lines:
        if re.search(r'\b(certified|certification|aws|azure|gcp|oracle|coursera|udemy|deeplearning\.ai|meta)\b', line, re.I):
            if len(line) < 120 and not line.lower().startswith("skills"):
                cert_matches.append(line)

    # 5. Projects extraction
    project_items = []
    in_project_section = False
    for line in lines:
        if re.search(r'\b(projects|academic projects|key projects|personal projects)\b', line, re.I):
            in_project_section = True
            continue
        if in_project_section:
            if re.search(r'\b(experience|education|skills|certifications|awards|summary)\b', line, re.I):
                in_project_section = False
                continue
            if len(line) > 10:
                project_items.append(line)

    # 6. Experience extraction
    experience_items = []
    in_exp_section = False
    for line in lines:
        if re.search(r'\b(experience|work history|employment|professional experience)\b', line, re.I):
            in_exp_section = True
            continue
        if in_exp_section:
            if re.search(r'\b(education|skills|projects|certifications|summary)\b', line, re.I):
                in_exp_section = False
                continue
            if len(line) > 10:
                experience_items.append(line)

    return {
        "candidate_name": candidate_name or "Applicant",
        "email": emails[0] if emails else "Not detected",
        "phone": phones[0][0] if phones and phones[0] else ("Detected" if phones else "Not detected"),
        "has_linkedin": linkedin,
        "has_github": github,
        "education": education_mentions[:4],
        "certifications": cert_matches[:5],
        "projects_count": len(project_items),
        "projects_sample": project_items[:5],
        "experience_sample": experience_items[:5],
    }

def analyze_resume_text(text: str, target_role: str = "fullstack_developer") -> Dict[str, Any]:
    """
    Comprehensive ATS evaluation algorithm matching prompt instructions:
    - Quality assessment with reasons
    - Strengths & weaknesses
    - Missing/underrepresented skills
    - Unclear descriptions & project improvements
    - Content recommendations while preserving user qualifications
    """
    clean_text = text.lower()
    total_words = len(re.findall(r'\b\w+\b', text))
    extracted = extract_resume_entities(text)

    # 1. Contact & Formatting score
    contact_score = 0
    if extracted["email"] != "Not detected": contact_score += 4
    if extracted["phone"] != "Not detected": contact_score += 4
    if extracted["has_linkedin"]: contact_score += 4
    if extracted["has_github"]: contact_score += 3

    # 2. Section detection
    detected_sections = []
    sections_map = {
        "Professional Summary": r'\b(summary|objective|profile)\b',
        "Experience": r'\b(experience|employment|work history)\b',
        "Skills": r'\b(skills|technical skills|technologies)\b',
        "Education": r'\b(education|academic|degree)\b',
        "Projects": r'\b(projects|key projects)\b',
        "Certifications": r'\b(certifications|certificates|awards)\b'
    }
    for sec_name, pattern in sections_map.items():
        if re.search(pattern, clean_text):
            detected_sections.append(sec_name)

    structure_score = min(20, len(detected_sections) * 4)

    # 3. Metrics (numbers, %, $)
    metrics_matches = re.findall(r'(\d+%\s*|\$\d+[\d,]*|\b\d+x\b|\b\d+\+\b|\b\d+k\b|\b\d+m\b|reduced\s+by\s+\d+|increased\s+by\s+\d+)', clean_text)
    metric_count = len(metrics_matches)
    impact_score = min(25, metric_count * 5 + 5 if metric_count > 0 else 4)

    # 4. Action Verbs
    found_verbs = [v for v in ACTION_VERBS if re.search(r'\b' + v + r'\b', clean_text)]
    verb_score = min(15, len(found_verbs) * 2)

    # 5. Role Skills match
    target_role_key = target_role if target_role in ROLE_KEYWORDS else "fullstack_developer"
    expected_skills = ROLE_KEYWORDS[target_role_key]
    found_skills = [s for s in expected_skills if re.search(r'\b' + re.escape(s) + r'\b', clean_text)]
    missing_skills = [s for s in expected_skills if s not in found_skills]
    skill_match_ratio = len(found_skills) / max(len(expected_skills), 1)
    skills_score = round(skill_match_ratio * 25)

    # Total ATS Score
    raw_total = (
        (contact_score / 15) * 15 +
        (structure_score / 20) * 20 +
        (impact_score / 25) * 25 +
        (verb_score / 15) * 15 +
        (skills_score / 25) * 25
    )
    overall_score = max(22, min(98, round(raw_total)))

    # Quality Assessment & Reasons
    if overall_score >= 80:
        quality_rating = "Excellent ATS Alignment"
        quality_reason = (
            f"The resume demonstrates dense keyword alignment ({len(found_skills)} core skills), "
            f"includes measurable metrics ({metric_count} quantifiable results), and features strong action verbs "
            "with a clean single-column structure that ATS parsers parse reliably."
        )
    elif overall_score >= 65:
        quality_rating = "Good Foundational Quality"
        quality_reason = (
            f"Good baseline structure with {len(detected_sections)} clear sections detected. "
            "However, it would benefit from additional role-specific keywords and higher metric density in bullet points."
        )
    else:
        quality_rating = "Needs Strategic Optimization"
        quality_reason = (
            "The resume is missing several high-frequency ATS screening keywords for this target role, "
            "and lacks sufficient quantifiable impact (numbers, percentages, scale) to clear competitive initial screens."
        )

    # Unclear descriptions identification
    unclear_descriptions = []
    for line in text.split("\n"):
        line_clean = line.strip().lower()
        for wp in WEAK_PHRASES:
            if wp in line_clean and len(line.strip()) > 15:
                unclear_descriptions.append({
                    "phrase": line.strip(),
                    "issue": f"Contains passive phrasing ('{wp}'). Lacks ownership and business impact metrics."
                })
                break
        if len(unclear_descriptions) >= 4:
            break

    # Opportunities to improve project descriptions
    project_improvements = []
    if extracted["projects_sample"]:
        for proj in extracted["projects_sample"][:3]:
            project_improvements.append({
                "context": proj[:90] + ("..." if len(proj) > 90 else ""),
                "recommendation": "State the business problem, exact architecture/stack used, and quantifiable outcome (e.g., latency reduction, user volume)."
            })
    else:
        project_improvements.append({
            "context": "General Projects Section",
            "recommendation": "Add a dedicated 'Projects' section featuring 2-3 end-to-end production applications with live URLs and GitHub repositories."
        })

    # Strengths & Weaknesses
    strengths = []
    if extracted["email"] != "Not detected" and extracted["phone"] != "Not detected":
        strengths.append("Direct contact channels (email and phone number) are immediately accessible at the top.")
    if extracted["has_github"] or extracted["has_linkedin"]:
        strengths.append("Online proof of work (GitHub / LinkedIn / Portfolio) is properly linked for recruiter diligence.")
    if len(detected_sections) >= 4:
        strengths.append(f"Standard ATS section headings ({', '.join(detected_sections[:4])}) provide clear hierarchy.")
    if metric_count >= 3:
        strengths.append(f"Demonstrates measurable achievements ({metric_count} numeric indicators such as %, $ or scale).")
    if len(found_verbs) >= 4:
        strengths.append(f"Action-oriented tone utilizing dynamic verbs ({', '.join(found_verbs[:4])}).")
    if not strengths:
        strengths.append("Parsable text format readable by automated applicant tracking software.")

    weaknesses = []
    if not extracted["has_linkedin"]:
        weaknesses.append("Missing LinkedIn URL: Technical hiring managers frequently cross-reference your online presence.")
    if not extracted["has_github"]:
        weaknesses.append("No technical portfolio or GitHub link provided to verify code craftsmanship.")
    if metric_count < 2:
        weaknesses.append("Insufficient quantifiable achievements. Relying solely on task descriptions without business impact weakens candidacy.")
    if len(missing_skills) > 4:
        weaknesses.append(f"Underrepresented essential skills for {target_role.replace('_', ' ').title()}: {', '.join(missing_skills[:4])}.")
    if unclear_descriptions:
        weaknesses.append(f"Detected {len(unclear_descriptions)} bullet points using passive duties rather than leadership verbs.")

    # Next Steps
    next_steps = [
        f"Incorporate target competencies: Prioritize adding experience with {', '.join(missing_skills[:3])}.",
        "Apply the Google X-Y-Z formula to all past work bullets: 'Accomplished [X], as measured by [Y], by doing [Z]'.",
        "Review project descriptions to ensure technical stack and deployed links are clearly noted.",
        "Take a role-specific Mock Interview to test your verbal articulation of these resume achievements."
    ]

    # Rewrite suggestions
    rewrite_suggestions = [
        {
            "original": "Worked on backend APIs and fixed database bugs.",
            "revised": "Architected 14+ RESTful microservices in FastAPI/PostgreSQL, reducing API latency by 38% for 90,000+ daily requests."
        },
        {
            "original": "Responsible for frontend UI components and design.",
            "revised": "Engineered responsive UI design system in React 19 & Tailwind CSS, boosting user session duration by 27% across all web clients."
        },
        {
            "original": "Assisted team in developing machine learning models.",
            "revised": "Spearheaded fine-tuning and deployment of PyTorch NLP models, accelerating classification throughput by 42% in production."
        }
    ]

    return {
        "ats_score": overall_score,
        "word_count": total_words,
        "target_role": target_role,
        "quality_assessment": {
            "rating": quality_rating,
            "reason": quality_reason
        },
        "extracted_info": extracted,
        "breakdown": {
            "skills_match": round((skills_score / 25) * 100),
            "quantifiable_impact": round((impact_score / 25) * 100),
            "action_verbs": round((verb_score / 15) * 100),
            "contact_completeness": round((contact_score / 15) * 100),
            "section_structure": round((structure_score / 20) * 100)
        },
        "skills": {
            "found": found_skills,
            "missing": missing_skills,
            "found_count": len(found_skills),
            "missing_count": len(missing_skills)
        },
        "action_verbs_found": found_verbs[:10],
        "metrics_found": metrics_matches[:8],
        "detected_sections": detected_sections,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "unclear_descriptions": unclear_descriptions,
        "project_improvements": project_improvements,
        "recommended_next_steps": next_steps,
        "rewrite_suggestions": rewrite_suggestions
    }
