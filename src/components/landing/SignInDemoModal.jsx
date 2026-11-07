import React from 'react';
import { Modal, PrimaryButton, SecondaryButton, Badge } from '../ui';
import { useApp } from '../../context/AppContext';
import { User, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export const SignInDemoModal = ({ isOpen, onClose }) => {
  const { user, addToast } = useApp();
  const navigate = useNavigate();

  const handleSignIn = () => {
    onClose();
    addToast('Demo Session Active', `Logged in as ${user.name} (${user.role}).`, 'success');
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Account Access (Demo)"
      subtitle="Experience the full GRANTLY scholar workspace"
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/50 border border-[var(--border)] flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--coral)]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">{user.name}</h4>
              <Badge variant="success" size="sm">Active Demo</Badge>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{user.email}</p>
            <p className="text-xs font-semibold text-[var(--primary)]">{user.university}</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0" />
            <span>Pre-configured with 4 tracked grants and 18 catalog opportunities.</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0" />
            <span>Full eligibility calculator and deadline analytics unlocked.</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--coral)] shrink-0" />
            <span>100% Client-Side Demo: Zero external password or API required.</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border)]">
          <SecondaryButton size="sm" onClick={onClose}>
            Close
          </SecondaryButton>
          <PrimaryButton size="sm" onClick={handleSignIn}>
            Enter Dashboard <User className="h-4 w-4 ml-1.5" />
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default SignInDemoModal;

