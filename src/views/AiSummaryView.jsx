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
  Pill, 
  Flame, 
  Check, 
  AlertCircle, 
  Utensils 
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
    rogaNidana: { 
      ...INITIAL_AI_SUMMARY.rogaNidana, 
      ...((aiSummary && aiSummary.rogaNidana) || {}) 
    },
    pathyaApathya: {
      pathyaAhara: (aiSummary?.pathyaApathya?.pathyaAhara?.length) 
        ? aiSummary.pathyaApathya.pathyaAhara 
        : INITIAL_AI_SUMMARY.pathyaApathya.pathyaAhara,
      pathyaVihara: (aiSummary?.pathyaApathya?.pathyaVihara?.length) 
        ? aiSummary.pathyaApathya.pathyaVihara 
        : INITIAL_AI_SUMMARY.pathyaApathya.pathyaVihara,
      apathyaAhara: (aiSummary?.pathyaApathya?.apathyaAhara?.length) 
        ? aiSummary.pathyaApathya.apathyaAhara 
        : INITIAL_AI_SUMMARY.pathyaApathya.apathyaAhara,
      apathyaVihara: (aiSummary?.pathyaApathya?.apathyaVihara?.length) 
        ? aiSummary.pathyaApathya.apathyaVihara 
        : INITIAL_AI_SUMMARY.pathyaApathya.apathyaVihara
    },
    prescribedFormulations: (aiSummary?.prescribedFormulations?.length)
      ? aiSummary.prescribedFormulations
      : INITIAL_AI_SUMMARY.prescribedFormulations,
    foodIntakeAnalysis: (aiSummary?.foodIntakeAnalysis)
      ? aiSummary.foodIntakeAnalysis
      : INITIAL_AI_SUMMARY.foodIntakeAnalysis,
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
                Comprehensive Ayurvedic Clinical Summary & Treatment Protocol
              </h1>
              <p className="text-xs text-emerald-100 mt-1 max-w-2xl">
                Synthesizing Patient Intake, Dashavidha Pariksha, Ahara-Vihara parameters, and Laboratory Biomarkers
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

      {/* SECTION 1: ROGA NIDANA (AYURVEDIC ETIOPATHOGENESIS) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Roga Nidana & Samprapti Ghataka (Ayurvedic Diagnosis)
            </h2>
            <p className="text-xs text-slate-500">
              Etiopathogenesis formulated from Classical Ayurvedic Samhitas
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {summary.rogaNidana?.sadhyasadhyata || 'Krichra Sadhya'}
          </span>
        </div>

        {/* Diagnosis Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Vyadhi (Disease)</p>
            <p className="text-sm font-black text-slate-900 mt-1">{summary.rogaNidana?.vyadhi}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dosha Involvement</p>
            <p className="text-xs font-bold text-emerald-800 mt-1">{summary.rogaNidana?.dosha}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dushya (Tissues Implicated)</p>
            <p className="text-xs font-bold text-amber-800 mt-1">{summary.rogaNidana?.dushya}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Agni State</p>
            <p className="text-xs font-bold text-slate-800 mt-1">{summary.rogaNidana?.agni}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ama Status (Endotoxins)</p>
            <p className="text-xs font-bold text-rose-700 mt-1">{summary.rogaNidana?.ama}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Srotas Affected</p>
            <p className="text-xs font-bold text-slate-800 mt-1">{summary.rogaNidana?.srotas}</p>
          </div>
        </div>

        {/* Chikitsa Sutra Banner */}
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-900">
            Chikitsa Sutra (Therapeutic Management Principle)
          </p>
          <p className="text-xs text-teal-800 leading-relaxed font-medium">
            {summary.chikitsaSutra}
          </p>
        </div>
      </div>

      {/* SECTION 2: AI FOOD INTAKE & DIETARY ANALYSIS (AHARA PARIKSHA) */}
      {summary.foodIntakeAnalysis && (
        <div className="bg-white rounded-3xl border border-emerald-200/90 p-5 sm:p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                  <Utensils className="w-4 h-4" />
                </span>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  AI Food Intake & Ahara Analysis (Dietary Etiology)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Correlates patient's logged meals with Dosha aggravation & Dhatvagni
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Dynamic Ingestion
            </span>
          </div>

          {/* Meals Summary Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Patient Logged Meals Analyzed by AI
            </p>
            <p className="text-xs font-semibold text-slate-800 leading-relaxed">
              {summary.foodIntakeAnalysis.loggedMealsSummary}
            </p>
          </div>

          {/* 3-Column Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Detected Ahara Triggers (Nidana)
              </div>
              <ul className="space-y-1.5">
                {(summary.foodIntakeAnalysis.primaryTriggers || []).map((trigger, idx) => (
                  <li key={idx} className="text-xs text-rose-950 flex items-start gap-1.5 leading-snug">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{trigger}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <Flame className="w-4 h-4 text-amber-600" />
                Agni & Dosha Impact
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                {summary.foodIntakeAnalysis.doshaImpact}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Corrective Diet Modification
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {summary.foodIntakeAnalysis.dietaryActionPlan}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: CLASSICAL AYURVEDIC FORMULATIONS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Pill className="w-4 h-4 text-emerald-600" />
              Suggested Classical Formulations (Aushadha Yojana)
            </h2>
            <p className="text-xs text-slate-500">
              Evidence-based classical Ayurvedic medicinal protocol
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {(summary.prescribedFormulations || []).length} Active Formulations
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Formulation & Ingredients</th>
                <th className="px-3 py-3 text-left">Dosage & Frequency</th>
                <th className="px-3 py-3 text-left">Timing & Anupana</th>
                <th className="px-4 py-3 text-left">Clinical & Classical Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {(summary.prescribedFormulations || []).map((herb) => (
                <tr key={herb.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 align-top">
                    <p className="font-bold text-slate-900 text-xs">{herb.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{herb.ingredients}</p>
                  </td>
                  <td className="px-3 py-3 align-top font-mono text-slate-800">
                    <p className="font-bold">{herb.dose}</p>
                    <p className="text-[11px] text-slate-500">{herb.frequency}</p>
                  </td>
                  <td className="px-3 py-3 align-top text-slate-700">
                    <p className="font-medium">{herb.timing}</p>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                      Vehicle: {herb.anupana}
                    </p>
                  </td>
                  <td className="px-4 py-3 align-top text-slate-600 text-[11px] leading-relaxed">
                    {herb.rationale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: PATHYA & APATHYA (DIET & LIFESTYLE REGIMEN) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Pathya & Apathya (Do's and Don'ts for Patient Compliance)
          </h2>
          <p className="text-xs text-slate-500">
            Nutritional and behavioral prescription strictly tailored to pacify Kapha and clear Medovaha Srotas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pathya (Recommended) */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Pathya Ahara & Vihara (Wholesome / Recommended)
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-emerald-900">Dietary (Ahara):</p>
              <ul className="space-y-1 text-xs text-slate-700">
                {(summary.pathyaApathya?.pathyaAhara || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-semibold text-emerald-900 pt-2">Lifestyle (Vihara):</p>
              <ul className="space-y-1 text-xs text-slate-700">
                {(summary.pathyaApathya?.pathyaVihara || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Apathya (Prohibited) */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              Apathya Ahara & Vihara (Unwholesome / Prohibited)
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-rose-900">Dietary (Ahara):</p>
              <ul className="space-y-1 text-xs text-slate-700">
                {(summary.pathyaApathya?.apathyaAhara || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold text-xs mt-0.5 flex-shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-semibold text-rose-900 pt-2">Lifestyle (Vihara):</p>
              <ul className="space-y-1 text-xs text-slate-700">
                {(summary.pathyaApathya?.apathyaVihara || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold text-xs mt-0.5 flex-shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
