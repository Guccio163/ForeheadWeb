import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  getCountFromServer,
  DocumentData,
} from "firebase/firestore";
import { ref, onValue, refFromURL } from "firebase/database";

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


  const xdd = async () => {
    let returnArray: string = "";
    const querySnapshot = await getDocs(collection(firestore, "Songs"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log(doc.id, "=> ", doc.data().Artist )
      // alert(doc.data().Artist)
      returnArray = returnArray + doc.data().Artist;
    });
    
      return returnArray;
    
  };

  async function getDataFromPromise(): Promise<string> {
    try {
      const result = await xdd();
      return result;
    } catch (error) {
      console.error('Error fetching integer:', error);
      return "pusta tablica"; // Return a default value if the Promise encounters an error
    }
  }

  const lol = xdd();

  return (
    <div>
      AddPanel
      <button
        onClick={() => navi(-1)}
        style={{ background: "transparent", border: 0, color: "red" }}
      >
        HOME
      </button>
      <form onSubmit={handleSave}>
        <label> Labl </label>
        <input type="text" ref={labl} />
        <label> Artist </label>
        <input type="text" ref={art} />
        <label> Tile </label>
        <input type="text" ref={tit} />
        <button type="submit">SAVE</button>
      </form>
      {/* <button onClick={fetchSongs}>fetch</button>
        <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.Artist} - {song.Title}
          </li>
        ))}
      </ul> */}
      <p></p>
    </div>
  );
}
