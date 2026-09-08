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
  Info
} from 'lucide-react';

export const CaseTakingWizard = ({ initialCase, onSaveCase, onGenerateAiSummary, onUpdateFoodIntake }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    ...initialCase,
    foodIntake: initialCase?.foodIntake || {
      breakfast: '',
      lunch: '',
      eveningSnacks: '',
      dinner: '',
      fluids: '',
      notes: ''
    }
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiProcessingStage, setAiProcessingStage] = useState('');

  // Voice dictation simulation
  const toggleVoiceDictation = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          chiefComplaint: prev.chiefComplaint + " [Patient adds: Also feeling severe mid-afternoon drowsiness and constant burning sensation in soles of feet after meals.]"
        }));
        setIsRecording(false);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleStepSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalAiSynthesis();
    }
  };

  const handleFinalAiSynthesis = () => {
    setIsAiProcessing(true);
    setAiProcessingStage('Synthesizing Chief Complaints & HPI with Classical Charaka Samhita taxonomies...');
    
    setTimeout(() => {
      setAiProcessingStage('Evaluating Dashavidha Pariksha & Ahara-Vihara parameters (Agni, Koshtha, Satva)...');
    }, 1200);

    setTimeout(() => {
      setAiProcessingStage('Correlating Allopathic Laboratory Biomarkers (HbA1c, FBS) with Kaphaja Prameha Samprapti...');
    }, 2400);

    setTimeout(() => {
      setAiProcessingStage('Formulating Chikitsa Sutra, Herbal Formulations & Pathya-Apathya Regimen...');
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

  const steps = [
    { number: 1, title: "Chief Complaint & HPI", icon: Activity },
    { number: 2, title: "Past History & Allergies", icon: Heart },
    { number: 3, title: "Dashavidha Pariksha", icon: UserCheck },
    { number: 4, title: "Ahara & Vihara", icon: Utensils },
    { number: 5, title: "Ashtavidha Pariksha", icon: Sparkles },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* Wizard Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <FileText className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-outfit">
                Ayurvedic Clinical Case-Taking Wizard
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Standardized digital intake combining Classical Samhita principles with modern medical history
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Step {currentStep} of 5
            </span>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isActive = currentStep === step.number;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setCurrentStep(step.number)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200/60 font-semibold'
                    : isCompleted
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-white border-slate-200/60 text-slate-400'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.number}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] truncate leading-tight">{step.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Body */}
      <form onSubmit={handleStepSubmit} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        
        {/* STEP 1: CHIEF COMPLAINT & HPI */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                1. Chief Complaint & History of Present Illness (HPI)
              </h2>
              <p className="text-xs text-slate-500">
                Document presenting symptoms, chronicity, and onset factors
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Chief Complaint (Pradhana Vedana) <span className="text-rose-500">*</span>
                </label>
                
                {/* Voice Dictation Button Simulation */}
                <button
                  type="button"
                  onClick={toggleVoiceDictation}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    isRecording 
                      ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  title="Simulate Ayurvedic voice dictation in English/Hindi"
                >
                  {isRecording ? <MicOff className="w-3 h-3 text-rose-600" /> : <Mic className="w-3 h-3 text-emerald-600" />}
                  <span>{isRecording ? 'Listening (Speaking...)' : 'Voice Dictate'}</span>
                </button>
              </div>

              <textarea
                rows={3}
                value={formData.chiefComplaint}
                onChange={(e) => setFormData({...formData, chiefComplaint: e.target.value})}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all leading-relaxed"
                placeholder="Describe principal symptoms in patient's words..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                History of Present Illness (HPI) & Progression
              </label>
              <textarea
                rows={3}
                value={formData.hpi}
                onChange={(e) => setFormData({...formData, hpi: e.target.value})}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all leading-relaxed"
                placeholder="Onset, aggravating triggers, previous interventions..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Duration of Symptoms
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Severity Grading
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="Mild">Mild (Alpa Vedana)</option>
                  <option value="Moderate">Moderate (Madhyama Vedana)</option>
                  <option value="Moderate to Severe">Moderate to Severe</option>
                  <option value="Severe / Acute">Severe / Acute (Teevra Vedana)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PAST HISTORY & ALLERGIES */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                2. Medical, Surgical, Drug & Allergy History
              </h2>
              <p className="text-xs text-slate-500">
                Past systemic illnesses, concurrent allopathic medications, and known hypersensitivities
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Past Medical & Surgical History (Purva Vyadhi Vritta)
              </label>
              <textarea
                rows={2}
                value={formData.pastHistory}
                onChange={(e) => setFormData({...formData, pastHistory: e.target.value})}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Current Medications (Allopathic & Ayurvedic)
              </label>
              <textarea
                rows={2}
                value={formData.currentMedications}
                onChange={(e) => setFormData({...formData, currentMedications: e.target.value})}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                  Drug & Food Allergies (Asatmya)
                </label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Family History (Kula Vritta)
                </label>
                <input
                  type="text"
                  value={formData.familyHistory}
                  onChange={(e) => setFormData({...formData, familyHistory: e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DASHAVIDHA PARIKSHA (10-FOLD EXAMINATION) */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  3. Dashavidha Pariksha (10-Fold Ayurvedic Clinical Examination)
                </h2>
                <p className="text-xs text-slate-500">
                  Classical Charaka Samhita framework for assessing constitutional and physical vitality
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full self-start">
                Charaka Samhita Vimana Sthana 8
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* 1. Prakriti */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50">
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
        )}

        {/* STEP 4: AHARA & VIHARA EVALUATION */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                4. Ahara & Vihara (Dietary Habits & Lifestyle Regimen)
              </h2>
              <p className="text-xs text-slate-500">
                Assess Agni (metabolic fire), Koshtha (bowel tendency), diurnal rhythm, and lifestyle stress
              </p>
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
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="Vishamagni & Mandagni (Variable appetite with delayed gastric emptying and heaviness)">
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
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="Krura Koshtha (Dry, sluggish evacuation tendency; requires warm fluids for clear stool)">
                    Krura Koshtha (Hard / Constipation-prone)
                  </option>
                  <option value="Mridu Koshtha (Soft, loose stools easily induced by milk/sweets)">
                    Mridu Koshtha (Soft / Loose tendency)
                  </option>
                  <option value="Madhyama Koshtha (Regular once or twice formed stools daily)">
                    Madhyama Koshtha (Balanced / Normal)
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
                  Vyayama (Physical Activity & Occupational Routine)
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

            {/* Detailed Daily Food Intake Box (Fed directly into AI Summarization) */}
            <div className="pt-4 mt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                    <Utensils className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Detailed Daily Food Intake (Feeds directly into AI Clinical Summary)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Record meal specifics to enable AI dietary etiology (Ahara Nidana) & Pathya-Apathya formulation
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  AI Summarizer Input
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🥣 Breakfast (Morning Ahara)
                  </label>
                  <input
                    type="text"
                    value={formData.foodIntake?.breakfast || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      foodIntake: { ...formData.foodIntake, breakfast: e.target.value }
                    })}
                    placeholder="e.g. 2 Idlis, coconut chutney, sweet tea"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🍛 Lunch (Madhyahna Ahara)
                  </label>
                  <input
                    type="text"
                    value={formData.foodIntake?.lunch || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      foodIntake: { ...formData.foodIntake, lunch: e.target.value }
                    })}
                    placeholder="e.g. Polished white rice, curd, dal, potato fry"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ☕ Evening Snacks
                  </label>
                  <input
                    type="text"
                    value={formData.foodIntake?.eveningSnacks || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      foodIntake: { ...formData.foodIntake, eveningSnacks: e.target.value }
                    })}
                    placeholder="e.g. Samosas, pakoras, sweet biscuits"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🍽️ Dinner (Ratri Ahara)
                  </label>
                  <input
                    type="text"
                    value={formData.foodIntake?.dinner || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      foodIntake: { ...formData.foodIntake, dinner: e.target.value }
                    })}
                    placeholder="e.g. 3 Rotis, paneer sabzi, sweet warm milk"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    💧 Daily Fluids & Hydration
                  </label>
                  <input
                    type="text"
                    value={formData.foodIntake?.fluids || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      foodIntake: { ...formData.foodIntake, fluids: e.target.value }
                    })}
                    placeholder="e.g. Chilled refrigerator water, sugary tea"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    📝 Dietary Peculiarities / Habits
                  </label>
                  <input
                    type="text"
                    value={formData.foodIntake?.notes || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      foodIntake: { ...formData.foodIntake, notes: e.target.value }
                    })}
                    placeholder="e.g. Habitual curd at night, chilled water after meals"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: ASHTAVIDHA PARIKSHA */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  5. Ashtavidha Pariksha (8-Fold Clinical Markers)
                </h2>
                <p className="text-xs text-slate-500">
                  Quick clinical markers: Pulse, Tongue, Urine, Bowel, Voice, Touch, Eyes, and Morphometry
                </p>
              </div>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-100/70 px-2.5 py-1 rounded-full self-start">
                Yogaratnakara Framework
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  1. Nadi (Radial Pulse Rhythm & Gati)
                </label>
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
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  2. Jihva (Tongue Appearance & Ama Coating)
                </label>
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
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  3. Mutra (Urine Frequency, Color & Clarity)
                </label>
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
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  4. Mala (Fecal Consistency & Evacuation)
                </label>
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
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  5. Shabda (Voice Quality & Acoustic Resonancy)
                </label>
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
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  6. Sparsha (Skin Temperature & Tactile Texture)
                </label>
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
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  7. Drik (Ocular Inspection & Conjunctiva)
                </label>
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
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  8. Akriti (General Habitus & Somatotype)
                </label>
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

            {/* AI Callout Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900">Ready for Multimodal AI Clinical Reasoning</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Submitting will cross-analyze these Ayurvedic clinical parameters with uploaded laboratory biomarkers (HbA1c, FBS) to synthesize the official Roga Nidana and Chikitsa Sutra.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Actions Footer */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Step
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            {currentStep < 5 ? (
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalAiSynthesis}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md shadow-emerald-600/25"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                Synthesize Case with AI Engine
              </button>
            )}
          </div>
        </div>

      </form>

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

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <p className="text-xs text-slate-700 leading-relaxed font-medium animate-pulse">
                {aiProcessingStage}
              </p>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-4/5 animate-pulse rounded-full"></div>
            </div>

            <p className="text-[11px] text-slate-400">
              Integrating Charaka Samhita, Sushruta Samhita, and modern biochemistry...
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
