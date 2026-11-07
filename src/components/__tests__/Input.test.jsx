import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TextInput, SelectInput } from '../ui/Input';

describe('TextInput component', () => {
  it('associates label with input using htmlFor and id', () => {
    render(<TextInput label="Full Name" placeholder="Alex" />);
    const input = screen.getByLabelText(/full name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Alex');
  });

  it('sets aria-invalid and displays role="alert" error message', () => {
    render(<TextInput label="Email Address" error="Invalid email format" />);
    const input = screen.getByLabelText(/email address/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Invalid email format');
  });

  it('renders helper text when no error is present', () => {
    render(<TextInput label="GPA" helperText="On a 4.0 scale" />);
    expect(screen.getByText('On a 4.0 scale')).toBeInTheDocument();
  });

  it('captures user typing', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<TextInput label="Username" onChange={handleChange} />);
    const input = screen.getByLabelText(/username/i);
    await user.type(input, 'Alex');

    expect(handleChange).toHaveBeenCalled();
  });
});

describe('SelectInput component', () => {
  it('renders options and responds to selection', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <SelectInput
        label="Education Level"
        options={['Undergraduate', 'Graduate', 'Doctoral']}
        onChange={handleSelect}
      />
    );

    const select = screen.getByLabelText(/education level/i);
    await user.selectOptions(select, 'Graduate');

    expect(handleSelect).toHaveBeenCalled();
    expect(select.value).toBe('Graduate');
  });
});
