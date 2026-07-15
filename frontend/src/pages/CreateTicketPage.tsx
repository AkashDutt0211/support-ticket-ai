import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ticketsApi } from '../api/ticketsApi';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { TicketForm, type TicketFormValues } from '../components/tickets/TicketForm';
import { useActingUser } from '../context/UserContext';
import { getFieldErrors, getErrorMessage } from '../types/api';

export function CreateTicketPage() {
  const navigate = useNavigate();
  const { actingUser, users } = useActingUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (values: TicketFormValues): Promise<void> => {
    if (!actingUser) {
      setError('Select an acting user first');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setFieldErrors({});
      const ticket = await ticketsApi.create({
        title: values.title,
        description: values.description,
        priority: values.priority,
        createdById: actingUser.id,
        assignedToId: values.assignedToId || null,
      });
      navigate(`/tickets/${ticket.id}`);
    } catch (err) {
      setFieldErrors(getFieldErrors(err));
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1>Create ticket</h1>
        <Link to="/" className="btn btn-ghost">
          Back to list
        </Link>
      </div>

      {error ? <ErrorAlert message={error} onDismiss={() => setError(null)} /> : null}

      <TicketForm
        users={users}
        submitLabel={isSubmitting ? 'Creating...' : 'Create ticket'}
        isSubmitting={isSubmitting}
        fieldErrors={fieldErrors}
        onSubmit={(values) => {
          void handleSubmit(values);
        }}
      />
    </section>
  );
}
