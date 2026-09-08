import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle, 
  KeyRound, 
  Phone,
  Sparkles
} from 'lucide-react';
import { AbhaCard } from '../components/AbhaCard';

export const AbhaLinkModal = ({ 
  patient, 
  isOpen, 
  onClose, 
  onLinkSuccess, 
  onSyncAbdmRecords 
}) => {
  const [step, setStep] = useState(patient.isAbhaLinked ? 3 : 1); // 1: Input, 2: OTP, 3: Verified Card
  const [abhaInput, setAbhaInput] = useState(patient.abhaId || '91-2345-6789-1234');
  const [otpInput, setOtpInput] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let interval = null;
    if (step === 2 && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  if (!isOpen) return null;

  const handleRequestOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!abhaInput.trim() || abhaInput.replace(/[^0-9]/g, '').length < 14) {
      setErrorMessage('Please enter a valid 14-digit ABHA ID number.');
      return;
    }
    setStep(2);
    setOtpTimer(30);
    // Auto fill realistic sample OTP after 1 second for seamless review!
    setTimeout(() => {
      setOtpInput('749201');
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!otpInput || otpInput.length < 6) {
      setErrorMessage('Please enter the 6-digit OTP received on linked mobile.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
      onLinkSuccess({
        ...patient,
        isAbhaLinked: true,
        abhaId: abhaInput
      });
    }, 1500);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onSyncAbdmRecords();
      alert("ABDM Records successfully synchronized! 2 historical diagnostic reports imported into your Medical Timeline.");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 animate-scaleUp relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Ayushman Bharat Health Account (ABHA) Linker
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                ABDM Portal
              </span>
            </div>
            <p className="text-xs text-slate-500">
              National Health Authority (NHA) certified digital health repository connection
            </p>
          </div>
        </div>

        {/* STEP 1: ENTER ABHA NUMBER */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4 pt-2">
            <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 text-xs text-teal-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                Why link your ABHA Health ID?
              </p>
              <p className="text-slate-600">
                Enables interoperable exchange of your Ayurvedic case histories, diagnostic lab panels, and panchakarma discharge summaries across all hospitals in India.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Enter 14-Digit ABHA Number or ABHA PHR Address
              </label>
              <input
                type="text"
                value={abhaInput}
                onChange={(e) => setAbhaInput(e.target.value)}
                placeholder="e.g. 91-2345-6789-1234 or aarav.sharma@abdm"
                className="w-full px-4 py-3 text-sm font-mono bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bold tracking-wider"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Demo default prefilled for instant testing. Click below to generate simulated OTP.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm shadow-teal-600/25"
              >
                Generate Simulated OTP
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: SIMULATED OTP VERIFICATION */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-700" />
                OTP Sent to Aadhaar/ABHA Linked Mobile
              </p>
              <p className="text-slate-600">
                A 6-digit one-time password has been dispatched to linked number <strong>+91 98765-XXXXX</strong>.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Enter 6-Digit OTP
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  {otpTimer > 0 ? `Resend in ${otpTimer}s` : (
                    <button type="button" onClick={() => setOtpTimer(30)} className="text-teal-600 font-semibold hover:underline">
                      Resend OTP
                    </button>
                  )}
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="749201"
                  className="w-full px-4 py-3 text-center text-lg font-mono font-bold tracking-widest bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <p className="text-[11px] text-emerald-700 mt-1 font-medium text-center">
                ✓ Auto-filled demo OTP for rapid evaluation
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={isVerifying}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/25"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Verifying with ABDM Gateway...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Verify & Display ABHA Card
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: DISPLAY OFFICIAL DIGITAL ABHA CARD */}
        {step === 3 && (
          <div className="space-y-4 pt-1 animate-fadeIn">
            <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-900">ABHA Account Successfully Linked!</p>
                  <p className="text-[11px] text-emerald-700">Digital Health Card issued under Ayushman Bharat Digital Mission</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-800">
                ACTIVE
              </span>
            </div>

            {/* Official ABHA Card Render */}
            <AbhaCard 
              patient={patient} 
              onSyncHealthRecords={handleSync}
              isSyncing={isSyncing}
            />

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Done & Return to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
