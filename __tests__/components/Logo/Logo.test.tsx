import { render } from "@testing-library/react";

import { Logo } from "../../../components/Logo/Logo";

describe('Logo component', () => {
  it('Should render properly', () => {
    render(<Logo />);
  })
})