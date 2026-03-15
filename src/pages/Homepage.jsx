import React from 'react';
import ThreadsList from '../components/ThreadsList';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncReceiveThreads } from '../states/threads/action';
import { asyncGetUsers } from '../states/users/action';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import PropTypes from 'prop-types';

function Homepage({ authUser, signOut }) {
  const { threads = [], users = [] } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreads());
    dispatch(asyncGetUsers());
  }, [dispatch]);

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="homepage">
      <Navbar authUser={authUser} signOut={signOut} />
      <ThreadsList threads={threadsList} />
      <Link to="/new" className="add-button">
        <FaPlus className="add-button-icon" />
      </Link>
    </section>
  );
}

Homepage.propTypes = {
  authUser: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Homepage;
