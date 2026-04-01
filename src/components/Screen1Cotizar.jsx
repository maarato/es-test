import React, { useMemo, useState } from 'react';
import { brands, versionsByBrand, years, paymentFrequencies, paymentMethods } from '../data/options';
import { Field, Input, Select, Shell, SummaryCard } from './FormControls';

export default function Screen1Cotizar({ onNext }) {
  const [form, setForm] = useState({
    brand: 'Nissan',
    version: 'Versa Sense',
    modelYear: '2024',
    serialNumber: '3N1CN8DV0RL123456',
    engineNumber: 'HR16-987654',
    plates: 'ABC-123-A',
    paymentFrequency: 'Contado',
    paymentMethod: 'Tarjeta de crédito',
    privacyAccepted: false,
    termsAccepted: false,
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const versions = useMemo(() => versionsByBrand[form.brand] || [], [form.brand]);

  const updateField = (name, value) => {
    if (name === 'brand') {
      const nextVersion = (versionsByBrand[value] || [])[0] || '';
      setForm((prev) => ({ ...prev, brand: value, version: nextVersion }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const errors = {
    serialNumber: form.serialNumber.trim().length < 10 ? 'Ingresa una serie válida.' : '',
    engineNumber: form.engineNumber.trim().length < 5 ? 'Ingresa un número de motor válido.' : '',
    plates: form.plates.trim().length < 6 ? 'Ingresa placas válidas.' : '',
    privacyAccepted: !form.privacyAccepted ? 'Debes aceptar el aviso de privacidad.' : '',
    termsAccepted: !form.termsAccepted ? 'Debes aceptar los términos y condiciones.' : '',
  };

  const showError = (name) => (touched[name] || submitted ? errors[name] : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({
      serialNumber: true,
      engineNumber: true,
      plates: true,
      privacyAccepted: true,
      termsAccepted: true,
    });
    if (Object.values(errors).some(Boolean)) return;
    onNext(form);
  };

  return (
    <Shell
      title="Cotizar una póliza"
      aside={
        <SummaryCard
          title="Resumen"
          rows={[
            { label: 'Vehículo', value: `${form.brand} ${form.version}` },
            { label: 'Modelo', value: form.modelYear },
            { label: 'Serie', value: form.serialNumber },
            { label: 'Placas', value: form.plates },
            { label: 'Forma de pago', value: form.paymentFrequency },
            { label: 'Medio de pago', value: form.paymentMethod },
          ]}
        />
      }
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Información del vehículo</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ingresa y verifica los datos</h2>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Field label="Marca" required>
            <Select value={form.brand} onChange={(e) => updateField('brand', e.target.value)}>
              {brands.map((brand) => <option key={brand}>{brand}</option>)}
            </Select>
          </Field>
          <Field label="Versión" required>
            <Select value={form.version} onChange={(e) => updateField('version', e.target.value)}>
              {versions.map((version) => <option key={version}>{version}</option>)}
            </Select>
          </Field>
          <Field label="Modelo" required>
            <Select value={form.modelYear} onChange={(e) => updateField('modelYear', e.target.value)}>
              {years.map((year) => <option key={year}>{year}</option>)}
            </Select>
          </Field>
          <Field label="Serie" required error={showError('serialNumber')}>
            <Input value={form.serialNumber} maxLength={17} onBlur={() => setTouched((p) => ({ ...p, serialNumber: true }))} onChange={(e) => updateField('serialNumber', e.target.value.toUpperCase())} />
          </Field>
          <Field label="Motor" required error={showError('engineNumber')}>
            <Input value={form.engineNumber} onBlur={() => setTouched((p) => ({ ...p, engineNumber: true }))} onChange={(e) => updateField('engineNumber', e.target.value.toUpperCase())} />
          </Field>
          <Field label="Placas" required error={showError('plates')}>
            <Input value={form.plates} onBlur={() => setTouched((p) => ({ ...p, plates: true }))} onChange={(e) => updateField('plates', e.target.value.toUpperCase())} />
          </Field>
        </div>

        <div className="rounded-2xl border border-cyan-100 bg-cyan-50/60 p-5">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Opciones de contratación</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Forma de pago" required>
              <Select value={form.paymentFrequency} onChange={(e) => updateField('paymentFrequency', e.target.value)}>
                {paymentFrequencies.map((item) => <option key={item}>{item}</option>)}
              </Select>
            </Field>
            <Field label="Medio de pago" required>
              <Select value={form.paymentMethod} onChange={(e) => updateField('paymentMethod', e.target.value)}>
                {paymentMethods.map((item) => <option key={item}>{item}</option>)}
              </Select>
            </Field>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={form.privacyAccepted} onBlur={() => setTouched((p) => ({ ...p, privacyAccepted: true }))} onChange={(e) => updateField('privacyAccepted', e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300" />
            <span>He leído y acepto el <strong>Aviso de privacidad</strong>.</span>
          </label>
          {showError('privacyAccepted') && <p className="text-xs text-red-600">{showError('privacyAccepted')}</p>}
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={form.termsAccepted} onBlur={() => setTouched((p) => ({ ...p, termsAccepted: true }))} onChange={(e) => updateField('termsAccepted', e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300" />
            <span>He leído y acepto los <strong>Términos y Condiciones</strong>.</span>
          </label>
          {showError('termsAccepted') && <p className="text-xs text-red-600">{showError('termsAccepted')}</p>}
        </div>

        <div className="flex justify-end border-t border-slate-200 pt-6">
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] hover:bg-cyan-600">
            Cotizar ahora
          </button>
        </div>
      </form>
    </Shell>
  );
}
