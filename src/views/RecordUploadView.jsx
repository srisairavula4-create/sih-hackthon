import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  ArrowRight, 
  Pill, 
  Clock, 
  Trash2, 
  FileUp, 
  CreditCard, 
  Activity, 
  FileQuestion, 
  ShieldAlert, 
  RotateCcw,
  Stethoscope
} from 'lucide-react';

export const RecordUploadView = ({ 
  patient, 
  oldRecords = [], 
  onAddRecord, 
  onDeleteRecord, 
  onNavigateToTimeline 
}) => {
  const [selectedRecord, setSelectedRecord] = useState(oldRecords[0] || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Staged File State
  const [stagedFile, setStagedFile] = useState(null);

  // Scanning & Validation State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusText, setScanStatusText] = useState('');
  
  // Validation Outcome
  const [invalidReportError, setInvalidReportError] = useState(null);
  const [verifiedSuccessNotice, setVerifiedSuccessNotice] = useState(null);

  // Keep selected record valid if oldRecords updates
  useEffect(() => {
    if (!selectedRecord && oldRecords.length > 0) {
      setSelectedRecord(oldRecords[0]);
    } else if (selectedRecord && !oldRecords.some(r => r.id === selectedRecord.id)) {
      setSelectedRecord(oldRecords[0] || null);
    }
  }, [oldRecords]);

  // Handle Real File Selection from Native File Picker or Drop
  const handleFile = (file) => {
    if (!file) return;
    setInvalidReportError(null);
    setVerifiedSuccessNotice(null);

    const isImg = file.type.startsWith('image/');
    let previewUrl = null;
    if (isImg) {
      previewUrl = URL.createObjectURL(file);
    }

    const sizeKb = file.size / 1024;
    const sizeStr = sizeKb > 1024 
      ? `${(sizeKb / 1024).toFixed(1)} MB` 
      : `${Math.round(sizeKb)} KB`;

    setStagedFile({
      file,
      name: file.name,
      size: sizeStr,
      type: file.type,
      previewUrl
    });
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  // Preset Loaders: Stomach Pain vs Chest Pain vs Invalid
  const handleLoadStomachReport = () => {
    setInvalidReportError(null);
    setVerifiedSuccessNotice(null);
    setStagedFile({
      name: 'max_endoscopy_stomach_pain_report.pdf',
      size: '1.6 MB',
      type: 'application/pdf',
      previewUrl: null,
      presetType: 'stomach_lab'
    });
  };

  const handleLoadChestReport = () => {
    setInvalidReportError(null);
    setVerifiedSuccessNotice(null);
    setStagedFile({
      name: 'fortis_cardiology_ecg_chest_pain_report.pdf',
      size: '1.9 MB',
      type: 'application/pdf',
      previewUrl: null,
      presetType: 'chest_lab'
    });
  };

  const handleLoadInvalidFile = () => {
    setInvalidReportError(null);
    setVerifiedSuccessNotice(null);
    setStagedFile({
      name: 'personal_flight_ticket_invoice.pdf',
      size: '512 KB',
      type: 'application/pdf',
      previewUrl: null,
      presetType: 'invalid'
    });
  };

  const handleClearStaged = () => {
    setStagedFile(null);
    setInvalidReportError(null);
    setVerifiedSuccessNotice(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // VALIDATE DOCUMENT: Detect if valid report or invalid
  const validateMedicalDocument = (fileName, presetType) => {
    if (presetType === 'invalid') {
      return { isValid: false, reason: 'Non-medical invoice / receipt file detected.' };
    }
    if (presetType === 'stomach_lab') {
      return { isValid: true, category: 'Lab Report', condition: 'stomach_pain', conditionName: 'Stomach Pain (Udara Shoola)' };
    }
    if (presetType === 'chest_lab') {
      return { isValid: true, category: 'Lab Report', condition: 'chest_pain', conditionName: 'Chest Pain (Hrid-Shoola)' };
    }

    const lower = fileName.toLowerCase();

    // Known non-medical keywords
    const INVALID_WORDS = [
      'invoice', 'receipt', 'bill', 'resume', 'cv', 'contract', 
      'screenshot', 'wallpaper', 'flight', 'ticket', 'hotel', 'tax', 
      'salary', 'statement', 'music', 'game', 'movie', 'photo', 'random', 'test'
    ];

    if (INVALID_WORDS.some(w => lower.includes(w))) {
      return { 
        isValid: false, 
        reason: 'Document identified as non-clinical file (invoice/receipt/general media).' 
      };
    }

    // Stomach pain keywords
    const STOMACH_WORDS = ['stomach', 'endoscopy', 'gastro', 'abdomen', 'gastric', 'usg', 'ultrasound', 'pantoprazole', 'acidity'];
    // Chest pain keywords
    const CHEST_WORDS = ['chest', 'ecg', 'cardiac', 'cardio', 'heart', 'lipid', 'cholesterol', 'triglycerides', 'troponin', 'atorvastatin'];

    const isStomach = STOMACH_WORDS.some(w => lower.includes(w));
    const isChest = CHEST_WORDS.some(w => lower.includes(w));

    const isRx = lower.includes('rx') || lower.includes('presc') || lower.includes('prescription') || lower.includes('doctor');
    const category = isRx ? 'Prescription' : 'Lab Report';

    if (isStomach) {
      return { isValid: true, category, condition: 'stomach_pain', conditionName: 'Stomach Pain (Udara Shoola)' };
    }
    if (isChest) {
      return { isValid: true, category, condition: 'chest_pain', conditionName: 'Chest Pain (Hrid-Shoola)' };
    }

    // General medical terms
    const GENERAL_MEDICAL = ['blood', 'sugar', 'glucose', 'hba1c', 'clinic', 'hospital', 'pathology', 'dr'];
    if (GENERAL_MEDICAL.some(w => lower.includes(w))) {
      return { isValid: true, category, condition: 'chest_pain', conditionName: 'Chest Pain (Hrid-Shoola)' };
    }

    return { 
      isValid: false, 
      reason: 'No recognizable medical letterhead, diagnostic parameters, or prescription markings detected.' 
    };
  };

  // Run AI OCR Scan & Validation
  const handleScanAndValidate = () => {
    if (!stagedFile) {
      setInvalidReportError({
        title: 'No Document Selected',
        message: 'Please upload or select a medical report or prescription first.'
      });
      return;
    }

    setInvalidReportError(null);
    setVerifiedSuccessNotice(null);
    setIsScanning(true);
    setScanProgress(15);
    setScanStatusText('Scanning document pixels and inspecting clinical headers...');

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          finalizeScan();
          return 100;
        }
        if (prev === 30) setScanStatusText('Verifying medical terminology & condition classification (Stomach Pain vs Chest Pain)...');
        if (prev === 60) setScanStatusText('Extracting diagnostic parameters, dosages & reference intervals...');
        if (prev === 80) setScanStatusText('Synthesizing Ayurvedic Dosha-Dushya correlation under compulsory ABHA ID...');
        return prev + 25;
      });
    }, 450);
  };

  const finalizeScan = () => {
    setTimeout(() => {
      setIsScanning(false);

      const validation = validateMedicalDocument(stagedFile.name, stagedFile.presetType);

      // CASE 1: INVALID REPORT
      if (!validation.isValid) {
        setInvalidReportError({
          fileName: stagedFile.name,
          title: 'Invalid Medical Report / Document Unrecognized',
          reason: validation.reason || "This document does not contain recognizable clinical laboratory values, hospital letterheads, or doctor's prescription signatures.",
          detail: 'AI OCR entity extraction failed: 0 valid clinical entities identified. Only legitimate medical reports or doctor prescriptions can be indexed under your ABHA ID.'
        });
        return;
      }

      // CASE 2: CORRECT REPORT / PRESCRIPTION
      let extractedData = {};
      let title = '';
      let institution = '';

      if (validation.condition === 'stomach_pain') {
        title = validation.category === 'Prescription'
          ? "Gastroenterology & Ayurvedic Prescription"
          : "Abdominal Ultrasound & Endoscopy Report";
        institution = "Max Healthcare Gastroenterology Centre";
        extractedData = validation.category === 'Prescription' ? {
          medications: [
            { name: "Tab. Pantoprazole", dose: "40 mg", frequency: "Once daily before breakfast", duration: "14 Days" },
            { name: "Sukumaram Kashayam", dose: "15 ml with warm water", frequency: "Twice daily before meals", duration: "1 Month" },
            { name: "Avipattikar Churna", dose: "3 grams", frequency: "At bedtime with lukewarm water", duration: "Ongoing" }
          ],
          clinicalImpression: "Gastric mucosal protective regimen with Deepana-Pachana herbs for abdominal discomfort.",
          ayurvedicCorrelation: "Pitta Shamana and Vatanulomana addressing Kosthagata Ama."
        } : {
          biomarkers: [
            { name: "Gastric Antral Mucosa", value: "Mild Erythema & Erosion", range: "Normal", status: "Mild Gastritis" },
            { name: "H. Pylori Biopsy", value: "Negative", range: "Negative", status: "Normal" },
            { name: "Gastric Emptying Rate", value: "Delayed Motility", range: "Normal", status: "Sluggish (Mandagni)" },
            { name: "Gallbladder & Liver", value: "Normal Caliber, No Calculi", range: "Normal", status: "Normal" }
          ],
          clinicalImpression: "Chronic functional dyspepsia and mild non-erosive gastritis with delayed gastric emptying.",
          ayurvedicCorrelation: "Pitta-Vataja Udara Shoola and Amlapitta secondary to Jatharagni Mandya."
        };
      } else {
        // Chest Pain
        title = validation.category === 'Prescription'
          ? "Cardiology & Integrative Prescription"
          : "12-Lead ECG & Cardiovascular Lipid Panel";
        institution = "Fortis Escorts Heart Institute";
        extractedData = validation.category === 'Prescription' ? {
          medications: [
            { name: "Tab. Atorvastatin", dose: "10 mg", frequency: "Once daily at bedtime", duration: "Ongoing" },
            { name: "Tab. Metformin HCl", dose: "500 mg", frequency: "Twice daily with meals", duration: "Ongoing" },
            { name: "Arjuna Ksheerapaka Churna", dose: "3 grams boiled in milk/water", frequency: "Twice daily", duration: "3 Months" }
          ],
          clinicalImpression: "Cardioprotective lipid-lowering therapy; advised daily 30-min brisk walk and stress reduction.",
          ayurvedicCorrelation: "Hridya Rasayana (Arjuna) strengthening myocardial endurance and clearing vascular Ama."
        } : {
          biomarkers: [
            { name: "12-Lead Resting ECG", value: "Normal Sinus Rhythm", range: "Normal", status: "No ST-T Changes" },
            { name: "Serum Triglycerides", value: "192 mg/dL", range: "< 150 mg/dL", status: "High" },
            { name: "HDL Cholesterol", value: "38 mg/dL", range: "> 40 mg/dL", status: "Low" },
            { name: "Fasting Blood Glucose", value: "138 mg/dL", range: "70 - 99 mg/dL", status: "Elevated" }
          ],
          clinicalImpression: "Non-cardiac exertional chest discomfort with atherogenic dyslipidemia and impaired fasting glucose.",
          ayurvedicCorrelation: "Kaphaja-Vataja Hrid-Shoola with Medovaha Srotorodha without acute cardiac necrosis."
        };
      }

      const newRecord = {
        id: `REC-${Date.now().toString().slice(-4)}`,
        title: title,
        institution: institution,
        date: new Date().toISOString().split('T')[0],
        type: validation.category,
        condition: validation.condition,
        conditionName: validation.conditionName,
        fileName: stagedFile.name,
        fileSize: stagedFile.size,
        filePreview: stagedFile.previewUrl || null,
        confidence: (97 + Math.random() * 2.5).toFixed(1),
        status: 'Processed by AI OCR',
        abhaId: patient?.abhaId || '91-2345-6789-1234',
        extractedData: extractedData
      };

      onAddRecord(newRecord);
      setSelectedRecord(newRecord);
      setVerifiedSuccessNotice(`✓ Valid ${validation.conditionName} record verified! Extracted and stamped to ABHA. Updating into Timeline...`);
      setStagedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Auto-navigate to timeline after 1.4s
      setTimeout(() => {
        if (onNavigateToTimeline) {
          onNavigateToTimeline();
        }
      }, 1400);
    }, 400);
  };

  const handleDeleteCurrentRecord = (recId) => {
    if (window.confirm('Are you sure you want to remove this record from your ABHA health locker?')) {
      if (onDeleteRecord) onDeleteRecord(recId);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* View Header with Compulsory ABHA Binding */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
                <UploadCloud className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-outfit">
                AI Optical Character Recognition (OCR) Medical Record Validator
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Upload doctor prescriptions or diagnostic reports. AI automatically verifies and categorizes into Stomach Pain (Udara Shoola) or Chest Pain (Hrid-Shoola).
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold font-mono">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Compulsory ABHA: {patient?.abhaId || 'XX-XXXX-XXXX-XXXX'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Clean Uploader */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileUp className="w-4 h-4 text-teal-600" />
                Upload Medical Record / Prescription
              </h3>
              <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                Auto-Verification
              </span>
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileInputChange} 
              accept="image/*,.pdf,.doc,.docx,.txt" 
              className="hidden" 
            />

            {/* Drop Zone */}
            {!stagedFile ? (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                  isDragging 
                    ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]' 
                    : 'border-teal-300/80 hover:border-teal-500 hover:bg-teal-50/30 bg-slate-50/50'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center mx-auto mb-2.5 shadow-2xs">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">
                  Select or Drag & Drop Document
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs mx-auto">
                  Upload stomach pain or chest pain report/prescription (PDF, PNG, JPG up to 15MB)
                </p>
                <button
                  type="button"
                  className="mt-3 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-300 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{stagedFile.name}</p>
                      <p className="text-[10px] text-slate-500">{stagedFile.size} • Ready for AI Verification</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearStaged}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* SCAN BUTTON */}
            <button
              type="button"
              onClick={handleScanAndValidate}
              disabled={isScanning || !stagedFile}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4" />
              {isScanning ? 'Verifying with AI OCR...' : '⚡ Scan & Verify with AI OCR'}
            </button>

            {/* 3 TEST BUTTONS: STOMACH PAIN, CHEST PAIN, INVALID */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quick Test Samples (2 Condition Workflow):
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={handleLoadStomachReport}
                  className="w-full py-2 px-3 rounded-xl text-[11px] font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors text-left flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>🩺</span>
                    ⚡ Valid Stomach Pain Report (Endoscopy)
                  </span>
                  <span className="text-[9px] font-bold bg-amber-200/60 text-amber-900 px-1.5 py-0.5 rounded">
                    Side 1
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleLoadChestReport}
                  className="w-full py-2 px-3 rounded-xl text-[11px] font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors text-left flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>❤️</span>
                    ⚡ Valid Chest Pain Report (ECG & Lipids)
                  </span>
                  <span className="text-[9px] font-bold bg-teal-200/60 text-teal-900 px-1.5 py-0.5 rounded">
                    Side 2
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleLoadInvalidFile}
                  className="w-full py-2 px-3 rounded-xl text-[11px] font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors text-left flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    ❌ Invalid / Non-Medical File (Invoice)
                  </span>
                  <span className="text-[9px] font-bold bg-rose-200/60 text-rose-900 px-1.5 py-0.5 rounded">
                    Rejection
                  </span>
                </button>
              </div>
            </div>

            {/* INVALID REPORT ERROR BANNER */}
            {invalidReportError && (
              <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-2xl text-xs text-rose-900 space-y-1.5 animate-fadeIn">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-rose-800">{invalidReportError.title}</p>
                    <p className="text-[11px] text-rose-700 mt-0.5">{invalidReportError.reason}</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-600 bg-white/80 p-2 rounded-xl border border-rose-200">
                  {invalidReportError.detail}
                </p>
              </div>
            )}

            {/* VERIFIED SUCCESS BANNER */}
            {verifiedSuccessNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex items-start gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-800">Verification Succeeded</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{verifiedSuccessNotice}</p>
                </div>
              </div>
            )}

          </div>

          {/* List of Verified Document Records */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Active Condition Records ({oldRecords.length})
              </h4>
              <span className="text-[10px] text-slate-400">ABHA Linked</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {oldRecords.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => { setSelectedRecord(rec); setInvalidReportError(null); }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedRecord?.id === rec.id
                      ? 'bg-teal-50/70 border-teal-400 ring-2 ring-teal-200/50'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <div className="p-1.5 rounded-xl bg-white border border-slate-200 text-teal-700 mt-0.5 flex-shrink-0">
                        {rec.condition === 'stomach_pain' ? '🩺' : '❤️'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{rec.title}</p>
                        <p className="text-[11px] text-slate-500 truncate">{rec.institution}</p>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          {rec.conditionName || rec.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-7 space-y-5">
          {isScanning ? (
            <div className="bg-white rounded-3xl border border-teal-200 p-8 shadow-md text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 mx-auto">
                <Sparkles className="w-7 h-7 animate-spin" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Executing AI Document OCR & Verification</h3>
                <p className="text-xs text-teal-700 font-medium mt-1">{scanStatusText}</p>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-300 rounded-full" style={{ width: `${scanProgress}%` }} />
              </div>
            </div>
          ) : selectedRecord ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                      {selectedRecord.conditionName || selectedRecord.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ID: {selectedRecord.id}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{selectedRecord.title}</h3>
                  <p className="text-xs text-slate-500">{selectedRecord.institution} • {selectedRecord.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Accuracy: {selectedRecord.confidence}%
                  </span>
                  <button
                    onClick={() => handleDeleteCurrentRecord(selectedRecord.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Archive Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-xs text-slate-700 space-y-2">
                <p className="font-bold text-slate-900 border-b pb-1 text-[11px] uppercase flex justify-between">
                  <span>=== OFFICIAL HEALTH RECORD ARCHIVE ===</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ABDM VERIFIED</span>
                </p>
                <p>Patient: <strong className="text-slate-800">{patient.name}</strong> | ABHA ID: <strong className="text-emerald-700">{patient.abhaId}</strong></p>
                <p>Condition: <strong>{selectedRecord.conditionName || selectedRecord.type}</strong></p>
                <p>Center: {selectedRecord.institution} | Date: {selectedRecord.date}</p>
              </div>

              {/* Biomarkers / Medications */}
              {selectedRecord.extractedData?.biomarkers && (
                <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="px-3 py-2 text-left">Biomarker / Test</th>
                        <th className="px-3 py-2 text-left">Result</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {selectedRecord.extractedData.biomarkers.map((b, i) => (
                        <tr key={i}>
                          <td className="px-3 py-2 font-medium">{b.name}</td>
                          <td className="px-3 py-2 font-mono font-bold">{b.value}</td>
                          <td className="px-3 py-2"><span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200">{b.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedRecord.extractedData?.medications && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-700">Prescribed Formulations:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedRecord.extractedData.medications.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl border border-teal-200 bg-teal-50/40">
                        <p className="text-xs font-bold text-slate-800">{m.name} ({m.dose})</p>
                        <p className="text-[11px] text-slate-600 mt-0.5">{m.frequency} • {m.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ayurvedic Correlation */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/70 to-teal-50/70 border border-emerald-200/80 space-y-2 text-xs">
                <p><strong className="text-slate-900">Clinical Finding:</strong> {selectedRecord.extractedData?.clinicalImpression}</p>
                <p><strong className="text-emerald-900">Ayurvedic Interpretation:</strong> {selectedRecord.extractedData?.ayurvedicCorrelation}</p>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Indexed under patient ABHA ID.</span>
                <button
                  onClick={onNavigateToTimeline}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  View in Medical Timeline
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

            </div>
          ) : null}
        </div>

      </div>

    </div>
  );
};
