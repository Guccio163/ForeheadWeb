interface Props {
  questions: string[][];
}

function isRight(option: string) {
  return option.localeCompare('r') === 0 ? true : false;
}

export const QuestionsList = ({ questions }: Props) => {
  return (
    <ul>
      {questions.map((record, index) => (
        <li key={index} style={{ color: isRight(record[2]) ? 'rgb(57, 200, 57)' : 'grey' }}>
          {index} {record[0]} {record[1]}{' '}
        </li>
      ))}
    </ul>
  );
};
