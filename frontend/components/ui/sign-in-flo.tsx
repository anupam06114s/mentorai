"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  X,
  UserPlus,
  LogIn,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Plus,
  ArrowLeft,
  Check,
  ShieldCheck,
  ExternalLink,
  Settings,
  RefreshCw
} from "lucide-react";
import { PasswordStrength } from "@/components/ui/password-strength";
import { GradientWave } from "@/components/ui/gradient-wave";

const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
    ? ""
    : "http://127.0.0.1:8000");

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  showToggle?: boolean;
  onToggle?: () => void;
  showPassword?: boolean;
}

const AnimatedFormField: React.FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  showToggle,
  onToggle,
  showPassword
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="space-y-1.5 text-left">
      <label className="block text-xs font-semibold text-slate-200 tracking-wide ml-0.5">
        {label}
      </label>
      <div className="relative group">
        <div
          className="relative overflow-hidden rounded-xl border border-white/15 bg-slate-900/80 transition-all duration-300 ease-in-out focus-within:border-blue-500/80 focus-within:ring-1 focus-within:ring-blue-500/50"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-400">
            {icon}
          </div>
          
          <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent pl-11 pr-12 py-3 text-white placeholder:text-slate-500 focus:outline-none text-base sm:text-sm"
            placeholder={placeholder}
          />

          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {isHovering && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

interface SignInFloProps {
  onLogin?: (user?: { name: string; email: string; avatar_url?: string }) => void;
}

export const Component: React.FC<SignInFloProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Real Google OAuth States
  const [googleClientId, setGoogleClientId] = useState<string>(() => {
    return (
      ((import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string) ||
      localStorage.getItem("mentor_google_client_id") ||
      ""
    );
  });
  const [showClientIdModal, setShowClientIdModal] = useState(false);
  const [clientIdInput, setClientIdInput] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  // Auto-detect Google OAuth 2.0 Redirect Callback (#access_token=... or id_token=...)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash && (hash.includes("access_token=") || hash.includes("id_token="))) {
      setIsGoogleLoading(true);
      setGoogleError(null);

      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      const idToken = params.get("id_token");

      const handleGoogleCallback = async () => {
        try {
          let profileName = "";
          let profileEmail = "";
          let profilePicture = "";

          // Decode Google ID Token if present
          if (idToken) {
            try {
              const base64Url = idToken.split(".")[1];
              const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
              const payload = JSON.parse(window.atob(base64));
              profileName = payload.name || payload.given_name || "";
              profileEmail = payload.email || "";
              profilePicture = payload.picture || "";
            } catch (e) {
              console.warn("Could not decode Google ID token:", e);
            }
          }

          // Fetch user details from Google Userinfo API
          if ((!profileEmail || !profileName) && accessToken) {
            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (res.ok) {
              const data = await res.json();
              profileName = data.name || profileName || data.given_name || "";
              profileEmail = data.email || profileEmail || "";
              profilePicture = data.picture || profilePicture || "";
            }
          }

          if (profileEmail) {
            // Send verified Google user info to backend
            const backendRes = await fetch(`${API_BASE_URL}/auth/google`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: profileName,
                email: profileEmail,
                avatar_url: profilePicture,
              }),
            }).catch(() => null);

            if (backendRes && backendRes.ok) {
              const backendData = await backendRes.json();
              if (backendData.access_token) {
                localStorage.setItem("access_token", backendData.access_token);
              }
            } else if (accessToken) {
              localStorage.setItem("access_token", accessToken);
            }

            // Clean the URL hash
            window.history.replaceState(null, "", window.location.pathname + window.location.search);

            if (onLogin) {
              onLogin({
                name: profileName || profileEmail.split("@")[0],
                email: profileEmail,
                avatar_url: profilePicture,
              });
            }
          } else {
            setGoogleError("Unable to retrieve Google account info from response.");
          }
        } catch (err: any) {
          console.error("Google OAuth callback error:", err);
          setGoogleError(err.message || "Failed to complete Google Sign-In.");
        } finally {
          setIsGoogleLoading(false);
        }
      };

      handleGoogleCallback();
    }
  }, [onLogin]);

  // Auto-load Google Identity Services script if not present
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!(window as any).google?.accounts) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  // Initialize Google One Tap if client ID exists
  useEffect(() => {
    if (typeof window === "undefined" || !googleClientId) return;

    const timer = setTimeout(() => {
      try {
        if ((window as any).google?.accounts?.id) {
          (window as any).google.accounts.id.initialize({
            client_id: googleClientId,
            callback: async (response: any) => {
              if (response.credential) {
                try {
                  const base64Url = response.credential.split(".")[1];
                  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                  const payload = JSON.parse(window.atob(base64));
                  
                  const backendRes = await fetch(`${API_BASE_URL}/auth/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: payload.name || payload.email.split("@")[0],
                      email: payload.email,
                      avatar_url: payload.picture,
                    }),
                  }).catch(() => null);

                  if (backendRes && backendRes.ok) {
                    const data = await backendRes.json();
                    localStorage.setItem("access_token", data.access_token);
                  } else {
                    localStorage.setItem("access_token", response.credential);
                  }

                  if (onLogin) {
                    onLogin({
                      name: payload.name || payload.email.split("@")[0],
                      email: payload.email,
                      avatar_url: payload.picture,
                    });
                  }
                } catch (e) {
                  console.error("One Tap token parse error:", e);
                }
              }
            },
          });
          (window as any).google.accounts.id.prompt();
        }
      } catch (err) {
        console.warn("One Tap initialization:", err);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [googleClientId, onLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail) {
      setFormError("Please enter your registered email address.");
      return;
    }

    if (!trimmedPassword) {
      setFormError("Please enter your password.");
      return;
    }

    if (isSignUp && !trimmedName) {
      setFormError("Please enter your full name.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = isSignUp ? "/api/auth/register" : "/api/auth/login";
      const body = isSignUp
        ? { name: trimmedName, email: trimmedEmail, password: trimmedPassword }
        : { email: trimmedEmail, password: trimmedPassword };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).catch(() => null);

      if (!response) {
        setFormError("Could not reach authentication server. Please check your network or server status.");
        return;
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        setFormError("Backend authentication service is unavailable or returned unexpected HTML. Please verify deployment.");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorDetail =
          errorData?.detail ||
          (isSignUp
            ? "Registration failed. This email may already be registered."
            : "Invalid email or password. Please check your credentials or create an account.");
        setFormError(errorDetail);
        return;
      }

      const data = await response.json();
      if (!data?.access_token || typeof data.access_token !== "string") {
        setFormError("Authentication failed: No valid access token received from server.");
        return;
      }

      // Authentic registered login / registration success
      localStorage.setItem("access_token", data.access_token);
      setFormError(null);

      const loggedUser = data.user || {
        name: trimmedName || trimmedEmail.split("@")[0],
        email: trimmedEmail,
      };

      if (onLogin) {
        onLogin(loggedUser);
      }
    } catch (err: any) {
      setFormError(err?.message || "An unexpected error occurred during sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Launch Authentic Google OAuth Account Chooser (Redirects to https://accounts.google.com/v3/signin/accountchooser)
  const launchGoogleAccountChooser = (activeId: string) => {
    setGoogleError(null);
    setIsGoogleLoading(true);

    // If Google Identity Services TokenClient is available, try native account chooser popup
    if (typeof window !== "undefined" && (window as any).google?.accounts?.oauth2) {
      try {
        const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: activeId,
          scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
          prompt: "select_account",
          callback: async (tokenResponse: any) => {
            if (tokenResponse.error) {
              setGoogleError(tokenResponse.error_description || "Google Sign-In was cancelled.");
              setIsGoogleLoading(false);
              return;
            }

            try {
              const userinfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              });

              if (userinfoRes.ok) {
                const profile = await userinfoRes.json();
                const backendRes = await fetch(`${API_BASE_URL}/auth/google`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: profile.name || profile.given_name,
                    email: profile.email,
                    avatar_url: profile.picture,
                  }),
                }).catch(() => null);

                if (backendRes && backendRes.ok) {
                  const data = await backendRes.json();
                  localStorage.setItem("access_token", data.access_token);
                } else {
                  localStorage.setItem("access_token", tokenResponse.access_token);
                }

                if (onLogin) {
                  onLogin({
                    name: profile.name || profile.given_name || profile.email.split("@")[0],
                    email: profile.email,
                    avatar_url: profile.picture,
                  });
                }
              }
            } catch (err: any) {
              setGoogleError("Unable to retrieve Google user profile.");
            } finally {
              setIsGoogleLoading(false);
            }
          },
        });

        // Opens native Google account picker showing real device accounts
        tokenClient.requestAccessToken({ prompt: "select_account" });
        return;
      } catch (err) {
        console.warn("GIS token client error, falling back to direct redirect:", err);
      }
    }

    // Direct redirect to Google's official account chooser URL
    const redirectUri = window.location.origin + window.location.pathname;
    const scope = encodeURIComponent("openid email profile");
    const nonce = Math.random().toString(36).substring(2);
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      activeId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=token%20id_token&scope=${scope}&prompt=select_account&nonce=${nonce}`;

    window.location.href = googleAuthUrl;
  };

  const handleContinueWithGoogle = () => {
    setGoogleError(null);
    const activeId = googleClientId.trim();

    if (!activeId) {
      setShowClientIdModal(true);
      return;
    }

    launchGoogleAccountChooser(activeId);
  };

  const handleSaveClientIdAndLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = clientIdInput.trim();
    if (!trimmed) return;

    localStorage.setItem("mentor_google_client_id", trimmed);
    setGoogleClientId(trimmed);
    setShowClientIdModal(false);
    launchGoogleAccountChooser(trimmed);
  };

  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center p-3 sm:p-4 py-8 sm:py-12 relative overflow-y-auto">
      {/* Ultra-Smooth Animated WebGL Gradient Wave Background */}
      <GradientWave
        colors={["#030712", "#1e1b4b", "#1d4ed8", "#4f46e5", "#0f172a", "#020617"]}
        noiseSpeed={0.000008}
        noiseFrequency={[0.00012, 0.0006]}
        deform={{ incline: 0.35, noiseAmp: 200, noiseFlow: 3.5 }}
        className="opacity-95"
      />
      <div className="absolute inset-0 bg-background/25 backdrop-blur-[2px] pointer-events-none" />
      <FloatingParticles />
      
      <div className="relative z-10 w-full max-w-[430px] my-auto">
        <div className="bg-slate-950/85 backdrop-blur-xl border border-white/15 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-indigo-950/50">
          
          {/* Top Mentor AI Logo & Branding */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30 border border-white/25">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-slate-900 border border-white/20 rounded-md text-[9px] font-black tracking-wider text-blue-400 shadow-sm">
                  AI
                </div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5">
              Mentor AI <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Aura</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              AI-Powered Career Guidance & Exam Preparation Platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-start gap-2.5 text-rose-300 text-xs shadow-lg shadow-rose-950/40 animate-in fade-in duration-200">
                <AlertCircle size={17} className="shrink-0 mt-0.5 text-rose-400" />
                <span className="font-medium leading-relaxed">{formError}</span>
              </div>
            )}
            {formSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-start gap-2.5 text-emerald-300 text-xs shadow-lg shadow-emerald-950/40 animate-in fade-in duration-200">
                <CheckCircle2 size={17} className="shrink-0 mt-0.5 text-emerald-400" />
                <span className="font-medium leading-relaxed">{formSuccess}</span>
              </div>
            )}
            {isSignUp && (
              <AnimatedFormField
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={<User size={18} />}
              />
            )}

            <AnimatedFormField
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />

            <AnimatedFormField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
              showToggle
              onToggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            {/* Password Strength Widget (Active during sign up) */}
            {isSignUp && (
              <div className="rounded-xl border border-white/15 bg-slate-900/60 p-3 backdrop-blur-sm">
                <div className="mb-1.5 text-xs font-semibold text-slate-200">
                  Password Strength Indicator
                </div>
                <PasswordStrength value={password} />
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-900 border-white/20 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span className="text-xs text-slate-300">Remember me</span>
              </label>
              
              {!isSignUp && (
                <button
                  type="button"
                  className="text-xs text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base text-white transition-all duration-200 ease-in-out cursor-pointer overflow-hidden shadow-xl shadow-blue-600/35 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.99] border border-white/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className={`flex items-center justify-center gap-2 transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                {isSignUp ? (
                  <>
                    <UserPlus size={18} className="text-white" />
                    <span className="text-white tracking-wide">Create Account</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} className="text-white" />
                    <span className="text-white tracking-wide">Sign In</span>
                  </>
                )}
              </span>
              
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            </button>
          </form>

          {/* Social Continue with Google */}
          <div className="mt-5">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="px-3 bg-slate-950 text-slate-400 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Official Google Button */}
            <button
              type="button"
              disabled={isGoogleLoading}
              onClick={handleContinueWithGoogle}
              className="w-full relative group flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-white/20 bg-slate-900/95 hover:bg-slate-800 hover:border-blue-500/60 text-white text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <GoogleIcon className="w-5 h-5 shrink-0" />
              )}
              <span>{isGoogleLoading ? "Connecting Google..." : "Continue with Google"}</span>
            </button>

            {googleError && (
              <div className="mt-3 p-2.5 rounded-lg bg-rose-950/50 border border-rose-500/30 flex items-start gap-2 text-rose-300 text-xs">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                <span>{googleError}</span>
              </div>
            )}
          </div>

          {/* Bottom Switcher Helper */}
          <div className="mt-5 text-center">
            <p className="text-xs text-slate-300">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormError(null);
                  setFormSuccess(null);
                }}
                className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 ml-1 cursor-pointer transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Google OAuth Client ID Setup Modal (Prompted if Client ID not configured) */}
      {showClientIdModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-[#202124] text-white border border-white/15 w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-7 animate-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <GoogleIcon className="w-6 h-6 shrink-0" />
                <div>
                  <h3 className="text-base font-semibold text-white">Google Sign-In</h3>
                  <p className="text-xs text-slate-400">Official Google Account Chooser</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowClientIdModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs leading-relaxed text-slate-300">
                Google requires your OAuth Client ID to open the official Google Account Chooser (<span className="text-blue-400 font-mono text-[11px]">https://accounts.google.com/v3/signin/accountchooser</span>) and fetch accounts logged into this device:
              </p>

              <form onSubmit={handleSaveClientIdAndLaunch} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Google OAuth Client ID
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="xxxx.apps.googleusercontent.com"
                    value={clientIdInput}
                    onChange={(e) => setClientIdInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#131314] border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!clientIdInput.trim() || isGoogleLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <GoogleIcon className="w-4 h-4 shrink-0" />
                  <span>Launch Google Account Chooser</span>
                </button>
              </form>

              <div className="pt-2 text-[11px] text-slate-400 leading-relaxed border-t border-white/10">
                💡 Don't have one yet? Get it in 1 minute from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-blue-400 underline">Google Cloud Console</a> with Authorized origin <code className="text-slate-300 bg-white/10 px-1 py-0.5 rounded">http://localhost:5173</code>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
