// Sample Data Store for AyurVaidya AI Prototype
// Retaining ONLY 2 Primary Conditions: Stomach Pain (Udara Shoola) & Chest Pain (Hrid-Shoola)

export const INITIAL_PATIENT = {
  id: "P-98421",
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
  bmi: "26.4 (Overweight)",
  vitals: {
    bp: "128/82 mmHg",
    pulse: "74 bpm",
    weight: "74 kg",
    height: "172 cm",
    bloodSugarFasting: "138 mg/dL",
    lastRecorded: "Today"
  }
};

export const INITIAL_VAIDYA = {
  id: "DOC-AYU-108",
  name: "Dr. Priyadarshini Joshi",
  qualification: "BAMS, MD (Ayurveda - Kayachikitsa)",
  regNumber: "AYU-MH-2018-0924",
  hospital: "National Institute of Ayurveda & AyurVaidya Research Wing",
  experience: "14 Years",
  avatar: "https://images.unsplash.com/photo-1594824813689-ff371b2d076a?w=150&auto=format&fit=crop&q=80"
};

// ONLY 2 CONDITIONS (STOMACH PAIN & CHEST PAIN)
export const SAMPLE_OLD_RECORDS = [
  // CONDITION 1: STOMACH PAIN (UDARA SHOOLA) - DIAGNOSTIC REPORT
  {
    id: "REC-STOMACH-01",
    title: "Abdominal Ultrasound & Upper GI Endoscopy Report",
    institution: "Max Healthcare Gastroenterology Centre",
    date: "2025-01-18",
    type: "Lab Report",
    condition: "stomach_pain",
    conditionName: "Stomach Pain (Udara Shoola)",
    fileName: "stomach_usg_endoscopy_report.pdf",
    fileSize: "1.6 MB",
    confidence: 98.4,
    status: "Processed by AI",
    extractedData: {
      biomarkers: [
        { name: "Gastric Antral Mucosa", value: "Mild Erythema & Erosion", range: "Normal", status: "Mild Gastritis" },
        { name: "H. Pylori Biopsy", value: "Negative", range: "Negative", status: "Normal" },
        { name: "Gastric Emptying Rate", value: "Delayed Motility", range: "Normal", status: "Sluggish (Mandagni)" },
        { name: "Gallbladder & Liver", value: "No Calculi, Normal Caliber", range: "Normal", status: "Normal" }
      ],
      clinicalImpression: "Chronic functional dyspepsia and mild non-erosive gastritis with delayed gastric emptying.",
      extractedFacts: "Endoscopy: Mild antral erythema & superficial erosion. H. Pylori: Negative. Gastric motility: Delayed transit.",
      ayurvedicCorrelation: "Pitta-Vataja Udara Shoola and Amlapitta secondary to Jatharagni Mandya."
    }
  },
  // CONDITION 1: STOMACH PAIN (UDARA SHOOLA) - PRESCRIPTION
  {
    id: "REC-STOMACH-02",
    title: "Gastroenterology & Ayurvedic Prescription",
    institution: "Max Super Speciality & AyurVaidya Gastro OPD",
    date: "2025-01-20",
    type: "Prescription",
    condition: "stomach_pain",
    conditionName: "Stomach Pain (Udara Shoola)",
    fileName: "stomach_pain_prescription.jpg",
    fileSize: "820 KB",
    confidence: 97.2,
    status: "Processed by AI",
    extractedData: {
      medications: [
        { name: "Tab. Pantoprazole", dose: "40 mg", frequency: "Once daily before breakfast", duration: "14 Days" },
        { name: "Sukumaram Kashayam", dose: "15 ml with 45 ml warm water", frequency: "Twice daily before food", duration: "1 Month" },
        { name: "Avipattikar Churna", dose: "3 grams", frequency: "At bedtime with lukewarm water", duration: "Ongoing" }
      ],
      clinicalImpression: "Gastric mucosal protective regimen with Deepana-Pachana herbs for abdominal discomfort.",
      extractedFacts: "Rx: Tab. Pantoprazole 40 mg OD, Sukumaram Kashayam 15 ml BD, Avipattikar Churna 3g HS.",
      ayurvedicCorrelation: "Pitta Shamana and Vatanulomana addressing Kosthagata Ama."
    }
  },
  // CONDITION 2: CHEST PAIN (HRID-SHOOLA) - DIAGNOSTIC REPORT
  {
    id: "REC-CHEST-01",
    title: "12-Lead ECG & Cardiovascular Lipid Panel",
    institution: "Fortis Escorts Heart Institute & Diagnostic Lab",
    date: "2025-01-14",
    type: "Lab Report",
    condition: "chest_pain",
    conditionName: "Chest Pain (Hrid-Shoola)",
    fileName: "chest_pain_ecg_lipid_report.pdf",
    fileSize: "1.9 MB",
    confidence: 98.6,
    status: "Processed by AI",
    extractedData: {
      biomarkers: [
        { name: "12-Lead Resting ECG", value: "Normal Sinus Rhythm", range: "Normal", status: "No ST-T Changes" },
        { name: "Serum Triglycerides", value: "192 mg/dL", range: "< 150 mg/dL", status: "High" },
        { name: "HDL Cholesterol", value: "38 mg/dL", range: "> 40 mg/dL", status: "Low" },
        { name: "Fasting Blood Glucose", value: "138 mg/dL", range: "70 - 99 mg/dL", status: "Elevated" },
        { name: "Troponin-I (Cardiac Marker)", value: "0.01 ng/mL", range: "< 0.04 ng/mL", status: "Normal" }
      ],
      clinicalImpression: "Non-cardiac exertional chest discomfort with atherogenic dyslipidemia and impaired fasting glucose.",
      extractedFacts: "ECG: Normal Sinus Rhythm. Triglycerides: 192 mg/dL (High). HDL: 38 mg/dL (Low). Fasting Glucose: 138 mg/dL (Elevated). Troponin-I: 0.01 ng/mL (Normal).",
      ayurvedicCorrelation: "Kaphaja-Vataja Hrid-Shoola with Medovaha Srotorodha without acute cardiac necrosis."
    }
  },
  // CONDITION 2: CHEST PAIN (HRID-SHOOLA) - PRESCRIPTION
  {
    id: "REC-CHEST-02",
    title: "Cardiology & Integrative Prescription",
    institution: "Fortis Escorts Heart Institute",
    date: "2025-01-15",
    type: "Prescription",
    condition: "chest_pain",
    conditionName: "Chest Pain (Hrid-Shoola)",
    fileName: "chest_pain_cardiac_prescription.jpg",
    fileSize: "910 KB",
    confidence: 96.8,
    status: "Processed by AI",
    extractedData: {
      medications: [
        { name: "Tab. Atorvastatin", dose: "10 mg", frequency: "Once daily at bedtime", duration: "Ongoing" },
        { name: "Tab. Metformin HCl", dose: "500 mg", frequency: "Twice daily with meals", duration: "Ongoing" },
        { name: "Arjuna Ksheerapaka Churna", dose: "3 grams boiled in milk/water", frequency: "Twice daily after food", duration: "3 Months" }
      ],
      clinicalImpression: "Cardioprotective lipid-lowering therapy; advised daily 30-min brisk walk and stress reduction.",
      extractedFacts: "Rx: Tab. Atorvastatin 10 mg HS, Tab. Metformin HCl 500 mg BD, Arjuna Ksheerapaka Churna 3g BD.",
      ayurvedicCorrelation: "Hridya Rasayana (Arjuna) strengthening myocardial endurance and clearing vascular Ama."
    }
  }
];

