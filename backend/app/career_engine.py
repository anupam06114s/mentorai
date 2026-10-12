import re
from typing import Dict, Any, List

CAREER_ROLE_SPECS: Dict[str, Any] = {
    "software_developer": {
        "id": "software_developer",
        "title": "Software Developer (SDE)",
        "category": "Core Engineering",
        "badge": "High Demand",
        "avg_salary": {"us": "$125,000 / yr", "in": "₹12 - 28 LPA"},
        "time_to_ready": "6 - 9 Months",
        "overview": "Master core computer science fundamentals, data structures, algorithms, and modular software architecture to build scalable enterprise applications.",
        "required_skills": [
            "Data Structures & Algorithms", "Python or Java or C++", "SQL & Database Design",
            "Git & Version Control", "System Design Basics", "RESTful API Architecture",
            "Docker & Containerization", "Unit Testing & Debugging"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: Core Programming & Object-Oriented Principles",
                "duration": "Weeks 1 - 6",
                "focus": ["Deep dive into Python/Java", "OOP principles (Encapsulation, Polymorphism)", "Memory Management & Multi-threading"],
                "deliverable": "Build an extensible CLI banking or task engine with file persistence and unit tests."
            },
            {
                "step": "Step 2: DSA Problem Solving Mastery",
                "duration": "Weeks 7 - 14",
                "focus": ["Arrays, Two-Pointers, Hash Maps, Stacks, Queues", "Trees, Binary Search Trees, Graph BFS/DFS", "Dynamic Programming & Greedy Algorithms", "LeetCode Mediums (120+ problems)"],
                "deliverable": "Solve and document solutions for top 75 LeetCode problems."
            },
            {
                "step": "Step 3: Systems & Relational Databases",
                "duration": "Weeks 15 - 22",
                "focus": ["PostgreSQL indexing & query optimization", "REST API development with FastAPI/Spring Boot", "Caching with Redis", "System Design foundations"],
                "deliverable": "Design a Distributed URL Shortener or Rate-Limiting API Gateway with Redis and PostgreSQL."
            },
            {
                "step": "Step 4: Cloud Deployment & Production Engineering",
                "duration": "Weeks 23 - 30",
                "focus": ["Docker containerization", "CI/CD pipelines with GitHub Actions", "Deploying microservices to AWS (EC2/ECS)", "Observability & logging"],
                "deliverable": "Deploy end-to-end multi-tier microservice on cloud with automated CI/CD."
            }
        ],
        "recommended_projects": [
            "High-Throughput Distributed Rate Limiter with Redis & Token Bucket Algorithm",
            "Real-Time Collaborative Code Editor with WebSockets & Operational Transforms",
            "Automated SQL Query Performance Analyzer & Index Suggester"
        ],
        "placement_guidance": {
            "private_companies": "For FAANG and tier-1 product startups, prioritize LeetCode Medium/Hard DSA, low-level object-oriented design, and concurrent programming.",
            "govt_exams": "For PSU exams (NIC, ISRO, DRDO, BEL), focus heavily on GATE syllabus: Operating Systems, Computer Networks, DBMS, and Compiler Design."
        }
    },
    "frontend_developer": {
        "id": "frontend_developer",
        "title": "Frontend Developer",
        "category": "Web Development",
        "badge": "Creative & Technical",
        "avg_salary": {"us": "$115,000 / yr", "in": "₹8 - 20 LPA"},
        "time_to_ready": "4 - 7 Months",
        "overview": "Craft responsive, interactive, and high-performance user interfaces using modern web technologies and component architectures.",
        "required_skills": [
            "Modern JavaScript (ES6+)", "TypeScript", "React 19 & Next.js",
            "HTML5 & Semantic Web", "Tailwind CSS & Responsive Design",
            "State Management (Zustand/Redux)", "Web Performance & Core Web Vitals", "Jest / Vitest Testing"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: Modern JavaScript & CSS Foundations",
                "duration": "Weeks 1 - 4",
                "focus": ["Closures, Event Loop, Promises, Async/Await", "Flexbox, CSS Grid, CSS Variables", "Tailwind CSS styling"],
                "deliverable": "Pixel-perfect interactive landing page with dark/light mode."
            },
            {
                "step": "Step 2: Component Architecture with React 19",
                "duration": "Weeks 5 - 10",
                "focus": ["React Hooks (useState, useEffect, useMemo, useCallback)", "Component re-render optimization", "TypeScript with React", "Zustand state management"],
                "deliverable": "Interactive Kanban Task Management App with drag-and-drop."
            },
            {
                "step": "Step 3: Production Next.js & Server Components",
                "duration": "Weeks 11 - 16",
                "focus": ["Next.js 15 App Router", "Server vs Client Components", "SEO optimization & Core Web Vitals", "API routes & Middleware"],
                "deliverable": "Full-fledged E-commerce store with server-side rendering, search filters, and checkout flow."
            }
        ],
        "recommended_projects": [
            "Figma-to-Code Interactive Design System with Storybook & Accessible Components",
            "Real-Time Financial Dashboard with Dynamic Chart.js and WebSocket ticker updates"
        ],
        "placement_guidance": {
            "private_companies": "Prepare machine-coding rounds (building a live component like autocomplete or modal in 60 mins) and deep JS closures/prototypes.",
            "govt_exams": "Web developer vacancies in government departments (NIC, CDAC) focus on Web Security (OWASP Top 10), accessibility guidelines, and responsive layouts."
        }
    },
    "backend_developer": {
        "id": "backend_developer",
        "title": "Backend Developer",
        "category": "Systems & APIs",
        "badge": "High Demand",
        "avg_salary": {"us": "$128,000 / yr", "in": "₹12 - 26 LPA"},
        "time_to_ready": "5 - 8 Months",
        "overview": "Architect resilient, secure backend services, database storage engines, and microservice APIs powering modern digital platforms.",
        "required_skills": [
            "Python (FastAPI) or Node.js or Java", "PostgreSQL & Database Normalization",
            "Redis Caching & Pub/Sub", "JWT Auth & Security", "Docker & Containerization",
            "RESTful & GraphQL APIs", "Message Queues (Kafka/RabbitMQ)", "System Design"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: API Development & Authentication",
                "duration": "Weeks 1 - 6",
                "focus": ["FastAPI / Express framework", "Pydantic data validation", "JWT tokens & OAuth2", "Database migrations"],
                "deliverable": "Secure Multi-tenant Authentication and User Management API."
            },
            {
                "step": "Step 2: Relational Databases & Performance Tuning",
                "duration": "Weeks 7 - 12",
                "focus": ["PostgreSQL indexing & EXPLAIN ANALYZE", "Transactions & ACID guarantees", "Redis caching patterns (Cache-Aside, Write-Through)"],
                "deliverable": "High-volume Order Processing Engine with Redis caching and locking."
            },
            {
                "step": "Step 3: Asynchronous Queues & Microservices",
                "duration": "Weeks 13 - 20",
                "focus": ["Event-driven architectures with RabbitMQ / Kafka", "Docker & Docker Compose", "API Gateways & Rate Limiting"],
                "deliverable": "Distributed Notification and Email Ingestion Pipeline."
            }
        ],
        "recommended_projects": [
            "Distributed Task Scheduling Worker with Retry Policies and Dead-Letter Queues",
            "Payment Processing Gateway with Webhook Verification and Idempotency Keys"
        ],
        "placement_guidance": {
            "private_companies": "Master high-level and low-level system design (scaling to 100k requests/sec, database sharding, replication).",
            "govt_exams": "Technical officer roles require strong relational database concepts, network protocols (TCP/UDP, HTTP/HTTPS), and Linux server administration."
        }
    },
    "data_analyst": {
        "id": "data_analyst",
        "title": "Data Analyst / BI Specialist",
        "category": "Analytics & Insights",
        "badge": "Business Impact",
        "avg_salary": {"us": "$98,000 / yr", "in": "₹7 - 18 LPA"},
        "time_to_ready": "4 - 6 Months",
        "overview": "Transform raw business data into actionable visual insights, interactive dashboards, and statistical models that guide leadership decisions.",
        "required_skills": [
            "Advanced SQL (CTEs, Window Functions, Joins)", "Python for Data Analysis (Pandas, NumPy)",
            "Data Visualization (Tableau or Power BI)", "Excel Advanced Modeling & Pivot Tables",
            "Statistical Hypothesis Testing & A/B Testing", "Business Metrics (CAC, LTV, Churn)"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: Advanced SQL & Relational Querying",
                "duration": "Weeks 1 - 4",
                "focus": ["Window Functions (RANK, DENSE_RANK, LEAD, LAG)", "Common Table Expressions (CTEs)", "Aggregate calculations & grouping"],
                "deliverable": "Complex Cohort Analysis and Retention Queries on retail dataset."
            },
            {
                "step": "Step 2: Python Data Wrangling & Statistics",
                "duration": "Weeks 5 - 10",
                "focus": ["Pandas data frames cleaning", "Matplotlib & Seaborn visualizations", "Descriptive statistics & A/B testing"],
                "deliverable": "End-to-end Exploratory Data Analysis (EDA) on customer churn."
            },
            {
                "step": "Step 3: BI Dashboards & Executive Storytelling",
                "duration": "Weeks 11 - 16",
                "focus": ["Power BI / Tableau DAX measures", "Interactive dashboard filtering", "Translating data insights into executive action items"],
                "deliverable": "Executive Sales & Revenue KPI Dashboard connected to PostgreSQL."
            }
        ],
        "recommended_projects": [
            "SaaS Recurring Revenue & Customer Retention Interactive Dashboard in Power BI",
            "A/B Test Statistical Significance Calculator with automated confidence intervals"
        ],
        "placement_guidance": {
            "private_companies": "Be prepared to solve complex live SQL queries on HackerRank and explain business trade-offs of metrics.",
            "govt_exams": "Government statistical officer exams (SSC JSO, RBI Grade B DSIM) require deep probability, sampling distributions, and index numbers."
        }
    },
    "ai_ml_engineer": {
        "id": "ai_ml_engineer",
        "title": "AI & Machine Learning Engineer",
        "category": "Artificial Intelligence",
        "badge": "Fastest Growing",
        "avg_salary": {"us": "$145,000 / yr", "in": "₹15 - 35 LPA"},
        "time_to_ready": "7 - 10 Months",
        "overview": "Train, fine-tune, and deploy machine learning models, neural networks, and generative AI systems into scalable production environments.",
        "required_skills": [
            "Python (NumPy, Pandas, Scikit-Learn)", "Deep Learning (PyTorch or TensorFlow)",
            "Generative AI & Transformers (HuggingFace)", "RAG & Vector Databases (Chroma/Pinecone)",
            "Model Deployment with FastAPI & Docker", "Linear Algebra, Calculus & Statistics"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: Classical Machine Learning Foundations",
                "duration": "Weeks 1 - 8",
                "focus": ["Supervised learning (Regression, Trees, XGBoost)", "Unsupervised learning (K-Means, PCA)", "Feature engineering & cross-validation"],
                "deliverable": "Predictive credit risk and loan default classifier with model metrics."
            },
            {
                "step": "Step 2: Deep Learning & Neural Networks",
                "duration": "Weeks 9 - 18",
                "focus": ["PyTorch tensors & gradient descent", "Convolutional networks (Vision)", "Transformer attention architecture"],
                "deliverable": "Fine-tuned NLP text classification and summarization pipeline."
            },
            {
                "step": "Step 3: GenAI, RAG & Production MLOps",
                "duration": "Weeks 19 - 28",
                "focus": ["Retrieval-Augmented Generation (RAG)", "Vector embeddings & similarity search", "FastAPI model serving with Docker"],
                "deliverable": "Production Document Q&A RAG Chatbot with vector search."
            }
        ],
        "recommended_projects": [
            "Enterprise Knowledge Base RAG Assistant with Hybrid Keyword + Vector Retrieval",
            "Multimodal Medical Imaging Diagnostic Assistant using PyTorch & FastAPI"
        ],
        "placement_guidance": {
            "private_companies": "High focus on model evaluation metrics (F1, ROC-AUC, BLEU), memory-efficient inference (quantization), and deployment.",
            "govt_exams": "AI positions in defense/scientific organizations (DRDO, ISRO, MeitY) emphasize mathematical foundations, signal processing, and robotics."
        }
    }
}

