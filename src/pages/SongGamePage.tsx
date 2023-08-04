import { useState, useEffect } from 'react';
import GuessedButton from '../components/Buttons/GuessedButton.tsx';
import SummaryPage from './SummaryPage.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import { HomeButton } from '../components/Buttons/HomeButton.tsx';
import { Song, getSongsShuffled } from '../components/Lists/SongsList.tsx';

export type Results = {
  tit: string;
  art: string;
  res: string;
};

export default function GamePanel() {
  const [total, setTotal] = useState(0);
  const [qCount, setQCount] = useState(0);
  const [questions, setQuestions] = useState<Song[]>([]);
  const [recordArray, setRecordArray] = useState<Results[]>([]);

  function addToList(tit: string, art: string, res: string) {
    const rec = { tit, art, res };
    setRecordArray([...recordArray, rec]);
  }

  async function fetchSongs() {
    try {
      const qr = await getSongsShuffled();
      setQuestions(qr);
      console.log('qr', qr);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  if (qCount < 4) {
    return (
      <div className="gamePanel">
        {questions[qCount]?.artist && questions[qCount].artist.length > 0 && (
          <div>
            <HomeButton />
            <p className="title">{questions[qCount].title}</p>
            <p className="artist">{questions[qCount].artist}</p>
          </div>
        )}
        <p className="total">
          {total}/{qCount}
        </p>
        <div className="buttonWrapper">
          <GuessedButton
            option="wrong"
            onClick={() => {
              setQCount((prevIndex) => prevIndex + 1);

              addToList(questions[qCount].title, questions[qCount].artist, 'f');
            }}
          />
          <GuessedButton
            option="right"
            onClick={() => {
              setQCount((prevIndex) => prevIndex + 1);

              setTotal((total) => total + 1);
              addToList(questions[qCount].title, questions[qCount].artist, 'r');
            }}
          />
        </div>{' '}
        <br />
        <p className="signature"> Czółko v.0.1 </p>
      </div>
    );
  } else {
    return (
      <>
        <SummaryPage
          playAgain={() => {
            setQCount(0);
            setRecordArray([]);
            setQuestions(questions);
          }}
          setTotal={setTotal}
          score={total}
          questions={recordArray}
        />
        <p className="signature"> Czółko v.0.1 </p>
      </>
    );
  }
}
