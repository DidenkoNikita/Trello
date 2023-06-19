import { act } from "react-dom/test-utils";
import Custom404 from "../../../app/404/page";
import { render, screen } from "@testing-library/react";

jest.mock('next/navigation', () => require('next-router-mock'));

describe('401 page', () => {
  it('Should render properly', async () => {
    render(<Custom404 />);
    const button = screen.getByTestId('return');
    act(() => button.click())
  })
})