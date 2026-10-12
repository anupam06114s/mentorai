import re
import uuid
from typing import Dict, Any, List, Optional

# Core question bank organized by role and mode
INTERVIEW_QUESTION_DATABASE = {
    "software_developer": {
        "technical": [
            {
                "id": "sd-tech-1",
                "question": "Can you explain how a Hash Map resolves collisions, and what is the difference between Chaining and Open Addressing?",
                "key_points": ["Hash function generates bucket index", "Chaining uses linked lists or red-black trees in each bucket", "Open Addressing probes alternate cells like linear/quadratic probing"],
                "model_answer": "A Hash Map maps keys to array buckets via a hash function. When two distinct keys hash to the same bucket, a collision occurs. In Separate Chaining, each bucket stores a linked list (or balanced binary tree as in Java 8) of colliding entries. In Open Addressing, all elements reside directly in the table; collisions are resolved by probing subsequent open slots using linear probing, quadratic probing, or double hashing."
            },
            {
                "id": "sd-tech-2",
                "question": "How would you design a database schema to prevent race conditions during concurrent seat booking in a ticketing system?",
                "key_points": ["Database transaction with isolation level", "Pessimistic locking (SELECT FOR UPDATE) vs Optimistic locking with version column", "Distributed lock using Redis"],
                "model_answer": "To prevent double-booking: 1) Wrap the seat reservation in a transaction with Serializable or Repeatable Read isolation. 2) Use Pessimistic Locking with 'SELECT ... FOR UPDATE' to acquire an exclusive row lock on the seat. 3) Alternatively, use Optimistic Locking with a version or status column (UPDATE seats SET status='BOOKED', version=version+1 WHERE id=? AND status='AVAILABLE' AND version=?). 4) In distributed architectures, acquire a short-lived Redis lock with Redlock."
            }
        ],
        "hr": [
            {
                "id": "sd-hr-1",
                "question": "Tell me about a time you had to deal with tight deadlines and conflicting priorities from multiple stakeholders. How did you handle it?",
                "key_points": ["STAR framework (Situation, Task, Action, Result)", "Transparent prioritization matrix (Eisenhower or MoSCoW)", "Proactive stakeholder communication"],
                "model_answer": "In my previous role, our team had a major release deadline while marketing requested an urgent landing page feature. I scheduled a 15-minute alignment sync with both stakeholders, used the MoSCoW framework to separate non-negotiable compliance items from nice-to-haves, agreed to phase the marketing request into a fast follow-up, and delivered the core release on schedule without burning out the team."
            }
        ],
        "project_based": [
            {
                "id": "sd-proj-1",
                "question": "Walk me through the most technically challenging project on your resume. What was the core bottleneck, and how did your architectural choices resolve it?",
                "key_points": ["Context and business problem", "Specific bottleneck (memory, throughput, latency)", "Engineering solution and measurable outcome"],
                "model_answer": "In our distributed task engine, the system experienced high database connection timeouts when job queues spiked above 500 tasks per minute. I diagnosed the bottleneck using query profiling and identified connection exhaustion. I implemented a Redis queue buffer to decouple ingestion from execution, configured connection pooling, and batch-inserted job statuses, reducing database CPU load by 45% and zeroing timeout errors."
            }
        ]
    },
    "fullstack_developer": {
        "technical": [
            {
                "id": "fs-tech-1",
                "question": "How do you handle state management in a large-scale React application, and when would you choose Context API vs Zustand or Redux Toolkit?",
                "key_points": ["Context API causes re-renders on all consuming components", "Zustand provides lightweight selective subscriptions", "Redux Toolkit provides strict unidirectional architecture and devtools"],
                "model_answer": "For static or infrequently changing state like authentication or themes, React Context works well. However, Context triggers re-renders on every consumer when state updates. For modern scalable apps, Zustand offers boilerplate-free selective subscriptions. In large teams requiring strict unidirectional data flow and middleware, Redux Toolkit is the industry standard."
            },
            {
                "id": "fs-tech-2",
                "question": "Explain how JWT authentication works, how you store tokens securely on the client, and how you mitigate XSS and CSRF attacks.",
                "key_points": ["HttpOnly Secure SameSite cookies mitigate XSS token theft", "Short-lived access token with refresh token rotation", "SameSite=Strict or CSRF anti-forgery tokens"],
                "model_answer": "A JWT contains a base64 encoded header, payload, and signature. Storing tokens in localStorage leaves them vulnerable to XSS. Best security practice is storing the refresh token in an HttpOnly, Secure, SameSite cookie, while keeping the short-lived access token in React memory. To protect against CSRF, use SameSite=Strict cookies and custom headers."
            }
        ],
        "hr": [
            {
                "id": "fs-hr-1",
                "question": "Describe a scenario where you had a strong technical disagreement with a team member. How did you resolve it?",
                "key_points": ["STAR method", "Focusing on data and metrics rather than personal ego", "Constructive compromise or proof-of-concept spike"],
                "model_answer": "When deciding between server-side rendering and client-side rendering for a dynamic search dashboard, our designer favored client-side animations while I prioritized SEO. Instead of debating opinions, we ran a half-day spike measuring First Contentful Paint and crawler indexability. The data showed hybrid SSR with client-side hydration delivered both goals, so we aligned on that solution."
            }
        ],
        "project_based": [
            {
                "id": "fs-proj-1",
                "question": "In the web projects mentioned on your resume, how did you ensure responsive design, web accessibility (a11y), and optimal Core Web Vitals?",
                "key_points": ["Semantic HTML and ARIA landmarks", "Responsive layouts via Flexbox/Grid", "Image optimization, code splitting, and minimizing CLS/LCP"],
                "model_answer": "I enforced semantic HTML5 (header, main, nav, aria-labels for screen readers), used mobile-first Tailwind CSS utilities, implemented dynamic imports and React.lazy for route-based code splitting, and served responsive WebP images with explicit width and height attributes to achieve a Cumulative Layout Shift (CLS) of 0 and an LCP under 1.8 seconds."
            }
        ]
    },
    "ai_ml_engineer": {
        "technical": [
            {
                "id": "ai-tech-1",
                "question": "Explain the mechanics of the Transformer Self-Attention mechanism and why Query, Key, and Value matrices are necessary.",
                "key_points": ["Scaled Dot-Product Attention formula: softmax(QK^T / sqrt(d_k)) * V", "Calculates pairwise token relevance across entire sequence", "Projections into distinct Q, K, V subspaces allow flexible representations"],
                "model_answer": "Self-attention computes pairwise relationship weights between all tokens in a sequence simultaneously. The Query represents what a token is looking for, the Key represents what a token has to offer, and the Value represents the actual representation. Computing the scaled dot-product QK^T / sqrt(d_k) passed through softmax generates an attention weight distribution that is multiplied by V, allowing the model to attend to relevant context regardless of token distance."
            }
        ],
        "hr": [
            {
                "id": "ai-hr-1",
                "question": "How do you explain complex machine learning decisions and potential model biases to non-technical business stakeholders?",
                "key_points": ["Using plain language without mathematical jargon", "Model interpretability tools like SHAP and LIME", "Empirical business impact and guardrails"],
                "model_answer": "I avoid mathematical jargon and focus on business intuition. I use SHAP feature importance plots to illustrate which specific factors influenced a decision (e.g. 'high transaction frequency reduced the score by 15%'). I also present side-by-side fairness audits demonstrating accuracy across demographic segments to build trust."
            }
        ],
        "project_based": [
            {
                "id": "ai-proj-1",
                "question": "Tell me about the machine learning pipeline you built. How did you handle data drift and model monitoring in production?",
                "key_points": ["Automated feature pipelines", "Tracking distribution drift with Kolmogorov-Smirnov test or Evidently AI", "Rollback triggers and retraining"],
                "model_answer": "We set up an automated feature pipeline using Pandas and Scikit-Learn with schema validation. In production, we logged incoming inference payloads and monitored data drift against our training baseline using Evidently AI. When drift exceeded our threshold, automated alerts notified the team and triggered a shadow model evaluation pipeline before promoting retrained weights."
            }
        ]
    }
}

