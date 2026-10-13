import React from 'react';
import { ExternalLink } from 'lucide-react';

// Define the type for the card data
export interface CardData {
  id: number | string;
  colorClass: string;
  date: string;
  title: string;
  description: string;
  progressPercent?: string;
  progressValue: string;
  imgSrc1?: string;
  imgAlt1?: string;
  imgSrc2?: string;
  imgAlt2?: string;
  countdownText?: string;
  // Job-specific extensions
  applyUrl?: string;
  company?: string;
  location?: string;
  workMode?: string;
  sector?: string;
  salary?: string;
  skills?: string[];
  applicants?: number;
}

// Define the props for the Card component
export interface CardProps {
  data: CardData;
  onApply?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// SVG components (extracted for reusability and clarity)
export const EllipsisIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 opacity-70">
    <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
  </svg>
);

export const AddIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
);

const Card: React.FC<CardProps> = ({ data, onApply }) => {
  const {
    colorClass,
    date,
    title,
    description,
    progressPercent,
    progressValue,
    imgSrc1,
    imgAlt1,
    imgSrc2,
    imgAlt2,
    countdownText,
    applyUrl,
    company,
    location,
    workMode,
    sector,
    salary,
    skills,
  } = data;

  const resolvedProgress = progressPercent || progressValue || '85%';

  return (
    <div className={`card ${colorClass}`}>
      <div className="card-header">
        <div className="date">{date}</div>
        <div className="flex items-center gap-2">
          {sector && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/90">
              {sector === 'government' ? '🏛️ Govt / PSU' : '🏢 Private'}
            </span>
          )}
          <EllipsisIcon />
        </div>
      </div>

      <div className="card-body">
        <h3>{title}</h3>
        {company && (
          <div className="text-xs font-semibold text-cyan-300/90 mb-1.5 flex items-center gap-1.5">
            <span>{company}</span>
            {location && <span className="text-slate-400">• {location}</span>}
            {workMode && <span className="text-slate-400">({workMode})</span>}
          </div>
        )}
        <p>{description}</p>

        {/* Tags / Skills if present */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="progress">
          <span>{salary ? salary : 'Match Score'}</span>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: resolvedProgress.includes('%') ? resolvedProgress : `${resolvedProgress}%` }}
            />
          </div>
          <span>{progressValue}</span>
        </div>
      </div>

      <div className="card-footer">
        <ul>
          {imgSrc1 && (
            <li>
              <img src={imgSrc1} alt={imgAlt1 || 'Company logo'} loading="lazy" />
            </li>
          )}
          {imgSrc2 && (
            <li>
              <img src={imgSrc2} alt={imgAlt2 || 'Recruiter'} loading="lazy" />
            </li>
          )}
          {!imgSrc1 && !imgSrc2 && (
            <li>
              <div className="w-8 h-8 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-white uppercase border-2 border-slate-900">
                {company ? company.charAt(0) : 'J'}
              </div>
            </li>
          )}
          <li>
            <span className="btn-add" title="Verified Posting">
              <AddIcon />
            </span>
          </li>
        </ul>

        {/* Clean Direct Apply Link */}
        {applyUrl ? (
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onApply}
            className="btn-countdown btn-apply"
            title="Open official portal to apply directly"
          >
            <span>Apply Now</span>
            <ExternalLink size={13} className="shrink-0" />
          </a>
        ) : (
          <span className="btn-countdown">{countdownText || 'Active Now'}</span>
        )}
      </div>
    </div>
  );
};

export default Card;
