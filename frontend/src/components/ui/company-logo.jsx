import React, { useState } from "react";

// Real official base64 image provided by user for Union Public Service Commission (UPSC)
const UPSC_OFFICIAL_BASE64 =
  "data:image/png;base64,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";

// Authentic Official Logo Image Sources
const OFFICIAL_IMAGE_MAP = {
  tcs: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/512px-Tata_Consultancy_Services_Logo.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/9/9b/TATA_Consultancy_Services_Logo.svg",
    alt: "Tata Consultancy Services (TCS) Official Logo",
  },
  infosys: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/512px-Infosys_logo.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    alt: "Infosys Official Logo",
  },
  meta: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    alt: "Meta Official Logo",
  },
  ssc: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Staff_Selection_Commission_Logo.jpg/512px-Staff_Selection_Commission_Logo.jpg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/6/64/Staff_Selection_Commission_Logo.jpg",
    alt: "Staff Selection Commission (SSC) Official Emblem",
  },
  sbi: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/512px-SBI-logo.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/3/33/State_Bank_of_India.svg",
    alt: "State Bank of India (SBI) Official Logo",
  },
  isro: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/512px-Indian_Space_Research_Organisation_Logo.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg",
    alt: "Indian Space Research Organisation (ISRO) Official Logo",
  },
  rrb: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ministry_of_Railways_India.svg/512px-Ministry_of_Railways_India.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/0/07/Ministry_of_Railways_India.svg",
    alt: "Ministry of Railways / Railway Recruitment Board Emblem",
  },
  drdo: {
    // Official DRDO vector logo directly from Wikimedia with fallback to DRDO portal
    src: "https://upload.wikimedia.org/wikipedia/en/1/1d/Defence_Research_and_Development_Organisation.svg",
    fallback: "https://drdo.gov.in/drdo/sites/default/files/default_images/logo_0_1.png",
    alt: "DRDO Official Emblem",
  },
  google: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/512px-Google_%22G%22_logo.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    alt: "Google Official Logo",
  },
  microsoft: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    alt: "Microsoft Official Logo",
  },
  amazon: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    alt: "Amazon Official Logo",
  },
  apple: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    alt: "Apple Official Logo",
  },
  wipro: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/512px-Wipro_Primary_Logo_Color_RGB.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
    alt: "Wipro Official Logo",
  },
  python: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/512px-Python-logo-notext.svg.png",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    alt: "Python Official Logo",
  },
  anthropic: {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg",
    alt: "Anthropic Official Logo",
  },
  nvidia: {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
    fallback: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nvidia.svg",
    alt: "NVIDIA Official Logo",
  },
  openai: {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    alt: "OpenAI Official Logo",
  },
  netflix: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    fallback: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg",
    alt: "Netflix Official Logo",
  },
  adobe: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Adobe_Corporate_Horizontal_Logo_2020.svg",
    fallback: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg",
    alt: "Adobe Official Logo",
  },
  oracle: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    fallback: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg",
    alt: "Oracle Official Logo",
  },
  salesforce: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    fallback: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/salesforce.svg",
    alt: "Salesforce Official Logo",
  },
};

