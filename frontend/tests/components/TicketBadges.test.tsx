import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PriorityBadge, StatusBadge } from '../../src/components/tickets/TicketBadges';

describe('TicketBadges', () => {
  it('renders human-readable status label', () => {
    render(<StatusBadge status="IN_PROGRESS" />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('applies status-specific class', () => {
    render(<StatusBadge status="CLOSED" />);
    expect(screen.getByText('Closed')).toHaveClass('badge-status-closed');
  });

  it('renders human-readable priority label', () => {
    render(<PriorityBadge priority="CRITICAL" />);
    expect(screen.getByText('Critical')).toBeInTheDocument();
  });

  it('applies priority-specific class', () => {
    render(<PriorityBadge priority="LOW" />);
    expect(screen.getByText('Low')).toHaveClass('badge-priority-low');
  });
});
