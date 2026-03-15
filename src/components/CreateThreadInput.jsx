import React from 'react';

import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function CreateThreadInput({ createThread }) {
  const [title, setTitle] = useInput('');
  const [body, setBody] = useInput('');
  const [category, setCategory] = useInput('');

  return (
    <>
      <form action="" className="thread-input">
        <h1>Buat thread mu disini</h1>
        <input
          type="text"
          value={title}
          onChange={setTitle}
          placeholder="Title"
        />

        <input
          type="text"
          value={category}
          onChange={setCategory}
          placeholder="Category"
        />
        <textarea
          type="text"
          value={body}
          onChange={setBody}
          placeholder="Body"
        />
        <button
          type="button"
          onClick={() => createThread({ title, body, category })}
        >
          Create Thread
        </button>
      </form>
    </>
  );
}

CreateThreadInput.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default CreateThreadInput;
