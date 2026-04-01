import React, { useMemo, useState } from 'react';
import { Field, Input, Shell, SummaryCard } from './FormControls';
import debitCardsLogos from '../assets/debitcards-logos.PNG';
import creditCardsLogos from '../assets/creditcards_logos.PNG';
import helpersImage from '../assets/helpersimage.PNG';

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function getReferenceCode() {
  return 'ESP-' + Math.random().toString().slice(2, 10);
}

export default function Screen5Pago({ quoteData, selectedOption, registrationData, onBack, onNext }) {
  const isDeposit = quoteData?.paymentMethod === 'Depósito Referenciado';
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [canContinueAfterPayment, setCanContinueAfterPayment] = useState(false);
  const [form, setForm] = useState({
    cardName: `${registrationData?.firstName || ''} ${registrationData?.lastName || ''}`.trim(),
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    bank: 'BBVA',
    accepted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const referenceCode = useMemo(() => getReferenceCode(), []);

  const buildPayload = () => ({
    ...form,
    expiry: isDeposit ? '' : `${form.expiryMonth}/${form.expiryYear}`,
    referenceCode: isDeposit ? referenceCode : null,
  });

  const errors = isDeposit
    ? {
        bank: !form.bank ? 'Selecciona un banco.' : '',
        accepted: !form.accepted ? 'Debes aceptar el aviso de privacidad para continuar.' : '',
      }
    : {
        cardName: !form.cardName.trim() ? 'Ingresa el nombre del titular.' : '',
        cardNumber: form.cardNumber.replace(/\D/g, '').length !== 16 ? 'Ingresa un número de tarjeta válido.' : '',
        expiryMonth: !/^(0[1-9]|1[0-2])$/.test(form.expiryMonth) ? 'Mes inválido.' : '',
        expiryYear: !/^\d{2}$/.test(form.expiryYear) ? 'Año inválido.' : '',
        cvv: form.cvv.replace(/\D/g, '').length < 3 ? 'Ingresa un CVV válido.' : '',
        accepted: !form.accepted ? 'Debes aceptar el aviso de privacidad para continuar.' : '',
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;

    if (isDeposit) {
      onNext(buildPayload());
      return;
    }

    setCanContinueAfterPayment(false);
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCanContinueAfterPayment(true);
    }, 2000);
  };

  return (
    <Shell
      title="Pago y captura bancaria"
      subtitle="Captura la forma de pago con la que se programará la emisión y cobro de la póliza"
      onBack={onBack}
      aside={
        <>
          <SummaryCard
            title="Resumen de emisión"
            rows={[
              { label: 'Aseguradora', value: selectedOption?.insurer },
              { label: 'Paquete', value: selectedOption?.packageName },
              { label: 'Prima anual', value: selectedOption?.price },
              { label: 'Forma de pago', value: quoteData?.paymentFrequency },
              { label: 'Medio de pago', value: quoteData?.paymentMethod },
            ]}
          />
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Titular</p>
            <div className="mt-4 space-y-3 text-sm text-slate-100">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
                <span className="text-slate-300">Nombre</span>
                <span className="text-right font-medium">{registrationData?.firstName} {registrationData?.lastName}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
                <span className="text-slate-300">Correo</span>
                <span className="text-right font-medium">{registrationData?.email}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-300">Vehículo</span>
                <span className="text-right font-medium">{quoteData?.brand} {quoteData?.version}</span>
              </div>
            </div>
          </div>
        </>
      }
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Método seleccionado</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Forma de pago</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{quoteData?.paymentFrequency}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Medio de pago</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{quoteData?.paymentMethod}</p>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {isDeposit ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-slate-900">Depósito referenciado</h3>
                <p className="mt-2 text-sm text-slate-600">Genera una referencia de pago para completar la contratación.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Banco receptor" required error={submitted ? errors.bank : ''}>
                  <select
                    value={form.bank}
                    onChange={(e) => setForm((prev) => ({ ...prev, bank: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                  >
                    <option>BBVA</option>
                    <option>Santander</option>
                    <option>Banorte</option>
                    <option>HSBC</option>
                  </select>
                </Field>
                <div className="rounded-xl border border-cyan-100 bg-cyan-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-cyan-700">Referencia generada</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{referenceCode}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-300 bg-[#f2f2f2] p-0">
              <div className="border-b border-slate-300 px-6 py-4">
                <h3 className="text-[2rem] font-light text-slate-900">Tarjeta de crédito o débito</h3>
              </div>

              <div className="space-y-8 p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="border-r border-slate-300 pr-6 md:pr-8">
                    <p className="text-2xl font-medium text-slate-700">Tarjetas de crédito</p>
                    <img src={creditCardsLogos} alt="Tarjetas de crédito aceptadas" className="mt-4 h-12 w-auto object-contain" />
                  </div>
                  <div>
                    <p className="text-2xl font-medium text-slate-700">Tarjetas de débito</p>
                    <img src={debitCardsLogos} alt="Tarjetas de débito aceptadas" className="mt-4 h-12 w-auto object-contain" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-base font-medium text-slate-800">Nombre del titular</label>
                    <Input
                      value={form.cardName}
                      onChange={(e) => setForm((prev) => ({ ...prev, cardName: e.target.value }))}
                      placeholder="Como aparece en la tarjeta"
                      className="rounded-none border-slate-400 bg-white text-3xl italic placeholder:text-slate-400"
                    />
                    {submitted && errors.cardName ? <p className="mt-2 text-xs text-red-600">{errors.cardName}</p> : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-base font-medium text-slate-800">Número de tarjeta</label>
                    <Input
                      value={form.cardNumber}
                      onChange={(e) => setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                      placeholder="1234 5678 9012 3456"
                      className="rounded-none border-slate-400 bg-white text-3xl"
                    />
                    {submitted && errors.cardNumber ? <p className="mt-2 text-xs text-red-600">{errors.cardNumber}</p> : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-base font-medium text-slate-800">Fecha de expiración</label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        value={form.expiryMonth}
                        onChange={(e) => setForm((prev) => ({ ...prev, expiryMonth: e.target.value.replace(/\D/g, '').slice(0, 2) }))}
                        placeholder="Mes"
                        className="rounded-none border-slate-400 bg-white text-3xl italic placeholder:text-slate-400"
                      />
                      <Input
                        value={form.expiryYear}
                        onChange={(e) => setForm((prev) => ({ ...prev, expiryYear: e.target.value.replace(/\D/g, '').slice(0, 2) }))}
                        placeholder="Año"
                        className="rounded-none border-slate-400 bg-white text-3xl italic placeholder:text-slate-400"
                      />
                    </div>
                    {submitted && (errors.expiryMonth || errors.expiryYear)
                      ? <p className="mt-2 text-xs text-red-600">Ingresa una vigencia válida.</p>
                      : null}
                  </div>

                  <div>
                    <label className="mb-2 block text-base font-medium text-slate-800">Código de seguridad</label>
                    <div className="flex items-center gap-4">
                      <Input
                        value={form.cvv}
                        onChange={(e) => setForm((prev) => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                        placeholder="3 dígitos"
                        className="rounded-none border-slate-400 bg-white text-3xl italic placeholder:text-slate-400"
                      />
                      <img src={helpersImage} alt="Ayuda para código de seguridad" className="h-14 w-auto object-contain" />
                    </div>
                    {submitted && errors.cvv ? <p className="mt-2 text-xs text-red-600">{errors.cvv}</p> : null}
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-300 pt-5 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm text-slate-600">Tus pagos se realizan de forma segura con encriptación de 256 bits.</p>
                  <button
                    type="submit"
                    disabled={isProcessingPayment || canContinueAfterPayment}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-8 py-3 text-xl font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
                  >
                    {isProcessingPayment ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/50 border-t-white" />
                        Procesando...
                      </>
                    ) : canContinueAfterPayment ? 'Procesado' : 'Pagar'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={form.accepted}
                onChange={(e) => setForm((prev) => ({ ...prev, accepted: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-slate-300"
              />
              <span>Acepto el aviso de privacidad y autorizo la programación de cargos o generación de referencia para esta póliza.</span>
            </label>
            {submitted && errors.accepted ? <p className="mt-2 text-xs text-red-600">{errors.accepted}</p> : null}
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-slate-700">
            {isDeposit
              ? 'La referencia podrá utilizarse para registrar el pago y continuar con la emisión de la póliza.'
              : 'La tarjeta deberá permanecer disponible para los cargos programados conforme a la forma de pago seleccionada.'}
          </div>

          {!isDeposit && canContinueAfterPayment ? (
            <div className="flex justify-end border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={() => onNext(buildPayload())}
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] hover:bg-cyan-600"
              >
                Ver mis polizas
              </button>
            </div>
          ) : null}

          {isDeposit ? (
            <div className="flex justify-end border-t border-slate-200 pt-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] hover:bg-cyan-600"
              >
                Programar pago
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </Shell>
  );
}
