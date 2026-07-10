'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { post } from '@/app/api/apiClient';
import { ForgotPasswordFormData } from '@/types/definitions';
import { AuthShell, AuthButton, AuthInput, AuthPageToast } from '@/components/auth/auth-shell';
import { useToastContext } from '@/contexts/toast-context';

export default function ResetPasswordPage() {
  const [forgotPasswordFormData, setForgotPasswordFormData] = useState<ForgotPasswordFormData>({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const router = useRouter();
  const { error } = useToastContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForgotPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    setLoading(true);
    const response = await post('/api/auth/forgotPassword', forgotPasswordFormData);
    if (response.success) {
      setLoading(false);
      setDone(true);
    } else {
      setLoading(false);
      error('Request failed', {
        description: response.error,
      });
    }
  };

  if (done) {
    return (
      <AuthPageToast
        title="Request successful"
        subtitle="A reset link has been sent to your email."
        message="Please check your email for the reset link and follow the instructions to set a new password."
        cta={{ href: '/login', title: 'Go to Sign In' }}
      />
    );
  }

  return (
    <AuthShell
      title="Forgot your password ?"
      subtitle="Enter your school admin email and we'll send a reset link."
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div>
          <AuthInput
            label="Email address"
            id="email"
            type="email"
            placeholder="admin@school.edu.ng"
            value={forgotPasswordFormData.email}
            onChange={handleInputChange}
          />
        </div>

        <AuthButton loading={loading}>
          <i className="bi bi-envelope mr-1.5" />
          Send Reset Link
        </AuthButton>

        <AuthButton
          ghost={true}
          className="flex items-center justify-center gap-1.5 rounded-[9px] border border-border bg-surface py-2.5 text-[13.5px] font-semibold text-t2 transition-all hover:border-primary hover:text-primary"
          onClick={() => router.push('/login')}
        >
          <i className="bi bi-arrow-left" />
          Back to sign in
        </AuthButton>
      </form>
    </AuthShell>
  );
}
