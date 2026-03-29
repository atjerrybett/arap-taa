import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About the Legacy - Arap Taa Family Legacy',
  description: 'Learn about the Arap Taa family heritage, our mission, and how to explore your family tree.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
