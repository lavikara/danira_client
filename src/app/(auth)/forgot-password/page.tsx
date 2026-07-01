"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell, AuthButton } from "@/components/auth/auth-shell";
import { cn } from "@/utils/helpers";

type Step = "request" | "verify" | "new-password" | "done";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleOtp = (val: string, idx: number) => {
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const titles: Record<Step, { title: string; subtitle: string }> = {
    request: {
      title: "Reset your password",
      subtitle: "Enter your school admin email and we'll send a reset code",
    },
    verify: {
      title: "Check your inbox",
      subtitle: `We sent a 6-digit code to ${email || "your email"}`,
    },
    "new-password": {
      title: "Create new password",
      subtitle: "Your new password must be different from previous ones",
    },
    done: {
      title: "Password updated!",
      subtitle: "You can now sign in with your new password",
    },
  };

  return (
    <AuthShell title={titles[step].title} subtitle={titles[step].subtitle}>
      {/* ── Step: Request ── */}
      {step === "request" && (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setStep("verify");
          }}
        >
          <div>
            <label
              htmlFor="reset_email"
              className="mb-1.5 block text-[12.5px] font-semibold text-t2"
            >
              Email address
            </label>
            <input
              id="reset_email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@school.edu.ng"
              autoComplete="email"
              className="w-full rounded-[9px] border-[1.5px] border-border bg-bg px-3.5 py-2.5 text-[13.5px] text-t1 placeholder:text-t3 outline-none transition-all focus:border-primary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]"
            />
          </div>

          <AuthButton>
            <i className="bi bi-envelope mr-1.5" />
            Send Reset Code
          </AuthButton>

          <Link
            href="/login"
            className="flex items-center justify-center gap-1.5 rounded-[9px] border border-border bg-surface py-2.5 text-[13.5px] font-semibold text-t2 transition-all hover:border-primary hover:text-primary"
          >
            <i className="bi bi-arrow-left" />
            Back to sign in
          </Link>
        </form>
      )}

      {/* ── Step: OTP verify ── */}
      {step === "verify" && (
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setStep("new-password");
          }}
        >
          {/* OTP boxes */}
          <div className="flex justify-center gap-2.5">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtp(e.target.value, i)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !digit && i > 0) {
                    document.getElementById(`otp-${i - 1}`)?.focus();
                  }
                }}
                className={cn(
                  "h-12 w-12 rounded-[9px] border-[1.5px] border-border bg-bg text-center text-[18px] font-bold text-t1",
                  "outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]",
                  digit && "border-primary bg-primary/5",
                )}
              />
            ))}
          </div>

          <p className="text-center text-[12.5px] text-t3">
            Didn&apos;t receive a code?{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => setOtp(["", "", "", "", "", ""])}
            >
              Resend
            </button>
          </p>

          <AuthButton>
            <i className="bi bi-shield-check mr-1.5" />
            Verify Code
          </AuthButton>

          <button
            type="button"
            onClick={() => setStep("request")}
            className="flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-t3 hover:text-t2"
          >
            <i className="bi bi-arrow-left" />
            Change email address
          </button>
        </form>
      )}

      {/* ── Step: New Password ── */}
      {step === "new-password" && (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setStep("done");
          }}
        >
          <div>
            <label
              htmlFor="pw"
              className="mb-1.5 block text-[12.5px] font-semibold text-t2"
            >
              New password
            </label>
            <div className="relative">
              <input
                id="pw"
                type={showPw ? "text" : "password"}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                className="w-full rounded-[9px] border-[1.5px] border-border bg-bg px-3.5 py-2.5 pr-10 text-[13.5px] text-t1 placeholder:text-t3 outline-none transition-all focus:border-primary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPw((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[16px] text-t3 hover:text-t2"
              >
                <i className={showPw ? "bi bi-eye-slash" : "bi bi-eye"} />
              </button>
            </div>
            {/* Strength bar */}
            <div className="mt-2 flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[3px] flex-1 rounded-full bg-border"
                />
              ))}
            </div>
            <p className="mt-1 text-[11px] text-t3">
              Must be 8+ characters with a number and special character
            </p>
          </div>

          <div>
            <label
              htmlFor="confirm_pw"
              className="mb-1.5 block text-[12.5px] font-semibold text-t2"
            >
              Confirm new password
            </label>
            <div className="relative">
              <input
                id="confirm_pw"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full rounded-[9px] border-[1.5px] border-border bg-bg px-3.5 py-2.5 pr-10 text-[13.5px] text-t1 placeholder:text-t3 outline-none transition-all focus:border-primary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[16px] text-t3 hover:text-t2"
              >
                <i className={showConfirm ? "bi bi-eye-slash" : "bi bi-eye"} />
              </button>
            </div>
          </div>

          <AuthButton>
            <i className="bi bi-lock-fill mr-1.5" />
            Set New Password
          </AuthButton>
        </form>
      )}

      {/* ── Step: Done ── */}
      {step === "done" && (
        <div className="flex flex-col items-center gap-5 py-2">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green/10">
            <i className="bi bi-check2-circle text-[36px] text-green" />
          </div>
          <div className="w-full rounded-[9px] border border-dashed border-green/30 bg-green/5 px-4 py-3 text-center">
            <p className="text-[12.5px] text-green-text">
              Your password has been updated. Use your new credentials to sign
              in.
            </p>
          </div>
          <Link
            href="/login"
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-[9px] bg-primary py-2.5",
              "text-[14px] font-bold text-white shadow-[0_3px_12px_rgba(37,99,235,.3)]",
              "transition-all hover:-translate-y-px hover:bg-primary-700",
            )}
          >
            <i className="bi bi-arrow-right" />
            Go to Sign In
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
