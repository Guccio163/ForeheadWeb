import { HomeButton } from '../components/HomeButton';
import { QuestionsList } from '../components/QuestionsList';

interface Props {
  playAgain: any;
  setTotal: any;
  score: number;
  questions: string[][];
}



export default function SummaryPage({ playAgain, setTotal, score, questions }: Props) {

  return (
    <div className="summaryPage">
      <HomeButton />
      <h2 style={{ margin: '10px' }}>Congratulations, you scored {score} points!</h2>
      <QuestionsList questions={questions}/>
      <button
        onClick={() => {
          playAgain();
          setTotal(0);
        }}
        style={{ marginBottom: '5px' }}
      >
        press to play again
      </button>
    </div>
  );
}
