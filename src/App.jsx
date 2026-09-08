import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Toast } from './components/NotificationToast';
import { AuthView } from './views/AuthView';
import { DashboardView } from './views/DashboardView';
import { CaseTakingWizard } from './views/CaseTakingWizard';
import { RecordUploadView } from './views/RecordUploadView';
import { TimelineView } from './views/TimelineView';
import { AiSummaryView } from './views/AiSummaryView';
import { VaidyaReviewView } from './views/VaidyaReviewView';
import { AbhaLinkModal } from './views/AbhaLinkModal';

import { 
  INITIAL_PATIENT, 
  INITIAL_VAIDYA, 
  SAMPLE_OLD_RECORDS, 
  INITIAL_TIMELINE, 
  INITIAL_CASE_INTAKE, 
  INITIAL_AI_SUMMARY 
} from './types/data';

export default function App() {
  // Start unauthenticated so user creates and logs in their own profile
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userRole = 'patient';
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'case-taking' | 'upload-records' | 'timeline' | 'ai-summary' | 'vaidya-review'
  
  // Data States - starts dynamically populated from user's registration
  const [patient, setPatient] = useState({
    id: "P-1001",
    name: "Registered Patient",
    age: 36,
    gender: "Male",
    phone: "+91 98765 00000",
    email: "patient@example.com",
    abhaId: "91-2345-6789-1234",
    abhaAddress: "patient@abdm",
    isAbhaLinked: true,
    bloodGroup: "O+",
    emergencyContact: "Primary Caregiver - +91 98765 00001",
    prakriti: "Pitta-Kapha",
    vikriti: "Kapha-Vataja (Ama-yukta)",
    bmi: "25.4 (Normal / Overweight borderline)",
    vitals: {
      bp: "128/82 mmHg",
      pulse: "74 bpm",
      weight: "74 kg",
      height: "172 cm",
      bloodSugarFasting: "138 mg/dL",
      lastRecorded: "Today"
    }
  });
  const [vaidya, setVaidya] = useState(INITIAL_VAIDYA);
  const [caseData, setCaseData] = useState(INITIAL_CASE_INTAKE);
  const [oldRecords, setOldRecords] = useState(SAMPLE_OLD_RECORDS);
  const [timeline, setTimeline] = useState(INITIAL_TIMELINE);
  const [aiSummary, setAiSummary] = useState(INITIAL_AI_SUMMARY);

  // ABHA & Notification Modals
  const [isAbhaModalOpen, setIsAbhaModalOpen] = useState(false);
  const [hasMissingDoc, setHasMissingDoc] = useState(true);
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleUpdateFoodIntake = (newFoodIntake) => {
    setCaseData(prev => ({
      ...prev,
      foodIntake: newFoodIntake
    }));

    // Dynamic AI Summarization update based on user's entered food intake!
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

    setAiSummary(prev => ({
      ...prev,
      foodIntakeAnalysis: {
        loggedMealsSummary: `Patient Logged: Breakfast (${newFoodIntake.breakfast || 'None'}), Lunch (${newFoodIntake.lunch || 'Standard'}), Snacks (${newFoodIntake.eveningSnacks || 'None'}), Dinner (${newFoodIntake.dinner || 'Standard'}), Fluids (${newFoodIntake.fluids || 'Standard'})`,
        primaryTriggers: triggers,
        doshaImpact: "Dietary habits directly impact Dhatvagni and Medovaha Srotas, fueling metabolic disease progression.",
        dietaryActionPlan: "Adjust meal timings: light dinner before 8:00 PM, eliminate day sleep, replace heavy fried snacks with roasted barley (Yava) or green gram (Mudga) broth."
      }
    }));

    showToast("Food intake logged & analyzed by AI Clinical Engine!", "success");
  };

  const handleLoginSuccess = (role, userData) => {
    setUserRole(role);
    if (role === 'patient') {
      setPatient(prev => ({ ...prev, ...userData }));
      setCurrentView('dashboard');
    } else {
      setVaidya(prev => ({ ...prev, ...userData }));
      setCurrentView('vaidya-review');
    }
    setIsAuthenticated(true);
    showToast(`Welcome, ${userData.name}!`, 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    showToast('Signed out successfully.', 'info');
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
    // Also inject into timeline
    const newTimelineItem = {
      id: `TIME-${Date.now().toString().slice(-4)}`,
      date: newRec.date,
      title: `${newRec.type}: ${newRec.title}`,
      category: newRec.type === 'Lab Report' ? 'Lab Report' : 'Prescription',
      badgeColor: 'teal',
      summary: newRec.extractedData.clinicalImpression || 'Scanned and parsed by AI OCR engine.',
      keyValues: newRec.extractedData.biomarkers?.map(b => `${b.name.split(' ')[0]}: ${b.value}`) || [],
      sourceFile: newRec.fileName
    };
    setTimeline(prev => [newTimelineItem, ...prev]);
    setHasMissingDoc(false); // satisfied missing document requirement!
    showToast('Medical record added & synced to interactive timeline!', 'success');
  };

  const handleSyncAbdmRecords = () => {
    showToast('ABDM Records synced! Latest reports now available in timeline.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-800">
      
      {/* If not authenticated, render Login/Register portal */}
      {!isAuthenticated ? (
        <AuthView onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Main Top Navigation */}
          <Navbar 
            currentView={currentView}
            setCurrentView={setCurrentView}
            userRole={userRole}
            setUserRole={setUserRole}
            patient={patient}
            vaidya={vaidya}
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
                  showToast('Ayurvedic Case details updated successfully!', 'success');
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
                oldRecords={oldRecords}
                onAddRecord={handleAddRecord}
                onNavigateToTimeline={() => setCurrentView('timeline')}
              />
            )}

            {/* View 4: Interactive Medical Timeline */}
            {currentView === 'timeline' && (
              <TimelineView 
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
                onNavigateToReview={() => {
                  setUserRole('vaidya');
                  setCurrentView('vaidya-review');
                }}
                onNavigateToCase={() => setCurrentView('case-taking')}
              />
            )}

            {/* View 6: Doctor / Vaidya Review & Digital Verification */}
            {currentView === 'vaidya-review' && (
              <VaidyaReviewView 
                aiSummary={aiSummary}
                patient={patient}
                vaidya={vaidya}
                onUpdateSummary={(updated) => {
                  setAiSummary(updated);
                }}
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
              showToast('ABHA ID linked successfully with ABDM Gateway!', 'success');
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

          {/* Bottom Footer */}
          <footer className="bg-white border-t border-slate-200/80 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <p>
                © 2024-2026 AyurVaidya AI • Smart India Hackathon (SIH) Prototype • National Health Authority & Ayush Ministry Compliant
              </p>
              <div className="flex items-center gap-4">
                <span className="text-emerald-700 font-semibold">Ayurvedic Clinical Decision Support</span>
                <span>•</span>
                <span className="text-teal-700 font-semibold">ABDM Interoperability</span>
              </div>
            </div>
          </footer>
        </>
      )}

    </div>
  );
}
