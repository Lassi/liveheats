import { NewRaceForm } from './components/new-race-form/new-race-form';

export const NewRaceBlock = ({ onCreateSuccess }) => {
  return (
    <NewRaceForm onCreateSuccess={onCreateSuccess} />
  );
};
