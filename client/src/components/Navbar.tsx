import type { User } from '../data/usersData';

interface NavbarProps {
  setSearch: (value: string) => void;
  user?: User;
}

function Navbar({ setSearch, user }: NavbarProps) {
  return (
    <nav className="navbar-dashboard">
      <div className="logo">LOGO</div>
      {user && <div className="user-info">Welcome, {user.username}!</div>}
      <input
        type="text"
        placeholder="Search an item..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  );
}
export default Navbar;
