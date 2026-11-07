import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Award, Info } from 'lucide-react';
import { Badge, BaseCard } from '../ui';

export const LandingTestimonials = () => {
  const testimonials = [
    {
      quote:
        'Finding scholarships used to feel like searching through needle stacks of spam. GRANTLY matched me with the Turing Fellowship in my junior year, covering my final two semesters completely.',
      author: 'Marcus Vance',
      program: 'B.S. Computer Science & AI',
      institution: 'Carnegie Mellon University',
      awardWon: '$50,000 Turing Fellow',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        'The document checklist and deadline countdown stopped me from missing my reference letters deadline. It gave me the structure I needed as a first-generation graduate student.',
      author: 'Elena Rostova',
      program: 'M.S. Environmental Policy',
      institution: 'Columbia University',
      awardWon: '$35,000 Meridian Grant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        'The eligibility checker pointed out two prerequisites I was missing before I started writing my essay, saving me weeks of work on applications I would not qualify for.',
      author: 'David O\'Connor',
      program: 'Doctoral Candidate, Clean Energy',
      institution: 'UC Berkeley',
      awardWon: '$40,000 Vanguard Award',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[var(--surface-secondary)]/25 border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="gold">
            <Sparkles className="h-3 w-3 mr-1" /> Student Scholar Stories
          </Badge>
          <h2 className="heading-section text-[var(--text-primary)]">
            Empowering Academic Ambitions
          </h2>
          <p className="text-body text-[var(--text-secondary)]">
            How students utilize GRANTLY's structured workflow to target, manage, and secure premier educational funding.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] text-[11px] font-semibold text-[var(--text-muted)] border border-[var(--border)]">
            <Info className="h-3.5 w-3.5 text-[var(--coral)]" />
            <span>Fictional Demonstration Profiles &bull; Illustrating typical student workflows</span>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <BaseCard hover className="h-full flex flex-col justify-between p-7">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote className="h-8 w-8 text-[var(--coral)]/40" />
                    <span className="text-xs font-bold text-[var(--success)] bg-[#EAF5F0] px-2.5 py-1 rounded-full">
                      {t.awardWon}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-[var(--coral)]/30"
                  />
                  <div>
                    <h4 className="heading-card text-sm text-[var(--text-primary)]">
                      {t.author}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)]">{t.program}</p>
                    <p className="text-[11px] font-semibold text-[var(--primary)]">{t.institution}</p>
                  </div>
                </div>
              </BaseCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingTestimonials;

