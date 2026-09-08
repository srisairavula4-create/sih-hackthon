import React from 'react';
import { 
  Sparkles, 
  User, 
  Stethoscope, 
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
  userRole, 
  setUserRole, 
  patient, 
  vaidya, 
  onOpenAbha, 
  hasMissingDoc, 
  onShowMissingDocAlert,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Hackathon Tag */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 text-emerald-100 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-800 tracking-tight font-outfit">
                  Ayur<span className="text-emerald-600">Vaidya</span> <span className="text-teal-600">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  SIH 2024
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Intelligent Ayurvedic Case-Taking & Health Records System
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
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
                currentView === 'timeline'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Timeline
            </button>

            <button
              onClick={() => setCurrentView('ai-summary')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'ai-summary'
                  ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              AI Summary
            </button>

            <button
              onClick={() => {
                setUserRole('vaidya');
                setCurrentView('vaidya-review');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentView === 'vaidya-review'
                  ? 'bg-white text-teal-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              Vaidya Portal
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            
            {/* ABHA Badge / Link Button */}
            {patient.isAbhaLinked ? (
              <button
                onClick={onOpenAbha}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
                title="ABHA ID Linked & Verified"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-mono text-[11px] font-semibold">ABHA Verified</span>
              </button>
            ) : (
              <button
                onClick={onOpenAbha}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors shadow-2xs animate-bounce"
                title="Link Ayushman Bharat Digital Health Account"
              >
                <CreditCard className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-[11px] font-semibold">Link ABHA</span>
              </button>
            )}

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

            {/* Role Switcher Toggle */}
            <div className="hidden sm:flex items-center border border-slate-200 bg-slate-50 rounded-xl p-0.5 text-xs">
              <button
                onClick={() => setUserRole('patient')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  userRole === 'patient'
                    ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Patient
              </button>
              <button
                onClick={() => {
                  setUserRole('vaidya');
                  if (currentView === 'dashboard') {
                    setCurrentView('vaidya-review');
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  userRole === 'vaidya'
                    ? 'bg-white text-teal-700 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                Vaidya
              </button>
            </div>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
                {userRole === 'patient' ? 'AS' : 'PJ'}
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <p className="font-semibold text-slate-800">
                  {userRole === 'patient' ? patient.name : vaidya.name}
                </p>
                <p className="text-[10px] text-slate-500">
                  {userRole === 'patient' ? `ID: ${patient.id}` : 'Vaidya Consultant'}
                </p>
              </div>
              <button 
                onClick={onLogout}
                className="text-xs text-slate-400 hover:text-rose-600 ml-1 transition-colors"
                title="Switch persona or sign out"
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
