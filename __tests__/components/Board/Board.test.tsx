import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

import { store } from '@/store/store';

import Board from '@/components/Board/Board';

jest.mock('next/navigation', () => require('next-router-mock'));

jest.mock('jest-fetch-mock');

describe('Board component', () => {
  it('render board', async () => {
    const boardData = [
      { id: 1, title: 'Board 1' }
    ];

    render(
      <Provider store={store}>
        <Board filter={boardData} />
      </Provider>
    )

    expect(screen.getByText('Board 1'));
  });
});