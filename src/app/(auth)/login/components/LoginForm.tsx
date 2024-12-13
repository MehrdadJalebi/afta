import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { YBtn, YInput } from 'src/components/UI';
import { mutateService } from '@/api';
import { phoneNumberValidation, toastError } from '@/utils';

interface Props {
  isLandingForm?: boolean;
  onSubmitForm: (data: any) => void;
}

export function LoginForm({ onSubmitForm, isLandingForm }: Props) {
  const [isTermsAndConditionOpen, setIsTermsAndConditionOpen] = useState(false);
  const { mutateAsync, isPending } = useMutation(mutateService( 'afta','post', '/api/afta/v1/Accounts/otp-request'));

  const methods = useForm<any>({
    defaultValues: {
      phoneNumber: '',
    },
    mode: 'onChange',
  });

  function submitForm(data: any) {
    mutateAsync({
      body: {
        cellphone: data.phoneNumber,
        nationalCode: '',
        captchaInputText: '',
        captchaText: '',
        captchaToken: '',
      },
    })
      .then(() => onSubmitForm(data))
      .catch(({ message }) => toastError(message));
  }

  return (
    <div className="w-100" data-testid="login-form">
      <div className="text-primary">
        {!isLandingForm && <h6 className="fw-bold">به یکتاپی خوش آمدید.</h6>}
        <div className="fs-7">
          {isLandingForm
            ? 'جهت پرداخت اقساطی با یکتاپی، شماره همراه خود را وارد کنید.'
            : 'برای ثبت‌نام یا ورود به یکتاپی، شماره همراه خود را وارد کنید.'}
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="mt-6" onSubmit={methods.handleSubmit(submitForm)}>
          <YInput
            name="phoneNumber"
            label="شماره همراه"
            rules={{
              required: 'شماره همراه الزامی ست',
              validate: phoneNumberValidation,
            }}
            placeholder="مثال:09121234567"
            isNumber
            maxLength={11}
          />

          <YBtn data-testid="send-otp-btn" loading={isPending} variant="primary" type="submit" className="w-100">
            دریافت رمز یک‌بار مصرف
          </YBtn>
        </form>
        <div className="text-center mt-6">
          ورود و ثبت‌نام، به معنای پذیرش{' '}
          <span
            data-testid="terms-link"
            onClick={() => setIsTermsAndConditionOpen(true)}
            className="fw-bold text-primary text-decoration-none cursor-pointer"
          >
            قوانین و مقررات
          </span>{' '}
          یکتاپی است.
        </div>
      </FormProvider>
    </div>
  );
}
