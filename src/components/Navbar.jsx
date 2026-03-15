import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

function Navbar({ authUser, signOut }) {
  if (!authUser) return null;
  const { avatar, name } = authUser;
  return (
    <section className="navbar-container">
      <nav>
        <Link to="/">
          <h1>ThreadAku</h1>
        </Link>

        <ul>
          <li>
            <img src={avatar} alt={name} className="user-avatar" />
          </li>
          <li>
            <button type="button" onClick={signOut}>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
}

const authUserShape = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Navbar.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
