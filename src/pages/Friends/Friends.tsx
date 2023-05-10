import { useDispatch } from 'react-redux';
import FriendsList from '../../components/Friends/FriendsList';
import Middle from '../../components/Middle/Middle';
import SideBar from '../../components/SideBar/Sidebar';
import { fetchFriends } from '../../store/slices/users';
import { Dispatch, useEffect } from 'react';
import { Params, useParams } from 'react-router-dom';
import { AnyAction } from '@reduxjs/toolkit';

const FriendsPage = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const { userId }: Readonly<Params<string>> = useParams();
  useEffect(() => {
    dispatch(fetchFriends(userId));
  }, [userId, dispatch]);
  return (
    <>
      <SideBar />
      <Middle>
        <FriendsList />
      </Middle>
    </>
  );
};

export default FriendsPage;
