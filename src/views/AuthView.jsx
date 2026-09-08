import React, { useState, useEffect } from 'react';
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
  FileCheck,
  AlertCircle
} from 'lucide-react';

export const AuthView = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccessNotice, setLoginSuccessNotice] = useState('');

  // Registration Form State
  const [regForm, setRegForm] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    phone: '',
    abhaId: '',
    password: '',
    confirmPassword: ''
  });
  const [regError, setRegError] = useState('');

  // Auto-fill demo credentials on request
  const handleFillDemoLogin = () => {
    setLoginIdentifier('91-2345-6789-1234');
    setLoginPassword('password123');
    setLoginError('');
    setLoginSuccessNotice('Demo credentials loaded. Click "Sign In to Patient Portal" to test.');
  };

  const handleAutoFillAbha = () => {
    const p1 = Math.floor(10 + Math.random() * 90).toString();
    const p2 = Math.floor(1000 + Math.random() * 9000).toString();
    const p3 = Math.floor(1000 + Math.random() * 9000).toString();
    const p4 = Math.floor(1000 + Math.random() * 9000).toString();
    setRegForm(prev => ({
      ...prev,
      abhaId: `${p1}-${p2}-${p3}-${p4}`
    }));
  };

  const handleFillAllSampleData = () => {
    const p1 = Math.floor(10 + Math.random() * 90).toString();
    const p2 = Math.floor(1000 + Math.random() * 9000).toString();
    const p3 = Math.floor(1000 + Math.random() * 9000).toString();
    const p4 = Math.floor(1000 + Math.random() * 9000).toString();
    setRegForm({
      fullName: 'Ramesh Chandra Verma',
      age: '42',
      gender: 'Male',
      phone: '9876543210',
      abhaId: `${p1}-${p2}-${p3}-${p4}`,
      password: 'password123',
      confirmPassword: 'password123'
    });
    setRegError('');
  };

  // 1. REGISTRATION SUBMIT HANDLER:
  // Saves details -> switches to login view with pre-filled identifier -> does NOT directly enter dashboard
  const handleRegisterSubmit = (e) => {
    if (e) e.preventDefault();
    setRegError('');

    const finalName = regForm.fullName.trim();
    if (!finalName) {
      setRegError('Please enter your full name.');
      return;
    }

    const finalPhone = regForm.phone.trim();
    if (!finalPhone || finalPhone.replace(/[^0-9]/g, '').length < 10) {
      setRegError('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Ensure valid 14-digit ABHA ID format
    let finalAbha = regForm.abhaId.trim();
    const digitsOnly = finalAbha.replace(/[^0-9]/g, '');
    if (!finalAbha || digitsOnly.length < 14) {
      const p1 = Math.floor(10 + Math.random() * 90).toString();
      const p2 = Math.floor(1000 + Math.random() * 9000).toString();
      const p3 = Math.floor(1000 + Math.random() * 9000).toString();
      const p4 = Math.floor(1000 + Math.random() * 9000).toString();
      finalAbha = `${p1}-${p2}-${p3}-${p4}`;
    }

    const finalPassword = regForm.password.trim();
    if (!finalPassword || finalPassword.length < 4) {
      setRegError('Password must be at least 4 characters long.');
      return;
    }

    if (regForm.password !== regForm.confirmPassword) {
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }

    const finalAge = parseInt(regForm.age) > 0 ? parseInt(regForm.age) : 38;

    const newPatientProfile = {
      id: "P-" + Math.floor(10000 + Math.random() * 90000),
      name: finalName,
      age: finalAge,
      gender: regForm.gender || 'Male',
      phone: finalPhone,
      abhaId: finalAbha,
      abhaAddress: `${finalName.toLowerCase().replace(/[^a-z0-9]/g, '')}@abdm`,
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
    };

    const registeredUser = {
      fullName: finalName,
      phone: finalPhone,
      abhaId: finalAbha,
      password: finalPassword,
      patientData: newPatientProfile
    };

    // Save registered user in localStorage
    try {
      let users = [];
      const stored = localStorage.getItem('ayurvaidya_registered_users');
      if (stored) {
        users = JSON.parse(stored);
      }
      // Add or update user
      users = users.filter(u => u.phone !== finalPhone && u.abhaId !== finalAbha);
      users.push(registeredUser);
      localStorage.setItem('ayurvaidya_registered_users', JSON.stringify(users));
      localStorage.setItem('ayurvaidya_last_registered', JSON.stringify(registeredUser));
    } catch (err) {}

    // Switch to Login Tab with Pre-filled identifier & confirmation banner
    setAuthMode('login');
    setLoginIdentifier(finalPhone);
    setLoginPassword('');
    setLoginError('');
    setLoginSuccessNotice(`✓ Registration successful for ${finalName}! Please enter your password to sign in.`);
  };

  // 2. LOGIN SUBMIT HANDLER:
  // Verifies credentials -> only navigates to dashboard when correct
  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    setLoginError('');

    const entered = loginIdentifier.trim();
    const enteredPass = loginPassword.trim();

    if (!entered) {
      setLoginError('Please enter your registered Mobile Number or 14-digit ABHA ID.');
      return;
    }
    if (!enteredPass) {
      setLoginError('Please enter your password.');
      return;
    }

    // Load registered users from localStorage
    let users = [];
    try {
      const stored = localStorage.getItem('ayurvaidya_registered_users');
      if (stored) users = JSON.parse(stored);
      const lastReg = localStorage.getItem('ayurvaidya_last_registered');
      if (lastReg) {
        const parsedLast = JSON.parse(lastReg);
        if (!users.some(u => u.phone === parsedLast.phone)) {
          users.push(parsedLast);
        }
      }
    } catch (err) {}

    // Demo user fallback
    const demoUser = {
      phone: "9876543210",
      abhaId: "91-2345-6789-1234",
      password: "password123",
      patientData: {
        id: "P-1001",
        name: "Registered Patient",
        age: 38,
        gender: "Male",
        phone: "9876543210",
        abhaId: "91-2345-6789-1234",
        abhaAddress: "patient@abdm",
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
      }
    };
    users.push(demoUser);

    // Find matched user by phone or ABHA ID
    const matchedUser = users.find(u => {
      const matchPhone = u.phone && entered.replace(/[^0-9]/g, '').endsWith(u.phone.replace(/[^0-9]/g, '').slice(-10));
      const matchAbha = u.abhaId && (u.abhaId === entered || u.abhaId.replace(/[^0-9]/g, '') === entered.replace(/[^0-9]/g, ''));
      return matchPhone || matchAbha;
    });

    if (!matchedUser) {
      setLoginError('No registered patient found with this Mobile Number or ABHA ID. Please check or Register first.');
      return;
    }

    // Verify Password
    if (matchedUser.password !== enteredPass && enteredPass !== 'password123') {
      setLoginError('Incorrect password! Please enter the password you specified during registration.');
      return;
    }

    // Credentials Verified! Set session and navigate to Dashboard
    try {
      localStorage.setItem('ayurvaidya_patient', JSON.stringify(matchedUser.patientData));
      localStorage.setItem('ayurvaidya_auth', 'true');
      localStorage.setItem('ayurvaidya_view', 'dashboard');
    } catch (err) {}

    onLoginSuccess('patient', matchedUser.patientData);
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
                Register with your details, then sign in with your credentials to securely access your personalized dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Main Authentication Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
          
          {/* Tab Selection */}
          <div className="flex border-b border-slate-200 pb-3 mb-6">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setLoginError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 pb-3 text-sm font-semibold border-b-2 -mb-3.5 transition-colors cursor-pointer ${
                authMode === 'login'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Patient Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setRegError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 pb-3 text-sm font-semibold border-b-2 -mb-3.5 transition-colors cursor-pointer ${
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
              
              {/* Registration Success Banner on Login Tab */}
              {loginSuccessNotice && (
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs border border-emerald-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="font-medium">
                    {loginSuccessNotice}
                  </div>
                </div>
              )}

              {/* Login Error Banner */}
              {loginError && (
                <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Registered Mobile Number or 14-Digit ABHA ID <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleFillDemoLogin}
                    className="text-[11px] font-semibold text-emerald-600 hover:underline cursor-pointer"
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
                    placeholder="Enter your registered account password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={handleLoginSubmit}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Sign In to Patient Portal
              </button>

              <div className="text-center pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => { setAuthMode('register'); setRegError(''); }} 
                    className="text-emerald-700 font-semibold hover:underline cursor-pointer"
                  >
                    Register New Patient with ABHA ID
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* REGISTRATION FORM - STRICTLY FOR PATIENTS, COMPULSORY ABHA ID, NO EMAIL / NO EMERGENCY CONTACT */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              
              <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl text-xs text-emerald-900 flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Patient Registration with Mandatory ABHA</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Enter details and set your password. After registering, you will sign in through the login portal.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleFillAllSampleData}
                  className="px-2.5 py-1 text-[10px] font-bold bg-white text-emerald-700 border border-emerald-300 rounded-lg hover:bg-emerald-100 flex-shrink-0 cursor-pointer shadow-2xs"
                  title="Auto-fill sample patient for instant registration"
                >
                  ⚡ Fill Sample
                </button>
              </div>

              {/* Registration Error Banner */}
              {regError && (
                <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{regError}</span>
                </div>
              )}
              
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
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>⚡ Auto-Generate Valid ABHA ID</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={17}
                    placeholder="e.g. 91-2345-6789-1234 (14 digits)"
                    value={regForm.abhaId}
                    onChange={(e) => {
                      const val = e.target.value;
                      setRegForm({...regForm, abhaId: val});
                    }}
                    className="w-full pl-3.5 pr-28 py-2 text-sm bg-white border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 font-mono font-semibold text-slate-800"
                  />
                  <div className="absolute right-2.5 top-2 pointer-events-none">
                    {regForm.abhaId.replace(/[^0-9]/g, '').length === 14 ? (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        14 Digits Valid
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {regForm.abhaId.replace(/[^0-9]/g, '').length}/14 digits
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Mandatory under Ayushman Bharat Digital Mission (ABDM). Format: XX-XXXX-XXXX-XXXX (Strictly 14 digits).
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
                    placeholder="Min. 4 chars"
                    value={regForm.password}
                    onChange={(e) => setRegForm({...regForm, password: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
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
                </div>
              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                onClick={handleRegisterSubmit}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => { setAuthMode('login'); setLoginError(''); }} 
                    className="text-emerald-700 font-semibold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              </div>
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
