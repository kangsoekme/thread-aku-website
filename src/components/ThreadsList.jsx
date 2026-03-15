import React from 'react';
import ThreadItem, { threadItemShapes } from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadsList({ threads }) {
  return (
    <>
      <section className="threads-list">
        {threads.map((thread) => (
          <ThreadItem key={thread.id} {...thread} />
        ))}
      </section>
    </>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShapes).isRequired),
};

export default ThreadsList;
