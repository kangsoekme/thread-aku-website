import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LoginInput from './LoginInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

/**
 * should input email correctly
 * should input password correctly
 * should call login when button clicked
 */

describe('LoginInput test', () => {
  afterEach(() => {
    cleanup();
  });

  it('should input email correctly', async () => {
    render(<LoginInput login={() => {}} />);

    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'emailTest');

    expect(emailInput).toHaveValue('emailTest');
  });

  it('should input password correctly', async () => {
    render(<LoginInput login={() => {}} />);

    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'passwordTest');

    expect(passwordInput).toHaveValue('passwordTest');
  });

  it('should call login when button clicked', async () => {
    const mockLogin = vi.fn();

    render(<LoginInput login={mockLogin} />);

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailTest');

    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordTest');

    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'emailTest',
      password: 'passwordTest',
    });
  });
});
