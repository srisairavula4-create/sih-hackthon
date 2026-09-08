import { AyurvedicCaseSummaryCard } from '../components/AyurvedicCaseSummaryCard';
import React, { useState } from 'react';
import { 
  Clock, 
  Filter, 
  FileText, 
  Activity, 
  Pill, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  LineChart, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const TimelineView = ({ 
  patient, 
  timeline = [], 
  oldRecords = [], 
  onNavigateToUpload 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Records');
  const [selectedMetric, setSelectedMetric] = useState('triglycerides');

  const [expandedItems, setExpandedItems] = useState(() => {
    const initial = {};
    timeline.forEach((item, idx) => {
      if (item.isNew || idx === 0) {
        initial[item.id] = true;
      }
    });
    return initial;
  });

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    'All Records', 
    '🩺 Stomach Pain', 
    '❤️ Chest Pain', 
    'Lab Reports', 
    'Prescriptions'
  ];

  const filteredTimeline = selectedCategory === 'All Records'
    ? timeline
    : timeline.filter(item => {
        if (selectedCategory === '🩺 Stomach Pain') {
          return item.condition === 'stomach_pain' || item.title.toLowerCase().includes('stomach') || item.title.toLowerCase().includes('endoscopy') || item.title.toLowerCase().includes('gastro');
        }
        if (selectedCategory === '❤️ Chest Pain') {
          return item.condition === 'chest_pain' || item.title.toLowerCase().includes('chest') || item.title.toLowerCase().includes('ecg') || item.title.toLowerCase().includes('cardio') || item.title.toLowerCase().includes('lipid');
        }
        if (selectedCategory === 'Lab Reports') {
          return item.category === 'Lab Report';
        }
        if (selectedCategory === 'Prescriptions') {
          return item.category === 'Prescription';
        }
        return true;
      });

  // Dual Condition Separation for Side-by-Side AI Summary
  const stomachEvents = timeline.filter(t => 
    t.condition === 'stomach_pain' || 
    t.title.toLowerCase().includes('stomach') || 
    t.title.toLowerCase().includes('endoscopy') ||
    t.title.toLowerCase().includes('gastro')
  );

  const chestEvents = timeline.filter(t => 
    t.condition === 'chest_pain' || 
    t.title.toLowerCase().includes('chest') || 
    t.title.toLowerCase().includes('ecg') ||
    t.title.toLowerCase().includes('cardio') ||
    t.title.toLowerCase().includes('lipid')
  );

  // Graph Data
  const graphConfigs = {
    triglycerides: {
      name: "Serum Triglycerides (Chest Pain / Lipid Track)",
      unit: "mg/dL",
      targetText: "Normal: < 150 mg/dL",
      normalThreshold: 150,
      points: [
        { date: "Aug 2024", value: 215, label: "Peak Congestion" },
        { date: "Nov 2024", value: 202, label: "Dietary Intervention" },
        { date: "Jan 2025", value: 192, label: "Latest Verified" }
      ],
      insight: "Triglycerides dropped from 215 to 192 mg/dL with Atorvastatin & Arjuna Ksheerapaka, reducing Medo-Dhatu Srotorodha."
    },
    glucose: {
      name: "Fasting Blood Glucose",
      unit: "mg/dL",
      targetText: "Normal: 70 - 99 mg/dL",
      normalThreshold: 100,
      points: [
        { date: "Aug 2024", value: 156, label: "Elevated" },
        { date: "Nov 2024", value: 144, label: "Improving" },
        { date: "Jan 2025", value: 138, label: "Latest Verified" }
      ],
      insight: "Fasting blood sugar shows progressive stabilization under Metformin and elimination of late-night meals."
    },
    gastric: {
      name: "Gastric Motility & Acid Discomfort Index",
      unit: "/10",
      targetText: "Optimal Comfort: < 3/10",
      normalThreshold: 3,
      points: [
        { date: "Nov 2024", value: 8.5, label: "Severe Amlapitta" },
        { date: "Dec 2024", value: 6.0, label: "Sukumaram Initiated" },
        { date: "Jan 2025", value: 3.2, label: "Marked Acid Relief" }
      ],
      insight: "Gastric discomfort reduced from 8.5 to 3.2 following Pantoprazole and Avipattikar Churna with warm cumin buttermilk."
    }
  };

  const activeGraph = graphConfigs[selectedMetric] || graphConfigs.triglycerides;

  const minVal = Math.min(...activeGraph.points.map(p => p.value)) * 0.85;
  const maxVal = Math.max(...activeGraph.points.map(p => p.value)) * 1.15;
  const range = maxVal - minVal || 1;

  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 50;
  const paddingY = 35;

  const getX = (idx, total) => paddingX + (idx / (total - 1)) * (svgWidth - paddingX * 2);
  const getY = (val) => svgHeight - paddingY - ((val - minVal) / range) * (svgHeight - paddingY * 2);

  const polylinePoints = activeGraph.points
    .map((p, i) => `${getX(i, activeGraph.points.length)},${getY(p.value)}`)
    .join(' ');

  const areaPoints = `${getX(0, activeGraph.points.length)},${svgHeight - paddingY} ${polylinePoints} ${getX(activeGraph.points.length - 1, activeGraph.points.length)},${svgHeight - paddingY}`;

  const normalY = getY(activeGraph.normalThreshold);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <Clock className="w-4 h-4" />
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight font-outfit">
                Interactive Medical History Timeline & Condition Trends
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Chronological records mapped by condition: Stomach Pain (Udara Shoola) and Chest Pain (Hrid-Shoola).
            </p>
          </div>

          <button
            onClick={onNavigateToUpload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors self-start sm:self-auto cursor-pointer"
          >
            + Upload New Document via OCR
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Filter Stream:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 1. DUAL CONDITION AYURVEDIC CASE SUMMARIES WITH VAIDYA DECISIONS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Condition-Wise Ayurvedic Case Summaries & Vaidya Decisions
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">
            Stomach Pain (Left) • Chest Pain (Right)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AyurvedicCaseSummaryCard conditionType="stomach_pain" />
          <AyurvedicCaseSummaryCard conditionType="chest_pain" />
        </div>
      </div>

      {/* 2. INTERACTIVE BIOMARKER GRAPH */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="p-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                <LineChart className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Condition Biomarker Trajectory Graph
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Visual multi-value trend chart representing clinical values over time
            </p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1">
            <button
              onClick={() => setSelectedMetric('triglycerides')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedMetric === 'triglycerides' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Triglycerides (Chest)
            </button>
            <button
              onClick={() => setSelectedMetric('glucose')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedMetric === 'glucose' ? 'bg-white text-teal-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fasting Sugar
            </button>
            <button
              onClick={() => setSelectedMetric('gastric')}
              className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedMetric === 'gastric' ? 'bg-white text-amber-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Acid Motility (Stomach)
            </button>
          </div>
        </div>

        {/* SVG Canvas */}
        <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
              {activeGraph.name}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {activeGraph.targetText}
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48 select-none">
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#e2e8f0" strokeDasharray="3 3" />
              <line x1={paddingX} y1={(paddingY + svgHeight - paddingY) / 2} x2={svgWidth - paddingX} y2={(paddingY + svgHeight - paddingY) / 2} stroke="#e2e8f0" strokeDasharray="3 3" />
              <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#cbd5e1" />

              {normalY >= paddingY && normalY <= svgHeight - paddingY && (
                <g>
                  <line x1={paddingX} y1={normalY} x2={svgWidth - paddingX} y2={normalY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x={svgWidth - paddingX - 5} y={normalY - 4} textAnchor="end" fontSize="10" fill="#059669" fontWeight="bold">
                    Target {activeGraph.normalThreshold} {activeGraph.unit}
                  </text>
                </g>
              )}

              <polygon points={areaPoints} fill="url(#trendGradient)" />

              <polyline
                fill="none"
                stroke="#0d9488"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylinePoints}
              />

              {activeGraph.points.map((pt, idx) => {
                const cx = getX(idx, activeGraph.points.length);
                const cy = getY(pt.value);
                const isLatest = idx === activeGraph.points.length - 1;

                return (
                  <g key={idx}>
                    <circle cx={cx} cy={cy} r={isLatest ? "6.5" : "5"} fill={isLatest ? "#059669" : "#0d9488"} stroke="#ffffff" strokeWidth="2.5" />
                    <text x={cx} y={cy - 10} textAnchor="middle" fontSize="11" fontWeight="bold" fill={isLatest ? "#047857" : "#0f766e"} fontFamily="monospace">
                      {pt.value} {activeGraph.unit}
                    </text>
                    <text x={cx} y={svgHeight - paddingY + 16} textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">
                      {pt.date}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-teal-50/50 border border-teal-200/80 text-xs text-slate-700 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-teal-900">AI Trajectory Insight:</p>
              <p className="text-slate-600 mt-0.5">{activeGraph.insight}</p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. CHRONOLOGICAL STREAM */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-600" />
            Chronological Events Stream ({filteredTimeline.length})
          </h3>
          <span className="text-xs text-slate-400">ABDM Stamped Records</span>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-200 space-y-6 ml-4 sm:ml-6">
          {filteredTimeline.map((item) => {
            const isExpanded = expandedItems[item.id];
            const isStomach = item.condition === 'stomach_pain' || item.title.toLowerCase().includes('stomach') || item.title.toLowerCase().includes('endoscopy') || item.title.toLowerCase().includes('gastro');

            return (
              <div key={item.id} className="relative group">
                
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-4 shadow-2xs flex items-center justify-center transition-transform ${
                  isStomach ? 'border-amber-500' : 'border-teal-500'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isStomach ? 'bg-amber-600' : 'bg-teal-600'}`}></span>
                </div>

                <div className={`bg-white rounded-3xl border p-5 shadow-xs transition-all ${
                  item.isNew 
                    ? 'border-emerald-400 ring-2 ring-emerald-200/60 bg-emerald-50/10' 
                    : 'border-slate-200/90 hover:border-emerald-300'
                }`}>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {item.date}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        isStomach ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-teal-50 text-teal-900 border border-teal-200'
                      }`}>
                        {isStomach ? '🩺 Stomach Pain' : '❤️ Chest Pain'}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {item.category}
                      </span>
                      {item.isNew && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-2xs flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          ★ Newly Uploaded
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 self-end sm:self-auto transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.summary}
                  </p>

                  {item.keyValues && item.keyValues.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {item.keyValues.map((val, idx) => (
                        <span key={idx} className="text-[11px] font-mono font-medium px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
                          {val}
                        </span>
                      ))}
                    </div>
                  )}

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-fadeIn">
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-slate-600">
                        <p className="font-semibold text-slate-800 mb-1">AI Clinical Assessment Note:</p>
                        <p>
                          {isStomach 
                            ? "Correlates with functional dyspepsia and delayed gastric emptying. Demonstrates progressive recovery of Jatharagni with Sukumaram Kashayam."
                            : "Correlates with atherogenic dyslipidemia and vascular channel congestion. Arjuna Ksheerapaka actively supports myocardial tone."}
                        </p>
                      </div>

                      {item.sourceFile && (
                        <div className="flex items-center justify-between text-xs text-slate-500 p-2 bg-emerald-50/40 rounded-xl border border-emerald-100">
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-mono text-[11px] text-slate-700">{item.sourceFile}</span>
                          </div>
                          <span className="text-[11px] text-emerald-700 font-semibold">Verified OCR Record • Stamped to ABHA</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
