import { HomeButton } from '../Buttons/HomeButton';
import { QuestionsList } from '../Lists/QuestionsList';
import { Results as SongsResults } from '../../pages/SongGamePage';
import { Results as CharadesResults } from '../../pages/CharadesGamePage';
import Signature from '../Signature';

interface Props {
  playAgain: () => void;
  setScore: (startScore: number) => void;
  score: number;
  questions: SongsResults[] | CharadesResults[];
}

export default function SummaryPage({ playAgain, setScore, score, questions }: Props) {
  return (
    <div className="summaryPage">
      <HomeButton />
      <h2 style={{ margin: '10px' }}>Congratulations, you scored {score} points!</h2>
      <QuestionsList questions={questions} />
      <button
        onClick={() => {
          playAgain();
          setScore(0);
        }}
        style={{ marginBottom: '20px' }}
      >
        press to play again
      </button>
      <Signature />
    </div>
  );
}
