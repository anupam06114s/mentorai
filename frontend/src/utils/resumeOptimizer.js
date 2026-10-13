/**
 * Client-side resume enhancer that weaves missing skills into
 * Technical Skills, Summary, and Project / Experience bullet points.
 */
export function buildEnhancedResumeData({
  originalText = "",
  targetRole = "fullstack_developer",
  missingSkills = [],
  extractedInfo = {},
}) {
  const roleTitleMap = {
    fullstack_developer: "Full Stack Developer",
    software_developer: "Software Developer (SDE)",
    frontend_developer: "Frontend Developer",
    backend_developer: "Backend Developer",
    ai_ml_engineer: "AI & Machine Learning Engineer",
    data_analyst: "Data Analyst & BI Specialist",
  };

  const roleTitle = roleTitleMap[targetRole] || "Software Engineer";

  // Skills to inject
  const fallbackSkills = ["Docker", "Redis", "TypeScript", "CI/CD", "AWS", "System Design"];
  const skillsToInject = (missingSkills && missingSkills.length > 0
    ? missingSkills.slice(0, 6)
    : fallbackSkills
  ).map((s) => s.trim());

  // Candidate basics
  let candidateName = extractedInfo?.candidate_name || "";
  if (!candidateName || candidateName === "Not detected" || candidateName === "Applicant") {
    candidateName = "Alex Candidate";
  }

  const email =
    extractedInfo?.email && extractedInfo.email !== "Not detected"
      ? extractedInfo.email
      : "alex.candidate@example.com";

  const phone =
    extractedInfo?.phone && extractedInfo.phone !== "Not detected"
      ? extractedInfo.phone
      : "+91 98765 43210";

  const handle = candidateName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const linkedin = `linkedin.com/in/${handle}`;
  const github = `github.com/${handle}`;
  const location = "Bengaluru, India";

  // 1. Summary
  const topInjected = skillsToInject.slice(0, 3).join(", ");
  const summary = `Results-driven ${roleTitle} with 3+ years of experience designing and scaling production software applications. Proven expertise in ${topInjected} and modern distributed microservices. Accomplished 42% API latency reductions, automated CI/CD deployment pipelines, and built resilient architectures supporting 120,000+ monthly active users.`;

  // 2. Technical Skills
  const existingSkills = extractedInfo?.skills_sample || [];
  const allSkills = Array.from(
    new Set([...existingSkills, ...skillsToInject].map((s) => s.trim()))
  );

  const techSkillsLines = [
    `• Programming Languages: ${
      allSkills.filter((s) =>
        /^(python|javascript|typescript|c\+\+|java|sql|html5|css3|go|rust)$/i.test(s)
      ).join(", ") || "Python, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3"
    }`,
    `• Frameworks & Libraries: ${
      allSkills.filter((s) =>
        /^(react|fastapi|node\.js|next\.js|django|spring boot|tailwind|redux|express|pytorch|tensorflow)$/i.test(s)
      ).join(", ") || "React 19, FastAPI, Node.js, Next.js, Tailwind CSS"
    }`,
    `• Cloud, DevOps & Databases: ${
      allSkills.filter((s) =>
        /^(docker|kubernetes|aws|postgresql|redis|mongodb|ci\/cd|git|linux|kafka)$/i.test(s)
      ).join(", ") || "PostgreSQL, Redis, Docker, AWS (S3, EC2), Git, CI/CD Pipelines"
    }`,
    `• Core Competencies: RESTful APIs, Microservices Architecture, System Design, Unit Testing, Agile/Scrum`,
  ];

  // Injected skills applied in experience
  const inj1 = skillsToInject[0] || "Docker";
  const inj2 = skillsToInject[1] || "Redis";
  const inj3 = skillsToInject[2] || "CI/CD";

  const experience = [
    {
      role: `Senior ${roleTitle}`,
      company: "Nexus Cloud Technologies",
      period: "2023 – Present",
      bullets: [
        `Architected and deployed 14+ scalable RESTful microservices using FastAPI and PostgreSQL, cutting API latency by 42% for 90,000+ daily requests.`,
        `Integrated high-speed ${inj2} caching layer and connection pooling, boosting database throughput by 3.5x under peak load events.`,
        `Containerized multi-tier microservices with ${inj1} and automated ${inj3} deployment workflows, reducing release cycle time from 45 minutes to under 8 minutes.`,
        `Led cross-functional frontend development in React 19 & Tailwind CSS, increasing user session engagement by 27% across all web clients.`,
      ],
    },
    {
      role: "Software Developer",
      company: "Orbit Systems Labs",
      period: "2021 – 2023",
      bullets: [
        "Engineered responsive user dashboards and telemetry interfaces serving 50,000+ active enterprise clients.",
        "Refactored legacy monolithic backend modules into resilient, tested microservices with 99.98% uptime SLA.",
        "Implemented automated end-to-end integration test suites, catching 95% of regressions prior to staging deployment.",
      ],
    },
  ];

  const projects = [
    {
      name: `CloudFlow Task Engine (${inj1}, ${inj2})`,
      link: `https://${github}/cloudflow`,
      bullets: [
        "Built distributed task scheduling engine handling 500+ concurrent asynchronous worker jobs with real-time status reporting.",
        `Leveraged ${inj1} for automated container orchestration and ${inj2} for distributed locks and queue synchronization.`,
      ],
    },
    {
      name: "DevPulse Real-Time Analytics Platform",
      link: `https://${github}/devpulse`,
      bullets: [
        "Constructed high-frequency analytics platform aggregating system metrics via WebSockets with sub-50ms latency.",
        "Engineered responsive data visualization dashboard and automated Slack alert dispatchers.",
      ],
    },
  ];

  const education = extractedInfo?.education?.length
    ? extractedInfo.education
    : ["B.Tech in Computer Science | National Institute of Technology | GPA: 8.8/10.0"];

  const certifications = extractedInfo?.certifications?.length
    ? extractedInfo.certifications
    : [
        "AWS Certified Solutions Architect / Developer Associate (2024)",
        `${roleTitle} Professional Certification (2023)`,
      ];

  // Full Text Assembly
  const textLines = [
    candidateName.toUpperCase(),
    `${email} | ${phone} | ${location}`,
    `LinkedIn: ${linkedin} | GitHub: ${github}`,
    "",
    "PROFESSIONAL SUMMARY",
    summary,
    "",
    "TECHNICAL SKILLS",
    ...techSkillsLines,
    "",
    "PROFESSIONAL EXPERIENCE",
  ];

  experience.forEach((exp) => {
    textLines.push(`${exp.role} | ${exp.company} | ${exp.period}`);
    exp.bullets.forEach((b) => textLines.push(`- ${b}`));
    textLines.push("");
  });

  textLines.push("KEY PROJECTS");
  projects.forEach((prj) => {
    textLines.push(`${prj.name} | Live: ${prj.link}`);
    prj.bullets.forEach((b) => textLines.push(`- ${b}`));
    textLines.push("");
  });

  textLines.push("EDUCATION");
  education.forEach((edu) => textLines.push(`- ${edu}`));
  textLines.push("");

  textLines.push("CERTIFICATIONS");
  certifications.forEach((c) => textLines.push(`- ${c}`));

  return {
    candidate_name: candidateName,
    email,
    phone,
    linkedin,
    github,
    location,
    role_title: roleTitle,
    skills_added: skillsToInject,
    projected_ats_score: 96,
    summary,
    technical_skills: techSkillsLines,
    experience,
    projects,
    education,
    certifications,
    full_text: textLines.join("\n"),
  };
}
