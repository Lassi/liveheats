import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createRace } from '@/lib/race-utils';

import { StudentList, StudentListItem } from '../student-list/student-list';

export const NewRaceForm = ({ onCreateSuccess }) => {
  const [newStudentName, setNewStudentName] = useState('');
  const [studentNames, setStudentNames] = useState([]);
  const isNewStudentNameValid =
    newStudentName !== '' &&
    studentNames.every(
      (studentName) => studentName !== newStudentName
    )
  ;
  const hasEnoughStudents = studentNames.length >= 2;

  return (
    <div className="flex flex-col gap-6">
      <StudentList>
        {studentNames.map((studentName, index) => (
          <StudentListItem
            key={studentName}
            lane={index + 1}
            name={studentName}
          >
            {studentName}
          </StudentListItem>
        ))}
      </StudentList>
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          placeholder="Jane Doe"
          onChange={(event) => {
            setNewStudentName(event.target.value);
          }}
          value={newStudentName}
        />
        <Button
          disabled={!isNewStudentNameValid}
          onClick={() => {
            setStudentNames((prevStudents) => [
              ...prevStudents,
              newStudentName,
            ]);
            setNewStudentName('');
          }}
        >
          Add student
        </Button>
      </div>
      <Button
        disabled={!hasEnoughStudents}
        onClick={() => {
          const newRace = createRace(studentNames);
          onCreateSuccess?.(newRace.id);
        }}
      >
        Create race
      </Button>
    </div>
  );
};
