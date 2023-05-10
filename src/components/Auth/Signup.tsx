import { NavLink, useNavigate } from 'react-router-dom';
import './Signup.css';
import instance, { signup } from '../../utils/axios';
import { useState } from 'react';
import { ISignupData } from '../../types/interfaces';

const Signup = () => {
  const [img, setImg] = useState(
    'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'
  );

  const navigate = useNavigate();

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidFirst, setIsValidFirst] = useState(true);
  const [isValidSecond, setIsValidSecond] = useState(true);
  const [isValidAge, setIsValidAge] = useState(true);
  const [isValidCity, setIsValidCity] = useState(true);
  const [isValidUniversity, setIsValidUniversity] = useState(true);

  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [errMsg, setErrMsg] = useState('');

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await instance.post('/upload', formData);
      setImg(`http://localhost:4444${data.url}`);
    } catch (err) {
      console.warn(err);
      setImg(
        'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'
      );
      alert('Ошибка при загрузке файла');
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const firstName = event.target['first-name'].value;
    const secondName = event.target['second-name'].value;
    const age = event.target['age'].value;
    const city = event.target['city'].value;
    const university = event.target['university'].value;
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
    if (firstName.length < 3) {
      setIsValidFirst(false);
      return;
    } else {
      setIsValidFirst(true);
    }
    if (secondName.length < 3) {
      setIsValidSecond(false);
      return;
    } else {
      setIsValidSecond(true);
    }
    if (age.length < 1) {
      setIsValidAge(false);
      return;
    } else {
      setIsValidAge(true);
    }
    if (city.length < 3) {
      setIsValidCity(false);
      return;
    } else {
      setIsValidCity(true);
    }
    if (university.length < 3) {
      setIsValidUniversity(false);
      return;
    } else {
      setIsValidUniversity(true);
    }
    const signupData: ISignupData = {
      firstName,
      secondName,
      age,
      city,
      university,
      email,
      password,
      avatarUrl: img,
    };
    try {
      const authData = await signup(signupData);
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
      <h1>Регистрация</h1>
      <div className="login">
        <h3>
          Есть аккаунт? <NavLink to="/">Войти</NavLink>
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="photo-upload" className="photo-upload">
          <div className="profile-photo">
            <img src={img} />
          </div>
          <input
            name="photo-upload"
            id="photo-upload"
            type="file"
            onChange={handleChangeFile}
          />
        </label>
        <div className="first-name">
          <label htmlFor="first-name">Имя</label>
          <div
            className={`first-name-input ${
              isValidFirst ? '' : 'invalid-input'
            }`}
          >
            <input
              id="first-name"
              name="first-name"
              type="text"
              placeholder="Дмитрий"
            />
          </div>
          {!isValidFirst && <p className="error">Имя минимум 3 символа!</p>}
        </div>
        <div className="second-name">
          <label htmlFor="second-name">Фамилия</label>
          <div
            className={`second-name-input ${
              isValidSecond ? '' : 'invalid-input'
            }`}
          >
            <input
              id="second-name"
              name="second-name"
              type="text"
              placeholder="Камышников"
            />
          </div>
          {!isValidSecond && (
            <p className="error">Фамилия минимум 3 символа!</p>
          )}
        </div>
        <div className="age">
          <label htmlFor="age">Возраст</label>
          <div className={`age-input ${isValidAge ? '' : 'invalid-input'}`}>
            <input
              min={1}
              max={300}
              id="age"
              name="age"
              type="number"
              placeholder="20"
            />
          </div>
          {!isValidAge && <p className="error">Имя минимум 1 символ!</p>}
        </div>
        <div className="city">
          <label htmlFor="city">Город</label>
          <div className={`city-input ${isValidCity ? '' : 'invalid-input'}`}>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Санкт-Петербург"
            />
          </div>
          {!isValidCity && <p className="error">Город минимум 3 символа!</p>}
        </div>
        <div className="university">
          <label htmlFor="university">Университет</label>
          <div
            className={`university-input ${
              isValidUniversity ? '' : 'invalid-input'
            }`}
          >
            <input
              id="university"
              name="university"
              type="text"
              placeholder="ИТМО"
            />
          </div>
          {!isValidUniversity && (
            <p className="error">Университет минимум 3 символа!</p>
          )}
        </div>
        <div className="email">
          <label htmlFor="email">Email</label>
          <div className={`email-input ${isValidEmail ? '' : 'invalid-input'}`}>
            <input id="email" name="email" type="text" placeholder="email" />
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
              name="password"
              type="password"
              placeholder="password"
            />
          </div>
          {!isValidPassword && (
            <p className="error">Пароль минимум 5 символов!</p>
          )}
        </div>
        {errMsg !== '' && <p className="error">{errMsg}</p>}
        <button className="btn btn-primary" type="submit">
          Создать
        </button>
      </form>
    </div>
  );
};

export default Signup;
