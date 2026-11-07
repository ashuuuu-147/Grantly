import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Badge } from '../ui';

export const LandingFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Is GRANTLY completely free for students to use?',
      a: 'Yes, 100%. GRANTLY will never charge students application fees, subscription costs, or commissions on funding won. Our mission is to make higher education funding completely accessible.',
    },
    {
      q: 'How does the Eligibility Matching Engine work?',
      a: 'Our client-side matching engine compares your current GPA, field of study, enrolled degree level, and household income against the mandatory criteria set by scholarship providers. It categorizes matches into Direct Matches, Possible Matches, and Highlights Missing Criteria.',
    },
    {
      q: 'Does GRANTLY submit applications on my behalf?',
      a: 'No. GRANTLY is an intelligent preparation and tracking workspace. We provide verified official links, requirement checklists, and deadline notifications so you can submit official applications directly through verified provider portals.',
    },
    {
      q: 'Is my personal information stored or sold?',
      a: 'Never. In this version of GRANTLY, all student data, bookmarks, and application tracking states live exclusively in your local browser storage (HTML5 LocalStorage). No backend database or tracking scripts are deployed.',
    },
    {
      q: 'Can high school seniors use GRANTLY?',
      a: 'Yes! We actively curate high school senior scholarships and collegiate transition grants designed for incoming undergraduate freshmen.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-[var(--border)]" aria-labelledby="faq-section-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <Badge variant="coral">Common Questions</Badge>
          <h2 id="faq-section-heading" className="heading-section text-[var(--text-primary)]">
            Frequently Asked Questions
          </h2>
          <p className="text-body text-[var(--text-secondary)]">
            Everything you need to know about our scholarship intelligence platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headerId = `faq-header-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all"
              >
                <h3 className="text-base font-semibold m-0 p-0">
                  <button
                    type="button"
                    id={headerId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors hover:bg-[var(--surface-secondary)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="heading-card text-base text-[var(--text-primary)] pr-4 font-bold">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[var(--primary)]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingFaq;
