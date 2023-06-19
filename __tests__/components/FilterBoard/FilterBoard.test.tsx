import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import FilterBoard from "@/components/FilterBoard/FilterBoard";

describe('Filter Board component', () => {
  it('Should render properly', async () => {
    let search: string = '' ;

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

    const inputFilterBoard = screen.getByPlaceholderText('Search board');
    const buttonFilterBoard = screen.getByText('Search');

    await act(async () => {
      fireEvent.change(inputFilterBoard, { target: { value: 'Board' } });

      fireEvent.click(buttonFilterBoard);
    });
  })
})