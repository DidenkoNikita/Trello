import { render } from "@testing-library/react";

import { screen } from "@testing-library/react";

import Home from "../../../app/home/page";

jest.mock('next/navigation', () => require('next-router-mock'));

describe('Home page', () => {
  it('Should render properly', () => {
    render(<Home />);
    screen.getByText('Trello page');
  })
})