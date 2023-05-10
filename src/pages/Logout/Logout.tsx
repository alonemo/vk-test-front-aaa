import { redirect } from 'react-router-dom';

export function loader() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  return redirect('/');
}
