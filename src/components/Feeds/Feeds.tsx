import { useSelector } from 'react-redux';
import './Feeds.css';
import Post from '../Post/Post';
import { postsState } from '../../store/slices/posts';
import { IPost } from '../../types/interfaces';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
const Feeds = () => {
  const { posts }: postsState = useSelector((state: any) => state.posts);

  if (posts.status === 'loading') {
    return <LoadingSpinner />;
  }
  if (posts.status === 'loaded' && posts.items.length === 0) {
    return (
      <div className="feeds">
        <div className="empty">
          <h1>Тут пока пусто...</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="feeds">
      {posts.items.map((item: IPost) => (
        <Post post={item} key={item._id} />
      ))}
    </div>
  );
};

export default Feeds;