export const INITIAL_TIMELINE = [
  {
    id: "TIME-STOMACH-02",
    date: "2025-01-20",
    title: "Prescription: Gastroenterology & Ayurvedic Prescription",
    category: "Prescription",
    condition: "stomach_pain",
    conditionName: "Stomach Pain (Udara Shoola)",
    badgeColor: "amber",
    summary: "Sukumaram Kashayam, Avipattikar Churna & Pantoprazole prescribed for gastric pain and burning sour eructations.",
    keyValues: ["Pantoprazole 40mg", "Sukumaram Kashayam", "Avipattikar 3g"],
    sourceFile: "stomach_pain_prescription.jpg",
    extractedData: {
      extractedFacts: "Rx: Tab. Pantoprazole 40 mg OD, Sukumaram Kashayam 15 ml BD, Avipattikar Churna 3g HS.",
      ayurvedicInterpretation: "Deepana-Pachana and Vatanulomana addressing Kosthagata Ama."
    }
  },
  {
    id: "TIME-STOMACH-01",
    date: "2025-01-18",
    title: "Diagnostic Scan: Abdominal Ultrasound & Endoscopy Report",
    category: "Lab Report",
    condition: "stomach_pain",
    conditionName: "Stomach Pain (Udara Shoola)",
    badgeColor: "amber",
    summary: "Mild antral gastritis observed with sluggish gastric emptying. H. Pylori negative.",
    keyValues: ["Antral Erythema", "Delayed Motility", "H. Pylori Negative"],
    sourceFile: "stomach_usg_endoscopy_report.pdf",
    extractedData: {
      extractedFacts: "Endoscopy: Mild antral erythema & erosion. H. Pylori: Negative. Gastric Motility: Delayed transit.",
      ayurvedicInterpretation: "Correlates with Jatharagni Mandya leading to Kosthagata Ama and Pitta-Vataja Amlapitta."
    }
  },
  {
    id: "TIME-CHEST-02",
    date: "2025-01-15",
    title: "Prescription: Cardiology & Integrative Prescription",
    category: "Prescription",
    condition: "chest_pain",
    conditionName: "Chest Pain (Hrid-Shoola)",
    badgeColor: "teal",
    summary: "Cardioprotective lipid-lowering regimen: Atorvastatin 10mg + Metformin 500mg with Arjuna Ksheerapaka.",
    keyValues: ["Atorvastatin 10mg", "Metformin 500mg", "Arjuna Ksheerapaka"],
    sourceFile: "chest_pain_cardiac_prescription.jpg",
    extractedData: {
      extractedFacts: "Rx: Tab. Atorvastatin 10 mg HS, Tab. Metformin HCl 500 mg BD, Arjuna Ksheerapaka Churna 3g BD.",
      ayurvedicInterpretation: "Hridya Rasayana (Arjuna) strengthening myocardial endurance and clearing vascular Ama."
    }
  },
  {
    id: "TIME-CHEST-01",
    date: "2025-01-14",
    title: "Lab Test: 12-Lead ECG & Cardiovascular Lipid Panel",
    category: "Lab Report",
    condition: "chest_pain",
    conditionName: "Chest Pain (Hrid-Shoola)",
    badgeColor: "emerald",
    summary: "ECG normal sinus rhythm. Serum Triglycerides elevated at 192 mg/dL. Troponin-I normal.",
    keyValues: ["ECG: Normal Sinus", "Triglycerides: 192 mg/dL", "Troponin-I: 0.01"],
    sourceFile: "chest_pain_ecg_lipid_report.pdf",
    extractedData: {
      extractedFacts: "ECG: Normal Sinus Rhythm. Triglycerides: 192 mg/dL (High). HDL: 38 mg/dL (Low). Troponin-I: 0.01 ng/mL (Normal).",
      ayurvedicInterpretation: "Kaphaja-Vataja Hrid-Shoola with Medovaha Srotorodha without acute cardiac necrosis."
    }
  }
];

