import { useState, useEffect } from 'react';
import GuessedButton from '../components/Buttons/GuessedButton.tsx';
import SummaryPage from './SummaryPage.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import { HomeButton } from '../components/Buttons/HomeButton.tsx';
import { Song, getSongsShuffled, shuffleArray } from '../components/Lists/SongsList.tsx';

export default function GamePanel() {
  const [artist, setArtist] = useState(' ');
  const [title, setTitle] = useState(' ');
  // const [currentNum, setCurrentNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [qCount, setQCount] = useState(-1);
  const [questions, setQuestions] = useState<Song[]>([]);
  const [recordArray, setRecordArray] = useState<string[][]>([]);

  // function getRandomNumberInRange(min: number, max: number): number {
  //   let ans = Math.floor(Math.random() * (max - min)) + min;
  //   ans = ans === currentNum ? (ans + 1) % max : ans;
  //   return ans;
  // }

  // function refreshData(myJson: string | any[]) {
  //   // ZMIEŃ DŁUGOŚĆ NA NP. 10
  //   setCurrentNum(getRandomNumberInRange(0, myJson.length));
  //   setArtist(myJson[currentNum].artist);
  //   setTitle(myJson[currentNum].title);
  // }

  function addToList(tit: string, art: string, res: string) {
    const rec: string[] = [tit, art, res];
    setRecordArray([...recordArray, rec]);
  }

  function increaseTotal() {
    setTotal(total + 1);
  }

  // function getData() {
  //   fetch('songs.json', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((myJson) => {
  //       console.log(myJson);
  //       refreshData(myJson);
  //       setQCount(qCount + 1);
  //     });
  // }

  function getNextQuestion() {
    setQCount(qCount + 1);
    setArtist(questions[qCount].artist);
    setTitle(questions[qCount].title);
    console.log(qCount, artist, title, questions[qCount]);
  }

  async function fetchSongs() {
    try {
      setQuestions(await getSongsShuffled());
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }


  }

  useEffect(() => {
    fetchSongs()
      .then(() => {
        getNextQuestion();
      });
    // getData();
  }, []);

  if (qCount < 4) {
    return (
      <div className="gamePanel">
        {artist && artist.length > 0 && (
          <div>
            <HomeButton />
            <p className="title">{title}</p>
            <p className="artist">{artist}</p>
          </div>
        )}
        <p className="total">
          {total}/{qCount}
        </p>
        <div className="buttonWrapper">
          <GuessedButton
            option="wrong"
            onClick={() => {
              getNextQuestion();
              addToList(title, artist, 'f');
            }}
          />
          <GuessedButton
            option="right"
            onClick={() => {
              getNextQuestion();
              increaseTotal();
              addToList(title, artist, 'r');
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
            setQuestions(shuffleArray(questions));
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
