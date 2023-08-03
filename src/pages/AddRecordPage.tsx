import { useRef } from 'react';
import { firestore } from '../firebase';
import { doc, collection, setDoc, getCountFromServer } from 'firebase/firestore';
import { HomeButton } from '../components/HomeButton';
import { useNavigate } from 'react-router-dom';

export default function AddPanel() {
  const navi = useNavigate();
  const artist: any = useRef();
  const title: any = useRef();
  const label: any = useRef();
  const colName: any = useRef();
  const ref = collection(firestore, 'Songs');

  async function getDocCount(): Promise<number> {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <HomeButton />
      <form onSubmit={handleSave} className="myForm">
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
      <form className="myForm">
        <select id="chooseOption" name="chooseOption" ref={colName}>
          <option value="Songs">Songs</option>
          <option value="Charades">Charades</option>
        </select>
        <button
          className="seeRecords"
          onClick={() => {
            navi(`/records?colName=${colName.current.value}`);
            // console.log(colName.current.value);
          }}
        >
          RECORDS
        </button>
      </form>
    </div>
  );
}
