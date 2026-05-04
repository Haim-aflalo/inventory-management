import { mockUsers } from '../data/usersData';
function Navbar() {
  const userId = localStorage.getItem('userId');
  const user = mockUsers.filter((user) => user.id === userId);
  return (
    <>
      <div className="logo">LOGO</div>
      <>{user[0].username}</>
    </>
  );
}

export default Navbar;
