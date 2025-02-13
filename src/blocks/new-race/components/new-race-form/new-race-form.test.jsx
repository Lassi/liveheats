import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
 
    const button = screen.getByRole('button');
 
    expect(button).toBeInTheDocument();
  });

  it('should add the student to a list when I click the button', async () => {
    render(
      <NewRaceForm />
    );
 
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
 
    await userEvent.type(input, 'John Student');
    await userEvent.click(button);

    const studentItem = screen.getByRole('listitem');

    expect(studentItem).toBeInTheDocument();
    expect(studentItem).toHaveTextContent('John Student');
  });
});
