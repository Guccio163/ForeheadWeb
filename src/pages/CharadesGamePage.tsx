import 'bootstrap/dist/css/bootstrap.css';
import { getCharadesShuffled } from '../components/Lists/CharadesList.tsx';
import { useState, useEffect } from 'react';
import CharadesGamePanel from '../components/Panels/CharadesGamePanel.tsx';
import SummaryPage from '../components/Panels/SummaryPanel.tsx';

export type Results = {
  tit: string;
  res: string;
};

export default function CharadesGamePage() {
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [recordArray, setRecordArray] = useState<Results[]>([]);

  function addToList(tit: string, res: string) {
    const rec = { tit, res };
    setRecordArray([...recordArray, rec]);
  }

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

  if (questionCount < 2) {
    return (
      <>
        <CharadesGamePanel
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
            setRecordArray([]);
            setQuestions(questions);
          }}
          setScore={setScore}
          score={score}
          questions={recordArray}
        />
      </>
    );
  }
}
