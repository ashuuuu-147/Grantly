import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { AppProvider, useApp } from '../AppContext';

const TestConsumer = () => {
  const {
    savedIds,
    toggleSaveScholarship,
    applications,
    addApplication,
    updateApplicationStatus,
    resetDemoData,
    user,
  } = useApp();

  return (
    <div>
      <div data-testid="saved-count">{savedIds.length}</div>
      <div data-testid="user-name">{user.name}</div>
      <div data-testid="apps-count">{applications.length}</div>
      <button onClick={() => toggleSaveScholarship('sch-999')}>Toggle Save</button>
      <button
        onClick={() =>
          addApplication({
            id: 'sch-new',
            title: 'New Fellowship',
            provider: 'Global Foundation',
            awardAmount: 30000,
          })
        }
      >
        Add App
      </button>
      <button onClick={() => updateApplicationStatus('app-001', 'Submitted')}>
        Update Status
      </button>
      <button onClick={resetDemoData}>Reset Data</button>
    </div>
  );
};

describe('AppContext & AppProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('provides default mock user and initial state', () => {
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    expect(screen.getByTestId('user-name')).toHaveTextContent('Alexandria Chen');
    expect(parseInt(screen.getByTestId('saved-count').textContent, 10)).toBeGreaterThan(0);
    expect(parseInt(screen.getByTestId('apps-count').textContent, 10)).toBeGreaterThan(0);
  });

  it('toggles saved scholarships', async () => {
    const user = userEvent.setup();
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    const initialSaved = parseInt(screen.getByTestId('saved-count').textContent, 10);
    await user.click(screen.getByRole('button', { name: /toggle save/i }));

    expect(parseInt(screen.getByTestId('saved-count').textContent, 10)).toBe(initialSaved + 1);

    // Toggle off
    await user.click(screen.getByRole('button', { name: /toggle save/i }));
    expect(parseInt(screen.getByTestId('saved-count').textContent, 10)).toBe(initialSaved);
  });

  it('adds a new application to the tracker', async () => {
    const user = userEvent.setup();
    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    const initialApps = parseInt(screen.getByTestId('apps-count').textContent, 10);
    await user.click(screen.getByRole('button', { name: /add app/i }));

    expect(parseInt(screen.getByTestId('apps-count').textContent, 10)).toBe(initialApps + 1);

    // Attempt duplicate addition
    await user.click(screen.getByRole('button', { name: /add app/i }));
    expect(parseInt(screen.getByTestId('apps-count').textContent, 10)).toBe(initialApps + 1);
  });
});
