import React from 'react';
import { Shell, SummaryCard } from './FormControls';

const CALENDAR_ROWS = [
  { installment: '1', chargeDate: '01/07/2025', retry1: '08/07/2025', retry2: '15/07/2025' },
  { installment: '2', chargeDate: '01/08/2025', retry1: '08/08/2025', retry2: '15/08/2025' },
  { installment: '3', chargeDate: '01/09/2025', retry1: '08/09/2025', retry2: '15/09/2025' },
  { installment: '4', chargeDate: '01/10/2025', retry1: '08/10/2025', retry2: '15/10/2025' },
  { installment: '5', chargeDate: '03/11/2025', retry1: '10/11/2025', retry2: '17/11/2025' },
];

export default function Screen9CalendarioCobro({ paymentData, onBack, onRestart }) {
  const paymentMethod = paymentData?.paymentMethod || 'Tarjeta de crédito';
  const paymentFrequency = paymentData?.paymentFrequency || 'Mensual';

  return (
    <Shell
      title="Calendario de cobro"
      subtitle="Pólizas domiciliadas con pago mensual"
      onBack={onBack}
      aside={
        <>
          <SummaryCard
            title="Programación"
            rows={[
              { label: 'Forma de pago', value: paymentFrequency },
              { label: 'Medio de pago', value: paymentMethod },
              { label: 'Esquema', value: 'Cobro programado' },
              { label: 'Plazo máximo', value: '24 horas' },
            ]}
          />
          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6 text-sm text-cyan-50 backdrop-blur">
            Aunque los datos bancarios se registran al emitir la póliza, el cargo no se realiza de inmediato. Se refleja en la fecha indicada y puede tardar hasta 24 horas.
          </div>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Cobranza programada</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Calendario de cargos y reintentos</h2>
          <p className="mt-2 text-sm text-slate-600">
            Consulta las fechas de cobro para pólizas mensuales domiciliadas. Si el cargo inicial no se procesa, se programan reintentos conforme al calendario.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">No. Recibo</th>
                  <th className="px-4 py-4 text-left font-semibold">Fecha de cobro</th>
                  <th className="px-4 py-4 text-left font-semibold">1er. Reintento</th>
                  <th className="px-4 py-4 text-left font-semibold">2do. Reintento</th>
                </tr>
              </thead>
              <tbody>
                {CALENDAR_ROWS.map((row, idx) => (
                  <tr key={row.installment} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-4 font-medium text-slate-900">{row.installment}</td>
                    <td className="px-4 py-4 text-slate-700">{row.chargeDate}</td>
                    <td className="px-4 py-4 text-slate-700">{row.retry1}</td>
                    <td className="px-4 py-4 text-slate-700">{row.retry2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Consideraciones</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• El cargo puede reflejarse dentro de un plazo máximo de 24 horas.</li>
              <li>• Mantén disponible la tarjeta registrada en la fecha de cobro.</li>
              <li>• Si cambian tus datos bancarios, actualízalos desde la plataforma.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Recomendación</p>
            <p className="mt-3 text-sm text-slate-700">
              Conserva este calendario como referencia para seguimiento de cargos y reintentos durante la vigencia de la póliza.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">Este calendario aplica para pólizas mensuales domiciliadas.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Regresar
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] hover:bg-cyan-600"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
