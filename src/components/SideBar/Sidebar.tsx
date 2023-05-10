import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const SideBar = () => {
  const userId: string | null = localStorage.getItem('userId');

  return (
    <div className="left">
      <div className="sidebar">
        <NavLink className="menu-item" to={`/${userId}`} end>
          <span>
            <i className="uil uil-home"></i>
          </span>
          <h3>Моя страница</h3>
        </NavLink>
        <NavLink className="menu-item" to={'/posts'}>
          <span>
            <i className="uil uil-newspaper" />
          </span>
          <h3>Новости</h3>
        </NavLink>
        <NavLink className="menu-item" to={`/${userId}/friends`} end>
          <span>
            <i className="uil uil-users-alt"></i>
          </span>
          <h3>Friends</h3>
        </NavLink>
        {/* <Form action="/logout" method="post" className="menu-item">
          <span>
            <i className="uil uil-signout"></i>
          </span>
          <h3>Logout</h3>
        </Form> */}
        <NavLink to={'/logout'} className="menu-item">
          <span>
            <i className="uil uil-signout"></i>
          </span>
          <h3>Logout</h3>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
