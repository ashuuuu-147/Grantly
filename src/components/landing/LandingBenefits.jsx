import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  CheckCircle,
  Calendar,
  Layers,
  Database,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Badge, BaseCard } from '../ui';

export const LandingBenefits = () => {
  const benefits = [
    {
      title: 'Personalized Discovery',
      description:
        'Stop sifting through irrelevant awards. Our multi-attribute filter matches opportunities directly to your exact degree level, major, and state residency.',
      icon: Compass,
      tag: 'Tailored Feed',
    },
    {
      title: 'Clear Eligibility Rubrics',
      description:
        'Know where you stand before writing an essay. We break down minimum GPA requirements, income limits, and eligible courses into clear checklists.',
      icon: CheckCircle,
      tag: 'Zero Guesswork',
    },
    {
      title: 'Deadline Management',
      description:
        'Visual timeline countdowns and urgency alerts ensure you never miss critical submission windows or early decision deadlines.',
      icon: Calendar,
      tag: 'Calendar Intel',
    },
    {
      title: 'Application Tracking Pipeline',
      description:
        'Kanban-style workflow keeps personal essays, recommendation letters, transcripts, and submission confirmations organized in one synchronized workspace.',
      icon: Layers,
      tag: 'Full Lifecycle',
    },
    {
      title: 'Centralized Verified Information',
      description:
        'Official provider links, authentic award amounts, and audited contact details eliminate broken links, spam traps, and deceptive contest sites.',
      icon: Database,
      tag: '100% Vetted',
    },
  ];

  return (
    <section id="benefits" className="py-20 sm:py-28 border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="coral">Student-First Architecture</Badge>
          <h2 className="heading-section text-[var(--text-primary)]">
            Built to Eliminate Friction in Higher Ed Funding
          </h2>
          <p className="text-body text-[var(--text-secondary)]">
            Every feature in GRANTLY is engineered to save students time, reduce anxiety, and maximize funding success rates.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`${i === 0 ? 'lg:col-span-2' : ''}`}
              >
                <BaseCard hover className="h-full p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--peach-tint)] text-[var(--primary)] border border-[var(--border)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="peach" size="sm">{b.tag}</Badge>
                    </div>

                    <h3 className="heading-card text-lg text-[var(--text-primary)] mb-2">
                      {b.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </BaseCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingBenefits;

