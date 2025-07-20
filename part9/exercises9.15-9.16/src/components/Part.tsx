import type { CoursePart } from '../App';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>Group projects: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
          <p>Requirements: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;