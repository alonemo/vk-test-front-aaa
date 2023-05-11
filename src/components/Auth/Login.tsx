import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../utils/axios';
import { ILogData } from '../../types/interfaces';
import { useState } from 'react';
const Login = () => {
  const navigate = useNavigate();

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [errMsg, setErrMsg] = useState('');

  const submitFormHandler = async (event: any) => {
    event.preventDefault();
    const email = event.target['email'].value;
    const password = event.target['password'].value;
    if (!mailformat.test(email)) {
      setIsValidEmail(false);
      return;
    } else {
      setIsValidEmail(true);
    }
    if (password.length < 5) {
      setIsValidPassword(false);
      return;
    } else {
      setIsValidPassword(true);
    }
    const loginData: ILogData = {
      email,
      password,
    };
    try {
      const authData = await login(loginData);
      localStorage.setItem('token', authData.token);
      localStorage.setItem('userId', authData._id);
      navigate(`/${authData._id}`);
    } catch (err: any) {
      setErrMsg(err.response.data.message);
      return;
    }
  };
  return (
    <div className="auth">
      <h1>Вход</h1>
      <div className="signup">
        <h3>
          Нет аккаунта? <NavLink to="/signup">Зарегистрироваться</NavLink>
        </h3>
      </div>
      <form onSubmit={submitFormHandler}>
        <div className="email">
          <label htmlFor="email">Email</label>
          <div className={`email-input ${isValidEmail ? '' : 'invalid-input'}`}>
            <input id="email" type="text" name="email" placeholder="email" />
          </div>
          {!isValidEmail && <p className="error">Почта должна быть почтой!</p>}
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <div
            className={`password-input ${
              isValidPassword ? '' : 'invalid-input'
            }`}
          >
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          {!isValidPassword && (
            <p className="error">Пароль минимум 5 символов!</p>
          )}
        </div>
        {errMsg !== '' && <p className="error">{errMsg}</p>}
        <button className="btn btn-primary" type="submit">
          Вход
        </button>
      </form>
    </div>
  );
};

export default Login;
