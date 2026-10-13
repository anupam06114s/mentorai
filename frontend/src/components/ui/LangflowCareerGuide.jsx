import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GitFork,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Video,
  ChevronLeft,
  ChevronRight,
  Target,
  Check,
  Building2,
  GraduationCap,
  Layers,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Terminal,
  Code2,
  Sliders,
  Workflow,
  X,
  FileCode,
  HelpCircle,
  ExternalLink,
  Moon,
  Sun,
  Copy,
  CheckCheck,
  Compass,
  Cpu,
  Database,
  ShieldCheck,
  Bot,
  Trophy,
  Award,
  Zap
} from "lucide-react";

// Dynamic Role-Specific AI Architecture Advice
const ROLE_ARCHITECTURE_ADVICE = {
  software_developer: {
    advice:
      "Anchor on object-oriented system design and strict algorithmic complexity. Solve 120+ LeetCode mediums and build a multi-threaded, low-latency client-server engine to pass top-tier FAANG engineering screening.",
    keyMetric: "120+ Blind 75 Mediums",
    focusPill: "Core OOP & Low-Level Design",
  },
  frontend_developer: {
    advice:
      "Prioritize Core Web Vitals (LCP < 2.5s, CLS < 0.1), SSR/SSG with Next.js 15, and accessible design token systems. Deliver interactive production web apps with zero layout shift and 95+ Lighthouse scores.",
    keyMetric: "Lighthouse 95+ Score",
    focusPill: "Core Web Vitals & Next.js",
  },
  backend_developer: {
    advice:
      "Focus on high-throughput microservices, ACID transaction isolation levels, Redis write-through caching, and idempotent event queues (Kafka/RabbitMQ) for 99.99% system availability.",
    keyMetric: "Sub-50ms API Latency",
    focusPill: "Microservices & Distributed Systems",
  },
  fullstack_developer: {
    advice:
      "Build end-to-end type-safe architectures with TypeScript, PostgreSQL, and Docker. Deliver monolithic to decoupled microservices capstones with complete CI/CD test automation.",
    keyMetric: "End-to-End Type Safety",
    focusPill: "Full-Stack CI/CD & Cloud Deploy",
  },
  data_analyst: {
    advice:
      "Master advanced SQL window functions (PARTITION BY, CTEs), data storytelling with Tableau/Power BI, and automated Python ETL pipelines to convert complex raw data into executive business ROI.",
    keyMetric: "Executive Decision Storytelling",
    focusPill: "SQL Analytics & ETL Pipelines",
  },
  bi_specialist: {
    advice:
      "Design Star & Snowflake dimensional schemas in dbt and BigQuery. Implement automated incremental semantic models and executive C-suite KPI metrics dashboards.",
    keyMetric: "Sub-Second BI Queries",
    focusPill: "Dimensional Modeling & dbt",
  },
  aiml_engineer: {
    advice:
      "Anchor on statistical learning, PyTorch transformer architectures, model quantization (GGUF/vLLM), and scalable MLOps inference pipelines with low-latency GPU serving.",
    keyMetric: "Production Model Inference",
    focusPill: "Transformers & MLOps Serving",
  },
  devops_engineer: {
    advice:
      "Enforce Infrastructure as Code (Terraform), Kubernetes cluster orchestration with Helm, GitOps CI/CD pipelines, and 24/7 observability with Prometheus/Grafana.",
    keyMetric: "Zero-Downtime Releases",
    focusPill: "Kubernetes & GitOps CI/CD",
  },
  cybersecurity: {
    advice:
      "Master OWASP Top 10 vulnerabilities, Wireshark network packet inspection, Linux kernel privilege escalation, and zero-trust SIEM log analysis for defensive and offensive security.",
    keyMetric: "Zero-Trust Threat Defense",
    focusPill: "PenTesting & SIEM Analysis",
  },
  mobile_developer: {
    advice:
      "Build silky 60fps Flutter/React Native/Swift apps with offline-first SQLite/Realm sync, biometric authentication, and strict App Store / Play Store deployment hygiene.",
    keyMetric: "60fps Silky App Experience",
    focusPill: "Offline-First & Native Performance",
  },
  ui_ux_designer: {
    advice:
      "Build scalable multi-brand Figma design token systems, conduct qualitative user empathy interviews, and ship production-ready interactive micro-animation prototypes.",
    keyMetric: "Design System Tokens",
    focusPill: "Design Systems & User Empathy",
  },
};

// Distinct color identities for Langflow node categories
const NODE_CATEGORIES = [
  {
    type: "INPUT / PREREQUISITE",
    headerColor: "#6366f1",
    tagBg: "rgba(99, 102, 241, 0.12)",
    tagText: "#6366f1",
    borderGlow: "rgba(99, 102, 241, 0.45)",
    socketColor: "#6366f1",
    icon: Cpu,
  },
  {
    type: "ALGORITHM & CORE LOGIC",
    headerColor: "#0284c7",
    tagBg: "rgba(2, 132, 199, 0.12)",
    tagText: "#0284c7",
    borderGlow: "rgba(2, 132, 199, 0.45)",
    socketColor: "#0284c7",
    icon: Workflow,
  },
  {
    type: "SYSTEMS & PERSISTENCE",
    headerColor: "#059669",
    tagBg: "rgba(5, 150, 105, 0.12)",
    tagText: "#059669",
    borderGlow: "rgba(5, 150, 105, 0.45)",
    socketColor: "#059669",
    icon: Database,
  },
  {
    type: "DEPLOYMENT & EVALUATION",
    headerColor: "#d97706",
    tagBg: "rgba(217, 119, 6, 0.12)",
    tagText: "#d97706",
    borderGlow: "rgba(217, 119, 6, 0.45)",
    socketColor: "#d97706",
    icon: ShieldCheck,
  },
  {
    type: "COMPETENCY OUTPUT",
    headerColor: "#9333ea",
    tagBg: "rgba(147, 51, 234, 0.12)",
    tagText: "#9333ea",
    borderGlow: "rgba(147, 51, 234, 0.45)",
    socketColor: "#9333ea",
    icon: Bot,
  },
];

