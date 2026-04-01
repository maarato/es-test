import React, { useState } from 'react';
import { Field, Input, Select, Shell, SummaryCard } from './FormControls';

export default function Screen3Registro({ selectedOption, onBack, onNext }) {
  const [form, setForm] = useState({
    useContactData: true,
    firstName: 'Juan',
    middleName: 'Carlos',
    lastName: 'Pérez',
    secondLastName: 'López',
    birthDate: '1990-05-15',
    email: 'juan.perez@correo.com',
    phone: '5512345678',
    gender: 'Masculino',
    password: '',
    confirmPassword: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const errors = {
    firstName: !form.firstName.trim() ? 'Ingresa el primer nombre.' : '',
    lastName: !form.lastName.trim() ? 'Ingresa el apellido paterno.' : '',
    birthDate: !form.birthDate ? 'Selecciona la fecha de nacimiento.' : '',
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? 'Ingresa un correo válido.' : '',
    phone: form.phone.replace(/\D/g, '').length < 10 ? 'Ingresa un teléfono válido.' : '',
    gender: !form.gender ? 'Selecciona el género.' : '',
    password: form.password.length < 6 ? 'La contraseña debe tener al menos 6 caracteres.' : '',
    confirmPassword: form.confirmPassword !== form.password ? 'Las contraseñas no coinciden.' : '',
  };

  const showError = (name) => (touched[name] || submitted ? errors[name] : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ firstName: true, lastName: true, birthDate: true, email: true, phone: true, gender: true, password: true, confirmPassword: true });
    if (Object.values(errors).some(Boolean)) return;
    onNext(form);
  };

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  return (
    <Shell
      title="Registro"
      subtitle="Completa los datos del conductor habitual"
      onBack={onBack}
      aside={<SummaryCard title="Opción seleccionada" rows={[{ label: 'Aseguradora', value: selectedOption?.insurer }, { label: 'Paquete', value: selectedOption?.packageName }, { label: 'Prima', value: selectedOption?.price }]} />}
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={form.useContactData} onChange={(e) => setField('useContactData', e.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300" />
            <span>Utilizar datos de contacto</span>
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Primer nombre" required error={showError('firstName')}><Input value={form.firstName} onBlur={() => setTouched((p) => ({ ...p, firstName: true }))} onChange={(e) => setField('firstName', e.target.value)} /></Field>
          <Field label="Segundo nombre"><Input value={form.middleName} onChange={(e) => setField('middleName', e.target.value)} /></Field>
          <Field label="Apellido paterno" required error={showError('lastName')}><Input value={form.lastName} onBlur={() => setTouched((p) => ({ ...p, lastName: true }))} onChange={(e) => setField('lastName', e.target.value)} /></Field>
          <Field label="Apellido materno"><Input value={form.secondLastName} onChange={(e) => setField('secondLastName', e.target.value)} /></Field>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Fecha de nacimiento" required error={showError('birthDate')}><Input type="date" value={form.birthDate} onBlur={() => setTouched((p) => ({ ...p, birthDate: true }))} onChange={(e) => setField('birthDate', e.target.value)} /></Field>
          <Field label="Género" required error={showError('gender')}>
            <Select value={form.gender} onBlur={() => setTouched((p) => ({ ...p, gender: true }))} onChange={(e) => setField('gender', e.target.value)}>
              <option value="">Selecciona</option><option value="Masculino">Masculino</option><option value="Femenino">Femenino</option><option value="Otro">Otro</option>
            </Select>
          </Field>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Email" required error={showError('email')}><Input type="email" value={form.email} onBlur={() => setTouched((p) => ({ ...p, email: true }))} onChange={(e) => setField('email', e.target.value)} /></Field>
          <Field label="Teléfono celular" required error={showError('phone')}><Input value={form.phone} maxLength={10} onBlur={() => setTouched((p) => ({ ...p, phone: true }))} onChange={(e) => setField('phone', e.target.value)} /></Field>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Contraseña" required error={showError('password')}><Input type="password" value={form.password} onBlur={() => setTouched((p) => ({ ...p, password: true }))} onChange={(e) => setField('password', e.target.value)} /></Field>
          <Field label="Confirmar contraseña" required error={showError('confirmPassword')}><Input type="password" value={form.confirmPassword} onBlur={() => setTouched((p) => ({ ...p, confirmPassword: true }))} onChange={(e) => setField('confirmPassword', e.target.value)} /></Field>
        </div>
        <div className="flex justify-end border-t border-slate-200 pt-6">
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] hover:bg-cyan-600">Continuar</button>
        </div>
      </form>
    </Shell>
  );
}
