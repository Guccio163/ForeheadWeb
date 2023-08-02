import { useEffect, useRef, useState } from 'react';
import { firestore } from '../firebase';
import { doc, collection, setDoc, getDocs, getCountFromServer } from 'firebase/firestore';
import { HomeButton } from '../components/HomeButton';

type Song = {
  title: string;
  artist: string;
};

export default function AddPanel() {
  const artist: any = useRef();
  const title: any = useRef();
  const label: any = useRef();
  const ref = collection(firestore, 'Songs');
  const [songi, setSongi] = useState<Song[]>([]);

  // Function to handle the Promise and extract the integer value
  async function getDocCount(): Promise<number> {
    try {
      const snapshot = await getCountFromServer(ref);
      const result = snapshot.data().count;
      return result;
    } catch (error) {
      console.error('Error fetching integer:', error);
      return 0; // Return a default value if the Promise encounters an error
    }
  }

  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let countt = await getDocCount();
    // template string
    let nazwa = `${countt}. ${label.current.value}`;
    console.log(nazwa);
    let arti = artist.current.value;
    let titl = title.current.value;
    await setDoc(doc(ref, nazwa), {
      Artist: arti,
      Title: titl,
    });
  };

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <HomeButton/>
      <form onSubmit={handleSave} className='addForm'>
        <label>
          {'Label: '}
          <input type="text" ref={label} className="formField" />
        </label>
        <label>
          {'Artist: '}
          <input type="text" ref={artist} className="formField" />
        </label>
        <label>
          {'Title: '}
          <input type="text" ref={title} className="formField" />
        </label>
        <button type="submit" className="formButton">
          SAVE
        </button>
      </form>
      {/* <ul>
        {pelne.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      /przerwa/ */}
      <ul>
        {songi.map((item, index) => (
          <li key={index}>
            {item.artist} // {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
