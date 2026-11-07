import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AppProvider } from '../../context/AppContext';
import { ScholarshipCard } from '../ui/ScholarshipCard';

const mockGrant = {
  id: 'sch-card-test',
  title: 'Global Computing Fellowship',
  provider: 'MIT Science Lab',
  awardAmount: 45000,
  category: 'STEM & Research',
  educationLevel: 'Undergraduate',
  deadline: '2026-12-30',
  eligibilityHighlights: ['Min 85% score required', 'All states eligible'],
};

describe('ScholarshipCard component', () => {
  it('renders grant details, badges, and award currency', () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <ScholarshipCard scholarship={mockGrant} />
        </BrowserRouter>
      </AppProvider>
    );

    expect(screen.getByText('Global Computing Fellowship')).toBeInTheDocument();
    expect(screen.getByText('MIT Science Lab')).toBeInTheDocument();
    expect(screen.getByText('$45,000')).toBeInTheDocument();
    expect(screen.getByText('STEM & Research')).toBeInTheDocument();
  });

  it('renders accessible bookmark button with aria-pressed', async () => {
    const user = userEvent.setup();
    render(
      <AppProvider>
        <BrowserRouter>
          <ScholarshipCard scholarship={mockGrant} />
        </BrowserRouter>
      </AppProvider>
    );

    const bookmarkBtn = screen.getByRole('button', { name: /save global computing fellowship/i });
    expect(bookmarkBtn).toBeInTheDocument();
    expect(bookmarkBtn).toHaveAttribute('aria-pressed', 'false');

    await user.click(bookmarkBtn);
    expect(screen.getByRole('button', { name: /remove global computing fellowship from saved/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
});
