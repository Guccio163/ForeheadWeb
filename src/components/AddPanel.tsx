import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";

class Song {
  Title: string;
  Artist: string;
  constructor(title: string, artist: string) {
    this.Title = title;
    this.Artist = artist;
  }
  toString() {
    return this.Title + ", " + this.Artist;
  }
}


export default function AddPanel() {
  const navi = useNavigate();
  const art: any = useRef();
  const tit: any = useRef();
  const labl: any = useRef();
  const ref = collection(firestore, "Songs");
  // const [pelne, setPelne] = useState<string[]>([])
  const [songi, setSongi] = useState<Song[]>([])


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
    let nazwa = countt + '. ' + labl.current.value;
    console.log(nazwa);
    let arti = art.current.value;
    let titl = tit.current.value;
    await setDoc(doc(ref, nazwa), {
      Artist: arti,
      Title: titl,
    });
  };


  const getSongs = async () => {
    // let returnAr: string[] = [];
    let songi: Song[] = [];
    const querySnapshot = await getDocs(collection(firestore, "Songs"));
    querySnapshot.forEach((doc) => {
      let song = doc.data();
      // console.log(doc.id, " => ", doc.data());
      // console.log(doc.id, "=> ", doc.data().Artist )
      // returnAr.push(doc.data().Artist + " " + doc.data().Title)
      let titt = song.Title
      let artt = song.Artist
      let newSong = new Song(artt, titt);
      songi.push(newSong)
    });
      // setPelne(returnAr);
      setSongi(songi);    
  };


  getSongs();

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      AddPanel
      <button
        onClick={() => navi(-1)}
        style={{ background: "transparent", border: 0, color: "red" }}
      >
        HOME
      </button>
      <form onSubmit={handleSave} style={{display:"flex", flexDirection:"column"}}>
        <label> Labl </label>
        <input type="text" ref={labl} style={{width:"10vw"}}/>
        <label> Artist </label>
        <input type="text" ref={art} style={{width:"10vw"}}/>
        <label> Tile </label>
        <input type="text" ref={tit} style={{width:"10vw"}}/>
        <button type="submit" style={{width:"10vw"}}>SAVE</button>
      </form>

      {/* <ul>
        {pelne.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      /przerwa/ */}
      <ul>
        {songi.map((item, index) => (
          <li key={index}>{item.Artist} // {item.Title}</li>
        ))}
      </ul>
    </div>
  );
}
