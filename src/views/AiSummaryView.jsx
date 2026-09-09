import React, { useState } from 'react';
import { 
  Sparkles, 
  Stethoscope, 
  FileText, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { AyurvedicCaseSummaryCard } from '../components/AyurvedicCaseSummaryCard';
import { INITIAL_AI_SUMMARY } from '../types/data';

export const AiSummaryView = ({ 
  aiSummary, 
  patient, 
  foodIntake,
  onNavigateToReview,
  onNavigateToCase,
  isEmbedded = false
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Merge provided aiSummary with comprehensive INITIAL_AI_SUMMARY fallbacks
  const summary = {
    ...INITIAL_AI_SUMMARY,
    ...(aiSummary || {}),
    stomachSummary: { 
      ...INITIAL_AI_SUMMARY.stomachSummary, 
      ...((aiSummary && aiSummary.stomachSummary) || {}) 
    },
    chestSummary: { 
      ...INITIAL_AI_SUMMARY.chestSummary, 
      ...((aiSummary && aiSummary.chestSummary) || {}) 
    },
    conflicts: (aiSummary?.conflicts?.length)
      ? aiSummary.conflicts
      : INITIAL_AI_SUMMARY.conflicts
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className={`space-y-6 animate-fadeIn ${isEmbedded ? 'w-full' : 'max-w-5xl mx-auto pb-12'}`}>
      
      {/* Top Banner */}
      {!isEmbedded && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none">
            <Sparkles className="w-48 h-48 text-white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-xs text-white border border-white/30">
                  AI Multimodal Synthesis
                </span>
                <span className="text-xs text-emerald-100">
                  Generated: {summary.generatedAt || 'Today, 10:45 AM'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight font-outfit">
                Comprehensive Ayurvedic Clinical Summary & Case Intake
              </h1>
              <p className="text-xs text-emerald-100 mt-1 max-w-2xl">
                Synthesizing Patient Intake, Diagnostic Reports, and Longitudinal ABDM Health Records
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-xs transition-all ${
                  isPlayingAudio
                    ? 'bg-white text-emerald-800 ring-2 ring-white/80 shadow-sm animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
                title="Listen to AI Ayurvedic Clinical Case Readout"
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4 text-emerald-700" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlayingAudio ? 'Pause Narration' : 'Listen Readout'}</span>
              </button>

              <button
                onClick={onNavigateToCase || onNavigateToReview}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-emerald-800 hover:bg-emerald-50 shadow-md shadow-emerald-900/20 transition-all cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-emerald-700" />
                Vaidya Station
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Synthesis Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
            <FileText className="w-4 h-4" />
          </span>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Holistic Clinical Overview & Bridge Summary
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {summary.synthesisOverview || 'Comprehensive dual condition clinical evaluation and Ayurvedic synthesis.'}
        </p>
      </div>

      {/* REFRESHED NOTIFICATION BANNER (IF NEW REPORT PROCESSED) */}
      {summary.lastRefreshedAt && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xs flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-200 animate-pulse flex-shrink-0" />
            <div>
              <p className="text-xs font-black uppercase tracking-wider">
                AI Clinical Summary Automatically Re-Processed & Refreshed
              </p>
              <p className="text-xs text-emerald-100">
                Merged new clinical entities from <strong className="text-white underline">{summary.latestUpdatedDoc || 'Uploaded Document'}</strong> at {summary.lastRefreshedAt}. All historical sources preserved.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30 font-bold">
            ✓ Synchronized
          </span>
        </div>
      )}

      {/* CLINICAL VARIANCE & CONFLICT REGISTRY (NO DATA OVERWRITTEN) */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Clinical Variance & Document Conflict Registry (Provenance Maintained)
              </h3>
              <p className="text-[11px] text-slate-500">
                Multiple diagnostic parameters are flagged and reconciled across documents instead of silently overwriting existing baseline records.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 self-start sm:self-auto">
            {summary.conflicts.length} Tracked Variances
          </span>
        </div>

        <div className="space-y-2">
          {summary.conflicts.map((conf) => (
            <div key={conf.id} className="p-3 bg-amber-50/40 rounded-2xl border border-amber-200/70 text-xs space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900">{conf.parameter}:</span>
                  <span className="text-slate-600 line-through decoration-rose-400 font-mono text-[11px]">{conf.priorValue}</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200 text-[11px]">{conf.newValue}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  {conf.varianceType}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-500 font-mono">
                <div>Prior Source: <strong className="text-slate-700 font-sans">{conf.priorSource}</strong></div>
                <div>Current Source: <strong className="text-slate-700 font-sans">{conf.newSource}</strong></div>
              </div>

              <p className="text-[11px] text-slate-700 italic pt-1 border-t border-amber-200/50">
                Clinical Reconciliation: {conf.resolution}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DUAL CONDITION STRUCTURED AYURVEDIC CASE SUMMARIES WITH VAIDYA DECISION MODULE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Ayurvedic Case Summaries & Vaidya Decision Station
            </h2>
            <p className="text-xs text-slate-500">
              Structured clinical case intake with interactive differential diagnosis confirmation
            </p>
          </div>
        </div>

        {/* SIDE-BY-SIDE AYURVEDIC CASE SUMMARIES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AyurvedicCaseSummaryCard conditionType="stomach_pain" customSummary={summary.stomachSummary} />
          <AyurvedicCaseSummaryCard conditionType="chest_pain" customSummary={summary.chestSummary} />
        </div>
      </div>

      {/* Action Footer */}
      {!isEmbedded && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Patient Copy Generated • Ready for Registered Ayurvedic Vaidya Sign-off</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToCase}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Edit Intake Form
            </button>
            
            <button
              onClick={onNavigateToCase || onNavigateToReview}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
            >
              <Stethoscope className="w-4 h-4" />
              Doctor / Vaidya Station
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
