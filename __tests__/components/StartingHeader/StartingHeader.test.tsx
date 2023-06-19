import { render } from "@testing-library/react";

import { StartingHeader } from "../../../components/StartingHeader/StartingHeader";

describe('Starting Header component', () => {
  it('Should render properly', () => {
    render(<StartingHeader />);
  })
})