import React, { useState } from 'react';
import { 
  Sparkles, 
  Stethoscope, 
  FileText, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Printer, 
  Share2, 
  ArrowRight, 
  ShieldCheck, 
  Pill, 
  Flame, 
  Droplets, 
  Wind,
  Check,
  AlertCircle
} from 'lucide-react';

export const AiSummaryView = ({ 
  aiSummary, 
  patient, 
  onNavigateToReview,
  onNavigateToCase
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        {/* Subtle decorative emblem in background */}
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
                Generated: {aiSummary.generatedAt}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight font-outfit">
              Comprehensive Ayurvedic Clinical Summary & Treatment Protocol
            </h1>
            <p className="text-xs text-emerald-100 mt-1 max-w-2xl">
              Synthesizing Patient Intake, Dashavidha Pariksha, Ahara-Vihara parameters, and Laboratory Biomarkers (HbA1c 7.8%)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Simulated Voice Readout Button */}
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
              onClick={onNavigateToReview}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-emerald-800 hover:bg-emerald-50 shadow-md shadow-emerald-900/20 transition-all"
            >
              <Stethoscope className="w-4 h-4 text-emerald-700" />
              Open Vaidya Portal
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Synthesis Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
            <FileText className="w-4 h-4" />
          </span>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Holistic Clinical Overview & Bridge Summary
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {aiSummary.synthesisOverview}
        </p>
      </div>

      {/* SECTION 1: ROGA NIDANA (AYURVEDIC ETIOPATHOGENESIS) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
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
            {aiSummary.rogaNidana.sadhyasadhyata}
          </span>
        </div>

        {/* Diagnosis Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Vyadhi (Disease)</p>
            <p className="text-sm font-black text-slate-900 mt-1">{aiSummary.rogaNidana.vyadhi}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dosha Involvement</p>
            <p className="text-xs font-bold text-emerald-800 mt-1">{aiSummary.rogaNidana.dosha}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dushya (Tissues Implicated)</p>
            <p className="text-xs font-bold text-amber-800 mt-1">{aiSummary.rogaNidana.dushya}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Agni State</p>
            <p className="text-xs font-bold text-slate-800 mt-1">{aiSummary.rogaNidana.agni}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ama Status (Endotoxins)</p>
            <p className="text-xs font-bold text-rose-700 mt-1">{aiSummary.rogaNidana.ama}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Srotas Affected</p>
            <p className="text-xs font-bold text-slate-800 mt-1">{aiSummary.rogaNidana.srotas}</p>
          </div>

        </div>

        {/* Chikitsa Sutra Banner */}
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-900">
            Chikitsa Sutra (Therapeutic Management Principle)
          </p>
          <p className="text-xs text-teal-800 leading-relaxed font-medium">
            {aiSummary.chikitsaSutra}
          </p>
        </div>
      </div>

      {/* SECTION 2: CLASSICAL AYURVEDIC FORMULATIONS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Pill className="w-4 h-4 text-emerald-600" />
              Suggested Classical Formulations (Aushadha Yojana)
            </h2>
            <p className="text-xs text-slate-500">
              Prescribed based on Charaka Samhita Chikitsa Sthana Prameha Adhyaya
            </p>
          </div>
          <span className="text-xs text-slate-400">4 Active Formulations</span>
        </div>

        <div className="overflow-hidden border border-slate-200 rounded-2xl">
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
              {aiSummary.prescribedFormulations.map((herb) => (
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

      {/* SECTION 3: PATHYA & APATHYA (DIET & LIFESTYLE REGIMEN) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
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
                {aiSummary.pathyaApathya.pathyaAhara.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-semibold text-emerald-900 pt-2">Lifestyle (Vihara):</p>
              <ul className="space-y-1 text-xs text-slate-700">
                {aiSummary.pathyaApathya.pathyaVihara.map((item, idx) => (
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
                {aiSummary.pathyaApathya.apathyaAhara.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold text-xs mt-0.5 flex-shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs font-semibold text-rose-900 pt-2">Lifestyle (Vihara):</p>
              <ul className="space-y-1 text-xs text-slate-700">
                {aiSummary.pathyaApathya.apathyaVihara.map((item, idx) => (
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
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Patient Copy Generated • Ready for Registered Ayurvedic Vaidya Sign-off</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToCase}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Edit Intake Form
          </button>
          
          <button
            onClick={onNavigateToReview}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <Stethoscope className="w-4 h-4" />
            Review in Doctor / Vaidya Station
          </button>
        </div>
      </div>

    </div>
  );
};
