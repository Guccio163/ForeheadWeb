import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useEffect, useState } from 'react';

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
