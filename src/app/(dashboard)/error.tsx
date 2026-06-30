"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-bg text-4xl text-red">
        <i className="bi bi-exclamation-triangle-fill" />
      </div>
      <h1 className="text-[19px] font-bold text-t1">Something went wrong</h1>
      <p className="mt-2 max-w-[400px] text-[13.5px] text-t2">
        An unexpected error occurred while loading this page. You can try
        again, or head back to the dashboard.
      </p>
      {error?.message && (
        <code className="mt-3 max-w-[420px] truncate rounded-md bg-border-light px-3 py-1.5 text-[11.5px] text-t3">
          {error.message}
        </code>
      )}
      <div className="mt-6 flex gap-2.5">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-1.5 rounded-[9px] bg-primary px-4 py-2 text-[13px] font-semibold text-white shadow-[0_3px_10px_rgba(37,99,235,0.28)] transition-all hover:bg-primary-700 hover:-translate-y-px"
        >
          <i className="bi bi-arrow-clockwise" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-[9px] border border-border bg-surface px-4 py-2 text-[13px] font-semibold text-t2 transition-all hover:border-primary hover:text-primary"
        >
          <i className="bi bi-house-fill" />
          Dashboard
        </Link>
      </div>
    </div>
  );
}
