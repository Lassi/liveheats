import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import {
  UnrankedStudentList,
  UnrankedStudentListItem,
} from './unranked-student-list';
import userEvent from '@testing-library/user-event';
 
describe('UnrankedStudentListItem', () => {
  it('should render the name of the student', () => {
    render(
      <UnrankedStudentListItem name="My awesome name" />
    );
 
    const item = screen.getByRole('listitem');
 
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('My awesome name');
  });

  it('should render the lane the student is assigned to', () => {
    render(
      <UnrankedStudentListItem name="Jean" lane={42} />
    );
 
    const item = screen.getByRole('listitem');
 
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('42');
  });

  it('should render the lane the student is assigned to', () => {
    render(
      <UnrankedStudentListItem name="Jean" lane={42} />
    );
 
    const item = screen.getByRole('listitem');

    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('42');
  });

  it('should render an input to provide the rank', () => {
    render(
      <UnrankedStudentListItem name="Jean" lane={42} />
    );
 
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('should be able to control the value of the input via rank', () => {
    render(
      <UnrankedStudentListItem
        name="Jean"
        lane={42}
        rank={4}
        onChangeRank={() => {}}
      />
    );
 
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('4');
  });

  it('should call the onRankChange when the input changes', async () => {
    const onChangeRank = jest.fn();

    render(
      <UnrankedStudentListItem
        name="Jean"
        lane={42}
        rank={4}
        onChangeRank={onChangeRank}
      />
    );
 
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'hehehe');

    expect(onChangeRank).toHaveBeenCalled();
  });
});

describe('UnrankedStudentList', () => {
  it('should render a list', () => {
    render(
      <UnrankedStudentList />
    );
 
    const list = screen.getByRole('list');
 
    expect(list).toBeInTheDocument();
  });

  it('should render a header for the lanes', () => {
    render(
      <UnrankedStudentList />
    );
 
    const heading = screen.getByRole('heading', { name: 'Lane' });
 
    expect(heading).toBeInTheDocument();
  });

  it('should render a header for the students', () => {
    render(
      <UnrankedStudentList />
    );
 
    const heading = screen.getByRole('heading', { name: 'Student' });
 
    expect(heading).toBeInTheDocument();
  });

  it('should render a header for the rank', () => {
    render(
      <UnrankedStudentList />
    );
 
    const heading = screen.getByRole('heading', { name: 'Rank' });
 
    expect(heading).toBeInTheDocument();
  });
});
