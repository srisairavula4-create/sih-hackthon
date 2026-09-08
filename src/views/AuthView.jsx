import React, { useState } from 'react';
import { 
  Sparkles, 
  Shield, 
  User, 
  Lock, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  HeartPulse, 
  UserPlus, 
  LogIn, 
  CreditCard,
  KeyRound,
  FileCheck
} from 'lucide-react';

export const AuthView = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Registration Form State (email and emergencyContact removed; abhaId is COMPULSORY)
  const [regForm, setRegForm] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    phone: '',
    abhaId: '',
    password: '',
    confirmPassword: ''
  });
  const [regErrors, setRegErrors] = useState({});

  const handleFillDemoLogin = () => {
    setLoginIdentifier('91-2345-6789-1234');
    setLoginPassword('password123');
    setLoginError('');
  };

  const handleAutoFillAbha = () => {
    // Generate a realistic 14-digit ABHA ID
    const random10 = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const formatted = `91-${random10.slice(0, 4)}-${random10.slice(4, 8)}-${random10.slice(8, 12) || '1234'}`;
    setRegForm(prev => ({
      ...prev,
      abhaId: formatted
    }));
    if (regErrors.abhaId) {
      setRegErrors(prev => ({ ...prev, abhaId: '' }));
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your mobile number or 14-digit ABHA ID.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Please enter your password.');
      return;
    }

    const cleaned = loginIdentifier.trim();
    const isAbhaFormat = cleaned.includes('-') || cleaned.replace(/[^0-9]/g, '').length >= 14;
    const resolvedAbha = isAbhaFormat ? cleaned : "91-2345-6789-1234";

    const username = loginIdentifier.replace(/[^a-zA-Z]/g, ' ').trim() || `Patient ${cleaned.slice(-4)}`;
    const formattedName = username ? username.charAt(0).toUpperCase() + username.slice(1) : "Registered Patient";

    onLoginSuccess('patient', {
      id: "P-" + Math.floor(10000 + Math.random() * 90000),
      name: formattedName,
      age: 38,
      gender: "Male",
      phone: cleaned.replace(/[^0-9]/g, '').slice(-10) || "9876543210",
      abhaId: resolvedAbha,
      abhaAddress: `${formattedName.toLowerCase().replace(/[^a-z0-9]/g, '')}@abdm`,
      isAbhaLinked: true,
      bloodGroup: "B+",
      prakriti: "Pitta-Kapha",
      vikriti: "Kapha-Vataja (Ama-yukta)",
      vitals: {
        bp: "128/82 mmHg",
        pulse: "74 bpm",
        weight: "74 kg",
        height: "172 cm",
        bloodSugarFasting: "138 mg/dL",
        lastRecorded: "Today"
      }
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!regForm.fullName.trim()) errors.fullName = 'Full name is required';
    
    if (!regForm.age || parseInt(regForm.age) <= 0 || parseInt(regForm.age) > 120) {
      errors.age = 'Please enter a valid age (1-120)';
    }

    const digitsOnlyPhone = regForm.phone.replace(/[^0-9]/g, '');
    if (!regForm.phone.trim() || digitsOnlyPhone.length < 10) {
      errors.phone = 'Valid 10-digit mobile number required';
    }

    // MANDATORY COMPULSORY ABHA ID VALIDATION
    const digitsOnlyAbha = regForm.abhaId.replace(/[^0-9]/g, '');
    if (!regForm.abhaId.trim()) {
      errors.abhaId = 'ABHA ID is compulsory! Every patient record must be linked to a valid ABHA ID.';
    } else if (digitsOnlyAbha.length < 14) {
      errors.abhaId = `ABHA ID must have 14 digits (currently ${digitsOnlyAbha.length} digits). Format: XX-XXXX-XXXX-XXXX`;
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

    // Successful registration with compulsory ABHA ID permanently linked
    onLoginSuccess('patient', {
      id: "P-" + Math.floor(10000 + Math.random() * 90000),
      name: regForm.fullName.trim(),
      age: parseInt(regForm.age),
      gender: regForm.gender,
      phone: regForm.phone.trim(),
      abhaId: regForm.abhaId.trim(),
      abhaAddress: `${regForm.fullName.toLowerCase().replace(/[^a-z0-9]/g, '')}@abdm`,
      isAbhaLinked: true,
      bloodGroup: "B+",
      prakriti: "Pitta-Kapha",
      vikriti: "Kapha-Vataja (Ama-yukta)",
      vitals: {
        bp: "128/82 mmHg",
        pulse: "74 bpm",
        weight: "72 kg",
        height: "172 cm",
        bloodSugarFasting: "136 mg/dL",
        lastRecorded: "Today"
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/40 to-emerald-50/30 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6 pt-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/25 mb-3">
          <Sparkles className="w-7 h-7 text-emerald-100" />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-1 whitespace-nowrap">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-outfit">
            Ayur<span className="text-emerald-600">Vaidya</span> <span className="text-teal-600">AI</span>
          </h2>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
            Patient Portal
          </span>
        </div>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          AI-Powered Classical Ayurvedic Case-Taking, Medical Timeline & Compulsory ABDM ABHA Records Integration
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        
        {/* Compulsory ABHA Architecture Banner */}
        <div className="bg-white/90 border border-emerald-200/90 rounded-2xl p-4 shadow-xs mb-5 backdrop-blur-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Compulsory ABHA ID Integration</span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-semibold">Mandatory</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                All case sheets, lab reports, and Ayurvedic prescriptions are permanently linked to the patient's 14-digit ABHA ID.
              </p>
            </div>
          </div>
        </div>

        {/* Main Authentication Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
          
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
              Patient Sign In
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

          {/* LOGIN FORM (PATIENT ONLY) */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {loginError && (
                <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-200">
                  {loginError}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Mobile Number or 14-Digit ABHA ID <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleFillDemoLogin}
                    className="text-[11px] font-semibold text-emerald-600 hover:underline"
                  >
                    ⚡ Demo Quick-Fill
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. 9876543210 or 91-2345-6789-1234"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Default demo: password123
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In to Patient Portal
              </button>

              <div className="text-center pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => setAuthMode('register')} 
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Register New Patient with ABHA ID
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* REGISTRATION FORM - STRICTLY FOR PATIENTS, COMPULSORY ABHA ID, NO EMAIL / NO EMERGENCY CONTACT */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              
              <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Patient Registration with Mandatory ABHA Linkage</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Your 14-digit ABHA ID is compulsory. All clinical case histories, lab scans, and dietary summaries will be strictly governed by your ABHA ID.
                  </p>
                </div>
              </div>
              
              {/* Full Name */}
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

              {/* Age & Gender */}
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

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  10-Digit Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={regForm.phone}
                  onChange={(e) => setRegForm({...regForm, phone: e.target.value})}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                />
                {regErrors.phone && <p className="text-[11px] text-rose-600 mt-0.5">{regErrors.phone}</p>}
              </div>

              {/* 14-DIGIT ABHA ID (COMPULSORY / MANDATORY) */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-300">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                    <span>14-Digit ABHA ID (Compulsory)</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoFillAbha}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1"
                  >
                    <span>⚡ Auto-Generate Valid ABHA ID</span>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="e.g. 91-2345-6789-1234 (14 digits)"
                  value={regForm.abhaId}
                  onChange={(e) => setRegForm({...regForm, abhaId: e.target.value})}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 font-mono font-semibold text-slate-800"
                />
                {regErrors.abhaId && <p className="text-[11px] text-rose-600 font-semibold mt-1">{regErrors.abhaId}</p>}
                <p className="text-[10px] text-slate-500 mt-1">
                  Mandatory under Ayushman Bharat Digital Mission (ABDM). All patient records are strictly linked through this ID.
                </p>
              </div>

              {/* Password & Confirm Password */}
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
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <UserPlus className="w-4 h-4" />
                Register & Link Mandatory ABHA ID
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
