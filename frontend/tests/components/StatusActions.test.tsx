import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StatusActions } from '../../src/components/tickets/StatusActions';

describe('StatusActions', () => {
  it('shows valid transition buttons for OPEN', () => {
    render(<StatusActions currentStatus="OPEN" isSubmitting={false} onTransition={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'In Progress' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelled' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Closed' })).not.toBeInTheDocument();
  });

  it('shows no buttons for CLOSED', () => {
    render(<StatusActions currentStatus="CLOSED" isSubmitting={false} onTransition={vi.fn()} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('No further status changes available.')).toBeInTheDocument();
  });

  it('calls onTransition with selected status', async () => {
    const user = userEvent.setup();
    const onTransition = vi.fn();

    render(
      <StatusActions currentStatus="IN_PROGRESS" isSubmitting={false} onTransition={onTransition} />,
    );

    await user.click(screen.getByRole('button', { name: 'Resolved' }));
    expect(onTransition).toHaveBeenCalledWith('RESOLVED');
  });
});