export const INITIAL_CASE_INTAKE = {
  // PART 1: GENERAL CASE HISTORY
  chiefComplaint: "Recurrent upper abdominal burning discomfort (Amlapitta/Udara Shoola) after meals, accompanied by occasional exertional chest tightness (Hrid-Shoola) and persistent morning lethargy.",
  hpi: "Onset 6 months ago with intermittent epigastric burning after spicy meals, escalating over the past 3 weeks with exertional retro-sternal heaviness. Relieved partially by antacids, aggravated by irregular eating hours, late dinners, and mental stress.",
  duration: "6 Months",
  severity: "Moderate",
  pastHistory: "Mild gastritis documented on endoscopy in Jan 2025; dyslipidemia noted on cardiovascular screen.",
  currentMedications: "Tab. Pantoprazole 40mg; Sukumaram Kashayam; Tab. Atorvastatin 10mg; Arjuna Ksheerapaka.",
  allergies: "No known drug allergies (NKDA). Intolerance to excessive chili and sour foods.",
  familyHistory: "Father had cardiovascular disease (CAD); Mother had hyperacidity and gastritis.",
  personalHistory: "Sedentary software developer, 9-hour desk work, non-smoker, non-alcoholic. Chronic occupational stress and irregular sleep pattern.",
  
  // PART 2: AYUSH / AYURVEDIC HISTORY
  dashavidha: {
    prakriti: "Pitta-Kapha",
    vikriti: "Pitta-Vataja in Kostha (Stomach) with Kapha Srotorodha in Hridya",
    sara: "Madhyama Sara (Moderate tissue excellence)",
    samhanana: "Madhyama Samhanana (Average body build)",
    pramana: "Pramana Yukta (Normal anthropometric proportions)",
    satmya: "Mixed dietary habit; accustomed to wheat, rice, and dairy",
    satva: "Madhyama Satva (Moderate psychological fortitude)",
    aharaShakti: "Madhyama Abhyavaharana, Avara Jarana Shakti (Slow digestion)",
    vyayamaShakti: "Avara Vyayama Shakti (Low physical endurance)",
    vaya: "38 Years (Madhyama Vaya)"
  },
  aharaVihara: {
    agniType: "Vishamagni with Mandagni tendencies (Variable & sluggish digestive fire)",
    koshthaType: "Madhyama Koshtha with occasional hyperacidity and dry stool tendencies",
    dietaryPreference: "Vegetarian with frequent curd, tea, and fried snacks",
    mealTiming: "Irregular; late dinners past 10:00 PM",
    viruddhaAhara: "Cold water with meals, sour curd with fried items",
    waterIntake: "2.5 Liters / day (chilled water habit)",
    nidraPattern: "6 hours per night with light morning awakenings; post-lunch drowsiness (Diva-swapna)",
    vyayamaHabit: "Minimal daily exercise (< 15 mins walking)",
    manasikaBhavas: "Work-related mental stress (Chinta & Krodha)"
  },
  ashtavidha: {
    nadi: "74 bpm, Mandagati, Kapha-Vata dominance with Pitta surge post-meals",
    jihva: "Mild white Ama coating at the posterior third (Sama Jihva)",
    mutra: "Normal frequency (4-5 times/day), pale yellow, clear",
    mala: "Irregular evacuation, tendency towards sluggishness (Asamyak Mala Pravritti)",
    shabda: "Normal, clear acoustic resonance (Prakrita)",
    sparsha: "Warm, slightly clammy palms during mental stress (Ushna-Snigdha)",
    drik: "Normal sclera, mild sub-conjunctival pallor",
    akriti: "Madhyama (Medium build, slight central abdominal adiposity)"
  },
  otherAssessments: "Srotas: Annavaha Srotas (Udara Shoola), Rasavaha & Medovaha Srotas (Hrid-Shoola). Rogamarga: Abhyantara (Internal) and Madhyama. Vyadhi Swabhava: Krichra Sadhya (Manageable with Ahara-Aushadha).",
  foodIntake: {
    breakfast: "Warm tea, idlis with mild sambar, no chilies",
    lunch: "Rice with moong dal, roasted ridge gourd, cumin buttermilk (Takra)",
    eveningSnacks: "Roasted makhana, warm water",
    dinner: "2 Light wheat phulkas with bottle gourd curry before 8:00 PM",
    fluids: "Warm water boiled with dry ginger and cumin throughout the day",
    notes: "Eliminated chilled water, sour curd, and deep-fried items to pacify both stomach acid and arterial lipid congestion."
  }
};

