import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
};

function receiveCommentsActionCreator(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: {
      comments,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveCommentsActionCreator,
  addCommentActionCreator,
  asyncAddComment,
};
