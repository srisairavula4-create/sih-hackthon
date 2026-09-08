import React, { useState } from 'react';
import { 
  Stethoscope, 
  CheckCircle2, 
  Printer, 
  Save, 
  Edit3, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Plus, 
  Trash2, 
  X,
  AlertCircle
} from 'lucide-react';

export const VaidyaReviewView = ({ 
  aiSummary, 
  patient, 
  vaidya, 
  onUpdateSummary 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...aiSummary });
  const [isVerified, setIsVerified] = useState(aiSummary.verifiedByDoctor);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveDraft = () => {
    onUpdateSummary({
      ...formData,
      verifiedByDoctor: isVerified
    });
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleVerifyAndSign = () => {
    const updated = {
      ...formData,
      verifiedByDoctor: true,
      verifiedTimestamp: new Date().toLocaleString(),
      verifiedByVaidya: `${vaidya.name} (${vaidya.regNumber})`
    };
    setIsVerified(true);
    setFormData(updated);
    onUpdateSummary(updated);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleAddCustomHerb = () => {
    const newHerb = {
      id: `MED-${Date.now().toString().slice(-4)}`,
      name: "Haridra Khanda",
      ingredients: "Curcuma longa with Cow Ghee & Trikatu",
      dose: "3 grams",
      frequency: "Twice daily",
      timing: "Post-prandial with warm milk",
      anupana: "Lukewarm water",
      rationale: "Addresses peripheral cutaneous Pruritus and enhances allergic skin defense."
    };
    setFormData(prev => ({
      ...prev,
      prescribedFormulations: [...prev.prescribedFormulations, newHerb]
    }));
  };

  const handleRemoveHerb = (id) => {
    setFormData(prev => ({
      ...prev,
      prescribedFormulations: prev.prescribedFormulations.filter(h => h.id !== id)
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* Vaidya Clinical Station Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-teal-600/20">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-outfit">
                  {vaidya.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
                  {vaidya.qualification}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Reg No: <strong className="text-slate-700 font-mono">{vaidya.regNumber}</strong> • {vaidya.hospital}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Cancel Edit' : 'Edit Assessment'}
            </button>

            <button
              onClick={() => setShowPrintModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Prescription Preview
            </button>

            {isVerified ? (
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Case Digitally Verified & Signed
              </div>
            ) : (
              <button
                onClick={handleVerifyAndSign}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/25"
              >
                <ShieldCheck className="w-4 h-4" />
                Digitally Verify & Sign Case
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Patient Summary Strip */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-slate-400 font-medium">Reviewing Patient: </span>
          <strong className="text-slate-800 text-sm">{patient.name}</strong> ({patient.age}Y, {patient.gender})
        </div>
        <div>
          <span className="text-slate-400 font-medium">ABHA ID: </span>
          <span className="font-mono font-bold text-slate-800">{patient.abhaId || "Not Linked"}</span>
        </div>
        <div>
          <span className="text-slate-400 font-medium">Prakriti / Vikriti: </span>
          <strong className="text-emerald-700">{patient.prakriti}</strong> / <span className="text-amber-700">{patient.vikriti}</span>
        </div>
        <div>
          <span className="text-slate-400 font-medium">Case ID: </span>
          <span className="font-mono text-slate-700">{formData.caseId}</span>
        </div>
      </div>

      {/* Clinical Notes & Diagnostic Overview */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            Vaidya Diagnostic Verification & Modifications
          </h2>
          {isEditing && (
            <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
              Editing Mode Active
            </span>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Holistic Clinical Synthesis (AI Draft)
          </label>
          {isEditing ? (
            <textarea
              rows={3}
              value={formData.synthesisOverview}
              onChange={(e) => setFormData({...formData, synthesisOverview: e.target.value})}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20"
            />
          ) : (
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/70 leading-relaxed">
              {formData.synthesisOverview}
            </p>
          )}
        </div>

        {/* Doctor's Custom Clinical Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Attending Vaidya Remarks & Differential Diagnosis Notes
          </label>
          <textarea
            rows={2}
            value={formData.doctorNotes || "Advised patient to strictly avoid chilled fluids. Patient displays classical signs of Bahu-Drava-Kapha with Medodhatvagni Mandya. Srotoshodhana required prior to deep rejuvenation."}
            onChange={(e) => setFormData({...formData, doctorNotes: e.target.value})}
            placeholder="Add specific clinical instructions, contraindications, or Panchakarma scheduling..."
            className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      {/* Formulations Editor Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Herbal Formulations & Posology (Prescription List)
            </h3>
            <p className="text-xs text-slate-500">Modify dosages, vehicles (Anupana), or add custom classical preparations</p>
          </div>

          <button
            onClick={handleAddCustomHerb}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Herb
          </button>
        </div>

        <div className="space-y-3">
          {formData.prescribedFormulations.map((herb, index) => (
            <div key={herb.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{herb.name}</h4>
                  <span className="text-[10px] text-slate-400">({herb.ingredients})</span>
                </div>
                <p className="text-xs text-slate-600 pl-7">
                  <strong className="text-slate-800">{herb.dose}</strong> • {herb.frequency} • {herb.timing} • <span className="text-teal-700 font-medium">Anupana: {herb.anupana}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleRemoveHerb(herb.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove formulation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save Draft Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            Save Changes
          </button>
        </div>
      </div>

      {/* PRINTABLE PRESCRIPTION MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Official Clinical Handout Preview
              </span>
              <button
                onClick={() => setShowPrintModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Prescription Content Box */}
            <div id="printable-prescription" className="border-2 border-slate-200 p-6 rounded-2xl space-y-4 bg-white text-slate-900">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-black tracking-tight">{vaidya.hospital}</h2>
                  <p className="text-xs font-bold text-slate-800">{vaidya.name} • {vaidya.qualification}</p>
                  <p className="text-[11px] text-slate-500 font-mono">AYUSH Reg No: {vaidya.regNumber}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold">Ayurveda OPD</p>
                  <p className="text-[11px] text-slate-500 font-mono">Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Patient Demographics */}
              <div className="grid grid-cols-2 gap-2 text-xs py-1 border-b border-slate-200">
                <p><strong>Patient:</strong> {patient.name} ({patient.age}Y / {patient.gender})</p>
                <p className="font-mono"><strong>ABHA ID:</strong> {patient.abhaId || "N/A"}</p>
                <p><strong>Prakriti:</strong> {patient.prakriti}</p>
                <p><strong>Diagnosis:</strong> {formData.rogaNidana.vyadhi}</p>
              </div>

              {/* Rx Formulations */}
              <div>
                <p className="text-sm font-black text-slate-900 mb-2">Rx (Ayurvedic Medications):</p>
                <div className="space-y-2 text-xs">
                  {formData.prescribedFormulations.map((med, i) => (
                    <div key={med.id} className="border-b border-slate-100 pb-1">
                      <p className="font-bold">{i + 1}. {med.name} — {med.dose}</p>
                      <p className="text-slate-600">{med.frequency} • {med.timing} • Anupana: {med.anupana}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diet / Pathya Notes */}
              <div className="text-xs border-t border-slate-200 pt-2">
                <p className="font-bold text-slate-900 mb-1">Pathya-Apathya & Lifestyle Instructions:</p>
                <p className="text-slate-700">Avoid cold drinks, curds, day sleep (Divasvapna). Prefer barley water (Yava) and daily 40-minute morning brisk walk.</p>
              </div>

              {/* Digital Signature & Stamp */}
              <div className="pt-6 flex items-center justify-between border-t border-slate-200 text-xs">
                <div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold">
                    ✓ DIGITALLY VERIFIED VIA ABDM
                  </span>
                </div>
                <div className="text-center">
                  <div className="font-serif italic text-teal-800 text-sm font-bold">
                    Dr. Priyadarshini Joshi
                  </div>
                  <p className="text-[10px] text-slate-400">Authorized Medical Examiner</p>
                </div>
              </div>

            </div>

            {/* Print Trigger */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
              >
                <Printer className="w-4 h-4" />
                Print Official Prescription
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Save Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-2xl shadow-xl animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-100" />
          <p className="text-xs font-semibold">
            Clinical assessment & digital verification saved successfully!
          </p>
        </div>
      )}

    </div>
  );
};
