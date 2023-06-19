'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, ButtonBase, Checkbox, Paper } from '@mui/material';
import { Clear, Edit } from '@mui/icons-material';

import { completTask } from '../../store/asyncActions/completTask';
import { taskRemove } from '../../store/asyncActions/removeTask';
import { store } from '../../store/store';
import { descriptionTaskUpdate } from '../../store/asyncActions/updateDescriptionTask';

import ModalWindow from '../ModalWindow/ModalWindow';
import { useRouter } from 'next/navigation';

import css from './Task.module.css';

interface Props {
  idBoard: number;
}

interface Tasks {
  id: number;
  completed: boolean;
  title: string;
  board_id: number;
  filter: any;
}

interface ITasks {
  tasks: Tasks;
}

export default function Task({ idBoard }: Props): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number | null>(null);

  const router = useRouter();

  const dialogTitle: string = 'Введите новое описание';
  const buttonTitle: string = 'Изменить';

  const tasks: Tasks[] = useSelector((state: ITasks) =>
    state.tasks.filter((task: Tasks) => idBoard === task?.board_id).sort((a: Tasks, b: Tasks) => a.id - b.id)
  );

  const handleClickOpen = (id: number): void => {
    setSelectId(id);
    setOpen(true);    
  }

  const handleCloseTask = (): void => {
    setOpen(!open);
  }

  return (
    <Box 
      className={ css.taskArea }
    >
      {Array.isArray(tasks) &&
        tasks.map(({ id, completed, title }: Tasks) => {
          return (
            <Paper 
              className={ css.task } 
              key={ id } 
              elevation={ 2 }
            >
              <Checkbox
                data-testid='completed'
                checked={ completed }
                onClick={() => {
                  store.dispatch(completTask(id, completed));
                }}
                sx={{
                  width: '0px',
                  height: '0px'
                }}
              />
              <Box 
                className={ !completed ? css.notCompleted : css.done }
                onDoubleClick={() => {
                  handleClickOpen(id);
                }}
                sx={{
                  color: 'text.primary',
                }}
              >
                { title }
              </Box>
                <ButtonBase
                  id='update_task'
                  data-testid='update_task'
                  onClick={() => {
                    handleClickOpen(id);
                  }}
                  sx={{
                    display: 'flex',
                    width: '1px',
                    height: '1px',
                    alignItems: 'start',
                    justifySelf: 'start',
                    marginRight: '10px'
                  }}
                >
                  <Edit 
                    sx={{
                      alignSelf: 'center',
                      cursor: 'pointer',
                      color: 'text.primary'
                    }}
                  />   
                </ButtonBase>
                <ButtonBase
                  id='remove_task'
                  data-testid='remove_task'
                  className={ css.delete }
                  onClick={() => {
                    store.dispatch(taskRemove(id))
                  }}
                >
                  <Clear 
                    sx={{
                      color: 'text.primary'
                    }}
                  />
                </ButtonBase>
            </Paper>
          );
        })}
        <ModalWindow
          open={ open }  
          handleClose={ handleCloseTask } 
          dialogTitle={ dialogTitle } 
          buttonTitle={ buttonTitle } 
          selectId={ selectId } 
          request={ descriptionTaskUpdate }
        />
    </Box>
  );
};