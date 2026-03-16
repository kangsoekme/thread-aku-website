import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncGetUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncGetUsers,
  asyncRegisterUser,
};
