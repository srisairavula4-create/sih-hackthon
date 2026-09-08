import React, { useState } from 'react';
import { 
  Sparkles, 
  Stethoscope, 
  CheckCircle2, 
  Clock,
  ShieldCheck, 
  Check, 
  Edit3
} from 'lucide-react';

export const AyurvedicCaseSummaryCard = ({
  conditionType = 'stomach_pain', // 'stomach_pain' | 'chest_pain'
  customSummary = null,
  onDecisionChange = null
}) => {
  // Pre-configured structured clinical data matching user's exact specification
  const defaultStomach = {
    title: "AYURVEDIC CASE SUMMARY",
    chiefComplaint: "Stomach pain",
    duration: "2 weeks",
    location: "Upper abdomen",
    associatedSymptoms: "Reduced appetite, bloating",
    previousRecords: "Endoscopy shows antral erythema",
    previousMedications: "Pantoprazole 40 mg",
    ayurvedicHistory: "Agni-related complaints reported; Koshtha details recorded",
    source: "Patient voice + endoscopy report + prescription",
    confidence: "0.91",
    statusDraft: "Draft — Vaidya verification required",
    differentialOptions: [
      {
        id: "udara_shoola",
        name: "Udara Shoola",
        sanskrit: "उदर शूल",
        indication: "Vata-Pitta colicky abdominal distress",
        description: "Severe spasmodic discomfort exacerbated by sluggish peristalsis and localized Vata-Pitta obstruction in Annavaha Srotas."
      },
      {
        id: "amlapitta",
        name: "Amlapitta",
        sanskrit: "अम्लपित्त",
        indication: "Acid-peptic hyperacidity disorder",
        description: "Burning sensation in epigastrium with sour eructations, aggravated by Vidahi and Pitta-provocative dietary habits."
      },
      {
        id: "parinama_shoola",
        name: "Parinama Shoola",
        sanskrit: "परिणाम शूल",
        indication: "Post-prandial / duodenal phase pain",
        description: "Discomfort intensifying during the transformation and digestion phase of Ahara, relieved after digestion is complete."
      },
      {
        id: "annadrava_shoola",
        name: "Annadrava Shoola",
        sanskrit: "अन्नद्रव शूल",
        indication: "Continuous acid distress regardless of meals",
        description: "Deep gastric mucosal irritation persisting whether food is consumed or withheld, requiring intense Pitta-Shamana."
      }
    ]
  };

  const defaultChest = {
    title: "AYURVEDIC CASE SUMMARY",
    chiefComplaint: "Chest pain",
    duration: "3 weeks",
    location: "Retro-sternal / Left precordium",
    associatedSymptoms: "Exertional tightness, mild breathlessness, morning heaviness",
    previousRecords: "12-Lead ECG shows normal sinus rhythm; Triglycerides 192 mg/dL, HDL 38 mg/dL",
    previousMedications: "Tab. Atorvastatin 10 mg, Tab. Metformin 500 mg",
    ayurvedicHistory: "Rasavaha & Medovaha Sroto-rodha reported; Dhatvagni Mandya recorded",
    source: "Patient voice + ECG report + cardiology prescription",
    confidence: "0.94",
    statusDraft: "Draft — Vaidya verification required",
    differentialOptions: [
      {
        id: "hrid_shoola",
        name: "Hrid-Shoola (Kaphaja-Vataja)",
        sanskrit: "हृच्छूल",
        indication: "Anginal chest heaviness with channel congestion",
        description: "Constricting retro-sternal heaviness and discomfort due to Kapha-Vata blockage in Rasavaha and Medovaha micro-channels."
      },
      {
        id: "kaphaja_hridroga",
        name: "Kaphaja Hridroga",
        sanskrit: "कफज हृद्रोग",
        indication: "Cardiovascular stagnation & sluggish circulation",
        description: "Persistent precordial fullness, lethargy, and dyslipidemia causing diminished cardiac pump dynamism."
      },
      {
        id: "medovaha_srotorodha",
        name: "Medovaha Srotorodha",
        sanskrit: "मेदोवह स्रोतोरोध",
        indication: "Atherogenic vascular channel occlusion",
        description: "Metabolic endotoxins (Ama) and excessive Medo-Dhatu narrowing peripheral and coronary micro-vascular beds."
      },
      {
        id: "uras_toda",
        name: "Uras-Toda / Kostha-Vata",
        sanskrit: "उरस्तॊद",
        indication: "Gastric upward gas reflex radiating to chest",
        description: "Pratiloma Vata from sluggish gastro-intestinal emptying pressing upward against the diaphragm and mimicking angina."
      }
    ]
  };

  const isStomach = conditionType === 'stomach_pain';
  const data = customSummary || (isStomach ? defaultStomach : defaultChest);

  const storageKey = `ayurvaidya_decision_${conditionType}`;

  const [selectedDiagnosis, setSelectedDiagnosis] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedDiagnosis) return parsed.selectedDiagnosis;
      }
    } catch (e) {}
    return isStomach ? "Udara Shoola" : "Hrid-Shoola (Kaphaja-Vataja)";
  });

  const [isVerified, setIsVerified] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return !!parsed.isVerified;
      }
    } catch (e) {}
    return false;
  });

  const [vaidyaNotes, setVaidyaNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.notes || "";
      }
    } catch (e) {}
    return isStomach 
      ? "Advised Sukumaram Kashayam 15ml with warm water twice daily before meals and Takra at lunch."
      : "Advised Arjuna Ksheerapaka Churna 3g boiled in milk twice daily after meals. Avoid sedentary hours.";
  });

  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const persistDecision = (diagnosis, verified, notes) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        selectedDiagnosis: diagnosis,
        isVerified: verified,
        notes: notes,
        updatedAt: new Date().toISOString()
      }));
    } catch (e) {}

    if (onDecisionChange) {
      onDecisionChange({
        conditionType,
        selectedDiagnosis: diagnosis,
        isVerified: verified,
        notes
      });
    }
  };

  const handleSelectOption = (optionName) => {
    setSelectedDiagnosis(optionName);
    persistDecision(optionName, isVerified, vaidyaNotes);
  };

  const handleToggleVerification = () => {
    const nextVerified = !isVerified;
    setIsVerified(nextVerified);
    persistDecision(selectedDiagnosis, nextVerified, vaidyaNotes);
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    persistDecision(selectedDiagnosis, isVerified, vaidyaNotes);
    setIsEditingNotes(false);
  };

  const selectedOptionObj = data.differentialOptions.find(o => o.name === selectedDiagnosis) || data.differentialOptions[0];

  return (
    <div className={`rounded-3xl border-2 transition-all shadow-xs overflow-hidden ${
      isStomach 
        ? 'bg-gradient-to-br from-amber-50/60 via-orange-50/20 to-white border-amber-300' 
        : 'bg-gradient-to-br from-teal-50/60 via-emerald-50/20 to-white border-teal-300'
    }`}>
      
      {/* CARD TOP BAR */}
      <div className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2 ${
        isStomach ? 'bg-amber-100/80 border-amber-200' : 'bg-teal-100/80 border-teal-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`p-1.5 rounded-xl text-white font-bold shadow-2xs ${
            isStomach ? 'bg-amber-700' : 'bg-teal-700'
          }`}>
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className={`text-xs font-black tracking-wider uppercase font-outfit ${
              isStomach ? 'text-amber-950' : 'text-teal-950'
            }`}>
              {data.title}
            </h3>
            <p className={`text-[10px] font-medium ${isStomach ? 'text-amber-800' : 'text-teal-800'}`}>
              Multimodal AI Clinical Synthesis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Confidence Badge */}
          <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-2xs ${
            isStomach 
              ? 'bg-amber-50 text-amber-900 border-amber-300' 
              : 'bg-teal-50 text-teal-900 border-teal-300'
          }`}>
            Confidence: {data.confidence}
          </span>

          {/* Status Badge */}
          {isVerified ? (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified: {selectedDiagnosis}
            </span>
          ) : (
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1">
              <Clock className="w-3 h-3 text-rose-600" />
              {data.statusDraft}
            </span>
          )}
        </div>
      </div>

      {/* CARD BODY: EXACT STRUCTURED CASE SUMMARY */}
      <div className="p-4 space-y-3.5">
        
        {/* Structured Field-by-Field Clinical Display */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs space-y-2 font-sans">
          
          <div className="space-y-1.5 text-xs">
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-bold text-slate-900">Chief complaint:</span>
              <span className="text-slate-800 font-medium">{data.chiefComplaint}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-bold text-slate-900">Duration:</span>
              <span className="text-slate-700">{data.duration}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-bold text-slate-900">Location:</span>
              <span className="text-slate-700">{data.location}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-bold text-slate-900">Associated symptoms:</span>
              <span className="text-slate-700">{data.associatedSymptoms}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-bold text-slate-900">Previous records:</span>
              <span className="text-slate-800 font-semibold bg-amber-50/70 px-1.5 py-0.5 rounded border border-amber-200 text-[11px]">
                {data.previousRecords}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-bold text-slate-900">Previous medications:</span>
              <span className="text-slate-800 font-semibold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-[11px]">
                {data.previousMedications}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-bold text-slate-900">Ayurvedic history:</span>
              <span className="text-slate-700">{data.ayurvedicHistory}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-slate-500 font-mono">
              <div>
                <span className="font-bold text-slate-700 font-sans">Source: </span>
                <span>{data.source}</span>
              </div>
              <div>
                <span className="font-bold text-slate-700 font-sans">Status: </span>
                <span className={isVerified ? 'text-emerald-700 font-bold' : 'text-rose-600 font-semibold'}>
                  {isVerified ? `Verified (${selectedDiagnosis})` : data.statusDraft}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* VAIDYA DECISION & DIFFERENTIAL DIAGNOSIS MODULE */}
        <div className={`rounded-2xl border p-3.5 space-y-3 ${
          isStomach ? 'bg-amber-50/70 border-amber-200' : 'bg-teal-50/70 border-teal-200'
        }`}>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5 border-b border-slate-200/60">
            <div>
              <div className="flex items-center gap-1.5">
                <Stethoscope className={`w-4 h-4 ${isStomach ? 'text-amber-800' : 'text-teal-800'}`} />
                <h4 className={`text-xs font-black uppercase tracking-wide ${
                  isStomach ? 'text-amber-950' : 'text-teal-950'
                }`}>
                  Then the Vaidya decides whether the presentation corresponds to:
                </h4>
              </div>
              <p className={`text-[10px] ${isStomach ? 'text-amber-800' : 'text-teal-800'}`}>
                Click to designate the classical Ayurvedic diagnosis:
              </p>
            </div>

            <button
              onClick={handleToggleVerification}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer ${
                isVerified 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20' 
                  : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300'
              }`}
            >
              {isVerified ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  Verified by Vaidya
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Confirm Vaidya Decision
                </>
              )}
            </button>
          </div>

          {/* Differential Diagnosis Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.differentialOptions.map((opt) => {
              const isSelected = selectedDiagnosis === opt.name;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.name)}
                  className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                    isSelected
                      ? (isStomach 
                          ? 'bg-white border-amber-600 shadow-xs ring-1 ring-amber-500' 
                          : 'bg-white border-teal-600 shadow-xs ring-1 ring-teal-500')
                      : 'bg-white/80 border-slate-200/90 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                        isSelected 
                          ? (isStomach ? 'border-amber-600 bg-amber-600' : 'border-teal-600 bg-teal-600') 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        {opt.name}
                      </p>
                    </div>

                    <span className="text-[10px] text-slate-400 font-serif italic">
                      {opt.sanskrit}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-600 mt-1 pl-5 leading-tight">
                    {opt.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Diagnosis Clinical Rationale Banner */}
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs flex items-start gap-2 shadow-2xs">
            <div className="p-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-slate-900 text-[11px]">
                  Designated Presentation:
                </span>
                <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200 text-[11px]">
                  {selectedDiagnosis}
                </span>
                <span className="text-[10px] text-slate-400 font-serif italic">
                  ({selectedOptionObj.sanskrit})
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {selectedOptionObj.description}
              </p>
            </div>
          </div>

          {/* Vaidya Clinical Notes & Instructions */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Edit3 className="w-3 h-3 text-slate-500" />
                Vaidya Clinical Instructions & Chikitsa Notes:
              </span>
              <button
                onClick={() => setIsEditingNotes(!isEditingNotes)}
                className="text-[10px] font-semibold text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
              >
                {isEditingNotes ? 'Close' : 'Modify Notes'}
              </button>
            </div>

            {isEditingNotes ? (
              <form onSubmit={handleSaveNotes} className="space-y-1.5">
                <textarea
                  value={vaidyaNotes}
                  onChange={(e) => setVaidyaNotes(e.target.value)}
                  rows={2}
                  className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter specific classical formulations, Anupana, and pathya guidelines..."
                />
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsEditingNotes(false)}
                    className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-0.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
                  >
                    Save Notes
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-xs text-slate-700 italic bg-white/90 p-2 rounded-xl border border-slate-200 leading-normal">
                "{vaidyaNotes}"
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
