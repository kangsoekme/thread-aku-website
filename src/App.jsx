import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { asyncPreloadProcess } from './states/isPreload/action';
import LoadingBar from '@dimasmds/react-redux-loading-bar';

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };
  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <main>
          <LoadingBar />
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <main>
        <LoadingBar />
        <Routes>
          <Route
            path="/"
            element={<Homepage authUser={authUser} signOut={onSignOut} />}
          />
          <Route
            path="/new"
            element={<CreatePage authUser={authUser} signOut={onSignOut} />}
          />
          <Route
            path="/thread/:id"
            element={<DetailPage authUser={authUser} signOut={onSignOut} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