export function LangflowCareerGuide({
  roleData,
  guidanceData,
  allRoles = [],
  onSelectRole,
  onBackToCatalog,
  onSavePlan,
  onStartInterview,
}) {
  // activeNodeIndex:
  // 0 = Root Origin Node for current track
  // 1..steps.length = Phase steps (steps[activeNodeIndex - 1])
  // steps.length + 1 = Target Placement / Outcome Node
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [completedTopics, setCompletedTopics] = useState({});
  const [showPlayground, setShowPlayground] = useState(false);
  const [playgroundTab, setPlaygroundTab] = useState("curriculum"); // curriculum | mentor | capstone | python
  const [zoomLevel, setZoomLevel] = useState(1);
  const [canvasTheme, setCanvasTheme] = useState("dark"); // "dark" (authentic Langflow Studio) | "light"
  const [isRunningFlow, setIsRunningFlow] = useState(false);
  const [executingNodeIndex, setExecutingNodeIndex] = useState(-1);
  const [flowExecutedSuccess, setFlowExecutedSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showComponentPalette, setShowComponentPalette] = useState(false);

  const canvasRef = useRef(null);

  if (!roleData) return null;

  const steps = guidanceData?.roadmap_steps || roleData.roadmap_steps || [];
  const totalDAGNodes = steps.length + 2; // Root Node (0) + N Phases + Final Outcome Node (N+1)

  const isRootNode = activeNodeIndex === 0;
  const isOutcomeNode = activeNodeIndex === steps.length + 1;
  const activePhaseIdx = Math.max(0, Math.min(steps.length - 1, activeNodeIndex - 1));
  const activeStep = steps[activePhaseIdx] || steps[0];
  const activeCategory = NODE_CATEGORIES[activePhaseIdx % NODE_CATEGORIES.length];

  const RoleIcon = roleData.icon || Code2;
  const roleShortName = roleData.shortTitle || roleData.title;

  // Custom AI Architecture advice specific to this job
  const currentRoleAdvice = ROLE_ARCHITECTURE_ADVICE[roleData.id] || {
    advice: `Target Track: ${roleData.title}. Complete Phase 01 & 02 deliverables before submitting senior applications. Ensure every checkpoint is committed to GitHub with automated CI tests.`,
    keyMetric: "Milestone Verified",
    focusPill: `${roleShortName} Fundamentals`,
  };

  // Calculate live completion progress based on checked topics
  const totalTopics = steps.reduce((acc, s) => acc + (s.focus?.length || 0), 0);
  const checkedTopicsCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics > 0 ? Math.round((checkedTopicsCount / totalTopics) * 100) : 0;

  const toggleTopic = (stepIdx, topicIdx) => {
    const key = `${stepIdx}-${topicIdx}`;
    setCompletedTopics((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Scroll canvas horizontally
  const handleScrollCanvas = (direction) => {
    if (canvasRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      canvasRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Run Flow Simulation: Starts at Root Node -> Phase 1..N -> Final Outcome Node
  const handleRunFlow = () => {
    if (isRunningFlow) return;
    setIsRunningFlow(true);
    setFlowExecutedSuccess(false);
    setExecutingNodeIndex(0);

    // Scroll to start
    if (canvasRef.current) {
      canvasRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < totalDAGNodes) {
        setExecutingNodeIndex(current);
        if (canvasRef.current) {
          canvasRef.current.scrollTo({
            left: current * 370,
            behavior: "smooth",
          });
        }
      } else {
        clearInterval(interval);
        setExecutingNodeIndex(-1);
        setIsRunningFlow(false);
        setFlowExecutedSuccess(true);
        setTimeout(() => setFlowExecutedSuccess(false), 5000);
      }
    }, 850);
  };

  // Execute single node simulation
  const handleRunSingleNode = (idx, e) => {
    e.stopPropagation();
    if (executingNodeIndex !== -1) return;
    setExecutingNodeIndex(idx);
    setTimeout(() => {
      setExecutingNodeIndex(-1);
      const newCompleted = { ...completedTopics };
      (steps[idx].focus || []).forEach((_, ti) => {
        newCompleted[`${idx}-${ti}`] = true;
      });
      setCompletedTopics(newCompleted);
    }, 650);
  };

  // Copy Python DAG Code
  const copyPythonCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Generate Langflow-style Python code snippet
  const pythonDagSnippet = `# =========================================================
# Langflow Graph Definition: ${roleData.title}
# Origin Node: ${roleShortName}
# Generated by MentorPilot AI Architecture Engine
# =========================================================

from langflow.custom import Component
from langflow.io import Output, Input, MessageTextInput
from langflow.schema import Data

class ${activeStep.step.replace(/[^a-zA-Z0-9]/g, "")}Node(Component):
    display_name = "${activeStep.step}"
    description = "Timeline: ${activeStep.duration}"
    icon = "${activeCategory.type.split('/')[0].trim().toLowerCase()}"

    inputs = [
        Input(name="prerequisite", display_name="Prerequisite Flow", info="Incoming competency checkpoint"),
        MessageTextInput(name="timeline", display_name="Timeline", value="${activeStep.duration}"),
    ]
    outputs = [
        Output(display_name="Deliverable Artifact", name="deliverable", method="validate_competency"),
    ]

    def validate_competency(self) -> Data:
        checkpoints = [
${(activeStep.focus || []).map((f) => `            "${f}",`).join("\n")}
        ]
        deliverable_proof = "${activeStep.deliverable || "Production Deployment Verification"}"
        return Data(value={"status": "validated", "checkpoints": checkpoints, "proof": deliverable_proof})
`;

  return (
    <div className={`langflow-studio-wrapper theme-${canvasTheme}`}>
      {/* 1. LANGFLOW TOP STUDIO TOOLBAR */}
      <div className="langflow-studio-toolbar">
        <div className="toolbar-left">
          <button
            type="button"
            className="langflow-studio-btn secondary"
            onClick={onBackToCatalog}
            title="Return to Career Catalog"
          >
            <ChevronLeft size={15} />
            <span>All Roles</span>
          </button>

          <div className="toolbar-divider" />

          {/* Langflow File Badge */}
          <div className="langflow-file-badge">
            <div className="langflow-logo-icon">
              <Workflow size={17} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="file-name">{roleData.id}_architecture.flow</span>
                <span className="version-pill">v2.5 DAG</span>
              </div>
              <span className="file-sub">{roleData.title} • {roleData.timeToReady}</span>
            </div>
          </div>

          <div className="graph-status-badge">
            <span className={`status-dot ${isRunningFlow ? "running" : "ready"}`} />
            <span>{isRunningFlow ? "Executing Pipeline..." : "DAG Validated (0 Bottlenecks)"}</span>
          </div>
        </div>

        <div className="toolbar-right">
          {/* Theme Switcher (Dark Studio vs Light Canvas) */}
          <button
            type="button"
            className="langflow-theme-toggle"
            onClick={() => setCanvasTheme((t) => (t === "dark" ? "light" : "dark"))}
            title={`Switch to ${canvasTheme === "dark" ? "Light Canvas" : "Langflow Dark Studio"}`}
          >
            {canvasTheme === "dark" ? (
              <>
                <Sun size={14} className="text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon size={14} className="text-indigo-400" />
                <span>Dark Studio</span>
              </>
            )}
          </button>

          {/* Component Palette Toggle */}
          <button
            type="button"
            className={`langflow-studio-btn components-btn ${showComponentPalette ? "active" : ""}`}
            onClick={() => setShowComponentPalette(!showComponentPalette)}
            title="Toggle Component Library"
          >
            <Layers size={14} />
            <span>Palette</span>
          </button>

          {/* Zoom & View Controls */}
          <div className="canvas-zoom-controls">
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setZoomLevel((z) => Math.max(0.7, Number((z - 0.1).toFixed(2))))}
              title="Zoom Out"
            >
              <ZoomOut size={13} />
            </button>
            <span className="zoom-label">{Math.round(zoomLevel * 100)}%</span>
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setZoomLevel((z) => Math.min(1.25, Number((z + 0.1).toFixed(2))))}
              title="Zoom In"
            >
              <ZoomIn size={13} />
            </button>
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setZoomLevel(1)}
              title="Reset Zoom (100%)"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {/* Run Pipeline Action */}
          <button
            type="button"
            className={`langflow-run-btn ${isRunningFlow ? "running" : ""}`}
            onClick={handleRunFlow}
            disabled={isRunningFlow}
          >
            <Play size={14} fill={isRunningFlow ? "transparent" : "currentColor"} />
            <span>{isRunningFlow ? "Simulating..." : "Run Pipeline"}</span>
          </button>

          {/* Playground Drawer Button */}
          <button
            type="button"
            className="langflow-studio-btn playground"
            onClick={() => {
              setPlaygroundTab("curriculum");
              setShowPlayground(true);
            }}
          >
            <Sliders size={14} />
            <span>Playground</span>
            {checkedTopicsCount > 0 && (
              <span className="playground-count-badge">{checkedTopicsCount}</span>
            )}
          </button>

          <button
            type="button"
            className="langflow-studio-btn save"
            onClick={onSavePlan}
          >
            <Bookmark size={14} />
            <span>Save Flow</span>
          </button>
        </div>
      </div>

      {/* SUCCESS TOAST IF FLOW RAN */}
      <AnimatePresence>
        {flowExecutedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flow-success-banner"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>
              🎉 Pipeline Execution Succeeded: {roleData.title} verified from Origin Node through all {steps.length} Phases to Production Clearance!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK ROLE SWITCHER TABS */}
      <div className="langflow-track-switcher-row">
        <span className="track-label">Switch Track:</span>
        <div className="track-pills-list">
          {allRoles.map((r) => {
            const isSelected = r.id === roleData.id;
            return (
              <button
                key={r.id}
                type="button"
                className={`track-pill-btn ${isSelected ? "active" : ""}`}
                onClick={() => onSelectRole(r.id)}
              >
                <span>{r.shortTitle || r.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN STUDIO WORKSPACE (CANVAS + COMPONENT PALETTE) */}
      <div className="langflow-workspace-layout">
        {/* LEFT COMPONENT PALETTE (LANGFLOW STYLE SIDEBAR) */}
        <AnimatePresence>
          {showComponentPalette && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 230, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="langflow-components-sidebar"
            >
              <div className="palette-header">
                <span className="palette-title">Available Modules</span>
                <button
                  type="button"
                  className="palette-close-btn"
                  onClick={() => setShowComponentPalette(false)}
                >
                  <X size={14} />
                </button>
              </div>

              <div className="palette-category-group">
                <span className="palette-cat-label">Pipeline Nodes</span>
                {/* Root Node Item */}
                <div
                  className="palette-node-item"
                  onClick={() => {
                    setActiveNodeIndex(0);
                    setShowPlayground(true);
                  }}
                >
                  <span className="palette-node-dot" style={{ background: "#8b5cf6" }} />
                  <Target size={13} className="text-purple-400" />
                  <span className="palette-node-name">{roleShortName} Origin</span>
                </div>

                {NODE_CATEGORIES.map((cat, ci) => {
                  const CatIcon = cat.icon;
                  return (
                    <div
                      key={ci}
                      className="palette-node-item"
                      onClick={() => {
                        setActiveNodeIndex(ci + 1);
                        setShowPlayground(true);
                      }}
                    >
                      <span className="palette-node-dot" style={{ background: cat.headerColor }} />
                      <CatIcon size={13} style={{ color: cat.headerColor }} />
                      <span className="palette-node-name">{cat.type.split("/")[0].trim()}</span>
                    </div>
                  );
                })}

                {/* Outcome Node Item */}
                <div
                  className="palette-node-item"
                  onClick={() => {
                    setActiveNodeIndex(steps.length + 1);
                    setShowPlayground(true);
                  }}
                >
                  <span className="palette-node-dot" style={{ background: "#10b981" }} />
                  <Trophy size={13} className="text-emerald-400" />
                  <span className="palette-node-name">Offer Clearance</span>
                </div>
              </div>

              <div className="palette-category-group">
                <span className="palette-cat-label">Mentor Intelligence</span>
                <div
                  className="palette-node-item"
                  onClick={() => onStartInterview(roleData.id)}
                >
                  <Video size={13} className="text-cyan-400" />
                  <span className="palette-node-name">Mock Interview AI</span>
                </div>
                <div
                  className="palette-node-item"
                  onClick={() => {
                    setActiveNodeIndex(0);
                    setPlaygroundTab("capstone");
                    setShowPlayground(true);
                  }}
                >
                  <Layers size={13} className="text-amber-400" />
                  <span className="palette-node-name">Capstone Blueprints</span>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* 2. INFINITE WORKSPACE CANVAS (DOT GRID + STICKY NOTE + NODES + BEZIER WIRES) */}
        <div className="langflow-canvas-container" ref={canvasRef}>
          {/* Canvas Navigation Scroll Arrows */}
          <div className="canvas-pan-arrows">
            <button
              type="button"
              className="pan-arrow-btn left"
              onClick={() => handleScrollCanvas("left")}
              title="Pan Left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="pan-arrow-btn right"
              onClick={() => handleScrollCanvas("right")}
              title="Pan Right"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div
            className="langflow-canvas-inner"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
          >
            {/* Sticky Architecture Note on Canvas (Dynamic per Job) */}
            <div className="canvas-sticky-note">
              <div className="note-tape" />
              <div className="note-header">
                <Sparkles size={13} className="text-amber-600" />
                <strong>AI ARCHITECTURE ADVICE: {roleShortName.toUpperCase()}</strong>
              </div>
              <p>
                {currentRoleAdvice.advice}
              </p>
              <div className="note-meta">
                <span>Target: {roleData.salaryIn}</span>
                <span>•</span>
                <span>{roleData.timeToReady}</span>
                <span>•</span>
                <span className="font-extrabold text-amber-900 dark:text-amber-200">{currentRoleAdvice.keyMetric}</span>
              </div>
            </div>

            {/* GRAPH OF CONNECTED NODES (ROOT NODE -> PHASES 1..N -> DESTINATION NODE) */}
            <div className="langflow-graph-layout">
              {/* ========================================================
                  1. ROOT ROLE INITIATOR NODE (Dynamic per Career Track)
                  ======================================================== */}
              <div className="langflow-node-wrapper root-node-wrapper">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className={`langflow-studio-node root-role-node ${activeNodeIndex === 0 ? "selected" : ""} ${executingNodeIndex === 0 ? "executing" : ""}`}
                  onClick={() => {
                    setActiveNodeIndex(0);
                    setShowPlayground(true);
                  }}
                >
                  {/* Category Accent Bar */}
                  <div
                    className="node-category-bar"
                    style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)" }}
                  />

                  {/* Left Socket Anchor */}
                  <div
                    className="langflow-socket input-socket"
                    title="User Goal Anchor"
                    style={{ borderColor: "#8b5cf6" }}
                  >
                    <span className="socket-dot" style={{ background: "#8b5cf6" }} />
                    <span className="socket-tooltip">In: UserCareerGoal</span>
                  </div>

                  {/* Node Header */}
                  <div className="node-head">
                    <div className="node-head-left">
                      <div className="flex items-center gap-1.5 mb-1">
                        <RoleIcon size={14} className="text-indigo-400" />
                        <span
                          className="node-category-tag"
                          style={{
                            background: "rgba(139, 92, 246, 0.15)",
                            color: "#a855f7",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                          }}
                        >
                          ROOT INITIATOR // {roleShortName.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="node-title font-black">{roleData.title} Root Node</h4>
                    </div>

                    <div className="node-head-actions">
                      <span
                        className={`node-status-badge ${executingNodeIndex === 0 ? "pulse" : "done"}`}
                      >
                        {executingNodeIndex === 0 ? "Initiating..." : "Active Root"}
                      </span>
                    </div>
                  </div>

                  {/* Root Node Body */}
                  <div className="node-body">
                    {/* Salary & Timeline Stats */}
                    <div className="node-param-row">
                      <span className="param-label">Target Compensation</span>
                      <span className="param-value-pill font-extrabold text-emerald-500">
                        {roleData.salaryIn}
                      </span>
                    </div>

                    <div className="node-param-row">
                      <span className="param-label">Prep Timeline</span>
                      <span className="param-value-pill">
                        <Clock size={11} /> {roleData.timeToReady}
                      </span>
                    </div>

                    {/* Hiring Companies Bar */}
                    {roleData.popularCompanies && (
                      <div className="node-param-section">
                        <div className="param-section-title">
                          <span>Target Hiring Companies</span>
                          <span className="counter-pill">{roleData.popularCompanies.length} Tier-1</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {roleData.popularCompanies.map((comp, ci) => (
                            <span key={ci} className="company-badge-pill">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Core Skills Capsule */}
                    <div className="node-deliverable-capsule root-capsule">
                      <div className="capsule-title">
                        <Zap size={11} className="text-purple-400" />
                        <span>Core Tech Architecture Stack</span>
                      </div>
                      <p>{roleData.skills?.slice(0, 4).join(" • ")}</p>
                    </div>
                  </div>

                  {/* Node Footer */}
                  <div className="node-footer">
                    <span className="node-id-label">NODE_00 // {roleShortName.split(" ")[0].toUpperCase()}</span>
                    <button
                      type="button"
                      className="node-open-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveNodeIndex(0);
                        setShowPlayground(true);
                      }}
                    >
                      <span>Track Specs</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  {/* Right Output Socket (Branches out into Phase 01) */}
                  <div
                    className="langflow-socket output-socket"
                    title="Output Pipeline Stream Handle"
                    style={{ borderColor: "#8b5cf6" }}
                  >
                    <span className="socket-dot" style={{ background: "#8b5cf6" }} />
                    <span className="socket-tooltip">Out: {roleData.id}_stream</span>
                  </div>
                </motion.div>

                {/* WIRE CONNECTING ROOT ROLE NODE -> PHASE 01 */}
                <div className="langflow-wire-connector">
                  <svg className="wire-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad-root" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor={NODE_CATEGORIES[0].headerColor} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 20 C 45 20, 55 20, 100 20"
                      stroke="url(#grad-root)"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                      className="wire-path-base"
                    />
                    <path
                      d="M 0 20 C 45 20, 55 20, 100 20"
                      stroke={canvasTheme === "dark" ? "#38bdf8" : "#6366f1"}
                      strokeWidth="3"
                      strokeDasharray="8 8"
                      fill="none"
                      strokeLinecap="round"
                      className="wire-path-animated"
                    />
                  </svg>
                  <div className="wire-badge" title="Data Stream Connection">
                    <ArrowRight size={11} className="wire-flow-icon" />
                  </div>
                </div>
              </div>

              {/* ========================================================
                  2. MILESTONE PHASE NODES (NODE_01, NODE_02, ...)
                  ======================================================== */}
              {steps.map((step, idx) => {
                const cat = NODE_CATEGORIES[idx % NODE_CATEGORIES.length];
                const CatIcon = cat.icon;
                const nodeIdx = idx + 1; // 1-indexed for phases
                const isSelected = activeNodeIndex === nodeIdx;
                const isCurrentlyExecuting = executingNodeIndex === nodeIdx;
                const topicsTotal = step.focus?.length || 1;
                const topicsDone =
                  step.focus?.filter((_, ti) => completedTopics[`${idx}-${ti}`]).length || 0;
                const isDone = topicsDone === topicsTotal;

                return (
                  <div key={idx} className="langflow-node-wrapper">
                    {/* THE LANGFLOW NODE CARD */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: idx * 0.08 }}
                      whileHover={{ y: -4 }}
                      className={`langflow-studio-node ${isSelected ? "selected" : ""} ${isCurrentlyExecuting ? "executing" : ""} ${isDone ? "completed" : ""}`}
                      onClick={() => {
                        setActiveNodeIndex(nodeIdx);
                        setShowPlayground(true);
                      }}
                    >
                      {/* Top Category Accent Line */}
                      <div
                        className="node-category-bar"
                        style={{ background: cat.headerColor }}
                      />

                      {/* Left Input Handle Socket */}
                      <div
                        className="langflow-socket input-socket"
                        title="Input Prerequisite Handle"
                        style={{ borderColor: cat.socketColor }}
                      >
                        <span className="socket-dot" style={{ background: cat.socketColor }} />
                        <span className="socket-tooltip">
                          In: Prerequisite_{idx === 0 ? "Root" : `Phase0${idx}`}
                        </span>
                      </div>

                      {/* Node Header */}
                      <div className="node-head">
                        <div className="node-head-left">
                          <div className="flex items-center gap-1.5 mb-1">
                            <CatIcon size={12} style={{ color: cat.headerColor }} />
                            <span
                              className="node-category-tag"
                              style={{ background: cat.tagBg, color: cat.tagText }}
                            >
                              {cat.type}
                            </span>
                          </div>
                          <h4 className="node-title">{step.step}</h4>
                        </div>

                        {/* Node Quick Action Icons */}
                        <div className="node-head-actions">
                          <button
                            type="button"
                            className="node-quick-btn play"
                            title="Simulate this Node"
                            onClick={(e) => handleRunSingleNode(idx, e)}
                          >
                            <Play size={11} fill="currentColor" />
                          </button>
                          <button
                            type="button"
                            className="node-quick-btn code"
                            title="View Python Langflow Code"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveNodeIndex(nodeIdx);
                              setPlaygroundTab("python");
                              setShowPlayground(true);
                            }}
                          >
                            <Code2 size={11} />
                          </button>
                          <span
                            className={`node-status-badge ${isCurrentlyExecuting ? "pulse" : isDone ? "done" : "idle"}`}
                          >
                            {isCurrentlyExecuting
                              ? "Executing"
                              : isDone
                              ? "Validated"
                              : "Configured"}
                          </span>
                        </div>
                      </div>

                      {/* Node Content / Parameter Inputs */}
                      <div className="node-body">
                        {/* Param: Duration */}
                        <div className="node-param-row">
                          <span className="param-label">Execution Timeline</span>
                          <span className="param-value-pill">
                            <Clock size={11} /> {step.duration}
                          </span>
                        </div>

                        {/* Param: Key Checkpoints (Interactive) */}
                        <div className="node-param-section">
                          <div className="param-section-title">
                            <span>Competency Checkpoints</span>
                            <span className="counter-pill">
                              {topicsDone}/{topicsTotal}
                            </span>
                          </div>
                          <div className="node-checklist">
                            {step.focus?.map((f, fi) => {
                              const isChecked = !!completedTopics[`${idx}-${fi}`];
                              return (
                                <div
                                  key={fi}
                                  className={`node-check-item ${isChecked ? "checked" : ""}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleTopic(idx, fi);
                                  }}
                                >
                                  <span className={`check-box ${isChecked ? "active" : ""}`}>
                                    {isChecked && <Check size={11} />}
                                  </span>
                                  <span className="check-text">{f}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Capstone Deliverable Capsule */}
                        {step.deliverable && (
                          <div className="node-deliverable-capsule">
                            <div className="capsule-title">
                              <Sparkles size={11} className="text-amber-500" />
                              <span>CAPSTONE BLUEPRINT</span>
                            </div>
                            <p>{step.deliverable}</p>
                          </div>
                        )}
                      </div>

                      {/* Node Footer Actions */}
                      <div className="node-footer">
                        <span className="node-id-label">NODE_0{idx + 1}</span>
                        <button
                          type="button"
                          className="node-open-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNodeIndex(nodeIdx);
                            setShowPlayground(true);
                          }}
                        >
                          <span>Inspect Node</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>

                      {/* Right Output Handle Socket */}
                      <div
                        className="langflow-socket output-socket"
                        title="Output Deliverable Handle"
                        style={{ borderColor: cat.socketColor }}
                      >
                        <span className="socket-dot" style={{ background: cat.socketColor }} />
                        <span className="socket-tooltip">Out: Competency_{idx + 1}</span>
                      </div>
                    </motion.div>

                    {/* WIRE CONNECTOR TO NEXT NODE */}
                    <div className="langflow-wire-connector">
                      <svg className="wire-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <defs>
                          <linearGradient
                            id={`grad-${idx}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor={cat.headerColor} />
                            <stop
                              offset="100%"
                              stopColor={
                                idx === steps.length - 1
                                  ? "#10b981"
                                  : NODE_CATEGORIES[(idx + 1) % NODE_CATEGORIES.length].headerColor
                              }
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 20 C 45 20, 55 20, 100 20"
                          stroke={`url(#grad-${idx})`}
                          strokeWidth="3.5"
                          fill="none"
                          strokeLinecap="round"
                          className="wire-path-base"
                        />
                        <path
                          d="M 0 20 C 45 20, 55 20, 100 20"
                          stroke={canvasTheme === "dark" ? "#38bdf8" : "#6366f1"}
                          strokeWidth="3"
                          strokeDasharray="8 8"
                          fill="none"
                          strokeLinecap="round"
                          className="wire-path-animated"
                        />
                      </svg>
                      <div className="wire-badge" title="Data Flow Connection">
                        <ArrowRight size={11} className="wire-flow-icon" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ========================================================
                  3. TARGET DESTINATION / OFFER CLEARANCE NODE
                  ======================================================== */}
              <div className="langflow-node-wrapper outcome-node-wrapper">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className={`langflow-studio-node outcome-role-node ${activeNodeIndex === steps.length + 1 ? "selected" : ""} ${executingNodeIndex === steps.length + 1 ? "executing" : ""}`}
                  onClick={() => {
                    setActiveNodeIndex(steps.length + 1);
                    setShowPlayground(true);
                  }}
                >
                  {/* Category Accent Bar */}
                  <div
                    className="node-category-bar"
                    style={{ background: "linear-gradient(90deg, #10b981, #059669, #06b6d4)" }}
                  />

                  {/* Left Socket Anchor */}
                  <div
                    className="langflow-socket input-socket"
                    title="Certified Stream Input"
                    style={{ borderColor: "#10b981" }}
                  >
                    <span className="socket-dot" style={{ background: "#10b981" }} />
                    <span className="socket-tooltip">In: CertifiedCompetencyStream</span>
                  </div>

                  {/* Node Header */}
                  <div className="node-head">
                    <div className="node-head-left">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Trophy size={14} className="text-emerald-400" />
                        <span
                          className="node-category-tag"
                          style={{
                            background: "rgba(16, 185, 129, 0.15)",
                            color: "#10b981",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                          }}
                        >
                          OUTCOME // {roleShortName.toUpperCase()} CLEARANCE
                        </span>
                      </div>
                      <h4 className="node-title font-black">{roleShortName} Production Clearance</h4>
                    </div>

                    <div className="node-head-actions">
                      <span className="node-status-badge done">
                        Offer Ready
                      </span>
                    </div>
                  </div>

                  {/* Outcome Body */}
                  <div className="node-body">
                    <div className="node-param-row">
                      <span className="param-label">Verified Readiness</span>
                      <span className="param-value-pill font-extrabold text-emerald-500">
                        Top 5% Ready
                      </span>
                    </div>

                    <div className="node-param-section">
                      <div className="param-section-title">
                        <span>Milestone Clearance Checklist</span>
                        <span className="counter-pill">{checkedTopicsCount}/{totalTopics}</span>
                      </div>
                      <div className="node-checklist">
                        <div className="node-check-item checked">
                          <span className="check-box active">
                            <Check size={11} />
                          </span>
                          <span className="check-text">Verified GitHub Capstone Repositories</span>
                        </div>
                        <div className="node-check-item checked">
                          <span className="check-box active">
                            <Check size={11} />
                          </span>
                          <span className="check-text">Domain Competency & Practical Benchmark</span>
                        </div>
                      </div>
                    </div>

                    <div className="node-deliverable-capsule outcome-capsule">
                      <div className="capsule-title">
                        <Award size={11} className="text-emerald-400" />
                        <span>{roleShortName} Top Tier Clearance</span>
                      </div>
                      <p>Production readiness benchmark verified with automated test suites.</p>
                    </div>
                  </div>

                  {/* Node Footer */}
                  <div className="node-footer">
                    <span className="node-id-label">NODE_FINAL // OFFER</span>
                    <button
                      type="button"
                      className="node-open-btn outcome-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartInterview(roleData.id);
                      }}
                    >
                      <Video size={12} />
                      <span>Mock Interview</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* FLOATING CANYON MINIMAP WIDGET (LANGFLOW AUTHENTIC FEATURE) */}
          <div className="canvas-minimap-hud">
            <div className="minimap-header">
              <Compass size={11} />
              <span>DAG TOPOLOGY ({totalDAGNodes} NODES)</span>
            </div>
            <div className="minimap-nodes-row">
              {/* Root Minimap Block (Dynamic per Role) */}
              <div
                className={`minimap-node-box root ${activeNodeIndex === 0 ? "selected" : ""} ${executingNodeIndex === 0 ? "exec" : ""}`}
                onClick={() => {
                  setActiveNodeIndex(0);
                  if (canvasRef.current) {
                    canvasRef.current.scrollTo({ left: 0, behavior: "smooth" });
                  }
                }}
                title={`Root ${roleShortName} Node`}
              >
                <span>{roleShortName.split(" ")[0].slice(0, 4).toUpperCase()}</span>
              </div>

              {/* Phase Blocks */}
              {steps.map((_, mi) => {
                const pIdx = mi + 1;
                const isSelected = activeNodeIndex === pIdx;
                const isCurExec = executingNodeIndex === pIdx;
                return (
                  <div
                    key={mi}
                    className={`minimap-node-box ${isSelected ? "selected" : ""} ${isCurExec ? "exec" : ""}`}
                    onClick={() => {
                      setActiveNodeIndex(pIdx);
                      if (canvasRef.current) {
                        canvasRef.current.scrollTo({
                          left: pIdx * 370,
                          behavior: "smooth",
                        });
                      }
                    }}
                    title={`Phase ${mi + 1}`}
                  >
                    <span>{mi + 1}</span>
                  </div>
                );
              })}

              {/* Outcome Minimap Block */}
              <div
                className={`minimap-node-box outcome ${activeNodeIndex === steps.length + 1 ? "selected" : ""} ${executingNodeIndex === steps.length + 1 ? "exec" : ""}`}
                onClick={() => {
                  setActiveNodeIndex(steps.length + 1);
                  if (canvasRef.current) {
                    canvasRef.current.scrollTo({
                      left: (steps.length + 1) * 370,
                      behavior: "smooth",
                    });
                  }
                }}
                title={`${roleShortName} Offer Ready Node`}
              >
                <Trophy size={9} />
              </div>
            </div>
            <div className="minimap-progress-track">
              <div
                className="minimap-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="minimap-pct-text">{progressPercent}% Competency Traversed</span>
          </div>
        </div>
      </div>

      {/* 3. PLACEMENT & CAPSTONE INTEL BAR */}
      <div className="langflow-intel-bar">
        <div className="intel-box private-box">
          <div className="intel-title">
            <Building2 size={16} className="text-indigo-400" />
            <strong>Private Tech (FAANG & Unicorns) Strategy</strong>
          </div>
          <p>
            {roleData.placement_guidance?.private_companies ||
              guidanceData?.placement_guidance?.private_companies}
          </p>
        </div>

        <div className="intel-box govt-box">
          <div className="intel-title">
            <GraduationCap size={16} className="text-emerald-400" />
            <strong>PSUs & Government Examinations Strategy</strong>
          </div>
          <p>
            {roleData.placement_guidance?.govt_exams ||
              guidanceData?.placement_guidance?.govt_exams}
          </p>
        </div>

        <div className="intel-box projects-box">
          <div className="intel-title">
            <Layers size={16} className="text-cyan-400" />
            <strong>Featured Capstone Project Blueprints</strong>
          </div>
          <ul className="project-bullet-list">
            {(roleData.recommended_projects || guidanceData?.recommended_projects || [])
              .slice(0, 2)
              .map((proj, pi) => (
                <li key={pi}>• {proj}</li>
              ))}
          </ul>
        </div>
      </div>

      {/* 4. SLIDE-OUT PLAYGROUND & INSPECTOR DRAWER */}
      <AnimatePresence>
        {showPlayground && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="playground-backdrop"
              onClick={() => setShowPlayground(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="langflow-playground-drawer"
            >
              {/* Drawer Top Header */}
              <div className="drawer-header">
                <div className="flex items-center gap-2">
                  <div
                    className="drawer-logo-icon"
                    style={{
                      background: isRootNode
                        ? "#8b5cf6"
                        : isOutcomeNode
                        ? "#10b981"
                        : activeCategory.headerColor,
                    }}
                  >
                    <Sliders size={15} className="text-white" />
                  </div>
                  <div>
                    <h3 className="drawer-title">
                      {isRootNode
                        ? `Root ${roleData.title} Specification`
                        : isOutcomeNode
                        ? `${roleShortName} Clearance Inspector`
                        : "Node Inspector & Playground"}
                    </h3>
                    <span className="drawer-sub">
                      {isRootNode
                        ? `NODE_00 // ${roleData.title} Spec`
                        : isOutcomeNode
                        ? `NODE_FINAL // Offer Clearance`
                        : `NODE_0${activePhaseIdx + 1} // ${activeStep.step}`}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setShowPlayground(false)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Tab Navigation */}
              <div className="drawer-tabs">
                <button
                  type="button"
                  className={`d-tab ${playgroundTab === "curriculum" ? "active" : ""}`}
                  onClick={() => setPlaygroundTab("curriculum")}
                >
                  <FileCode size={13} />
                  <span>Syllabus & Lab</span>
                </button>
                <button
                  type="button"
                  className={`d-tab ${playgroundTab === "mentor" ? "active" : ""}`}
                  onClick={() => setPlaygroundTab("mentor")}
                >
                  <Sparkles size={13} />
                  <span>Interview Prep</span>
                </button>
                <button
                  type="button"
                  className={`d-tab ${playgroundTab === "capstone" ? "active" : ""}`}
                  onClick={() => setPlaygroundTab("capstone")}
                >
                  <Layers size={13} />
                  <span>Capstones</span>
                </button>
                <button
                  type="button"
                  className={`d-tab ${playgroundTab === "python" ? "active" : ""}`}
                  onClick={() => setPlaygroundTab("python")}
                >
                  <Code2 size={13} />
                  <span>Python Flow</span>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="drawer-body">
                {playgroundTab === "curriculum" && (
                  <div className="drawer-pane">
                    {isRootNode ? (
                      <>
                        <div className="pane-card">
                          <span className="pane-badge">Origin Role Node</span>
                          <h4 className="pane-heading">{roleData.title}</h4>
                          <p className="pane-text">{roleData.overview}</p>
                        </div>
                        <div className="pane-card">
                          <span className="pane-badge" style={{ background: "rgba(139, 92, 246, 0.2)", color: "#c4b5fd" }}>
                            Architecture Focus Pillar
                          </span>
                          <h5 className="font-bold text-sm mb-1 text-white">{currentRoleAdvice.focusPill}</h5>
                          <p className="pane-text">{currentRoleAdvice.advice}</p>
                        </div>
                        <div className="pane-card">
                          <h5 className="font-bold text-sm mb-2 text-white">Target Hiring Companies:</h5>
                          <div className="flex flex-wrap gap-2">
                            {roleData.popularCompanies?.map((comp, idx) => (
                              <span key={idx} className="company-badge-pill">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : isOutcomeNode ? (
                      <>
                        <div className="pane-card">
                          <span className="pane-badge" style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34d399" }}>
                            Final Destination
                          </span>
                          <h4 className="pane-heading">{roleShortName} Offer Clearance</h4>
                          <p className="pane-text">
                            Upon completing all milestone phases, submit your portfolio code and complete the AI Mock Interview benchmark to unlock top referral channels.
                          </p>
                        </div>
                        <div className="pane-card">
                          <h5 className="font-bold text-sm mb-1 text-white">Clearance Benchmark Target</h5>
                          <p className="pane-text font-semibold text-emerald-400">{currentRoleAdvice.keyMetric}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="pane-card">
                          <span className="pane-badge">Active Milestone</span>
                          <h4 className="pane-heading">{activeStep.step}</h4>
                          <p className="pane-text">
                            Target completion:{" "}
                            <strong className="text-white">{activeStep.duration}</strong>. Master each
                            competency checkmark below before advancing.
                          </p>
                        </div>

                        <div className="pane-card">
                          <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-emerald-400" />
                            Interactive Competency Checklist:
                          </h5>
                          <div className="flex flex-col gap-2">
                            {activeStep.focus?.map((f, fi) => {
                              const isChecked = !!completedTopics[`${activePhaseIdx}-${fi}`];
                              return (
                                <div
                                  key={fi}
                                  className={`drawer-checklist-item ${isChecked ? "active" : ""}`}
                                  onClick={() => toggleTopic(activePhaseIdx, fi)}
                                >
                                  <span className={`drawer-check ${isChecked ? "active" : ""}`}>
                                    {isChecked && <Check size={12} />}
                                  </span>
                                  <span className="text-xs font-semibold leading-relaxed">{f}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {activeStep.deliverable && (
                          <div className="pane-card deliverable">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
                              <Sparkles size={13} /> Deliverable Proof-of-Work:
                            </div>
                            <p className="text-xs font-medium leading-relaxed">
                              {activeStep.deliverable}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {playgroundTab === "mentor" && (
                  <div className="drawer-pane">
                    <div className="pane-card">
                      <h4 className="pane-heading">Phase Interview Preparation</h4>
                      <p className="pane-text">
                        Practice live mock interview questions targeted precisely at the competencies
                        in {isRootNode ? roleData.title : activeStep.step}.
                      </p>
                      <button
                        type="button"
                        className="primary-btn w-full mt-3"
                        onClick={() => {
                          setShowPlayground(false);
                          onStartInterview(roleData.id);
                        }}
                      >
                        <Video size={15} />
                        <span>Start Mock Interview for this Track</span>
                      </button>
                    </div>

                    <div className="pane-card">
                      <h5 className="font-bold text-sm mb-2">Private Tech Placement Target:</h5>
                      <p className="pane-text">{roleData.placement_guidance?.private_companies}</p>
                    </div>

                    <div className="pane-card">
                      <h5 className="font-bold text-sm mb-2">PSU & Govt Examination Target:</h5>
                      <p className="pane-text">{roleData.placement_guidance?.govt_exams}</p>
                    </div>
                  </div>
                )}

                {playgroundTab === "capstone" && (
                  <div className="drawer-pane">
                    <div className="pane-card">
                      <h4 className="pane-heading">Proof-of-Work Repositories</h4>
                      <p className="pane-text">
                        Add these verified capstone projects to your portfolio to demonstrate
                        production readiness:
                      </p>
                    </div>

                    {(roleData.recommended_projects || []).map((p, idx) => (
                      <div key={idx} className="pane-card">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-900/60 text-purple-300 border border-purple-500/30">
                            Project #{idx + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">
                            Production Grade
                          </span>
                        </div>
                        <h5 className="font-bold text-xs mb-1">{p}</h5>
                        <p className="text-[11px] text-slate-400">
                          Include automated tests, Dockerfile, and GitHub Actions CI workflow.
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {playgroundTab === "python" && (
                  <div className="drawer-pane">
                    <div className="pane-card">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Terminal size={14} className="text-cyan-400" />
                          <h4 className="pane-heading">Python Custom Component Code</h4>
                        </div>
                        <button
                          type="button"
                          className="copy-code-btn"
                          onClick={() => copyPythonCode(pythonDagSnippet)}
                        >
                          {copiedCode ? (
                            <>
                              <CheckCheck size={12} className="text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="pane-text mb-3">
                        Deploy this milestone node directly inside your Langflow or LangChain
                        application.
                      </p>
                      <pre className="langflow-code-block">
                        <code>{pythonDagSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Bottom Action */}
              <div className="drawer-footer">
                <button
                  type="button"
                  className="langflow-studio-btn primary w-full"
                  onClick={() => setShowPlayground(false)}
                >
                  Close & Return to Canvas
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

