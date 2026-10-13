import {
  Code2,
  LayoutDashboard,
  Server,
  Layers,
  BarChart3,
  PieChart,
  Brain,
  CloudLightning,
  ShieldAlert,
  Smartphone,
  Palette
} from "lucide-react";

export const CAREER_ROLES_CATALOG = [
  {
    id: "software_developer",
    title: "Software Developer (SDE)",
    shortTitle: "SDE / Software Engineer",
    category: "Core Engineering",
    categoryKey: "engineering",
    badge: "High Demand",
    salaryIn: "₹12 - 28 LPA",
    salaryUs: "$125,000 / yr",
    timeToReady: "6 - 9 Months",
    icon: Code2,
    accentColor: "#6366f1",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    bgSoft: "rgba(99, 102, 241, 0.08)",
    overview: "Master core computer science fundamentals, data structures, algorithms, and scalable modular architecture to build enterprise software.",
    skills: ["Data Structures & Algorithms", "Python / Java / C++", "System Design", "SQL & Database Design", "Docker", "REST APIs"],
    popularCompanies: ["Google", "Microsoft", "Amazon", "Uber", "Flipkart"],
    roadmap_steps: [
      {
        step: "Phase 1: Core Programming & Object-Oriented Principles",
        duration: "Weeks 1 - 6",
        focus: [
          "Deep dive into Python / Java / C++ memory management",
          "OOP principles (Encapsulation, Inheritance, Polymorphism, Abstraction)",
          "File I/O, Exception handling, Multi-threading basics"
        ],
        deliverable: "Build an extensible CLI banking engine or task orchestrator with file persistence & unit tests."
      },
      {
        step: "Phase 2: Data Structures & Algorithms Mastery",
        duration: "Weeks 7 - 14",
        focus: [
          "Arrays, Two-Pointers, Hash Maps, Stacks, Queues",
          "Binary Trees, Binary Search Trees, Graph BFS/DFS",
          "Dynamic Programming & Greedy Algorithms (120+ LeetCode Mediums)"
        ],
        deliverable: "Solve and document clean solutions for Blind 75 LeetCode problems."
      },
      {
        step: "Phase 3: Relational Databases & Backend API Architecture",
        duration: "Weeks 15 - 22",
        focus: [
          "PostgreSQL indexing, query optimization, ACID transactions",
          "RESTful API design with FastAPI or Spring Boot",
          "Redis caching strategies (Cache-Aside, Write-Through)",
          "Low-Level System Design (LLD) & Design Patterns"
        ],
        deliverable: "Design a Distributed URL Shortener or Rate-Limiting API Gateway with Redis and PostgreSQL."
      },
      {
        step: "Phase 4: Cloud Infrastructure, CI/CD & Production Systems",
        duration: "Weeks 23 - 30",
        focus: [
          "Docker containerization & multi-stage builds",
          "CI/CD pipelines with GitHub Actions",
          "High-Level System Design (HLD): Microservices, Load Balancers, Message Queues",
          "Deploying microservices to AWS with observability"
        ],
        deliverable: "Deploy an end-to-end multi-tier microservice on AWS with automated CI/CD and metrics."
      }
    ],
    recommended_projects: [
      "High-Throughput Distributed Rate Limiter with Redis & Token Bucket Algorithm",
      "Real-Time Collaborative Code Editor with WebSockets & Operational Transforms",
      "Automated SQL Query Performance Analyzer & Index Suggester"
    ],
    placement_guidance: {
      private_companies: "For FAANG and tier-1 product startups, prioritize LeetCode Medium/Hard DSA, low-level object-oriented design, and concurrent programming.",
      govt_exams: "For PSU exams (NIC, ISRO, DRDO, BEL), focus heavily on GATE syllabus: Operating Systems, Computer Networks, DBMS, and Compiler Design."
    }
  },
  {
    id: "frontend_developer",
    title: "Frontend Developer",
    shortTitle: "Frontend Engineer",
    category: "Web Development",
    categoryKey: "engineering",
    badge: "Creative & Technical",
    salaryIn: "₹8 - 20 LPA",
    salaryUs: "$115,000 / yr",
    timeToReady: "4 - 7 Months",
    icon: LayoutDashboard,
    accentColor: "#06b6d4",
    gradient: "linear-gradient(135deg, #0891b2 0%, #0284c7 100%)",
    bgSoft: "rgba(6, 182, 212, 0.08)",
    overview: "Craft responsive, interactive, and high-performance user interfaces using modern web technologies and component architectures.",
    skills: ["React 19 & Next.js", "TypeScript", "Tailwind CSS", "Zustand / Redux", "Web Performance & Vitals", "Jest / Vitest"],
    popularCompanies: ["Stripe", "Vercel", "Airbnb", "Razorpay", "Swiggy"],
    roadmap_steps: [
      {
        step: "Phase 1: Modern JavaScript (ES6+) & Advanced CSS",
        duration: "Weeks 1 - 4",
        focus: [
          "Closures, Event Loop, Promises, Async/Await, Web APIs",
          "CSS Grid, Flexbox, CSS Variables, Animations",
          "Tailwind CSS utility-first workflow & responsive design"
        ],
        deliverable: "Pixel-perfect interactive landing page with dark/light mode and responsive layouts."
      },
      {
        step: "Phase 2: React 19 Component Architecture & State",
        duration: "Weeks 5 - 10",
        focus: [
          "React 19 Hooks (useState, useEffect, useMemo, useCallback, useTransition)",
          "TypeScript type safety in components & custom hooks",
          "Zustand / TanStack Query for server state caching"
        ],
        deliverable: "Interactive Kanban Task Management App with drag-and-drop & optimistic UI updates."
      },
      {
        step: "Phase 3: Production Next.js 15 & Core Web Vitals",
        duration: "Weeks 11 - 16",
        focus: [
          "Next.js 15 App Router, Server vs Client Components",
          "SEO optimization, Metadata API, OpenGraph images",
          "Web Performance profiling: LCP, INP, CLS optimization"
        ],
        deliverable: "Full-fledged E-commerce store with SSR, instant faceted search, and checkout flow."
      }
    ],
    recommended_projects: [
      "Figma-to-Code Interactive Design System with Storybook & Accessible Components",
      "Real-Time Financial Analytics Dashboard with Dynamic Chart.js and WebSocket ticker updates"
    ],
    placement_guidance: {
      private_companies: "Prepare machine-coding rounds (building a live component like autocomplete or modal in 60 mins) and deep JS closures/prototypes.",
      govt_exams: "Web developer vacancies in government departments (NIC, CDAC) focus on Web Security (OWASP Top 10), accessibility guidelines, and responsive layouts."
    }
  },
  {
    id: "backend_developer",
    title: "Backend Developer",
    shortTitle: "Backend Systems Engineer",
    category: "Systems & APIs",
    categoryKey: "engineering",
    badge: "High Demand",
    salaryIn: "₹12 - 26 LPA",
    salaryUs: "$128,000 / yr",
    timeToReady: "5 - 8 Months",
    icon: Server,
    accentColor: "#8b5cf6",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
    bgSoft: "rgba(139, 92, 246, 0.08)",
    overview: "Architect resilient, secure backend services, database storage engines, and microservice APIs powering digital platforms.",
    skills: ["Python (FastAPI) / Node.js", "PostgreSQL", "Redis Caching", "Docker", "Kafka / RabbitMQ", "System Design"],
    popularCompanies: ["Netflix", "Meta", "Zomato", "CRED", "Salesforce"],
    roadmap_steps: [
      {
        step: "Phase 1: API Development & Authentication Systems",
        duration: "Weeks 1 - 6",
        focus: [
          "FastAPI / Express framework architectural patterns",
          "Pydantic data validation & OpenAPI documentation",
          "JWT tokens, OAuth2, and Role-Based Access Control (RBAC)"
        ],
        deliverable: "Secure Multi-tenant Authentication and User Management API with audit logging."
      },
      {
        step: "Phase 2: Relational Databases & Performance Tuning",
        duration: "Weeks 7 - 12",
        focus: [
          "PostgreSQL indexing (B-Tree, GIN), EXPLAIN ANALYZE queries",
          "Transactions, Isolation levels (ACID), and database pooling",
          "Redis caching patterns (Cache-Aside, Write-Through, Distributed Locks)"
        ],
        deliverable: "High-volume Order Processing Engine with Redis caching and distributed locking."
      },
      {
        step: "Phase 3: Asynchronous Queues & Microservice Architecture",
        duration: "Weeks 13 - 20",
        focus: [
          "Event-driven architectures with RabbitMQ / Kafka message queues",
          "Docker containerization & docker-compose networks",
          "API Gateways, Rate Limiting & Circuit Breakers"
        ],
        deliverable: "Distributed Notification and Email Ingestion Pipeline handling 10,000 msgs/min."
      }
    ],
    recommended_projects: [
      "Distributed Task Scheduling Worker with Retry Policies and Dead-Letter Queues",
      "Payment Processing Gateway with Webhook Verification and Idempotency Keys"
    ],
    placement_guidance: {
      private_companies: "Master high-level and low-level system design (scaling to 100k requests/sec, database sharding, replication).",
      govt_exams: "Technical officer roles require strong relational database concepts, network protocols (TCP/UDP, HTTP/HTTPS), and Linux server administration."
    }
  },
  {
    id: "fullstack_developer",
    title: "Full Stack Engineer",
    shortTitle: "Full Stack Engineer",
    category: "Core Engineering",
    categoryKey: "engineering",
    badge: "Versatile Pro",
    salaryIn: "₹12 - 30 LPA",
    salaryUs: "$130,000 / yr",
    timeToReady: "6 - 9 Months",
    icon: Layers,
    accentColor: "#ec4899",
    gradient: "linear-gradient(135deg, #db2777 0%, #e11d48 100%)",
    bgSoft: "rgba(236, 72, 153, 0.08)",
    overview: "Bridge client-side experiences with robust server architecture, relational/NoSQL datastores, and cloud deployments.",
    skills: ["Next.js 15", "Node.js / FastAPI", "PostgreSQL & Prisma", "Tailwind CSS", "Docker & AWS", "REST & GraphQL"],
    popularCompanies: ["Shopify", "Atlassian", "Postman", "Zerodha", "Coinbase"],
    roadmap_steps: [
      {
        step: "Phase 1: Modern Frontend Architecture",
        duration: "Weeks 1 - 6",
        focus: [
          "React 19, TypeScript, state management with Zustand",
          "Responsive Tailwind CSS, accessible components",
          "API data fetching with TanStack Query & optimistic updates"
        ],
        deliverable: "Interactive SaaS dashboard with dynamic charting and authentication views."
      },
      {
        step: "Phase 2: Scalable Backend & Database Modeling",
        duration: "Weeks 7 - 14",
        focus: [
          "FastAPI / Node.js REST services & validation",
          "PostgreSQL schema migrations, transactions, indexing",
          "JWT authentication, OAuth2 & sessions"
        ],
        deliverable: "Multi-tenant REST API with role-based access control and rate-limiting."
      },
      {
        step: "Phase 3: Full-Stack Integration & Cloud Deployment",
        duration: "Weeks 15 - 24",
        focus: [
          "End-to-end integration, SSR with Next.js",
          "Docker containerization & docker-compose",
          "Deployment to AWS/Render with automated CI/CD"
        ],
        deliverable: "Production-ready Full Stack collaborative project management platform."
      }
    ],
    recommended_projects: [
      "Full Stack Real-Time Team Messaging App with WebSockets, PostgreSQL and Redis",
      "AI-Powered Workflow Automation Platform with Stripe Billing & Webhooks"
    ],
    placement_guidance: {
      private_companies: "Product companies love candidates who can demonstrate full-cycle ownership from UI design to production deployment.",
      govt_exams: "Govt IT departments look for full stack skills for e-governance portals with security compliance."
    }
  },
  {
    id: "data_analyst",
    title: "Data Analyst",
    shortTitle: "Data Analyst",
    category: "Analytics & Insights",
    categoryKey: "data_ai",
    badge: "High Impact",
    salaryIn: "₹7 - 18 LPA",
    salaryUs: "$98,000 / yr",
    timeToReady: "4 - 6 Months",
    icon: BarChart3,
    accentColor: "#10b981",
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    bgSoft: "rgba(16, 185, 129, 0.08)",
    overview: "Transform raw business data into actionable visual insights, interactive dashboards, and statistical models that guide leadership decisions.",
    skills: ["Advanced SQL (Window Functions)", "Python (Pandas, NumPy)", "Tableau & Power BI", "Excel Advanced", "A/B Testing"],
    popularCompanies: ["McKinsey", "Deloitte", "Amazon", "Fractal", "Mu Sigma"],
    roadmap_steps: [
      {
        step: "Phase 1: Advanced SQL & Relational Querying",
        duration: "Weeks 1 - 4",
        focus: [
          "Window Functions (RANK, DENSE_RANK, LEAD, LAG)",
          "Common Table Expressions (CTEs) & subqueries",
          "Aggregate calculations, filtering, and rolling metrics"
        ],
        deliverable: "Complex Cohort Analysis and Retention Queries on retail dataset."
      },
      {
        step: "Phase 2: Python Data Wrangling & Statistics",
        duration: "Weeks 5 - 10",
        focus: [
          "Pandas data frames cleaning & outlier imputation",
          "Matplotlib & Seaborn visual analytics",
          "Descriptive statistics & A/B testing significance"
        ],
        deliverable: "End-to-end Exploratory Data Analysis (EDA) on customer churn."
      },
      {
        step: "Phase 3: BI Dashboards & Executive Storytelling",
        duration: "Weeks 11 - 16",
        focus: [
          "Power BI / Tableau DAX measures & calculated columns",
          "Interactive dashboard filtering & drill-down views",
          "Translating data insights into executive action items"
        ],
        deliverable: "Executive Sales & Revenue KPI Dashboard connected to PostgreSQL."
      }
    ],
    recommended_projects: [
      "SaaS Recurring Revenue & Customer Retention Interactive Dashboard in Power BI",
      "A/B Test Statistical Significance Calculator with automated confidence intervals"
    ],
    placement_guidance: {
      private_companies: "Be prepared to solve complex live SQL queries on HackerRank and explain business trade-offs of metrics.",
      govt_exams: "Government statistical officer exams (SSC JSO, RBI Grade B DSIM) require deep probability, sampling distributions, and index numbers."
    }
  },
  {
    id: "bi_specialist",
    title: "Business Intelligence (BI) Specialist",
    shortTitle: "BI Specialist",
    category: "Analytics & Insights",
    categoryKey: "data_ai",
    badge: "High Demand",
    salaryIn: "₹8 - 22 LPA",
    salaryUs: "$105,000 / yr",
    timeToReady: "4 - 7 Months",
    icon: PieChart,
    accentColor: "#f59e0b",
    gradient: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
    bgSoft: "rgba(245, 158, 11, 0.08)",
    overview: "Design scalable enterprise data models, ETL pipelines, and executive dashboards using Power BI, Tableau, Snowflake, and advanced SQL.",
    skills: ["Power BI & DAX", "Tableau Server", "Snowflake / BigQuery", "dbt Transformations", "Star Schema Modeling", "ETL Pipelines"],
    popularCompanies: ["Accenture", "Gartner", "JPMorgan", "EY", "PwC"],
    roadmap_steps: [
      {
        step: "Phase 1: Enterprise SQL & Dimensional Modeling",
        duration: "Weeks 1 - 5",
        focus: [
          "Star & Snowflake schemas, Fact vs Dimension tables",
          "Complex joins, windowing, subqueries",
          "Indexing & query optimization for analytical queries"
        ],
        deliverable: "Design a complete Retail Enterprise Data Mart with normalized dimensional models."
      },
      {
        step: "Phase 2: Advanced Power BI & DAX Engineering",
        duration: "Weeks 6 - 12",
        focus: [
          "DAX time intelligence (YTD, MTD, YoY growth)",
          "Row-Level Security (RLS) implementation",
          "Performance Analyzer & DAX Studio query optimization"
        ],
        deliverable: "Multi-tier Financial & Operational BI Dashboard with RLS and automated refresh."
      },
      {
        step: "Phase 3: Cloud Data Warehousing & Modern ELT",
        duration: "Weeks 13 - 18",
        focus: [
          "Snowflake / BigQuery querying, clustering & partitioning",
          "dbt transformations & automated data testing",
          "Airflow orchestration & pipeline monitoring"
        ],
        deliverable: "End-to-end ELT pipeline from PostgreSQL to Snowflake with dbt documentation."
      }
    ],
    recommended_projects: [
      "Global Supply Chain Intelligence Dashboard with real-time stock alert telemetry",
      "Customer Lifetime Value (LTV) & Cohort Churn Dashboard with DAX forecasting"
    ],
    placement_guidance: {
      private_companies: "Focus on dimensional modeling questions (Kimball methodology), optimizing slow DAX formulas, and data storytelling.",
      govt_exams: "Public sector undertakings (ONGC, IOCL, RBI) frequently recruit BI and MIS officers for data governance and financial audit reporting."
    }
  },
  {
    id: "ai_ml_engineer",
    title: "AI & Machine Learning Engineer",
    shortTitle: "AI / ML Engineer",
    category: "Artificial Intelligence",
    categoryKey: "data_ai",
    badge: "Fastest Growing",
    salaryIn: "₹15 - 35 LPA",
    salaryUs: "$145,000 / yr",
    timeToReady: "7 - 10 Months",
    icon: Brain,
    accentColor: "#a855f7",
    gradient: "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)",
    bgSoft: "rgba(168, 85, 247, 0.08)",
    overview: "Train, fine-tune, and deploy machine learning models, neural networks, and generative AI systems into scalable production environments.",
    skills: ["PyTorch / TensorFlow", "Generative AI & LLMs", "RAG & Vector DBs", "FastAPI & Docker", "Scikit-Learn", "MLOps"],
    popularCompanies: ["OpenAI", "Anthropic", "Google DeepMind", "Microsoft", "Nvidia"],
    roadmap_steps: [
      {
        step: "Phase 1: Classical Machine Learning Foundations",
        duration: "Weeks 1 - 8",
        focus: [
          "Supervised learning (Regression, Random Forests, XGBoost)",
          "Unsupervised learning (K-Means, PCA dimensional reduction)",
          "Feature engineering, regularization & cross-validation"
        ],
        deliverable: "Predictive credit risk and loan default classifier with precision-recall metrics."
      },
      {
        step: "Phase 2: Deep Learning & Neural Networks",
        duration: "Weeks 9 - 18",
        focus: [
          "PyTorch tensors, autograd & backpropagation",
          "Convolutional networks (Vision) & Recurrent architectures",
          "Transformer attention architecture & HuggingFace tokenizers"
        ],
        deliverable: "Fine-tuned NLP text classification and summarization pipeline."
      },
      {
        step: "Phase 3: GenAI, RAG & Production MLOps",
        duration: "Weeks 19 - 28",
        focus: [
          "Retrieval-Augmented Generation (RAG) with LangChain / LlamaIndex",
          "Vector embeddings & similarity search (Chroma / Pinecone)",
          "FastAPI model serving with Docker & GPU inference optimization"
        ],
        deliverable: "Production Document Q&A RAG Chatbot with hybrid vector search."
      }
    ],
    recommended_projects: [
      "Enterprise Knowledge Base RAG Assistant with Hybrid Keyword + Vector Retrieval",
      "Multimodal Medical Imaging Diagnostic Assistant using PyTorch & FastAPI"
    ],
    placement_guidance: {
      private_companies: "High focus on model evaluation metrics (F1, ROC-AUC, BLEU), memory-efficient inference (quantization), and deployment.",
      govt_exams: "AI positions in defense/scientific organizations (DRDO, ISRO, MeitY) emphasize mathematical foundations, signal processing, and robotics."
    }
  },
  {
    id: "devops_engineer",
    title: "DevOps & Cloud Engineer",
    shortTitle: "DevOps / Cloud Engineer",
    category: "Cloud & Infrastructure",
    categoryKey: "cloud_security",
    badge: "Mission Critical",
    salaryIn: "₹14 - 32 LPA",
    salaryUs: "$138,000 / yr",
    timeToReady: "6 - 9 Months",
    icon: CloudLightning,
    accentColor: "#0284c7",
    gradient: "linear-gradient(135deg, #0369a1 0%, #075985 100%)",
    bgSoft: "rgba(2, 132, 199, 0.08)",
    overview: "Build resilient CI/CD release pipelines, manage Kubernetes clusters, automate cloud infrastructure with Terraform, and ensure 99.99% uptime.",
    skills: ["Kubernetes & Docker", "Terraform (IaC)", "AWS / GCP", "GitHub Actions CI/CD", "Linux & Bash", "Prometheus & Grafana"],
    popularCompanies: ["Oracle Cloud", "Cisco", "Red Hat", "VMware", "Datadog"],
    roadmap_steps: [
      {
        step: "Phase 1: Linux & Containerization Foundations",
        duration: "Weeks 1 - 6",
        focus: [
          "Linux kernel, networking (DNS, IPTables, SSH, routing)",
          "Docker multi-stage builds & container vulnerability scanning",
          "Bash shell scripting & automation utilities"
        ],
        deliverable: "Automated server hardening script and multi-stage Dockerized application stack."
      },
      {
        step: "Phase 2: Kubernetes & Infrastructure as Code (IaC)",
        duration: "Weeks 7 - 14",
        focus: [
          "Kubernetes Pods, Deployments, Services, Ingress & Helm",
          "Terraform AWS provisioning (VPC, EKS, RDS, S3)",
          "State management, modules & Terraform drift detection"
        ],
        deliverable: "Provision a production-grade AWS EKS Kubernetes cluster via Terraform IaC."
      },
      {
        step: "Phase 3: Production CI/CD & Observability",
        duration: "Weeks 15 - 22",
        focus: [
          "GitHub Actions automated build, test & deploy pipelines",
          "Prometheus metrics collection & Grafana telemetry dashboards",
          "Zero-downtime Blue/Green & Canary deployment strategies"
        ],
        deliverable: "Automated GitOps pipeline deploying microservices to Kubernetes with alerts."
      }
    ],
    recommended_projects: [
      "Zero-Downtime Multi-Region Kubernetes GitOps Deployment Pipeline with ArgoCD",
      "Automated Cloud Cost Optimizer & Drift Detection Engine with Terraform"
    ],
    placement_guidance: {
      private_companies: "Heavy focus on Kubernetes troubleshooting, container security scanning, and Terraform state management.",
      govt_exams: "National Informatics Centre (NIC) and ISRO cloud centers look for strong Linux sysadmin and private cloud virtualization."
    }
  },
  {
    id: "cybersecurity_specialist",
    title: "Cybersecurity Analyst",
    shortTitle: "Cybersecurity / SecOps",
    category: "Security & Networks",
    categoryKey: "cloud_security",
    badge: "Elite Defense",
    salaryIn: "₹10 - 28 LPA",
    salaryUs: "$135,000 / yr",
    timeToReady: "6 - 9 Months",
    icon: ShieldAlert,
    accentColor: "#e11d48",
    gradient: "linear-gradient(135deg, #be123c 0%, #9f1239 100%)",
    bgSoft: "rgba(225, 29, 72, 0.08)",
    overview: "Defend infrastructure and applications against cyber threats, conduct penetration testing, audit compliance, and investigate incidents.",
    skills: ["Network Security (Wireshark)", "OWASP Top 10 & VAPT", "Burp Suite", "SIEM (Splunk)", "Linux Hardening", "Incident Response"],
    popularCompanies: ["CrowdStrike", "Palo Alto", "Mandiant", "CERT-In", "Qualys"],
    roadmap_steps: [
      {
        step: "Phase 1: Network & OS Security Foundations",
        duration: "Weeks 1 - 6",
        focus: [
          "Packet analysis with Wireshark & TCP/IP handshake inspection",
          "Firewalls, IDS/IPS configurations, and VPN architectures",
          "Linux privilege escalation, file permissions & system hardening"
        ],
        deliverable: "Comprehensive network security audit report of a simulated enterprise subnet."
      },
      {
        step: "Phase 2: Web App Security & Penetration Testing",
        duration: "Weeks 7 - 14",
        focus: [
          "SQL injection, XSS, CSRF, SSRF, IDOR vulnerabilities",
          "Burp Suite professional workflows & proxy interception",
          "PortSwigger Web Security Academy labs mastery"
        ],
        deliverable: "Full vulnerability assessment and penetration testing (VAPT) report on web app."
      },
      {
        step: "Phase 3: SOC Operations & Incident Response",
        duration: "Weeks 15 - 22",
        focus: [
          "SIEM log monitoring & detection engineering with Splunk",
          "Malware triage, memory forensics & timeline analysis",
          "MITRE ATT&CK framework mapping & threat hunting"
        ],
        deliverable: "Incident response playbook and threat-hunting simulation in virtual lab."
      }
    ],
    recommended_projects: [
      "Automated Web Vulnerability Scanner with OWASP ZAP API Integration",
      "Threat Intelligence SIEM Dashboard with live honeypot intrusion detection"
    ],
    placement_guidance: {
      private_companies: "Earn certifications like CEH, CompTIA Security+, or OSCP; demonstrate hands-on TryHackMe / HackTheBox rankings.",
      govt_exams: "Defense agencies (CERT-In, DRDO, IB, NTRO) actively recruit cybersecurity analysts with deep protocol forensics."
    }
  },
  {
    id: "mobile_developer",
    title: "Mobile App Developer",
    shortTitle: "Mobile Developer (iOS/Android)",
    category: "Mobile Engineering",
    categoryKey: "engineering",
    badge: "High Demand",
    salaryIn: "₹9 - 24 LPA",
    salaryUs: "$120,000 / yr",
    timeToReady: "5 - 8 Months",
    icon: Smartphone,
    accentColor: "#14b8a6",
    gradient: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
    bgSoft: "rgba(20, 184, 166, 0.08)",
    overview: "Build fluid, offline-first native and cross-platform mobile apps for iOS and Android using Flutter, React Native, or Kotlin.",
    skills: ["Flutter & Dart", "React Native", "Kotlin / Swift", "State Management (Riverpod/Bloc)", "SQLite / Hive", "App Store Release"],
    popularCompanies: ["Uber", "Zomato", "Spotify", "Snapchat", "Dream11"],
    roadmap_steps: [
      {
        step: "Phase 1: Mobile UI & Cross-Platform Basics",
        duration: "Weeks 1 - 5",
        focus: [
          "Widget tree & layout responsiveness across phone sizes",
          "Touch gestures, physics-based custom animations",
          "State management with Provider / Riverpod / Bloc"
        ],
        deliverable: "Clean E-commerce mobile app UI with smooth transitions and persistent cart."
      },
      {
        step: "Phase 2: Networking, Local DB & Offline-First Sync",
        duration: "Weeks 6 - 12",
        focus: [
          "HTTP client, interceptors, error resilience & retry",
          "Offline caching with SQLite / Hive key-value stores",
          "Push notifications via Firebase Cloud Messaging (FCM)"
        ],
        deliverable: "Offline-first Notes & Task Manager with cloud sync and biometric auth."
      },
      {
        step: "Phase 3: Native Modules & Production Release",
        duration: "Weeks 13 - 18",
        focus: [
          "Device hardware APIs (Camera, GPS, Bluetooth, Accelerometer)",
          "App performance profiling & memory leak prevention",
          "CI/CD build pipelines (Fastlane) & Google Play / Apple Store release"
        ],
        deliverable: "Publish a live production app on Google Play Store or Apple TestFlight."
      }
    ],
    recommended_projects: [
      "Real-Time Ride Hailing / Delivery Mobile App with Mapbox & WebSockets",
      "Personal Finance & Expense Tracker with On-Device OCR Receipt Scanning"
    ],
    placement_guidance: {
      private_companies: "Have at least 1 published app on the Play Store or GitHub with clean architecture (Clean Architecture / MVVM).",
      govt_exams: "Govt bodies like NIC build major citizen apps (Aadhaar, DigiLocker, Aarogya Setu) requiring secure mobile developers."
    }
  },
  {
    id: "ui_ux_designer",
    title: "UI/UX & Product Designer",
    shortTitle: "Product / UI/UX Designer",
    category: "Product & Design",
    categoryKey: "design",
    badge: "Strategic Design",
    salaryIn: "₹8 - 20 LPA",
    salaryUs: "$110,000 / yr",
    timeToReady: "4 - 6 Months",
    icon: Palette,
    accentColor: "#f43f5e",
    gradient: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
    bgSoft: "rgba(244, 63, 94, 0.08)",
    overview: "Design engaging user journeys, design systems, interactive prototypes, and accessible user interfaces from concept to developer handoff.",
    skills: ["Figma & Auto Layout", "Design Systems", "Interactive Prototyping", "UX Research & Testing", "WCAG Accessibility", "Micro-interactions"],
    popularCompanies: ["Apple", "Canva", "Linear", "Figma", "Notion"],
    roadmap_steps: [
      {
        step: "Phase 1: UX Research & Information Architecture",
        duration: "Weeks 1 - 4",
        focus: [
          "User personas, journey mapping, empathy maps",
          "Card sorting & Information Architecture (IA)",
          "Lo-fi wireframing in Figma with user testing"
        ],
        deliverable: "End-to-end UX case study identifying user friction in an existing mobile application."
      },
      {
        step: "Phase 2: Visual UI Design & Design Systems",
        duration: "Weeks 5 - 10",
        focus: [
          "Typography, grid systems, color theory, contrast ratios (WCAG)",
          "Figma Auto Layout, components, variants & design tokens",
          "Building a reusable multi-brand Design System"
        ],
        deliverable: "Comprehensive Multi-platform Design System with 50+ reusable components."
      },
      {
        step: "Phase 3: Hi-Fi Prototyping & Developer Handoff",
        duration: "Weeks 11 - 16",
        focus: [
          "Advanced Figma smart animate & interactive components",
          "Usability testing & feedback iteration loops",
          "Design specs & developer handoff documentation"
        ],
        deliverable: "Interactive clickable prototype of a complex SaaS web application with usability test results."
      }
    ],
    recommended_projects: [
      "Complete SaaS Enterprise Cloud Management Dashboard Case Study",
      "Mobile FinTech Wealth Management App Redesign with Usability Metrics"
    ],
    placement_guidance: {
      private_companies: "A polished online portfolio (Notion/Framer/Behance) with 2-3 deep problem-solving case studies is mandatory.",
      govt_exams: "Govt portals (Digital India, MyGov) prioritize accessible, localized vernacular UI and WCAG 2.1 compliance."
    }
  }
];

export const CATEGORY_FILTERS = [
  { id: "all", label: "All Roles (11)" },
  { id: "engineering", label: "Software & Web" },
  { id: "data_ai", label: "Data & AI" },
  { id: "cloud_security", label: "Cloud & Security" },
  { id: "design", label: "Product & Design" }
];
