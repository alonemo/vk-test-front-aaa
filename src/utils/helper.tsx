import { redirect } from 'react-router-dom';

export const ageHelper = (age: number): string => {
  let ageString = '';
  if (age % 100 > 10 && age % 100 < 20) {
    ageString = 'лет';
  } else if (age % 10 > 1 && age % 10 < 5) {
    ageString = 'года';
  } else if (age % 10 === 1) {
    ageString = 'год';
  } else {
    ageString += 'лет';
  }
  return `${age} ${ageString}`;
};

export const getTokenHelper = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  return token;
};

export const tokenLoader = () => {
  return getTokenHelper();
};

export const getUserIdHelper = () => {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    return null;
  }

  return userId;
};

export const checkAuthLoader = () => {
  const token = getTokenHelper();
  const userId = getUserIdHelper();
  if (!token || !userId) {
    return redirect('/');
  }
  return null;
};
