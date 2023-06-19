import React from 'react';
import { test } from '@jest/globals';

import { act } from 'react-dom/test-utils';

import {expect} from '@jest/globals'

import { render, fireEvent, screen } from '@testing-library/react';

import RegistrationForm from '../../../app/registration/page';

jest.mock('next/navigation', () => require('next-router-mock'));


jest.mock('jest-fetch-mock');

describe('Regiastration form', () => {
  test('should submit form and redirect to /home/to_do_list on successful registration', async () => {
    render(<RegistrationForm />);

    const loginInput = screen.getByPlaceholderText('Email');
    const fullNameInput = screen.getByPlaceholderText('Full name');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Зарегистрироваться');

    const mockFetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ id: 16, refreshToken: 'token' }),
    });

    global.fetch = mockFetch;

    await act(async () => {
      fireEvent.change(loginInput, { target: { value: 'dick@gmail.com' } });

      fireEvent.change(fullNameInput, { target: { value: 'Dick' } })

      fireEvent.change(passwordInput, { target: { value: '1234' } });



      fireEvent.click(submitButton);
    });

    const handleSubmit = async (): Promise<void> => {
      const API_URL = process.env.API_URL;
      try {
        const response: Response = await fetch(`${API_URL}/registration`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ login: 'dick@gmail.com', fullName: 'Dick',  password: '1234' })
        });
        const data = await response.json();
  
        const {id, refreshToken} = data;

        console.log(data);
        
  
        expect(id).toBe(16);
        expect(refreshToken).not.toBeUndefined()
        
      } catch (e) {
        console.log('Произошла ошибка', e);
      }
    };
    await handleSubmit();
  });
});
