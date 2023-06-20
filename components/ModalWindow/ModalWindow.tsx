'use client';

import { useState } from 'react';

import { Close, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import { store } from '@/store/store';

interface Modal {
  open: boolean;
  handleClose: any;
  dialogTitle: string;
  buttonTitle: string;
  selectId?: number | null;
  request: any;
}

export default function ModalWindow({open, dialogTitle, handleClose, buttonTitle, selectId, request}: Modal): JSX.Element {

  const [inputValue, setInputValue] = useState<string>('');    
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputValue.trim() !== '') { 
        store.dispatch(request(selectId, inputValue));
        setInputValue('');
        handleClose();
      } else {
        handleClose();
      }
    }
  }  

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField 
          name='modal-input'
          type='text'
          id='outlined-basic' 
          label='Title' 
          variant='outlined' 
          autoFocus={true}
          size='small'
          onKeyDown={handleKeyDown}
          value={inputValue}
          onChange={(e) => {
              setInputValue(e.target.value);
          }}
          sx={{
              marginTop: '10px'
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          id='create'
          data-testid='create-button'
          variant='contained' 
          size='small'
          sx={{
            marginLeft: '7px',
            marginBottom: '10px'
          }} 
          onClick={() => {
            if (inputValue.trim() !== '') {               
              store.dispatch(request(selectId, inputValue));
              setInputValue('');
              handleClose();
            } else {
              handleClose();
            }
          }}
        >
          <Edit />
          {buttonTitle}
        </Button>
        <Button
          id='cansel'
          data-testid='cancel-button'
          variant='contained' 
          size='small'
          onClick={() => {
            handleClose();
          }}
        >
          <Close />   
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}