// Resilient Logo Image Component with automatic fallback handling
const RealLogoImg = ({ config, size, className = "", alt = "", fallbackNode = null }) => {
  const [src, setSrc] = useState(config.src);
  const [errorCount, setErrorCount] = useState(0);

  const handleError = () => {
    if (errorCount === 0 && config.fallback && config.fallback !== src) {
      setSrc(config.fallback);
      setErrorCount(1);
    } else {
      setErrorCount(2);
    }
  };

  if (errorCount >= 2 && fallbackNode) {
    return fallbackNode;
  }

  return (
    <img
      src={src}
      alt={alt || config.alt || "Official Logo"}
      className={className}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      loading="lazy"
      onError={handleError}
      style={{
        maxWidth: "100%",
        maxHeight: `${size}px`,
        width: "auto",
        height: "auto",
        objectFit: "contain",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
};

export const CompanyLogo = ({ type = "", name = "", size = 52, className = "" }) => {
  const norm = (type || name || "").toLowerCase();

  // 1. UPSC (Uses user-provided real base64 image data URI)
  if (norm.includes("upsc")) {
    return (
      <img
        src={UPSC_OFFICIAL_BASE64}
        alt="Union Public Service Commission (UPSC) Official Seal"
        className={className}
        style={{
          maxWidth: "100%",
          maxHeight: `${size}px`,
          width: "auto",
          height: "auto",
          objectFit: "contain",
          display: "block",
          margin: "0 auto",
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))",
        }}
      />
    );
  }

  // 2. TCS (Tata Consultancy Services) - Real Official Brand Logo
  if (norm.includes("tcs") || norm.includes("tata")) {
    const tcsSvgFallback = (
      <svg width={size} height={size * 0.45} viewBox="0 0 160 60" className={className} aria-label="TCS">
        <path d="M12 18h24v6H26v24h-6V24H12zM42 24h18v6H48v6h10v6H48v6h12v6H42z" fill="#00539b" />
        <text x="80" y="38" fill="#00539b" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="1">TCS</text>
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.tcs}
        size={size}
        className={className}
        alt="Tata Consultancy Services Logo"
        fallbackNode={tcsSvgFallback}
      />
    );
  }

  // 3. Infosys - Real Official Blue Script Wordmark
  if (norm.includes("infosys")) {
    const infySvgFallback = (
      <svg width={size * 1.5} height={size * 0.6} viewBox="0 0 180 70" className={className} aria-label="Infosys">
        <text x="90" y="48" fill="#007cc3" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="38" textAnchor="middle" letterSpacing="-0.5">Infosys</text>
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.infosys}
        size={size}
        className={className}
        alt="Infosys Official Logo"
        fallbackNode={infySvgFallback}
      />
    );
  }

  // 4. Meta - Real Official Gradient Infinity Logo
  if (norm.includes("meta") || norm.includes("facebook")) {
    const metaSvgFallback = (
      <svg width={size} height={size * 0.65} viewBox="0 0 48 32" className={className} aria-label="Meta">
        <defs>
          <linearGradient id="metaFallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0064E0" />
            <stop offset="100%" stopColor="#0082FB" />
          </linearGradient>
        </defs>
        <path
          fill="url(#metaFallGrad)"
          d="M24 8c-3.2 0-6 2.1-7.2 5.3-.9-1.8-2.8-3-4.9-3-3.3 0-6 2.7-6 6s2.7 6 6 6c2.5 0 4.6-1.5 5.5-3.6 1.4 3.6 4.9 6.1 9.1 6.1 5.5 0 10-4.5 10-10s-4.5-10.8-12.5-10.8z"
        />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.meta}
        size={size}
        className={className}
        alt="Meta Platforms Official Logo"
        fallbackNode={metaSvgFallback}
      />
    );
  }

  // 5. Staff Selection Commission (SSC) - Real Official Government Emblem
  if (norm.includes("ssc")) {
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.ssc}
        size={size}
        className={className}
        alt="Staff Selection Commission Official Emblem"
      />
    );
  }

  // 6. State Bank of India (SBI / Banking / IBPS) - Real Keyhole Aperture Logo
  if (norm.includes("sbi") || norm.includes("banking") || norm.includes("ibps")) {
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.sbi}
        size={size}
        className={className}
        alt="State Bank of India Official Logo"
      />
    );
  }

  // 7. ISRO (Indian Space Research Organisation) - Real Official Rocket & Satellite Emblem
  if (norm.includes("isro")) {
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.isro}
        size={size}
        className={className}
        alt="ISRO Official Emblem"
      />
    );
  }

  // 8. Indian Railways / RRB - Real Official Wheel Locomotive Seal
  if (norm.includes("rrb") || norm.includes("railway")) {
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.rrb}
        size={size}
        className={className}
        alt="Indian Railways Official Emblem"
      />
    );
  }

  // 9. DRDO (Defence Research and Development Organisation) - Guaranteed Official Emblem
  if (norm.includes("drdo")) {
    const drdoSvgFallback = (
      <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-label="DRDO Official Emblem">
        <circle cx="32" cy="32" r="30" fill="#0c1e3d" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="26" fill="none" stroke="#fde047" strokeWidth="0.8" strokeDasharray="3 2" />
        <path d="M12 28c7-4 14-3 18 2-4-7-11-9-18-2zm40 0c-7-4-14-3-18 2 4-7 11-9 18-2z" fill="#facc15" />
        <path d="M32 14v22M29 18c0 3 3 5 3 5s3-2 3-5M28 22h8" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
        <path d="M27 34c0 3 2.5 5 5 5s5-2 5-5" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
        <rect x="15" y="46" width="34" height="9" rx="3" fill="#1e3a8a" stroke="#f59e0b" strokeWidth="1" />
        <text x="32" y="53" fill="#fef08a" fontFamily="sans-serif" fontWeight="900" fontSize="7" textAnchor="middle" letterSpacing="1.5">DRDO</text>
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.drdo}
        size={size}
        className={className}
        alt="DRDO Official Emblem"
        fallbackNode={drdoSvgFallback}
      />
    );
  }

  // 10. Anthropic - Official Logo
  if (norm.includes("anthropic") || norm.includes("claude")) {
    const anthropicSvg = (
      <svg width={size} height={size * 0.75} viewBox="0 0 24 24" className={className} aria-label="Anthropic">
        <path fill="#191919" d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5527h3.7442L10.5367 3.541Zm.4439 10.3663 2.1332-5.5332 2.1332 5.5332Z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.anthropic}
        size={size}
        className={className}
        alt="Anthropic Official Logo"
        fallbackNode={anthropicSvg}
      />
    );
  }

  // 11. NVIDIA - Official Green Logo
  if (norm.includes("nvidia")) {
    const nvidiaSvg = (
      <svg width={size} height={size * 0.8} viewBox="0 0 24 24" className={className} aria-label="NVIDIA">
        <path fill="#76B900" d="M11.75 3.5C7.2 3.5 3.5 7.2 3.5 11.75c0 3.32 1.97 6.18 4.8 7.45-.16-.62-.25-1.28-.25-1.95 0-3.31 2.69-6 6-6 .67 0 1.33.09 1.95.25-1.27-2.83-4.13-4.8-7.45-4.8-4.55 0-8.25 3.7-8.25 8.25 0 2.22.88 4.24 2.31 5.72C1.04 18.99 0 16.5 0 13.75 0 7.26 5.26 2 11.75 2c3.48 0 6.62 1.52 8.78 3.93-1.48-.96-3.23-1.53-5.11-1.53-1.24 0-2.42.25-3.5.7l-.17-.1z" />
        <path fill="#76B900" d="M12 8c-2.21 0-4 1.79-4 4 0 .44.07.86.2 1.25.79-.16 1.62-.25 2.47-.25 3.73 0 7.03 1.77 9.17 4.54C20.57 15.65 21 13.88 21 12c0-4.97-4.03-9-9-9z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.nvidia}
        size={size}
        className={className}
        alt="NVIDIA Official Logo"
        fallbackNode={nvidiaSvg}
      />
    );
  }

  // 12. OpenAI - Official Blossom Logo
  if (norm.includes("openai") || norm.includes("chatgpt")) {
    const openaiSvg = (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-label="OpenAI">
        <path fill="#10a37f" d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.487a4.477 4.477 0 0 1 2.34-1.974V12.06a.766.766 0 0 0 .387.676l5.833 3.37-2.02 1.168a.086.086 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.487zm16.597 3.855-5.833-3.37 2.02-1.168a.086.086 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.682a.79.79 0 0 0-.407-.676h-.005zm2.01-3.023-.141-.085-4.779-2.782a.776.776 0 0 0-.785 0L9.409 9.797V7.465a.066.066 0 0 1 .033-.061L14.28 4.62a4.5 4.5 0 0 1 6.67 4.699zm-9.687 4.526 2.785-1.608 2.785 1.608v3.216l-2.785 1.608-2.785-1.608z"/>
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.openai}
        size={size}
        className={className}
        alt="OpenAI Official Logo"
        fallbackNode={openaiSvg}
      />
    );
  }

  // 13. Netflix - Official Red Logo
  if (norm.includes("netflix")) {
    const netflixSvg = (
      <svg width={size} height={size * 0.4} viewBox="0 0 111 30" className={className} aria-label="Netflix">
        <path fill="#E50914" d="M105.06 14.33l6.09 15.67h-4.3l-3.95-10.74-3.96 10.74h-4.3l6.09-15.67-5.84-14.33h4.42l3.64 9.87 3.63-9.87h4.35l-5.87 14.33zm-22.61-14.33v30h-4.14v-30h4.14zm-14.35 0v30h-4.15v-12.78h-7.14v12.78h-4.15v-30h4.15v13.08h7.14v-13.08h4.15zm-22.36 25.86h7.6v4.14h-11.75v-30h11.75v4.14h-7.6v8.72h6.58v4.14h-6.58v8.86zm-17.65-25.86v30h-4.15v-30h4.15zm-14.03 25.86h7.61v4.14h-11.75v-30h11.75v4.14h-7.61v8.72h6.58v4.14h-6.58v8.86zM4.14 0v17.47l7.73 12.53h-4.57l-7.3-11.83v11.83h-4.15v-30h4.15l7.3 11.82v-11.82h-3.16z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.netflix}
        size={size}
        className={className}
        alt="Netflix Official Logo"
        fallbackNode={netflixSvg}
      />
    );
  }

  // 14. Adobe - Official Creative Logo
  if (norm.includes("adobe")) {
    const adobeSvg = (
      <svg width={size} height={size * 0.85} viewBox="0 0 24 24" className={className} aria-label="Adobe">
        <path fill="#FF0000" d="M13.96 4.94L19.49 19H15.68L13.3 12.87H10.16L12.55 19H8.74L13.96 4.94ZM24 0V24H16.27L24 0ZM0 0H7.73L0 24V0Z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.adobe}
        size={size}
        className={className}
        alt="Adobe Official Logo"
        fallbackNode={adobeSvg}
      />
    );
  }

  // 15. Oracle - Official Red Logo
  if (norm.includes("oracle")) {
    const oracleSvg = (
      <svg width={size * 1.4} height={size * 0.4} viewBox="0 0 100 28" className={className} aria-label="Oracle">
        <path fill="#C74634" d="M14.1 27.9C6.3 27.9 0 21.6 0 13.9 0 6.2 6.3 0 14.1 0c7.8 0 14.1 6.2 14.1 13.9 0 7.7-6.3 14-14.1 14zm0-5.7c4.6 0 8.3-3.7 8.3-8.3 0-4.6-3.7-8.3-8.3-8.3-4.6 0-8.3 3.7-8.3 8.3 0 4.6 3.7 8.3 8.3 8.3zm36.4 5.3l-5.6-7.8h-4.3v7.8h-5.8V0h11.2c5.9 0 9.8 3.5 9.8 8.8 0 3.7-2.1 6.9-5.3 8.1l6.7 10.6h-6.7zm-4.5-12.7c2.5 0 4.4-1.6 4.4-3.9 0-2.3-1.9-3.9-4.4-3.9h-5.4v7.8h5.4zm34.2 12.7l-1.9-3.9h-8.7l-1.9 3.9h-6.2L74.8 0h6.4l10.4 27.5h-6.4zm-6.2-12.6l-2.4-5.3-2.4 5.3h4.8z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.oracle}
        size={size}
        className={className}
        alt="Oracle Official Logo"
        fallbackNode={oracleSvg}
      />
    );
  }

  // 16. Salesforce - Official Blue Cloud Logo
  if (norm.includes("salesforce")) {
    const sfSvg = (
      <svg width={size * 1.3} height={size * 0.85} viewBox="0 0 24 16" className={className} aria-label="Salesforce">
        <path fill="#00A1E0" d="M9.8 2.2C11.1.9 12.9.1 14.8.1c2.4 0 4.5 1.3 5.6 3.3 1.2.2 2.3.8 3.1 1.7.9 1 1.5 2.3 1.5 3.7 0 2.9-2.4 5.3-5.3 5.3-.3 0-.6 0-.9-.1-.9 1.1-2.3 1.8-3.9 1.8-1.5 0-2.8-.7-3.7-1.7-.8.5-1.7.8-2.7.8-2.4 0-4.4-1.7-4.8-4-.4.1-.8.2-1.3.2C1.4 13.1 0 11.7 0 10c0-1.5 1.1-2.8 2.6-3 .3-1.9 1.9-3.4 3.9-3.4 1.3 0 2.5.6 3.3 1.6z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.salesforce}
        size={size}
        className={className}
        alt="Salesforce Official Logo"
        fallbackNode={sfSvg}
      />
    );
  }

  // 17. Google - Real Official 4-Color "G"
  if (norm.includes("google")) {
    const googleSvg = (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Google">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.google}
        size={size}
        className={className}
        alt="Google Official Logo"
        fallbackNode={googleSvg}
      />
    );
  }

  // 18. Microsoft - Real Official 4-Square Logo
  if (norm.includes("microsoft")) {
    const msSvg = (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Microsoft">
        <path fill="#F25022" d="M3 3h19v19H3z" />
        <path fill="#7FBA00" d="M26 3h19v19H26z" />
        <path fill="#00A4EF" d="M3 26h19v19H3z" />
        <path fill="#FFB900" d="M26 26h19v19H26z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.microsoft}
        size={size}
        className={className}
        alt="Microsoft Official Logo"
        fallbackNode={msSvg}
      />
    );
  }

  // 19. Amazon - Real Official Smile Logo
  if (norm.includes("amazon")) {
    const amzSvg = (
      <svg width={size} height={size * 0.7} viewBox="0 0 48 34" className={className} aria-label="Amazon">
        <path fill="#232F3E" d="M26 4.5c-6.8 0-12.1 4.5-12.1 11.2 0 4.8 3.2 8.3 7.8 8.3 3.4 0 6.2-1.8 7.8-4.5v3.9h5.1V5.1h-5.1v2.8c-1.4-2.1-4-3.4-7.4-3.4zm-.4 15.3c-3.6 0-6.1-2.8-6.1-6.6s2.5-6.6 6.1-6.6 6.1 2.8 6.1 6.6-2.5 6.6-6.1 6.6z" />
        <path fill="#FF9900" d="M37.5 26.8C25.7 32.5 13.9 30.2 6.8 25.3c-.6-.4-.1-1.3.6-.9 6.5 3.8 17.9 6.1 29 0 .8-.5 1.7.3 1.1 1.4z" />
        <path fill="#FF9900" d="M39.6 24.3c-.8-.2-2.2.4-3.3 1.1-.3.2-.4.6-.2.8.5.5 1.7 1.8 3.5 1.8.4 0 .7-.3.8-.6.2-.9.1-2.4-.8-3.1z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.amazon}
        size={size}
        className={className}
        alt="Amazon Official Logo"
        fallbackNode={amzSvg}
      />
    );
  }

  // 20. Apple - Real Official Apple Silhouette
  if (norm.includes("apple")) {
    const appleSvg = (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Apple">
        <path fill="#0f172a" d="M32.5 24.3c0-5 4.1-7.5 4.3-7.6-2.3-3.4-6-3.8-7.3-3.9-3.1-.3-6.1 1.8-7.7 1.8-1.6 0-4.1-1.8-6.7-1.8-3.4 0-6.6 2-8.3 5.1-3.6 6.2-.9 15.4 2.5 20.4 1.7 2.4 3.7 5.1 6.3 5 2.5-.1 3.5-1.6 6.5-1.6s3.9 1.6 6.5 1.5c2.7 0 4.4-2.4 6.1-4.9 1.9-2.8 2.7-5.5 2.7-5.6-.1-.1-5.1-2-5.1-8.4zM27.7 10.6c1.4-1.7 2.3-4 2-6.4-2 .1-4.4 1.3-5.8 3-1.2 1.4-2.3 3.8-2 6.1 2.3.2 4.5-1.1 5.8-2.7z" />
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.apple}
        size={size}
        className={className}
        alt="Apple Official Logo"
        fallbackNode={appleSvg}
      />
    );
  }

  // 21. Wipro - Real Official Multi-Colored Signature Logo
  if (norm.includes("wipro")) {
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.wipro}
        size={size}
        className={className}
        alt="Wipro Official Logo"
      />
    );
  }

  // 22. Python Core DSA - Real Official Python Dual Snake Logo
  if (norm.includes("python")) {
    const pythonSvg = (
      <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-label="Python">
        <path fill="#3776AB" d="M24 4C14.7 4 15.3 8 15.3 8l.01 4.19h8.86v1.26H11.8s-5.8-.66-5.8 8.6c0 9.25 5.06 8.94 5.06 8.94h3.02v-4.24s-.16-5.06 4.97-5.06h8.55s4.83.08 4.83-4.69V13.3S33.47 4 24 4zm-2.48 2.6a1.37 1.37 0 11.01 2.74 1.37 1.37 0 01-.01-2.74z"/>
        <path fill="#FFD438" d="M24 44c9.3 0 8.7-4 8.7-4l-.01-4.19h-8.86v-1.26h12.37s5.8.66 5.8-8.6c0-9.25-5.06-8.94-5.06-8.94h-3.02v4.24s.16 5.06-4.97 5.06h-8.55s-4.83-.08-4.83 4.69V34.7S14.53 44 24 44zm2.48-2.6a1.37 1.37 0 11-.01-2.74 1.37 1.37 0 01.01 2.74z"/>
      </svg>
    );
    return (
      <RealLogoImg
        config={OFFICIAL_IMAGE_MAP.python}
        size={size}
        className={className}
        alt="Python Official Logo"
        fallbackNode={pythonSvg}
      />
    );
  }

  // 23. SQL / DBMS Database
  if (norm.includes("sql") || norm.includes("dbms") || norm.includes("database")) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-label="SQL Database">
        <defs>
          <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
        <ellipse cx="32" cy="18" rx="20" ry="6" fill="#38bdf8" />
        <path d="M12 18v10c0 3.3 9 6 20 6s20-2.7 20-6V18" fill="url(#dbGrad)" opacity="0.9" />
        <ellipse cx="32" cy="28" rx="20" ry="6" fill="none" stroke="#e0f2fe" strokeWidth="1" />
        <path d="M12 28v10c0 3.3 9 6 20 6s20-2.7 20-6V28" fill="url(#dbGrad)" opacity="0.95" />
        <ellipse cx="32" cy="38" rx="20" ry="6" fill="none" stroke="#e0f2fe" strokeWidth="1" />
        <path d="M12 38v10c0 3.3 9 6 20 6s20-2.7 20-6V38" fill="url(#dbGrad)" />
        <ellipse cx="32" cy="48" rx="20" ry="6" fill="#0369a1" />
        <rect x="22" y="27" width="20" height="9" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
        <text x="32" y="34" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="7" textAnchor="middle" letterSpacing="0.8">SQL</text>
      </svg>
    );
  }

  // Generic fallback
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "12px",
        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontWeight: "800",
        fontSize: `${Math.round(size * 0.35)}px`,
      }}
      className={className}
    >
      {(name || "EX").slice(0, 2).toUpperCase()}
    </div>
  );
};
