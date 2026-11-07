import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Search, Sliders, CheckSquare, ArrowRight } from 'lucide-react';
import { Badge } from '../ui';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export const LandingHowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description:
        'Input your major, current GPA, degree level, and financial background in under 60 seconds with 100% client privacy.',
      icon: UserCheck,
      action: 'Set up Profile',
      link: ROUTES.PROFILE,
    },
    {
      number: '02',
      title: 'Discover Scholarships',
      description:
        'Explore vetted grants and corporate fellowships with transparent award values, verified deadlines, and no spam traps.',
      icon: Search,
      action: 'Browse Grants',
      link: ROUTES.EXPLORE,
    },
    {
      number: '03',
      title: 'Check Your Eligibility',
      description:
        'Our local criteria engine evaluates your baseline qualifications, calculating probability scores and missing prerequisites.',
      icon: Sliders,
      action: 'Test Eligibility',
      link: ROUTES.ELIGIBILITY,
    },
    {
      number: '04',
      title: 'Track Your Applications',
      description:
        'Manage document checklists, record faculty letters of recommendation, and stay ahead of countdown deadlines.',
      icon: CheckSquare,
      action: 'Open Tracker',
      link: ROUTES.APPLICATIONS,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-b border-[var(--border)] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <Badge variant="coral">Simple 4-Step Process</Badge>
          <h2 className="heading-section text-[var(--text-primary)]">
            How GRANTLY Works
          </h2>
          <p className="text-body text-[var(--text-secondary)]">
            A structured, transparent pathway from discovering funding to submitting polished scholarship applications.
          </p>
        </div>

        {/* 4 Steps Grid with connecting visual indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                className="relative flex flex-col justify-between p-6 sm:p-7 rounded-[var(--radius-xl)] glass-card hover:-translate-y-1.5 transition-all group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-extrabold text-2xl text-[var(--primary)] font-mono">
                      {step.number}
                    </span>
                    <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--peach-tint)] text-[var(--primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="heading-card text-base text-[var(--text-primary)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)]">
                  <Link
                    to={step.link}
                    className="inline-flex items-center text-xs font-semibold text-[var(--primary)] hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    {step.action} <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingHowItWorks;

