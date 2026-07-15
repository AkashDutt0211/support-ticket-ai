import { useState, type FormEvent, type ReactNode } from 'react';

interface CommentFormProps {
  isSubmitting: boolean;
  fieldError?: string;
  onSubmit: (message: string) => Promise<void>;
}

export function CommentForm({ isSubmitting, fieldError, onSubmit }: CommentFormProps): ReactNode {
  const [message, setMessage] = useState('');
  const [clientError, setClientError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!message.trim()) {
      setClientError('Message is required');
      return;
    }

    setClientError('');
    try {
      await onSubmit(message.trim());
      setMessage('');
    } catch {
      // Parent handles API errors; keep message so user can retry.
    }
  };

  const error = clientError || fieldError;

  return (
    <form className="comment-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="comment-message">Add comment</label>
        <textarea
          id="comment-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error ? <span className="field-error">{error}</span> : null}
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        Post comment
      </button>
    </form>
  );
}
