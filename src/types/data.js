// Sample Data Store for AyurVaidya AI Prototype

export const INITIAL_PATIENT = {
  id: "P-98421",
  name: "Aarav Sharma",
  age: 38,
  gender: "Male",
  phone: "+91 98765 43210",
  email: "aarav.sharma@example.com",
  abhaId: "91-2345-6789-1234",
  abhaAddress: "aarav.sharma@abdm",
  isAbhaLinked: true,
  bloodGroup: "B+",
  emergencyContact: "Sunita Sharma (Spouse) - +91 98765 43211",
  prakriti: "Pitta-Kapha",
  vikriti: "Kapha-Vataja (Ama-yukta)",
  bmi: "26.4 (Overweight)",
  vitals: {
    bp: "132/84 mmHg",
    pulse: "76 bpm",
    weight: "78 kg",
    height: "172 cm",
    bloodSugarFasting: "142 mg/dL",
    lastRecorded: "2 days ago"
  }
};

export const INITIAL_VAIDYA = {
  id: "DOC-AYU-108",
  name: "Dr. Priyadarshini Joshi",
  qualification: "BAMS, MD (Ayurveda - Kayachikitsa)",
  regNumber: "AYU-MH-2018-0924",
  hospital: "National Institute of Ayurveda & AyurVaidya AI Research Wing",
  experience: "14 Years",
  avatar: "https://images.unsplash.com/photo-1594824813689-ff371b2d076a?w=150&auto=format&fit=crop&q=80"
};

export const SAMPLE_OLD_RECORDS = [
  {
    id: "REC-2025-01",
    title: "Comprehensive Metabolic & HbA1c Lab Report",
    institution: "Apollo Diagnostics Centre, Pune",
    date: "2025-01-14",
    type: "Lab Report",
    fileName: "apollo_biochemistry_panel_jan2025.pdf",
    fileSize: "1.8 MB",
    confidence: 98.4,
    status: "Processed by AI",
    extractedData: {
      biomarkers: [
        { name: "HbA1c (Glycated Hemoglobin)", value: "7.8%", range: "< 5.7%", status: "High" },
        { name: "Fasting Blood Glucose", value: "142 mg/dL", range: "70 - 99 mg/dL", status: "High" },
        { name: "Postprandial Blood Glucose", value: "198 mg/dL", range: "< 140 mg/dL", status: "High" },
        { name: "Total Cholesterol", value: "228 mg/dL", range: "< 200 mg/dL", status: "Borderline High" },
        { name: "Serum Triglycerides", value: "195 mg/dL", range: "< 150 mg/dL", status: "High" },
        { name: "SGPT / ALT", value: "48 U/L", range: "< 45 U/L", status: "Mildly Elevated" },
        { name: "Serum Creatinine", value: "0.95 mg/dL", range: "0.7 - 1.2 mg/dL", status: "Normal" }
      ],
      clinicalImpression: "Uncontrolled Type 2 Diabetes Mellitus with Dyslipidemia and early hepatic steatosis signs.",
      ayurvedicCorrelation: "Kaphaja Prameha lakshanas with Medovaha Srotodushti and Dhatvagni Mandya."
    }
  },
  {
    id: "REC-2024-08",
    title: "Consultation & Allopathic Prescription",
    institution: "Fortis Superspeciality Hospital",
    doctor: "Dr. R. K. Mehta, MD (Endocrinology)",
    date: "2024-08-22",
    type: "Prescription",
    fileName: "fortis_endo_prescription_aug2024.jpg",
    fileSize: "840 KB",
    confidence: 96.8,
    status: "Processed by AI",
    extractedData: {
      medications: [
        { name: "Tab. Metformin HCl", dose: "500 mg", frequency: "Twice daily (after meals)", duration: "Ongoing" },
        { name: "Tab. Atorvastatin", dose: "10 mg", frequency: "Once daily at bedtime", duration: "Ongoing" }
      ],
      clinicalImpression: "T2DM initiation therapy; patient advised weight loss and carbohydrate restriction.",
      ayurvedicCorrelation: "Contemporary glucose lowering therapy without addressing deep-rooted Ama / Agnimandya."
    }
  },
  {
    id: "REC-2024-03",
    title: "Ayurvedic Preliminary Consultation Record",
    institution: "Kerala Ayurvedic Arogya Kendra",
    doctor: "Vaidya Suresh Namboodiri, BAMS",
    date: "2024-03-10",
    type: "Consultation",
    fileName: "ayur_consult_mar2024.pdf",
    fileSize: "1.2 MB",
    confidence: 94.2,
    status: "Processed by AI",
    extractedData: {
      herbalAdvised: [
        { name: "Musta-Khadira Kashayam", dose: "15 ml with 45 ml lukewarm water", frequency: "Morning & Night empty stomach" },
        { name: "Trikatu Churna", dose: "2 grams with honey", frequency: "Before food for Deepana-Pachana" }
      ],
      clinicalImpression: "Patient had reported heaviness in abdomen, sour eructations, and general lassitude.",
      ayurvedicCorrelation: "Agnimandya and Kostha Gata Ama documented."
    }
  }
];

