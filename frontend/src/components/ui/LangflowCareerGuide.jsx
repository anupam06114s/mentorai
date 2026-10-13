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
  Bot
} from "lucide-react";

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
  const activeStep = steps[activeNodeIndex] || steps[0];
  const activeCategory = NODE_CATEGORIES[activeNodeIndex % NODE_CATEGORIES.length];

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
      const scrollAmount = direction === "left" ? -350 : 350;
      canvasRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Run Flow Simulation (Simulates Langflow DAG execution)
  const handleRunFlow = () => {
    if (isRunningFlow) return;
    setIsRunningFlow(true);
    setFlowExecutedSuccess(false);
    setExecutingNodeIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setExecutingNodeIndex(current);
        // Scroll canvas to keep running node in view
        if (canvasRef.current) {
          canvasRef.current.scrollTo({
            left: current * 360,
            behavior: "smooth",
          });
        }
      } else {
        clearInterval(interval);
        setExecutingNodeIndex(-1);
        setIsRunningFlow(false);
        setFlowExecutedSuccess(true);
        setTimeout(() => setFlowExecutedSuccess(false), 4500);
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
      // Mark all topics in this step as completed
      const newCompleted = { ...completedTopics };
      (steps[idx].focus || []).forEach((_, ti) => {
        newCompleted[`${idx}-${ti}`] = true;
      });
      setCompletedTopics(newCompleted);
    }, 700);
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
            <span>{isRunningFlow ? "Executing Pipeline..." : "DAG Validated (0 Errors)"}</span>
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
              Pipeline Simulated Successfully: All {steps.length} Nodes & Dependencies traversed with 0 bottlenecks!
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
                {NODE_CATEGORIES.map((cat, ci) => {
                  const CatIcon = cat.icon;
                  return (
                    <div
                      key={ci}
                      className="palette-node-item"
                      onClick={() => {
                        setActiveNodeIndex(ci % steps.length);
                        setShowPlayground(true);
                      }}
                    >
                      <span className="palette-node-dot" style={{ background: cat.headerColor }} />
                      <CatIcon size={13} style={{ color: cat.headerColor }} />
                      <span className="palette-node-name">{cat.type.split("/")[0].trim()}</span>
                    </div>
                  );
                })}
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
            {/* Sticky Architecture Note on Canvas (Langflow Style) */}
            <div className="canvas-sticky-note">
              <div className="note-tape" />
              <div className="note-header">
                <Sparkles size={13} className="text-amber-600" />
                <strong>AI ARCHITECTURE ADVICE</strong>
              </div>
              <p>
                Target Track: <strong>{roleData.title}</strong>. Ensure each milestone deliverable is committed to GitHub before advancing.
              </p>
              <div className="note-meta">
                <span>Expected: {roleData.salaryIn}</span>
                <span>•</span>
                <span>{roleData.timeToReady}</span>
              </div>
            </div>

            {/* GRAPH OF CONNECTED NODES */}
            <div className="langflow-graph-layout">
              {steps.map((step, idx) => {
                const cat = NODE_CATEGORIES[idx % NODE_CATEGORIES.length];
                const CatIcon = cat.icon;
                const isLast = idx === steps.length - 1;
                const isSelected = activeNodeIndex === idx;
                const isCurrentlyExecuting = executingNodeIndex === idx;
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
                        setActiveNodeIndex(idx);
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
                          In: Prerequisite_{idx === 0 ? "Entry" : `Phase${idx}`}
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
                              setActiveNodeIndex(idx);
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
                            setActiveNodeIndex(idx);
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

                    {/* CONNECTING BEZIER CURVE CABLE */}
                    {!isLast && (
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
                                  NODE_CATEGORIES[(idx + 1) % NODE_CATEGORIES.length].headerColor
                                }
                              />
                            </linearGradient>
                          </defs>
                          {/* Background Glow Wire */}
                          <path
                            d="M 0 20 C 45 20, 55 20, 100 20"
                            stroke={`url(#grad-${idx})`}
                            strokeWidth="3.5"
                            fill="none"
                            strokeLinecap="round"
                            className="wire-path-base"
                          />
                          {/* Animated Flowing Wire */}
                          <path
                            d="M 0 20 C 45 20, 55 20, 100 20"
                            stroke={canvasTheme === "dark" ? "#38bdf8" : "#ffffff"}
                            strokeWidth="3"
                            strokeDasharray="8 8"
                            fill="none"
                            strokeLinecap="round"
                            className="wire-path-animated"
                          />
                        </svg>
                        <div className="wire-badge">
                          <GitFork size={10} />
                          <span>PIPE_0{idx + 1}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* FLOATING CANYON MINIMAP WIDGET (LANGFLOW AUTHENTIC FEATURE) */}
          <div className="canvas-minimap-hud">
            <div className="minimap-header">
              <Compass size={11} />
              <span>MINIMAP</span>
            </div>
            <div className="minimap-nodes-row">
              {steps.map((_, mi) => {
                const isSelected = activeNodeIndex === mi;
                const isCurExec = executingNodeIndex === mi;
                return (
                  <div
                    key={mi}
                    className={`minimap-node-box ${isSelected ? "selected" : ""} ${isCurExec ? "exec" : ""}`}
                    onClick={() => {
                      setActiveNodeIndex(mi);
                      if (canvasRef.current) {
                        canvasRef.current.scrollTo({
                          left: mi * 340,
                          behavior: "smooth",
                        });
                      }
                    }}
                    title={`Jump to Phase ${mi + 1}`}
                  >
                    <span>{mi + 1}</span>
                  </div>
                );
              })}
            </div>
            <div className="minimap-progress-track">
              <div
                className="minimap-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="minimap-pct-text">{progressPercent}% Traversed</span>
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

      {/* 4. SLIDE-OUT PLAYGROUND & INSPECTOR DRAWER (AUTHENTIC LANGFLOW PLAYGROUND) */}
      <AnimatePresence>
        {showPlayground && activeStep && (
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
                    style={{ background: activeCategory.headerColor }}
                  >
                    <Sliders size={15} className="text-white" />
                  </div>
                  <div>
                    <h3 className="drawer-title">Node Inspector & Playground</h3>
                    <span className="drawer-sub">
                      NODE_0{activeNodeIndex + 1} // {roleData.title}
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
                    <div className="pane-card">
                      <span className="pane-badge">Active Milestone</span>
                      <h4 className="pane-heading">{activeStep.step}</h4>
                      <p className="pane-text">
                        Target completion:{" "}
                        <strong className="text-white">{activeStep.duration}</strong>. Master each
                        competency checkmark below before connecting to the next node.
                      </p>
                    </div>

                    <div className="pane-card">
                      <h5 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        Interactive Competency Checklist:
                      </h5>
                      <div className="flex flex-col gap-2">
                        {activeStep.focus?.map((f, fi) => {
                          const isChecked = !!completedTopics[`${activeNodeIndex}-${fi}`];
                          return (
                            <div
                              key={fi}
                              className={`drawer-checklist-item ${isChecked ? "active" : ""}`}
                              onClick={() => toggleTopic(activeNodeIndex, fi)}
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
                  </div>
                )}

                {playgroundTab === "mentor" && (
                  <div className="drawer-pane">
                    <div className="pane-card">
                      <h4 className="pane-heading">Phase Interview Preparation</h4>
                      <p className="pane-text">
                        Practice live mock interview questions targeted precisely at the competencies
                        in {activeStep.step}.
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
                        <span>Start Mock Interview for this Phase</span>
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

