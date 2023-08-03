import { collection, getDocs } from 'firebase/firestore';
import { HomeButton } from '../components/HomeButton';
import { firestore } from '../firebase';
import { useEffect, useState } from 'react';

type Song = {
  title: string;
  artist: string;
};


const SeeRecordsPage = () => {
  const [songi, setSongi] = useState<Song[]>([]);

  const getSongs = async () => {
    // let returnAr: string[] = [];
    let songi: Song[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'Songs'));
    querySnapshot.forEach((doc) => {
      let song = doc.data();
      // console.log(doc.id, " => ", doc.data());
      // console.log(doc.id, "=> ", doc.data().Artist )
      // returnAr.push(doc.data().Artist + " " + doc.data().Title)
      // let titt = song.Title;
      // let artt = song.Artist;
      let newSong: Song = { title: song.Title, artist: song.Artist };
      songi.push(newSong);
    });
    // setPelne(returnAr);
    setSongi(songi);
  };

  useEffect(() => {
    getSongs();
    console.log('xd');
  }, []);

  return (
    <>
      <HomeButton />
      <ul>
        {songi.map((item, index) => (
          <li key={index}>
            {item.artist} // {item.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SeeRecordsPage;
