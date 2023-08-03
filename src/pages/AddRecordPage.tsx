import { useRef, useState } from 'react';
import { firestore } from '../firebase';
import { doc, collection, setDoc, getCountFromServer } from 'firebase/firestore';
import { HomeButton } from '../components/Buttons/HomeButton';
import { useNavigate } from 'react-router-dom';

export default function AddPanel() {
  const navi = useNavigate();
  const collectionRef: any = useRef();
  const labelRef: any = useRef();
  const artistRef: any = useRef();
  const titleRef: any = useRef();
  const textRef: any = useRef();
  const formRef: any = useRef();

  const [isSongs, setIstSongs] = useState(true);

  async function getDocCount(): Promise<number> {
    const ref = collection(firestore, collectionRef.current.value);

    try {
      const snapshot = await getCountFromServer(ref);
      const result = snapshot.data().count;
      return result;
    } catch (error) {
      console.error('Error fetching integer:', error);
      return 0;
    }
  }

  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const ref = collection(firestore, collectionRef.current.value);
    let countt = await getDocCount();

    if (collectionRef.current.value === 'Songs') {
      let label = `${countt}. ${labelRef.current.value}`;
      let artist = artistRef.current.value;
      let title = titleRef.current.value;
      if (formRef.current) {
        formRef.current.reset();
      }
      await setDoc(doc(ref, label), {
        Artist: artist,
        Title: title,
      });
    } else {
      let label = `${countt}. ${labelRef.current.value}`;
      let text = textRef.current.value;
      if (formRef.current) {
        formRef.current.reset();
      }
      await setDoc(doc(ref, label), {
        Text: text,
      });
    }
    
  };

  const handleCollectionChange = (e: { target: { value: any } }) => {
    const newValue = e.target.value;
    if (newValue === 'Songs') {
      setIstSongs(true);
    } else {
      setIstSongs(false);
    }
    console.log(`Zmieniono opcję na: ${newValue}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <HomeButton />
      <form onSubmit={handleSave} className="myForm" ref={formRef}>
        <select
          id="chooseOption"
          className="formField"
          ref={collectionRef}
          onChange={handleCollectionChange}
        >
          <option value="Songs">Songs</option>
          <option value="Charades">Charades</option>
        </select>
        <label>
          {'Label: '}
          <input type="text" ref={labelRef} className="formField" />
        </label>
        <label style={{ display: isSongs ? 'block' : 'none' }}>
          {'Artist: '}
          <input type="text" ref={artistRef} className="formField songField" />
        </label>
        <label style={{ display: isSongs ? 'block' : 'none' }}>
          {'Title: '}
          <input type="text" ref={titleRef} className="formField songField" />
        </label>
        <label style={{ display: isSongs ? 'none' : 'block' }}>
          {'Text: '}
          <input type="text" ref={textRef} className="formField charadeField" />
        </label>
        <button type="submit" className="formButton">
          SAVE
        </button>
        <button
          className="seeRecordsButton"
          onClick={() => {
            navi(`/records?collectionName=${collectionRef.current.value}`);
          }}
        >
          RECORDS
        </button>
      </form>
    </div>
  );
}
