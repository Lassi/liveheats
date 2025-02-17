import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NewRaceForm } from './new-race-form';
import { createRace, listRaces } from '@/lib/race-utils';

describe('NewRaceForm', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render an input to add a student', () => {
    render(
      <NewRaceForm />
    );

    const input = screen.getByRole('textbox', { name: 'New student\'s name' });

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

    const input = screen.getByRole('textbox', { name: 'New student\'s name' });
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

    const input = screen.getByRole('textbox', { name: 'New student\'s name' });
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

    const raceInput = screen.getByRole('textbox', { name: 'Race\'s name' });
    const studentInput = screen.getByRole('textbox', { name: 'New student\'s name' });
    const addStudentButton = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(raceInput, 'Epic race');

    await userEvent.type(studentInput, 'Van Halen');
    await userEvent.click(addStudentButton);

    await userEvent.type(studentInput, 'Rhapsody');
    await userEvent.click(addStudentButton);

    await userEvent.click(screen.getByRole('button', { name: 'Create race' }));

    const { liveRaces } = listRaces();
    expect(liveRaces).toMatchObject([{ students: [{ name: 'Van Halen' }, { name: 'Rhapsody' } ] }]);
  });

  it('should call the onCreateSuccess callback with the uuid of the race and save it in the race', async () => {
    const onCreateSuccess = jest.fn();
    render(
      <NewRaceForm onCreateSuccess={onCreateSuccess}/>
    );

    const raceInput = screen.getByRole('textbox', { name: 'Race\'s name' });
    const studentInput = screen.getByRole('textbox', { name: 'New student\'s name' });
    const addStudentButton = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(raceInput, 'Epic race');

    await userEvent.type(studentInput, 'Patrick');
    await userEvent.click(addStudentButton);

    await userEvent.type(studentInput, 'Bob');
    await userEvent.click(addStudentButton);

    await userEvent.click(screen.getByRole('button', { name: 'Create race' }));

    const { liveRaces } = listRaces();
    expect(onCreateSuccess).toHaveBeenCalledWith(liveRaces.at(0).id);
  });

  it('should disable the add student button is the student is already assigned to a lane', async () => {
    render(
      <NewRaceForm />
    );

    const raceInput = screen.getByRole('textbox', { name: 'Race\'s name' });
    const studentInput = screen.getByRole('textbox', { name: 'New student\'s name' });
    const addStudentButton = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(raceInput, 'Epic race');

    await userEvent.type(studentInput, 'Tim');
    await userEvent.click(addStudentButton);

    await userEvent.type(studentInput, 'Tim');

    expect(addStudentButton).toBeDisabled();
  });

  it('should disable the create race button if there is less than 2 students', async () => {
    render(
      <NewRaceForm />
    );

    const raceInput = screen.getByRole('textbox', { name: 'Race\'s name' });
    const studentInput = screen.getByRole('textbox', { name: 'New student\'s name' });
    const addStudentButton = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(raceInput, 'Epic race');

    await userEvent.type(studentInput, 'Tim');
    await userEvent.click(addStudentButton);

    expect(screen.getByRole('button', { name: 'Create race' })).toBeDisabled();
  });

  it('should append data and not overwrite existing races', async () => {
    createRace(['Camila', 'Esteban']);

    render(
      <NewRaceForm />
    );

    const raceInput = screen.getByRole('textbox', { name: 'Race\'s name' });
    const studentInput = screen.getByRole('textbox', { name: 'New student\'s name' });
    const addStudentButton = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(raceInput, 'Epic race');

    await userEvent.type(studentInput, 'Pam');
    await userEvent.click(addStudentButton);

    await userEvent.type(studentInput, 'Tam');
    await userEvent.click(addStudentButton);

    await userEvent.click(screen.getByRole('button', { name: 'Create race' }));

    const { liveRaces } = listRaces();
    expect(liveRaces).toHaveLength(2);
  });

  it('should render an input to name the race', () => {
    render(
      <NewRaceForm />
    );

    const input = screen.getByRole('textbox', { name: 'Race\'s name' });

    expect(input).toBeInTheDocument();
  });

  it('should disable the create race button if no name is provided for the race', async () => {
    render(
      <NewRaceForm />
    );

    const input = screen.getByRole('textbox', { name: 'New student\'s name' });
    const addStudentButton = screen.getByRole('button', { name: 'Add student' });

    await userEvent.type(input, 'Tim');
    await userEvent.click(addStudentButton);

    await userEvent.type(input, 'Tam');
    await userEvent.click(addStudentButton);

    expect(screen.getByRole('button', { name: 'Create race' })).toBeDisabled();
  });
});
