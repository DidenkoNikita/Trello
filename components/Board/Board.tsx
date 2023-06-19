'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Box, Button, ButtonBase, Container, Grid, Paper } from '@mui/material';
import { Add, Clear, Edit } from '@mui/icons-material';

import { Props } from '../BoardContainer/BoardContainer';

import { addTask } from '../../store/asyncActions/addTask';
import { addAllBoard } from '../../store/asyncActions/addAllBoard';
import { addAllTask } from '../../store/asyncActions/addAllTask';
import { boardRemove } from '../../store/asyncActions/removeBoard';
import { store } from '../../store/store';
import { titleBoardUpdate } from '../../store/asyncActions/updateTitleBoard';

import ModalWindow from '../ModalWindow/ModalWindow';
import Task from '../Task/Task';

import css from './Board.module.css';

interface Data {
    id: number;
    title: string;
}

export default function Board({ filter }: Props): JSX.Element | null {
    const [open, setOpen] = useState<boolean>(false);
    const [openBoard, setOpenBoard] = useState<boolean>(false);
    const [selectId, setSelectId] = useState<number | null>(null);

    const dialogTitleEditBoard: string = 'Введите новый заголовок';
    const buttonTitleEditBoard: string = 'Изменить';
    const dialogTitleTask: string = 'Введите описание задачи';
    const buttonTitleTask: string = 'Добавить задачу';

    const router = useRouter();

    useEffect(() => {
        store.dispatch(addAllBoard());
        store.dispatch(addAllTask());
    }, []);

    if (!filter) {
        return null;
    }

    const handleClickOpen: any = (id: number): void => {
        setSelectId(id)
        setOpen(true);
    }

    const handleClose = (): void => {
        setOpen(false);
    }

    const handleClickOpenBoard = (id: number): void => {
        setSelectId(id)
        setOpenBoard(true);
    }

    const handleCloseBoard = (): void => {
        setOpenBoard(false);
    }

    return (
        <Container
            maxWidth='xl'
            sx={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >
            <Grid
                container
                spacing={1}
                sx={{
                    gridAutoFlow: 'dense'
                }}
            >
                {filter.map(({ id, title }: Data) => {
                    return (
                        <Grid
                            item
                            key={id}
                            data-testid={id}
                        >
                            <Paper
                                elevation={8}
                                sx={{
                                    width: '305px',
                                    minHeight: '125px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '10px',
                                }}
                            >
                                <Box className={css.headerArea}>
                                    <div
                                        onDoubleClick={() => {
                                            handleClickOpenBoard(id);
                                        }}
                                        className={css.boardName}
                                    >
                                        {title}
                                    </div>
                                    <ButtonBase
                                        id='update_board'
                                        data-testid='update_board'
                                        onClick={() => {
                                            handleClickOpenBoard(id);
                                        }}
                                        sx={{
                                            display: 'flex',
                                            width: '25px',
                                            height: '25px',
                                            alignItems: 'start',
                                            justifySelf: 'start',
                                            marginRight: '5px'
                                        }}
                                    >
                                        <Edit
                                            sx={{
                                                alignSelf: 'center',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </ButtonBase>
                                    <ButtonBase
                                        id='remove_board'
                                        data-testid='remove_board'
                                        onClick={() => {
                                            store.dispatch(boardRemove(id))
                                        }}
                                        sx={{
                                            display: 'flex',
                                            width: '25px',
                                            height: '25px',
                                            alignItems: 'start',
                                            justifySelf: 'flex-end',
                                            marginRight: '5px'
                                        }}
                                    >
                                        <Clear
                                            sx={{
                                                alignSelf: 'center',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </ButtonBase>
                                </Box>
                                <Task idBoard={id} />
                                <Box
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Button
                                        id='create_task'
                                        data-testid='create_task'
                                        size='small'
                                        variant='contained'
                                        onClick={() => {
                                            handleClickOpen(id);
                                        }}
                                        disabled={open}
                                        sx={{
                                            marginBottom: '10px',
                                            marginRight: '10px',
                                            maxWidth: '150px',
                                            alignSelf: 'center',
                                            paddingLeft: '5px',
                                        }}
                                    >
                                        <Add />
                                        Добавить задачу
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
            <ModalWindow
                open={openBoard}
                handleClose={handleCloseBoard}
                dialogTitle={dialogTitleEditBoard}
                buttonTitle={buttonTitleEditBoard}
                selectId={selectId}
                request={titleBoardUpdate}
            />
            <ModalWindow
                open={open}
                handleClose={handleClose}
                dialogTitle={dialogTitleTask}
                buttonTitle={buttonTitleTask}
                selectId={selectId}
                request={addTask}
            />
        </Container>
    );
};