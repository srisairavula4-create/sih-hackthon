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
  Flame,
  ShieldCheck,
  Calendar,
  Utensils
} from 'lucide-react';
import { DoshaMeter } from '../components/DoshaMeter';
import { MissingDocBanner } from '../components/NotificationToast';

export const DashboardView = ({ 
  patient, 
  hasMissingDoc, 
  onUploadNow, 
  onRemindLater, 
  onNavigate, 
  onOpenAbha,
  aiSummary,
  oldRecords,
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
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-800 border border-teal-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    ABHA Linked
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Patient ID: <span className="font-mono font-medium text-slate-700">{patient.id}</span> • {patient.age} Years • {patient.gender} • Blood Group: <span className="font-semibold text-slate-700">{patient.bloodGroup}</span>
              </p>
            </div>
          </div>

          {/* Quick Vitals Summary Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="px-3 py-1.5 border-r border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Blood Sugar (F)</p>
              <p className="text-sm font-bold text-rose-600 font-mono">{patient.vitals.bloodSugarFasting}</p>
              <p className="text-[10px] text-rose-500">Elevated</p>
            </div>

            <div className="px-3 py-1.5 border-r border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Blood Pressure</p>
              <p className="text-sm font-bold text-slate-800 font-mono">{patient.vitals.bp}</p>
              <p className="text-[10px] text-slate-500">Pre-HTN</p>
            </div>

            <div className="px-3 py-1.5 border-r border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Heart Rate</p>
              <p className="text-sm font-bold text-slate-800 font-mono">{patient.vitals.pulse}</p>
              <p className="text-[10px] text-emerald-600">Normal</p>
            </div>

            <div className="px-3 py-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BMI / Weight</p>
              <p className="text-sm font-bold text-amber-700 font-mono">26.4 ({patient.vitals.weight})</p>
              <p className="text-[10px] text-amber-600">Overweight</p>
            </div>
          </div>

        </div>
      </div>

      {/* 4 PRIMARY ACTION TILES */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            Core Clinical Actions
          </h2>
          <span className="text-xs text-slate-500">Select any workflow to test</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Start New Case Taking */}
          <div 
            onClick={() => onNavigate('case-taking')}
            className="group bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                Ayurvedic Pariksha
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-emerald-700 transition-colors">
                Start New Case Intake
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Step-by-step classical intake: Chief Complaint, Dashavidha Pariksha, and Ahara-Vihara assessment.
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
              <span>Launch Case Wizard</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Upload Medical Records (AI OCR) */}
          <div 
            onClick={() => onNavigate('upload-records')}
            className="group bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-md">
                Smart OCR & NLP
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-teal-700 transition-colors">
                Upload Medical Records
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Scan lab reports & prescriptions. AI extracts biomarkers and correlates with Ayurvedic doshas.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800">
              <span>Scan & Extract Records</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Link ABHA Health Account */}
          <div 
            onClick={onOpenAbha}
            className="group bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100/70 px-2 py-0.5 rounded-md">
                Govt. ABDM Interop
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-sky-700 transition-colors">
                {patient.isAbhaLinked ? 'View ABHA Digital Card' : 'Link ABHA Account'}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {patient.isAbhaLinked 
                  ? 'ABHA ID linked. View or print official card & sync ABDM health records.'
                  : 'Enter 14-digit ABHA ID, verify via simulated OTP, and generate digital health card.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-sky-800">
              <span>Open Digital Card & QR</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Interactive Medical Timeline */}
          <div 
            onClick={() => onNavigate('timeline')}
            className="group bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                Chronological History
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-amber-700 transition-colors">
                Medical History Timeline
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Browse chronological medical milestones, lab trends, and previous Panchakarma records.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700 group-hover:text-amber-800">
              <span>Explore Timeline</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* DEDICATED FOOD INTAKE & AHARA LOG BOX (FEEDS AI SUMMARIZATION) */}
      <div className="bg-white rounded-3xl border border-emerald-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Daily Food Intake & Ahara Log
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  AI Analyzed
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Record your daily meals to let AI detect dietary triggers (Nidana), Dosha imbalance & formulate Pathya-Apathya
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {!isEditingFood ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditingFood(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
                >
                  Edit Food Intake
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSaveFood();
                    onNavigate('ai-summary');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  View AI Analysis
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingFood(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveFood}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Save & Update AI
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Display Mode: Micro-Cards */}
        {!isEditingFood ? (
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              
              {/* Breakfast */}
              <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-emerald-50/30 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  🥣 Breakfast (Morning)
                </span>
                <p className="text-xs font-medium text-slate-800 leading-snug line-clamp-2">
                  {foodForm.breakfast || "Not recorded"}
                </p>
              </div>

              {/* Lunch */}
              <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-emerald-50/30 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  🍛 Lunch (Madhyahna)
                </span>
                <p className="text-xs font-medium text-slate-800 leading-snug line-clamp-2">
                  {foodForm.lunch || "Not recorded"}
                </p>
              </div>

              {/* Evening Snacks */}
              <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-emerald-50/30 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  ☕ Evening Snacks
                </span>
                <p className="text-xs font-medium text-slate-800 leading-snug line-clamp-2">
                  {foodForm.eveningSnacks || "Not recorded"}
                </p>
              </div>

              {/* Dinner */}
              <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-emerald-50/30 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  🍽️ Dinner (Ratri Ahara)
                </span>
                <p className="text-xs font-medium text-slate-800 leading-snug line-clamp-2">
                  {foodForm.dinner || "Not recorded"}
                </p>
              </div>

              {/* Fluids */}
              <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-emerald-50/30 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                  💧 Fluids & Water
                </span>
                <p className="text-xs font-medium text-slate-800 leading-snug line-clamp-2">
                  {foodForm.fluids || "Not recorded"}
                </p>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-[11px] text-slate-500 bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100">
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                AI Analysis: {aiSummary.foodIntakeAnalysis ? aiSummary.foodIntakeAnalysis.primaryTriggers.slice(0, 2).join(' • ') : 'Ready for analysis'}
              </span>
              <button 
                onClick={() => onNavigate('ai-summary')}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 self-end sm:self-auto"
              >
                Inspect Full Dietary Report →
              </button>
            </div>
          </div>
        ) : (
          /* Editing Form */
          <form onSubmit={handleSaveFood} className="pt-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs font-bold text-slate-600">Quick Presets:</span>
              <button
                type="button"
                onClick={() => setFoodForm({
                  breakfast: "Idli with coconut chutney, sweet milk tea with 2 tsp sugar",
                  lunch: "White polished rice, thick curd (dahi), aloo fry, dal with ghee",
                  eveningSnacks: "Deep fried samosa, 3 biscuits, sweet milk tea",
                  dinner: "3 Wheat rotis, paneer butter masala, late-night sweetened cold milk",
                  fluids: "Refrigerated chilled water after meals, 3 sugary teas",
                  notes: "Frequent heavy curd and chilled water with meals."
                })}
                className="px-2.5 py-1 text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 rounded-lg hover:bg-amber-100"
              >
                High-Kapha / Curd Diet (Triggers)
              </button>
              <button
                type="button"
                onClick={() => setFoodForm({
                  breakfast: "Yava (Barley) porridge with roasted cumin and warm water",
                  lunch: "Mudga (Moong dal) soup, roasted vegetables (bitter gourd), spiced takra",
                  eveningSnacks: "Roasted makhana with pinch of rock salt and ginger tea",
                  dinner: "1 Light barley roti with steamed ridge gourd, eaten before 7:30 PM",
                  fluids: "Boiled warm water (Ushnodaka) with dry ginger, no cold fluids",
                  notes: "Strict Sattvic Pathya regimen pacifying Kapha and igniting Agni."
                })}
                className="px-2.5 py-1 text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-100"
              >
                Sattvic Pathya Diet (Healing)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  🥣 Breakfast (Morning)
                </label>
                <input
                  type="text"
                  value={foodForm.breakfast}
                  onChange={(e) => setFoodForm({ ...foodForm, breakfast: e.target.value })}
                  placeholder="e.g. Idli, sambar, coffee with sugar"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  🍛 Lunch (Madhyahna)
                </label>
                <input
                  type="text"
                  value={foodForm.lunch}
                  onChange={(e) => setFoodForm({ ...foodForm, lunch: e.target.value })}
                  placeholder="e.g. Rice, curd, dal, sabzi, ghee"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ☕ Evening Snacks
                </label>
                <input
                  type="text"
                  value={foodForm.eveningSnacks}
                  onChange={(e) => setFoodForm({ ...foodForm, eveningSnacks: e.target.value })}
                  placeholder="e.g. Samosa, biscuits, milk tea"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  🍽️ Dinner (Ratri Ahara)
                </label>
                <input
                  type="text"
                  value={foodForm.dinner}
                  onChange={(e) => setFoodForm({ ...foodForm, dinner: e.target.value })}
                  placeholder="e.g. 2 Rotis, sabzi, bedtime milk"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  💧 Fluids & Drinks
                </label>
                <input
                  type="text"
                  value={foodForm.fluids}
                  onChange={(e) => setFoodForm({ ...foodForm, fluids: e.target.value })}
                  placeholder="e.g. Chilled refrigerator water, soda, tea"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Save & Ingest into AI Engine
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* LOWER SPLIT SECTION: Dosha Meter & AI Clinical Summary Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Interactive Dosha Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <DoshaMeter compact={false} />
        </div>

        {/* Right Column (7 Cols): AI Clinical Summary & Vaidya Status */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Latest AI Clinical Assessment
                  </h3>
                  <p className="text-[11px] text-slate-500">Case ID: {aiSummary.caseId}</p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                aiSummary.verifiedByDoctor 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                {aiSummary.verifiedByDoctor ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified by Vaidya
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Pending Vaidya Verification
                  </>
                )}
              </span>
            </div>

            {/* Ayurvedic Disease Classification */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Ayurvedic Diagnosis (Roga Nidana)
                </span>
                <span className="text-[11px] font-semibold text-emerald-700">
                  Dosha: {aiSummary.rogaNidana.dosha}
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                {aiSummary.rogaNidana.vyadhi}
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                {aiSummary.synthesisOverview}
              </p>
            </div>

            {/* Prescribed Herbs Teaser */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                AI Suggested Classical Formulations:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {aiSummary.prescribedFormulations.slice(0, 2).map((herb) => (
                  <div key={herb.id} className="p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/50">
                    <p className="text-xs font-bold text-emerald-900">{herb.name}</p>
                    <p className="text-[11px] text-slate-600">{herb.dose} • {herb.timing}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Attending Vaidya: <strong>Dr. Priyadarshini Joshi</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('ai-summary')}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Full Clinical Summary
              </button>
              <button
                onClick={() => onNavigate('vaidya-review')}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                Vaidya Review & Sign
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* RECENT UPLOADED MEDICAL DOCUMENTS */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              Extracted Health Records in System
            </h3>
            <p className="text-xs text-slate-500">
              Scanned, categorized, and structured using simulated AI Optical Character Recognition
            </p>
          </div>
          <button
            onClick={() => onNavigate('upload-records')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            + Upload Another Document
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {oldRecords.map((rec) => (
            <div 
              key={rec.id}
              onClick={() => onNavigate('upload-records')}
              className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all cursor-pointer flex items-start justify-between gap-2"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-700 flex-shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{rec.title}</p>
                  <p className="text-[11px] text-slate-500">{rec.institution}</p>
                  <p className="text-[10px] text-emerald-700 font-medium mt-1">
                    Confidence: {rec.confidence}% • {rec.date}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 flex-shrink-0">
                {rec.type}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
