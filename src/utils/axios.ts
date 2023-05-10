import axios from 'axios';
import {
  ILogData,
  IPost,
  IPosts,
  ISignupData,
  IUser,
  IUsers,
} from '../types/interfaces';
import { getTokenHelper, getUserIdHelper } from './helper';

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

export const login = async (logData: ILogData) => {
  const response = await instance.post('/auth/login', logData);
  const data = await response.data;
  return data;
};

export const signup = async (signupData: ISignupData) => {
  const response = await instance.post('/auth/register', signupData);
  const data = await response.data;
  return data;
};

export const createPost = async (postData: IPost) => {
  const token = getTokenHelper();
  const response = await instance.post('/posts', postData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  const data: IPost = await response.data;
  return data;
};

export const getPostsByUser = async (userId: number) => {
  const response = await instance.get(`/posts/${userId}`);
  const data: IPosts = await response.data;
  return data;
};

export const getUser = async (userId: number) => {
  const response = await instance.get(`/${userId}`);
  const data: IUser = await response.data;
  return data;
};

export const getFriends = async (userId: number) => {
  const response = await instance.get(`/friends/${userId}`);
  const data: IUsers = await response.data;
  return data;
};

export const getUsers = async () => {
  const response = await instance.get('/users/all');
  const data = await response.data;
  return data;
};

export const changeLikes = async (postId: number) => {
  const token = getTokenHelper();
  const response = await instance.post(
    `/posts/${postId}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
  );
  const data: IPost = await response.data;
  return data;
};

export const getFriendsPosts = async () => {
  const localUserId = getUserIdHelper();
  console.log(localUserId);
  const response = await instance.get(`/posts/all/${localUserId}`);
  const data: IPosts = await response.data;
  return data;
};

export const addFriend = async (friendId: number) => {
  const token = getTokenHelper();
  const response = await instance.post(
    `/friends/${friendId}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
  );
  const data: IUser = await response.data;
  return data;
};

export const removeFriend = async (friendId: number) => {
  const token = getTokenHelper();
  const response = await instance.delete(`/friends/${friendId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  const data: IUser = await response.data;
  return data;
};

export default instance;
