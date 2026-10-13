import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  ArrowRight,
  Sparkles,
  Clock,
  Building2,
  GitFork,
  CheckCircle2,
  Briefcase
} from "lucide-react";
import { CAREER_ROLES_CATALOG, CATEGORY_FILTERS } from "../../data/careerRoles";

export function CareerRoleCatalog({
  onSelectRole,
  selectedRoleId,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredRoles = CAREER_ROLES_CATALOG.filter((role) => {
    const matchesCategory =
      activeCategory === "all" || role.categoryKey === activeCategory;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      role.title.toLowerCase().includes(q) ||
      role.category.toLowerCase().includes(q) ||
      role.overview.toLowerCase().includes(q) ||
      role.skills.some((s) => s.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="career-catalog-container">
      {/* SEARCH & CATEGORY FILTER ROW */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="career-catalog-controls"
      >
        {/* Search Bar */}
        <div className="career-search-box">
          <Search size={18} className="search-icon-muted" />
          <input
            type="text"
            placeholder="Search roles or skills (e.g., SDE, Frontend, AI/ML, BI, Python, React...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="career-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="career-filter-pills">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`career-pill ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* RESULT COUNT */}
      <div className="career-results-meta">
        <span>Showing <strong>{filteredRoles.length}</strong> Specialized Tech Career Tracks</span>
        <span className="meta-sub">Click any card to launch its step-by-step LangFlow pipeline</span>
      </div>

      {/* CARDS GRID */}
      <motion.div
        layout
        className="career-cards-grid"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {filteredRoles.map((role) => {
          const Icon = role.icon;
          const isCurrentActive = role.id === selectedRoleId;

          return (
            <motion.div
              key={role.id}
              layout
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`career-card-item ${isCurrentActive ? "active-role-card" : ""}`}
              onClick={() => onSelectRole(role.id)}
            >
              {/* Card Glow Background */}
              <div
                className="career-card-glow"
                style={{
                  background: role.gradient,
                }}
              />

              <div className="career-card-inner">
                {/* Header row: Icon + Category + Badge */}
                <div className="career-card-head">
                  <div
                    className="career-icon-wrapper"
                    style={{ background: role.gradient }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>

                  <div className="career-head-meta">
                    <span className="career-category-chip">{role.category}</span>
                    <span className="career-badge-pill">{role.badge}</span>
                  </div>
                </div>

                {/* Role Title */}
                <h3 className="career-card-title">{role.title}</h3>

                {/* Salary & Timeline Row */}
                <div className="career-salary-timeline">
                  <div className="career-stat-box">
                    <span className="stat-label">Estimated Salary</span>
                    <strong className="stat-val">{role.salaryIn}</strong>
                    <small className="stat-sub">US: {role.salaryUs}</small>
                  </div>
                  <div className="career-stat-box">
                    <span className="stat-label">Time to Ready</span>
                    <strong className="stat-val">{role.timeToReady}</strong>
                    <small className="stat-sub">Milestone Guided</small>
                  </div>
                </div>

                {/* Overview */}
                <p className="career-card-overview">{role.overview}</p>

                {/* Tech Skills Pills */}
                <div className="career-skills-chips">
                  {role.skills.slice(0, 4).map((skill, sIdx) => (
                    <span key={sIdx} className="career-skill-chip">
                      {skill}
                    </span>
                  ))}
                  {role.skills.length > 4 && (
                    <span className="career-skill-more">+{role.skills.length - 4} more</span>
                  )}
                </div>

                {/* Popular Companies */}
                {role.popularCompanies && (
                  <div className="career-companies-row">
                    <Building2 size={12} className="text-slate-400" />
                    <span>Hiring: {role.popularCompanies.join(" • ")}</span>
                  </div>
                )}

                {/* Interactive CTA */}
                <div className="career-card-cta">
                  <div className="cta-left">
                    <GitFork size={14} className="text-purple-600" />
                    <span>LangFlow Architecture</span>
                  </div>
                  <button type="button" className="cta-btn">
                    <span>Explore Flow</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
