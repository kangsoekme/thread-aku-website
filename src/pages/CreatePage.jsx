import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateThreadInput from '../components/CreateThreadInput';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/threads/action';
import PropTypes from 'prop-types';

function CreatePage({ authUser, signOut }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onAddThread = async ({ title, category, body }) => {
    const success = await dispatch(asyncAddThread({ title, category, body }));
    if (success) {
      navigate('/');
    }
  };

  return (
    <>
      <section className="create-page">
        <Navbar authUser={authUser} signOut={signOut} />
        <CreateThreadInput createThread={onAddThread} />
      </section>
    </>
  );
}

CreatePage.propTypes = {
  authUser: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default CreatePage;