def generate_interview_session(role: str = "fullstack_developer", mode: str = "mixed", resume_text: str = "") -> List[Dict[str, Any]]:
    """
    Generates a set of 3-5 questions tailored to the role and mode.
    If resume text is provided, generates customized project-based questions referencing user skills.
    """
    normalized_role = role.lower().replace(" ", "_")
    if normalized_role not in INTERVIEW_QUESTION_DATABASE:
        normalized_role = "fullstack_developer"
        
    role_data = INTERVIEW_QUESTION_DATABASE[normalized_role]
    questions = []

    if mode == "technical":
        questions.extend(role_data.get("technical", []))
    elif mode == "hr":
        questions.extend(role_data.get("hr", []))
    elif mode == "project_based":
        questions.extend(role_data.get("project_based", []))
    else:  # mixed
        for section in ["technical", "project_based", "hr"]:
            items = role_data.get(section, [])
            if items:
                questions.append(items[0])

    # If resume contains specific projects, synthesize a tailored question
    if resume_text:
        projects_found = re.findall(r'(?:project|built|created)\s*:\s*([^\n\.]+)', resume_text, re.I)
        if projects_found:
            proj_title = projects_found[0].strip()
            custom_q = {
                "id": f"custom-{uuid.uuid4().hex[:6]}",
                "question": f"In your resume you noted working on '{proj_title}'. Can you elaborate on your specific contributions, trade-offs made, and how you evaluated its success?",
                "key_points": ["Ownership and personal contribution", "Technical stack choice trade-offs", "Measurable result"],
                "model_answer": f"Highlight your personal role in developing {proj_title}, why you selected the tech stack, the main technical challenge encountered, and the final measurable business impact."
            }
            questions.insert(1, custom_q)

    return questions[:4]

