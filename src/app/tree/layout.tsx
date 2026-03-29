import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full Family Tree - Arap Taa Family Legacy',
  description: 'Explore the complete interactive family tree of the Arap Taa family with all three houses.',
};

export default function TreeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
