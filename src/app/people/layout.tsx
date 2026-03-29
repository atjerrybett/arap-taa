import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'People Directory - Arap Taa Family Legacy',
  description: 'Browse all members of the Arap Taa family with profiles and relationships.',
};

export default function PeopleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
