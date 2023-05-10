import { useSelector } from 'react-redux';
import Friend from './Friend';
import './FriendsList.css';
import { NavLink, Params, useParams } from 'react-router-dom';
import { useState } from 'react';
import { usersState } from '../../store/slices/users';
import { IUser } from '../../types/interfaces';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const FriendsList = () => {
  const { users }: usersState = useSelector((state: any) => state.users);

  const { userId }: Readonly<Params<string>> = useParams();

  const [searchInput, setSearchInput] = useState('');

  let filteredUsers = users.items;
  const status = users.status;
  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  const handleChange = (event: any) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  if (searchInput.length > 0) {
    filteredUsers = filteredUsers.filter((user: IUser) => {
      const userName = (user.firstName + ' ' + user.secondName).toLowerCase();
      return userName.match(searchInput.toLowerCase());
    });
  }

  let listUsers;
  if (status === 'loaded' && users.items.length === 0) {
    listUsers = (
      <div className="feeds">
        <div className="empty">
          <h1>Тут пока пусто...</h1>
        </div>
      </div>
    );
  } else {
    listUsers = filteredUsers.map((item: IUser) => (
      <Friend user={item} key={item._id} />
    ));
  }

  return (
    <div className="feeds">
      <div className="friends-nav">
        <div className="nav-items">
          <NavLink className="nav-item" to={`/${userId}/friends`} end>
            <h3>Friends</h3>
          </NavLink>
          <NavLink className="nav-item" to={`/${userId}/users`} end>
            <h3>All Users</h3>
          </NavLink>
        </div>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search for anything"
            onChange={handleChange}
            value={searchInput}
          />
        </div>
      </div>
      {listUsers}
    </div>
  );
};

export default FriendsList;
