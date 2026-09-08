import React from 'react';
import { 
  Sparkles, 
  User, 
  ShieldCheck, 
  Bell, 
  FileText, 
  Clock, 
  UploadCloud, 
  LayoutDashboard,
  CreditCard,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const Navbar = ({ 
  currentView, 
  setCurrentView, 
  patient, 
  onOpenAbha, 
  hasMissingDoc, 
  onShowMissingDocAlert,
  onLogout
}) => {
  const patientInitials = patient.name 
    ? patient.name.trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() 
    : 'PT';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-2.5 sm:py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[3.25rem]">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => setCurrentView('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-100 animate-pulse" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight font-outfit">
                  Ayur<span className="text-emerald-600">Vaidya</span> <span className="text-teal-600">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                  Patient Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden xl:block leading-tight mt-0.5">
                Ayurvedic Case-Taking & Longitudinal ABHA Health Records
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Patient-Only) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </button>

            <button
              onClick={() => setCurrentView('case-taking')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'case-taking'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Case Intake
            </button>

            <button
              onClick={() => setCurrentView('upload-records')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'upload-records'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              AI OCR Upload
            </button>

            <button
              onClick={() => setCurrentView('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'timeline' || currentView === 'ai-summary'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Timeline
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            
            {/* Compulsory ABHA Badge */}
            <button
              onClick={onOpenAbha}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-2xs"
              title="Compulsory ABHA ID Linked to ABDM Records"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="font-mono text-[11px] font-bold">ABHA: {patient.abhaId}</span>
            </button>

            {/* Notification Bell (with missing doc alert) */}
            <button
              onClick={onShowMissingDocAlert}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              title={hasMissingDoc ? "1 Pending Medical Document Alert" : "Notifications"}
            >
              <Bell className="w-4 h-4" />
              {hasMissingDoc && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Patient Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs flex-shrink-0">
                {patientInitials}
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <p className="font-semibold text-slate-800 truncate max-w-[120px]">
                  {patient.name}
                </p>
                <p className="text-[10px] text-emerald-700 font-medium">
                  ABDM Verified
                </p>
              </div>
              <button 
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-rose-600 ml-1 transition-colors px-1 py-0.5"
                title="Sign out of patient portal"
              >
                Logout
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
