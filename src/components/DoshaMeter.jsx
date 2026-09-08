import React, { useState } from 'react';
import { Wind, Flame, Droplets, Info } from 'lucide-react';

export const DoshaMeter = ({ compact = false }) => {
  const [selectedDosha, setSelectedDosha] = useState('pitta');

  const doshaData = {
    vata: {
      name: "Vata",
      element: "Air + Space (Vayu + Akasha)",
      percentage: 25,
      color: "from-sky-400 to-indigo-500",
      textColor: "text-sky-700",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-200",
      qualities: "Dry, Light, Cold, Rough, Subtle, Mobile",
      status: "Secondary Imbalance (Avarana by Kapha)",
      clinicalManifestations: "Irregular Agni (Vishamagni), dry skin, nocturnal awakenings."
    },
    pitta: {
      name: "Pitta",
      element: "Fire + Water (Tejas + Jala)",
      percentage: 45,
      color: "from-amber-400 to-orange-500",
      textColor: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      qualities: "Hot, Sharp, Light, Oily, Liquid, Pungent",
      status: "Primary Dominance (Prakriti Baseline)",
      clinicalManifestations: "Excessive thirst (Pipasa), hot flushes, irritability under stress."
    },
    kapha: {
      name: "Kapha",
      element: "Water + Earth (Jala + Prithvi)",
      percentage: 30,
      color: "from-emerald-400 to-teal-500",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      qualities: "Heavy, Slow, Cool, Oily, Smooth, Dense",
      status: "Active Morbidity (Vikriti - Bahu Drava Kapha)",
      clinicalManifestations: "Agnimandya, sweet taste in mouth, sluggish metabolism, postprandial heaviness."
    }
  };

  const active = doshaData[selectedDosha];

  if (compact) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Dosha Constitution (Prakriti vs Vikriti)
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Pitta-Kapha
          </span>
        </div>

        {/* Progress Bar Stack */}
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex mb-3">
          <div 
            style={{ width: `${doshaData.vata.percentage}%` }} 
            className="bg-sky-400 hover:opacity-90 transition-opacity cursor-pointer"
            title={`Vata: ${doshaData.vata.percentage}%`}
            onClick={() => setSelectedDosha('vata')}
          />
          <div 
            style={{ width: `${doshaData.pitta.percentage}%` }} 
            className="bg-amber-400 hover:opacity-90 transition-opacity cursor-pointer"
            title={`Pitta: ${doshaData.pitta.percentage}%`}
            onClick={() => setSelectedDosha('pitta')}
          />
          <div 
            style={{ width: `${doshaData.kapha.percentage}%` }} 
            className="bg-emerald-500 hover:opacity-90 transition-opacity cursor-pointer"
            title={`Kapha: ${doshaData.kapha.percentage}%`}
            onClick={() => setSelectedDosha('kapha')}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div 
            onClick={() => setSelectedDosha('vata')}
            className={`p-1.5 rounded-xl border cursor-pointer transition-all ${
              selectedDosha === 'vata' ? 'bg-sky-50 border-sky-300 font-semibold' : 'border-slate-100'
            }`}
          >
            <p className="text-[10px] text-slate-500">Vata</p>
            <p className="text-xs font-bold text-sky-700">{doshaData.vata.percentage}%</p>
          </div>
          <div 
            onClick={() => setSelectedDosha('pitta')}
            className={`p-1.5 rounded-xl border cursor-pointer transition-all ${
              selectedDosha === 'pitta' ? 'bg-amber-50 border-amber-300 font-semibold' : 'border-slate-100'
            }`}
          >
            <p className="text-[10px] text-slate-500">Pitta (Dom)</p>
            <p className="text-xs font-bold text-amber-700">{doshaData.pitta.percentage}%</p>
          </div>
          <div 
            onClick={() => setSelectedDosha('kapha')}
            className={`p-1.5 rounded-xl border cursor-pointer transition-all ${
              selectedDosha === 'kapha' ? 'bg-emerald-50 border-emerald-300 font-semibold' : 'border-slate-100'
            }`}
          >
            <p className="text-[10px] text-slate-500">Kapha (Vikriti)</p>
            <p className="text-xs font-bold text-emerald-700">{doshaData.kapha.percentage}%</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-emerald-700">
              <Droplets className="w-4 h-4" />
            </span>
            Tridosha Profile Assessment
          </h3>
          <p className="text-xs text-slate-500">
            Calculated via AI synthesis of Dashavidha Pariksha, physical attributes & metabolic markers
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Dominant: Pitta-Kapha
        </span>
      </div>

      {/* Tri-color Stacked Bar */}
      <div className="space-y-1.5 mb-5">
        <div className="flex justify-between text-xs font-medium text-slate-600">
          <span>Constitutional Distribution</span>
          <span>Vata 25% | Pitta 45% | Kapha 30%</span>
        </div>
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          <div 
            style={{ width: '25%' }} 
            className="bg-gradient-to-r from-sky-400 to-sky-500 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center text-[10px] text-white font-bold"
            onClick={() => setSelectedDosha('vata')}
          >
            Vata
          </div>
          <div 
            style={{ width: '45%' }} 
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center text-[10px] text-white font-bold"
            onClick={() => setSelectedDosha('pitta')}
          >
            Pitta (45%)
          </div>
          <div 
            style={{ width: '30%' }} 
            className="bg-gradient-to-r from-emerald-400 to-emerald-600 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center text-[10px] text-white font-bold"
            onClick={() => setSelectedDosha('kapha')}
          >
            Kapha (30%)
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <button
          onClick={() => setSelectedDosha('vata')}
          className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
            selectedDosha === 'vata'
              ? 'bg-sky-50/80 border-sky-300 ring-2 ring-sky-200/50'
              : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Vata Dosha</p>
            <p className="text-[11px] text-slate-500">25% (Mild)</p>
          </div>
        </button>

        <button
          onClick={() => setSelectedDosha('pitta')}
          className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
            selectedDosha === 'pitta'
              ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-200/50'
              : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Pitta Dosha</p>
            <p className="text-[11px] text-amber-700 font-semibold">45% (Dominant)</p>
          </div>
        </button>

        <button
          onClick={() => setSelectedDosha('kapha')}
          className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
            selectedDosha === 'kapha'
              ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-200/50'
              : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Kapha Dosha</p>
            <p className="text-[11px] text-emerald-700 font-semibold">30% (Vikriti Focus)</p>
          </div>
        </button>
      </div>

      {/* Selected Dosha Detailed Card */}
      <div className={`p-4 rounded-xl border ${active.bgColor} ${active.borderColor} transition-all`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {active.name} Dynamics
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              ({active.element})
            </span>
          </div>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border ${active.textColor}`}>
            {active.status}
          </span>
        </div>
        <p className="text-xs text-slate-700 mb-1.5">
          <strong className="text-slate-800">Ayurvedic Gunas:</strong> {active.qualities}
        </p>
        <p className="text-xs text-slate-700">
          <strong className="text-slate-800">Observed Manifestation:</strong> {active.clinicalManifestations}
        </p>
      </div>
    </div>
  );
};
