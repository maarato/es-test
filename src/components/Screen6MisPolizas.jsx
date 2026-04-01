import React, { useEffect, useState } from 'react';
import { Shell } from './FormControls';

function ActionButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm font-medium text-cyan-700 transition hover:border-cyan-400 hover:bg-cyan-50"
    >
      {children}
    </button>
  );
}

export default function Screen6MisPolizas({ quoteData, selectedOption, registrationData, onBack, onNext }) {
  const [isPolicyLoading, setIsPolicyLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsPolicyLoading(false);
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, []);

  const insuredName = `${registrationData?.firstName || ''} ${registrationData?.lastName || ''}`.trim();
  const policyNumber = 'ESP-AUTO-2026-001245';
  const dueLabel = quoteData?.paymentFrequency === 'Mensual' ? 'Próximo cargo' : 'Pago aplicado';
  const dueValue = quoteData?.paymentFrequency === 'Mensual' ? '08/04/2026' : '01/04/2026';

  return (
    <Shell
      title="Mis pólizas"
      subtitle="Consulta la póliza emitida y las operaciones disponibles"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Operaciones posibles</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Administración de la póliza</h2>
          <p className="mt-2 text-sm text-slate-600">
            Desde esta sección podrás descargar la póliza, consultar datos, actualizar el medio de pago o iniciar una solicitud de cancelación.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="space-y-4">
            {isPolicyLoading ? (
              <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <div className="h-3 w-28 rounded bg-slate-200" />
                    <div className="h-6 w-64 rounded bg-slate-200" />
                    <div className="h-4 w-40 rounded bg-slate-200" />
                  </div>
                  <div className="h-8 w-20 rounded-full bg-slate-200" />
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <div className="h-16 rounded-xl border border-slate-200 bg-slate-50" />
                  <div className="h-16 rounded-xl border border-slate-200 bg-slate-50" />
                  <div className="h-16 rounded-xl border border-slate-200 bg-slate-50" />
                  <div className="h-16 rounded-xl border border-slate-200 bg-slate-50" />
                  <div className="h-16 rounded-xl border border-slate-200 bg-slate-50" />
                  <div className="h-16 rounded-xl border border-slate-200 bg-slate-50" />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Póliza de auto</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">{selectedOption?.insurer} {selectedOption?.packageName}</h3>
                    <p className="mt-1 text-sm text-slate-500">{policyNumber}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">Activa</span>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Asegurado</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{insuredName || '—'}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Vehículo</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{quoteData?.brand} {quoteData?.version}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Placas</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{quoteData?.plates}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Prima anual</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{selectedOption?.price}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">{dueLabel}</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{dueValue}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Pago</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{quoteData?.paymentFrequency} / {quoteData?.paymentMethod}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Acciones</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <ActionButton onClick={() => {}}>Descargar impresión de póliza</ActionButton>
                <ActionButton onClick={() => {}}>Pagar póliza / Modificar tarjeta</ActionButton>
                <ActionButton onClick={() => onNext && onNext()}>Solicitud de cancelación</ActionButton>
                <ActionButton onClick={() => {}}>Solicitud de datos de la póliza</ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
