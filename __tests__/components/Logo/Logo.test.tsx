import { Logo } from "../../../components/Logo/Logo"
import { render } from "@testing-library/react"

describe('Logo component', () => {
  it('Should render properly', () => {
    render(<Logo />);
  })
})