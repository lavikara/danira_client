'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import countryRegionData from '@/utils/countryRegionData.js';
import { cn } from '@/utils/helpers';
import { useToastContext } from '@/contexts/toast-context';
import { generateUsernames } from '@/utils/helpers';
import { SignupFormData } from '@/types/definitions';
import { postMethod } from '@/app/api/apiClient';
import {
  AuthShell,
  AuthInput,
  AuthSelectInput,
  AuthButton,
  AuthPageToast,
} from '@/components/auth/auth-shell';

const STEPS = ['School Info', 'Admin Info'] as const;

const schoolTypes = ['PRIMARY', 'SECONDARY', 'TERTIARY'];

const schoolSetup = ['SINGLE', 'GROUP'];

const gender = ['FEMALE', 'MALE'];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [enterUserName, setEnterUserName] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestUserName, setSuggestUserName] = useState<string[]>([]);
  const [signupFormData, setFormData] = useState<SignupFormData>({
    schoolData: {
      schoolName: '',
      email: '',
      type: '',
      setup: '',
      address: '',
      country: '',
      state: '',
      phoneNumber: '',
      termsConditions: false,
    },
    groupData: {
      groupName: '',
    },
    adminData: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      country: '',
      state: '',
      address: '',
      gender: '',
      phoneNumber: '',
    },
  });

  const { error } = useToastContext();

  const countryList = () => {
    const list: string[] = [];
    countryRegionData.map((countryObj) => {
      list.push(countryObj.countryName);
    });
    return list;
  };

  const schoolStateList = () => {
    for (const countryObj of countryRegionData) {
      if (countryObj.countryName === signupFormData.schoolData.country) {
        return countryObj.regions.map((region) => region.name);
      }
    }
    return [];
  };

  const adminStateList = () => {
    for (const countryObj of countryRegionData) {
      if (countryObj.countryName === signupFormData.adminData.country) {
        return countryObj.regions.map((region) => region.name);
      }
    }
    return [];
  };

  useEffect(() => {
    if (
      signupFormData.adminData.firstName.trim() &&
      signupFormData.adminData.lastName.trim() &&
      signupFormData.schoolData.schoolName.trim()
    ) {
      const results = generateUsernames({
        firstName: signupFormData.adminData.firstName,
        lastName: signupFormData.adminData.lastName,
        schoolName: signupFormData.schoolData.schoolName,
      });
      const nextStr = JSON.stringify(results || []);
      const prevStr = JSON.stringify(suggestUserName || []);
      if (prevStr !== nextStr) {
        const t = setTimeout(() => setSuggestUserName(results), 0);
        return () => clearTimeout(t);
      }
    } else {
      if ((suggestUserName || []).length !== 0) {
        const t = setTimeout(() => setSuggestUserName([]), 0);
        return () => clearTimeout(t);
      }
    }
  }, [
    signupFormData.adminData.firstName,
    signupFormData.adminData.lastName,
    signupFormData.schoolData.schoolName,
    suggestUserName,
  ]);

  const handleToggle = (data: boolean) => {
    setEnterUserName(data);
  };

  const handleSubmit = async () => {
    if (signupFormData.schoolData.setup === 'SINGLE') {
      signupFormData.groupData.groupName = null;
    }
    setLoading(true);
    const signedUp = await postMethod('/api/auth/signup', signupFormData);
    if (signedUp.success) {
      setLoading(false);
      setDone(true);
    } else {
      setLoading(false);
      error('Signup failed', {
        description: `${signedUp.error} school already exists.`,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      switch (name) {
        case 'school_name':
          return {
            ...prev,
            schoolData: { ...prev.schoolData, schoolName: value },
          };
        case 'school_email':
          return {
            ...prev,
            schoolData: { ...prev.schoolData, email: value },
            adminData: { ...prev.adminData, email: value },
          };
        case 'phone':
          return {
            ...prev,
            schoolData: { ...prev.schoolData, phoneNumber: value },
          };
        case 'country':
          return {
            ...prev,
            schoolData: { ...prev.schoolData, country: value },
          };
        case 'state':
          return {
            ...prev,
            schoolData: { ...prev.schoolData, state: value },
          };
        case 'school_address':
          return {
            ...prev,
            schoolData: { ...prev.schoolData, address: value },
          };
        case 'school_type':
          return {
            ...prev,
            schoolData: { ...prev.schoolData, type: value },
          };
        case 'school_setup':
          return {
            ...prev,
            schoolData: { ...prev.schoolData, setup: value },
          };
        case 'terms_conditions':
          return {
            ...prev,
            schoolData: {
              ...prev.schoolData,
              termsConditions: (e.target as HTMLInputElement).checked,
            },
          };
        case 'school_group_name':
          return {
            ...prev,
            groupData: { ...prev.groupData, groupName: value },
          };
        case 'first_name':
          return {
            ...prev,
            adminData: { ...prev.adminData, firstName: value },
          };
        case 'last_name':
          return {
            ...prev,
            adminData: { ...prev.adminData, lastName: value },
          };
        case 'user_name':
          return {
            ...prev,
            adminData: { ...prev.adminData, username: value },
          };
        case 'suggested_user_name':
          return {
            ...prev,
            adminData: { ...prev.adminData, username: value },
          };
        case 'admin_country':
          return {
            ...prev,
            adminData: { ...prev.adminData, country: value },
          };
        case 'admin_state':
          return {
            ...prev,
            adminData: { ...prev.adminData, state: value },
          };
        case 'admin_address':
          return {
            ...prev,
            adminData: { ...prev.adminData, address: value },
          };
        case 'gender':
          return {
            ...prev,
            adminData: { ...prev.adminData, gender: value },
          };
        case 'admin_phone':
          return {
            ...prev,
            adminData: { ...prev.adminData, phoneNumber: value },
          };
        default:
          return prev;
      }
    });
  };
  if (done) {
    return (
      <AuthPageToast
        title="Signup successfully!"
        subtitle="Our team will review your request and get back to you shortly."
        message="Your request is under review. We will notify you once it's approved. Feel free to reach out to us if you have any questions."
        cta={{ href: '/login', title: 'Go to Sign In' }}
      />
    );
  }
  return (
    <AuthShell
      title="Create your school account"
      subtitle="Set up EduAdmin Pro for your institution in minutes"
    >
      {/* Step indicator */}
      <div className="mb-7 flex items-center justify-center gap-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <div
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-200',
                i < step
                  ? 'bg-green text-white'
                  : i === step
                    ? 'bg-primary text-white shadow-[0_2px_8px_rgba(37,99,235,.4)]'
                    : 'bg-surface-2 text-t3',
              )}
            >
              {i < step ? <i className="bi bi-check2 text-[12px]" /> : i + 1}
            </div>
            <span
              className={cn(
                'text-center text-[10px] font-semibold leading-tight',
                i === step ? 'text-primary' : 'text-t3',
              )}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      {/* ── Step 0: School Info ── */}
      {step === 0 && (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          <AuthInput
            label="School Name"
            id="school_name"
            placeholder="Greenfield Academy"
            value={signupFormData.schoolData.schoolName}
            onChange={handleInputChange}
          />
          <AuthInput
            label="School Email Address"
            id="school_email"
            type="email"
            placeholder="info@school.edu.ng"
            value={signupFormData.schoolData.email}
            onChange={handleInputChange}
          />

          <div className="sm:grid grid-cols-2 gap-3">
            <AuthSelectInput
              label="Country"
              id="country"
              defaultOption="Select Country"
              list={countryList()}
              value={signupFormData.schoolData.country}
              onChange={handleInputChange}
            />
            <div className="sm:hidden mt-4"></div>
            <AuthSelectInput
              label="State"
              id="state"
              defaultOption="Select State"
              list={schoolStateList()}
              value={signupFormData.schoolData.state}
              onChange={handleInputChange}
            />
          </div>
          <AuthInput
            label="School Address"
            id="school_address"
            type="text"
            placeholder="2, Danira close, Lekki, Lagos"
            value={signupFormData.schoolData.address}
            onChange={handleInputChange}
          />
          <div className="sm:grid grid-cols-2 gap-3">
            <AuthSelectInput
              label="School Type"
              id="school_type"
              defaultOption="Select School Type"
              list={schoolTypes}
              value={signupFormData.schoolData.type}
              onChange={handleInputChange}
            />
            <div className="sm:hidden mt-4"></div>
            <AuthSelectInput
              label="School Setup"
              id="school_setup"
              defaultOption="Select School Setup"
              list={schoolSetup}
              value={signupFormData.schoolData.setup}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={signupFormData.schoolData.setup === 'GROUP' ? 'grid grid-cols-2 gap-3' : ''}
          >
            <AuthInput
              label="Phone Number"
              id="phone"
              type="tel"
              placeholder="+234 803 000 0000"
              value={signupFormData.schoolData.phoneNumber}
              onChange={handleInputChange}
            />
            {signupFormData.schoolData.setup === 'GROUP' && (
              <AuthInput
                label="School Group Name"
                id="school_group_name"
                placeholder="Greenfield Group of Schools"
                value={signupFormData.groupData?.groupName}
                onChange={handleInputChange}
              />
            )}
          </div>
          <AuthButton>Continue</AuthButton>
        </form>
      )}

      {/* ── Step 1: Admin Account ── */}
      {step === 1 && (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="sm:grid grid-cols-2 gap-3">
            <AuthInput
              label="First Name"
              id="first_name"
              placeholder="Femi"
              value={signupFormData.adminData.firstName}
              onChange={handleInputChange}
            />
            <div className="sm:hidden mt-4"></div>
            <AuthInput
              label="Last Name"
              id="last_name"
              placeholder="Adegoke"
              value={signupFormData.adminData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:grid grid-cols-2 gap-3">
            <AuthInput
              label="Admin Email"
              id="admin_email"
              type="email"
              readOnly
              hint="Must be same with school email"
              value={signupFormData.adminData.email}
            />
            <div className="sm:hidden mt-4"></div>
            <AuthInput
              label="Phone Number"
              id="admin_phone"
              type="tel"
              placeholder="+234 803 000 0000"
              value={signupFormData.adminData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          {enterUserName && (
            <AuthInput
              label="User Name"
              id="user_name"
              placeholder="danira_admin"
              showToggle={true}
              hint="Toggle to sellect from suggestions"
              onToggle={handleToggle}
              value={signupFormData.adminData.username}
              onChange={handleInputChange}
            />
          )}
          {!enterUserName && (
            <AuthSelectInput
              label="User Name"
              id="suggested_user_name"
              defaultOption="Select a Suggestion"
              showCaret={false}
              showToggle={true}
              hint="Toggle to input prefered username"
              onToggle={handleToggle}
              list={suggestUserName}
              value={signupFormData.adminData.username}
              onChange={handleInputChange}
            />
          )}
          <AuthSelectInput
            label="Gender"
            id="gender"
            defaultOption="Select Gender"
            list={gender}
            value={signupFormData.adminData.gender}
            onChange={handleInputChange}
          />

          <div className="sm:grid grid-cols-2 gap-3">
            <AuthSelectInput
              label="Country"
              id="admin_country"
              defaultOption="Select Country"
              list={countryList()}
              value={signupFormData.adminData.country}
              onChange={handleInputChange}
            />
            <div className="sm:hidden mt-4"></div>
            <AuthSelectInput
              label="State"
              id="admin_state"
              defaultOption="Select State"
              list={adminStateList()}
              value={signupFormData.adminData.state}
              onChange={handleInputChange}
            />
          </div>
          <AuthInput
            label="Admin Address"
            id="admin_address"
            type="text"
            placeholder="2, Danira close, Lekki, Lagos"
            value={signupFormData.adminData.address}
            onChange={handleInputChange}
          />

          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="terms_conditions"
              name="terms_conditions"
              className="mt-0.5 h-4 w-4 accent-primary"
              required
              checked={signupFormData.schoolData.termsConditions}
              onChange={handleInputChange}
            />
            <label htmlFor="terms" className="cursor-pointer text-[12.5px] text-t2">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <div className="flex gap-3">
            <AuthButton
              onClick={() => setStep(0)}
              type="button"
              ghost={true}
              className="flex-1 border-[1.5px] border-border bg-surface text-t2 px-6 shadow-none hover:bg-surface hover:border-primary hover:text-primary"
            >
              <div className="flex">
                <i className="bi bi-arrow-left mr-1" />
                <span>Back</span>
              </div>
            </AuthButton>
            <AuthButton loading={loading}>Signup</AuthButton>
          </div>
        </form>
      )}

      <p className="mt-6 text-center text-[12.5px] text-t2">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
