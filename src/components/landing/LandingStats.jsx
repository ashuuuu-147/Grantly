import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { DollarSign, Users, Award, CheckSquare, Info } from 'lucide-react';

const Counter = ({ target, prefix = '', suffix = '', duration = 1.8 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target, 10);
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quartic
      const current = Math.round(end * (1 - Math.pow(1 - progress, 4)));
      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const LandingStats = () => {
  const stats = [
    {
      target: 150,
      suffix: '+',
      label: 'Curated Scholarships',
      description: 'Audited across STEM, Merit & Equity',
      icon: Award,
    },
    {
      target: 25000,
      prefix: '',
      suffix: '+',
      label: 'Students Exploring',
      description: 'Undergraduate, Master\'s & Ph.D.',
      icon: Users,
    },
    {
      target: 14200000,
      prefix: '$',
      suffix: '',
      label: 'Potential Aid Cataloged',
      description: 'Calculated across active cohorts',
      icon: DollarSign,
    },
    {
      target: 8400,
      suffix: '+',
      label: 'Application Milestones',
      description: 'Document steps tracked to completion',
      icon: CheckSquare,
    },
  ];

  return (
    <section className="py-16 bg-[var(--surface-secondary)]/30 border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sample Disclaimer Banner */}
        <div className="mb-8 flex items-center justify-center gap-2 text-center text-xs text-[var(--text-muted)]">
          <Info className="h-3.5 w-3.5 text-[var(--coral)] shrink-0" />
          <span>
            Demonstration Metrics &bull; Illustrative sample data reflecting target platform capacity
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] text-center sm:text-left grantly-card-shadow flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--peach-tint)] text-[var(--primary)] border border-[var(--border)]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div>
                  <Counter
                    target={item.target}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                  <h4 className="heading-card text-sm text-[var(--text-primary)] mt-1">
                    {item.label}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingStats;

