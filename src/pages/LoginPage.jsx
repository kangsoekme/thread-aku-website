import React from 'react';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <>
      <section className="login-page">
        <main className="login-content">
          <header className="login-page__header">
            <h1>Login</h1>
          </header>
          <br />
          <LoginInput login={onLogin} />
          <br />
          <p>
            Dont have a account?,{' '}
            <Link to="/register" className="logging-information">
              Register here
            </Link>
          </p>
        </main>
      </section>
    </>
  );
}

export default LoginPage;
