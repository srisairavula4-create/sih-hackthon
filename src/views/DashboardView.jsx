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

      {/* CLINICAL PORTAL DIRECT NAVIGATION HUB */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigate('case-taking')}
          className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-xs transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Case Intake</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Ayurvedic assessment & Prakriti evaluation</p>
        </button>

        <button
          onClick={() => onNavigate('upload-records')}
          className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-xs transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <UploadCloud className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700">AI OCR Upload</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Strict medical doc verification & entity extraction</p>
        </button>

        <button
          onClick={() => onNavigate('timeline')}
          className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-xs transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-900 group-hover:text-amber-800">History Timeline</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Longitudinal records & biomarker trajectory</p>
        </button>

        <button
          onClick={() => onNavigate('ai-summary')}
          className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-300 hover:border-emerald-600 hover:shadow-xs transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform shadow-2xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-emerald-950 group-hover:text-emerald-800">AI Clinical Summary</p>
          <p className="text-[10px] text-emerald-800 mt-0.5">Condition summaries, Vaidya decisions & conflict flags</p>
        </button>
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
