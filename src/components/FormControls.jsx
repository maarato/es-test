import React from 'react';
import logo from '../assets/logo.png';

export function Field({ label, required = false, error, children, hint }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 ${props.className || ''}`}
    />
  );
}

export function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 ${props.className || ''}`}
    >
      {children}
    </select>
  );
}

export function Shell({ title, subtitle, children, aside, onBack }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-900">
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.9) 0%, rgba(2,6,23,0.78) 100%), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop') center/cover",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-4 text-white">
            <div>
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo Esparza Seguros" className="h-12 w-12 rounded-xl bg-white/90 p-1" />
                <p className="text-2xl font-bold tracking-wide text-cyan-200 lg:text-3xl">Esparza Seguros</p>
              </div>
              <h1 className="mt-2 text-2xl font-semibold lg:text-3xl">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-slate-300">{subtitle}</p>}
            </div>
            {onBack ? (
              <button
                onClick={onBack}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                Regresar
              </button>
            ) : (
              <div />
            )}
          </div>

          <div className={`grid gap-8 ${aside ? 'lg:grid-cols-[1.1fr_420px] lg:items-start' : ''}`}>
            <section className="rounded-3xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur lg:p-8">
              {children}
            </section>
            {aside ? <aside className="space-y-4 text-white">{aside}</aside> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SummaryCard({ title, rows }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{title}</p>
      <div className="mt-4 space-y-3 text-sm text-slate-100">
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-4 ${idx < rows.length - 1 ? 'border-b border-white/10 pb-2' : ''}`}
          >
            <span className="text-slate-300">{row.label}</span>
            <span className="text-right font-medium">{row.value || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
