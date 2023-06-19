import { act } from "react-dom/test-utils";
import Custom401 from "../../../app/401/page";
import { render, screen } from "@testing-library/react";

jest.mock('next/navigation', () => require('next-router-mock'));

describe('401 page', () => {
  it('Should render properly', async () => {
    render(<Custom401 />);
    const button = screen.getByTestId('return');
    act(() => button.click())
  })
})