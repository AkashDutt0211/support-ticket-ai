import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TicketForm } from '../../src/components/tickets/TicketForm';

const users = [
  { id: 'user-1', name: 'Alice', email: 'alice@company.com', role: 'AGENT' as const },
];

describe('TicketForm', () => {
  it('blocks submit when title is empty', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TicketForm
        users={users}
        submitLabel="Create"
        isSubmitting={false}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Title is required')).toBeInTheDocument();
  });

  it('submits valid values', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <TicketForm
        users={users}
        submitLabel="Create"
        isSubmitting={false}
        onSubmit={onSubmit}
      />,
    );

    await user.type(screen.getByLabelText('Title'), 'Broken printer');
    await user.type(screen.getByLabelText('Description'), 'Printer on floor 2 is down');
    await user.click(screen.getByRole('button', { name: 'Create' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Broken printer',
      description: 'Printer on floor 2 is down',
      priority: 'MEDIUM',
      assignedToId: '',
    });
  });
});
