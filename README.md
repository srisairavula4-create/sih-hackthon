# AyurVaidya AI — Intelligent Ayurvedic Patient Case-Taking & Medical History System

> **Smart India Hackathon (SIH) Prototype**  
> *Bridging Classical Ayurvedic Clinical Methodologies with Modern Multimodal Record Extraction, OCR, and Ayushman Bharat Digital Mission (ABDM / ABHA) Interoperability.*

---

## Executive Overview & Problem Statement

Ayurvedic medicine relies on profound clinical diagnostic frameworks such as **Dashavidha Pariksha** (10-fold constitutional examination), **Ashtavidha Pariksha** (8-fold clinical examination), and **Ahara-Vihara** (diet and lifestyle assessment). However, contemporary healthcare delivery faces major bottlenecks:

1. **Unstructured & Subjective Case-Taking**: Critical nuances of *Agni* (digestive fire), *Koshtha* (bowel habits), and *Ama* (endotoxins) are frequently recorded in disparate, non-standardized formats.
2. **Disconnected Allopathic Records**: Patients possess years of diagnostic biochemistry reports (HbA1c, lipid profiles, liver enzymes) and allopathic prescriptions that are not systematically correlated with classical Ayurvedic etiopathogenesis (*Samprapti*).
3. **Absence of National Digital Health Integration**: Lack of native **ABHA (Ayushman Bharat Health Account)** linkage and Ayush Grid compliance impedes longitudinal care continuity.

**AyurVaidya AI** solves these challenges by providing a modern, light-themed clinical platform that unifies digital Ayurvedic case-intake, automated OCR extraction of old medical records, chronological timeline visualization, AI-assisted clinical synthesis (*Roga Nidana* & *Chikitsa Sutra*), and certified Vaidya review with digital sign-off.

---

## Key Features & Demonstrated Workflows

### 1. Patient Registration, Login & 1-Click Hackathon Demo
- Complete validation for Name, Age, Gender, Mobile Number, ABHA ID, Emergency Contact, and Password.
- **1-Click Hackathon Demo Mode**:
  - **Patient Persona**: *Aarav Sharma* (38 y/o, presenting with chronic fatigue, digestive issues & elevated blood sugar).
  - **Vaidya Persona**: *Dr. Priyadarshini Joshi, BAMS, MD (Ayu)* (Senior Ayurvedic Physician & Panchakarma Consultant).

### 2. Patient Health Dashboard
- Dynamic vitals overview (BP, Heart Rate, Fasting Blood Sugar, BMI).
- Personalized **Prakriti Badge** (*Pitta-Kapha*) and active **Vikriti Indicator**.
- **Interactive Tridosha Profiler**: Visual breakdown of Vata (25%), Pitta (45%), and Kapha (30%) with physical qualities and clinical manifestations.
- **Missing Document Reminder Banner**: Proactively detects diagnostic gaps (e.g. pending HbA1c & lipid panel) with interactive **"Upload Now"** and **"Remind Me Later"** actions.

### 3. Ayurvedic Case-Taking Intake Wizard (5 Steps)
- **Step 1: Chief Complaint & HPI**: Symptoms, duration, severity grading, and simulated voice dictation in Hindi/English.
- **Step 2: Past Medical & Allergy History**: Surgical history, allopathic/herbal medications, drug & food allergies (*Asatmya*), family history (*Kula Vritta*).
- **Step 3: Classical Dashavidha Pariksha (10-Fold Examination)**:
  1. *Prakriti* (Constitutional baseline)
  2. *Vikriti* (Current morbidity)
  3. *Sara* (Tissue excellence: Rasa, Rakta, Mamsa, Meda, Asthi, Majja, Shukra)
  4. *Samhanana* (Body compactness & build)
  5. *Pramana* (Anthropometric proportions)
  6. *Satmya* (Dietary adaptability)
  7. *Satva* (Mental fortitude: Pravara / Madhyama / Avara)
  8. *Ahara Shakti* (Ingestion & digestion capacity)
  9. *Vyayama Shakti* (Physical endurance)
  10. *Vaya* (Chronological age stage)
- **Step 4: Ahara & Vihara Evaluation**:
  - *Agni*: Vishamagni, Tikshnagni, Mandagni, Samagni.
  - *Koshtha*: Krura (hard/constipated), Mridu (loose), Madhyama (balanced).
  - Dietary preferences, meal regularity, *Viruddha Ahara* (incompatible foods), *Nidra* (sleep patterns & daytime sleeping/Divasvapna), and *Manasika Bhavas* (stress/anxiety).
- **Step 5: Ashtavidha Pariksha Quick Markers**:
  - *Nadi* (Radial pulse rhythm/gati), *Jihva* (Tongue coating/Ama), *Mutra*, *Mala*, *Shabda*, *Sparsha*, *Drik*, *Akriti*.

### 4. Upload Medical Records & Simulated AI + OCR Extractor
- Drag-and-drop or select realistic pre-loaded reports:
  - Sample 1: *Apollo Diagnostics Comprehensive Metabolic & HbA1c Panel*.
  - Sample 2: *Fortis Hospital Allopathic Prescription (Metformin & Atorvastatin)*.
  - Sample 3: *Kerala Ayurvedic Deepana-Pachana Record*.
- **Live Optical Laser Scanning Animation** with real-time confidence scores (98.4%).
- Automated extraction of biomarkers, reference intervals, and correlation with Ayurvedic doshas (e.g. *Kaphaja Prameha, Medovaha Srotas Dushti*).
- Instant synchronization with the patient's medical timeline.

