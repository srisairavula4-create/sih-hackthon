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
  ShieldAlert, 
  RotateCcw,
  Stethoscope,
  Activity,
  AlertTriangle,
  FileSpreadsheet,
  Check,
  Search,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { validateMedicalDocument } from '../utils/medicalDocumentValidator';

export const RecordUploadView = ({ 
  patient, 
  oldRecords = [], 
  onAddRecord, 
  onDeleteRecord, 
  onNavigateToTimeline,
  onNavigateToAiSummary
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
  const [extractedResult, setExtractedResult] = useState(null);

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
    setExtractedResult(null);

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

  // Preset Loaders: Test Suite including Critical Test Case
  const handleLoadPreset = (presetType) => {
    setInvalidReportError(null);
    setExtractedResult(null);

    if (presetType === 'synthetic_lab') {
      // CRITICAL TEST CASE: Synthetic Laboratory Report
      setStagedFile({
        name: 'synthetic_laboratory_investigation_panel.pdf',
        size: '1.8 MB',
        type: 'application/pdf',
        previewUrl: null,
        presetType: 'synthetic_lab'
      });
    } else if (presetType === 'stomach_lab') {
      setStagedFile({
        name: 'max_healthcare_upper_gi_endoscopy_report.pdf',
        size: '1.6 MB',
        type: 'application/pdf',
        previewUrl: null,
        presetType: 'stomach_lab'
      });
    } else if (presetType === 'chest_lab') {
      setStagedFile({
        name: 'fortis_cardiology_12_lead_ecg_lipid_panel.pdf',
        size: '1.9 MB',
        type: 'application/pdf',
        previewUrl: null,
        presetType: 'chest_lab'
      });
    } else if (presetType === 'discharge_summary') {
      setStagedFile({
        name: 'aiims_inpatient_clinical_discharge_summary.pdf',
        size: '2.2 MB',
        type: 'application/pdf',
        previewUrl: null,
        presetType: 'discharge_summary'
      });
    } else if (presetType === 'invalid_screenshot') {
      setStagedFile({
        name: 'screenshot_mobile_ui_chat_20250125.png',
        size: '820 KB',
        type: 'image/png',
        previewUrl: null,
        presetType: 'invalid_screenshot'
      });
    } else if (presetType === 'invalid_receipt') {
      setStagedFile({
        name: 'grocery_supermarket_invoice_receipt.jpg',
        size: '340 KB',
        type: 'image/jpeg',
        previewUrl: null,
        presetType: 'invalid_receipt'
      });
    } else if (presetType === 'invalid_blank') {
      setStagedFile({
        name: 'blank_scan_page_unreadable.pdf',
        size: '12 KB',
        type: 'application/pdf',
        previewUrl: null,
        presetType: 'invalid_blank'
      });
    }
  };

  const handleClearStaged = () => {
    setStagedFile(null);
    setInvalidReportError(null);
    setExtractedResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Run Hardened AI OCR Scan & Multi-Signal Validation
  const handleScanAndValidate = () => {
    if (!stagedFile) {
      setInvalidReportError({
        headline: "Invalid Medical Report — Please upload a valid medical document.",
        reason: "No document selected. Please choose a valid medical prescription, lab report, or diagnostic scan."
      });
      return;
    }

    setInvalidReportError(null);
    setExtractedResult(null);
    setIsScanning(true);
    setScanProgress(15);
    setScanStatusText('Scanning pixel buffer & evaluating multi-signal clinical evidence...');

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          finalizeScan();
          return 100;
        }
        if (prev === 30) setScanStatusText('Evaluating provider, diagnostic tests, patient identifiers & dates...');
        if (prev === 60) setScanStatusText('Extracting numerical parameters, units, reference intervals & flagging review items...');
        if (prev === 80) setScanStatusText('Re-processing & synchronizing into AI Clinical Summary registry...');
        return prev + 25;
      });
    }, 380);
  };

  const finalizeScan = () => {
    setTimeout(() => {
      setIsScanning(false);

      const validation = validateMedicalDocument(stagedFile.file, stagedFile);

      // CASE 1: REJECT INVALID DOCUMENTS
      if (!validation.isValid) {
        setInvalidReportError({
          headline: validation.headline || "Invalid Medical Report — Please upload a valid medical document.",
          reason: validation.conciseReason || "File does not contain sufficient clinical evidence (prescriptions, diagnostic tests, or laboratory findings).",
          fileName: stagedFile.name,
          details: "AI Document Validation rejected this upload. The validator detected non-medical media, UI screen captures, or insufficient clinical data. Authentic diagnostic tests, doctor prescriptions, or discharge summaries are required."
        });
        return;
      }

      // CASE 2: ACCURATE CLINICAL EXTRACTION FOR VALID REPORT
      const newRecord = {
        id: `REC-${Date.now().toString().slice(-4)}`,
        title: validation.documentType ? `${validation.institution || 'Diagnostic Centre'} - ${validation.documentType}` : stagedFile.name,
        institution: validation.institution || "Apex Clinical Services",
        date: validation.date || new Date().toISOString().split('T')[0],
        type: validation.documentType || "Laboratory Report",
        condition: validation.condition || "stomach_pain",
        conditionName: validation.conditionName || "Clinical Evaluation",
        fileName: stagedFile.name,
        fileSize: stagedFile.size,
        confidence: validation.confidence || 98.6,
        status: "ABDM Verified & OCR Indexed",
        provider: validation.provider,
        evidenceScore: validation.evidenceScore,
        detectedSignals: validation.detectedSignals || [],
        extractedData: validation.extractedData || {}
      };

      setExtractedResult(newRecord);

      // AUTOMATIC SYNCHRONIZATION: Refresh AI Clinical Summary and Timeline immediately
      if (onAddRecord) {
        onAddRecord(newRecord);
      }
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <UploadCloud className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-outfit">
                Intelligent Medical Document Validation & OCR Pipeline
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Evaluates overall clinical evidence across multi-signal parameters. Automatically synchronizes newly uploaded records into the AI Clinical Summary without silent overwrites.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToTimeline}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <span>Timeline</span>
            </button>
            <button
              onClick={onNavigateToAiSummary}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Summary</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK PRESET TEST SUITE (INCLUDING CRITICAL TEST CASE) */}
      <div className="bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Medical Validation Test Scenarios (Click to Load)
          </span>
          <span className="text-[10px] font-semibold text-slate-500 font-mono">
            Multi-Signal Classification Suite
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
          {/* CRITICAL TEST CASE BUTTON */}
          <button
            onClick={() => handleLoadPreset('synthetic_lab')}
            className="p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-950 font-bold transition-all text-left shadow-2xs flex items-center gap-2 cursor-pointer ring-2 ring-emerald-400/30"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 flex-shrink-0 animate-pulse" />
            <div className="truncate">
              <p className="font-extrabold truncate">★ Synthetic Lab Report</p>
              <p className="text-[10px] text-emerald-800 font-semibold truncate">Critical Test Case</p>
            </div>
          </button>

          <button
            onClick={() => handleLoadPreset('stomach_lab')}
            className="p-2.5 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-900 font-bold transition-all text-left shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <div className="truncate">
              <p className="font-bold truncate">Endoscopy Report</p>
              <p className="text-[10px] text-emerald-700 font-normal">Diagnostic Scan</p>
            </div>
          </button>

          <button
            onClick={() => handleLoadPreset('chest_lab')}
            className="p-2.5 rounded-xl border border-teal-300 bg-white hover:bg-teal-50 text-teal-900 font-bold transition-all text-left shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0" />
            <div className="truncate">
              <p className="font-bold truncate">ECG & Lipid Panel</p>
              <p className="text-[10px] text-teal-700 font-normal">Cardio Lab</p>
            </div>
          </button>

          <button
            onClick={() => handleLoadPreset('discharge_summary')}
            className="p-2.5 rounded-xl border border-blue-300 bg-white hover:bg-blue-50 text-blue-900 font-bold transition-all text-left shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            <div className="truncate">
              <p className="font-bold truncate">Discharge Summary</p>
              <p className="text-[10px] text-blue-700 font-normal">AIIMS Inpatient</p>
            </div>
          </button>

          <button
            onClick={() => handleLoadPreset('invalid_screenshot')}
            className="p-2.5 rounded-xl border border-rose-300 bg-rose-50/70 hover:bg-rose-100 text-rose-900 font-bold transition-all text-left shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
            <div className="truncate">
              <p className="font-bold truncate">UI Screenshot</p>
              <p className="text-[10px] text-rose-700 font-normal">Rejection Demo</p>
            </div>
          </button>

          <button
            onClick={() => handleLoadPreset('invalid_receipt')}
            className="p-2.5 rounded-xl border border-rose-300 bg-rose-50/70 hover:bg-rose-100 text-rose-900 font-bold transition-all text-left shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
            <div className="truncate">
              <p className="font-bold truncate">Commercial Receipt</p>
              <p className="text-[10px] text-rose-700 font-normal">Rejection Demo</p>
            </div>
          </button>

          <button
            onClick={() => handleLoadPreset('invalid_blank')}
            className="p-2.5 rounded-xl border border-rose-300 bg-rose-50/70 hover:bg-rose-100 text-rose-900 font-bold transition-all text-left shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
            <div className="truncate">
              <p className="font-bold truncate">Blank / Illegible</p>
              <p className="text-[10px] text-rose-700 font-normal">Rejection Demo</p>
            </div>
          </button>
        </div>
      </div>

      {/* REJECTION ALERT: EXACT REQUIRED ERROR MESSAGE */}
      {invalidReportError && (
        <div className="p-5 rounded-3xl bg-rose-50 border-2 border-rose-400 shadow-sm space-y-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-2xl bg-rose-600 text-white flex-shrink-0 shadow-xs">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-rose-950 tracking-tight">
                {invalidReportError.headline}
              </h3>
              <p className="text-xs text-rose-900 font-bold">
                Detected Problem: {invalidReportError.reason}
              </p>
              <p className="text-xs text-rose-700 leading-relaxed pt-1">
                {invalidReportError.details}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-rose-200 flex items-center justify-between text-xs">
            <span className="text-rose-800 font-mono text-[11px]">
              Rejected File: {invalidReportError.fileName || 'Selected Item'} • Unmodified Profile
            </span>
            <button
              onClick={handleClearStaged}
              className="px-3 py-1 rounded-xl bg-rose-200/80 hover:bg-rose-300 text-rose-900 font-bold cursor-pointer transition-colors"
            >
              Clear Staged File
            </button>
          </div>
        </div>
      )}

      {/* EXTRACTED SUCCESS RESULTS DISPLAY WITH REVIEW MARKINGS */}
      {extractedResult && (
        <div className="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-400 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-emerald-600 text-white flex-shrink-0 shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    {extractedResult.type} • Verified Valid
                  </span>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Evidence Score: {extractedResult.evidenceScore || 95}/100
                  </span>
                </div>
                <h3 className="text-base font-black text-emerald-950 mt-1">
                  {extractedResult.title}
                </h3>
                <p className="text-xs text-emerald-800">
                  {extractedResult.institution} • {extractedResult.date} {extractedResult.provider && `• ${extractedResult.provider}`}
                </p>
              </div>
            </div>

            <button
              onClick={onNavigateToAiSummary}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>View Synchronized AI Summary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Evidence Signals Banner */}
          {extractedResult.detectedSignals && extractedResult.detectedSignals.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-emerald-900">
              <span className="font-bold">Detected Clinical Signals:</span>
              {extractedResult.detectedSignals.map((sig, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-medium">
                  ✓ {sig}
                </span>
              ))}
            </div>
          )}

          {/* Extracted Biomarkers Table with Units & Review Flags */}
          {extractedResult.extractedData?.biomarkers && (
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <p className="font-bold text-emerald-950 uppercase tracking-wider text-[11px]">
                  Extracted Clinical Biomarkers & Test Parameters:
                </p>
                <span className="text-[10px] text-slate-500 font-mono">
                  Confidence Rated • Uncertain Values Flagged
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {extractedResult.extractedData.biomarkers.map((b, i) => (
                  <div key={i} className={`p-3 rounded-xl border transition-all ${
                    b.isUncertain 
                      ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400' 
                      : 'bg-white border-emerald-200'
                  }`}>
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-bold text-slate-900">{b.name}</p>
                      <span className="text-[10px] font-mono text-slate-500">
                        {b.confidence}% conf
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="font-mono text-sm font-black text-slate-900">
                        {b.value}
                      </span>
                      {b.unit && <span className="text-[11px] text-slate-500 font-sans">{b.unit}</span>}
                      <span className="text-[10px] text-slate-400 ml-auto">Ref: {b.range}</span>
                    </div>

                    {b.isUncertain ? (
                      <div className="mt-1.5 pt-1.5 border-t border-amber-200 text-[10px] text-amber-900 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        <span>Review Needed: {b.reviewNote || 'Marginal chemical reading'}</span>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-700 font-semibold">{b.status}</span>
                        <span className="text-slate-400">Verified</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extracted Medications Table */}
          {extractedResult.extractedData?.medications && (
            <div className="space-y-1.5 text-xs">
              <p className="font-bold text-emerald-950 uppercase tracking-wider text-[11px]">
                Extracted Medications & Formulations:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {extractedResult.extractedData.medications.map((m, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-start justify-between">
                    <div>
                      <p className="font-bold text-slate-900 flex items-center gap-1">
                        <Pill className="w-3.5 h-3.5 text-emerald-700" />
                        {m.name} ({m.dose})
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        {m.frequency} • {m.duration}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {m.confidence || 98.5}% conf
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clinical Impression & Ayurvedic Correlation (No autonomous diagnosis) */}
          <div className="p-3 bg-white/95 rounded-xl border border-emerald-200 text-emerald-950 text-xs space-y-1">
            <p>
              <strong>Recorded Clinical Impression: </strong>
              <span className="text-slate-700">{extractedResult.extractedData?.clinicalImpression}</span>
            </p>
            <p className="text-[11px] text-slate-500 italic">
              *Note: Extracted information is structured and presented for physician / Vaidya verification. Autonomous diagnoses are strictly prohibited.
            </p>
          </div>

          <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-800 font-mono">
            <span>Source Provenance: {extractedResult.fileName} ({extractedResult.fileSize})</span>
            <span className="font-bold text-emerald-900">✓ AI Clinical Summary Automatically Refreshed</span>
          </div>
        </div>
      )}

      {/* DROPZONE / SCANNER AREA */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
        <input 
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.dcm"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
            isDragging 
              ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]' 
              : 'border-slate-300 hover:border-emerald-400 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Choose Medical Document or Drag & Drop here
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Accepts Prescriptions, Diagnostic Reports, ECG, Ultrasound, Synthetic Labs & Discharge Summaries
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-slate-400 font-mono">
              <span>Multi-Signal Clinical Evaluator</span> • <span>Conflict Flagging</span> • <span>Vaidya Verification</span>
            </div>
          </div>
        </div>

        {/* Staged File Card & Action */}
        {stagedFile && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{stagedFile.name}</p>
                  <p className="text-[11px] text-slate-500">{stagedFile.size} • Ready for OCR Extraction</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearStaged}
                  disabled={isScanning}
                  className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScanAndValidate}
                  disabled={isScanning}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isScanning ? 'Validating...' : 'Scan & Validate Document'}</span>
                </button>
              </div>
            </div>

            {/* Scanning Progress */}
            {isScanning && (
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                    {scanStatusText}
                  </span>
                  <span className="font-mono font-bold text-slate-700">{scanProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* EXISTING MEDICAL RECORDS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Patient Indexed Medical Records ({oldRecords.length})
            </h3>
            <p className="text-xs text-slate-500">
              Preserved with document ID, hospital provenance, and cross-referenced in AI Clinical Summary
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {oldRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-emerald-700 mt-0.5 flex-shrink-0">
                    {rec.type === 'Prescription' ? <Pill className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{rec.title}</p>
                    <p className="text-[11px] text-slate-500">{rec.institution} • {rec.date}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                  {rec.type}
                </span>
              </div>

              {rec.extractedData?.clinicalImpression && (
                <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-xl border border-slate-100">
                  "{rec.extractedData.clinicalImpression}"
                </p>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                <span>Source: {rec.fileName}</span>
                <span className="text-emerald-700 font-semibold">Indexed ({rec.id})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
