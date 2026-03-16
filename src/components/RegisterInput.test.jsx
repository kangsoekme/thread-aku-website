import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RegisterInput from './RegisterInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

/**
 * should input name correctly
 * should input email correctly
 * should input password correctly
 * should call login when button clicked
 */

describe('RegisterInput test', () => {
  afterEach(() => {
    cleanup();
  });

  it('should input name correctly', async () => {
    render(<RegisterInput register={() => {}} />);

    const nameInput = await screen.getByPlaceholderText('Name');

    await userEvent.type(nameInput, 'nameTest');

    expect(nameInput).toHaveValue('nameTest');
  });

  it('should input email correctly', async () => {
    render(<RegisterInput register={() => {}} />);

    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'emailTest');

    expect(emailInput).toHaveValue('emailTest');
  });

  it('should input password correctly', async () => {
    render(<RegisterInput register={() => {}} />);

    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'passwordTest');

    expect(passwordInput).toHaveValue('passwordTest');
  });

  it('should call Register when button clicked', async () => {
    const mockRegister = vi.fn();

    render(<RegisterInput register={mockRegister} />);

    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'nameTest');

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailTest');

    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordTest');

    const RegisterButton = await screen.getByRole('button', {
      name: 'Register',
    });

    await userEvent.click(RegisterButton);

    expect(mockRegister).toBeCalledWith({
      name: 'nameTest',
      email: 'emailTest',
      password: 'passwordTest',
    });
  });
});
