'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginFormData } from '@/types/definitions';
import { loginAction } from '../actions/authActions';
import { useToastContext } from '@/contexts/toast-context';
import { AuthShell, AuthInput, AuthButton, AuthDivider } from '@/components/auth/auth-shell';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginFormData, setFormData] = useState<LoginFormData>({ email: '', password: '' });

  const router = useRouter();
  const { success, error } = useToastContext();

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginFormData),
    });

    const signedIn = await res.json();
    console.log(signedIn);

    // const signedIn = await loginAction(loginFormData);
    if (signedIn.success) {
      setLoading(false);
      success('Login successful', {
        description: `Welcome back, ${signedIn.data.user.firstName} ${signedIn.data.user.lastName}.`,
      });
      router.push('/');
    } else {
      setLoading(false);
      error('Login failed', {
        description: signedIn.message,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <AuthShell title="Welcome" subtitle="Sign in to your EduAdmin Pro account">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <AuthInput
          label="Email address"
          id="email"
          type="email"
          placeholder="admin@school.edu.ng"
          value={loginFormData.email}
          onChange={handleInputChange}
        />

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-[12.5px] font-semibold text-t2">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[12.5px] font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-[9px] border-[1.5px] border-border bg-bg px-3.5 py-2.5 pr-10 text-[13.5px] text-t1 placeholder:text-t3 outline-none transition-all duration-150 focus:border-primary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]"
              value={loginFormData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((show) => !show)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[16px] text-t3 hover:text-t2"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-border accent-primary"
          />
          <label htmlFor="remember" className="text-[12.5px] text-t2 cursor-pointer">
            Keep me signed in
          </label>
        </div>

        <AuthButton loading={loading}>
          <span className="flex items-center justify-center gap-2">Sign In</span>
        </AuthButton>
      </form>

      <AuthDivider />

      {/* SSO option */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2.5 rounded-[9px] border-[1.5px] border-border bg-surface py-2.5 text-[13.5px] font-semibold text-t1 transition-all duration-150 hover:border-primary hover:bg-primary/5"
      >
        <i className="bi bi-google text-[16px]" />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-[12.5px] text-t2">
        New school?{' '}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>

      {/* Demo hint */}
      <div className="mt-5 rounded-[9px] border border-dashed border-border bg-surface-2 px-4 py-3">
        <p className="text-[11.5px] font-semibold text-t2">Demo credentials</p>
        <p className="mt-0.5 text-[11.5px] text-t3">
          Email: <span className="font-mono text-t2">admin@demo.edu.ng</span>
        </p>
        <p className="text-[11.5px] text-t3">
          Password: <span className="font-mono text-t2">Demo@1234</span>
        </p>
      </div>
    </AuthShell>
  );
}
