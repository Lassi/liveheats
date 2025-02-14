import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { StudentList, StudentListItem } from './student-list';
 
describe('StudentListItem', () => {
  it('should render the name of the student', () => {
    render(
      <StudentListItem name="My awesome name" />
    );
 
    const item = screen.getByRole('listitem');
 
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('My awesome name');
  });

  it('should render the lane the student is assigned to', () => {
    render(
      <StudentListItem name="Jean" lane={42} />
    );
 
    const item = screen.getByRole('listitem');
 
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('42');
  });

  it('should render the lane the student is assigned to', () => {
    render(
      <StudentListItem name="Jean" lane={42} />
    );
 
    const item = screen.getByRole('listitem');

    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('42');
  });
});

describe('StudentList', () => {
  it('should render a list', () => {
    render(
      <StudentList />
    );
 
    const list = screen.getByRole('list');
 
    expect(list).toBeInTheDocument();
  });

  it('should render a header for the lanes', () => {
    render(
      <StudentList />
    );
 
    const heading = screen.getByRole('heading', { name: 'Lane' });
 
    expect(heading).toBeInTheDocument();
  });

  it('should render a header for the students', () => {
    render(
      <StudentList />
    );
 
    const heading = screen.getByRole('heading', { name: 'Student' });
 
    expect(heading).toBeInTheDocument();
  });
});
