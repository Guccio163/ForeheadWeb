import GuessedButton from '../Buttons/GuessedButton.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import { HomeButton } from '../Buttons/HomeButton.tsx';
import { Song } from '../Lists/SongsList.tsx';
import Signature from '../Signature.tsx';
import { useRef } from 'react';

export type Results = {
  title: string;
  artist: string;
  answer: string;
};

interface Props {
  questions: Song[];
  questionCount: number;
  score: number;
  increaseQCount: any;
  increaseScore: any;
  addToList: any;
}

export default function SongGamePanel({
  questions,
  questionCount,
  score,
  increaseQCount,
  increaseScore,
  addToList,
}: Props) {


  const myDivRef = useRef<HTMLDivElement>(null);
  const myWrapperRef = useRef<HTMLDivElement>(null);


  return (
    <div className="gamePanelWrapper" ref={myWrapperRef}>
      <div className="gamePanel" ref={myDivRef} >
        <HomeButton />

        <div>
          <p className="title">{questions[questionCount].title}</p>
          <p className="artist">{questions[questionCount].artist}</p>
        </div>

        <p className="total">
          {score}/{questionCount}
        </p>
        <div className="buttonWrapper">
          <GuessedButton
            option="wrong"
            onClick={() => {
              increaseQCount();
              addToList(questions[questionCount].title, questions[questionCount].artist, 'f');
            }}
          />
          <GuessedButton
            option="right"
            onClick={() => {
              increaseQCount();
              increaseScore();
              addToList(questions[questionCount].title, questions[questionCount].artist, 'r');
            }}
          />
        </div>
        <br />
      </div>
      <Signature />
    </div>
  );
}
