import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 text-4xl text-primary">
        <i className="bi bi-signpost-split" />
      </div>
      <div className="text-[64px] font-extrabold leading-none text-t1">404</div>
      <h1 className="mt-2 text-[19px] font-bold text-t1">Page not found</h1>
      <p className="mt-2 max-w-[380px] text-[13.5px] text-t2">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved. Check the URL or head back to the dashboard.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-[9px] bg-primary px-4 py-2 text-[13px] font-semibold text-white shadow-[0_3px_10px_rgba(37,99,235,0.28)] transition-all hover:bg-primary-700 hover:-translate-y-px"
      >
        <i className="bi bi-house-fill" />
        Back to Dashboard
      </Link>
    </div>
  );
}
