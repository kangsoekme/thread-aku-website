import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  asyncReceiveThreadDetail,
  clearThreadDetailActionCrator,
  receiveThreadDetailActionCrator,
} from './action';
import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveThreadDetail thunk test', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;

    delete api._getThreadDetail;
  });

  it('should dispatch action success ', async () => {
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetail);

    const dispatch = vi.fn();

    await asyncReceiveThreadDetail('thread-i')(dispatch);

    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(clearThreadDetailActionCrator());
    expect(dispatch).toHaveBeenCalled(
      receiveThreadDetailActionCrator(fakeThreadDetail)
    );
    expect(dispatch).toHaveBeenCalled(hideLoading());
  });

  it('should dispatch action failed', async () => {
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    await asyncReceiveThreadDetail('thread-i')(dispatch);

    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
