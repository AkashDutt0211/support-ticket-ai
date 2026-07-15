import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CommentForm } from '../../src/components/comments/CommentForm';

describe('CommentForm', () => {
  it('keeps message when submit fails', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue(new Error('Network error'));

    render(<CommentForm isSubmitting={false} onSubmit={onSubmit} />);

    const textarea = screen.getByLabelText('Add comment');
    await user.type(textarea, 'Still here');
    await user.click(screen.getByRole('button', { name: 'Post comment' }));

    expect(onSubmit).toHaveBeenCalledWith('Still here');
    expect(textarea).toHaveValue('Still here');
  });

  it('clears message after successful submit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CommentForm isSubmitting={false} onSubmit={onSubmit} />);

    const textarea = screen.getByLabelText('Add comment');
    await user.type(textarea, 'Posted');
    await user.click(screen.getByRole('button', { name: 'Post comment' }));

    expect(onSubmit).toHaveBeenCalledWith('Posted');
    expect(textarea).toHaveValue('');
  });
});
