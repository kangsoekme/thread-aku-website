import React from 'react';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

function CommentsList({ comments = [] }) {
  return (
    <section className="comment-list">
      <h3>Komentar</h3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </section>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentsList;
