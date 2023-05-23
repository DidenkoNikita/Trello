'use client';

import { useState } from 'react';

import { Box, Button, } from '@mui/material';
import { Add } from '@mui/icons-material';

import { addBoard } from '../../store/asyncActions/addBoard';

import Board from '../Board/Board';
import ModalWindow from '../ModalWindow/ModalWindow';

import css from './BoardContainer.module.css';

export interface Props {
    filter: Filter[];   
}

export interface Filter {
    id: number;
    title: string;
}

export default function BoardContainer({ filter }: Props): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
  
    const dialogTitle: string = 'Введите название доски';
    const buttonTitle: string = 'Добавить доску';
  
    const handleClickOpen = (): void => {
        setOpen(true);
    }
  
    const handleClose = (): void => {
        setOpen(!open);      
    }
    
    return (
      <Box className={ css.area  }>
            <Button
                size='small'
                sx={{
                    marginTop: '10px',
                }} 
                onClick={() => {
                    handleClickOpen();
                }}
                variant='contained' 
                disabled={open}
            >
                <Add />
                Добавить доску
            </Button>
            <ModalWindow
                open={open}
                handleClose={ handleClose } 
                dialogTitle={ dialogTitle } 
                buttonTitle={ buttonTitle } 
                request={ addBoard }
            />
            <Board filter={ filter } />
        </Box>
    );
  }