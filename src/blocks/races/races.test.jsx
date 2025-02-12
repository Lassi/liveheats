import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { RacesBlock } from './races';
 
const fakeRace = {
  name: 'Fake race name'
};

describe('RacesBlock', () => {
  it('should render a heading', () => {
    render(<RacesBlock liveRaces={[]} completedRaces={[]} />);
 
    const heading = screen.getByRole('heading', { level: 1 });
 
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('All your races');
  });

  it('should render two tabs: Live and Completed', () => {
    render(<RacesBlock liveRaces={[]} completedRaces={[]} />);
 
    const tabs = screen.getAllByRole('tab');
 
    expect(tabs).toHaveLength(2);
    expect(tabs.at(0)).toHaveTextContent('Live');
    expect(tabs.at(1)).toHaveTextContent('Completed');
  });

  it('should render the Live tab by default', () => {
    render(
      <RacesBlock
        liveRaces={[
          {
            id: 'live-fake-race-id',
            name: 'Live fake race name',
            students: [{}, {}],
          },
        ]}
        completedRaces={[
          {
            id: 'completed-fake-race-id',
            name: 'Completed fake race name',
            students: [{}, {}],
          },
        ]}
      />
    );
 
    const liveHeading = screen.getByRole('heading', { name: 'Live fake race name' });

    expect(liveHeading).toBeVisible();
  });

  it('should render the Completed tab when I click it', async () => {
    render(
      <RacesBlock
        liveRaces={[
          {
            id: 'live-fake-race-id',
            name: 'Live fake race name',
            students: [{}, {}],
          },
        ]}
        completedRaces={[
          {
            id: 'completed-fake-race-id',
            name: 'Completed fake race name',
            students: [{}, {}],
          },
        ]}
      />
    );
 
    await userEvent.click(screen.getByRole('tab', { name: 'Completed' }));
    const completedHeading = screen.getByRole('heading', { name: 'Completed fake race name' });

    expect(completedHeading).toBeVisible();
  });

  it('should render the correct number of items', () => {
    render(
      <RacesBlock
        liveRaces={[
          {
            id: 'fake-id-1',
            name: 'Fake name 1',
            students: [{}, {}],
          },
          {
            id: 'fake-id-2',
            name: 'Fake name 1',
            students: [{}, {}],
          },
          {
            id: 'fake-id-3',
            name: 'Fake name 1',
            students: [{}, {}],
          },
        ]}
        completedRaces={[]}
      />
    );
 
    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toBe(3);
  });
});
