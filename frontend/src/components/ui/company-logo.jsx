import React from "react";

export const CompanyLogo = ({ type = "", name = "", size = 44, className = "" }) => {
  const norm = (type || name || "").toLowerCase();

  // 1. Google
  if (norm.includes("google")) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Google">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    );
  }

  // 2. Microsoft
  if (norm.includes("microsoft")) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Microsoft">
        <path fill="#F25022" d="M3 3h19v19H3z"/>
        <path fill="#7FBA00" d="M26 3h19v19H26z"/>
        <path fill="#00A4EF" d="M3 26h19v19H3z"/>
        <path fill="#FFB900" d="M26 26h19v19H26z"/>
      </svg>
    );
  }

  // 3. Meta (Facebook)
  if (norm.includes("meta") || norm.includes("facebook")) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Meta">
        <defs>
          <linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0064E0" />
            <stop offset="50%" stopColor="#0082FB" />
            <stop offset="100%" stopColor="#00C6FF" />
          </linearGradient>
        </defs>
        <path
          fill="url(#metaGrad)"
          d="M24 16.5c-4.2 0-7.8 2.8-9.4 6.9-1.2-2.3-3.6-3.9-6.3-3.9-4.3 0-7.8 3.5-7.8 7.8s3.5 7.8 7.8 7.8c3.2 0 6-1.9 7.2-4.7 1.8 4.7 6.4 8 11.8 8 7.2 0 13-5.8 13-13s-5.8-13-13-13zm-15.7 14c-1.8 0-3.3-1.5-3.3-3.3s1.5-3.3 3.3-3.3 3.3 1.5 3.3 3.3-1.5 3.3-3.3 3.3zm21.4-1.2c-2.4 2.8-5.8 4.4-9.7 4.4-4.8 0-8.9-2.7-10.7-6.7 1.4-3.5 4.8-6 8.7-6 5.4 0 9.8 4.4 9.8 9.8 0 1.2-.2 2.3-.6 3.3z"
          transform="scale(1.05) translate(-1, -4)"
        />
      </svg>
    );
  }

  // 4. Amazon
  if (norm.includes("amazon")) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Amazon">
        <path fill="#232F3E" d="M26 13.5c-6.8 0-12.1 4.5-12.1 11.2 0 4.8 3.2 8.3 7.8 8.3 3.4 0 6.2-1.8 7.8-4.5v3.9h5.1V14.1h-5.1v2.8c-1.4-2.1-4-3.4-7.4-3.4zm-.4 15.3c-3.6 0-6.1-2.8-6.1-6.6s2.5-6.6 6.1-6.6 6.1 2.8 6.1 6.6-2.5 6.6-6.1 6.6z"/>
        <path fill="#FF9900" d="M37.5 35.8C25.7 41.5 13.9 39.2 6.8 34.3c-.6-.4-.1-1.3.6-.9 6.5 3.8 17.9 6.1 29 0 .8-.5 1.7.3 1.1 1.4z"/>
        <path fill="#FF9900" d="M39.6 33.3c-.8-.2-2.2.4-3.3 1.1-.3.2-.4.6-.2.8.5.5 1.7 1.8 3.5 1.8.4 0 .7-.3.8-.6.2-.9.1-2.4-.8-3.1z"/>
      </svg>
    );
  }

  // 5. Apple
  if (norm.includes("apple")) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Apple">
        <path fill="#111827" d="M32.5 24.3c0-5 4.1-7.5 4.3-7.6-2.3-3.4-6-3.8-7.3-3.9-3.1-.3-6.1 1.8-7.7 1.8-1.6 0-4.1-1.8-6.7-1.8-3.4 0-6.6 2-8.3 5.1-3.6 6.2-.9 15.4 2.5 20.4 1.7 2.4 3.7 5.1 6.3 5 2.5-.1 3.5-1.6 6.5-1.6s3.9 1.6 6.5 1.5c2.7 0 4.4-2.4 6.1-4.9 1.9-2.8 2.7-5.5 2.7-5.6-.1-.1-5.1-2-5.1-8.4zM27.7 10.6c1.4-1.7 2.3-4 2-6.4-2 .1-4.4 1.3-5.8 3-1.2 1.4-2.3 3.8-2 6.1 2.3.2 4.5-1.1 5.8-2.7z"/>
      </svg>
    );
  }

  // 6. Infosys
  if (norm.includes("infosys")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-[#007cc3] flex flex-col items-center justify-center text-white shadow-md select-none ${className}`}
        aria-label="Infosys"
      >
        <span className="font-extrabold text-[11px] tracking-wider leading-none">Infosys</span>
        <span className="text-[7px] text-cyan-200 tracking-tighter opacity-90 mt-0.5">Navigate</span>
      </div>
    );
  }

  // 7. TCS
  if (norm.includes("tcs") || norm.includes("tata")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-[#00539b] flex flex-col items-center justify-center text-white shadow-md select-none ${className}`}
        aria-label="TCS"
      >
        <span className="font-black text-sm tracking-widest leading-none">TCS</span>
        <span className="text-[7px] text-sky-200 tracking-tighter opacity-80 mt-0.5">TATA</span>
      </div>
    );
  }

  // 8. Wipro
  if (norm.includes("wipro")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center shadow-md select-none ${className}`}
        aria-label="Wipro"
      >
        <div className="flex items-center gap-0.5 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E01A22]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#F39200]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#782B90]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#009640]" />
        </div>
        <span className="font-bold text-[#28327A] text-[11px] tracking-tight leading-none">wipro</span>
      </div>
    );
  }

  // 9. UPSC
  if (norm.includes("upsc")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 border border-amber-400/40 flex flex-col items-center justify-center text-white shadow-md select-none ${className}`}
        aria-label="UPSC"
      >
        <span className="text-base leading-none">🏛️</span>
        <span className="font-black text-[10px] text-amber-200 tracking-wider mt-0.5 leading-none">UPSC</span>
      </div>
    );
  }

  // 10. SSC
  if (norm.includes("ssc")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-gradient-to-br from-rose-600 via-red-700 to-red-900 border border-rose-400/40 flex flex-col items-center justify-center text-white shadow-md select-none ${className}`}
        aria-label="SSC"
      >
        <span className="text-base leading-none">⚖️</span>
        <span className="font-black text-[10px] text-rose-100 tracking-wider mt-0.5 leading-none">SSC</span>
      </div>
    );
  }

  // 11. SBI & Banking
  if (norm.includes("sbi") || norm.includes("banking") || norm.includes("ibps")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-gradient-to-br from-[#0092d6] to-[#00578a] border border-cyan-400/30 flex flex-col items-center justify-center text-white shadow-md select-none ${className}`}
        aria-label="SBI Banking"
      >
        <div className="w-4 h-4 rounded-full bg-white relative flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0092d6]" />
          <div className="absolute bottom-0 w-0.5 h-1.5 bg-white" />
        </div>
        <span className="font-extrabold text-[9px] text-cyan-100 tracking-wider mt-0.5 leading-none">SBI/IBPS</span>
      </div>
    );
  }

  // 12. ISRO
  if (norm.includes("isro")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-gradient-to-br from-orange-600 via-slate-800 to-blue-700 border border-orange-400/40 flex flex-col items-center justify-center text-white shadow-md select-none ${className}`}
        aria-label="ISRO"
      >
        <span className="text-base leading-none">🚀</span>
        <span className="font-black text-[9px] text-orange-200 tracking-widest mt-0.5 leading-none">ISRO</span>
      </div>
    );
  }

  // 13. RRB / Indian Railways
  if (norm.includes("rrb") || norm.includes("railway")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-gradient-to-br from-red-700 via-red-800 to-amber-900 border border-red-400/40 flex flex-col items-center justify-center text-white shadow-md select-none ${className}`}
        aria-label="Indian Railways"
      >
        <span className="text-base leading-none">🚆</span>
        <span className="font-black text-[9px] text-amber-200 tracking-wider mt-0.5 leading-none">RAILWAY</span>
      </div>
    );
  }

  // 14. DRDO
  if (norm.includes("drdo")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-gradient-to-br from-sky-700 via-blue-800 to-indigo-950 border border-sky-400/40 flex flex-col items-center justify-center text-white shadow-md select-none ${className}`}
        aria-label="DRDO"
      >
        <span className="text-base leading-none">🛡️</span>
        <span className="font-black text-[9px] text-sky-200 tracking-widest mt-0.5 leading-none">DRDO</span>
      </div>
    );
  }

  // 15. Python
  if (norm.includes("python")) {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Python">
        <path fill="#3776AB" d="M24 4C14.7 4 15.3 8 15.3 8l.01 4.19h8.86v1.26H11.8s-5.8-.66-5.8 8.6c0 9.25 5.06 8.94 5.06 8.94h3.02v-4.24s-.16-5.06 4.97-5.06h8.55s4.83.08 4.83-4.69V13.3S33.47 4 24 4zm-2.48 2.6a1.37 1.37 0 11.01 2.74 1.37 1.37 0 01-.01-2.74z"/>
        <path fill="#FFD438" d="M24 44c9.3 0 8.7-4 8.7-4l-.01-4.19h-8.86v-1.26h12.37s5.8.66 5.8-8.6c0-9.25-5.06-8.94-5.06-8.94h-3.02v4.24s.16 5.06-4.97 5.06h-8.55s-4.83-.08-4.83 4.69V34.7S14.53 44 24 44zm2.48-2.6a1.37 1.37 0 11-.01-2.74 1.37 1.37 0 01.01 2.74z"/>
      </svg>
    );
  }

  // 16. SQL / DBMS
  if (norm.includes("sql") || norm.includes("dbms") || norm.includes("database")) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 border border-indigo-400/40 flex flex-col items-center justify-center text-white shadow-md select-none ${className}`}
        aria-label="SQL Database"
      >
        <span className="text-base leading-none">💾</span>
        <span className="font-black text-[9px] text-indigo-200 tracking-wider mt-0.5 leading-none">SQL</span>
      </div>
    );
  }

  // Generic fallback
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-extrabold text-sm shadow-md select-none ${className}`}
      aria-label={name}
    >
      {(name || "EX").slice(0, 2).toUpperCase()}
    </div>
  );
};
