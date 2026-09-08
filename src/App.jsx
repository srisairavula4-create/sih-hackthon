import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Toast } from './components/NotificationToast';
import { AuthView } from './views/AuthView';
import { DashboardView } from './views/DashboardView';
import { CaseTakingWizard } from './views/CaseTakingWizard';
import { RecordUploadView } from './views/RecordUploadView';
import { TimelineView } from './views/TimelineView';
import { AiSummaryView } from './views/AiSummaryView';
import { AbhaLinkModal } from './views/AbhaLinkModal';

import { 
  SAMPLE_OLD_RECORDS, 
  INITIAL_TIMELINE, 
  INITIAL_CASE_INTAKE, 
  INITIAL_AI_SUMMARY 
} from './types/data';

export default function App() {
  // Persistent Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('ayurvaidya_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [currentView, setCurrentView] = useState(() => {
    try {
      return localStorage.getItem('ayurvaidya_view') || 'dashboard';
    } catch (e) {
      return 'dashboard';
    }
  });
  
  // Persistent Patient State
  const [patient, setPatient] = useState(() => {
    try {
      const saved = localStorage.getItem('ayurvaidya_patient');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      id: "P-1001",
      name: "Registered Patient",
      age: 38,
      gender: "Male",
      phone: "9876543210",
      abhaId: "91-2345-6789-1234",
      abhaAddress: "patient@abdm",
      isAbhaLinked: true,
      bloodGroup: "B+",
      prakriti: "Pitta-Kapha",
      vikriti: "Kapha-Vataja (Ama-yukta)",
      bmi: "25.4",
      vitals: {
        bp: "128/82 mmHg",
        pulse: "74 bpm",
        weight: "74 kg",
        height: "172 cm",
        bloodSugarFasting: "138 mg/dL",
        lastRecorded: "Today"
      }
    };
  });

  // Persistent Clinical Case Data
  const [caseData, setCaseData] = useState(() => {
    try {
      const saved = localStorage.getItem('ayurvaidya_case');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_CASE_INTAKE;
  });

  // Persistent Extracted Medical Records
  const [oldRecords, setOldRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('ayurvaidya_records_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SAMPLE_OLD_RECORDS;
  });

  // Persistent Timeline
  const [timeline, setTimeline] = useState(() => {
    try {
      const saved = localStorage.getItem('ayurvaidya_timeline_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_TIMELINE;
  });

  // Persistent AI Clinical Summary
  const [aiSummary, setAiSummary] = useState(() => {
    try {
      const saved = localStorage.getItem('ayurvaidya_summary_v5') || localStorage.getItem('ayurvaidya_summary_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_AI_SUMMARY,
          ...parsed,
          stomachSummary: { ...INITIAL_AI_SUMMARY.stomachSummary, ...(parsed.stomachSummary || {}) },
          chestSummary: { ...INITIAL_AI_SUMMARY.chestSummary, ...(parsed.chestSummary || {}) },
          rogaNidana: { ...INITIAL_AI_SUMMARY.rogaNidana, ...(parsed.rogaNidana || {}) },
          pathyaApathya: { ...INITIAL_AI_SUMMARY.pathyaApathya, ...(parsed.pathyaApathya || {}) },
          prescribedFormulations: (parsed.prescribedFormulations && parsed.prescribedFormulations.length > 0)
            ? parsed.prescribedFormulations
            : INITIAL_AI_SUMMARY.prescribedFormulations,
          foodIntakeAnalysis: parsed.foodIntakeAnalysis || INITIAL_AI_SUMMARY.foodIntakeAnalysis,
          conflicts: parsed.conflicts || INITIAL_AI_SUMMARY.conflicts
        };
      }
    } catch (e) {}
    return INITIAL_AI_SUMMARY;
  });

  // Modals & Alerts
  const [isAbhaModalOpen, setIsAbhaModalOpen] = useState(false);
  const [hasMissingDoc, setHasMissingDoc] = useState(true);
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ayurvaidya_auth', isAuthenticated ? 'true' : 'false');
    } catch (e) {}
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem('ayurvaidya_view', currentView);
    } catch (e) {}
  }, [currentView]);

  useEffect(() => {
    try {
      localStorage.setItem('ayurvaidya_patient', JSON.stringify(patient));
    } catch (e) {}
  }, [patient]);

  useEffect(() => {
    try {
      localStorage.setItem('ayurvaidya_case', JSON.stringify(caseData));
    } catch (e) {}
  }, [caseData]);

  useEffect(() => {
    try {
      localStorage.setItem('ayurvaidya_records', JSON.stringify(oldRecords));
    } catch (e) {}
  }, [oldRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('ayurvaidya_timeline', JSON.stringify(timeline));
    } catch (e) {}
  }, [timeline]);

  useEffect(() => {
    try {
      localStorage.setItem('ayurvaidya_summary_v3', JSON.stringify(aiSummary));
    } catch (e) {}
  }, [aiSummary]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleUpdateFoodIntake = (newFoodIntake) => {
    const updatedCase = {
      ...caseData,
      foodIntake: newFoodIntake
    };
    setCaseData(updatedCase);

    // Dynamic AI Summarization update
    const foodString = `${newFoodIntake.breakfast} ${newFoodIntake.lunch} ${newFoodIntake.eveningSnacks} ${newFoodIntake.dinner} ${newFoodIntake.fluids} ${newFoodIntake.notes || ''}`.toLowerCase();
    
    const triggers = [];
    if (foodString.includes('curd') || foodString.includes('dahi') || foodString.includes('milk') || foodString.includes('dairy') || foodString.includes('cheese') || foodString.includes('paneer')) {
      triggers.push("Dadhi/Dairy Heavy Intake: Aggravates Kapha and creates micro-channel blockage (Abhishyandi).");
    }
    if (foodString.includes('samosa') || foodString.includes('fried') || foodString.includes('pakora') || foodString.includes('oil') || foodString.includes('chips') || foodString.includes('fast food') || foodString.includes('burger')) {
      triggers.push("Deep Fried & Oily Items (Snigdha/Guru): Dampens Jatharagni, creating metabolic endotoxins (Ama).");
    }
    if (foodString.includes('cold') || foodString.includes('chilled') || foodString.includes('ice') || foodString.includes('soda') || foodString.includes('coke') || foodString.includes('juice')) {
      triggers.push("Sheeta Jala & Sugary Beverages: Shuts down digestive enzyme secretion, causing delayed gastric emptying.");
    }
    if (foodString.includes('sweet') || foodString.includes('sugar') || foodString.includes('biscuit') || foodString.includes('cake') || foodString.includes('rice') || foodString.includes('roti') || foodString.includes('bread')) {
      triggers.push("Madhura Rasa & High Carbs: Directly elevates circulating glucose and promotes Kaphaja Prameha.");
    }
    if (triggers.length === 0) {
      triggers.push("Standard mixed dietary intake logged; indicates need for customized Agni-deepana herbs.");
    }

    const updatedSummary = {
      ...aiSummary,
      foodIntakeAnalysis: {
        loggedMealsSummary: `Patient Logged: Breakfast (${newFoodIntake.breakfast || 'None'}), Lunch (${newFoodIntake.lunch || 'Standard'}), Snacks (${newFoodIntake.eveningSnacks || 'None'}), Dinner (${newFoodIntake.dinner || 'Standard'}), Fluids (${newFoodIntake.fluids || 'Standard'})`,
        primaryTriggers: triggers,
        doshaImpact: "Dietary habits directly impact Dhatvagni and Medovaha Srotas, fueling metabolic disease progression.",
        dietaryActionPlan: "Adjust meal timings: light dinner before 8:00 PM, eliminate day sleep, replace heavy fried snacks with roasted barley (Yava) or green gram (Mudga) broth."
      }
    };

    setAiSummary(updatedSummary);
    showToast("Food intake logged & analyzed by AI Clinical Engine!", "success");
  };

  const handleLoginSuccess = (role, userData) => {
    const updatedPatient = { ...patient, ...userData, isAbhaLinked: true };
    setPatient(updatedPatient);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    try {
      localStorage.setItem('ayurvaidya_auth', 'true');
      localStorage.setItem('ayurvaidya_patient', JSON.stringify(updatedPatient));
      localStorage.setItem('ayurvaidya_view', 'dashboard');
    } catch (e) {}
    showToast(`Welcome, ${userData.name}! Successfully signed in.`, 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    try {
      localStorage.setItem('ayurvaidya_auth', 'false');
    } catch (e) {}
    showToast('Signed out of patient portal.', 'info');
  };

  const handleUploadNow = () => {
    setCurrentView('upload-records');
    showToast('Redirected to smart OCR uploader to add pending HbA1c panel.', 'info');
  };

  const handleRemindLater = () => {
    setHasMissingDoc(false);
    showToast('Reminder snoozed. We will alert you in 2 hours for clinical correlation.', 'warning');
  };

  const handleAddRecord = (newRec) => {
    // 1. Update oldRecords and sync to localStorage
    setOldRecords(prev => {
      const updated = [newRec, ...prev.filter(r => r.id !== newRec.id)];
      try {
        localStorage.setItem('ayurvaidya_records_v2', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    
    // 2. Determine title prefix, key values & category
    let titlePrefix = "Lab Test";
    let badgeColor = "emerald";
    let keyValues = ["Record Stamped to ABHA ID"];
    
    if (newRec.type === 'Prescription') {
      titlePrefix = "Prescription";
      badgeColor = "teal";
      if (newRec.extractedData?.medications && newRec.extractedData.medications.length > 0) {
        keyValues = newRec.extractedData.medications.slice(0, 3).map(m => `${m.name} (${m.dose})`);
      }
    } else if (newRec.type === 'Discharge Summary' || newRec.type === 'Consultation') {
      titlePrefix = newRec.type;
      badgeColor = "amber";
      if (newRec.extractedData?.medications && newRec.extractedData.medications.length > 0) {
        keyValues = newRec.extractedData.medications.slice(0, 3).map(m => `${m.name} (${m.dose})`);
      }
    } else {
      if (newRec.extractedData?.biomarkers && newRec.extractedData.biomarkers.length > 0) {
        keyValues = newRec.extractedData.biomarkers.slice(0, 3).map(b => `${b.name}: ${b.value}`);
      }
    }

    const timelineEntry = {
      id: `TIME-${Date.now().toString().slice(-4)}`,
      recordId: newRec.id,
      date: newRec.date,
      title: `${titlePrefix}: ${newRec.title}`,
      category: newRec.type,
      condition: newRec.condition,
      badgeColor: badgeColor,
      summary: newRec.extractedData?.clinicalImpression || "Document verified and categorized via AI OCR.",
      keyValues: keyValues,
      sourceFile: newRec.fileName,
      institution: newRec.institution,
      extractedData: newRec.extractedData,
      isNew: true
    };

    // 3. Update timeline and sync to localStorage
    setTimeline(prev => {
      const updated = [timelineEntry, ...prev.filter(t => t.recordId !== newRec.id)];
      try {
        localStorage.setItem('ayurvaidya_timeline_v2', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // 4. AUTOMATIC RE-PROCESS & REFRESH OF AI CLINICAL SUMMARY TAB
    setAiSummary(prevSummary => {
      const isStomach = newRec.condition === 'stomach_pain' || 
        newRec.title.toLowerCase().includes('stomach') || 
        newRec.title.toLowerCase().includes('endoscopy') || 
        newRec.title.toLowerCase().includes('gastro') ||
        newRec.title.toLowerCase().includes('discharge');

      const isChest = newRec.condition === 'chest_pain' || 
        newRec.title.toLowerCase().includes('chest') || 
        newRec.title.toLowerCase().includes('ecg') || 
        newRec.title.toLowerCase().includes('lipid');

      // Preserve all source attributions
      const existingSources = prevSummary.sources || [
        { name: "Patient Voice Intake", date: "2025-01-12", facility: "Self-Reported" },
        { name: "Max Healthcare Endoscopy Report", date: "2025-01-18", facility: "Max Healthcare" },
        { name: "Fortis Escorts ECG & Lipid Panel", date: "2025-01-14", facility: "Fortis Escorts" }
      ];

      const newSourceEntry = {
        name: newRec.title,
        date: newRec.date,
        facility: newRec.institution,
        fileName: newRec.fileName
      };

      const updatedSources = [newSourceEntry, ...existingSources.filter(s => s.name !== newRec.title)];

      // Conflict / Variance Detection Registry (No silent overwriting)
      const currentConflicts = prevSummary.conflicts || [
        {
          id: "CONF-01",
          parameter: "Fasting Blood Glucose",
          priorValue: "112 mg/dL",
          priorSource: "AIIMS Annual Health Checkup (2023-11-18)",
          newValue: "138 mg/dL",
          newSource: "Max Healthcare Diagnostic Panel (2025-01-18)",
          varianceType: "Biomarker Drift Alert",
          resolution: "Preserved with longitudinal provenance. Glycemic escalation reflects Jatharagni Mandya rather than record contradiction.",
          status: "Preserved with Source Attribution"
        },
        {
          id: "CONF-02",
          parameter: "Serum Triglycerides",
          priorValue: "215 mg/dL",
          priorSource: "Baseline Lipid Screening (2024-08-10)",
          newValue: "192 mg/dL",
          newSource: "Fortis Escorts Cardiology Panel (2025-01-14)",
          varianceType: "Therapeutic Trajectory",
          resolution: "Down-trend from 215 to 192 mg/dL demonstrates therapeutic response to Atorvastatin & Arjuna Ksheerapaka. Both values preserved.",
          status: "Preserved with Source Attribution"
        }
      ];

      let newConflicts = [...currentConflicts];

      // If new record contains biomarkers, detect variance against existing data
      if (newRec.extractedData?.biomarkers) {
        newRec.extractedData.biomarkers.forEach(b => {
          if (b.name.toLowerCase().includes('glucose') || b.name.toLowerCase().includes('sugar')) {
            newConflicts = [
              {
                id: `CONF-${Date.now()}-GLU`,
                parameter: "Fasting Blood Glucose",
                priorValue: "138 mg/dL",
                priorSource: "Prior Laboratory Panel",
                newValue: b.value,
                newSource: `${newRec.title} (${newRec.institution}, ${newRec.date})`,
                varianceType: "New Parameter Merged",
                resolution: `Extracted ${b.value} from ${newRec.fileName}. Historical values retained; no silent overwrite.`,
                status: "Preserved with Source Attribution"
              },
              ...newConflicts.filter(c => c.parameter !== "Fasting Blood Glucose")
            ];
          }
        });
      }

      // Merge into condition-specific summaries with source attribution
      const updatedStomachSummary = {
        ...(prevSummary.stomachSummary || {
          title: "AYURVEDIC CASE SUMMARY",
          chiefComplaint: "Stomach pain",
          duration: "2 weeks",
          location: "Upper abdomen",
          associatedSymptoms: "Reduced appetite, bloating",
          previousRecords: "Endoscopy shows antral erythema [Source: Max Healthcare, 2025-01-18]",
          previousMedications: "Pantoprazole 40 mg [Source: Max Healthcare]",
          ayurvedicHistory: "Agni-related complaints reported; Koshtha details recorded",
          source: "Patient voice + endoscopy report + prescription",
          confidence: "0.91",
          statusDraft: "Draft — Vaidya verification required"
        })
      };

      if (isStomach) {
        const newRecordSnippet = `${newRec.title}: ${newRec.extractedData?.clinicalImpression || 'Verified findings'} [Source: ${newRec.institution}, ${newRec.date}]`;
        updatedStomachSummary.previousRecords = `${updatedStomachSummary.previousRecords} • ${newRecordSnippet}`;
        updatedStomachSummary.source = `${updatedStomachSummary.source} + ${newRec.title} (${newRec.fileName})`;
        if (newRec.extractedData?.medications && newRec.extractedData.medications.length > 0) {
          const newMedsStr = newRec.extractedData.medications.map(m => `${m.name} ${m.dose}`).join(', ');
          updatedStomachSummary.previousMedications = `${updatedStomachSummary.previousMedications} + ${newMedsStr} [Source: ${newRec.institution}]`;
        }
      }

      const updatedChestSummary = {
        ...(prevSummary.chestSummary || {
          title: "AYURVEDIC CASE SUMMARY",
          chiefComplaint: "Chest pain",
          duration: "3 weeks",
          location: "Retro-sternal / Left precordium",
          associatedSymptoms: "Exertional tightness, mild breathlessness, morning heaviness",
          previousRecords: "12-Lead ECG shows normal sinus rhythm; Triglycerides 192 mg/dL [Source: Fortis Escorts, 2025-01-14]",
          previousMedications: "Tab. Atorvastatin 10 mg, Tab. Metformin 500 mg [Source: Fortis Escorts]",
          ayurvedicHistory: "Rasavaha & Medovaha Sroto-rodha reported; Dhatvagni Mandya recorded",
          source: "Patient voice + ECG report + cardiology prescription",
          confidence: "0.94",
          statusDraft: "Draft — Vaidya verification required"
        })
      };

      if (isChest) {
        const newRecordSnippet = `${newRec.title}: ${newRec.extractedData?.clinicalImpression || 'Verified findings'} [Source: ${newRec.institution}, ${newRec.date}]`;
        updatedChestSummary.previousRecords = `${updatedChestSummary.previousRecords} • ${newRecordSnippet}`;
        updatedChestSummary.source = `${updatedChestSummary.source} + ${newRec.title} (${newRec.fileName})`;
        if (newRec.extractedData?.medications && newRec.extractedData.medications.length > 0) {
          const newMedsStr = newRec.extractedData.medications.map(m => `${m.name} ${m.dose}`).join(', ');
          updatedChestSummary.previousMedications = `${updatedChestSummary.previousMedications} + ${newMedsStr} [Source: ${newRec.institution}]`;
        }
      }

      const refreshed = {
        ...prevSummary,
        lastRefreshedAt: new Date().toLocaleTimeString(),
        latestUpdatedDoc: newRec.title,
        sources: updatedSources,
        conflicts: newConflicts,
        stomachSummary: updatedStomachSummary,
        chestSummary: updatedChestSummary
      };

      try {
        localStorage.setItem('ayurvaidya_summary_v5', JSON.stringify(refreshed));
      } catch (e) {}

      return refreshed;
    });

    showToast(`${newRec.title} verified! AI Clinical Summary re-processed & refreshed.`, 'success');
  };

  const handleDeleteRecord = (recordId) => {
    setOldRecords(prev => prev.filter(r => r.id !== recordId));
    setTimeline(prev => prev.filter(t => t.recordId !== recordId));
    showToast('Record removed from patient profile.', 'info');
  };

  const handleSyncAbdmRecords = () => {
    const abdmRecord1 = {
      id: "REC-ABDM-01",
      title: "AIIMS New Delhi - Annual Health Checkup",
      institution: "All India Institute of Medical Sciences (AIIMS)",
      date: "2023-11-18",
      type: "Lab Report",
      fileName: "aiims_delhi_health_panel_2023.pdf",
      fileSize: "2.4 MB",
      confidence: 99.1,
      status: "Synced via ABDM Gateway",
      extractedData: {
        biomarkers: [
          { name: "HbA1c", value: "6.2%", range: "< 5.7%", status: "Prediabetic" },
          { name: "Fasting Glucose", value: "112 mg/dL", range: "70 - 99 mg/dL", status: "Mild Impairment" }
        ],
        clinicalImpression: "Early impaired fasting glucose with mild weight gain.",
        ayurvedicCorrelation: "Initial stages of Kapha Vriddhi in Medovaha Srotas."
      }
    };
    setOldRecords(prev => [abdmRecord1, ...prev]);
    showToast('ABDM Records Synced: 1 official record imported!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {!isAuthenticated ? (
        <AuthView onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Main Top Navigation Bar */}
          <Navbar 
            currentView={currentView}
            setCurrentView={setCurrentView}
            patient={patient}
            onOpenAbha={() => setIsAbhaModalOpen(true)}
            hasMissingDoc={hasMissingDoc}
            onShowMissingDocAlert={() => {
              if (hasMissingDoc) {
                showToast('Reminder: Fasting HbA1c & Lipid Panel are pending.', 'warning');
              } else {
                showToast('All recommended medical documents are up-to-date.', 'success');
              }
            }}
            onLogout={handleLogout}
          />

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            
            {/* View 1: Patient Dashboard */}
            {currentView === 'dashboard' && (
              <DashboardView 
                patient={patient}
                hasMissingDoc={hasMissingDoc}
                onUploadNow={handleUploadNow}
                onRemindLater={handleRemindLater}
                onNavigate={setCurrentView}
                onOpenAbha={() => setIsAbhaModalOpen(true)}
                aiSummary={aiSummary}
                oldRecords={oldRecords}
                foodIntake={caseData.foodIntake}
                onUpdateFoodIntake={handleUpdateFoodIntake}
              />
            )}

            {/* View 2: Ayurvedic Case Taking Wizard */}
            {currentView === 'case-taking' && (
              <CaseTakingWizard 
                initialCase={caseData}
                onSaveCase={(updated) => {
                  setCaseData(updated);
                  showToast('Ayurvedic Case details updated & saved!', 'success');
                }}
                onUpdateFoodIntake={handleUpdateFoodIntake}
                onGenerateAiSummary={() => {
                  setCurrentView('ai-summary');
                  showToast('AI Clinical Summary synthesized from case intake!', 'success');
                }}
              />
            )}

            {/* View 3: Medical Records Upload & AI OCR Scanner */}
            {currentView === 'upload-records' && (
              <RecordUploadView 
                patient={patient}
                oldRecords={oldRecords}
                onAddRecord={handleAddRecord}
                onDeleteRecord={handleDeleteRecord}
                onNavigateToTimeline={() => setCurrentView('timeline')}
                onNavigateToAiSummary={() => setCurrentView('ai-summary')}
              />
            )}

            {/* View 4: Interactive Medical Timeline & Integrated Clinical Summary */}
            {(currentView === 'timeline' || currentView === 'ai-summary') && (
              <TimelineView 
                patient={patient}
                timeline={timeline}
                oldRecords={oldRecords}
                aiSummary={aiSummary}
                caseData={caseData}
                initialTab="side-by-side"
                onNavigateToUpload={() => setCurrentView('upload-records')}
                onNavigateToCase={() => setCurrentView('case-taking')}
              />
            )}

          </main>

          {/* ABHA Link Modal */}
          <AbhaLinkModal 
            patient={patient}
            isOpen={isAbhaModalOpen}
            onClose={() => setIsAbhaModalOpen(false)}
            onLinkSuccess={(updatedPatient) => {
              setPatient(updatedPatient);
              showToast('ABHA ID verified & saved with ABDM Gateway!', 'success');
            }}
            onSyncAbdmRecords={handleSyncAbdmRecords}
          />

          {/* Toast Notification Alert */}
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}

        </>
      )}

    </div>
  );
}
