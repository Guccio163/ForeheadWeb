import { collection, getDocs } from 'firebase/firestore';
import { HomeButton } from '../components/HomeButton';
import { firestore } from '../firebase';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Song = {
  title: string;
  artist: string;
};

const SeeRecordsPage = () => {
  const [songi, setSongi] = useState<Song[]>([]);
  const [charades, setCharades] = useState<string[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const colName: string = queryParams.get('colName') ?? '';

  const getCharades = async () => {
    let charades: string[] = [];
    const querySnapshot = await getDocs(collection(firestore, colName));
    querySnapshot.forEach((doc) => {
      let charade = doc.data();
      let newCharade: string = charade.Text;
      charades.push(newCharade);
    });
    setCharades(charades);
  };

  const getSongs = async () => {
    let songi: Song[] = [];
    const querySnapshot = await getDocs(collection(firestore, colName));
    querySnapshot.forEach((doc) => {
      let song = doc.data();
      let newSong: Song = { title: song.Title, artist: song.Artist };
      songi.push(newSong);
    });
    setSongi(songi);
  };

  useEffect(() => {
    if (colName === 'Songs') {
      getSongs();
    } else {
      getCharades();
    }
    console.log('xd');
  }, []);

  console.log(name);
  return (
    <>
      <HomeButton />
      {colName === 'Songs' ? (
        <ul>
          {songi.map((item, index) => (
            <li key={index}>
              {item.artist} // {item.title}
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {charades.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SeeRecordsPage;