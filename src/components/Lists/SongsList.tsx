import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useEffect, useState } from 'react';

type Song = {
  title: string;
  artist: string;
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