export const INITIAL_TIMELINE = [
  {
    id: "TIME-01",
    date: "2025-01-14",
    title: "Lab Test: Apollo Diagnostics Biochemistry Panel",
    category: "Lab Report",
    badgeColor: "emerald",
    summary: "HbA1c reported at 7.8% (Elevated), Fasting Sugar 142 mg/dL. Dyslipidemia detected.",
    keyValues: ["HbA1c: 7.8%", "FBS: 142 mg/dL", "Cholesterol: 228 mg/dL"],
    sourceFile: "apollo_biochemistry_panel_jan2025.pdf"
  },
  {
    id: "TIME-02",
    date: "2024-11-05",
    title: "Clinical Follow-up & Vitals Check",
    category: "Vitals",
    badgeColor: "blue",
    summary: "Weight 78kg (BMI 26.4). Blood pressure 132/84 mmHg. Patient reported persistent postprandial lethargy.",
    keyValues: ["BMI: 26.4", "BP: 132/84", "Pulse: 76 bpm"],
    sourceFile: null
  },
  {
    id: "TIME-03",
    date: "2024-08-22",
    title: "Endocrinologist Prescription: Fortis Hospital",
    category: "Prescription",
    badgeColor: "amber",
    summary: "Metformin 500mg BD & Atorvastatin 10mg started. Advised strict dietary restrictions.",
    keyValues: ["Metformin 500mg", "Atorvastatin 10mg"],
    sourceFile: "fortis_endo_prescription_aug2024.jpg"
  },
  {
    id: "TIME-04",
    date: "2024-03-10",
    title: "Ayurvedic Deepana-Pachana Therapy Cycle",
    category: "Ayurvedic Consultation",
    badgeColor: "teal",
    summary: "Trikatu Churna + Musta Khadira Kashayam for 21 days. Mild reduction in bloating noted.",
    keyValues: ["Trikatu 2g BD", "Musta Kashayam"],
    sourceFile: "ayur_consult_mar2024.pdf"
  },
  {
    id: "TIME-05",
    date: "2023-11-18",
    title: "Baseline Health Checkup & Executive Profile",
    category: "Lab Report",
    badgeColor: "emerald",
    summary: "Fasting Blood Sugar was borderline at 112 mg/dL, HbA1c was 6.2% (Pre-diabetic phase).",
    keyValues: ["HbA1c: 6.2%", "FBS: 112 mg/dL"],
    sourceFile: "baseline_health_check_2023.pdf"
  }
];

