import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Clock, 
  CreditCard, 
  Sparkles, 
  Stethoscope, 
  HeartPulse, 
  Activity, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Calendar,
  Utensils,
  Pill,
  Heart,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { MissingDocBanner } from '../components/NotificationToast';
import { AyurvedicCaseSummaryCard } from '../components/AyurvedicCaseSummaryCard';

export const DashboardView = ({ 
  patient, 
  hasMissingDoc, 
  onUploadNow, 
  onRemindLater, 
  onNavigate, 
  onOpenAbha,
  aiSummary,
  oldRecords = [],
  foodIntake,
  onUpdateFoodIntake
}) => {
  const [isEditingFood, setIsEditingFood] = useState(false);
  const [foodForm, setFoodForm] = useState(foodIntake || {
    breakfast: '',
    lunch: '',
    eveningSnacks: '',
    dinner: '',
    fluids: ''
  });

  React.useEffect(() => {
    if (foodIntake) {
      setFoodForm(foodIntake);
    }
  }, [foodIntake]);

  const handleSaveFood = (e) => {
    if (e) e.preventDefault();
    if (onUpdateFoodIntake) {
      onUpdateFoodIntake(foodForm);
    }
    setIsEditingFood(false);
  };

  const patientInitials = patient.name 
    ? patient.name.trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() 
    : 'PT';

  // Separate records strictly by the 2 conditions: Stomach Pain vs Chest Pain
  const stomachRecords = oldRecords.filter(r => 
    r.condition === 'stomach_pain' || 
    r.title.toLowerCase().includes('stomach') || 
    r.title.toLowerCase().includes('endoscopy') || 
    r.title.toLowerCase().includes('gastro') ||
    r.fileName.toLowerCase().includes('stomach')
  );

  const chestRecords = oldRecords.filter(r => 
    r.condition === 'chest_pain' || 
    r.title.toLowerCase().includes('chest') || 
    r.title.toLowerCase().includes('cardio') || 
    r.title.toLowerCase().includes('ecg') || 
    r.title.toLowerCase().includes('lipid') ||
    r.fileName.toLowerCase().includes('chest')
  );

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Missing Document Alert Banner */}
      {hasMissingDoc && (
        <MissingDocBanner 
          onUploadNow={onUploadNow} 
          onRemindLater={onRemindLater} 
        />
      )}

      {/* Patient Welcome & Vitals Header Card */}
      <div className="bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-600/20">
                {patientInitials}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border border-slate-200 shadow-2xs">
                <HeartPulse className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight font-outfit">
                  Namaste, {patient.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Prakriti: {patient.prakriti}
                </span>
                {patient.isAbhaLinked && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-800 border border-teal-300 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3 text-teal-700" />
                    ABHA: {patient.abhaId}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Patient ID: <span className="font-mono font-medium text-slate-700">{patient.id}</span> • {patient.age} Years • {patient.gender} • Blood Group: <span className="font-semibold text-slate-700">{patient.bloodGroup}</span>
              </p>
            </div>
          </div>

          {/* Quick Vitals Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="px-3 py-1.5 border-r border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Blood Sugar (F)</p>
              <p className="text-sm font-bold text-rose-600 font-mono">{patient.vitals?.bloodSugarFasting || '138 mg/dL'}</p>
              <p className="text-[10px] text-rose-500">Elevated</p>
            </div>

            <div className="px-3 py-1.5 border-r border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Blood Pressure</p>
              <p className="text-sm font-bold text-slate-800 font-mono">{patient.vitals?.bp || '128/82 mmHg'}</p>
              <p className="text-[10px] text-slate-500">Normal</p>
            </div>

            <div className="px-3 py-1.5 border-r border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Heart Rate</p>
              <p className="text-sm font-bold text-slate-800 font-mono">{patient.vitals?.pulse || '74 bpm'}</p>
              <p className="text-[10px] text-emerald-600">Stable</p>
            </div>

            <div className="px-3 py-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BMI / Weight</p>
              <p className="text-sm font-bold text-amber-700 font-mono">26.4 ({patient.vitals?.weight || '74 kg'})</p>
              <p className="text-[10px] text-amber-600">Overweight</p>
            </div>
          </div>

        </div>
      </div>

      {/* CONDITION-WISE CLINICAL WORKSPACE: STOMACH PAIN (1 SIDE) & CHEST PAIN (1 SIDE) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              Condition-Wise Medical Intelligence & AI Summarization
            </h2>
            <p className="text-xs text-slate-500">
              AI organizes reports and prescriptions by respective health condition: Stomach Pain on one side and Chest Pain on the other side.
            </p>
          </div>

          <button
            onClick={() => onNavigate('upload-records')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            Upload New Condition Report
          </button>
        </div>

        {/* 2-SIDE DUAL COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ========================================================================= */}
          {/* SIDE 1 (LEFT): STOMACH PAIN (UDARA SHOOLA) RECORDS & AI CLINICAL SUMMARY */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-6 shadow-xs space-y-5 flex flex-col justify-between hover:border-amber-300 transition-all">
            
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-amber-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg shadow-2xs">
                    🩺
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                      Condition 1 • Gastrointestinal
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-0.5">
                      Stomach Pain History (Udara Shoola & Amlapitta)
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                  {stomachRecords.length} Records
                </span>
              </div>

              {/* EXACT STRUCTURED AYURVEDIC CASE SUMMARY (STOMACH PAIN) */}
              <AyurvedicCaseSummaryCard conditionType="stomach_pain" />

              {/* Respective Stomach Pain Reports & Prescriptions */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Stomach Pain Reports & Prescriptions:</span>
                  <span className="text-[10px] text-slate-400 font-normal">ABHA Stamped</span>
                </p>

                {stomachRecords.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => onNavigate('upload-records')}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/20 transition-all cursor-pointer bg-slate-50/60"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="p-2 rounded-xl bg-white border border-slate-200 text-amber-700 mt-0.5 flex-shrink-0">
                          {rec.type === 'Prescription' ? <Pill className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{rec.title}</p>
                          <p className="text-[11px] text-slate-500">{rec.institution}</p>
                          
                          {/* Snippet Values */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            {rec.extractedData?.biomarkers?.slice(0, 2).map((b, i) => (
                              <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-amber-200 text-amber-900 rounded">
                                {b.name}: {b.value}
                              </span>
                            ))}
                            {rec.extractedData?.medications?.slice(0, 2).map((m, i) => (
                              <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-amber-200 text-amber-900 rounded">
                                {m.name} ({m.dose})
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 flex-shrink-0">
                        {rec.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side 1 Action */}
            <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Condition ID: COND-GASTRO-01</span>
              <button
                onClick={() => onNavigate('upload-records')}
                className="text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                + Add Stomach Pain File <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* SIDE 2 (RIGHT): CHEST PAIN (HRID-SHOOLA) RECORDS & AI CLINICAL SUMMARY */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border-2 border-teal-200/90 p-6 shadow-xs space-y-5 flex flex-col justify-between hover:border-teal-300 transition-all">
            
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-teal-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-lg shadow-2xs">
                    ❤️
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                      Condition 2 • Cardiovascular & Metabolic
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-0.5">
                      Chest Pain History (Hrid-Shoola & Dyslipidemia)
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-bold text-teal-900 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-xl">
                  {chestRecords.length} Records
                </span>
              </div>

              {/* EXACT STRUCTURED AYURVEDIC CASE SUMMARY (CHEST PAIN) */}
              <AyurvedicCaseSummaryCard conditionType="chest_pain" />

              {/* Respective Chest Pain Reports & Prescriptions */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Chest Pain Reports & Prescriptions:</span>
                  <span className="text-[10px] text-slate-400 font-normal">ABHA Stamped</span>
                </p>

                {chestRecords.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => onNavigate('upload-records')}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/20 transition-all cursor-pointer bg-slate-50/60"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="p-2 rounded-xl bg-white border border-slate-200 text-teal-700 mt-0.5 flex-shrink-0">
                          {rec.type === 'Prescription' ? <Pill className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{rec.title}</p>
                          <p className="text-[11px] text-slate-500">{rec.institution}</p>
                          
                          {/* Snippet Values */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            {rec.extractedData?.biomarkers?.slice(0, 2).map((b, i) => (
                              <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-teal-200 text-teal-900 rounded">
                                {b.name}: {b.value}
                              </span>
                            ))}
                            {rec.extractedData?.medications?.slice(0, 2).map((m, i) => (
                              <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-white border border-teal-200 text-teal-900 rounded">
                                {m.name} ({m.dose})
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 flex-shrink-0">
                        {rec.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side 2 Action */}
            <div className="pt-4 border-t border-teal-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">Condition ID: COND-CARDIO-02</span>
              <button
                onClick={() => onNavigate('upload-records')}
                className="text-xs font-bold text-teal-800 hover:text-teal-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                + Add Chest Pain File <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* DEDICATED FOOD INTAKE & AHARA LOG BOX (FEEDS AI SUMMARIZATION) */}
      <div className="bg-white rounded-3xl border border-emerald-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Daily Food Intake & Ahara Log
              </h3>
              <p className="text-[11px] text-slate-500">
                Dietary intake analyzed in real-time by AI for both Stomach Pain (acid trigger) and Chest Pain (lipid trigger)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditingFood(!isEditingFood)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors self-start sm:self-auto cursor-pointer"
          >
            {isEditingFood ? 'Close Log' : 'Edit Meals'}
          </button>
        </div>

        {!isEditingFood ? (
          /* Static Display */
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">🥣 Breakfast</p>
                <p className="text-xs font-semibold text-slate-800 mt-1 line-clamp-2">{foodForm.breakfast || 'None'}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">🍛 Lunch</p>
                <p className="text-xs font-semibold text-slate-800 mt-1 line-clamp-2">{foodForm.lunch || 'None'}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">☕ Evening Snacks</p>
                <p className="text-xs font-semibold text-slate-800 mt-1 line-clamp-2">{foodForm.eveningSnacks || 'None'}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">🍲 Dinner</p>
                <p className="text-xs font-semibold text-slate-800 mt-1 line-clamp-2">{foodForm.dinner || 'None'}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 col-span-2 sm:col-span-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">💧 Fluids</p>
                <p className="text-xs font-semibold text-slate-800 mt-1 line-clamp-2">{foodForm.fluids || 'Standard water'}</p>
              </div>
            </div>
          </div>
        ) : (
          /* Editing Form */
          <form onSubmit={handleSaveFood} className="pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">🥣 Breakfast</label>
                <input
                  type="text"
                  value={foodForm.breakfast}
                  onChange={(e) => setFoodForm({ ...foodForm, breakfast: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">🍛 Lunch</label>
                <input
                  type="text"
                  value={foodForm.lunch}
                  onChange={(e) => setFoodForm({ ...foodForm, lunch: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">☕ Evening Snacks</label>
                <input
                  type="text"
                  value={foodForm.eveningSnacks}
                  onChange={(e) => setFoodForm({ ...foodForm, eveningSnacks: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">🍲 Dinner</label>
                <input
                  type="text"
                  value={foodForm.dinner}
                  onChange={(e) => setFoodForm({ ...foodForm, dinner: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">💧 Daily Fluids</label>
                <input
                  type="text"
                  value={foodForm.fluids}
                  onChange={(e) => setFoodForm({ ...foodForm, fluids: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Save & Ingest into AI Engine
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* QUICK WORKFLOW BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-800">Quick Navigation:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('upload-records')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Upload New Record via OCR
          </button>
          <button
            onClick={() => onNavigate('timeline')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
          >
            Interactive Medical Timeline & Graph
          </button>
          <button
            onClick={() => onNavigate('case-taking')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer"
          >
            Ayurvedic Case Wizard
          </button>
          <button
            onClick={() => onNavigate('ai-summary')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Official Prescription Handout
          </button>
        </div>
      </div>

    </div>
  );
};
