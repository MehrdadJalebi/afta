'use client';

import { css } from '@emotion/react';
import { useState } from 'react';

import { OTPForm } from 'src/app/(auth)/components/OTPForm';
import { themeColors, themeVariables } from 'src/styles/bootstrap/variables';

import { LoginForm } from './LoginForm';

interface Props {
  orderRequestId?: string;
  isLandingForm?: boolean;
}

export function Login({ isLandingForm, orderRequestId }: Props) {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [formData, setFormData] = useState<any>({ phoneNumber: '' });

  function handleSubmitForm(data: any) {
    setStep('otp');
    setFormData(data);
  }

  return (
    <>
      {!isLandingForm && (
        <div css={yektapayLogo} data-testid="yektapay-logo">
          جای لوگو
        </div>
      )}
      <div css={formContainer}>
        {step === 'form' ? (
          <LoginForm onSubmitForm={handleSubmitForm} />
        ) : (
          <OTPForm
            phoneNumber={formData.phoneNumber}
            onReturnToForm={() => setStep('form')}
          />
        )}
      </div>
      <div css={supportInfoContainer}>
        <div>در دریافت رمز یک‌بار مصرف مشکلی دارید؟ با پشتیبان ما تماس بگیرید:</div>
        <div className="supportTelContainer">
          <span>ساعت پاسخگویی: 9 تا 18</span>
          <span>
            <a href="tel:02191071040">021-91071040</a> | <a href="tel:02191094545">021-91094545</a> (داخلی 9)
          </span>
        </div>
      </div>
    </>
  );
}

const yektapayLogo = css`
  display: flex;
  align-items: center;

  &::before {
    content: ' ';
    display: block;
    margin-left: 0.75rem;
    width: 32px;
    height: 2px;
    background-color: ${themeColors.primary};
  }
`;

const formContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 2rem 0;
`;
const landingFormContainer = css`
  @media (max-width: ${themeVariables.breakpoints.sm}) {
    height: unset;
    background-color: red;
    margin: 0.5rem 0 0 0;
    padding: 1.25rem;
  }
`;

const supportInfoContainer = css`
  padding: 1.25rem 1.25rem 0;
  text-align: center;
  color: ${themeColors.primary};
  border-top: 2px dashed ${themeColors.gray_400};

  .supportTelContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;

    @media (max-width: ${themeVariables.breakpoints.sm}) {
      flex-direction: column;
      text-align: center;
    }
  }
`;
