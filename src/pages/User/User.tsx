import { useDispatch } from 'react-redux';
import Feeds from '../../components/Feeds/Feeds';
import Middle from '../../components/Middle/Middle';
import SideBar from '../../components/SideBar/Sidebar';
import User from '../../components/User/User';
import { Params, useParams } from 'react-router-dom';
import { Dispatch, useEffect } from 'react';
import { fetchPostsByUser } from '../../store/slices/posts';
import { fetchUser } from '../../store/slices/users';
import { AnyAction } from '@reduxjs/toolkit';

const UserPage = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const { userId }: Readonly<Params<string>> = useParams();
  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchPostsByUser(userId));
  }, [userId, dispatch]);
  return (
    <>
      <SideBar />
      <Middle>
        <User />
        <Feeds />
      </Middle>
    </>
  );
};

export default UserPage;
