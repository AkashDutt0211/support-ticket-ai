import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ticketsApi } from '../api/ticketsApi';
import { CommentForm } from '../components/comments/CommentForm';
import { CommentList } from '../components/comments/CommentList';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { PriorityBadge, StatusBadge } from '../components/tickets/TicketBadges';
import { StatusActions } from '../components/tickets/StatusActions';
import { TicketForm, type TicketFormValues } from '../components/tickets/TicketForm';
import { useActingUser } from '../context/UserContext';
import { useTicket } from '../hooks/useTicket';
import { ApiError, getFieldErrors, getErrorMessage } from '../types/api';
import type { TicketStatus } from '../types/ticket';

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { ticket, isLoading, error, refetch } = useTicket(id);
  const { actingUser, users } = useActingUser();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [commentError, setCommentError] = useState<string | undefined>();

  const handleUpdate = async (values: TicketFormValues): Promise<void> => {
    if (!ticket) {
      return;
    }

    try {
      setIsUpdating(true);
      setActionError(null);
      setFieldErrors({});
      await ticketsApi.update(ticket.id, {
        title: values.title,
        description: values.description,
        priority: values.priority,
        assignedToId: values.assignedToId || null,
      });
      await refetch();
    } catch (err) {
      setFieldErrors(getFieldErrors(err));
      setActionError(getErrorMessage(err));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTransition = async (status: TicketStatus): Promise<void> => {
    if (!ticket) {
      return;
    }

    try {
      setIsTransitioning(true);
      setActionError(null);
      await ticketsApi.updateStatus(ticket.id, status);
      await refetch();
    } catch (err) {
      const message =
        err instanceof ApiError && err.code === 'INVALID_TRANSITION'
          ? err.message
          : getErrorMessage(err);
      setActionError(message);
    } finally {
      setIsTransitioning(false);
    }
  };

  const handleComment = async (message: string): Promise<void> => {
    if (!ticket || !actingUser) {
      setCommentError('Select an acting user first');
      return;
    }

    try {
      setIsCommenting(true);
      setCommentError(undefined);
      setActionError(null);
      await ticketsApi.addComment(ticket.id, message, actingUser.id);
      await refetch();
    } catch (err) {
      const fieldErrs = getFieldErrors(err);
      setCommentError(fieldErrs.message ?? getErrorMessage(err));
      throw err;
    } finally {
      setIsCommenting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading ticket..." />;
  }

  if (error || !ticket) {
    return (
      <section className="page">
        <ErrorAlert message={error ?? 'Ticket not found'} />
        <Link to="/" className="btn btn-primary">
          Back to list
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>{ticket.title}</h1>
          <div className="badge-row">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>
        <Link to="/" className="btn btn-ghost">
          Back to list
        </Link>
      </div>

      {actionError ? <ErrorAlert message={actionError} onDismiss={() => setActionError(null)} /> : null}

      <div className="detail-grid">
        <section className="card">
          <h2>Edit ticket</h2>
          <TicketForm
            key={ticket.updatedAt}
            initialValues={{
              title: ticket.title,
              description: ticket.description,
              priority: ticket.priority,
              assignedToId: ticket.assignedToId ?? '',
            }}
            users={users}
            submitLabel={isUpdating ? 'Saving...' : 'Save changes'}
            isSubmitting={isUpdating}
            fieldErrors={fieldErrors}
            onSubmit={(values) => {
              void handleUpdate(values);
            }}
          />
        </section>

        <section className="card">
          <StatusActions
            currentStatus={ticket.status}
            isSubmitting={isTransitioning}
            onTransition={(status) => {
              void handleTransition(status);
            }}
          />
        </section>
      </div>

      <section className="card">
        <h2>Comments</h2>
        <CommentList comments={ticket.comments ?? []} />
        <CommentForm
          isSubmitting={isCommenting}
          fieldError={commentError}
          onSubmit={handleComment}
        />
      </section>

      <p className="muted">
        Created by {ticket.createdBy.name} · Updated {new Date(ticket.updatedAt).toLocaleString()}
      </p>
    </section>
  );
}
