import React, { useState } from "react";
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
  ExternalLink,
  Target,
  Check,
  Building2,
  GraduationCap,
  Layers,
  Award,
  Zap,
  Info
} from "lucide-react";

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
  const [showNodeModal, setShowNodeModal] = useState(false);

  if (!roleData) return null;

  const Icon = roleData.icon || GitFork;
  const steps = guidanceData?.roadmap_steps || roleData.roadmap_steps || [];
  const activeStep = steps[activeNodeIndex] || steps[0];

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

  return (
    <div className="langflow-guide-wrapper">
      {/* 1. TOP CONTROL BAR */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="langflow-control-bar"
      >
        <div className="langflow-bar-left">
          <button
            type="button"
            className="langflow-back-btn"
            onClick={onBackToCatalog}
            title="Return to All Career Roles"
          >
            <ChevronLeft size={16} />
            <span>All Career Roles</span>
          </button>

          <div className="langflow-role-badge-group">
            <div
              className="langflow-role-icon-square"
              style={{ background: roleData.gradient }}
            >
              <Icon size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="langflow-role-title">{roleData.title}</h2>
                <span className="langflow-demand-pill">{roleData.badge}</span>
              </div>
              <p className="langflow-role-category">{roleData.category} • {roleData.timeToReady || "6 Months"}</p>
            </div>
          </div>
        </div>

        <div className="langflow-bar-right">
          <div className="langflow-salary-tag">
            <span className="sal-lbl">Expected Salary</span>
            <strong>{roleData.salaryIn}</strong>
            <small>US: {roleData.salaryUs}</small>
          </div>

          <div className="langflow-actions">
            <button
              type="button"
              className="langflow-save-btn"
              onClick={onSavePlan}
              title="Save this roadmap to your profile"
            >
              <Bookmark size={15} />
              <span>Save Plan</span>
            </button>
            <button
              type="button"
              className="langflow-interview-btn"
              onClick={() => onStartInterview(roleData.id)}
            >
              <span>Mock Interview</span>
              <Video size={15} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* QUICK ROLE SWITCHER PILLS */}
      {allRoles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="langflow-role-tabs-strip"
        >
          <span className="langflow-strip-label">Switch Track:</span>
          <div className="langflow-tabs-scroll">
            {allRoles.map((r) => {
              const TabIcon = r.icon || GitFork;
              const isSelected = r.id === roleData.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  className={`langflow-role-tab ${isSelected ? "active" : ""}`}
                  onClick={() => onSelectRole(r.id)}
                >
                  <TabIcon size={14} />
                  <span>{r.shortTitle || r.title}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 2. LANGFLOW PIPELINE CANVAS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="langflow-canvas"
      >
        <div className="langflow-canvas-header">
          <div className="langflow-pipeline-chip">
            <GitFork size={14} className="text-purple-600 animate-pulse" />
            <span>LANGFLOW INTERACTIVE EXECUTION PIPELINE</span>
            <span className="langflow-live-dot" />
          </div>

          <div className="langflow-canvas-metrics">
            <div className="langflow-metric-pill">
              <span className="text-slate-400">Total Milestones:</span>
              <strong>{steps.length} Nodes</strong>
            </div>
            <div className="langflow-metric-pill">
              <span className="text-slate-400">Mastery Progress:</span>
              <strong className="text-purple-600">{progressPercent}%</strong>
            </div>
          </div>
        </div>

        <p className="langflow-canvas-hint">
          Sequential competency pipeline: Click any node to expand deep syllabus, check off mastered topics, and access project blueprints.
        </p>

        {/* 3. VISUAL NODES GRAPH */}
        <div className="langflow-pipeline-grid">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            const isInspected = activeNodeIndex === idx;
            const stepTopicsChecked = step.focus?.filter((_, tIdx) => completedTopics[`${idx}-${tIdx}`]).length || 0;
            const stepTotal = step.focus?.length || 1;
            const stepComplete = stepTopicsChecked === stepTotal;

            return (
              <React.Fragment key={idx}>
                {/* LANGFLOW NODE CARD */}
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.12 }}
                  whileHover={{ y: -3 }}
                  className={`langflow-node ${isInspected ? "inspected" : ""} ${stepComplete ? "completed" : ""}`}
                  onClick={() => {
                    setActiveNodeIndex(idx);
                  }}
                >
                  {/* Left Input Port */}
                  <div className="node-port input-port" title="Input Prerequisite" />

                  {/* Top Bar */}
                  <div className="langflow-node-header">
                    <div className="node-phase-badge">
                      <span className="phase-num">NODE 0{idx + 1}</span>
                      <span className="phase-label">PHASE {idx + 1}</span>
                    </div>
                    <span className="node-duration-pill">
                      <Clock size={12} /> {step.duration}
                    </span>
                  </div>

                  {/* Node Title */}
                  <h4 className="langflow-node-title">{step.step}</h4>

                  {/* Focus Checkpoints */}
                  <div className="langflow-node-topics">
                    {step.focus?.map((f, fi) => {
                      const isChecked = !!completedTopics[`${idx}-${fi}`];
                      return (
                        <div
                          key={fi}
                          className={`langflow-topic-item ${isChecked ? "checked" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTopic(idx, fi);
                          }}
                        >
                          <span className={`topic-checkbox ${isChecked ? "active" : ""}`}>
                            {isChecked && <Check size={11} />}
                          </span>
                          <span className="topic-text">{f}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Milestone Deliverable Box */}
                  {step.deliverable && (
                    <div className="langflow-node-deliverable">
                      <div className="deliverable-header">
                        <Sparkles size={13} className="text-amber-500" />
                        <span>CAPSTONE DELIVERABLE</span>
                      </div>
                      <p>{step.deliverable}</p>
                    </div>
                  )}

                  {/* Bottom Action Footer */}
                  <div className="langflow-node-footer">
                    <div className="node-status-indicator">
                      <span className={`node-status-dot ${stepComplete ? "done" : "ready"}`} />
                      <span>{stepComplete ? "Phase Mastered" : `${stepTopicsChecked}/${stepTotal} Topics Done`}</span>
                    </div>

                    <button
                      type="button"
                      className="node-inspect-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveNodeIndex(idx);
                        setShowNodeModal(true);
                      }}
                    >
                      <span>Deep Dive</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Right Output Port */}
                  <div className="node-port output-port" title="Output Competency" />
                </motion.div>

                {/* ANIMATED CONNECTOR BEAM BETWEEN NODES */}
                {!isLast && (
                  <div className="langflow-connector-wrapper">
                    <div className="langflow-connector-beam">
                      <div className="langflow-connector-pulse" />
                    </div>
                    <div className="langflow-connector-badge">
                      <GitFork size={11} />
                      <span>DATA FLOW</span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </motion.div>

      {/* 4. PLACEMENT STRATEGY & CAPSTONE PROJECTS SECTION */}
      <div className="langflow-details-grid">
        {/* Placement Intelligence */}
        <div className="panel langflow-intel-card">
          <div className="intel-card-head">
            <Building2 size={20} className="text-purple-600" />
            <div>
              <h3>Placement Strategy & Interview Intel</h3>
              <p>FAANG, Top Tier Product Startups & Public Sector Examinations</p>
            </div>
          </div>

          <div className="intel-sections">
            <div className="intel-block private">
              <div className="intel-badge">
                <Sparkles size={12} />
                <span>Private Tech (FAANG & Unicorns)</span>
              </div>
              <p>{roleData.placement_guidance?.private_companies || guidanceData?.placement_guidance?.private_companies}</p>
            </div>

            <div className="intel-block govt">
              <div className="intel-badge">
                <GraduationCap size={12} />
                <span>PSUs & Government Examinations</span>
              </div>
              <p>{roleData.placement_guidance?.govt_exams || guidanceData?.placement_guidance?.govt_exams}</p>
            </div>
          </div>
        </div>

        {/* Recommended Capstone Projects */}
        <div className="panel langflow-projects-card">
          <div className="intel-card-head">
            <Layers size={20} className="text-cyan-600" />
            <div>
              <h3>Proof-of-Work Capstone Projects</h3>
              <p>Industry-grade repositories to feature on your resume & GitHub</p>
            </div>
          </div>

          <div className="projects-list">
            {(roleData.recommended_projects || guidanceData?.recommended_projects || []).map((proj, pIdx) => (
              <div key={pIdx} className="project-item">
                <div className="project-number">0{pIdx + 1}</div>
                <div className="project-info">
                  <strong>{proj}</strong>
                  <div className="project-tags">
                    <span className="p-tag">Production Grade</span>
                    <span className="p-tag">GitHub Portfolio</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE NODE DEEP DIVE MODAL */}
      <AnimatePresence>
        {showNodeModal && activeStep && (
          <div className="modal-overlay" onClick={() => setShowNodeModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="panel node-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <span className="node-phase-badge mb-1 inline-block">NODE 0{activeNodeIndex + 1} ARCHITECTURE</span>
                  <h3>{activeStep.step}</h3>
                  <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-1">
                    <Clock size={13} /> {activeStep.duration} • Track: {roleData.title}
                  </p>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowNodeModal(false)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-purple-600" /> Core Competency Checkpoints:
                  </h4>
                  <div className="flex flex-col gap-2">
                    {activeStep.focus?.map((f, fi) => {
                      const isChecked = !!completedTopics[`${activeNodeIndex}-${fi}`];
                      return (
                        <div
                          key={fi}
                          className={`modal-topic-check ${isChecked ? "active" : ""}`}
                          onClick={() => toggleTopic(activeNodeIndex, fi)}
                        >
                          <span className={`topic-checkbox ${isChecked ? "active" : ""}`}>
                            {isChecked && <Check size={11} />}
                          </span>
                          <span>{f}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {activeStep.deliverable && (
                  <div className="modal-deliverable-box">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-1">
                      <Sparkles size={13} /> Target Deliverable for this Node:
                    </div>
                    <p className="text-slate-700 text-sm font-medium">{activeStep.deliverable}</p>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="primary-btn w-full"
                  onClick={() => setShowNodeModal(false)}
                >
                  Close & Continue Flow
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
