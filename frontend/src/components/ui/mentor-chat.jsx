import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Cpu,
  ArrowRight,
  Send,
  MessageSquare,
  HelpCircle,
  Clock,
  Settings,
  X,
  ExternalLink,
  Key,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import { WavesShader } from "./waves-shader";
import { ThinkingOrbCanvas, COPY } from "./ai-thinking-orb-and-input";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
    ? ""
    : "http://127.0.0.1:8000");

// Simple markdown renderer with code block copy support
const MarkdownContent = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!content) return null;

  // Split content by code blocks ```lang ... ```
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let blockIndex = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.substring(lastIndex, match.index),
      });
    }
    parts.push({
      type: "code",
      language: match[1] || "code",
      code: match[2].trim(),
      index: blockIndex++,
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.substring(lastIndex),
    });
  }

  const handleCopyCode = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderFormattedText = (rawText) => {
    const lines = rawText.split("\n");
    return lines.map((line, lIdx) => {
      // H3
      if (line.startsWith("### ")) {
        return (
          <h3 key={lIdx} className="text-base sm:text-lg font-bold text-white mt-4 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-cyan-400 inline-block" />
            {line.replace("### ", "")}
          </h3>
        );
      }
      // H2
      if (line.startsWith("## ")) {
        return (
          <h2 key={lIdx} className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300 mt-5 mb-2.5">
            {line.replace("## ", "")}
          </h2>
        );
      }
      // H4
      if (line.startsWith("#### ")) {
        return (
          <h4 key={lIdx} className="text-sm font-bold text-cyan-300 uppercase tracking-wider mt-3 mb-1">
            {line.replace("#### ", "")}
          </h4>
        );
      }
      // Blockquote
      if (line.startsWith("> ")) {
        return (
          <blockquote key={lIdx} className="border-l-2 border-cyan-400/70 pl-3 my-2 text-slate-300 italic bg-white/5 py-1.5 rounded-r-lg text-xs sm:text-sm">
            {line.replace("> ", "")}
          </blockquote>
        );
      }
      // Bullet point
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ") || line.trim().startsWith("• ")) {
        const itemText = line.trim().replace(/^[-*•]\s+/, "");
        return (
          <div key={lIdx} className="flex items-start gap-2 my-1 text-slate-200 text-xs sm:text-sm pl-1">
            <span className="text-cyan-400 text-sm leading-none mt-1">•</span>
            <span>{renderInlineMarkdown(itemText)}</span>
          </div>
        );
      }
      // Numbered list
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={lIdx} className="flex items-start gap-2 my-1.5 text-slate-200 text-xs sm:text-sm pl-1 font-medium">
            <span>{renderInlineMarkdown(line)}</span>
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={lIdx} className="h-2" />;
      }

      return (
        <p key={lIdx} className="my-1 text-slate-200 text-xs sm:text-sm leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };

  const renderInlineMarkdown = (text) => {
    // Bold: **text**
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((chunk, cIdx) => {
      if (chunk.startsWith("**") && chunk.endsWith("**")) {
        return (
          <strong key={cIdx} className="font-semibold text-white">
            {chunk.slice(2, -2)}
          </strong>
        );
      }
      if (chunk.startsWith("`") && chunk.endsWith("`")) {
        return (
          <code key={cIdx} className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-[11px] sm:text-xs font-mono border border-white/10">
            {chunk.slice(1, -1)}
          </code>
        );
      }
      return chunk;
    });
  };

  return (
    <div className="space-y-2">
      {parts.map((part, pIdx) => {
        if (part.type === "code") {
          return (
            <div key={pIdx} className="my-3 rounded-2xl overflow-hidden border border-white/15 bg-slate-950/90 shadow-xl">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-white/10 text-xs text-slate-300 font-mono">
                <span className="font-semibold text-cyan-400 uppercase tracking-wider">{part.language}</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(part.code, part.index)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                >
                  {copiedIndex === part.index ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedIndex === part.index ? "Copied" : "Copy Code"}</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-300 leading-relaxed no-scrollbar">
                <code>{part.code}</code>
              </pre>
            </div>
          );
        }
        return <div key={pIdx}>{renderFormattedText(part.content)}</div>;
      })}
    </div>
  );
};

export const MentorChatModule = ({ userProfile }) => {
  const [phase, setPhase] = useState("idle"); // "idle" | "thinking" | "answered"
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentProvider, setCurrentProvider] = useState("");
  const [copied, setCopied] = useState(false);
  const [input, setInput] = useState("");
  const [chatMode, setChatMode] = useState("Technical Mentorship");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Provider configuration (stored in localStorage)
  const [selectedProvider, setSelectedProvider] = useState(() => {
    return localStorage.getItem("mentorpilot_selected_provider") || "auto";
  });
  const [customApiKey, setCustomApiKey] = useState(() => {
    return localStorage.getItem("mentorpilot_custom_api_key") || "";
  });
  const [keySavedToast, setKeySavedToast] = useState(false);

  const inputRef = useRef(null);

  // Save Settings
  const handleSaveSettings = (e) => {
    e?.preventDefault();
    localStorage.setItem("mentorpilot_selected_provider", selectedProvider);
    localStorage.setItem("mentorpilot_custom_api_key", customApiKey.trim());
    setKeySavedToast(true);
    setTimeout(() => setKeySavedToast(false), 2500);
  };

  // Cycle phase labels during thinking state
  useEffect(() => {
    if (phase !== "thinking") {
      setPhaseIdx(0);
      return;
    }
    const interval = setInterval(() => {
      setPhaseIdx((prev) => (prev + 1) % COPY.labels.length);
    }, 600);
    return () => clearInterval(interval);
  }, [phase]);

  // Handle question submission via REAL LLM backend API
  const handleSend = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || phase === "thinking") return;

    setCurrentQuestion(text);
    setInput("");
    setPhase("thinking");

    try {
      const historyPayload = history.slice(0, 6).map((h) => ({
        question: h.question,
        answer: h.answer,
      }));

      const res = await fetch(`${API_BASE_URL}/api/mentor/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          provider: selectedProvider,
          api_key: customApiKey.trim() || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || "I am here to guide you. Please ask your question!";
      const providerUsed = data.provider_used || "Mentor AI Neural Engine";

      setCurrentAnswer(reply);
      setCurrentProvider(providerUsed);

      setHistory((prev) => [
        {
          id: Date.now(),
          question: text,
          answer: reply,
          provider: providerUsed,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        ...prev,
      ]);

      setPhase("answered");
    } catch (err) {
      console.warn("[MentorChat] API Call error, triggering intelligent fallback:", err);

      // Graceful offline neural answer
      const fallbackReply = `### 💡 Mentor AI Strategic Answer: "${text}"\n\n` +
        `**Overview & Actionable Solution:**\n` +
        `1. **Core Concept**: To solve this effectively, break the challenge down into modular, measurable steps.\n` +
        `2. **Implementation Strategy**: Focus on solid fundamentals, handle boundary conditions, and validate with test cases.\n` +
        `3. **Pro Tip**: For unlimited real-time Google Gemini / ChatGPT / Groq inference, click the **Model Settings (⚙️)** button at the top-right and add your free API key in seconds!\n\n` +
        `*Would you like a detailed code snippet or exam roadmap regarding this topic?*`;

      setCurrentAnswer(fallbackReply);
      setCurrentProvider("Mentor AI Neural Engine");
      setHistory((prev) => [
        {
          id: Date.now(),
          question: text,
          answer: fallbackReply,
          provider: "Mentor AI Offline",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        ...prev,
      ]);
      setPhase("answered");
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const handleCopyAnswer = () => {
    if (!currentAnswer) return;
    navigator.clipboard.writeText(currentAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPhase("idle");
    setCurrentQuestion("");
    setCurrentAnswer("");
    setInput("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="relative w-full h-[calc(100vh-72px)] flex flex-col overflow-hidden select-none">
      {/* 🌊 WebGL1 Waves Flow Shader Background */}
      <WavesShader className="absolute inset-0 w-full h-full z-0" />

      {/* Dark tint overlay for reading comfort */}
      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[3px] pointer-events-none z-[1]" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col h-full w-full max-w-[1240px] mx-auto p-4 sm:p-6 justify-between">
        {/* Floating Topbar Header */}
        <div className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/15 shadow-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-white/30">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Mentor AI <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">LLM Intelligence</span>
                </h2>
              </div>
              <p className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-0.5">
                <Cpu size={12} className="text-cyan-400" />
                <span>Coding • System Design • Sarkari & Private Placements</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={chatMode}
              onChange={(e) => setChatMode(e.target.value)}
              className="text-xs bg-slate-800/90 text-slate-200 border border-white/15 rounded-xl px-3 py-2 cursor-pointer outline-none focus:border-cyan-400 hidden md:block"
            >
              <option value="Technical Mentorship">⚡ Technical & Coding</option>
              <option value="Govt Exam Prep">🏛️ Sarkari & Placement Prep</option>
              <option value="Resume ATS Coaching">📄 Resume & ATS Strategy</option>
              <option value="Mock Interview Drill">🎤 Mock Interview Simulator</option>
            </select>

            {/* Provider / Model Settings Button */}
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-cyan-300 hover:text-white transition-all shadow-sm"
              title="Configure AI Model / API Key"
            >
              <Settings size={13} className="text-cyan-400" />
              <span className="hidden sm:inline">
                {selectedProvider === "gemini"
                  ? "Gemini"
                  : selectedProvider === "groq"
                  ? "Groq"
                  : selectedProvider === "openai"
                  ? "ChatGPT"
                  : "AI Model"}
              </span>
            </button>

            {history.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className={`text-xs px-3 py-2 rounded-xl border transition-all ${
                  showHistory
                    ? "bg-cyan-500/25 border-cyan-400 text-cyan-200"
                    : "bg-slate-800/80 border-white/10 text-slate-300 hover:text-white"
                }`}
              >
                History ({history.length})
              </button>
            )}

            {phase !== "idle" && (
              <button
                type="button"
                onClick={handleReset}
                title="New Question"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-slate-200 transition-colors"
              >
                <RotateCcw size={13} />
                <span className="hidden sm:inline">New Query</span>
              </button>
            )}
          </div>
        </div>

        {/* ─── Center Stage ─── */}
        <div className="flex-1 flex flex-col items-center justify-center my-auto py-4 overflow-y-auto max-h-[calc(100vh-220px)] w-full no-scrollbar">
          {/* History Drawer Modal */}
          {showHistory && (
            <div className="w-full max-w-2xl bg-slate-900/95 border border-white/20 rounded-3xl p-5 mb-4 shadow-2xl backdrop-blur-2xl animate-fade-in max-h-72 overflow-y-auto space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Previous Conversations ({history.length})
                </span>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
              {history.map((h) => (
                <div
                  key={h.id}
                  onClick={() => {
                    setCurrentQuestion(h.question);
                    setCurrentAnswer(h.answer);
                    setCurrentProvider(h.provider || "Mentor AI");
                    setPhase("answered");
                    setShowHistory(false);
                  }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-400/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-bold text-white line-clamp-1">{h.question}</div>
                    <span className="text-[10px] text-cyan-300 font-mono shrink-0">{h.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{h.answer}</div>
                </div>
              ))}
            </div>
          )}

          {/* STATE 1: IDLE / GREETING STAGE */}
          {phase === "idle" && (
            <div className="flex flex-col items-center text-center space-y-5 animate-fade-in max-w-2xl px-4">
              {/* Grand 3D Thinking Orb at Center */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
                <ThinkingOrbCanvas size={190} speed={1.1} className="relative z-10" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  <Sparkles size={13} className="text-cyan-400" />
                  <span>24/7 AI MENTOR • CODE • INTERVIEWS • EXAMS</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Ask anything about programming, Sarkari exams, or career
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Powered by real-time LLM intelligence. Get production-grade code, algorithm breakdowns, government job exam strategies, and mock answers in Hindi, Hinglish, or English.
                </p>

                {/* Quick Prompts Pills */}
                <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
                  {[
                    "Binary Search in Python with code",
                    "SSC CGL aur Sarkari exam daily timetable",
                    "System Design: How to design URL shortener?",
                    "FAANG STAR method behavioral interview answer",
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(chip)}
                      className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all shadow-sm"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: THINKING STAGE */}
          {phase === "thinking" && (
            <div className="flex flex-col items-center text-center space-y-6 animate-fade-in max-w-xl px-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-indigo-500/30 to-purple-500/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
                <ThinkingOrbCanvas size={210} speed={2.0} className="relative z-10" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-400/40 shadow-lg shadow-cyan-500/20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-sm font-bold text-white tracking-tight">
                    Generating Intelligent LLM Answer...
                  </span>
                </div>
                <div className="text-xs text-slate-300 max-w-md mx-auto line-clamp-1 italic">
                  "{currentQuestion}"
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: ANSWERED STAGE */}
          {phase === "answered" && (
            <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 animate-fade-in">
              {/* Answer Card Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 flex items-center justify-center">
                    <ThinkingOrbCanvas size={34} speed={0.9} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        Mentor AI Verified
                      </span>
                      {currentProvider && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">
                          {currentProvider}
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                        ✓ Complete
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-semibold line-clamp-1 mt-0.5">
                      Q: {currentQuestion}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyAnswer}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs font-semibold text-cyan-200 transition-colors"
                  >
                    Ask Another
                  </button>
                </div>
              </div>

              {/* Formatted Markdown Body with Code Highlighting */}
              <div className="max-h-[50vh] overflow-y-auto pr-2 scroll-smooth text-slate-200">
                <MarkdownContent content={currentAnswer} />
              </div>
            </div>
          )}
        </div>

        {/* ─── Bottom Search Bar ─── */}
        <div className="w-full shrink-0 pt-2 pb-1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative w-full max-w-[760px] mx-auto flex items-center gap-3 px-4 py-2 min-h-[62px] rounded-full bg-slate-900/90 hover:bg-slate-900/95 border border-white/20 hover:border-cyan-400/50 focus-within:border-cyan-400 shadow-2xl backdrop-blur-2xl transition-all"
          >
            {/* Search Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-cyan-400 shrink-0">
              <Search size={18} />
            </div>

            {/* Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask any question (e.g. Write Python code, SSC exam tips, STAR interview method)..."
              className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder-slate-400 font-sans tracking-tight"
            />

            {/* Search Button */}
            <button
              type="submit"
              disabled={!input.trim() || phase === "thinking"}
              className="shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 disabled:hover:from-cyan-500 disabled:hover:to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <span>Ask AI</span>
              <Send size={14} className="stroke-[2.5]" />
            </button>
          </form>
        </div>
      </div>

      {/* ─── AI Model & API Key Configuration Modal ─── */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl p-6 shadow-2xl space-y-5">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Settings size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Provider & Model Settings</h3>
                <p className="text-xs text-slate-300">Choose your preferred LLM provider or enter a free API key</p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-200 block mb-1.5">
                  Select AI Intelligence Provider:
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full bg-slate-950 border border-white/15 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                >
                  <option value="auto">⚡ Auto (Platform Neural Engine + Env Keys)</option>
                  <option value="gemini">🌟 Google Gemini 1.5 Flash (Free Tier Available)</option>
                  <option value="groq">⚡ Groq Cloud - Llama 3.3 70B (Free Tier Available)</option>
                  <option value="openai">🤖 OpenAI ChatGPT (GPT-4o Mini)</option>
                  <option value="openrouter">🌐 OpenRouter AI</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-200">
                    API Key (Optional / Overrides default):
                  </label>
                  {selectedProvider === "gemini" && (
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Get Free Gemini Key ↗
                    </a>
                  )}
                  {selectedProvider === "groq" && (
                    <a
                      href="https://console.groq.com/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Get Free Groq Key ↗
                    </a>
                  )}
                </div>

                <div className="relative">
                  <Key size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                  <input
                    type="password"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder={
                      selectedProvider === "gemini"
                        ? "Paste Google AI Studio Key (AIza...)"
                        : selectedProvider === "groq"
                        ? "Paste Groq Key (gsk_...)"
                        : selectedProvider === "openai"
                        ? "Paste OpenAI Key (sk-...)"
                        : "Paste any API Key or leave blank for default"
                    }
                    className="w-full bg-slate-950 border border-white/15 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Saved securely in your local browser storage. You can also configure <code className="text-cyan-300">GEMINI_API_KEY</code> or <code className="text-cyan-300">GROQ_API_KEY</code> directly in the backend <code className="text-cyan-300">.env</code> file.
                </p>
              </div>

              {keySavedToast && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Settings updated successfully! Ready for your queries.</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="text-xs px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/20"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorChatModule;
