import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { expect, jest } from '@jest/globals'

import { store } from '@/store/store';
import { addTask } from '@/store/asyncActions/addTask';

import ModalWindow from '@/components/ModalWindow/ModalWindow';

const handleClose = () => {};

const handleCloseMock = jest.fn(handleClose)

const addTaskMock = jest.fn(addTask);

describe('ModalWindow component', () => {
  
  it('modal window', () => {
    render(
      <Provider store={store}>
        <ModalWindow
          open={true}
          dialogTitle="Test Dialog"
          handleClose={handleCloseMock}
          buttonTitle="Test Button"
          selectId={1}
          request={addTaskMock}
        />
      </Provider>
    );

    const dialogTitle = screen.getByText('Test Dialog') as HTMLElement;
    expect(dialogTitle).toBeTruthy();

    const cancelButton = screen.getByTestId('cancel-button') as HTMLElement;
    fireEvent.click(cancelButton);

    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it('create', async () => {
    render(
      <Provider store={store}>
        <ModalWindow
          open={true}
          dialogTitle="Test Dialog"
          handleClose={handleCloseMock}
          buttonTitle="Test Button"
          selectId={1}
          request={addTaskMock}
        />
      </Provider>
    );

    const inputElement = screen.getByLabelText('Title') as HTMLInputElement;
    const createButton = screen.getByTestId('create-button') as HTMLElement;

    fireEvent.change(inputElement, { target: { value: 'Test Title' } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(addTaskMock).toHaveBeenCalled();
    });
  });
});