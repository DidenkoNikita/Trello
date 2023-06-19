import BoardContainer from "@/components/BoardContainer/BoardContainer";
import { store } from "@/store/store";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

interface Filter {
  id: number;
  title: string;
}

jest.mock('next/navigation', () => require('next-router-mock'));
jest.mock('jest-fetch-mock');

describe('Board Container component', () => {
  it('Should render properly', async () => {
    const filter: Filter[] = [
      {
        id: 1,
        title: 'Board'
      }
    ];
    
    render(
      <Provider store={store}>
        <BoardContainer filter={ filter } />
      </Provider>
    );

    const button = screen.getByText('Добавить доску');
    
    fireEvent.click(button);
  })
})