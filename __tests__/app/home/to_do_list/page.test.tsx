import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { store } from "@/store/store";

import TodoList from "../../../../app/home/to_do_list/page";

jest.mock('next/navigation', () => require('next-router-mock'));
jest.mock('jest-fetch-mock');

describe('To-do list page', () => {
  it('Should render properly', () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
  })
})