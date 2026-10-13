import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Target,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
    ? ""
    : "http://127.0.0.1:8000");

function formatCheckedAt(value) {
  if (!value) return "Not checked yet";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Not checked yet" : date.toLocaleString();
}

export default function ResumeJobRecommendations({ atsResult }) {
  const resumeData = useMemo(() => ({
    skills: atsResult.skills?.found || [],
    ats_score: Number(atsResult.ats_score) || 0,
    education: atsResult.extracted_info?.education || [],
    experience_samples: atsResult.extracted_info?.experience_sample || [],
  }), [atsResult]);
  const [jobs, setJobs] = useState([]);
  const [feedCheckedAt, setFeedCheckedAt] = useState(null);
  const [isLoading, setIsLoading] = useState(!atsResult.recommendations_limited);
  const [error, setError] = useState(
    atsResult.recommendations_limited
      ? "Personalized job matching needs the backend resume analysis; the current resume result is fallback data."
      : ""
  );
  const requestInFlight = useRef(false);

  const refreshRecommendations = useCallback(async (signal) => {
    if (requestInFlight.current) return;
    requestInFlight.current = true;
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
        signal,
      });
      if (!response.ok) {
        throw new Error(`Job recommendations could not be loaded (HTTP ${response.status}).`);
      }
      const data = await response.json();
      setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      setFeedCheckedAt(data.feed_checked_at || null);
    } catch (fetchError) {
      if (fetchError.name !== "AbortError") {
        setError(fetchError.message || "Job recommendations could not be loaded.");
      }
    } finally {
      requestInFlight.current = false;
      setIsLoading(false);
    }
  }, [resumeData]);

  useEffect(() => {
    if (atsResult.recommendations_limited) return undefined;
    let active = true;
    let controller = new AbortController();
    const refresh = () => {
      if (!active) return;
      controller = new AbortController();
      refreshRecommendations(controller.signal);
    };

    const initialRefreshId = window.setTimeout(refresh, 0);
    const intervalId = window.setInterval(refresh, 5 * 60 * 1000);
    return () => {
      active = false;
      window.clearTimeout(initialRefreshId);
      window.clearInterval(intervalId);
      controller.abort();
    };
  }, [atsResult.recommendations_limited, refreshRecommendations]);

  return (
    <section className="resume-job-recommendations panel">
      <div className="resume-jobs-heading">
        <div>
          <div className="card-header-row">
            <Briefcase size={19} color="var(--primary)" />
            <h3>Jobs matched to your resume</h3>
          </div>
          <p className="card-subtitle">
            Current listings ranked using skills, ATS score, and any readable experience or education details.
          </p>
        </div>
        <button
          type="button"
          className="secondary-btn"
          onClick={() => refreshRecommendations()}
          disabled={isLoading || atsResult.recommendations_limited}
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          {isLoading ? "Checking jobs..." : "Refresh"}
        </button>
      </div>

      <div className="resume-jobs-feed-status">
        Feed last checked: {formatCheckedAt(feedCheckedAt)} · Automatic refresh every 5 minutes
      </div>

      {error && (
        <div className="resume-jobs-notice" role="alert">
          <AlertTriangle size={17} />
          <span>{error} Make sure the backend is running, then refresh.</span>
        </div>
      )}

      {!error && jobs.length === 0 && !isLoading && (
        <p className="resume-jobs-empty">No job listings are available from the configured sources right now.</p>
      )}

      {jobs.length > 0 && (
        <>
          <div className="resume-jobs-list">
            {jobs.map((job) => (
              <article className="resume-job-card" key={job.id}>
                <div className="resume-job-main">
                  <div className="resume-job-title-row">
                    <div>
                      <h4>{job.title}</h4>
                      <p>{job.company} · {job.location} · {job.workMode}</p>
                    </div>
                    <div className="resume-job-fit" aria-label={`Resume fit estimate ${job.fit_score} percent`}>
                      <strong>{job.fit_score}%</strong>
                      <span>profile fit</span>
                    </div>
                  </div>

                  <div className="resume-job-metrics">
                    <span><Target size={14} /> Skills {job.skill_match_percent ?? "—"}%</span>
                    <span><CheckCircle2 size={14} /> ATS {job.ats_score}/100</span>
                    {job.experience_match_percent !== null && job.experience_match_percent !== undefined && (
                      <span><CheckCircle2 size={14} /> Experience {job.experience_match_percent}%</span>
                    )}
                    {job.education_match_percent !== null && job.education_match_percent !== undefined && (
                      <span><CheckCircle2 size={14} /> Education {job.education_match_percent === 100 ? "matches" : "not detected"}</span>
                    )}
                  </div>

                  <ul className="resume-job-reasons">
                    {job.fit_reasons.map((reason) => <li key={reason}>{reason}</li>)}
                  </ul>

                  {job.missing_job_skills?.length > 0 && (
                    <p className="resume-job-gaps">
                      Skills to review: {job.missing_job_skills.slice(0, 4).join(", ")}
                    </p>
                  )}
                </div>

                {job.applyUrl && (
                  <a
                    className="resume-job-apply"
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View official listing <ExternalLink size={14} />
                  </a>
                )}
              </article>
            ))}
          </div>

          <p className="resume-jobs-disclaimer">
            The percentage is an explainable resume-to-listing fit estimate, not your actual probability of being hired.
            Hiring decisions depend on employer criteria, applicant pool, interviews, and current vacancy status.
            Verify dates and eligibility on the official listing before applying.
          </p>
        </>
      )}
    </section>
  );
}
