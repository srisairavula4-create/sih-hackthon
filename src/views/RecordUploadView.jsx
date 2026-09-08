import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Eye, 
  Plus, 
  ArrowRight, 
  FileCheck, 
  FileSpreadsheet, 
  Pill, 
  Layers,
  Clock,
  ExternalLink
} from 'lucide-react';

export const RecordUploadView = ({ oldRecords, onAddRecord, onNavigateToTimeline }) => {
  const [selectedRecord, setSelectedRecord] = useState(oldRecords[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusText, setScanStatusText] = useState('');
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);

  // New simulated upload file
  const handleSimulateNewUpload = (sampleType) => {
    setIsScanning(true);
    setScanProgress(10);
    setScanStatusText('Initializing Optical Character Recognition (OCR) Engine & Tesseract-Ayush...');

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          finishScan(sampleType);
          return 100;
        }
        if (prev === 30) setScanStatusText('Binarizing high-resolution medical document & segmenting text blocks...');
        if (prev === 60) setScanStatusText('Extracting laboratory entities, units, reference intervals & clinical impressions...');
        if (prev === 80) setScanStatusText('Mapping biomarkers to Ayurvedic Dosha-Dushya taxonomy...');
        return prev + 20;
      });
    }, 400);
  };

  const finishScan = (sampleType) => {
    setTimeout(() => {
      setIsScanning(false);
      
      const newRec = {
        id: `REC-${Date.now().toString().slice(-4)}`,
        title: sampleType === 'lab' 
          ? "Specialized Lipid Panel & Fasting Insulin (Dr. Lal PathLabs)"
          : "Endocrine Review & Liver Ultrasound Report",
        institution: "Dr. Lal PathLabs, Bangalore",
        date: new Date().toISOString().split('T')[0],
        type: sampleType === 'lab' ? "Lab Report" : "Imaging & Lab",
        fileName: sampleType === 'lab' ? "lal_pathlabs_fasting_lipid_2025.pdf" : "liver_usg_report_2025.pdf",
        fileSize: "2.1 MB",
        confidence: 97.6,
        status: "Processed by AI",
        extractedData: {
          biomarkers: [
            { name: "Fasting Serum Insulin", value: "18.4 uIU/mL", range: "2.6 - 24.9 uIU/mL", status: "Upper Normal / Insulin Resistance" },
            { name: "HOMA-IR (Insulin Resistance Index)", value: "6.4", range: "< 2.0", status: "Significant Resistance" },
            { name: "Serum Triglycerides", value: "192 mg/dL", range: "< 150 mg/dL", status: "High" },
            { name: "HDL Cholesterol", value: "39 mg/dL", range: "> 40 mg/dL", status: "Low" }
          ],
          clinicalImpression: "Marked peripheral insulin resistance with atherogenic dyslipidemia.",
          ayurvedicCorrelation: "Strong confirmation of Medo-Dhatu Dushti and Srotorodha in Medovaha Srotas."
        }
      };

      onAddRecord(newRec);
      setSelectedRecord(newRec);
      setUploadSuccessToast(true);
      setTimeout(() => setUploadSuccessToast(false), 4000);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* View Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              OCR Accuracy: 98.4%
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Upload Box & Document Selector */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Drag & Drop Upload Zone */}
          <div className="bg-white rounded-3xl border-2 border-dashed border-teal-300/80 p-6 shadow-xs text-center hover:border-teal-500 hover:bg-teal-50/20 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <UploadCloud className="w-7 h-7 animate-bounce" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              Upload Old Medical Records or Prescriptions
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Drag & drop PDFs, scans, or camera photos (PDF, PNG, JPG up to 15MB)
            </p>

            {/* Quick Demo Pre-load Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Or Simulate Instant Upload for SIH Demo:
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulateNewUpload('lab')}
                  disabled={isScanning}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Upload Missing Lipid Panel & Insulin Report
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulateNewUpload('imaging')}
                  disabled={isScanning}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Upload Abdominal Ultrasound Scan
                </button>
              </div>
            </div>
          </div>

          {/* List of Available Records */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Available Document Records ({oldRecords.length})
              </h4>
              <span className="text-[10px] text-slate-400">Click to inspect</span>
            </div>

            <div className="space-y-2.5">
              {oldRecords.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecord(rec)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedRecord.id === rec.id
                      ? 'bg-teal-50/70 border-teal-400 ring-2 ring-teal-200/50'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="p-2 rounded-xl bg-white border border-slate-200 text-teal-700 mt-0.5 flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{rec.title}</p>
                        <p className="text-[11px] text-slate-500">{rec.institution}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-slate-400">{rec.date}</span>
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/60 px-1.5 py-0.2 rounded">
                            {rec.confidence}% OCR
                          </span>
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

        </div>

        {/* Right Column (7 Cols): Document Preview & OCR Entity Extraction */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Scanning Progress Overlay or Document Header */}
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
          ) : (
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
                    Confidence: {selectedRecord.confidence}%
                  </span>
                </div>
              </div>

              {/* Simulated Paper Document Scan with Laser Line */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-hidden shadow-inner">
                {/* Optical Laser Scanning Line */}
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-[0_0_8px_#0d9488] animate-scan-laser pointer-events-none" />

                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 mb-3 border-b border-slate-200/60 font-mono">
                  <span>File: {selectedRecord.fileName}</span>
                  <span>{selectedRecord.fileSize}</span>
                </div>

                {/* Simulated Document Snippet Content */}
                <div className="font-mono text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200/80 space-y-2">
                  <p className="font-bold text-slate-900 border-b pb-1 text-[11px] uppercase">
                    === CLINICAL DIAGNOSTIC SCAN REPORT ===
                  </p>
                  <p className="text-[11px] text-slate-600">Patient: Aarav Sharma | Age: 38Y/M | Ref Dr: Clinic OPD</p>
                  <p className="text-[11px] text-slate-600">Report Date: {selectedRecord.date} | Acc No: DL-89410</p>
                  <div className="py-1">
                    <p className="text-[11px] text-teal-800 font-semibold">&gt;&gt; OCR Text Extraction Confidence: {selectedRecord.confidence}%</p>
                    <p className="text-[11px] text-slate-500">&gt;&gt; Automated Entity Mapping: Complete</p>
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

                {/* Biomarkers Table (if any) */}
                {selectedRecord.extractedData.biomarkers && (
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
                            <td className="px-3 py-2 text-slate-500 font-mono">{bio.range}</td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                bio.status.includes('High') || bio.status.includes('Elevated') || bio.status.includes('Resistance')
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                                {bio.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Prescribed Medications (if prescription) */}
                {selectedRecord.extractedData.medications && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-700">Identified Pharmaceutical Formulations:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedRecord.extractedData.medications.map((med, idx) => (
                        <div key={idx} className="p-3 rounded-xl border border-amber-200 bg-amber-50/50">
                          <div className="flex items-center gap-1.5">
                            <Pill className="w-3.5 h-3.5 text-amber-700" />
                            <p className="text-xs font-bold text-slate-800">{med.name} ({med.dose})</p>
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
                    <strong className="text-slate-900">Modern Finding:</strong> {selectedRecord.extractedData.clinicalImpression}
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    <strong>Ayurvedic Interpretation:</strong> {selectedRecord.extractedData.ayurvedicCorrelation}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500">
                  All extracted entities are indexed into the patient's longitudinal record.
                </p>

                <button
                  onClick={onNavigateToTimeline}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-xs"
                >
                  <Clock className="w-3.5 h-3.5" />
                  View in Medical Timeline
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Success Toast */}
      {uploadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-2xl shadow-xl animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-100" />
          <p className="text-xs font-semibold">
            Medical document uploaded & OCR entities mapped to timeline successfully!
          </p>
        </div>
      )}

    </div>
  );
};
