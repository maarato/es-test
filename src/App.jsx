import React, { useState } from 'react';
import Screen1Cotizar from './components/Screen1Cotizar';
import Screen2Comparar from './components/Screen2Comparar';
import Screen3Registro from './components/Screen3Registro';
import Screen4Resumen from './components/Screen4Resumen';
import Screen5Pago from './components/Screen5Pago';
import Screen6MisPolizas from './components/Screen6MisPolizas';
import Screen7SolicitudCancelacion from './components/Screen7SolicitudCancelacion';
import Screen8ConfirmacionCancelacion from './components/Screen8ConfirmacionCancelacion';
import Screen9CalendarioCobro from './components/Screen9CalendarioCobro';

export default function App() {
  const [step, setStep] = useState(1);
  const [quoteData, setQuoteData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [cancellationData, setCancellationData] = useState(null);

  if (step === 1) {
    return (
      <Screen1Cotizar
        onNext={(form) => {
          setQuoteData(form);
          setStep(2);
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <Screen2Comparar
        onBack={() => setStep(1)}
        onSelect={(option) => {
          setSelectedOption(option);
          setStep(3);
        }}
      />
    );
  }

  if (step === 3) {
    return (
      <Screen3Registro
        selectedOption={selectedOption}
        onBack={() => setStep(2)}
        onNext={(form) => {
          setRegistrationData(form);
          setStep(4);
        }}
      />
    );
  }

  if (step === 4) {
    return (
      <Screen4Resumen
        quoteData={quoteData}
        selectedOption={selectedOption}
        registrationData={registrationData}
        onBack={() => setStep(3)}
        onNext={() => setStep(5)}
      />
    );
  }

  if (step === 5) {
    return (
      <Screen5Pago
        quoteData={quoteData}
        selectedOption={selectedOption}
        registrationData={registrationData}
        onBack={() => setStep(4)}
        onNext={(form) => {
          setPaymentData(form);
          setStep(6);
        }}
      />
    );
  }



  if (step === 6) {
    return (
      <Screen6MisPolizas
        quoteData={quoteData}
        selectedOption={selectedOption}
        registrationData={registrationData}
        paymentData={paymentData}
        onBack={() => setStep(5)}
        onNext={() => setStep(7)}
      />
    );
  }


  if (step === 7) {
    return (
      <Screen7SolicitudCancelacion
        quoteData={quoteData}
        selectedOption={selectedOption}
        registrationData={registrationData}
        paymentData={paymentData}
        onBack={() => setStep(6)}
        onNext={(form) => {
          setCancellationData(form);
          setStep(8);
        }}
      />
    );
  }

  if (step === 8) {
    return (
      <Screen8ConfirmacionCancelacion
        quoteData={quoteData}
        selectedOption={selectedOption}
        registrationData={registrationData}
        cancellationData={cancellationData}
        onBack={() => setStep(7)}
        onNext={() => setStep(9)}
        onRestart={() => {
          setStep(1);
          setQuoteData(null);
          setSelectedOption(null);
          setRegistrationData(null);
          setPaymentData(null);
          setCancellationData(null);
        }}
      />
    );
  }

  if (step === 9) {
    return (
      <Screen9CalendarioCobro
        paymentData={paymentData}
        onBack={() => setStep(8)}
        onRestart={() => {
          setStep(1);
          setQuoteData(null);
          setSelectedOption(null);
          setRegistrationData(null);
          setPaymentData(null);
          setCancellationData(null);
        }}
      />
    );
  }

  return null;
}
