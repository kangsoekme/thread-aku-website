import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const fakeTokenResponse = {
  token: 'fake-token',
};

const fakeAuthUser = [
  {
    id: 'user-1',
    name: 'Ahmad',
    email: 'ahmad@mail.com',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk test', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api.putAccessToken;
    delete api.getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.login = () => Promise.resolve(fakeTokenResponse);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

    const dispatch = vi.fn();

    await asyncSetAuthUser({ email: 'ahmad@mail.com', password: 'nasibakar' })(
      dispatch
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUser)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should should dispatch action and call alert correctly when login failed', async () => {
    api.login = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    window.alert = vi.fn();

    await asyncSetAuthUser({ email: 'ahmad@mail.com', password: 'nasibakar' })(
      dispatch
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
