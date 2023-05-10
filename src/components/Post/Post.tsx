import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import './Post.css';
import { useDispatch } from 'react-redux';
import { updatePostLikes } from '../../store/slices/posts';
import { Link } from 'react-router-dom';
import { IPost } from '../../types/interfaces';

interface postProps {
  post: IPost;
}
const Post = ({ post }: postProps) => {
  const userId: string | null = localStorage.getItem('userId');
  const date = new Date(post.createdAt).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const dispatch = useDispatch();
  const updateLikes = () => {
    dispatch(updatePostLikes(post._id));
  };

  return (
    <div className="feed" key={post._id}>
      <div className="head">
        <div className="user">
          <div className="profile-photo">
            <img src={post.user.avatarUrl} />
          </div>
          <div className="info">
            <Link to={`/${post.user._id}`}>
              <h3>
                {post.user.firstName} {post.user.secondName}
              </h3>
            </Link>
            <small>{date}</small>
          </div>
        </div>
        <span className="edit">
          <i className="uil uil-ellipsis-h"></i>
        </span>
      </div>

      <div className="caption">
        <p>{post.text}</p>
      </div>
      {post.imageUrl !== '' && (
        <div className="photo">
          <img src={post.imageUrl} />
        </div>
      )}

      <div className="action-buttons">
        <div className="interaction-buttons">
          {post.likes.find((usId: any) => usId == userId) ? (
            <HeartFilled onClick={updateLikes} />
          ) : (
            <HeartOutlined onClick={updateLikes} />
          )}
          <span> {post.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
