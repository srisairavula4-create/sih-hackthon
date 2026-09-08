import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ArrowRight, 
  Pill, 
  Clock,
  Trash2,
  FileUp,
  CreditCard,
  Check,
  Building2,
  Calendar,
  Layers,
  Image as ImageIcon,
  Activity,
  PenTool,
  Info
} from 'lucide-react';

export const RecordUploadView = ({ 
  patient, 
  oldRecords = [], 
  onAddRecord, 
  onDeleteRecord, 
  onNavigateToTimeline 
}) => {
  const [selectedRecord, setSelectedRecord] = useState(oldRecords[0] || null);
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'manual'
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Staged File State
  const [stagedFile, setStagedFile] = useState(null);

  // Document Metadata Form State
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Prescription'); // 'Prescription' | 'Lab Report' | 'Hospital Summary' | 'Ayurvedic Consultation' | 'Imaging / Ultrasound'
  const [docInstitution, setDocInstitution] = useState('');
  const [docDate, setDocDate] = useState(new Date().toISOString().split('T')[0]);
  const [docNotes, setDocNotes] = useState('');
  
  // Custom Biomarkers / Medications State (for manual entry or customization)
  const [customMedications, setCustomMedications] = useState([
    { name: 'Tab. Metformin HCl', dose: '500 mg', frequency: 'Twice daily (after meals)', duration: 'Ongoing' }
  ]);
  const [customBiomarkers, setCustomBiomarkers] = useState([
    { name: 'HbA1c', value: '7.6%', range: '< 5.7%', status: 'High' },
    { name: 'Fasting Blood Glucose', value: '138 mg/dL', range: '70 - 99 mg/dL', status: 'High' }
  ]);

  // Scanning State (ONLY runs when user clicks "Run AI OCR")
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusText, setScanStatusText] = useState('');
  const [formError, setFormError] = useState('');
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);

  // Keep selected record valid if oldRecords updates
  useEffect(() => {
    if (!selectedRecord && oldRecords.length > 0) {
      setSelectedRecord(oldRecords[0]);
    } else if (selectedRecord && !oldRecords.some(r => r.id === selectedRecord.id)) {
      setSelectedRecord(oldRecords[0] || null);
    }
  }, [oldRecords]);

  // Handle Real File Selection from File Picker or Drop
  const handleFile = (file) => {
    if (!file) return;
    setFormError('');

    const isImg = file.type.startsWith('image/');
    let previewUrl = null;
    if (isImg) {
      previewUrl = URL.createObjectURL(file);
    }

    const sizeKb = file.size / 1024;
    const sizeStr = sizeKb > 1024 
      ? `${(sizeKb / 1024).toFixed(1)} MB` 
      : `${Math.round(sizeKb)} KB`;

    // Smart default detection based on file name
    const lowerName = file.name.toLowerCase();
    let detectedCategory = 'Prescription';
    let detectedTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    detectedTitle = detectedTitle.charAt(0).toUpperCase() + detectedTitle.slice(1);

    if (lowerName.includes('lab') || lowerName.includes('blood') || lowerName.includes('sugar') || lowerName.includes('lipid') || lowerName.includes('hba1c') || lowerName.includes('test')) {
      detectedCategory = 'Lab Report';
      if (!detectedTitle.toLowerCase().includes('report')) detectedTitle += ' Report';
    } else if (lowerName.includes('rx') || lowerName.includes('presc') || lowerName.includes('doctor') || lowerName.includes('med')) {
      detectedCategory = 'Prescription';
      if (!detectedTitle.toLowerCase().includes('prescription')) detectedTitle = `Prescription - ${detectedTitle}`;
    } else if (lowerName.includes('usg') || lowerName.includes('scan') || lowerName.includes('xray') || lowerName.includes('mri')) {
      detectedCategory = 'Imaging / Ultrasound';
    } else if (lowerName.includes('ayur') || lowerName.includes('vaidya')) {
      detectedCategory = 'Ayurvedic Consultation';
    }

    setStagedFile({
      file,
      name: file.name,
      size: sizeStr,
      type: file.type,
      previewUrl
    });

    setDocTitle(detectedTitle);
    setDocCategory(detectedCategory);
    if (!docInstitution) {
      setDocInstitution(detectedCategory === 'Prescription' ? 'Apollo Clinic & Healthcare' : 'Dr. Lal PathLabs & Diagnostics');
    }
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

  // Helper Preset Loaders (for instant hackathon demonstration)
  const handleLoadSamplePrescription = () => {
    setFormError('');
    setUploadMode('file');
    setStagedFile({
      name: 'fortis_endocrinology_rx_2025.jpg',
      size: '940 KB',
      type: 'image/jpeg',
      previewUrl: null
    });
    setDocTitle('Consultation & Modern Allopathic Prescription');
    setDocCategory('Prescription');
    setDocInstitution('Fortis Superspeciality Hospital');
    setDocDate(new Date().toISOString().split('T')[0]);
    setDocNotes('Advised strict low glycemic diet, daily brisk walking, and morning fasting glucose monitoring.');
    setCustomMedications([
      { name: 'Tab. Metformin HCl', dose: '500 mg', frequency: 'Twice daily (after meals)', duration: 'Ongoing' },
      { name: 'Tab. Atorvastatin', dose: '10 mg', frequency: 'Once daily at bedtime', duration: 'Ongoing' }
    ]);
  };

  const handleLoadSampleLabReport = () => {
    setFormError('');
    setUploadMode('file');
    setStagedFile({
      name: 'lal_pathlabs_fasting_lipid_insulin_2025.pdf',
      size: '2.1 MB',
      type: 'application/pdf',
      previewUrl: null
    });
    setDocTitle('Specialized Fasting Lipid Panel & Insulin Report');
    setDocCategory('Lab Report');
    setDocInstitution('Dr. Lal PathLabs, Regional Centre');
    setDocDate(new Date().toISOString().split('T')[0]);
    setDocNotes('Marked hyperinsulinemia and atherogenic dyslipidemia detected.');
    setCustomBiomarkers([
      { name: 'Fasting Serum Insulin', value: '18.4 uIU/mL', range: '2.6 - 24.9 uIU/mL', status: 'Upper Normal / Insulin Resistance' },
      { name: 'HOMA-IR Index', value: '6.4', range: '< 2.0', status: 'Significant Resistance' },
      { name: 'Serum Triglycerides', value: '192 mg/dL', range: '< 150 mg/dL', status: 'High' },
      { name: 'HDL Cholesterol', value: '39 mg/dL', range: '> 40 mg/dL', status: 'Low' }
    ]);
  };

  // Clear currently staged file
  const handleClearStaged = () => {
    setStagedFile(null);
    setDocTitle('');
    setDocNotes('');
    setFormError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Medicine Row Helpers
  const handleAddMedRow = () => {
    setCustomMedications(prev => [...prev, { name: '', dose: '', frequency: 'Twice daily', duration: '1 month' }]);
  };
  const handleUpdateMedRow = (idx, field, val) => {
    setCustomMedications(prev => {
      const copy = [...prev];
      copy[idx][field] = val;
      return copy;
    });
  };
  const handleRemoveMedRow = (idx) => {
    setCustomMedications(prev => prev.filter((_, i) => i !== idx));
  };

  // Biomarker Row Helpers
  const handleAddBioRow = () => {
    setCustomBiomarkers(prev => [...prev, { name: '', value: '', range: '', status: 'Elevated' }]);
  };
  const handleUpdateBioRow = (idx, field, val) => {
    setCustomBiomarkers(prev => {
      const copy = [...prev];
      copy[idx][field] = val;
      return copy;
    });
  };
  const handleRemoveBioRow = (idx) => {
    setCustomBiomarkers(prev => prev.filter((_, i) => i !== idx));
  };

  // Process Document & Run AI OCR
  const handleRunOcrProcess = () => {
    setFormError('');

    if (!docTitle.trim()) {
      setFormError('Please enter a Document or Prescription Title.');
      return;
    }

    if (uploadMode === 'file' && !stagedFile) {
      setFormError('Please select or drop a physical file/photo, or switch to "Manual Entry" tab.');
      return;
    }

    // Begin Simulated OCR Scanner
    setIsScanning(true);
    setScanProgress(15);
    setScanStatusText('Scanning document pixels and extracting high-resolution text blocks...');

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          finalizeRecordCreation();
          return 100;
        }
        if (prev === 30) setScanStatusText('Analyzing medical terminology, pharmaceutical dosages & diagnostic ranges...');
        if (prev === 60) setScanStatusText('Synthesizing Classical Ayurvedic Dosha-Dushya pathology & Agni correlation...');
        if (prev === 80) setScanStatusText(`Compulsory ABDM Linking: Binding record permanently to ABHA ID: ${patient?.abhaId || 'Verified'}...`);
        return prev + 25;
      });
    }, 450);
  };

  const finalizeRecordCreation = () => {
    setTimeout(() => {
      setIsScanning(false);

      // Build Extracted Data based on category
      let extractedData = {};
      const safeTitle = docTitle.trim();
      const safeInst = docInstitution.trim() || 'Verified Clinical Diagnostic Center';

      if (docCategory === 'Prescription') {
        const validMeds = customMedications.filter(m => m.name.trim().length > 0);
        extractedData = {
          medications: validMeds.length > 0 ? validMeds : [
            { name: 'Tab. Metformin HCl', dose: '500 mg', frequency: 'Twice daily (after meals)', duration: 'Ongoing' },
            { name: 'Tab. Atorvastatin', dose: '10 mg', frequency: 'Once daily at bedtime', duration: 'Ongoing' }
          ],
          clinicalImpression: docNotes.trim() || 'Active pharmaceutical prescription for metabolic regulation and glycemic control.',
          ayurvedicCorrelation: 'Contemporary glucose lowering therapy without addressing deep-rooted Ama / Agnimandya.'
        };
      } else if (docCategory === 'Lab Report') {
        const validBios = customBiomarkers.filter(b => b.name.trim().length > 0);
        extractedData = {
          biomarkers: validBios.length > 0 ? validBios : [
            { name: 'HbA1c (Glycated Hemoglobin)', value: '7.8%', range: '< 5.7%', status: 'High' },
            { name: 'Fasting Blood Glucose', value: '142 mg/dL', range: '70 - 99 mg/dL', status: 'High' },
            { name: 'Postprandial Blood Glucose', value: '198 mg/dL', range: '< 140 mg/dL', status: 'High' },
            { name: 'Serum Triglycerides', value: '195 mg/dL', range: '< 150 mg/dL', status: 'High' }
          ],
          clinicalImpression: docNotes.trim() || 'Laboratory findings indicate metabolic syndrome with atherogenic dyslipidemia.',
          ayurvedicCorrelation: 'Kaphaja Prameha lakshanas with Medovaha Srotodushti and Dhatvagni Mandya.'
        };
      } else {
        extractedData = {
          clinicalImpression: docNotes.trim() || 'Clinical evaluation and diagnostic investigation documented.',
          ayurvedicCorrelation: 'Correlated with classical Dashavidha Pariksha and Ahara-Vihara assessment.'
        };
      }

      const newRecord = {
        id: `REC-${Date.now().toString().slice(-4)}`,
        title: safeTitle,
        institution: safeInst,
        date: docDate || new Date().toISOString().split('T')[0],
        type: docCategory,
        fileName: stagedFile?.name || `${safeTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`,
        fileSize: stagedFile?.size || '1.4 MB',
        filePreview: stagedFile?.previewUrl || null,
        confidence: (96 + Math.random() * 3.5).toFixed(1),
        status: 'Processed by AI OCR',
        abhaId: patient?.abhaId || '91-2345-6789-1234',
        extractedData: extractedData
      };

      onAddRecord(newRecord);
      setSelectedRecord(newRecord);
      handleClearStaged();
      setUploadSuccessToast(true);
      setTimeout(() => setUploadSuccessToast(false), 4500);
    }, 500);
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
                AI + Optical Character Recognition (OCR) Medical Record Extractor
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Upload existing paper prescriptions, hospital discharge summaries, or diagnostic PDFs. AI extracts clinical entities and synchronizes them with the Ayurvedic timeline.
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

      {/* Main Layout: 5 Columns (Upload & List) / 7 Columns (Document Preview & Entities) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Upload Form & Available Records List */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Main Upload Box */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            
            {/* Mode Switcher: File Upload vs Manual Entry */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  uploadMode === 'file' 
                    ? 'bg-white text-teal-800 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileUp className="w-3.5 h-3.5" />
                Upload Document / Scan
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('manual')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  uploadMode === 'manual' 
                    ? 'bg-white text-teal-800 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                Enter Details Manually
              </button>
            </div>

            {/* Hidden native file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileInputChange} 
              accept="image/*,.pdf,.doc,.docx,.txt" 
              className="hidden" 
            />

            {/* FILE UPLOAD MODE */}
            {uploadMode === 'file' && (
              <div>
                {!stagedFile ? (
                  /* Drag & Drop Zone */
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
                    <h3 className="text-xs font-bold text-slate-800">
                      Upload Old Medical Records or Prescriptions
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs mx-auto">
                      Drag & drop PDFs, scans, or camera photos (PDF, PNG, JPG up to 15MB)
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
                  /* Staged File Card */
                  <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-300 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
                        {stagedFile.previewUrl ? (
                          <img src={stagedFile.previewUrl} alt="preview" className="w-9 h-9 object-cover rounded-xl" />
                        ) : (
                          <FileText className="w-5 h-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{stagedFile.name}</p>
                        <p className="text-[10px] text-slate-500">{stagedFile.size} • Ready for AI OCR</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearStaged}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove selected file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {formError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* RECORD METADATA INPUTS */}
            <div className="space-y-3 pt-1">
              {/* Document Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document / Prescription Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Endocrine Prescription or Lipid Lab Test"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                />
              </div>

              {/* Category & Date */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Document Category
                  </label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  >
                    <option value="Prescription">Prescription</option>
                    <option value="Lab Report">Lab Report</option>
                    <option value="Hospital Summary">Hospital Summary</option>
                    <option value="Ayurvedic Consultation">Ayurvedic Consultation</option>
                    <option value="Imaging / Ultrasound">Imaging / Ultrasound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Record Date
                  </label>
                  <input
                    type="date"
                    value={docDate}
                    onChange={(e) => setDocDate(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Hospital / Clinic Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hospital / Clinic / Doctor Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apollo Diagnostics or Dr. Mehta Clinic"
                  value={docInstitution}
                  onChange={(e) => setDocInstitution(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium"
                />
              </div>

              {/* Specific Fields for Prescription */}
              {docCategory === 'Prescription' && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                      <Pill className="w-3.5 h-3.5 text-teal-600" />
                      Prescribed Medicines ({customMedications.length})
                    </label>
                    <button
                      type="button"
                      onClick={handleAddMedRow}
                      className="text-[10px] font-bold text-teal-700 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Medicine
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {customMedications.map((med, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs">
                        <input
                          type="text"
                          placeholder="Medicine name"
                          value={med.name}
                          onChange={(e) => handleUpdateMedRow(idx, 'name', e.target.value)}
                          className="flex-1 px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Dose (e.g. 500mg)"
                          value={med.dose}
                          onChange={(e) => handleUpdateMedRow(idx, 'dose', e.target.value)}
                          className="w-24 px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveMedRow(idx)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specific Fields for Lab Report */}
              {docCategory === 'Lab Report' && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-teal-600" />
                      Extracted Biomarkers ({customBiomarkers.length})
                    </label>
                    <button
                      type="button"
                      onClick={handleAddBioRow}
                      className="text-[10px] font-bold text-teal-700 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Biomarker
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {customBiomarkers.map((bio, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs">
                        <input
                          type="text"
                          placeholder="Test (e.g. HbA1c)"
                          value={bio.name}
                          onChange={(e) => handleUpdateBioRow(idx, 'name', e.target.value)}
                          className="flex-1 px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. 7.8%)"
                          value={bio.value}
                          onChange={(e) => handleUpdateBioRow(idx, 'value', e.target.value)}
                          className="w-20 px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveBioRow(idx)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clinical Notes / Doctor Advice */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Doctor Notes / Clinical Advice (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Patient advised carbohydrate restriction, regular walking, and 3-month follow-up."
                  value={docNotes}
                  onChange={(e) => setDocNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              {/* Run OCR / Save Button */}
              <button
                type="button"
                onClick={handleRunOcrProcess}
                disabled={isScanning}
                className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {isScanning 
                  ? 'Processing AI OCR...' 
                  : uploadMode === 'file' 
                    ? '⚡ Run AI OCR & Save to ABHA ID' 
                    : 'Save & Link to Compulsory ABHA ID'}
              </button>

              {/* Quick Preset Buttons */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Or Test with Instant Sample Templates:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleLoadSamplePrescription}
                    className="py-1.5 px-2 rounded-xl text-[11px] font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors text-center cursor-pointer truncate"
                  >
                    ⚡ Load Sample Rx
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSampleLabReport}
                    className="py-1.5 px-2 rounded-xl text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors text-center cursor-pointer truncate"
                  >
                    ⚡ Load Sample Lab
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* List of Available Document Records */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Available Document Records ({oldRecords.length})
              </h4>
              <span className="text-[10px] text-slate-400">Click to view details</span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {oldRecords.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                  No records uploaded yet. Upload a prescription or lab report above.
                </div>
              ) : (
                oldRecords.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => setSelectedRecord(rec)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedRecord?.id === rec.id
                        ? 'bg-teal-50/70 border-teal-400 ring-2 ring-teal-200/50'
                        : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="p-1.5 rounded-xl bg-white border border-slate-200 text-teal-700 mt-0.5 flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{rec.title}</p>
                          <p className="text-[11px] text-slate-500 truncate">{rec.institution}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-slate-400">{rec.date}</span>
                            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/60 px-1.5 py-0.2 rounded">
                              {rec.confidence || 98.2}% OCR
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 flex-shrink-0">
                        {rec.type}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column (7 Cols): Document Preview & OCR Entity Extraction */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Scanning Progress Overlay (ONLY active during OCR processing) */}
          {isScanning ? (
            <div className="bg-white rounded-3xl border border-teal-200 p-8 shadow-md text-center space-y-4 animate-fadeIn">
              <div className="relative mx-auto w-14 h-14">
                <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30">
                  <Sparkles className="w-7 h-7 animate-spin" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Executing AI Document OCR & NLP Extraction
                </h3>
                <p className="text-xs text-teal-700 font-medium mt-1">
                  {scanStatusText}
                </p>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-[11px] font-mono text-slate-400">{scanProgress}% Processed</p>
            </div>
          ) : selectedRecord ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
              
              {/* Record Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                      {selectedRecord.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ID: {selectedRecord.id}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {selectedRecord.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedRecord.institution} • Date: <strong className="text-slate-700">{selectedRecord.date}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Confidence: {selectedRecord.confidence || 98.4}%
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteCurrentRecord(selectedRecord.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                    title="Delete this record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Simulated / Real Document Scan Card (Laser line ONLY during scan) */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 mb-3 border-b border-slate-200/60 font-mono">
                  <span>File: {selectedRecord.fileName}</span>
                  <span>{selectedRecord.fileSize}</span>
                </div>

                {/* If user uploaded an image preview */}
                {selectedRecord.filePreview && (
                  <div className="mb-3 max-h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
                    <img 
                      src={selectedRecord.filePreview} 
                      alt="Uploaded Medical Record" 
                      className="max-h-48 w-auto object-contain rounded-xl"
                    />
                  </div>
                )}

                {/* Stamped Clinical Header with Logged-in Patient Details */}
                <div className="font-mono text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200/80 space-y-2">
                  <p className="font-bold text-slate-900 border-b pb-1 text-[11px] uppercase tracking-wider flex items-center justify-between">
                    <span>=== AYUSH DIGITAL HEALTH RECORD ARCHIVE ===</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ABDM VERIFIED
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Patient Name: <strong className="text-slate-800">{patient?.name || 'Registered Patient'}</strong> | Age: {patient?.age || '38'}Y/{patient?.gender || 'M'}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Compulsory ABHA ID: <strong className="text-emerald-700">{patient?.abhaId || 'XX-XXXX-XXXX-XXXX'}</strong> | Gateway: {patient?.abhaAddress || 'patient@abdm'}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Issuing Center: {selectedRecord.institution} | Record Date: {selectedRecord.date}
                  </p>
                  <div className="py-1 border-t border-slate-100">
                    <p className="text-[11px] text-teal-800 font-semibold">&gt;&gt; OCR Extraction Status: Complete (Accuracy: {selectedRecord.confidence || 98.4}%)</p>
                    <p className="text-[11px] text-slate-500">&gt;&gt; Stamped and Indexed under Patient ABHA ID</p>
                  </div>
                </div>
              </div>

              {/* EXTRACTED ENTITIES SECTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    Structured AI Entities Extracted from Document
                  </h4>
                  <span className="text-[10px] text-slate-400">Standardized to SNOMED & Ayush Codes</span>
                </div>

                {/* Biomarkers Table (if lab report) */}
                {selectedRecord.extractedData?.biomarkers && selectedRecord.extractedData.biomarkers.length > 0 && (
                  <div className="overflow-hidden border border-slate-200 rounded-2xl">
                    <table className="min-w-full divide-y divide-slate-200 text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-semibold">
                        <tr>
                          <th className="px-3 py-2 text-left">Extracted Biomarker</th>
                          <th className="px-3 py-2 text-left">Observed Value</th>
                          <th className="px-3 py-2 text-left">Reference Range</th>
                          <th className="px-3 py-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {selectedRecord.extractedData.biomarkers.map((bio, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60">
                            <td className="px-3 py-2 font-medium text-slate-800">{bio.name}</td>
                            <td className="px-3 py-2 font-bold font-mono text-slate-900">{bio.value}</td>
                            <td className="px-3 py-2 text-slate-500 font-mono">{bio.range || 'N/A'}</td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                (bio.status || '').includes('High') || (bio.status || '').includes('Elevated') || (bio.status || '').includes('Resistance')
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                                {bio.status || 'Recorded'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Prescribed Medications (if prescription) */}
                {selectedRecord.extractedData?.medications && selectedRecord.extractedData.medications.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700">Identified Pharmaceutical Formulations:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedRecord.extractedData.medications.map((med, idx) => (
                        <div key={idx} className="p-3 rounded-xl border border-teal-200 bg-teal-50/40">
                          <div className="flex items-center gap-1.5">
                            <Pill className="w-3.5 h-3.5 text-teal-700" />
                            <p className="text-xs font-bold text-slate-800">{med.name} {med.dose && `(${med.dose})`}</p>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">{med.frequency} • {med.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ayurvedic Correlation & Clinical Impression Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/70 to-teal-50/70 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-emerald-600 text-white">
                      <Sparkles className="w-3 h-3" />
                    </span>
                    <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Ayurvedic Dosha-Dushya Correlation
                    </p>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Modern Finding:</strong> {selectedRecord.extractedData?.clinicalImpression || 'Clinical document cataloged into patient health record.'}
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    <strong>Ayurvedic Interpretation:</strong> {selectedRecord.extractedData?.ayurvedicCorrelation || 'Integrated with patient Prakriti and Vikriti evaluation.'}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500">
                  All extracted entities are indexed into the patient's longitudinal record under ABHA ID.
                </p>

                <button
                  onClick={onNavigateToTimeline}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-xs cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5" />
                  View in Medical Timeline
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold">No Document Selected</p>
              <p className="text-xs mt-1">Upload a new document or pick an existing record to inspect extracted entities.</p>
            </div>
          )}

        </div>

      </div>

      {/* Success Toast */}
      {uploadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-2xl shadow-xl animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-100" />
          <p className="text-xs font-semibold">
            Medical document uploaded & OCR entities mapped to ABHA ID successfully!
          </p>
        </div>
      )}

    </div>
  );
};