export const INITIAL_AI_SUMMARY = {
  caseId: "CASE-2025-098",
  patientId: "P-98421",
  synthesisOverview: "Dual condition evaluation: Stomach Pain (Udara Shoola & Amlapitta) managed via Deepana-Pachana herbs, alongside Chest Pain (Hrid-Shoola) with lipid elevation stabilized via Arjuna Ksheerapaka and Atorvastatin.",
  lastRefreshedAt: null,
  latestUpdatedDoc: null,
  sources: [
    { name: "Patient Voice Intake", date: "2025-01-12", facility: "Self-Reported" },
    { name: "Max Healthcare Endoscopy Report", date: "2025-01-18", facility: "Max Healthcare" },
    { name: "Fortis Escorts ECG & Lipid Panel", date: "2025-01-14", facility: "Fortis Escorts" }
  ],
  conflicts: [
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
  ],
  stomachSummary: {
    title: "AYURVEDIC CASE SUMMARY",
    chiefComplaint: "Stomach pain (Udara Shoola & Amlapitta)",
    duration: "2 weeks",
    location: "Upper abdomen",
    associatedSymptoms: "Reduced appetite, bloating, sour eructations",
    previousRecords: "Endoscopy shows antral erythema [Source: Max Healthcare, 2025-01-18]",
    previousMedications: "Pantoprazole 40 mg [Source: Max Healthcare]",
    ayurvedicHistory: "Agni-related complaints reported; Koshtha details recorded",
    source: "Patient voice + endoscopy report + prescription",
    confidence: "0.91",
    statusDraft: "Draft — Vaidya verification required",
    // PART 1: GENERAL CASE HISTORY
    generalHistory: {
      chiefComplaint: "Stomach pain (Amlapitta & Udara Shoola)",
      hpi: "Intermittent burning distress in epigastrium aggravated 30-45 mins post-prandial, with sour belching and fullness. Partially responsive to antacids; triggered by stress and irregular spicy meals.",
      duration: "2 weeks acute flare-up (chronic 6 months)",
      location: "Upper abdomen / Epigastric region",
      associatedSymptoms: "Reduced appetite (Aruchi), abdominal bloating (Adhmana), nausea after fatty food",
      pastHistory: "Mild antral gastritis on endoscopy; prior episode of dyspepsia in 2024",
      previousRecords: "Endoscopy shows antral erythema [Source: Max Healthcare, 2025-01-18]",
      currentMedications: "Tab. Pantoprazole 40 mg OD, Sukumaram Kashayam 15 ml BD",
      allergies: "No known drug allergies (NKDA). Sensitive to red chilies & sour citrus",
      familyHistory: "Mother had chronic hyperacidity & gastritis; Father had CAD",
      personalHistory: "Sedentary software professional, irregular meal hours, non-smoker, occasional alcohol"
    },
    // PART 2: AYUSH / AYURVEDIC HISTORY
    ayushHistory: {
      dashavidha: "Prakriti: Pitta-Kapha • Vikriti: Pitta-Vataja in Koshtha • Sara: Madhyama • Samhanana: Madhyama • Satva: Madhyama • Ahara Shakti: Avara Jarana (Slow digestion) • Vaya: 38 Yrs",
      aharaVihara: "Agni: Vishamagni/Mandagni • Koshtha: Madhyama with sluggish evacuation • Habit: Late dinners past 10 PM • Viruddha Ahara: Cold water with food, curd at night • Nidra: 6h disturbed by reflux • Manasika: High work stress (Chinta)",
      otherAssessments: "Ashtavidha: Nadi 72 bpm (Pitta-Vata Gati), Jihva Sama (Coated posterior), Mala Vibandha, Mutra Pita-varna • Srotas: Annavaha & Purishavaha Srotas (Dushti: Amlika, Vidaha, Gaurava)"
    },
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
  },
  chestSummary: {
    title: "AYURVEDIC CASE SUMMARY",
    chiefComplaint: "Chest pain (Hrid-Shoola / Retrosternal tightness)",
    duration: "3 weeks",
    location: "Retro-sternal / Left precordium",
    associatedSymptoms: "Exertional tightness, mild breathlessness, morning heaviness",
    previousRecords: "12-Lead ECG shows normal sinus rhythm; Triglycerides 192 mg/dL [Source: Fortis Escorts, 2025-01-14]",
    previousMedications: "Tab. Atorvastatin 10 mg, Tab. Metformin 500 mg [Source: Fortis Escorts]",
    ayurvedicHistory: "Rasavaha & Medovaha Sroto-rodha reported; Dhatvagni Mandya recorded",
    source: "Patient voice + ECG report + cardiology prescription",
    confidence: "0.94",
    statusDraft: "Draft — Vaidya verification required",
    // PART 1: GENERAL CASE HISTORY
    generalHistory: {
      chiefComplaint: "Chest pain (Exertional tightness & heaviness)",
      hpi: "Constricting retro-sternal discomfort on exertion (walking up stairs, brisk walking) with morning lethargy and mild breathlessness. Relieved by rest.",
      duration: "3 weeks",
      location: "Retro-sternal / Left precordium radiating to upper back",
      associatedSymptoms: "Exertional tightness, mild dyspnea on exertion, morning precordial heaviness",
      pastHistory: "Atherogenic dyslipidemia, elevated fasting blood glucose (138 mg/dL)",
      previousRecords: "12-Lead ECG: Normal Sinus Rhythm; Triglycerides 192 mg/dL, HDL 38 mg/dL [Fortis Escorts, 2025-01-14]",
      currentMedications: "Tab. Atorvastatin 10 mg HS, Tab. Metformin 500 mg BD, Arjuna Ksheerapaka",
      allergies: "No known drug allergies (NKDA)",
      familyHistory: "Strong paternal history of early Coronary Artery Disease (CAD)",
      personalHistory: "Sedentary lifestyle, high workplace stress, prolonged sitting, minimal exercise"
    },
    // PART 2: AYUSH / AYURVEDIC HISTORY
    ayushHistory: {
      dashavidha: "Prakriti: Pitta-Kapha • Vikriti: Kapha-Vataja in Hridya • Sara: Madhyama Meda & Rasa • Samhanana: Madhyama • Satva: Madhyama • Ahara Shakti: Impaired Dhatvagni • Vaya: 38 Yrs",
      aharaVihara: "Agni: Mandagni with Dhatvagni Mandya • Koshtha: Krura tendency • Habit: High dairy & fried snacks • Viruddha Ahara: Cold drinks after fatty meals • Nidra: Daytime naps (Diva-swapna) • Manasika: Deadline stress",
      otherAssessments: "Ashtavidha: Nadi 76 bpm (Mandagati, Kapha dominance), Jihva Alpa-lipta, Sparsha Ushna-Snigdha • Srotas: Rasavaha, Medovaha & Manovaha Srotas (Dushti: Hridrava, Gaurava, Srotorodha)"
    },
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
  },
  rogaNidana: {
    vyadhi: "Udara Shoola & Hrid-Shoola (Amlapitta & Medo-Dhatu Vikriti)",
    dosha: "Pitta-Vata in Annavaha; Kapha-Vata in Rasavaha Srotas",
    dushya: "Rasa, Meda, and Mamsa Dhatus",
    agni: "Vishamagni with Tendencies to Mandagni",
    ama: "Kosthagata Ama present; Sroto-rodha in Rasavaha",
    srotas: "Annavaha, Purishavaha, and Medovaha Srotas",
    sadhyasadhyata: "Krichra Sadhya (Manageable with Ahara-Aushadha)"
  },
  chikitsaSutra: "Deepana-Pachana for Agni restoration, Pitta-Shamana with Vatanulomana for gastric burning, and Medohara-Hridya Rasayana for vascular clearance.",
  generatedAt: "Today, 10:45 AM",
  foodIntakeAnalysis: {
    loggedMealsSummary: "Patient Logged: Breakfast (Warm tea, idlis), Lunch (Rice, moong dal, takra), Snacks (Makhana), Dinner (2 Phulkas with bottle gourd before 8 PM)",
    primaryTriggers: [
      "Previous diet included sour curd & fried snacks triggering Amla-Pitta and lipid congestion.",
      "Cold water intake during digestion reduced Jatharagni strength."
    ],
    doshaImpact: "Pitta-Vata aggravation in Annavaha Srotas combined with Kapha-Medo Srotorodha in Hridya.",
    dietaryActionPlan: "Continue current light dinner before 8:00 PM. Sip warm ginger-cumin water throughout the day."
  },
  prescribedFormulations: [
    {
      id: "HERB-01",
      name: "Sukumaram Kashayam",
      ingredients: "Punarnava, Bilva, Eranda, Ashwagandha",
      dose: "15 ml with 45 ml lukewarm water",
      frequency: "Twice daily (BD)",
      timing: "Empty stomach (Pratah / Sandhya)",
      anupana: "Lukewarm water with cumin",
      rationale: "Vatanulomana & Deepana; relieves epigastric burning, pacifies gastric inflammation and restores motility."
    },
    {
      id: "HERB-02",
      name: "Avipattikar Churna",
      ingredients: "Trikatu, Triphala, Musta, Vidanga, Ela, Patra, Lavanga, Trivrit, Sharkara",
      dose: "3 - 5 grams",
      frequency: "Once or twice daily",
      timing: "Post meals or before sleep",
      anupana: "Lukewarm water or coconut water",
      rationale: "Classical Pitta-Shamana & Virechana formulation; neutralizes excess Amla-Guna in gastric mucosa."
    },
    {
      id: "HERB-03",
      name: "Arjuna Ksheerapaka",
      ingredients: "Terminalia arjuna bark decoction in cow milk",
      dose: "50 ml",
      frequency: "Once daily (Morning)",
      timing: "Morning after light breakfast",
      anupana: "Warm milk vehicle",
      rationale: "Hridya & Medohara; cardioprotective, strengthens myocardium, and addresses vascular lipid deposits."
    },
    {
      id: "HERB-04",
      name: "Nisha-Amalaki Churna",
      ingredients: "Haridra (Curcuma longa) + Amalaki (Emblica officinalis)",
      dose: "3 grams",
      frequency: "Twice daily (BD)",
      timing: "Before meals",
      anupana: "Warm water or honey",
      rationale: "Pramehahara; stabilizes glycemic index and mitigates micro-vascular metabolic endotoxins."
    }
  ],
  pathyaApathya: {
    pathyaAhara: [
      "Old rice (Shashtika Shali), roasted barley (Yava), and green gram (Mudga) broth",
      "Pomegranate (Dadima), tender bottle gourd, ridge gourd, and bitter gourd",
      "Lukewarm water boiled with cumin and dry ginger (Ushnodaka)",
      "Fresh buttermilk (Takra) churned with roasted jeera and rock salt"
    ],
    pathyaVihara: [
      "Light walking 20 minutes post meals (Shatapadi)",
      "Dinner before 8:00 PM; minimum 2 hours interval before sleep",
      "Practice Pranayama (Anulom-Vilom, Sheetali) to pacify stress & Pitta",
      "Consistent sleep schedule; avoid daytime sleep (Diva-swapna)"
    ],
    apathyaAhara: [
      "Sour curd (Dadhi), fermented items, vinegar, and heavy cheese",
      "Deep-fried, oily, and excessively spicy foods (Vidahi Ahara)",
      "Chilled water and carbonated sugary beverages with meals",
      "Bakery items, refined flour (Maida), and late-night snacking"
    ],
    apathyaVihara: [
      "Day sleep immediately following meals (Ahara-uttara Diva-swapna)",
      "Suppression of natural urges like hunger and flatulence (Vega-dharana)",
      "Excessive mental strain, anxiety, and anger (Krodha / Chinta)",
      "Strenuous exertion immediately after lunch"
    ]
  }
};
