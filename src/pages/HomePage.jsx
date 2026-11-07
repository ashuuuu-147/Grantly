import React from 'react';
import {
  LandingNavbar,
  LandingHero,
  LandingWorkflowShowcase,
  LandingStats,
  LandingHowItWorks,
  LandingFeatured,
  LandingBenefits,
  LandingTestimonials,
  LandingFaq,
  LandingCta,
  LandingFooter,
} from '../components/landing';
import { ScrollReveal } from '../components/animations/ScrollAnimations';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F3]">
      {/* 1. Dynamic Landing Navbar with scroll transition & mobile drawer */}
      <LandingNavbar />

      {/* 2. High-Conversion Hero with Parallax Spheres, Mockup & Brand Logos */}
      <LandingHero />

      {/* 3. Smarter Ways to Fund Education & Why Choose Us Workflow Showcase */}
      <ScrollReveal variant="fadeUp" threshold={0.1}>
        <LandingWorkflowShowcase />
      </ScrollReveal>

      {/* 4. Demo Statistics Section with animated counter numbers */}
      <ScrollReveal variant="fadeUp" threshold={0.1}>
        <LandingStats />
      </ScrollReveal>

      {/* 5. Featured Scholarships Showcase with live category tabs & bookmarks */}
      <ScrollReveal variant="fadeUp" threshold={0.1}>
        <LandingFeatured />
      </ScrollReveal>

      {/* 6. How It Works (4 Connected Steps) */}
      <ScrollReveal variant="fadeUp" threshold={0.1}>
        <LandingHowItWorks />
      </ScrollReveal>

      {/* 7. Benefits & Architectural Value Pillars */}
      <ScrollReveal variant="fadeUp" threshold={0.1}>
        <LandingBenefits />
      </ScrollReveal>

      {/* 8. Student Scholar Testimonials (clearly labeled demo profiles) */}
      <ScrollReveal variant="fadeUp" threshold={0.1}>
        <LandingTestimonials />
      </ScrollReveal>

      {/* 9. Interactive FAQ Accordion */}
      <ScrollReveal variant="fadeUp" threshold={0.1}>
        <LandingFaq />
      </ScrollReveal>

      {/* 10. High-Conversion Call To Action Banner */}
      <ScrollReveal variant="scale" threshold={0.1}>
        <LandingCta />
      </ScrollReveal>

      {/* 11. Landing Footer with links, demo contact & official disclaimer */}
      <ScrollReveal variant="fadeIn" threshold={0.05}>
        <LandingFooter />
      </ScrollReveal>
    </div>
  );
};

export default HomePage;
