import { Link } from 'react-router-dom';
import './Friend.css';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addFriends, removeFriends } from '../../store/slices/users';
import { IUser } from '../../types/interfaces';
import { ageHelper } from '../../utils/helper';

interface friendProps {
  user: IUser;
}
const Friend = ({ user }: friendProps) => {
  const userId: string | null = localStorage.getItem('userId');
  const dispatch = useDispatch();

  const userAge: string = ageHelper(user.age);

  const addFriendHandler = () => {
    dispatch(addFriends(user._id));
  };
  const removeFriendHandler = () => {
    dispatch(removeFriends(user._id));
  };
  return (
    <div className="user-item" key={user._id}>
      <div className="user">
        <div className="profile-photo">
          <img src={user.avatarUrl} />
        </div>
        <div className="info">
          <Link to={`/${user._id}`}>
            <h3>
              {user.firstName} {user.secondName}
            </h3>
          </Link>
          <div className="detailed-info">
            <div className="city">
              <span>
                <i className="uil uil-location-pin-alt" />
              </span>
              <p>
                {user.city}, {userAge}
              </p>
            </div>
            <div className="university">
              <span>
                <i className="uil uil-university" />
              </span>
              <p>{user.university}</p>
            </div>
          </div>
        </div>
        {user._id.toString() !== userId && (
          <div className="action-buttons">
            <div className="interaction-buttons">
              {user.friends.find((frId: any) => frId === userId) ? (
                <MinusCircleOutlined
                  className="delete-friend"
                  onClick={removeFriendHandler}
                />
              ) : (
                <PlusCircleOutlined
                  className="add-friend"
                  onClick={addFriendHandler}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friend;
