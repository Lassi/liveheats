import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LOCALSTORAGE_KEY } from '@/lib/constants';

import { NewRaceForm } from './new-race-form';

describe('NewRaceForm', () => {
  it('should render an input to add a student', () => {
    render(
      <NewRaceForm />
    );

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('should render a button to add the student', () => {
    render(
      <NewRaceForm />
    );

    const button = screen.getByRole('button', { name: 'Add student' });

    expect(button).toBeInTheDocument();
  });

  it('should add the student to a list when I click the button', async () => {
    render(
      <NewRaceForm />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(input, 'John Student');
    await userEvent.click(button);

    const studentItem = screen.getByRole('listitem');

    expect(studentItem).toBeInTheDocument();
    expect(studentItem).toHaveTextContent('John Student');
  });

  it('should clear the input when I add a student', async () => {
    render(
      <NewRaceForm />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(input, 'John Student');
    await userEvent.click(button);

    expect(input).toHaveValue('');
  });

  it('should have a create race button', () => {
    render(
      <NewRaceForm />
    );

    const button = screen.getByRole('button', { name: 'Create race' });

    expect(button).toBeInTheDocument();
  });

  it('should save the result in the localstorage when I click create race', async () => {
    render(
      <NewRaceForm />
    );

    const input = screen.getByRole('textbox');
    const addStudentButton = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(input, 'Van Halen');
    await userEvent.click(addStudentButton);

    await userEvent.type(input, 'Rhapsody');
    await userEvent.click(addStudentButton);

    await userEvent.click(screen.getByRole('button', { name: 'Create race' }));

    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    expect(data).toMatchObject([{ students: [{ name: 'Van Halen' }, { name: 'Rhapsody' } ] }]);
  });

  it('should call the onCreateSuccess callback with the uuid of the race and save it in the race', async () => {
    const onCreateSuccess = jest.fn();
    render(
      <NewRaceForm onCreateSuccess={onCreateSuccess}/>
    );

    const input = screen.getByRole('textbox');
    const addStudentButton = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(input, 'Patrick');
    await userEvent.click(addStudentButton);

    await userEvent.type(input, 'Bob');
    await userEvent.click(addStudentButton);

    await userEvent.click(screen.getByRole('button', { name: 'Create race' }));

    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    expect(onCreateSuccess).toHaveBeenCalledWith(data.at(0).id);
  });
});
