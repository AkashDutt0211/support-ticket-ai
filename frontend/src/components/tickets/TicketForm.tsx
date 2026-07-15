import { useState, type FormEvent, type ReactNode } from 'react';
import type { TicketPriority, UserSummary } from '../../types/ticket';

export interface TicketFormValues {
  title: string;
  description: string;
  priority: TicketPriority;
  assignedToId: string;
}

interface TicketFormProps {
  initialValues?: Partial<TicketFormValues>;
  users: UserSummary[];
  submitLabel: string;
  isSubmitting: boolean;
  fieldErrors?: Record<string, string>;
  onSubmit: (values: TicketFormValues) => void;
}

const defaultValues: TicketFormValues = {
  title: '',
  description: '',
  priority: 'MEDIUM',
  assignedToId: '',
};

export function TicketForm({
  initialValues,
  users,
  submitLabel,
  isSubmitting,
  fieldErrors = {},
  onSubmit,
}: TicketFormProps): ReactNode {
  const [values, setValues] = useState<TicketFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors: Record<string, string> = {};

    if (!values.title.trim()) {
      errors.title = 'Title is required';
    } else if (values.title.trim().length > 200) {
      errors.title = 'Title must be 200 characters or less';
    }

    if (!values.description.trim()) {
      errors.description = 'Description is required';
    }

    setClientErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      assignedToId: values.assignedToId || '',
    });
  };

  const errors = { ...clientErrors, ...fieldErrors };

  return (
    <form className="ticket-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={values.title}
          maxLength={200}
          onChange={(e) => setValues((prev) => ({ ...prev, title: e.target.value }))}
        />
        {errors.title ? <span className="field-error">{errors.title}</span> : null}
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={5}
          value={values.description}
          onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
        />
        {errors.description ? <span className="field-error">{errors.description}</span> : null}
      </div>

      <div className="form-field">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={values.priority}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, priority: e.target.value as TicketPriority }))
          }
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="assignedToId">Assignee</label>
        <select
          id="assignedToId"
          value={values.assignedToId}
          onChange={(e) => setValues((prev) => ({ ...prev, assignedToId: e.target.value }))}
        >
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {submitLabel}
      </button>
    </form>
  );
}
