import { Link, Outlet } from 'react-router-dom';
import { ActingUserSelect } from './ActingUserSelect';

export function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <Link to="/" className="app-title">
            Support Tickets
          </Link>
        </div>
        <ActingUserSelect />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
