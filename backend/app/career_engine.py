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
    },
    "bi_specialist": {
        "id": "bi_specialist",
        "title": "Business Intelligence (BI) Specialist",
        "category": "Analytics & Insights",
        "badge": "High Demand",
        "avg_salary": {"us": "$105,000 / yr", "in": "₹8 - 22 LPA"},
        "time_to_ready": "4 - 7 Months",
        "overview": "Design scalable enterprise data models, ETL pipelines, and executive dashboards using Power BI, Tableau, Snowflake, and advanced SQL.",
        "required_skills": [
            "Power BI & DAX Calculations", "Tableau Desktop & Server", "Advanced SQL & Data Modeling (Star Schema)",
            "Data Warehousing (Snowflake / BigQuery)", "ETL / ELT Pipelines (dbt, Apache Airflow)",
            "Data Storytelling & Executive Presentations", "Excel VBA & Power Query"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: Enterprise SQL & Dimensional Modeling",
                "duration": "Weeks 1 - 5",
                "focus": ["Star & Snowflake schemas, Fact vs Dimension tables", "Complex joins, windowing, subqueries", "Indexing & query optimization"],
                "deliverable": "Design a complete Retail Enterprise Data Mart with normalized dimensional models."
            },
            {
                "step": "Step 2: Advanced Power BI & DAX Engineering",
                "duration": "Weeks 6 - 12",
                "focus": ["DAX time intelligence (YTD, MTD, YoY growth)", "Row-Level Security (RLS)", "Performance Analyzer & optimization"],
                "deliverable": "Multi-tier Financial & Operational BI Dashboard with RLS and automated refresh."
            },
            {
                "step": "Step 3: Cloud Data Warehousing & Modern ELT",
                "duration": "Weeks 13 - 18",
                "focus": ["Snowflake / BigQuery querying & partitioning", "dbt transformations & data testing", "Airflow orchestration"],
                "deliverable": "End-to-end ELT pipeline from PostgreSQL to Snowflake with dbt documentation."
            }
        ],
        "recommended_projects": [
            "Global Supply Chain Intelligence Dashboard with real-time stock alert telemetry",
            "Customer Lifetime Value (LTV) & Cohort Churn Dashboard with DAX forecasting"
        ],
        "placement_guidance": {
            "private_companies": "Focus on dimensional modeling questions (Kimball methodology), optimizing slow DAX formulas, and data storytelling.",
            "govt_exams": "Public sector undertakings (ONGC, IOCL, RBI) frequently recruit BI and MIS officers for data governance and financial audit reporting."
        }
    },
    "fullstack_developer": {
        "id": "fullstack_developer",
        "title": "Full Stack Engineer",
        "category": "Core Engineering",
        "badge": "Versatile Pro",
        "avg_salary": {"us": "$130,000 / yr", "in": "₹12 - 30 LPA"},
        "time_to_ready": "6 - 9 Months",
        "overview": "Bridge client-side experiences with robust server architecture, relational/NoSQL datastores, and cloud deployments.",
        "required_skills": [
            "React 19 & Next.js", "Node.js / Express or Python FastAPI", "PostgreSQL & Prisma/TypeORM",
            "REST & GraphQL APIs", "Tailwind CSS", "Docker & AWS", "Git & CI/CD Pipelines"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: Modern Frontend Architecture",
                "duration": "Weeks 1 - 6",
                "focus": ["React 19, TypeScript, state management with Zustand", "Responsive Tailwind CSS, accessible components", "API data fetching with TanStack Query"],
                "deliverable": "Interactive SaaS dashboard with dynamic charting and authentication views."
            },
            {
                "step": "Step 2: Scalable Backend & Database Modeling",
                "duration": "Weeks 7 - 14",
                "focus": ["FastAPI / Node.js REST services", "PostgreSQL schema migrations, transactions, indexing", "JWT authentication & OAuth2"],
                "deliverable": "Multi-tenant REST API with role-based access control and rate-limiting."
            },
            {
                "step": "Step 3: Full-Stack Integration & Cloud Deployment",
                "duration": "Weeks 15 - 24",
                "focus": ["End-to-end integration, SSR with Next.js", "Docker containerization & docker-compose", "Deployment to AWS/Render with CI/CD"],
                "deliverable": "Production-ready Full Stack collaborative project management platform."
            }
        ],
        "recommended_projects": [
            "Full Stack Real-Time Team Messaging App with WebSockets, PostgreSQL and Redis",
            "AI-Powered Workflow Automation Platform with Stripe Billing & Webhooks"
        ],
        "placement_guidance": {
            "private_companies": "Product companies love candidates who can demonstrate full-cycle ownership from UI design to production deployment.",
            "govt_exams": "Govt IT departments look for full stack skills for e-governance portals with security compliance."
        }
    },
    "devops_engineer": {
        "id": "devops_engineer",
        "title": "DevOps & Cloud Engineer",
        "category": "Cloud & Infrastructure",
        "badge": "High Demand",
        "avg_salary": {"us": "$138,000 / yr", "in": "₹14 - 32 LPA"},
        "time_to_ready": "6 - 9 Months",
        "overview": "Build resilient CI/CD release pipelines, manage Kubernetes clusters, automate cloud infrastructure with Terraform, and ensure 99.99% uptime.",
        "required_skills": [
            "Linux Server Administration & Bash", "Docker & Kubernetes (K8s)", "AWS / GCP Cloud Services",
            "Terraform (Infrastructure as Code)", "CI/CD (GitHub Actions / GitLab)", "Monitoring & Observability (Prometheus, Grafana)"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: Linux & Containerization Foundations",
                "duration": "Weeks 1 - 6",
                "focus": ["Linux kernel, networking (DNS, IPTables, SSH)", "Docker multi-stage builds & container security", "Bash shell scripting automation"],
                "deliverable": "Automated server hardening script and multi-stage Dockerized application stack."
            },
            {
                "step": "Step 2: Kubernetes & Infrastructure as Code (IaC)",
                "duration": "Weeks 7 - 14",
                "focus": ["Kubernetes Pods, Deployments, Services, Ingress", "Helm charts packaging", "Terraform AWS provisioning (VPC, EKS, RDS)"],
                "deliverable": "Provision a production-grade AWS EKS Kubernetes cluster via Terraform IaC."
            },
            {
                "step": "Step 3: Production CI/CD & Observability",
                "duration": "Weeks 15 - 22",
                "focus": ["GitHub Actions automated test & deploy pipelines", "Prometheus metrics collection & Grafana dashboards", "Zero-downtime Blue/Green deployments"],
                "deliverable": "Automated GitOps pipeline deploying microservices to Kubernetes with alerts."
            }
        ],
        "recommended_projects": [
            "Zero-Downtime Multi-Region Kubernetes GitOps Deployment Pipeline with ArgoCD",
            "Automated Cloud Cost Optimizer & Drift Detection Engine with Terraform"
        ],
        "placement_guidance": {
            "private_companies": "Heavy focus on Kubernetes troubleshooting, container security scanning, and Terraform state management.",
            "govt_exams": "National Informatics Centre (NIC) and ISRO cloud centers look for strong Linux sysadmin and private cloud virtualization."
        }
    },
    "cybersecurity_specialist": {
        "id": "cybersecurity_specialist",
        "title": "Cybersecurity & Security Analyst",
        "category": "Security & Networks",
        "badge": "Mission Critical",
        "avg_salary": {"us": "$135,000 / yr", "in": "₹10 - 28 LPA"},
        "time_to_ready": "6 - 9 Months",
        "overview": "Defend infrastructure and applications against cyber threats, conduct penetration testing, audit compliance, and investigate incidents.",
        "required_skills": [
            "Network Protocols & Architecture (TCP/IP, Wireshark)", "OWASP Top 10 Web Vulnerabilities",
            "Penetration Testing (Kali Linux, Burp Suite)", "SIEM & Log Analysis (Splunk, ELK)",
            "Linux Security & Cryptography", "Incident Response & Forensics"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: Network & OS Security Foundations",
                "duration": "Weeks 1 - 6",
                "focus": ["Packet analysis with Wireshark", "Firewalls, IDS/IPS, VPNs", "Linux privilege escalation & hardening"],
                "deliverable": "Comprehensive network security audit report of a simulated enterprise subnet."
            },
            {
                "step": "Step 2: Web Application Security & Penetration Testing",
                "duration": "Weeks 7 - 14",
                "focus": ["SQL injection, XSS, CSRF, SSRF, IDOR", "Burp Suite professional workflows", "PortSwigger Web Security Academy labs"],
                "deliverable": "Full vulnerability assessment and penetration testing (VAPT) report on target web app."
            },
            {
                "step": "Step 3: SOC Operations & Incident Response",
                "duration": "Weeks 15 - 22",
                "focus": ["SIEM log monitoring with Splunk", "Malware triage and memory forensics", "MITRE ATT&CK framework mapping"],
                "deliverable": "Incident response playbook and threat-hunting simulation in virtual lab."
            }
        ],
        "recommended_projects": [
            "Automated Web Vulnerability Scanner with OWASP ZAP API Integration",
            "Threat Intelligence SIEM Dashboard with live honeypot intrusion detection"
        ],
        "placement_guidance": {
            "private_companies": "Earn certifications like CEH, CompTIA Security+, or OSCP; demonstrate hands-on TryHackMe / HackTheBox rankings.",
            "govt_exams": "Defense agencies (CERT-In, DRDO, IB, NTRO) actively recruit cybersecurity analysts with deep protocol forensics."
        }
    },
    "mobile_developer": {
        "id": "mobile_developer",
        "title": "Mobile App Developer (iOS / Android)",
        "category": "Mobile Engineering",
        "badge": "High Demand",
        "avg_salary": {"us": "$120,000 / yr", "in": "₹9 - 24 LPA"},
        "time_to_ready": "5 - 8 Months",
        "overview": "Build fluid, offline-first native and cross-platform mobile apps for iOS and Android using Flutter, React Native, or Kotlin.",
        "required_skills": [
            "Flutter & Dart or React Native", "Kotlin / Swift Foundations", "Mobile State Management (Bloc / Riverpod / Redux)",
            "REST APIs & WebSockets Integration", "Local Storage (SQLite / Hive)", "App Store & Play Store Deployment"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: Mobile UI & Cross-Platform Basics",
                "duration": "Weeks 1 - 5",
                "focus": ["Widget tree & layout responsiveness", "Touch gestures & custom animations", "State management with Provider/Riverpod"],
                "deliverable": "Clean E-commerce mobile app UI with smooth transitions and persistent cart."
            },
            {
                "step": "Step 2: Networking, Local DB & Offline-First Sync",
                "duration": "Weeks 6 - 12",
                "focus": ["HTTP client, interceptors, error handling", "Offline caching with SQLite / Hive", "Push notifications (Firebase FCM)"],
                "deliverable": "Offline-first Notes & Task Manager with cloud sync and biometric auth."
            },
            {
                "step": "Step 3: Native Modules & Production Release",
                "duration": "Weeks 13 - 18",
                "focus": ["Device hardware APIs (Camera, GPS, Bluetooth)", "App performance profiling & memory leak checks", "CI/CD build pipelines (Fastlane) & Store submission"],
                "deliverable": "Publish a live production app on Google Play Store or Apple TestFlight."
            }
        ],
        "recommended_projects": [
            "Real-Time Ride Hailing / Delivery Mobile App with Mapbox & WebSockets",
            "Personal Finance & Expense Tracker with On-Device OCR Receipt Scanning"
        ],
        "placement_guidance": {
            "private_companies": "Have at least 1 published app on the Play Store or GitHub with clean architecture (Clean Architecture / MVVM).",
            "govt_exams": "Govt bodies like NIC build major citizen apps (Aadhaar, DigiLocker, Aarogya Setu) requiring secure mobile developers."
        }
    },
    "ui_ux_designer": {
        "id": "ui_ux_designer",
        "title": "UI/UX & Product Designer",
        "category": "Product & Design",
        "badge": "Creative & Strategic",
        "avg_salary": {"us": "$110,000 / yr", "in": "₹8 - 20 LPA"},
        "time_to_ready": "4 - 6 Months",
        "overview": "Design engaging user journeys, design systems, interactive prototypes, and accessible user interfaces from concept to developer handoff.",
        "required_skills": [
            "Figma & Auto Layout", "Design Systems & Token Architecture", "Wireframing & Interactive Prototyping",
            "User Research & Usability Testing", "Information Architecture (IA)", "Micro-interactions & Motion Design"
        ],
        "roadmap_steps": [
            {
                "step": "Step 1: UX Research & Information Architecture",
                "duration": "Weeks 1 - 4",
                "focus": ["User personas, journey mapping, empathy maps", "Card sorting & Information Architecture", "Lo-fi wireframing in Figma"],
                "deliverable": "End-to-end UX case study identifying user friction in an existing mobile application."
            },
            {
                "step": "Step 2: Visual UI Design & Design Systems",
                "duration": "Weeks 5 - 10",
                "focus": ["Typography, grid systems, color theory, contrast ratios (WCAG)", "Figma Auto Layout, components, variants & variables", "Building a reusable Design System"],
                "deliverable": "Comprehensive Multi-platform Design System with 50+ reusable components."
            },
            {
                "step": "Step 3: Hi-Fi Prototyping & Developer Handoff",
                "duration": "Weeks 11 - 16",
                "focus": ["Advanced Figma smart animate & interactive components", "Usability testing & feedback iteration", "Design specs & developer handoff documentation"],
                "deliverable": "Interactive clickable prototype of a complex SaaS web application with usability test results."
            }
        ],
        "recommended_projects": [
            "Complete SaaS Enterprise Cloud Management Dashboard Case Study",
            "Mobile FinTech Wealth Management App Redesign with Usability Metrics"
        ],
        "placement_guidance": {
            "private_companies": "A polished online portfolio (Notion/Framer/Behance) with 2-3 deep problem-solving case studies is mandatory.",
            "govt_exams": "Govt portals (Digital India, MyGov) prioritize accessible, localized vernacular UI and WCAG 2.1 compliance."
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
