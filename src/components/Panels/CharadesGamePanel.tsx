import GuessedButton from '../Buttons/GuessedButton.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import { HomeButton } from '../Buttons/HomeButton.tsx';
import Signature from '../Signature.tsx';

export type Results = {
  title: string;
  artist: string;
  answer: string;
};

interface Props {
  questions: string[];
  questionCount: number;
  score: number;
  increaseQCount: any;
  increaseScore: any;
  addToList: any;
}

export default function CharadesGamePanel({questions, questionCount, score, increaseQCount, increaseScore, addToList}:Props){
  return (
    <div className="gamePanel">
      {questions[questionCount] && questions[questionCount].length > 0 && (
        <div>
          <HomeButton />
          <p className="title">{questions[questionCount]}</p>
        </div>
      )}
      <p className="total">
        {score}/{questionCount}
      </p>
      <div className="buttonWrapper">
        <GuessedButton
          option="wrong"
          onClick={() => {
            increaseQCount();
            addToList(questions[questionCount], 'f');
          }}
        />
        <GuessedButton
          option="right"
          onClick={() => {
            increaseQCount();
            increaseScore();
            addToList(questions[questionCount], 'r');
          }}
        />
      </div>
      <br />
      <Signature/>
    </div>
  );
};
