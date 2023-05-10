import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addFriend,
  getFriends,
  getUser,
  getUsers,
  removeFriend,
} from '../../utils/axios';
import { IUser, IUsers } from '../../types/interfaces';

export const fetchFriends: any = createAsyncThunk(
  'friends',
  async (userId: number) => {
    const response = await getFriends(userId);
    return response;
  }
);

export const fetchAllUsers: any = createAsyncThunk('users', async () => {
  const response = await getUsers();
  return response;
});

export const fetchUser: any = createAsyncThunk(
  'user',
  async (userId: number) => {
    const response = await getUser(userId);
    return response;
  }
);

export const addFriends: any = createAsyncThunk(
  'friends/addFriendId',
  async (friendId: number) => {
    const response = await addFriend(friendId);
    return response;
  }
);

export const removeFriends: any = createAsyncThunk(
  'friends/removeFriendId',
  async (friendId: number) => {
    const response = await removeFriend(friendId);
    return response;
  }
);

interface initUsers {
  items: IUsers;
  status: string;
}

export interface initCurrentUser {
  user: IUser | any;
  status: string;
}

export interface usersState {
  users: initUsers;
  currentUser: initCurrentUser;
}

const initialState: usersState = {
  users: {
    items: [],
    status: 'loading',
  },
  currentUser: {
    user: {},
    status: 'loading',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFriends.pending]: state => {
      state.users.status = 'loading';
    },
    [fetchFriends.fulfilled]: (state, action) => {
      state.users.status = 'loaded';
      state.users.items = action.payload;
    },
    [fetchFriends.rejected]: state => {
      state.users.status = 'error';
    },
    [fetchAllUsers.pending]: state => {
      state.users.status = 'loading';
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.users.status = 'loaded';
      state.users.items = action.payload;
    },
    [fetchAllUsers.rejected]: state => {
      state.users.status = 'error';
    },
    [addFriends.fulfilled]: (state: any, action) => {
      const friend: IUser = action.payload;
      const friendIndex = state.users.items.findIndex(
        (u: IUser) => u._id === friend._id
      );
      if (state.users.items[friendIndex]) {
        state.users.items[friendIndex].friends = friend.friends;
      }

      if (friend._id === state.currentUser.user._id) {
        state.currentUser.user.friends = friend.friends;
      }
    },
    [removeFriends.fulfilled]: (state: usersState, action) => {
      const friend: IUser = action.payload;
      const friendIndex = state.users.items.findIndex(
        (u: IUser) => u._id === friend._id
      );
      if (state.users.items[friendIndex]) {
        state.users.items[friendIndex].friends = friend.friends;
      }
      if (friend._id === state.currentUser.user._id) {
        state.currentUser.user.friends = friend.friends;
      }
    },
    [fetchUser.pending]: state => {
      state.currentUser.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.currentUser.status = 'loaded';
      state.currentUser.user = action.payload;
    },
    [fetchAllUsers.rejected]: state => {
      state.currentUser.status = 'error';
    },
  },
});

export const usersReducer = usersSlice.reducer;
