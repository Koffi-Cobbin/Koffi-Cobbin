export default function Footer() {
  return (
    <footer className="border-t border-line mt-12">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-8">
        <div className="text-sm font-medium text-muted">
          © {new Date().getFullYear()}. Built with React & Vite.
        </div>
        <div className="text-xs text-muted/70 uppercase tracking-widest font-medium">
          Working across boundaries
        </div>
      </div>
    </footer>
  );
}