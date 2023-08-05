import { Results as SongResults } from '../../pages/SongGamePage';
import { Results as CharadesResults } from '../../pages/CharadesGamePage';

interface Props {
  questions: SongResults[] | CharadesResults[];
}

function isRight(option: string) {
  return option.localeCompare('r') === 0 ? true : false;
}

export const QuestionsList = ({ questions }: Props) => {
  if ('artist' in questions[0]) {
    const newResults = questions as SongResults[];
    return (
      <ul>
        {newResults.map((record, index) => (
          <li key={index} style={{ color: isRight(record.answer) ? 'rgb(57, 200, 57)' : 'grey' }}>
            {index} {record.title} {record.artist}
          </li>
        ))}
      </ul>
    );
  } else {
    const newResults = questions as CharadesResults[];
    return (
      <ul>
        {newResults.map((record, index) => (
          <li key={index} style={{ color: isRight(record.res) ? 'rgb(57, 200, 57)' : 'grey' }}>
            {index} {record.tit}
          </li>
        ))}
      </ul>
    );
  }
};
