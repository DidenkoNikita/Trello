import React from 'react';

import { Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

import css from './FilterBoard.module.css';

interface FilterBoardProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FilterBoard({ search, setSearch, handleSubmit }: FilterBoardProps): JSX.Element {
  return (
    <form 
      autoComplete='off' 
      onSubmit={ handleSubmit } 
      className={ css.filter } 
    >
      <TextField 
        type='search' 
        name='search' 
        id='filter_form' 
        label='Board search'
        variant='outlined' 
        placeholder='Board search'
        size='small'
        onChange = {(event) => {
          setSearch(event.target.value)
        }} 
        value={ search } 
        sx={{
          marginTop: '30px',
          marginBottom: '10px'
        }}
      />
      <Button 
        id='filter_button'
        type='submit'
        variant='contained' 
        size='small'
        sx={{
          weight: '50px'
        }}
      >
        <Search />
        Search
      </Button>
    </form>
  );
};