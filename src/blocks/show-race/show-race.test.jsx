import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ShowRaceBlock } from './show-race';
import { completeRace, createRace, getRace } from '@/lib/race-utils';
 
describe('ShowRaceBlock', () => {
  beforeAll(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render a list of students', () => {
    const race = { students: new Array(42).fill({}) };

    render(
      <ShowRaceBlock race={race} />
    );
 
    const students = screen.getAllByRole('listitem');

    expect(students).toHaveLength(race.students.length);
  });

  it('should render a ranking input for each student', () => {
    const race = { students: new Array(42).fill({}) };

    render(
      <ShowRaceBlock race={race} />
    );
 
    const rankingInputs = screen.getAllByRole('textbox');

    expect(rankingInputs).toHaveLength(race.students.length);
  });

  it('should render the name of the students correctly', () => {
    const race = {
      students: [
        {
          name: 'Astrid Goggle',
        },
        {
          name: 'Matt Chair',
        },
        {
          name: 'Justin',
        },
        {
          name: 'Cindy',
        },
        {
          name: 'Melissa Basket',
        },
        {
          name: 'Talulah Shelf',
        },
      ],
    };

    render(
      <ShowRaceBlock race={race} />
    );
 
    const students = screen.getAllByRole('listitem');
 
    race.students.forEach(({ name }, index) => expect(students.at(index)).toHaveTextContent(name));
  });

  it('should render a navbar with a link to the home page', () => {
    render(
      <ShowRaceBlock race={{ students: [] }} />
    );

    const navbar = screen.getByRole('banner');

    expect(navbar).toBeInTheDocument();

    const link = within(navbar).getByRole('link');

    expect(link).toHaveAttribute('href', '/');
  });

  it('should render a button to complete the race', () => {
    render(
      <ShowRaceBlock race={{ students: [] }} />
    );

    const button = screen.getByRole('button', { name: 'Complete race' });

    expect(button).toBeInTheDocument();
  });

  it('should disable the button to complete the race if the ranking is empty', () => {
    render(
      <ShowRaceBlock race={{ students: [] }} />
    );

    const button = screen.getByRole('button', { name: 'Complete race' });

    expect(button).toBeDisabled();
  });

  it('should show an error and disable the button to complete the race if the ranking invalid', async () => {
    const race = {
      students: [
        { name: 'Alfred' },
        { name: 'Sophia' },
        { name: 'Ron Swanson' },
      ],
    };
    render(
      <ShowRaceBlock race={race} />
    );

    const input = screen.getAllByRole('textbox');
    await userEvent.type(input.at(0), '4');

    const button = screen.getByRole('button', { name: 'Complete race' });
    const error = screen.getByText(/Error:.*/);

    expect(button).toBeDisabled();
    expect(error).toBeInTheDocument();
  });

  it('should not show an error if the ranking is completely empty', () => {
    render(
      <ShowRaceBlock race={{ students: [{ name: 'Joris' }, { name: 'Maude' }] }} />
    );

    const error = screen.queryByText(/Error:.*/);

    expect(error).not.toBeInTheDocument();
  });

  it('should update the race with the ranks when we click complete race', async () => {
    const race = createRace(['Natalie', 'Boris', 'Jack']);

    render(
      <ShowRaceBlock race={race} />
    );

    const rankInputs = screen.getAllByRole('textbox');

    await userEvent.type(rankInputs.at(0), '3');
    await userEvent.type(rankInputs.at(1), '1');
    await userEvent.type(rankInputs.at(2), '2');

    await userEvent.click(screen.getByRole('button', { name: 'Complete race' }));

    expect(getRace(race.id).students).toMatchObject([
      { name: 'Natalie', rank: 3 },
      { name: 'Boris', rank: 1 },
      { name: 'Jack', rank: 2 },
    ]);
  });

  it('should not show the inputs on a completed race', () => {
    const race = createRace(['Benny', 'Astrid', 'Leo']);
    const completedRace = completeRace(race.id, [1, 3, 1]);

    render(
      <ShowRaceBlock race={completedRace} />
    );

    const rankInputs = screen.queryAllByRole('textbox');
    expect(rankInputs).toHaveLength(0);
  });

  it('should call the onCompleteSuccess callback on completion', async () => {
    const race = createRace(['Fran', 'Kimmy', 'James']);
    const onCompleteSuccess = jest.fn();

    render(
      <ShowRaceBlock race={race} onCompleteSuccess={onCompleteSuccess} />
    );

    const rankInputs = screen.getAllByRole('textbox');

    await userEvent.type(rankInputs.at(0), '1');
    await userEvent.type(rankInputs.at(1), '1');
    await userEvent.type(rankInputs.at(2), '1');

    await userEvent.click(screen.getByRole('button', { name: 'Complete race' }));

    expect(onCompleteSuccess).toHaveBeenCalled();
  });

  it('should sort the student in rank order when the race is completed', async () => {
    const studentNames = ['Natalie', 'Boris', 'Jack'];
    const race = createRace(studentNames);

    render(
      <ShowRaceBlock race={race} />
    );

    const rankInputs = screen.getAllByRole('textbox');

    await userEvent.type(rankInputs.at(0), '3');
    await userEvent.type(rankInputs.at(1), '1');
    await userEvent.type(rankInputs.at(2), '2');

    await userEvent.click(screen.getByRole('button', { name: 'Complete race' }));

    const students = screen.getAllByRole('listitem');

    for (const [i, student] of students.entries()) {
      expect(student).toHaveTextContent(studentNames.at(i));
    }
  });
});