### 5. Interactive Chronological Medical Timeline
- Longitudinal vertical timeline categorized by Lab Reports, Prescriptions, Ayurvedic Consultations, and Vitals.
- Expandable event cards with original document references and clinical notes.
- **Longitudinal Biomarker Trajectory Widget**: Visualizing HbA1c progress across 14 months (6.2% -> 8.4% -> 7.8%).

### 6. AI-Synthesized Clinical Summary
- Multimodal synthesis bridging allopathic lab data with classical Ayurvedic taxonomy.
- **Roga Nidana & Samprapti Ghataka**:
  - *Vyadhi*: Kaphaja Prameha (Sannipatika Anubandhi)
  - *Dosha*: Kapha Pradhana (Pitta anubandha, secondary Vata Avarana)
  - *Dushya*: Meda, Kleda, Rasa, Mamsa
  - *Agni*: Dhatvagni Mandya with Kosthagni Vishamata
  - *Ama*: Sama Avastha
  - *Sadhyasadhyata*: Krichhra-Sadhya
- **Chikitsa Sutra**: Deepana, Pachana, Srotoshodhana, Kleda-Medo Harana.
- **Classical Formulations Posology**:
  - *Nisha-Amalaki Churna* (3g BD empty stomach with warm water)
  - *Chandraprabha Vati* (2 tabs BD after meals)
  - *Guduchi + Musta Kwath* (40 ml empty stomach in morning)
  - *Triphala Churna with Gomutra Haritaki* (3g at bedtime)
- **Pathya & Apathya Matrix**: Wholesome vs. prohibited diets and lifestyle regimens.
- Simulated Text-to-Speech audio readout for enhanced accessibility.

### 7. Doctor / Vaidya Review Portal & Digital Sign-off
- Attending physician workspace with credentials (*Dr. Priyadarshini Joshi, Reg: AYU-MH-2018-0924*).
- Capability to edit clinical impressions, adjust dosages, add custom herbal compounds, and schedule Panchakarma.
- **Digital Sign-off**: Generates verified timestamped badge.
- **Printable Clinical Prescription Handout**: Formatted with clinic header, Rx insignia, patient demographics, dosage schedule, and official digital stamp for print or PDF download.

### 8. ABHA (Ayushman Bharat Health Account) Linking Prototype
- Input 14-digit ABHA Number (`91-2345-6789-1234`) or ABHA PHR Address.
- Simulated OTP verification modal with 6-digit auto-filled OTP (`749201`) and countdown timer.
- Generates official-looking **Ayushman Bharat Digital Health Card** with National Health Authority branding, photo, QR code, and ABDM sync capabilities.

---

## Design System & Theme Principles

Adheres strictly to a **Clean Light Healthcare & Ayurveda-Inspired Palette**:
- **Backgrounds**: Soft Off-White (`#F8FAFC`), Light Azure Tint (`#F0F9FF`), Pure Card White (`#FFFFFF`).
- **Primary Ayurvedic Herbal Green**: Emerald (`#059669`, `#10B981`, `#15803D`).
- **Secondary Medical Accent**: Soft Teal (`#0D9488`, `#14B8A6`).
- **Warm Turmeric & Amber Badges**: Ayurvedic Indicators (`#D97706`, `#F59E0B`).
- **Component Geometry**: Smooth rounded cards (`rounded-3xl`, `rounded-2xl`), subtle soft elevation (`shadow-xs`, `shadow-sm`), and clean modern typography (`Inter` and `Outfit`).
- **Zero Dark/Black Backgrounds**.

---

## Project Structure

```
ayurvaidya-ai/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── types/
    │   └── data.js              # Patient, Vaidya, OCR records, Timeline, & Ayurvedic taxonomy
    ├── components/
    │   ├── Navbar.jsx           # Top header, role switcher, ABHA pill, notifications
    │   ├── NotificationToast.jsx # Missing document banner & system toasts
    │   ├── DoshaMeter.jsx       # Interactive Tridosha profiler & elemental breakdown
    │   └── AbhaCard.jsx         # Official ABDM Digital Health Card with QR & actions
    └── views/
        ├── AuthView.jsx         # Registration, Login with validation & 1-click test drive
        ├── DashboardView.jsx    # Patient Dashboard, vitals, quick actions, missing report reminder
        ├── CaseTakingWizard.jsx # 5-step intake: HPI, Dashavidha Pariksha, Ahara-Vihara, Ashtavidha
        ├── RecordUploadView.jsx # OCR scanner simulation, laser animation & entity extraction
        ├── TimelineView.jsx     # Longitudinal chronological medical timeline & HbA1c tracker
        ├── AiSummaryView.jsx    # Synthesized Roga Nidana, Chikitsa Sutra & Pathya-Apathya
        ├── VaidyaReviewView.jsx # Vaidya portal, prescription editor & printable handout
        └── AbhaLinkModal.jsx    # 14-digit ABHA input, simulated OTP verification & card issue
```

---

## Local Development & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Launch

```bash
# 1. Clone the repository
git clone https://github.com/srisairavula4-create/sih-hackthon.git
cd sih-hackthon

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Compliance & Standards
- **Ayush Grid & CCRAS Standards**: Structured according to classical Samhita guidelines.
- **Ayushman Bharat Digital Mission (ABDM)**: Compliant with ABHA ID schemas and consent-based health data exchange paradigms.
- **Accessibility & Light Mode**: WCAG-compliant color contrast ratios across all clinical screens.

---
*Developed for Smart India Hackathon (SIH) • Team AyurVaidya AI*
