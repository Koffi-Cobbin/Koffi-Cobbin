export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted">
        © {new Date().getFullYear()}. Built with Next.js and Django.
      </div>
    </footer>
  );
}
