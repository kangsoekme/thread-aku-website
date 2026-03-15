import PropTypes from 'prop-types';
import React from 'react';
import { BiComment } from 'react-icons/bi';
import { FaRegClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ThreadItem({ id, title, body, createdAt, user, totalComments }) {
  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  return (
    <article className="thread-item" onClick={onThreadClick}>
      <header className="thread-head">
        <h1>{title}</h1>
      </header>
      <main className="thread-main">
        <p className="thread-body">{body}</p>
      </main>
      <div className="thread-information">
        <p>{user?.name}</p>
        <div className="thread-likes-uploads">
          <div className="comment">
            <BiComment />
            <p>{totalComments}</p>
          </div>
          <div className="upload-time">
            <FaRegClock />
            <p>{new Date(createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

const userShape = {
  name: PropTypes.string.isRequired,
};

const threadItemShapes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShapes,
  user: PropTypes.shape(userShape).isRequired,
};

export { threadItemShapes };
export default ThreadItem;
