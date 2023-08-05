import 'bootstrap/dist/css/bootstrap.css';
import { Song, getSongsShuffled } from '../components/Lists/SongsList.tsx';
import { useState, useEffect } from 'react';
import SongGamePanel from '../components/Panels/SongGamePanel.tsx';
import SummaryPage from '../components/Panels/SummaryPanel.tsx';

export type Results = {
  title: string;
  artist: string;
  answer: string;
};

export default function SongGamePage() {
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestions] = useState<Song[]>([]);
  const [results, setResults] = useState<Results[]>([]);

  function addToList(title: string, artist: string, answer: string) {
    const result = { title, artist, answer };
    setResults([...results, result]);
  }

  async function fetchSongs() {
    try {
      const allQuestions = await getSongsShuffled();
      setQuestions(allQuestions);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  if (questionCount < 4) {
    return (
      <>
        <SongGamePanel
          questions={questions}
          questionCount={questionCount}
          score={score}
          increaseQCount={() => setQuestionCount((prevIndex) => prevIndex + 1)}
          increaseScore={() => setScore((score) => score + 1)}
          addToList={addToList}
        />
      </>
    );
  } else {
    return (
      <>
        <SummaryPage
          playAgain={() => {
            setQuestionCount(0);
            setResults([]);
            setQuestions(questions);
          }}
          setScore={setScore}
          score={score}
          questions={results}
        />
      </>
    );
  }
}
