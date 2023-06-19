import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "@/store/store";

import Task from "@/components/Task/Task";

jest.mock('next/navigation', () => require('next-router-mock'));

describe('Task component', () => {
  it('renders tasks', () => {
    render(
      <Provider store={store}>
        <Task idBoard={1} />
      </Provider>
    );
  });
})