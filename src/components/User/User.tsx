import { Link } from 'react-router-dom';
import './User.css';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFriends,
  removeFriends,
  usersState,
} from '../../store/slices/users';
import CreatePost from '../CreatePost/CreatePost';
import { IUser } from '../../types/interfaces';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { ageHelper } from '../../utils/helper';

const User = () => {
  const dispatch = useDispatch();

  const userId: string | null = localStorage.getItem('userId');

  const { currentUser }: usersState = useSelector((state: any) => state.users);
  const user: IUser = currentUser.user;

  const addFriendHandler = () => {
    dispatch(addFriends(user._id));
  };

  const removeFriendHandler = () => {
    dispatch(removeFriends(user._id));
  };

  if (currentUser.status === 'loading') {
    return <LoadingSpinner />;
  }

  const userAge: string = ageHelper(user.age);
  return (
    <>
      <div className="user-profile">
        <div className="profile-photo">
          <img src={user.avatarUrl} alt="profile" />
        </div>
        <div className="info">
          <h1>
            {user.firstName} {user.secondName}, {userAge}
          </h1>
          {user._id.toString() !== userId && (
            <div className="action-buttons">
              <div className="interaction-buttons">
                {user.friends.find((frId: any) => frId === userId) ? (
                  <div
                    className="btn btn-primary"
                    onClick={removeFriendHandler}
                  >
                    <p>Удалить</p>
                    <MinusCircleOutlined className="delete-friend" />
                  </div>
                ) : (
                  <div className="btn btn-primary" onClick={addFriendHandler}>
                    <p>Добавить</p>
                    <PlusCircleOutlined className="add-friend" />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="detailed-info">
            <div className="city">
              <span>
                <i className="uil uil-home"></i>
              </span>
              <h3>{user.city}</h3>
            </div>
            <div className="university">
              <span>
                <i className="uil uil-university"></i>
              </span>
              <h3>{user.university}</h3>
            </div>
          </div>
          <Link to={`friends`} className="btn btn-primary">
            Друзья
          </Link>
        </div>
      </div>
      {userId === user._id.toString() && <CreatePost />}
    </>
  );
};

export default User;
