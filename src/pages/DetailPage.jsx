import React from 'react';
import ThreadDetail from '../components/ThreadDetail';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import PropTypes from 'prop-types';

function DetailPage({ authUser, signOut }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { threadDetail = null } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  return (
    <>
      <section className="detail-page">
        <Navbar authUser={authUser} signOut={signOut} />
        <ThreadDetail {...threadDetail} />
      </section>
    </>
  );
}

DetailPage.propTypes = {
  authUser: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default DetailPage;
