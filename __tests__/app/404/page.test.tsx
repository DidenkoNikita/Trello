import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";

import Custom404 from "../../../app/404/page";

jest.mock('next/navigation', () => require('next-router-mock'));

describe('401 page', () => {
  it('Should render properly', async () => {
    render(<Custom404 />);

    const button = screen.getByTestId('return');

    act(() => button.click());
  })
})