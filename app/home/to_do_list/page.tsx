'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { Box } from '@mui/material';

import FilterBoard from '@/components/FilterBoard/FilterBoard';
import BoardContainer, { Filter } from '@/components/BoardContainer/BoardContainer';
import { Header } from '@/components/Header/Header';

import css from './page.module.css';

interface Board {
  id: number;
  title: string;
  filter: any;
}

interface State {
  boards: Board;
}

export default function TodoList(): JSX.Element {
  const boards: Board = useSelector((state: State) => state.boards);
  const [ search, setSearch ] = useState<string>('');
  const [query, setQuery ] = useState<string>('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target;
    setQuery(form.search.value);
  }

  const filter: Filter[] = boards.filter((board: Board) => {
    return board?.title?.toLowerCase().includes(query.toLocaleLowerCase())!;
  }).sort((a: Board, b: Board) => a.id - b.id);

  return (
    <Box className={css.region}>
      <Header />
      <FilterBoard 
        search={search} 
        setSearch={setSearch} 
        handleSubmit={handleSubmit} 
      />
      <BoardContainer filter={filter} />
    </Box>
  );
};