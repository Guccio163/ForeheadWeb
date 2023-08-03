import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useEffect, useState } from 'react';

export type Song = {
  title: string;
  artist: string;
};

export const shuffleArray = (array: Song[]) => {
  const shuffledArray = [...array]; // Tworzymy kopię tablicy, aby nie zmieniać oryginalnej
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const getSongsShuffled = async () => {
  let songi: Song[] = [];
  const querySnapshot = await getDocs(collection(firestore, 'Songs'));
  querySnapshot.forEach((doc) => {
    let song = doc.data();
    let newSong: Song = { title: song.Title, artist: song.Artist };
    songi.push(newSong);
  });
  return shuffleArray(songi);
};

export const getSongs = async () => {
  let songi: Song[] = [];
  const querySnapshot = await getDocs(collection(firestore, 'Songs'));
  querySnapshot.forEach((doc) => {
    let song = doc.data();
    let newSong: Song = { title: song.Title, artist: song.Artist };
    songi.push(newSong);
  });
  return songi;
};


export const SongsList = () => {
  const [songi, setSongi] = useState<Song[]>([]);

  const getSongs = async () => {
    let songi: Song[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'Songs'));
    querySnapshot.forEach((doc) => {
      let song = doc.data();
      let newSong: Song = { title: song.Title, artist: song.Artist };
      songi.push(newSong);
    });
    setSongi(songi);
  };

    useEffect(() => {
      getSongs();
      console.log('xd');
    }, []);
    
  return (
    <ul className="recordsList">
      {songi.map((item, index) => (
        <li key={index}>
          {item.artist} // {item.title}
        </li>
      ))}
    </ul>
  );
};
