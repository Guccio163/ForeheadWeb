import { useRef, useState } from 'react';
import { firestore } from '../firebase';
import { doc, collection, setDoc, getCountFromServer } from 'firebase/firestore';
import { HomeButton } from '../components/Buttons/HomeButton';
import { useNavigate } from 'react-router-dom';
import Signature from '../components/Signature';
import { useForm } from 'react-hook-form';

export default function AddPanel() {
  const navi = useNavigate();
  const collectionRef: any = useRef();
  const [isSongs, setIstSongs] = useState(true);
  const { handleSubmit, register, formState: {}, watch, reset } = useForm();

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

  const handleSave = async () => {
    const ref = collection(firestore, collectionRef.current.value);
    let docCount = await getDocCount();

    if (collectionRef.current.value === 'Songs') {
      await setDoc(doc(ref, `${docCount}. ${watch().title}`), {
        Artist: watch().artist,
        Title: watch().title,
      });
    } else {
      await setDoc(doc(ref, `${docCount}. ${watch().text}`), {
        Text: watch().text,
      });
    }
    reset();
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
      <div className="myForm">
        <label>
          {'Category: '}
          <select
            id="chooseOption"
            className="formField"
            ref={collectionRef}
            onChange={handleCollectionChange}
          >
            <option value="Songs">Songs</option>
            <option value="Charades">Charades</option>
          </select>
        </label>
        <form onSubmit={handleSubmit(handleSave)} className="myForm">
          <label style={{ display: isSongs ? 'block' : 'none' }}>
            {'Title: '}
            <input {...register('title')} className="formField songField" />
          </label>
          <label style={{ display: isSongs ? 'block' : 'none' }}>
            {'Artist: '}
            <input {...register('artist')} className="formField songField" />
          </label>
          <label style={{ display: isSongs ? 'none' : 'block' }}>
            {'Text: '}
            <input {...register('text')} className="formField charadeField" />
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
      <Signature />
    </div>
  );
}
