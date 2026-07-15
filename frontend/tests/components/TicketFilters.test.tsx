import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TicketFilters } from '../../src/components/tickets/TicketFilters';

describe('TicketFilters', () => {
  it('renders search input and status select with labels', () => {
    render(<TicketFilters values={{ search: '', status: '' }} onChange={vi.fn()} />);

    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'All statuses' })).toBeInTheDocument();
  });

  it('calls onChange when search text changes', () => {
    const onChange = vi.fn();

    render(<TicketFilters values={{ search: '', status: '' }} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'login' } });

    expect(onChange).toHaveBeenCalledWith({ search: 'login', status: '' });
  });

  it('calls onChange when status changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TicketFilters values={{ search: '', status: '' }} onChange={onChange} />);

    await user.selectOptions(screen.getByLabelText('Status'), 'OPEN');

    expect(onChange).toHaveBeenCalledWith({ search: '', status: 'OPEN' });
  });
});
