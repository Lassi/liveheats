import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { RaceList, RaceListItem } from './race-list';
 
describe('RaceListItem', () => {
  it('should render the name of the race', () => {
    render(
      <RaceListItem name="My awesome name" />
    );
 
    const name = screen.getByRole('heading', { level: 2 });
 
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('My awesome name');
  });

  it('should render the total number of students in the race', () => {
    render(
      <RaceListItem numberOfStudents={42} />
    );
 
    const paragraph = screen.getByRole('paragraph');
 
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent('42 students');
  });

  it('should render a link to the race page with the correct id', () => {
    render(
      <RaceListItem id="crazy-fake-id" />
    );
 
    const link = screen.getByRole('link');
 
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/races/crazy-fake-id');
  });


  it('should render a listitem', () => {
    render(
      <RaceListItem />
    );
 
    const listItem = screen.getByRole('listitem');
 
    expect(listItem).toBeInTheDocument();
  });
});

describe('RaceList', () => {
  it('should render a list', () => {
    render(
      <RaceList />
    );
 
    const list = screen.getByRole('list');
 
    expect(list).toBeInTheDocument();
  });
});