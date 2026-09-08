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
      const saved = localStorage.getItem('ayurvaidya_records');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SAMPLE_OLD_RECORDS;
  });

  // Persistent Timeline
  const [timeline, setTimeline] = useState(() => {
    try {
      const saved = localStorage.getItem('ayurvaidya_timeline');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_TIMELINE;
  });

  // Persistent AI Clinical Summary
  const [aiSummary, setAiSummary] = useState(() => {
    try {
      const saved = localStorage.getItem('ayurvaidya_summary');
      if (saved) return JSON.parse(saved);
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
      localStorage.setItem('ayurvaidya_summary', JSON.stringify(aiSummary));
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
    setOldRecords(prev => [newRec, ...prev]);
    const timelineEntry = {
      id: `TIME-${Date.now().toString().slice(-4)}`,
      date: newRec.date,
      title: `Lab Test: ${newRec.title}`,
      category: newRec.type,
      badgeColor: "emerald",
      summary: newRec.extractedData?.clinicalImpression || "Document analyzed and categorized via AI OCR.",
      keyValues: newRec.extractedData?.biomarkers?.slice(0, 3).map(b => `${b.name}: ${b.value}`) || ["Biomarkers Extracted"],
      sourceFile: newRec.fileName
    };
    setTimeline(prev => [timelineEntry, ...prev]);
    showToast('New diagnostic report added & indexed into timeline!', 'success');
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
                onNavigateToTimeline={() => setCurrentView('timeline')}
              />
            )}

            {/* View 4: Interactive Medical Timeline */}
            {currentView === 'timeline' && (
              <TimelineView 
                patient={patient}
                timeline={timeline}
                onNavigateToUpload={() => setCurrentView('upload-records')}
              />
            )}

            {/* View 5: AI Synthesized Clinical Summary */}
            {currentView === 'ai-summary' && (
              <AiSummaryView 
                aiSummary={aiSummary}
                patient={patient}
                foodIntake={caseData.foodIntake}
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
