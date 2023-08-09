import { HashLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export const LoadingPanel = () => {
  const navi = useNavigate();

  return (
    <>
      <div className="loadingScreen">
        {' '}
        Loading questions, please wait ...
        <HashLoader loading={true} size={50} color="black" />
        <button className='bufferButton' onClick={()=>navi(-1)}>Anuluj</button>
      </div>
    </>
  );
};
