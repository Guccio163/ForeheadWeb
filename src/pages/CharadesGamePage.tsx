import { useState, useEffect } from 'react';
import GuessedButton from '../components/Buttons/GuessedButton.tsx';
import SummaryPage from './SummaryPage.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import { HomeButton } from '../components/Buttons/HomeButton.tsx';
import { Song, getSongsShuffled, shuffleArray } from '../components/Lists/SongsList.tsx';
import { getCharadesShuffled } from '../components/Lists/CharadesList.tsx';

export type Results = {
  tit: string;
  res: string;
};

export default function CharadesGamePage() {
  const [total, setTotal] = useState(0);
  const [qCount, setQCount] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [recordArray, setRecordArray] = useState<Results[]>([]);

  // function refreshData(myJson: string | any[]) {
  //   // ZMIEŃ DŁUGOŚĆ NA NP. 10
  //   setCurrentNum(getRandomNumberInRange(0, myJson.length));
  //   setArtist(myJson[currentNum].artist);
  //   setTitle(myJson[currentNum].title);
  // }

  function addToList(tit: string, res: string) {
    const rec = { tit, res };
    setRecordArray([...recordArray, rec]);
  }

//   async function fetchSongs() {
//     try {
//       const qr = await getSongsShuffled();
//       setQuestions(qr);
//       console.log('qr', qr);
//     } catch (error) {
//       console.error('Błąd podczas pobierania danych:', error);
//     }
//   }

  async function fetchCharades() {
    try {
      const qr = await getCharadesShuffled();
      setQuestions(qr);
      console.log('qr', qr);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  }

  useEffect(() => {
    fetchCharades();
  }, []);

  if (qCount < 2) {
    return (
      <div className="gamePanel">
        {questions[qCount] && questions[qCount].length > 0 && (
          <div>
            <HomeButton />
            <p className="title">{questions[qCount]}</p>
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

              addToList(questions[qCount], 'f');
            }}
          />
          <GuessedButton
            option="right"
            onClick={() => {
              setQCount((prevIndex) => prevIndex + 1);

              setTotal((total) => total + 1);
              addToList(questions[qCount], 'r');
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
