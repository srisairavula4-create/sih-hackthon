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
    sourceFile: "stomach_pain_prescription.jpg"
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
    sourceFile: "stomach_usg_endoscopy_report.pdf"
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
    sourceFile: "chest_pain_cardiac_prescription.jpg"
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
    sourceFile: "chest_pain_ecg_lipid_report.pdf"
  }
];

export const INITIAL_CASE_INTAKE = {
  chiefComplaint: "Recurrent upper abdominal burning discomfort (Amlapitta/Udara Shoola) after meals, accompanied by occasional exertional chest tightness (Hrid-Shoola) and persistent morning lethargy.",
  duration: "6 Months",
  severity: "Moderate",
  pastHistory: "Mild gastritis documented on endoscopy in Jan 2025; dyslipidemia noted on cardiovascular screen.",
  currentMedications: "Tab. Pantoprazole 40mg; Sukumaram Kashayam; Tab. Atorvastatin 10mg; Arjuna Ksheerapaka.",
  allergies: "No known drug allergies.",
  familyHistory: "Father had cardiovascular disease; Mother had hyperacidity and gastritis.",
  dashavidha: {
    prakriti: "Pitta-Kapha",
    vikriti: "Pitta-Vataja in Kostha (Stomach) with Kapha Srotorodha in Hridya",
    sara: "Madhyama Sara",
    samhanana: "Madhyama Samhanana",
    pramana: "Pramana Yukta",
    satmya: "Mixed dietary habit",
    satva: "Madhyama Satva",
    aharaShakti: "Madhyama Abhyavaharana, Avara Jarana Shakti",
    vyayamaShakti: "Avara Vyayama Shakti",
    vaya: "38 Years"
  },
  aharaVihara: {
    agniType: "Vishamagni with Mandagni tendencies",
    koshthaType: "Madhyama Koshtha with occasional hyperacidity",
    dietaryPreference: "Vegetarian with frequent curd, tea, and fried snacks",
    mealTiming: "Irregular; late dinners past 10:00 PM",
    viruddhaAhara: "Cold water with meals, sour curd with fried items",
    waterIntake: "2.5 Liters / day",
    nidraPattern: "6 hours per night with light morning awakenings",
    vyayamaHabit: "Minimal daily exercise",
    manasikaBhavas: "Work-related mental stress (Chinta)"
  },
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
  conditions: {
    stomachPain: {
      name: "Stomach Pain (Udara Shoola & Amlapitta)",
      dosha: "Pitta-Vataja in Annavaha Srotas",
      rootCause: "Jatharagni Mandya leading to gastric mucosal irritation and delayed motility.",
      synthesis: "Upper GI Endoscopy showed mild antral erythema without ulceration. Prescription of Pantoprazole + Sukumaram Kashayam + Avipattikar Churna provides effective mucosal shielding and restores Agni.",
      dietaryAction: "Strictly avoid curd at night and spicy fried snacks. Drink cumin-spiced Takra after lunch."
    },
    chestPain: {
      name: "Chest Pain (Hrid-Shoola & Dyslipidemia)",
      dosha: "Kaphaja-Vataja in Rasavaha & Medovaha Srotas",
      rootCause: "Elevated Triglycerides (192 mg/dL) causing micro-channel congestion (Srotorodha). 12-lead ECG is normal.",
      synthesis: "Cardiovascular evaluation confirms stable cardiac rhythm with non-infarctive exertional tightness. Atorvastatin combined with cardioprotective Arjuna Ksheerapaka strengthens myocardial endurance without drug-herb contraindications.",
      dietaryAction: "Eliminate saturated dairy fats and bakery sugars. 30 minutes daily brisk morning walk."
    }
  }
};