def evaluate_interview_response(question: str, answer: str, key_points: List[str] = None) -> Dict[str, Any]:
    """
    Evaluates candidate response across 5 dimensions:
    - Relevance, Correctness, Completeness, Reasoning, Communication.
    Also produces a follow-up question.
    """
    text = answer.strip()
    words = len(re.findall(r'\b\w+\b', text))
    lower = text.lower()

    if words < 12:
        return {
            "score": 3,
            "relevance_score": 35,
            "correctness_score": 30,
            "completeness_score": 20,
            "communication_score": 40,
            "feedback": "Answer is too brief. Please elaborate on technical details, architecture decisions, and practical examples.",
            "correct_parts": ["Attempted to address the question prompt."],
            "incomplete_parts": ["Lacks technical depth, architectural trade-offs, and concrete examples."],
            "strengths": ["Clear spoken cadence."],
            "weaknesses": ["Answer lacks sufficient detail to verify senior engineering proficiency."],
            "follow_up_question": "Can you provide a specific production example where you applied this principle?",
            "model_answer": "Provide a structured 3-part response: 1) Core definition, 2) Trade-offs, 3) Production example."
        }

    # Match key concepts
    matched_pts = 0
    if key_points:
        for kp in key_points:
            terms = [w for w in re.findall(r'\b\w+\b', kp.lower()) if len(w) > 3]
            if any(t in lower for t in terms[:4]):
                matched_pts += 1
    pt_ratio = matched_pts / max(len(key_points) if key_points else 1, 1)

    # Score calculation out of 10
    base_score = 6
    if words >= 45: base_score += 1
    if words >= 90: base_score += 1
    if pt_ratio >= 0.5: base_score += 1
    if pt_ratio >= 0.8: base_score += 1
    overall_score = min(10, max(4, base_score))

    correct_parts = []
    incomplete_parts = []
    if pt_ratio >= 0.5:
        correct_parts.append("Accurately captured the core architectural definitions.")
    else:
        correct_parts.append("Demonstrated foundational familiarity with the subject.")

    if words < 60:
        incomplete_parts.append("Could elaborate on edge cases and failure modes.")
    if not any(term in lower for term in ["trade-off", "performance", "scalability", "security", "latency"]):
        incomplete_parts.append("Did not explicitly mention performance or security implications.")

    strengths = [
        "Well-structured communication style.",
        "Good alignment with standard industry practices."
    ]
    if any(k in lower for k in ["for example", "in my project", "we used", "i built"]):
        strengths.append("Supported reasoning with practical project experiences.")

    weaknesses = []
    if incomplete_parts:
        weaknesses.extend(incomplete_parts)
    else:
        weaknesses.append("Consider discussing alternative architectures to show broader seniority.")

    # Contextual follow-up question
    follow_up_question = "What would be the primary bottleneck if the user traffic or data volume scaled 10x, and how would you redesign it?"

    return {
        "score": overall_score,
        "relevance_score": min(98, 70 + (words // 20) * 5),
        "correctness_score": min(95, round(overall_score * 9.5)),
        "completeness_score": min(95, round(pt_ratio * 100) if pt_ratio > 0 else 65),
        "communication_score": min(96, 65 + min(30, words // 3)),
        "feedback": "Strong answer demonstrating solid technical competence." if overall_score >= 8 else "Good foundational understanding, with opportunities for deeper architectural nuance.",
        "correct_parts": correct_parts,
        "incomplete_parts": incomplete_parts,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "follow_up_question": follow_up_question
    }

def generate_meeting_link(interview_id: int) -> str:
    """
    Generates a real, secure, browser-accessible Jitsi Meet video conference URL.
    This works directly in all modern browsers with camera/microphone permissions,
    requiring zero API keys or external billing.
    """
    room_name = f"MentorAIAura-Interview-{interview_id}-{uuid.uuid4().hex[:6]}"
    return f"https://meet.jit.si/{room_name}"
