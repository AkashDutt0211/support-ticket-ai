import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usersApi } from '../api/ticketsApi';
import type { UserSummary } from '../types/ticket';

const STORAGE_KEY = 'actingUserId';

interface UserContextValue {
  users: UserSummary[];
  actingUser: UserSummary | null;
  isLoading: boolean;
  error: string | null;
  setActingUserId: (userId: string) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }): ReactNode {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [actingUserId, setActingUserIdState] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await usersApi.list();
        setUsers(data);

        const storedId = localStorage.getItem(STORAGE_KEY);
        const validStored = data.find((user) => user.id === storedId);
        if (validStored) {
          setActingUserIdState(validStored.id);
        } else if (data[0]) {
          setActingUserIdState(data[0].id);
          localStorage.setItem(STORAGE_KEY, data[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };

    void loadUsers();
  }, []);

  const setActingUserId = useCallback((userId: string) => {
    setActingUserIdState(userId);
    localStorage.setItem(STORAGE_KEY, userId);
  }, []);

  const actingUser = useMemo(
    () => users.find((user) => user.id === actingUserId) ?? null,
    [users, actingUserId],
  );

  const value = useMemo(
    () => ({ users, actingUser, isLoading, error, setActingUserId }),
    [users, actingUser, isLoading, error, setActingUserId],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useActingUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useActingUser must be used within UserProvider');
  }
  return context;
}
