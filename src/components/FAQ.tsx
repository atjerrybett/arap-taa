'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How can I add my family members to the tree?',
    answer: 'The digital archive is currently being curated to ensure accuracy. New members can be added by contacting the family archivists with documentation and details.',
  },
  {
    question: 'Is my privacy protected?',
    answer: 'Yes, we respect family privacy. Only information explicitly shared is displayed. Birth and death dates are shown only where appropriate.',
  },
  {
    question: 'How do I trace my lineage?',
    answer: 'Use the search function to find your name, then explore the family tree. Click on any person to see their connections to parents, siblings, and children.',
  },
  {
    question: 'Can I see the path to any family member?',
    answer: 'Yes! Use the "Highlight Path" feature on the Full Tree page to visualize the direct lineage between any two family members.',
  },
  {
    question: 'What does each "House" mean?',
    answer: 'The three houses represent the three marriages of Arap Taa. Each house has its own branch of descendants and its own unique identity.',
  },
  {
    question: 'How often is the family tree updated?',
    answer: 'The tree is updated regularly as new information is verified and added. Check back often to see recent additions to your family branches.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-earth-200 dark:border-earth-700 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 hover:bg-earth-50 dark:hover:bg-earth-800 transition-colors text-left"
          >
            <h3 className="font-semibold text-earth-900 dark:text-earth-100 pr-4">
              {faq.question}
            </h3>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-earth-400 flex-shrink-0" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 text-earth-600 dark:text-earth-400 border-t border-earth-200 dark:border-earth-700">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
