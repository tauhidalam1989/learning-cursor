// Bare layout — no header, no footer, no marketing chrome.
// All routes inside (standalone) render as full-page standalone experiences.
export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
