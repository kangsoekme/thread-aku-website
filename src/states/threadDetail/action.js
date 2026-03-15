import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT_TO_THREAD_DETAIL: 'ADD_COMMENT_TO_THREAD_DETAIL',
};

function receiveThreadDetailActionCrator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCrator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentToThreadDetailActionCrator(comment) {
  return {
    type: ActionType.ADD_COMMENT_TO_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCrator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCrator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddCommentToThreadDetail({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentToThreadDetailActionCrator(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCrator,
  clearThreadDetailActionCrator,
  asyncReceiveThreadDetail,
  addCommentToThreadDetailActionCrator,
  asyncAddCommentToThreadDetail,
};
