import React, { useState } from 'react';
import { Field, Input, Select, Shell, SummaryCard } from './FormControls';

export default function Screen7SolicitudCancelacion({ quoteData, selectedOption, registrationData, onBack, onNext }) {
  const [form, setForm] = useState({
    reason: 'Venta de vehículo',
    requestedDate: '2026-04-30',
    contactEmail: registrationData?.email || 'juan.perez@correo.com',
    contactPhone: registrationData?.phone || '5512345678',
    comments: '',
    policyHolder: `${registrationData?.firstName || ''} ${registrationData?.lastName || ''}`.trim(),
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));
  const touch = (name) => setTouched((prev) => ({ ...prev, [name]: true }));

  const errors = {
    reason: !form.reason ? 'Selecciona el motivo de cancelación.' : '',
    requestedDate: !form.requestedDate ? 'Selecciona la fecha solicitada.' : '',
    contactEmail: !/^\S+@\S+\.\S+$/.test(form.contactEmail) ? 'Ingresa un correo válido.' : '',
    contactPhone: form.contactPhone.replace(/\D/g, '').length < 10 ? 'Ingresa un teléfono válido.' : '',
    policyHolder: !form.policyHolder.trim() ? 'Ingresa el nombre del titular.' : '',
  };

  const showError = (name) => (touched[name] || submitted ? errors[name] : '');
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({
      reason: true,
      requestedDate: true,
      contactEmail: true,
      contactPhone: true,
      policyHolder: true,
    });

    if (hasErrors) return;
    onNext && onNext(form);
  };

  const policyNumber = 'ESP-AUTO-2026-001245';

  return (
    <Shell
      title="Solicitud de cancelación"
      subtitle="Captura la información requerida para enviar la solicitud"
      onBack={onBack}
      aside={
        <>
          <SummaryCard
            title="Póliza a cancelar"
            rows={[
              { label: 'Póliza', value: policyNumber },
              { label: 'Aseguradora', value: selectedOption?.insurer },
              { label: 'Paquete', value: selectedOption?.packageName || selectedOption?.package },
              { label: 'Vehículo', value: `${quoteData?.brand || ''} ${quoteData?.version || ''}`.trim() },
              { label: 'Placas', value: quoteData?.plates },
              { label: 'Titular', value: form.policyHolder },
            ]}
          />
          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6 text-sm text-amber-50 backdrop-blur">
            La cancelación se procesará conforme al tipo de pago y a la fecha solicitada en la plataforma.
          </div>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Formulario de movimiento</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Completa todos los campos obligatorios</h2>
          <p className="mt-2 text-sm text-slate-600">
            Indica el motivo de cancelación, la fecha solicitada y los datos de contacto para seguimiento.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Motivo de cancelación" required error={showError('reason')}>
              <Select
                value={form.reason}
                onChange={(e) => setField('reason', e.target.value)}
                onBlur={() => touch('reason')}
              >
                <option value="">Selecciona</option>
                <option value="Venta de vehículo">Venta de vehículo</option>
                <option value="Cambio de aseguradora">Cambio de aseguradora</option>
                <option value="Error en emisión">Error en emisión</option>
                <option value="Unidad fuera de servicio">Unidad fuera de servicio</option>
              </Select>
            </Field>

            <Field label="Fecha solicitada" required error={showError('requestedDate')}>
              <Input
                type="date"
                value={form.requestedDate}
                onChange={(e) => setField('requestedDate', e.target.value)}
                onBlur={() => touch('requestedDate')}
              />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Correo de contacto" required error={showError('contactEmail')}>
              <Input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setField('contactEmail', e.target.value)}
                onBlur={() => touch('contactEmail')}
                placeholder="correo@empresa.com"
              />
            </Field>

            <Field label="Teléfono de contacto" required error={showError('contactPhone')}>
              <Input
                value={form.contactPhone}
                onChange={(e) => setField('contactPhone', e.target.value)}
                onBlur={() => touch('contactPhone')}
                maxLength={10}
                placeholder="5512345678"
              />
            </Field>
          </div>

          <Field label="Titular de la póliza" required error={showError('policyHolder')}>
            <Input
              value={form.policyHolder}
              onChange={(e) => setField('policyHolder', e.target.value)}
              onBlur={() => touch('policyHolder')}
              placeholder="Nombre completo"
            />
          </Field>

          <Field label="Comentarios adicionales">
            <textarea
              value={form.comments}
              onChange={(e) => setField('comments', e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
              placeholder="Describe cualquier detalle adicional para la solicitud"
            />
          </Field>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            Los campos marcados con asterisco son obligatorios. Al enviar, la solicitud quedará registrada para seguimiento.
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Se enviará la confirmación de la solicitud al correo de contacto registrado.
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] hover:bg-cyan-600"
            >
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
