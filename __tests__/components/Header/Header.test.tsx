import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from '@jest/globals'

import { Header } from "../../../components/Header/Header";

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('jest-fetch-mock');

describe('Header component', () => {
  it('Should render properly', () => {
    render(<Header />);

    const linkOurProject = screen.getByText('Our projects');

    const linkAboutUse = screen.getByText('About Us');

    const linkToDoList = screen.getByText('To-do list');

    const mockFetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ name: 'Nikita Didenko' }),
    });

    global.fetch = mockFetch;

    const userName = async (): Promise<void> => {
      const API_URL = process.env.API_URL;
      
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${'jskkmcsmdkmkkmdmkmksdkmdmk'}`,
      };
    
      try {
        const response: Response = await fetch(`${API_URL}/user`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ user_id: 4 })
        });
    
        const data = await response.json();    
        
        expect(data.name).not.toBeUndefined();
      } catch (err) {
        return console.log(err);
      } 
    }
    userName()
    fireEvent.click(linkAboutUse);
    fireEvent.click(linkOurProject);
    fireEvent.click(linkToDoList);
  })
})