import React, { useState } from "react";
import {
  X,
  Download,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  FileText,
  Edit3,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { generateResumePdf } from "@/utils/resumePdfGenerator";

export default function ResumeUpdaterModal({
  isOpen,
  onClose,
  updatedResumeData,
  originalScore = 72,
  onReAnalyze
}) {
  if (!isOpen || !updatedResumeData) return null;

  const [activeTab, setActiveTab] = useState("preview"); // "preview" | "edit"
  const [editableText, setEditableText] = useState(updatedResumeData.full_text || "");
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Handle Copy Text
  const handleCopyText = () => {
    navigator.clipboard.writeText(editableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Handle PDF Download
  const handleDownloadPdf = () => {
    setIsDownloading(true);
    try {
      generateResumePdf(updatedResumeData);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Error generating PDF. Please copy the text directly.");
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const skillsAdded = updatedResumeData.skills_added || [];
  const projectedScore = updatedResumeData.projected_ats_score || 96;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                AI Resume Optimizer & Skill Gap Filler
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  ATS Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Target Role: <strong className="text-cyan-300">{updatedResumeData.role_title}</strong> • Missing skills injected naturally into Technical Skills & Projects
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Skill Gap Injected Banner */}
        <div className="px-6 py-3.5 bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-900 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              Skills Added to Close Gap:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {skillsAdded.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                >
                  +{skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-1.5 shadow-sm">
              <ShieldCheck size={14} />
              <span>Projected ATS: {projectedScore}/100</span>
              <span className="text-[10px] text-emerald-400 opacity-90">(+{projectedScore - originalScore} pts)</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="px-6 pt-3 pb-2 flex items-center justify-between border-b border-white/5 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "preview"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Eye size={14} /> Formatted Resume Preview
            </button>
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "edit"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Edit3 size={14} /> Edit Resume Text
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            A4 Standard • 1-Column ATS Single Flow Layout
          </span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 no-scrollbar bg-slate-950/40">
          {activeTab === "preview" ? (
            <div className="max-w-3xl mx-auto bg-slate-900/90 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-200 space-y-6">
              
              {/* Header Box */}
              <div className="text-center pb-5 border-b border-white/10 space-y-1.5">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  {updatedResumeData.candidate_name?.toUpperCase()}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  {updatedResumeData.email} • {updatedResumeData.phone} • {updatedResumeData.location}
                </p>
                <p className="text-xs text-cyan-400 flex items-center justify-center gap-3">
                  <span>LinkedIn: {updatedResumeData.linkedin}</span>
                  <span>•</span>
                  <span>GitHub: {updatedResumeData.github}</span>
                </p>
              </div>

              {/* Summary Section */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-1 border-b border-white/10 flex items-center gap-2">
                  <FileText size={14} className="text-cyan-400" />
                  Professional Summary
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {updatedResumeData.summary}
                </p>
              </div>

              {/* Technical Skills Section */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-1 border-b border-white/10 flex items-center gap-2">
                  <Layers size={14} className="text-indigo-400" />
                  Technical Skills
                </h2>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {updatedResumeData.technical_skills?.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>{line.replace(/^•\s*/, "")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Experience Section */}
              <div className="space-y-3.5">
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-1 border-b border-white/10 flex items-center gap-2">
                  <Briefcase size={14} className="text-amber-400" />
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {updatedResumeData.experience?.map((exp, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <strong className="text-white font-bold">{exp.role}</strong>
                        <span className="text-slate-400 text-xs italic">{exp.company} | {exp.period}</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                        {exp.bullets?.map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Projects Section */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-1 border-b border-white/10 flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-400" />
                  Key Projects
                </h2>
                <div className="space-y-3">
                  {updatedResumeData.projects?.map((prj, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <strong className="text-white font-bold">{prj.name}</strong>
                        {prj.link && (
                          <a
                            href={prj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-cyan-400 hover:underline"
                          >
                            Live App ↗
                          </a>
                        )}
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                        {prj.bullets?.map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-1 border-b border-white/10 flex items-center gap-2">
                    <GraduationCap size={14} className="text-cyan-400" />
                    Education
                  </h2>
                  <div className="space-y-1 text-xs text-slate-300">
                    {updatedResumeData.education?.map((edu, idx) => (
                      <p key={idx}>{edu.replace(/^-\s*/, "")}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-1 border-b border-white/10 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Certifications
                  </h2>
                  <div className="space-y-1 text-xs text-slate-300">
                    {updatedResumeData.certifications?.map((cert, idx) => (
                      <p key={idx}>{cert.replace(/^-\s*/, "")}</p>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Feel free to edit or customize your resume content below before downloading:</span>
                <span>{editableText.length} characters</span>
              </div>
              <textarea
                rows={18}
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
                className="w-full bg-slate-900 border border-white/15 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-400/60 leading-relaxed resize-y"
                placeholder="Full resume text..."
              />
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all transform active:scale-95"
            >
              <Download size={16} />
              {isDownloading ? "Generating PDF..." : "Download as PDF"}
            </button>

            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Clean Text"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onReAnalyze && (
              <button
                onClick={() => {
                  onClose();
                  onReAnalyze(editableText);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold transition-all"
                title="Verify new ATS score in analyzer"
              >
                <RefreshCw size={15} />
                <span>Re-Analyze in ATS</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
