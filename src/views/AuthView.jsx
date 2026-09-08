import React, { useState } from 'react';
import { Sparkles, Shield, User, Stethoscope, Lock, Phone, Mail, ArrowRight, CheckCircle2, HeartPulse, UserPlus, LogIn } from 'lucide-react';

export const AuthView = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('patient'); // 'patient' | 'vaidya'
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('aarav.sharma@example.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');

  // Registration Form State
  const [regForm, setRegForm] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    abhaNumber: '',
    emergencyContact: '',
    password: '',
    confirmPassword: ''
  });
  const [regErrors, setRegErrors] = useState({});

  const handleQuickPatientLogin = () => {
    onLoginSuccess('patient', {
      id: "P-98421",
      name: "Aarav Sharma",
      age: 38,
      gender: "Male",
      phone: "+91 98765 43210",
      email: "aarav.sharma@example.com",
      abhaId: "91-2345-6789-1234",
      abhaAddress: "aarav.sharma@abdm",
      isAbhaLinked: false,
      bloodGroup: "B+"
    });
  };

  const handleQuickVaidyaLogin = () => {
    onLoginSuccess('vaidya', {
      id: "DOC-AYU-108",
      name: "Dr. Priyadarshini Joshi",
      qualification: "BAMS, MD (Ayurveda - Kayachikitsa)",
      regNumber: "AYU-MH-2018-0924",
      hospital: "National Institute of Ayurveda & AyurVaidya AI Research Wing"
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your mobile number, email, or ABHA ID.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your password.');
      return;
    }

    if (selectedRole === 'vaidya') {
      handleQuickVaidyaLogin();
    } else {
      handleQuickPatientLogin();
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!regForm.fullName.trim()) errors.fullName = 'Full name is required';
    if (!regForm.age || parseInt(regForm.age) <= 0 || parseInt(regForm.age) > 120) {
      errors.age = 'Please enter a valid age (1-120)';
    }
    if (!regForm.phone.trim() || regForm.phone.length < 10) {
      errors.phone = 'Valid 10-digit mobile number required';
    }
    if (!regForm.email.trim() || !regForm.email.includes('@')) {
      errors.email = 'Valid email address required';
    }
    if (!regForm.emergencyContact.trim()) {
      errors.emergencyContact = 'Emergency contact person & phone required';
    }
    if (!regForm.password || regForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (regForm.password !== regForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    // Success registration
    onLoginSuccess('patient', {
      id: "P-" + Math.floor(10000 + Math.random() * 90000),
      name: regForm.fullName,
      age: parseInt(regForm.age),
      gender: regForm.gender,
      phone: regForm.phone,
      email: regForm.email,
      abhaId: regForm.abhaNumber || "91-8842-1092-3847",
      abhaAddress: `${regForm.fullName.toLowerCase().replace(/\s+/g, '')}@abdm`,
      isAbhaLinked: !!regForm.abhaNumber,
      bloodGroup: "O+",
      emergencyContact: regForm.emergencyContact
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 to-emerald-50/30 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/25 mb-4">
          <Sparkles className="w-8 h-8 text-emerald-100" />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-outfit">
            Ayur<span className="text-emerald-600">Vaidya</span> <span className="text-teal-600">AI</span>
          </h2>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
            SIH Prototype
          </span>
        </div>
        <p className="text-sm text-slate-600 max-w-sm mx-auto">
          Intelligent Classical Ayurvedic Case-Taking, Multimodal Record Extraction & ABDM Integration
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        
        {/* Quick Demo Test-Drive Banner */}
        <div className="bg-white/90 border border-emerald-200 rounded-2xl p-4 shadow-sm mb-6 backdrop-blur-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              1-Click Hackathon Demo Mode
            </span>
            <span className="text-[10px] font-medium text-slate-500">Instant Access</span>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            Select a pre-populated persona to test the complete end-to-end clinical workflow without typing:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleQuickPatientLogin}
              className="flex items-center gap-2.5 p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Patient: Aarav Sharma</p>
                <p className="text-[10px] text-emerald-700">T2DM, Pitta-Kapha Intake</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleQuickVaidyaLogin}
              className="flex items-center gap-2.5 p-2.5 rounded-xl border border-teal-200 bg-teal-50/70 hover:bg-teal-100 text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Vaidya: Dr. P. Joshi</p>
                <p className="text-[10px] text-teal-700">MD (Ayu), Review Portal</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-teal-600 ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Card with Tabs */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* Tab Selection */}
          <div className="flex border-b border-slate-200 pb-3 mb-6">
            <button
              onClick={() => { setAuthMode('login'); setLoginError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 pb-3 text-sm font-semibold border-b-2 -mb-3.5 transition-colors ${
                authMode === 'login'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setRegErrors({}); }}
              className={`flex-1 flex items-center justify-center gap-2 pb-3 text-sm font-semibold border-b-2 -mb-3.5 transition-colors ${
                authMode === 'register'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              New Patient Registration
            </button>
          </div>

          {/* LOGIN FORM */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Role Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl mb-4 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedRole('patient')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    selectedRole === 'patient'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Patient Login
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('vaidya')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    selectedRole === 'vaidya'
                      ? 'bg-white text-teal-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Doctor / Vaidya Login
                </button>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-200">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number / Email / ABHA ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. 9876543210 or aarav@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("For demo purposes, use password123 or 1-Click Demo buttons above."); }} className="text-[11px] text-emerald-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-emerald-600/30 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In to System
              </button>

              <div className="text-center pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  New to AyurVaidya AI?{' '}
                  <button 
                    type="button" 
                    onClick={() => setAuthMode('register')} 
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Register your Patient Case
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra Verma"
                  value={regForm.fullName}
                  onChange={(e) => setRegForm({...regForm, fullName: e.target.value})}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                {regErrors.fullName && <p className="text-[11px] text-rose-600 mt-0.5">{regErrors.fullName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 42"
                    value={regForm.age}
                    onChange={(e) => setRegForm({...regForm, age: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  {regErrors.age && <p className="text-[11px] text-rose-600 mt-0.5">{regErrors.age}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={regForm.gender}
                    onChange={(e) => setRegForm({...regForm, gender: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={regForm.phone}
                    onChange={(e) => setRegForm({...regForm, phone: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  {regErrors.phone && <p className="text-[11px] text-rose-600 mt-0.5">{regErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={regForm.email}
                    onChange={(e) => setRegForm({...regForm, email: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  {regErrors.email && <p className="text-[11px] text-rose-600 mt-0.5">{regErrors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  14-Digit ABHA ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 91-2345-6789-1234 (Can link later)"
                  value={regForm.abhaNumber}
                  onChange={(e) => setRegForm({...regForm, abhaNumber: e.target.value})}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Emergency Contact (Name & Phone) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Verma (Spouse) - 9876543211"
                  value={regForm.emergencyContact}
                  onChange={(e) => setRegForm({...regForm, emergencyContact: e.target.value})}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                {regErrors.emergencyContact && <p className="text-[11px] text-rose-600 mt-0.5">{regErrors.emergencyContact}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Min. 6 chars"
                    value={regForm.password}
                    onChange={(e) => setRegForm({...regForm, password: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  {regErrors.password && <p className="text-[11px] text-rose-600 mt-0.5">{regErrors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat password"
                    value={regForm.confirmPassword}
                    onChange={(e) => setRegForm({...regForm, confirmPassword: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                  {regErrors.confirmPassword && <p className="text-[11px] text-rose-600 mt-0.5">{regErrors.confirmPassword}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-emerald-600/30 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <UserPlus className="w-4 h-4" />
                Complete Registration & Open Dashboard
              </button>
            </form>
          )}

        </div>

        {/* Footer Security Badges */}
        <div className="flex items-center justify-center gap-6 mt-6 text-slate-400 text-xs">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            ABDM Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
            AYUSH Ministry Aligned
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            256-Bit SSL Encrypted
          </span>
        </div>

      </div>

    </div>
  );
};