export const INITIAL_CASE_INTAKE = {
  chiefComplaint: "Excessive thirst (Pipasa), frequent urination at night (Prabhuta Mutrata), persistent fatigue, post-meal drowsiness (Alasya), and chronic sluggish digestion with morning bloating.",
  hpi: "Patient has been experiencing progressive tiredness, afternoon brain fog, and sweet taste in mouth for the past 9 months. Symptoms aggravate after heavy wheat or dairy dinners and sedentary desk work.",
  duration: "9 Months",
  severity: "Moderate to Severe",
  pastHistory: "Diagnosed with Pre-diabetes in Nov 2023, converted to T2DM in Aug 2024. No prior major surgeries. Mild fatty liver grade-1 on ultrasound in 2023.",
  currentMedications: "Tab. Metformin 500mg twice daily after food; Tab. Atorvastatin 10mg at bedtime; occasional antacids (Gelusil).",
  allergies: "Known allergy to Sulfa drugs (causes cutaneous urticarial rashes). No documented food allergies.",
  familyHistory: "Father had Type 2 Diabetes and Hypertension; Mother has Osteoarthritis (Sandhigata Vata).",
  
  // Dashavidha Pariksha (10-fold examination)
  dashavidha: {
    prakriti: "Pitta-Kapha (Dominant Pitta with subsidiary Kapha)",
    vikriti: "Kapha-Vataja with severe Ama lakshanas and Medovaha Srotodushti",
    sara: "Madhyama Sara (Medium excellence of Dhatus; Medas & Rasa are lax/impaired)",
    samhanana: "Madhyama Samhanana (Moderate muscular and skeletal compactness)",
    pramana: "Pramana Yukta (Anthropometrics within normal limits, abdominal adiposity evident)",
    satmya: "Shadrasa Satmya (accustomed to all tastes, but excessive sweet & fried intake)",
    satva: "Madhyama Satva (Moderate mental fortitude, stress induces carbohydrate cravings)",
    aharaShakti: "Abhyavaharana Shakti: Madhyama | Jarana Shakti: Avara (Digestive power is impaired)",
    vyayamaShakti: "Avara Vyayama Shakti (Low physical endurance; breathless on climbing 2 flights of stairs)",
    vaya: "Madhyama Vaya (38 years, Pitta prominent chronological epoch)"
  },

  // Ahara-Vihara (Diet & Lifestyle Assessment)
  aharaVihara: {
    agniType: "Vishamagni & Mandagni (Variable appetite with delayed gastric emptying and heaviness)",
    koshthaType: "Krura Koshtha (Dry, sluggish evacuation tendency; requires warm fluids for clear stool)",
    dietaryPreference: "Vegetarian with frequent high-glycemic dairy, bakery wheat products, and deep-fried snacks",
    mealTiming: "Irregular; skips breakfast often, heavy dinner around 10:30 PM",
    viruddhaAhara: "Habitual intake of milk with salty savoury snacks, and chilled water immediately after meals",
    waterIntake: "2.5 Liters / day (prefers refrigerated cold water)",
    nidraPattern: "Disturbed sleep (6 hours); awakens 2-3 times for nocturia; habitual Divasvapna (afternoon nap 45 mins)",
    vyayamaHabit: "Sedentary desk job (8-10 hours sitting); minimal regular walking or exercise",
    manasikaBhavas: "High corporate occupational stress (Chinta), occasional irritability (Krodha)"
  },

  // Dedicated Food Intake Log (Daily Ahara Entry)
  foodIntake: {
    breakfast: "Tea with whole milk, 2 sweet biscuits, poha with fried groundnuts",
    lunch: "Polished white rice, thick arhar dal, curd (dahi), fried potato sabzi",
    eveningSnacks: "Deep-fried samosa or pakoras with sweet chutney, masala chai",
    dinner: "3 wheat rotis, paneer butter masala, late-night sweetened warm milk (10:30 PM)",
    fluids: "Refrigerated chilled water after meals, 2 cups sugary milk tea",
    notes: "Habitual curd and heavy dairy late in the evening with chilled water immediately after hot food."
  },

  // Ashtavidha Pariksha (8-fold examination)
  ashtavidha: {
    nadi: "Manda, Snigdha, Vata-Kapha Gati (Manduka-Sarpa Gati mixture)",
    jihva: "Sama Jihva (Thick white slimy coating over posterior dorsum indicating Ama)",
    mutra: "Prabhuta & Avila (Copious, cloudy, increased frequency especially nocturnal)",
    mala: "Vibandha tendency, Visram, Sashula (Constipated, sticky, offensive odour)",
    shabda: "Spashta (Clear voice, no hoarseness)",
    sparsha: "Samashitoshna with mild dryness over extremities",
    drik: "Prakrita (Normal vision, mild dark circles / periorbital puffiness)",
    akriti: "Madhyama with central abdominal circumference 94 cm"
  }
};

