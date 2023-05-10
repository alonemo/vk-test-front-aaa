import { Dispatch, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from '../../store/slices/users';
import SideBar from '../../components/SideBar/Sidebar';
import Middle from '../../components/Middle/Middle';
import FriendsList from '../../components/Friends/FriendsList';
import { AnyAction } from '@reduxjs/toolkit';

const AllUsersPage = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <SideBar />
      <Middle>
        <FriendsList />
      </Middle>
    </>
  );
};

export default AllUsersPage;
