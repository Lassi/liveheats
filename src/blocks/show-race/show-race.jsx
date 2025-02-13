import { Input } from "@/components/ui/input";

export const ShowRaceBlock = ({ race }) => {
  return (
    <div>
      {race.students.map(({ name }, index) => (
        <li key={`${name}-${index}`}>
          {name}
          <Input />
        </li>
      ))}
    </div>
  );
};
