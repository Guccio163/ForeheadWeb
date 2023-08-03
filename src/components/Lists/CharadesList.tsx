import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useEffect, useState } from 'react';

export const shuffleArray = (array: string[]) => {
  const shuffledArray = [...array]; // Tworzymy kopię tablicy, aby nie zmieniać oryginalnej
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const CharadesList = () => {
  const [charades, setCharades] = useState<string[]>([]);

  const getCharades = async () => {
    let charades: string[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'Charades'));
    querySnapshot.forEach((doc) => {
      let charade = doc.data();
      let newCharade: string = charade.Text;
      charades.push(newCharade);
    });
    setCharades(charades);
  };

  useEffect(() => {
    getCharades();

    console.log('xd');
  }, []);

  return (
    <div className="recordsPage">
      <ul className="recordsList">
        {charades.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