def generate_personalized_guidance(user_skills: List[str] = None, user_interests: str = "", target_role: str = "software_developer", custom_job_desc: str = "") -> Dict[str, Any]:
    """
    Compares user's skills against role requirements, identifies gaps,
    and returns a tailored learning roadmap.
    """
    role_key = target_role.lower().replace(" ", "_")
    if role_key not in CAREER_ROLE_SPECS:
        role_key = "software_developer"
        
    spec = CAREER_ROLE_SPECS[role_key]
    required_skills = spec["required_skills"]
    
    # Normalize user skills
    user_skills_clean = [s.lower().strip() for s in (user_skills or [])]
    if user_interests:
        for term in re.findall(r'\b\w+\b', user_interests.lower()):
            if len(term) > 3 and term not in user_skills_clean:
                user_skills_clean.append(term)
                
    # If custom job description provided, extract additional skills
    additional_reqs = []
    if custom_job_desc:
        keywords = ["docker", "kubernetes", "aws", "graphql", "next.js", "redis", "kafka", "ci/cd", "microservices", "sql", "python"]
        for kw in keywords:
            if kw in custom_job_desc.lower() and kw not in [r.lower() for r in required_skills]:
                additional_reqs.append(kw.title())

    combined_reqs = required_skills + additional_reqs[:3]

    existing_skills = []
    missing_skills = []

    for req in combined_reqs:
        req_lower = req.lower()
        if any(us in req_lower or req_lower in us for us in user_skills_clean):
            existing_skills.append(req)
        else:
            missing_skills.append(req)

    readiness = round((len(existing_skills) / max(len(combined_reqs), 1)) * 100)

    # All recommended roles for user's consideration
    recommended_roles = [
        {"id": k, "title": v["title"], "category": v["category"], "salary": v["avg_salary"]["in"]}
        for k, v in CAREER_ROLE_SPECS.items()
    ]

    return {
        "target_role": spec["title"],
        "target_role_id": spec["id"],
        "badge": spec["badge"],
        "overview": spec["overview"],
        "avg_salary": spec["avg_salary"],
        "time_to_ready": spec["time_to_ready"],
        "readiness_percent": readiness,
        "existing_skills": existing_skills,
        "missing_skills": missing_skills,
        "roadmap_steps": spec["roadmap_steps"],
        "recommended_projects": spec["recommended_projects"],
        "placement_guidance": spec["placement_guidance"],
        "recommended_roles": recommended_roles,
        "preparation_priorities": [
            f"Close top skill gap: Begin with {missing_skills[0] if missing_skills else 'Advanced Architecture'}.",
            f"Build proof-of-work project: {spec['recommended_projects'][0]}.",
            "Practice targeted Mock Interview questions for this domain.",
            "Complete a timed Mock Test to measure conceptual accuracy."
        ]
    }
