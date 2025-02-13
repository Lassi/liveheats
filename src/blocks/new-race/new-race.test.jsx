import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';

import { NewRaceBlock } from './new-race';
 
describe('NewRaceBlock', () => {
  it('should render a navbar with a link to the home page', () => {
    render(
      <NewRaceBlock race={{ students: [] }} />
    );

    const navbar = screen.getByRole('banner');

    expect(navbar).toBeInTheDocument();

    const link = within(navbar).getByRole('link');

    expect(link).toHaveAttribute('href', '/');
  });
});
