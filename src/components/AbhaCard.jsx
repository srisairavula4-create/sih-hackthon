import React from 'react';
import { ShieldCheck, QrCode, CheckCircle, Download, Printer, ExternalLink, RefreshCw } from 'lucide-react';

export const AbhaCard = ({ patient, onSyncHealthRecords, isSyncing = false }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 max-w-xl mx-auto transition-all">
      {/* Official ABDM Header Header Strip */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white p-4 rounded-xl shadow-xs relative overflow-hidden mb-5">
        {/* Subtle decorative background pattern */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-4 pointer-events-none">
          <ShieldCheck className="w-32 h-32 text-white" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs border border-white/30 flex items-center justify-center font-bold text-base text-white">
              🇮🇳
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
                National Health Authority (NHA) • Govt. of India
              </p>
              <h3 className="text-base font-extrabold tracking-tight">
                Ayushman Bharat Health Account (ABHA)
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 bg-emerald-500/30 text-emerald-100 border border-emerald-300/40 text-[10px] font-bold px-2 py-0.5 rounded-md">
              <CheckCircle className="w-3 h-3 text-emerald-300" />
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center mb-6">
        {/* Photo + Status */}
        <div className="flex flex-col items-center justify-center sm:border-r sm:border-slate-100 sm:pr-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-100 border-2 border-emerald-400/60 p-1 shadow-inner flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                alt="Patient Profile" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-800 mt-2 text-center">{patient.name}</p>
          <p className="text-[10px] text-slate-500 font-mono">B.Group: {patient.bloodGroup}</p>
        </div>

        {/* Central Info Column */}
        <div className="space-y-2.5 sm:col-span-2">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ABHA Number</p>
            <p className="text-lg font-mono font-extrabold text-slate-900 tracking-wider">
              {patient.abhaId || "91-2345-6789-1234"}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ABHA Address (PHR)</p>
            <p className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md inline-block border border-emerald-100">
              {patient.abhaAddress || "aarav.sharma@abdm"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-[10px] text-slate-400">Gender / Age</p>
              <p className="font-semibold text-slate-700">{patient.gender}, {patient.age} Yrs</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Mobile Linked</p>
              <p className="font-mono text-slate-700 font-semibold">{patient.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Hologram Strip & QR Code */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200/70 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <QrCode className="w-9 h-9 text-slate-700" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-800">Scan for ABDM Health Record Fetch</p>
            <p className="text-[10px] text-slate-500">
              Interoperable with Ayush Grid, EHR & National Health Repositories
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-[10px] font-semibold text-teal-800 bg-teal-50/80 px-2.5 py-1.5 rounded-lg border border-teal-200/60">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>HIPAA & ABDM Compliant</span>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
        <button
          onClick={onSyncHealthRecords}
          disabled={isSyncing}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing ABDM Records...' : 'Pull ABDM Health Records'}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Card
          </button>
          <button
            onClick={() => alert("Digital ABHA Card downloaded in official PDF format.")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
