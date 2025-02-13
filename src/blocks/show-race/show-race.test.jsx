import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ShowRaceBlock } from './show-race';
 
describe('ShowRaceBlock', () => {
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
});
