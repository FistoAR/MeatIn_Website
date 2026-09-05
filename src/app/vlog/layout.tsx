import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vlog - Coming Soon | MEATiN',
  description: 'This page is coming soon. Stay tuned for MEATiN Vlog!',
};

export default function VlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
