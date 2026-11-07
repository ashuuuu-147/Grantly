import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { PrimaryButton } from '../components/ui';
import { ROUTES } from '../utils/constants';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="h-16 w-16 rounded-[var(--radius-lg)] bg-[var(--peach-tint)] flex items-center justify-center text-[var(--primary)] mb-6">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="heading-display text-4xl text-[var(--text-primary)]">404</h1>
      <p className="heading-card text-lg text-[var(--text-secondary)] mt-2">Page Not Found</p>
      <p className="text-sm text-[var(--text-muted)] max-w-md mt-1 mb-6">
        The grant opportunity or destination you are searching for does not exist or has been relocated.
      </p>
      <Link to={ROUTES.HOME}>
        <PrimaryButton icon={ArrowLeft}>Return to Home</PrimaryButton>
      </Link>
    </div>
  );
};

export default NotFoundPage;
