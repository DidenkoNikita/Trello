import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import User from '../../../components/User/User';

describe('User', () => {
  test('should render user name correctly', () => {
    const name = 'John Doe';
    
    render(<User name={name} />);

    screen.getByText(name);
  });
});