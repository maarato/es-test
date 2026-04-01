import React from 'react';
import { Shell, SummaryCard } from './FormControls';

export default function Screen8ConfirmacionCancelacion({ quoteData, selectedOption, registrationData, cancellationData, onBack, onNext, onRestart }) {
  const insuredName = `${registrationData?.firstName || ''} ${registrationData?.lastName || ''}`.trim();
  const policyNumber = 'ESP-AUTO-2026-001245';
  const ticketNumber = 'TK-CAN-2026-00981';
  const requestDate = '01/04/2026';

  return (
    <Shell
      title="Confirmación de cancelación"
      subtitle="La solicitud fue registrada correctamente"
      onBack={onBack}
      aside={
        <>
          <SummaryCard
            title="Resumen de solicitud"
            rows={[
              { label: 'Ticket', value: ticketNumber },
              { label: 'Póliza', value: policyNumber },
              { label: 'Aseguradora', value: selectedOption?.insurer },
              { label: 'Paquete', value: selectedOption?.packageName || selectedOption?.package },
              { label: 'Fecha solicitada', value: cancellationData?.requestedDate || '—' },
              { label: 'Correo de contacto', value: cancellationData?.contactEmail || registrationData?.email },
            ]}
          />
          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6 text-sm text-cyan-50 backdrop-blur">
            Recibirás una confirmación por correo con el número de ticket para dar seguimiento al movimiento.
          </div>
        </>
      }
    >
      <div className="space-y-6">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Solicitud enviada</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Tu cancelación está en proceso</h2>
              <p className="mt-2 text-sm text-slate-600">
                Hemos registrado la solicitud de cancelación y se generó un ticket para seguimiento. También se enviará un correo de confirmación al contacto indicado.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Titular</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{insuredName || '—'}</p>
            <p className="mt-1 text-sm text-slate-600">Vehículo: {`${quoteData?.brand || ''} ${quoteData?.version || ''}`.trim() || '—'}</p>
            <p className="mt-1 text-sm text-slate-600">Placas: {quoteData?.plates || '—'}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Detalle del movimiento</p>
            <p className="mt-2 text-sm text-slate-700"><span className="font-semibold text-slate-900">Motivo:</span> {cancellationData?.reason || '—'}</p>
            <p className="mt-1 text-sm text-slate-700"><span className="font-semibold text-slate-900">Fecha de solicitud:</span> {requestDate}</p>
            <p className="mt-1 text-sm text-slate-700"><span className="font-semibold text-slate-900">Ticket:</span> {ticketNumber}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Siguientes pasos</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>• El equipo de Esparza Seguros revisará la solicitud y dará seguimiento conforme al tipo de pago registrado.</li>
            <li>• Recibirás un correo con el número de ticket y la confirmación del movimiento solicitado.</li>
            <li>• Podrás volver a Mis pólizas para consultar el estatus general de tu trámite.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Conserva el número de ticket para cualquier aclaración o seguimiento posterior.
          </p>
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
              onClick={onNext}
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] hover:bg-cyan-600"
            >
              Ver calendario de cobro
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
