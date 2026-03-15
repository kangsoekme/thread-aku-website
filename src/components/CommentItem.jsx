import PropTypes from 'prop-types';
import React from 'react';

function CommentItem({ owner, content, createdAt }) {
  return (
    <section className="comment-item">
      <div className="author">
        <img src={owner?.avatar} alt="" className="user-avatar" />
        <p>{owner?.name}</p>
      </div>
      <main className="comment-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <small>{new Date(createdAt).toLocaleString()}</small>
      </main>
    </section>
  );
}

CommentItem.propTypes = {
  owner: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
  createdAt: PropTypes.func.isRequired,
};

export default CommentItem;
