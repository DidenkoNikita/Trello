import FilterBoard from "@/components/FilterBoard/FilterBoard"
import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils";

describe('Filter Board component', () => {
  it('Should render properly', async () => {
    let search: string = '' 

    const setSearch = (value: any): string  => {
      return search = value;
    }
  
    const handleSubmit = (event: any) => {
      event.preventDefault();
    }
    render(
      <FilterBoard 
        search={ search } 
        setSearch={ setSearch } 
        handleSubmit={ handleSubmit } 
      />
    )

    const inputFilterBoard = screen.getByPlaceholderText('Поиск досок');
    const buttonFilterBoard = screen.getByText('Поиск');

    await act(async () => {
      fireEvent.change(inputFilterBoard, { target: { value: 'Board' } });

      fireEvent.click(buttonFilterBoard);
    });
  })
})