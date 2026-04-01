import React, { useState } from 'react';
import { Shell, SummaryCard } from './FormControls';

function InfoBlock({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">{title}</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{item.value || '—'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Screen4Resumen({ quoteData, selectedOption, registrationData, onBack, onNext }) {
  const [accepted, setAccepted] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (!accepted) {
      setShowError(true);
      return;
    }
    onNext();
  };

  return (
    <Shell
      title="Resumen de la contratación"
      subtitle="Verifica los datos con los que se emitirá la póliza"
      onBack={onBack}
      aside={
        <>
          <SummaryCard
            title="Póliza seleccionada"
            rows={[
              { label: 'Aseguradora', value: selectedOption?.insurer },
              { label: 'Paquete', value: selectedOption?.packageName },
              { label: 'Prima anual', value: selectedOption?.price },
              { label: 'Forma de pago', value: quoteData?.paymentFrequency },
              { label: 'Medio de pago', value: quoteData?.paymentMethod },
            ]}
          />
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-sm text-emerald-50 backdrop-blur">
            Confirma la información antes de continuar al pago o captura bancaria.
          </div>
        </>
      }
    >
      <div className="space-y-6">
        <InfoBlock
          title="Datos del vehículo"
          items={[
            { label: 'Marca', value: quoteData?.brand },
            { label: 'Versión', value: quoteData?.version },
            { label: 'Modelo', value: quoteData?.modelYear },
            { label: 'Serie', value: quoteData?.serialNumber },
            { label: 'Motor', value: quoteData?.engineNumber },
            { label: 'Placas', value: quoteData?.plates },
          ]}
        />

        <InfoBlock
          title="Datos del conductor"
          items={[
            { label: 'Nombre', value: `${registrationData?.firstName || ''} ${registrationData?.middleName || ''} ${registrationData?.lastName || ''} ${registrationData?.secondLastName || ''}`.replace(/\s+/g, ' ').trim() },
            { label: 'Fecha de nacimiento', value: registrationData?.birthDate },
            { label: 'Correo electrónico', value: registrationData?.email },
            { label: 'Teléfono celular', value: registrationData?.phone },
            { label: 'Género', value: registrationData?.gender },
          ]}
        />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => {
                setAccepted(e.target.checked);
                if (e.target.checked) setShowError(false);
              }}
              className="mt-1 h-4 w-4 rounded border-slate-300"
            />
            <span>Confirmo que los datos capturados son correctos para la emisión de la póliza.</span>
          </label>
          {showError && <p className="mt-2 text-xs text-red-600">Debes confirmar la información para continuar.</p>}
        </div>

        <div className="flex justify-end border-t border-slate-200 pt-6">
          <button
            onClick={handleContinue}
            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] hover:bg-cyan-600"
          >
            Continuar al pago
          </button>
        </div>
      </div>
    </Shell>
  );
}
