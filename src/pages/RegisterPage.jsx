import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    const success = await dispatch(
      asyncRegisterUser({ name, email, password })
    );

    if (success) {
      navigate('/');
    }
  };

  return (
    <>
      <section className="register-page">
        <main className="register-content">
          <header className="register-page__header">
            <h1>Register !</h1>
          </header>
          <br />
          <RegisterInput register={onRegister} />
          <br />
          <p>
            Already have a account?,{' '}
            <Link to="/" className="logging-information">
              Login here
            </Link>
          </p>
        </main>
      </section>
    </>
  );
}

export default RegisterPage;
