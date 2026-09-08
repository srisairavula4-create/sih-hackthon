import React from 'react';
import { AlertCircle, UploadCloud, Clock, X, CheckCircle2 } from 'lucide-react';

export const MissingDocBanner = ({ onUploadNow, onRemindLater, onClose }) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-amber-50/70 to-emerald-50/50 border border-amber-200/80 rounded-2xl p-4 shadow-sm mb-6 transition-all animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100/80 text-amber-800 rounded-xl mt-0.5 sm:mt-0 flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md">
                Missing Document Notice
              </span>
              <span className="text-xs text-amber-800 font-medium">
                Clinical Correlation Alert
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-800 mt-1">
              Glycated Hemoglobin (HbA1c) & Fasting Lipid Profile Pending
            </p>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
              Based on the patient's reported symptoms of excessive thirst (*Pipasa*) and metabolic lethargy (*Alasya*), recent fasting biochemical markers are needed to validate the Ayurvedic Dosha-Dushya assessment.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onRemindLater}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Remind Me Later
          </button>
          
          <button
            onClick={onUploadNow}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Upload Now
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';
  const isWarning = type === 'warning';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border shadow-lg shadow-slate-900/10 transition-all animate-slideUp">
      {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
      {isWarning && <AlertCircle className="w-5 h-5 text-amber-600" />}
      {!isSuccess && !isWarning && <CheckCircle2 className="w-5 h-5 text-teal-600" />}
      
      <p className="text-xs font-medium text-slate-800">{message}</p>
      
      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
