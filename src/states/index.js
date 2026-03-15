import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from '@dimasmds/react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import commentsReducer from './comments/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import threadDetailReducer from './threadDetail/reducer';
import isPreloadReducer from './isPreload/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    authUser: authUserReducer,
    comments: commentsReducer,
    threads: threadsReducer,
    users: usersReducer,
    threadDetail: threadDetailReducer,
    isPreload: isPreloadReducer,
  },
});

export default store;
