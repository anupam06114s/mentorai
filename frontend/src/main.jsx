import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import { dark } from '@clerk/themes'
import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_cXVpY2stc2tpbmstOTQ2MC5jbGVyay5hY2NvdW50cy5kZXYk";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#4f46e5',
          colorBackground: '#020617',
          colorInputBackground: '#0f172a',
          colorInputText: '#ffffff',
          colorText: '#ffffff',
          colorTextSecondary: '#94a3b8',
          colorTextOnPrimaryBackground: '#ffffff',
          borderRadius: '1rem',
          fontFamily: 'inherit',
        },
        elements: {
          modalBackdrop: 'bg-black/80 backdrop-blur-md',
          modalContent: 'bg-slate-950/95 border border-white/20 rounded-3xl shadow-2xl shadow-indigo-950/90 text-white',
          card: 'bg-slate-950/95 border border-white/20 rounded-3xl shadow-2xl shadow-indigo-950/90 text-white',
          headerTitle: 'text-white font-extrabold text-xl tracking-tight',
          headerSubtitle: 'text-slate-400 text-xs',
          formButtonPrimary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl border border-white/20 shadow-xl shadow-indigo-600/35 transition-all duration-200',
          socialButtonsBlockButton: 'bg-slate-900 border border-white/20 text-white hover:bg-slate-800 hover:border-indigo-500/50 rounded-xl transition-all duration-200',
          socialButtonsBlockButtonText: 'text-white font-semibold',
          formFieldLabel: 'text-slate-200 font-semibold text-xs',
          formFieldInput: 'bg-slate-900 border border-white/20 text-white placeholder-slate-500 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
          footerActionLink: 'text-blue-400 hover:text-blue-300 font-semibold',
          dividerLine: 'bg-white/15',
          dividerText: 'text-slate-400 text-xs',
          identityPreview: 'bg-slate-900 border border-white/20 rounded-xl text-white',
          identityPreviewText: 'text-white font-medium',
          otpCodeFieldInput: 'bg-slate-900 border border-white/30 text-white font-bold text-xl rounded-xl text-center',
        }
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
