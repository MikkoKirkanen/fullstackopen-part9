import { assertNever } from '../helpers';
import { CoursePart } from '../types/CoursePart';

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  const getDescription = (part: CoursePart) => {
    switch (part.kind) {
      case 'basic':
        return <div className='fst-italic'>{part.description}</div>;
      case 'group':
        return <div>Project exercises {part.groupProjectCount}</div>;
      case 'background':
        return (
          <div>
            <div className='fst-italic'>{part.description}</div>
            <div>Submit to {part.backgroundMaterial}</div>
          </div>
        );
      case 'special':
        return (
          <div>
            <div className='fst-italic'>{part.description}</div>
            <div>Required skills: {part.requirements.join(', ')}</div>
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <div className='mb-3'>
      <div className='fw-bold'>
        {coursePart.name} {coursePart.exerciseCount}
      </div>
      {getDescription(coursePart)}
    </div>
  );
};

export default Part;
