import type { ReactNode } from 'react';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps): ReactNode {
  if (!message) {
    return null;
  }

  return (
    <div className="error-alert" role="alert">
      <p>{message}</p>
      {onDismiss ? (
        <button type="button" className="btn btn-ghost" onClick={onDismiss}>
          Dismiss
        </button>
      ) : null}
    </div>
  );
}