export const INITIAL_AI_SUMMARY = {
  caseId: "CASE-2025-098",
  patientId: "P-98421",
  generatedAt: "2025-01-16 11:30 AM",
  verifiedByDoctor: false,
  doctorNotes: "",
  
  synthesisOverview: "Integrated synthesis of allopathic laboratory biomarkers (HbA1c 7.8%, FBS 142 mg/dL) with classical Ayurvedic Dashavidha Pariksha and Ahara-Vihara parameters demonstrates classic Kaphaja Prameha (Ayurvedic Diabetes spectrum) rooted in Dhatvagni Mandya, Medovaha Srotodushti, and Bahu-Drava-Kapha vitiation.",

  foodIntakeAnalysis: {
    loggedMealsSummary: "High-glycemic vegetarian meals with heavy dairy (curd/milk), deep-fried snacks, and post-meal chilled water",
    primaryTriggers: [
      "Dadhi (Curd) & Late-Night Sweet Milk: Heavily vitiates Kapha and blocks micro-channels (Abhishyandi)",
      "Snigdha & Guru Foods (Fried Samosa/Pakoras): Overburdens sluggish digestive fire (Mandagni), producing metabolic endotoxins (Ama)",
      "Sheeta Jala (Chilled Water): Instantly extinguishes Jatharagni, halting gastric breakdown",
      "Viruddha Sanyoga: Frequent combination of milk with salty/spicy snacks"
    ],
    doshaImpact: "Directly fuels Kaphaja Prameha and causes Srotorodha (cellular receptor obstruction / insulin resistance) in Medovaha Srotas.",
    dietaryActionPlan: "Immediate cessation of curd at dinner, fried foods, and chilled fluids. Transition to Ushnodaka (warm spiced water) and Yava (barley-based diet)."
  },

  rogaNidana: {
    vyadhi: "Kaphaja Prameha (Sannipatika Anubandhi with Pitta-Kapha)",
    dosha: "Kapha Pradhana (Pitta anubandha, Vata vitiation secondary to Avarana)",
    dushya: "Meda (Adipose), Kleda (Excess body fluid), Rasa, Mamsa",
    agni: "Dhatvagni Mandya with Kosthagni Vishamata",
    ama: "Sama Avastha (Presence of systemic endotoxins / metabolic residue)",
    srotas: "Medovaha Srotas, Mutravaha Srotas, Rasavaha Srotas",
    sadhyasadhyata: "Krichhra-Sadhya (Manageable with disciplined Shodhana/Shamana and strict Pathya)"
  },

  chikitsaSutra: "Primary objective: Deepana (Kindling digestive fire), Pachana (Digesting Ama endotoxins), Srotoshodhana (Clearing micro-channels), and Kleda-Medo Harana (Elimination of morbid fluid and lipid accumulation). Avoid immediate heavy Rasayanas until Ama is resolved.",

  prescribedFormulations: [
    {
      id: "MED-01",
      name: "Nisha-Amalaki Churna",
      ingredients: "Curcuma longa (Haridra) + Emblica officinalis (Amalaki) in equal parts",
      dose: "3 grams (1/2 tsp)",
      frequency: "Twice daily",
      timing: "Empty stomach in morning & 30 mins before dinner",
      anupana: "Lukewarm water or decoction of Lodhra",
      rationale: "Gold standard classical combination in Charaka Samhita for Prameha hara, insulin sensitivity enhancement, and antioxidant cellular defense."
    },
    {
      id: "MED-02",
      name: "Chandraprabha Vati",
      ingredients: "Purified Shilajit, Guggulu, Musta, Triphala, Vidanga, etc.",
      dose: "2 tablets (500mg each)",
      frequency: "Twice daily",
      timing: "After meals with warm water",
      anupana: "Warm water",
      rationale: "Removes Mutrakrichhra and Prabhuta Mutrata, balances urinary tract tonicity, and regulates renal microcirculation."
    },
    {
      id: "MED-03",
      name: "Guduchi + Musta Kwath",
      ingredients: "Tinospora cordifolia + Cyperus rotundus coarse decoction",
      dose: "40 ml fresh decoction",
      frequency: "Once daily in early morning",
      timing: "Empty stomach",
      anupana: "Sip warm",
      rationale: "Potent Jvarahara, Amapachana, and Medohara properties; addresses liver metabolic dysfunction reflected in mild ALT elevation."
    },
    {
      id: "MED-04",
      name: "Triphala Churna with Gomutra Haritaki",
      ingredients: "Haritaki, Bibhitaki, Amalaki processed",
      dose: "3 grams at bedtime",
      frequency: "Nightly before sleep",
      timing: "Bedtime",
      anupana: "Warm water",
      rationale: "Resolves Krura Koshtha, induces mild daily Anulomana without habit-forming laxative damage, and scraps excess Medas."
    }
  ],

  pathyaApathya: {
    pathyaAhara: [
      "Yava (Barley water, barley porridge, roasted barley flour/Sattu)",
      "Shyamaka, Kodrava, Old Shali rice (avoid newly harvested white rice)",
      "Mudga (Green gram / Moong dal soup seasoned with cumin and ginger)",
      "Bitter and astringent vegetables: Karavellaka (Bitter gourd), Patola (Pointed gourd), Methi leaves, Shigru (Moringa)",
      "Warm water (Ushnodaka) boiled with dry ginger and coriander seeds"
    ],
    apathyaAhara: [
      "Strict avoidance of Dadhi (Yogurt/Curd), heavy pasteurized cow milk at night",
      "Refined flours (Maida), bakery items, sweetened pastries, deep-fried snacks",
      "Viruddha Ahara: Milk with salt, fish, or sour fruits",
      "Chilled refrigerated water, carbonated soft drinks, fruit juices with added sugar",
      "Excessive sweet, sour, and unctuous (Snigdha/oily) meals"
    ],
    pathyaVihara: [
      "Pratah-Bhramana: Brisk walking for 45 minutes at sunrise",
      "Yoga Asanas: Surya Namaskar (6 cycles), Dhanurasana, Ardha Matsyendrasana, Paschimottanasana",
      "Pranayama: Kapalbhati (300 strokes) and Anulom Vilom (15 mins daily)",
      "Udvartana: Dry herbal powder scrub using Triphala/Kulattha powder before warm bath"
    ],
    apathyaVihara: [
      "Strict ban on Divasvapna (Day sleeping / afternoon naps immediately after lunch)",
      "Asya Sukham (Prolonged sedentary lounging / continuous sitting > 2 hours without stretch)",
      "Vega Dharana (Suppression of natural urges especially urine and defecation)",
      "Late night sleeping beyond 10:30 PM (Ratri Jagarana)"
    ]
  },

  recommendedPanchakarma: "Advised 7-day Vamana or Udvartana protocol once Ama nirama avastha is achieved in 3 weeks of preliminary Shamana therapy."
};
