import { useLocation } from 'react-router';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import s from './AuthPage.module.css';

const AuthPage = () => {
  const location = useLocation();

  return (
    <div className={s.wrapper}>
      {location.pathname === '/auth/register' && <RegisterForm />}
      {location.pathname === '/auth/login' && <LoginForm />}
    </div>
  );
};

export default AuthPage;
