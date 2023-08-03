import { HomeButton } from '../components/Buttons/HomeButton';
import { useLocation } from 'react-router-dom';
import { BackButton } from '../components/Buttons/BackButton';
import { CharadesList } from '../components/Lists/CharadesList';
import { SongsList } from '../components/Lists/SongsList';



const RecordsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collectionName: string = queryParams.get('collectionName') ?? '';

  return (
    <div className="recordsPage">
      <div className="recordsPageNavBar">
        <HomeButton />
        <BackButton />
      </div>

      {collectionName === 'Songs' ? (
        <SongsList/>
      ) : (
        <CharadesList />
      )}
    </div>
  );
};

export default RecordsPage;
