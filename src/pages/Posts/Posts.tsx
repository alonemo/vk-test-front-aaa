import { useDispatch } from 'react-redux';
import Feeds from '../../components/Feeds/Feeds';
import Middle from '../../components/Middle/Middle';
import SideBar from '../../components/SideBar/Sidebar';
import { Dispatch, useEffect } from 'react';
import { fecthPostsByFriends } from '../../store/slices/posts';
import { AnyAction } from '@reduxjs/toolkit';

const PostsPage = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(fecthPostsByFriends());
  }, [dispatch]);
  return (
    <>
      <SideBar />
      <Middle>
        <Feeds />
      </Middle>
    </>
  );
};

export default PostsPage;
