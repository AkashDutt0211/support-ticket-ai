import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ErrorAlert } from '../../src/components/common/ErrorAlert';

describe('ErrorAlert', () => {
  it('renders error message', () => {
    render(<ErrorAlert message="Cannot transition from CLOSED to OPEN" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Cannot transition from CLOSED to OPEN');
  });

  it('calls onDismiss when dismiss clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();

    render(<ErrorAlert message="Server error" onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
