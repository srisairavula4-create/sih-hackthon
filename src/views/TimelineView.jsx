import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Filter, 
  FileText, 
  Activity, 
  Pill, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  CheckCircle2, 
  Eye, 
  ArrowUpRight,
  Stethoscope
} from 'lucide-react';

export const TimelineView = ({ patient, timeline, onNavigateToUpload }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState({ 'TIME-01': true, 'TIME-02': true });

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = ['All', 'Lab Report', 'Prescription', 'Ayurvedic Consultation', 'Vitals'];

  const filteredTimeline = selectedCategory === 'All'
    ? timeline
    : timeline.filter(item => item.category === selectedCategory);

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
                Interactive Medical History Timeline
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Chronological synthesis of allopathic laboratory findings, clinical vitals, and Ayurvedic intervention milestones
            </p>
          </div>

          <button
            onClick={onNavigateToUpload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors self-start sm:self-auto"
          >
            + Add Lab Record via OCR
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Filter By:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
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

      {/* Longitudinal Biomarker Trajectory Widget */}
      <div className="bg-gradient-to-r from-teal-50/50 via-white to-emerald-50/50 rounded-3xl border border-teal-200/80 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Longitudinal Biomarker Trajectory: Glycated Hemoglobin (HbA1c)
              </h3>
              <p className="text-xs text-slate-500">Tracked across past 14 months of interventions</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            Latest: 7.8% (Elevated)
          </span>
        </div>

        {/* Visual Progress Bar Flow */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[10px] text-slate-400 font-mono">Nov 18, 2023</p>
            <p className="text-base font-black text-amber-600 font-mono mt-0.5">6.2%</p>
            <p className="text-[11px] text-slate-500">Baseline Pre-Diabetic Phase</p>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-[10px] text-slate-400 font-mono">Aug 22, 2024</p>
            <p className="text-base font-black text-rose-600 font-mono mt-0.5">8.4%</p>
            <p className="text-[11px] text-slate-500">T2DM Conversion • Metformin Initiated</p>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-teal-300 ring-2 ring-teal-200/50 shadow-2xs">
            <p className="text-[10px] text-teal-700 font-bold font-mono">Jan 14, 2025 (Latest)</p>
            <p className="text-base font-black text-emerald-600 font-mono mt-0.5">7.8%</p>
            <p className="text-[11px] text-slate-500">Gradual drop with Deepana-Pachana</p>
          </div>
        </div>
      </div>

      {/* Chronological Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-200 space-y-6 ml-4 sm:ml-6">
        {filteredTimeline.map((item) => {
          const isExpanded = expandedItems[item.id];

          return (
            <div key={item.id} className="relative group">
              
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-emerald-500 shadow-2xs flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              </div>

              {/* Event Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-300 transition-all">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {item.date}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 self-end sm:self-auto transition-colors"
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

                {/* Key Values Tag Pills */}
                {item.keyValues && item.keyValues.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {item.keyValues.map((val, idx) => (
                      <span 
                        key={idx} 
                        className="text-[11px] font-mono font-medium px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expandable Deep Dive */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-fadeIn">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-slate-600">
                      <p className="font-semibold text-slate-800 mb-1">Longitudinal Clinical Assessment Note:</p>
                      <p>
                        Event corroborated with patient's Agni state at time of recording. Demonstrates chronic Medovaha srotodushti that correlates with intermittent hyperglycemia.
                      </p>
                    </div>

                    {item.sourceFile && (
                      <div className="flex items-center justify-between text-xs text-slate-500 p-2 bg-emerald-50/40 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-mono text-[11px] text-slate-700">{item.sourceFile}</span>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold">Verified OCR Record</span>
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
  );
};
