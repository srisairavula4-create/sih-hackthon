import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Mic, 
  MicOff, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Heart, 
  Utensils, 
  Moon, 
  Brain, 
  ShieldAlert, 
  UserCheck, 
  RefreshCw, 
  Info, 
  Stethoscope, 
  ClipboardList, 
  Save, 
  ArrowRight, 
  Eye, 
  Thermometer, 
  Edit3, 
  ShieldCheck, 
  BookOpen 
} from 'lucide-react';

export const CaseTakingWizard = ({ initialCase, onSaveCase, onGenerateAiSummary, onUpdateFoodIntake }) => {
  // Two clearly separate sections: 'part1' (General Case History), 'part2' (AYUSH / Ayurvedic History), and 'review' (Complete Dual-Part Review)
  const [activeTab, setActiveTab] = useState('part1');
  const [saveToast, setSaveToast] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [formData, setFormData] = useState({
    // (1) GENERAL CASE HISTORY FIELDS
    chiefComplaint: initialCase?.chiefComplaint || '',
    hpi: initialCase?.hpi || '',
    duration: initialCase?.duration || '6 Months',
    severity: initialCase?.severity || 'Moderate',
    pastHistory: initialCase?.pastHistory || '',
    currentMedications: initialCase?.currentMedications || '',
    allergies: initialCase?.allergies || '',
    familyHistory: initialCase?.familyHistory || '',
    personalHistory: initialCase?.personalHistory || '',

    // (2) AYUSH / AYURVEDIC HISTORY FIELDS
    dashavidha: {
      prakriti: initialCase?.dashavidha?.prakriti || 'Pitta-Kapha',
      vikriti: initialCase?.dashavidha?.vikriti || 'Pitta-Vataja in Kostha with Kapha Srotorodha in Hridya',
      sara: initialCase?.dashavidha?.sara || 'Madhyama Sara (Moderate tissue excellence)',
      samhanana: initialCase?.dashavidha?.samhanana || 'Madhyama Samhanana (Average body build)',
      pramana: initialCase?.dashavidha?.pramana || 'Pramana Yukta (Normal proportions)',
      satmya: initialCase?.dashavidha?.satmya || 'Mixed dietary habit; accustomed to wheat & rice',
      satva: initialCase?.dashavidha?.satva || 'Madhyama Satva (Moderate mental fortitude)',
      aharaShakti: initialCase?.dashavidha?.aharaShakti || 'Madhyama Abhyavaharana, Avara Jarana Shakti',
      vyayamaShakti: initialCase?.dashavidha?.vyayamaShakti || 'Avara Vyayama Shakti (Low physical endurance)',
      vaya: initialCase?.dashavidha?.vaya || '38 Years (Madhyama Vaya)'
    },
    aharaVihara: {
      agniType: initialCase?.aharaVihara?.agniType || 'Vishamagni with Mandagni tendencies (Variable & sluggish)',
      koshthaType: initialCase?.aharaVihara?.koshthaType || 'Madhyama Koshtha with occasional hyperacidity and dry stool tendencies',
      dietaryPreference: initialCase?.aharaVihara?.dietaryPreference || 'Vegetarian with frequent curd, tea, and fried snacks',
      mealTiming: initialCase?.aharaVihara?.mealTiming || 'Irregular; late dinners past 10:00 PM',
      viruddhaAhara: initialCase?.aharaVihara?.viruddhaAhara || 'Cold water with meals, sour curd with fried items',
      waterIntake: initialCase?.aharaVihara?.waterIntake || '2.5 Liters / day',
      nidraPattern: initialCase?.aharaVihara?.nidraPattern || '6 hours per night with light morning awakenings; post-lunch drowsiness (Diva-swapna)',
      vyayamaHabit: initialCase?.aharaVihara?.vyayamaHabit || 'Minimal daily exercise (< 15 mins walking)',
      manasikaBhavas: initialCase?.aharaVihara?.manasikaBhavas || 'Work-related mental stress (Chinta & Krodha)'
    },
    ashtavidha: {
      nadi: initialCase?.ashtavidha?.nadi || '74 bpm, Mandagati, Kapha-Vata dominance with Pitta surge post-meals',
      jihva: initialCase?.ashtavidha?.jihva || 'Mild white Ama coating at the posterior third (Sama Jihva)',
      mutra: initialCase?.ashtavidha?.mutra || 'Normal frequency (4-5 times/day), pale yellow, clear',
      mala: initialCase?.ashtavidha?.mala || 'Irregular evacuation, tendency towards sluggishness (Asamyak Mala Pravritti)',
      shabda: initialCase?.ashtavidha?.shabda || 'Normal, clear acoustic resonance (Prakrita)',
      sparsha: initialCase?.ashtavidha?.sparsha || 'Warm, slightly clammy palms during mental stress (Ushna-Snigdha)',
      drik: initialCase?.ashtavidha?.drik || 'Normal sclera, mild sub-conjunctival pallor',
      akriti: initialCase?.ashtavidha?.akriti || 'Madhyama (Medium build, slight central abdominal adiposity)'
    },
    otherAssessments: initialCase?.otherAssessments || 'Srotas: Annavaha Srotas (Udara Shoola), Rasavaha & Medovaha Srotas (Hrid-Shoola). Rogamarga: Abhyantara (Internal) and Madhyama. Vyadhi Swabhava: Krichra Sadhya (Manageable with Ahara-Aushadha).',
    foodIntake: initialCase?.foodIntake || {
      breakfast: 'Warm tea, idlis with mild sambar, no chilies',
      lunch: 'Rice with moong dal, roasted ridge gourd, cumin buttermilk (Takra)',
      eveningSnacks: 'Roasted makhana, warm water',
      dinner: '2 Light wheat phulkas with bottle gourd curry before 8:00 PM',
      fluids: 'Warm water boiled with dry ginger and cumin throughout the day',
      notes: 'Eliminated chilled water, sour curd, and deep-fried items to pacify both stomach acid and arterial lipid congestion.'
    }
  });

  const [isRecording, setIsRecording] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiProcessingStage, setAiProcessingStage] = useState('');

  // Voice dictation simulation
  const toggleVoiceDictation = (field = 'chiefComplaint') => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        if (field === 'chiefComplaint') {
          setFormData(prev => ({
            ...prev,
            chiefComplaint: prev.chiefComplaint + " [Voice Note: Patient reports post-prandial fullness, burning retrosternal sensation, and occasional palpitations after heavy dinners.]"
          }));
        } else if (field === 'hpi') {
          setFormData(prev => ({
            ...prev,
            hpi: prev.hpi + " [Voice Note: Symptoms aggravated by irregular meal timings, late-night working hours, and high anxiety.]"
          }));
        }
        setIsRecording(false);
        triggerToast("Voice dictation transcribed successfully!");
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const triggerToast = (msg) => {
    setSaveMessage(msg);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleSaveDraft = () => {
    onSaveCase(formData);
    if (onUpdateFoodIntake && formData.foodIntake) {
      onUpdateFoodIntake(formData.foodIntake);
    }
    triggerToast(activeTab === 'part1' ? 'General Case History saved!' : 'AYUSH / Ayurvedic History saved!');
  };

  const handleFinalAiSynthesis = () => {
    setIsAiProcessing(true);
    setAiProcessingStage('Synthesizing General Case History (Chief Complaint, HPI, Past History, Medications)...');
    
    setTimeout(() => {
      setAiProcessingStage('Correlating AYUSH Assessment: Dashavidha Pariksha (Prakriti, Vikriti, Sara, Satva)...');
    }, 1200);

    setTimeout(() => {
      setAiProcessingStage('Evaluating Ahara-Vihara (Agni, Koshtha, Viruddha Ahara) & Ashtavidha Markers (Nadi, Jihva)...');
    }, 2400);

    setTimeout(() => {
      setAiProcessingStage('Formulating Dual Condition Roga Nidana, Chikitsa Sutra & Pathya-Apathya Regimen...');
    }, 3600);

    setTimeout(() => {
      setIsAiProcessing(false);
      onSaveCase(formData);
      if (onUpdateFoodIntake && formData.foodIntake) {
        onUpdateFoodIntake(formData.foodIntake);
      }
      onGenerateAiSummary();
    }, 4500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* HEADER & SECTION SELECTOR */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <FileText className="w-5 h-5 text-emerald-700" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-outfit">
                Clinical Patient History & Case Intake
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Standardized dual-domain clinical intake: strictly organized into General Medical History and Classical AYUSH / Ayurvedic Assessment.
            </p>
          </div>

          {/* Quick Save Draft Button */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-slate-600" />
              Save Draft
            </button>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
              ABDM Linked
            </span>
          </div>
        </div>

        {/* TWO CLEARLY SEPARATE SECTION SWITCHER TABS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          
          {/* TAB 1: GENERAL CASE HISTORY */}
          <button
            type="button"
            onClick={() => setActiveTab('part1')}
            className={`p-3.5 rounded-2xl border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
              activeTab === 'part1'
                ? 'bg-gradient-to-br from-indigo-50/90 via-blue-50/50 to-white border-indigo-500 shadow-xs ring-2 ring-indigo-500/20'
                : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-600'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl flex items-center justify-center ${
                  activeTab === 'part1' ? 'bg-indigo-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Activity className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 font-mono">Part 1</span>
                  <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    General Case History
                  </h2>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100/80 text-indigo-800 border border-indigo-200">
                Conventional
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pl-1">
              Chief Complaint, HPI, Past History, Drugs & Allergies, Family/Personal History
            </p>
          </button>

          {/* TAB 2: AYUSH / AYURVEDIC HISTORY */}
          <button
            type="button"
            onClick={() => setActiveTab('part2')}
            className={`p-3.5 rounded-2xl border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
              activeTab === 'part2'
                ? 'bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-600'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl flex items-center justify-center ${
                  activeTab === 'part2' ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600'
                }`}>
                  <UserCheck className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 font-mono">Part 2</span>
                  <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    AYUSH / Ayurvedic History
                  </h2>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-300">
                Classical Ayush
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pl-1">
              Dashavidha Pariksha, Ahara-Vihara (Diet/Agni), Ashtavidha Pariksha & Srotas
            </p>
          </button>

          {/* TAB 3: DUAL-PART CASE REVIEW */}
          <button
            type="button"
            onClick={() => setActiveTab('review')}
            className={`p-3.5 rounded-2xl border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
              activeTab === 'review'
                ? 'bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white border-amber-500 shadow-xs ring-2 ring-amber-500/20'
                : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-600'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl flex items-center justify-center ${
                  activeTab === 'review' ? 'bg-amber-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 font-mono">Review & AI</span>
                  <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                    Dual-Part Case Review
                  </h2>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300">
                Side-by-Side
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pl-1">
              Compare both sections, verify cross-domain details & trigger AI synthesis
            </p>
          </button>

        </div>
      </div>

      {/* SAVE TOAST NOTIFICATION */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* PART 1: GENERAL CASE HISTORY CONTAINER (VISUALLY DISTINCT SLATE-INDIGO CLINICAL THEME) */}
      {/* ========================================================================================= */}
      {activeTab === 'part1' && (
        <div className="bg-white rounded-3xl border-2 border-indigo-200/90 p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          
          {/* Section 1 Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-white/10 text-white border border-white/20">
                <Activity className="w-5 h-5 text-indigo-300" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                    Domain 1
                  </span>
                  <h2 className="text-base sm:text-lg font-black tracking-tight font-outfit">
                    General Case History (Conventional Medical Intake)
                  </h2>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Complete documentation of chief complaints, onset timeline, past medical history, medications, allergies, and family history
                </p>
              </div>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 self-start sm:self-auto font-mono">
              6 Clinical Parameters
            </span>
          </div>

          <div className="space-y-5">
            
            {/* 1.1 Chief Complaint (Pradhana Vedana) */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  1. Chief Complaint (Pradhana Vedana) <span className="text-rose-500">*</span>
                </label>
                
                {/* Voice Dictation Button Simulation */}
                <button
                  type="button"
                  onClick={() => toggleVoiceDictation('chiefComplaint')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    isRecording 
                      ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 shadow-2xs'
                  }`}
                  title="Record voice narration in English/Hindi"
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5 text-rose-600" /> : <Mic className="w-3.5 h-3.5 text-indigo-600" />}
                  <span>{isRecording ? 'Listening...' : 'Voice Dictate'}</span>
                </button>
              </div>

              <textarea
                rows={3}
                value={formData.chiefComplaint}
                onChange={(e) => setFormData({...formData, chiefComplaint: e.target.value})}
                className="w-full p-3.5 text-sm bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all leading-relaxed"
                placeholder="Describe presenting symptoms in patient's own words (e.g. Upper abdominal burning, chest tightness, nausea)..."
                required
              />
            </div>

            {/* 1.2 History of Present Illness (HPI) & Progression */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  2. History of Present Illness (HPI) & Progression
                </label>
                <button
                  type="button"
                  onClick={() => toggleVoiceDictation('hpi')}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 shadow-2xs cursor-pointer"
                >
                  <Mic className="w-3 h-3 text-indigo-600" />
                  <span>Dictate HPI</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={formData.hpi}
                onChange={(e) => setFormData({...formData, hpi: e.target.value})}
                className="w-full p-3.5 text-sm bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all leading-relaxed"
                placeholder="Onset, timeline, aggravating triggers (food, stress), relieving factors, and diurnal fluctuations..."
              />
            </div>

            {/* Duration & Severity Dual Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Duration of Symptoms
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="e.g. 6 Months, 2 Weeks acute flare"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Severity Grading
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="Mild">Mild (Alpa Vedana — Minimal functional impairment)</option>
                  <option value="Moderate">Moderate (Madhyama Vedana — Interferes with daily work)</option>
                  <option value="Moderate to Severe">Moderate to Severe (Escalating discomfort)</option>
                  <option value="Severe / Acute">Severe / Acute (Teevra Vedana — Urgent attention required)</option>
                </select>
              </div>
            </div>

            {/* 1.3 Past Medical & Surgical History (Purva Vyadhi Vritta) */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. Past Medical & Surgical History (Purva Vyadhi Vritta)
              </label>
              <textarea
                rows={2}
                value={formData.pastHistory}
                onChange={(e) => setFormData({...formData, pastHistory: e.target.value})}
                placeholder="Prior hospitalizations, major illnesses, endoscopic or diagnostic findings, past surgeries..."
                className="w-full p-3.5 text-sm bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
              />
            </div>

            {/* 1.4 Current Medications & Drugs */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-indigo-600" />
                4. Current Medications & Drugs (Allopathic & Concurrent)
              </label>
              <textarea
                rows={2}
                value={formData.currentMedications}
                onChange={(e) => setFormData({...formData, currentMedications: e.target.value})}
                placeholder="Active allopathic drugs (e.g. Pantoprazole 40mg, Atorvastatin 10mg, Metformin), dosages, frequency..."
                className="w-full p-3.5 text-sm bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
              />
            </div>

            {/* 1.5 Allergies & 1.6 Family/Personal History Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/80 space-y-1.5">
                <label className="block text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  5. Drug & Food Allergies (Asatmya)
                </label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  placeholder="e.g. NKDA, intolerance to NSAIDs, penicillin, chili"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  6. Family History (Kula Vritta)
                </label>
                <input
                  type="text"
                  value={formData.familyHistory}
                  onChange={(e) => setFormData({...formData, familyHistory: e.target.value})}
                  placeholder="e.g. Father had CAD at 55; Mother had chronic gastritis & diabetes"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

            </div>

            {/* Personal & Social History */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Personal & Social History (Vyasanas, Occupation & Routine)
              </label>
              <input
                type="text"
                value={formData.personalHistory}
                onChange={(e) => setFormData({...formData, personalHistory: e.target.value})}
                placeholder="e.g. Sedentary desk job, 9h screen time, non-smoker, occasional alcohol, irregular sleep pattern"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

          </div>

          {/* Navigation Action Footer for Part 1 */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-slate-500" />
              Save General Intake
            </button>

            <button
              type="button"
              onClick={() => {
                onSaveCase(formData);
                setActiveTab('part2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              Proceed to Part 2: AYUSH / Ayurvedic History
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================================= */}
      {/* PART 2: AYUSH / AYURVEDIC HISTORY CONTAINER (VISUALLY DISTINCT EMERALD-TEAL THEME) */}
      {/* ========================================================================================= */}
      {activeTab === 'part2' && (
        <div className="bg-white rounded-3xl border-2 border-emerald-300/90 p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          
          {/* Section 2 Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-white/10 text-white border border-white/20">
                <UserCheck className="w-5 h-5 text-emerald-200" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                    Domain 2
                  </span>
                  <h2 className="text-base sm:text-lg font-black tracking-tight font-outfit">
                    AYUSH / Ayurvedic History (Classical Samhita Assessment)
                  </h2>
                </div>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Charaka Samhita Dashavidha Pariksha, Ahara-Vihara lifestyle & metabolic analysis, and Yogaratnakara Ashtavidha clinical markers
                </p>
              </div>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 self-start sm:self-auto font-mono">
              Charaka Vimana Sthana 8
            </span>
          </div>

          <div className="space-y-8">
            
            {/* SUB-SECTION 2.1: DASHAVIDHA PARIKSHA (10-FOLD EXAMINATION) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                    2.1
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-outfit">
                    Dashavidha Pariksha (10-Fold Ayurvedic Examination)
                  </h3>
                </div>
                <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold self-start">
                  Constitutional Vitality Evaluation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* 1. Prakriti */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    1. Prakriti (Baseline Constitution)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.prakriti}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, prakriti: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* 2. Vikriti */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    2. Vikriti (Current Morbidity / Imbalance)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.vikriti}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, vikriti: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* 3. Sara */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    3. Sara (Tissue Excellence / Dhatu Essence)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.sara}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, sara: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* 4. Samhanana */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    4. Samhanana (Body Compactness & Build)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.samhanana}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, samhanana: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* 5. Pramana */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    5. Pramana (Anthropometric Proportions)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.pramana}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, pramana: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* 6. Satmya */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    6. Satmya (Habituation & Diet Adaptability)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.satmya}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, satmya: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* 7. Satva */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    7. Satva (Mental Fortitude / Psychological Power)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.satva}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, satva: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* 8. Ahara Shakti */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    8. Ahara Shakti (Ingestion & Digestion Capacity)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.aharaShakti}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, aharaShakti: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* 9. Vyayama Shakti */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    9. Vyayama Shakti (Physical Endurance / Capacity)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.vyayamaShakti}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, vyayamaShakti: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* 10. Vaya */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-emerald-50/20">
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    10. Vaya (Age / Chronological Stage)
                  </label>
                  <input
                    type="text"
                    value={formData.dashavidha.vaya}
                    onChange={(e) => setFormData({
                      ...formData,
                      dashavidha: { ...formData.dashavidha, vaya: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

              </div>
            </div>

            {/* SUB-SECTION 2.2: AHARA & VIHARA (DIETARY HABITS & LIFESTYLE) */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs">
                    2.2
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-outfit">
                    Ahara & Vihara (Dietary Habits & Lifestyle Regimen)
                  </h3>
                </div>
                <span className="text-[11px] text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 font-semibold self-start">
                  Metabolic & Diurnal Rhythm
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Agni Type (Digestive Fire)
                  </label>
                  <select
                    value={formData.aharaVihara.agniType}
                    onChange={(e) => setFormData({
                      ...formData,
                      aharaVihara: { ...formData.aharaVihara, agniType: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Vishamagni with Mandagni tendencies (Variable & sluggish)">
                      Vishamagni (Irregular) / Mandagni (Sluggish)
                    </option>
                    <option value="Tikshnagni (Hyper-metabolic / intense hunger with burning)">
                      Tikshnagni (Hyper-metabolic / Sharp)
                    </option>
                    <option value="Samagni (Balanced, timely appetite with light digestion)">
                      Samagni (Balanced & Ideal)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Koshtha Type (Alimentary Bowel Tendency)
                  </label>
                  <select
                    value={formData.aharaVihara.koshthaType}
                    onChange={(e) => setFormData({
                      ...formData,
                      aharaVihara: { ...formData.aharaVihara, koshthaType: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="Madhyama Koshtha with occasional hyperacidity and dry stool tendencies">
                      Madhyama Koshtha (Balanced / Normal)
                    </option>
                    <option value="Krura Koshtha (Dry, sluggish evacuation tendency; requires warm fluids)">
                      Krura Koshtha (Hard / Constipation-prone)
                    </option>
                    <option value="Mridu Koshtha (Soft, loose stools easily induced by milk/sweets)">
                      Mridu Koshtha (Soft / Loose tendency)
                    </option>
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dietary Preferences & Rasa Inclinations
                </label>
                <input
                  type="text"
                  value={formData.aharaVihara.dietaryPreference}
                  onChange={(e) => setFormData({
                    ...formData,
                    aharaVihara: { ...formData.aharaVihara, dietaryPreference: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Viruddha Ahara (Incompatible Food Combinations)
                  </label>
                  <input
                    type="text"
                    value={formData.aharaVihara.viruddhaAhara}
                    onChange={(e) => setFormData({
                      ...formData,
                      aharaVihara: { ...formData.aharaVihara, viruddhaAhara: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nidra (Sleep Pattern & Afternoon Naps)
                  </label>
                  <input
                    type="text"
                    value={formData.aharaVihara.nidraPattern}
                    onChange={(e) => setFormData({
                      ...formData,
                      aharaVihara: { ...formData.aharaVihara, nidraPattern: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vyayama (Physical Activity & Exercise Routine)
                  </label>
                  <input
                    type="text"
                    value={formData.aharaVihara.vyayamaHabit}
                    onChange={(e) => setFormData({
                      ...formData,
                      aharaVihara: { ...formData.aharaVihara, vyayamaHabit: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Manasika Bhavas (Stress, Worry, Anxiety levels)
                  </label>
                  <input
                    type="text"
                    value={formData.aharaVihara.manasikaBhavas}
                    onChange={(e) => setFormData({
                      ...formData,
                      aharaVihara: { ...formData.aharaVihara, manasikaBhavas: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              {/* Detailed Daily Food Intake Box */}
              <div className="pt-4 mt-2 border-t border-slate-200 bg-amber-50/30 p-4 rounded-2xl border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                      <Utensils className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Detailed Daily Food Intake (Feeds into AI Engine)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Record meal specifics for Ahara Nidana (dietary etiology) and Pathya-Apathya formulation
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    AI Summarizer Input
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">🥣 Breakfast (Morning)</label>
                    <input
                      type="text"
                      value={formData.foodIntake?.breakfast || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        foodIntake: { ...formData.foodIntake, breakfast: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">🍛 Lunch (Madhyahna)</label>
                    <input
                      type="text"
                      value={formData.foodIntake?.lunch || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        foodIntake: { ...formData.foodIntake, lunch: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">☕ Evening Snacks</label>
                    <input
                      type="text"
                      value={formData.foodIntake?.eveningSnacks || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        foodIntake: { ...formData.foodIntake, eveningSnacks: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">🍽️ Dinner (Ratri)</label>
                    <input
                      type="text"
                      value={formData.foodIntake?.dinner || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        foodIntake: { ...formData.foodIntake, dinner: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">💧 Daily Fluids</label>
                    <input
                      type="text"
                      value={formData.foodIntake?.fluids || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        foodIntake: { ...formData.foodIntake, fluids: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">📝 Dietary Peculiarities</label>
                    <input
                      type="text"
                      value={formData.foodIntake?.notes || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        foodIntake: { ...formData.foodIntake, notes: e.target.value }
                      })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SUB-SECTION 2.3: OTHER AYURVEDIC ASSESSMENTS (ASHTAVIDHA PARIKSHA & SROTAS) */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-teal-100">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs">
                    2.3
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-outfit">
                    Other Ayurvedic Assessments (Ashtavidha Pariksha & Srotas)
                  </h3>
                </div>
                <span className="text-[11px] text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 font-semibold self-start">
                  Yogaratnakara 8-Fold Markers
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">1. Nadi (Radial Pulse Rhythm & Gati)</label>
                  <input
                    type="text"
                    value={formData.ashtavidha.nadi}
                    onChange={(e) => setFormData({
                      ...formData,
                      ashtavidha: { ...formData.ashtavidha, nadi: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">2. Jihva (Tongue Appearance & Ama)</label>
                  <input
                    type="text"
                    value={formData.ashtavidha.jihva}
                    onChange={(e) => setFormData({
                      ...formData,
                      ashtavidha: { ...formData.ashtavidha, jihva: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">3. Mutra (Urine Frequency & Clarity)</label>
                  <input
                    type="text"
                    value={formData.ashtavidha.mutra}
                    onChange={(e) => setFormData({
                      ...formData,
                      ashtavidha: { ...formData.ashtavidha, mutra: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">4. Mala (Bowel Evacuation Tendency)</label>
                  <input
                    type="text"
                    value={formData.ashtavidha.mala}
                    onChange={(e) => setFormData({
                      ...formData,
                      ashtavidha: { ...formData.ashtavidha, mala: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">5. Shabda (Voice Quality & Resonance)</label>
                  <input
                    type="text"
                    value={formData.ashtavidha.shabda}
                    onChange={(e) => setFormData({
                      ...formData,
                      ashtavidha: { ...formData.ashtavidha, shabda: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">6. Sparsha (Skin Touch & Temperature)</label>
                  <input
                    type="text"
                    value={formData.ashtavidha.sparsha}
                    onChange={(e) => setFormData({
                      ...formData,
                      ashtavidha: { ...formData.ashtavidha, sparsha: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">7. Drik (Ocular Inspection & Conjunctiva)</label>
                  <input
                    type="text"
                    value={formData.ashtavidha.drik}
                    onChange={(e) => setFormData({
                      ...formData,
                      ashtavidha: { ...formData.ashtavidha, drik: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-800 mb-1">8. Akriti (General Habitus & Build)</label>
                  <input
                    type="text"
                    value={formData.ashtavidha.akriti}
                    onChange={(e) => setFormData({
                      ...formData,
                      ashtavidha: { ...formData.ashtavidha, akriti: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>

              </div>

              {/* Additional Ayurvedic Assessment Notes & Srotas */}
              <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/80 space-y-1.5">
                <label className="block text-xs font-bold text-teal-950 uppercase tracking-wider">
                  Additional Ayurvedic Findings, Srotas & Rogamarga
                </label>
                <textarea
                  rows={2}
                  value={formData.otherAssessments}
                  onChange={(e) => setFormData({...formData, otherAssessments: e.target.value})}
                  className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl leading-relaxed"
                />
              </div>

            </div>

          </div>

          {/* Navigation Action Footer for Part 2 */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                onSaveCase(formData);
                setActiveTab('part1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to General Case History
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4 text-emerald-700" />
                Save AYUSH History
              </button>

              <button
                type="button"
                onClick={() => {
                  onSaveCase(formData);
                  setActiveTab('review');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                Review Dual-Part Case
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================================= */}
      {/* PART 3: DUAL-PART CASE REVIEW (SIDE-BY-SIDE VISUALLY DISTINCT COMPARATIVE VIEW) */}
      {/* ========================================================================================= */}
      {activeTab === 'review' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-4 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h2 className="text-base sm:text-lg font-black tracking-tight font-outfit">
                  Complete Dual-Part Patient History Review
                </h2>
              </div>
              <p className="text-xs text-slate-300">
                Both sections are organized independently. Review all fields before initiating multimodal AI clinical synthesis.
              </p>
            </div>

            <button
              type="button"
              onClick={handleFinalAiSynthesis}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer self-start sm:self-auto"
            >
              <Sparkles className="w-4 h-4 text-emerald-100" />
              Synthesize with AI Engine
            </button>
          </div>

          {/* TWO SEPARATE REVIEW CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* CARD 1: GENERAL CASE HISTORY REVIEW */}
            <div className="bg-slate-50/90 rounded-3xl border-2 border-indigo-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 font-bold">
                    <Activity className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 font-outfit">
                      1. General Case History
                    </h3>
                    <p className="text-[10px] text-indigo-800 font-semibold">Conventional Medical Record</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('part1')}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Part 1
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 bg-white p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Chief Complaint:</span>
                  <p className="text-slate-800 leading-relaxed font-medium">{formData.chiefComplaint || 'Not recorded'}</p>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">HPI & Progression:</span>
                  <p className="text-slate-700 leading-relaxed">{formData.hpi || 'None recorded'}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900">Duration: </span>
                    <span>{formData.duration}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Severity: </span>
                    <span className="font-semibold text-amber-700">{formData.severity}</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">Past Medical & Surgical History:</span>
                  <p className="text-slate-700 leading-relaxed">{formData.pastHistory || 'No previous history recorded'}</p>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block mb-0.5">Current Medications:</span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-2 rounded-xl border border-slate-200">
                    {formData.currentMedications || 'None'}
                  </p>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <span className="font-bold text-rose-900 block mb-0.5">Drug & Food Allergies:</span>
                  <p className="text-rose-700 leading-relaxed bg-rose-50/50 p-2 rounded-xl border border-rose-200">
                    {formData.allergies || 'No known drug allergies (NKDA)'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Family History:</span>
                    <p className="text-slate-600">{formData.familyHistory || 'None reported'}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Personal History:</span>
                    <p className="text-slate-600">{formData.personalHistory || 'None reported'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: AYUSH / AYURVEDIC HISTORY REVIEW */}
            <div className="bg-emerald-50/70 rounded-3xl border-2 border-emerald-300 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                    <UserCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 font-outfit">
                      2. AYUSH / Ayurvedic History
                    </h3>
                    <p className="text-[10px] text-emerald-800 font-semibold">Classical Samhita Assessment</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('part2')}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Part 2
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 bg-white p-4 rounded-2xl border border-slate-200">
                
                {/* Dashavidha Summary */}
                <div>
                  <span className="font-bold text-emerald-950 block mb-1">Dashavidha Pariksha (10-Fold Assessment):</span>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-200/70">
                    <div><strong>Prakriti:</strong> {formData.dashavidha.prakriti}</div>
                    <div><strong>Vikriti:</strong> {formData.dashavidha.vikriti}</div>
                    <div><strong>Sara:</strong> {formData.dashavidha.sara}</div>
                    <div><strong>Samhanana:</strong> {formData.dashavidha.samhanana}</div>
                    <div><strong>Pramana:</strong> {formData.dashavidha.pramana}</div>
                    <div><strong>Satva:</strong> {formData.dashavidha.satva}</div>
                    <div><strong>Ahara Shakti:</strong> {formData.dashavidha.aharaShakti}</div>
                    <div><strong>Vaya:</strong> {formData.dashavidha.vaya}</div>
                  </div>
                </div>

                {/* Ahara & Vihara Summary */}
                <div className="pt-1 border-t border-slate-100">
                  <span className="font-bold text-emerald-950 block mb-1">Ahara-Vihara (Diet & Regimen):</span>
                  <div className="space-y-1 text-[11px] text-slate-600 bg-teal-50/30 p-2.5 rounded-xl border border-teal-200/70">
                    <div><strong>Agni:</strong> {formData.aharaVihara.agniType}</div>
                    <div><strong>Koshtha:</strong> {formData.aharaVihara.koshthaType}</div>
                    <div><strong>Viruddha Ahara:</strong> {formData.aharaVihara.viruddhaAhara}</div>
                    <div><strong>Nidra / Sleep:</strong> {formData.aharaVihara.nidraPattern}</div>
                    <div><strong>Stress (Manasika):</strong> {formData.aharaVihara.manasikaBhavas}</div>
                  </div>
                </div>

                {/* Ashtavidha Summary */}
                <div className="pt-1 border-t border-slate-100">
                  <span className="font-bold text-emerald-950 block mb-1">Ashtavidha Pariksha & Srotas:</span>
                  <div className="space-y-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div><strong>Nadi:</strong> {formData.ashtavidha.nadi}</div>
                    <div><strong>Jihva:</strong> {formData.ashtavidha.jihva}</div>
                    <div><strong>Mutra & Mala:</strong> {formData.ashtavidha.mutra} • {formData.ashtavidha.mala}</div>
                    <div><strong>Sparsha & Drik:</strong> {formData.ashtavidha.sparsha} • {formData.ashtavidha.drik}</div>
                    <div><strong>Srotas:</strong> {formData.otherAssessments}</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Review Bottom Actions */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Both General History and AYUSH History ready for dual-condition multimodal AI synthesis.</span>
            </div>

            <button
              type="button"
              onClick={handleFinalAiSynthesis}
              className="flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/30 transition-all cursor-pointer w-full sm:w-auto justify-center"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              Synthesize Case with AI Engine
            </button>
          </div>

        </div>
      )}

      {/* AI Processing Modal Overlay */}
      {isAiProcessing && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl text-center space-y-5 animate-scaleUp">
            <div className="relative mx-auto w-16 h-16">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <Sparkles className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 font-outfit">
                AI Clinical Reasoning Engine
              </h3>
              <p className="text-xs text-emerald-700 font-semibold mt-1">
                AyurVaidya LLM + Classical Knowledge Graph
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <p className="text-xs text-slate-700 leading-relaxed font-medium animate-pulse">
                {aiProcessingStage}
              </p>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-4/5 animate-pulse rounded-full"></div>
            </div>

            <p className="text-[11px] text-slate-400">
              Cross-analyzing General History with Dashavidha & Ahara-Vihara parameters...
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
