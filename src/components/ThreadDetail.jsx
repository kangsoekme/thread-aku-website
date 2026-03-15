import React from 'react';
import { FaRegClock } from 'react-icons/fa';
import CommentsList from './CommentsList';
import { useDispatch } from 'react-redux';
import { asyncAddCommentToThreadDetail } from '../states/threadDetail/action';
import { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadDetail({ id, title, body, owner, createdAt, comments = [] }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');

  const onSubmitComment = (event) => {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    dispatch(asyncAddCommentToThreadDetail({ threadId: id, content }));
    setContent('');
  };

  return (
    <section className="thread-detail">
      <main className="thread-content">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }} />

        <div className="thread-info">
          <div className="creator">
            <img src={owner?.avatar} alt="" className="user-avatar" />
            <p>{owner?.name}</p>
          </div>
          <div className="upload-time">
            <FaRegClock />
            <p>{new Date(createdAt).toLocaleString()}</p>
          </div>
        </div>
      </main>
      <section className="comment-container">
        <form action="" className="comment-form" onSubmit={onSubmitComment}>
          <h3>Berikan komentar menarik!</h3>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
      <section className="comment-list">
        <CommentsList comments={comments} />
      </section>
    </section>
  );
}

const ownerShape = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  comments: PropTypes.array.isRequired,
};

export default ThreadDetail;
