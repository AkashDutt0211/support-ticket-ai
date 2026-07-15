import { useActingUser } from '../../context/UserContext';

export function ActingUserSelect() {
  const { users, actingUser, isLoading, setActingUserId } = useActingUser();

  if (isLoading) {
    return <span className="muted">Loading users...</span>;
  }

  return (
    <label className="acting-user-select">
      Acting as
      <select
        value={actingUser?.id ?? ''}
        onChange={(e) => setActingUserId(e.target.value)}
        aria-label="Select acting user"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.role})
          </option>
        ))}
      </select>
    </label>
  );
}
