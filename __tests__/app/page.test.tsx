import React from 'react';
import { act } from 'react-dom/test-utils';
import {expect} from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';

import LoginForm from '../../app/page';

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('jest-fetch-mock');

describe('LoginForm', () => {
  it('should submit form and redirect to /home/to_do_list on successful login', async () => {
    render(<LoginForm />);

    const loginInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Log in');

    const mockFetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ id: 4, refreshToken: 'token' }),
    });

    global.fetch = mockFetch;

    await act(async () => {
      fireEvent.change(loginInput, { target: { value: 'nikitadidenko2@gmail.com' } });
      fireEvent.change(passwordInput, { target: { value: '1234' } });

      fireEvent.click(submitButton);
    });

    const handleSubmit = async (): Promise<void> => {
      const API_URL = process.env.API_URL;
      try {
        const response: Response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ login: 'nikitadidenko2@gmail.com', password: '1234' })
        });
        const data = await response.json();
  
        const {id, refreshToken} = data;
  
        expect(id).toBe(4);
        expect(refreshToken).not.toBeUndefined();
        
      } catch (e) {
        return console.log('An error has occurred', e);
      }
    };
    await handleSubmit();
  });
});
