import React, { useEffect, useState } from 'react';
import { compareOptions } from '../data/options';
import qualitasLogo from '../assets/qualitas-logo.png';
import banorteLogo from '../assets/Banortelogo.png';

function getInsurerLogo(insurer) {
  if (insurer === 'Quálitas') return qualitasLogo;
  if (insurer === 'Banorte Seguros') return banorteLogo;
  return null;
}

export default function Screen2Comparar({ onSelect, onBack }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Esparza Seguros</p>
            <h1 className="mt-2 text-3xl font-semibold">Compara opciones</h1>
          </div>
          <button onClick={onBack} className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">Regresar</button>
        </div>
        <div className="space-y-5">
          {isLoading
            ? compareOptions.map((opt) => (
              <div key={`skeleton-${opt.id}`} className="animate-pulse rounded-3xl bg-white p-6 text-slate-900 shadow-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="h-14 w-32 rounded-xl bg-slate-200" />
                      <div className="space-y-2">
                        <div className="h-4 w-28 rounded bg-slate-200" />
                        <div className="h-6 w-48 rounded bg-slate-200" />
                      </div>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="h-4 rounded bg-slate-200" />
                      <div className="h-4 rounded bg-slate-200" />
                      <div className="h-4 rounded bg-slate-200" />
                      <div className="h-4 rounded bg-slate-200" />
                    </div>
                  </div>
                  <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:w-72">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="mt-2 h-8 w-40 rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-24 rounded bg-slate-200" />
                    <div className="mt-4 h-11 w-full rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            ))
            : compareOptions.map((opt) => (
            <div key={opt.id} className="rounded-3xl bg-white p-6 text-slate-900 shadow-xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-4">
                    {getInsurerLogo(opt.insurer) && (
                      <img
                        src={getInsurerLogo(opt.insurer)}
                        alt={`Logo ${opt.insurer}`}
                        className="h-14 w-auto object-contain"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-slate-500">{opt.insurer}</p>
                      <h2 className="text-2xl font-bold text-slate-900">Paquete {opt.packageName}</h2>
                    </div>
                  </div>

                  <ul className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
                    {opt.features.map((f) => <li key={f}>• {f}</li>)}
                    <li>• Atención y seguimiento digital</li>
                  </ul>
                </div>

                <div className="w-full rounded-2xl border border-cyan-100 bg-cyan-50/70 p-5 lg:w-72">
                  <p className="text-sm font-medium text-slate-600">Prima anual</p>
                  <p className="mt-1 text-3xl font-semibold text-cyan-700">{opt.price}</p>
                  <p className="mt-1 text-sm text-slate-500">o {opt.monthly}</p>
                  <button onClick={() => onSelect(opt)} className="mt-4 w-full rounded-full bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600">Comprar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
