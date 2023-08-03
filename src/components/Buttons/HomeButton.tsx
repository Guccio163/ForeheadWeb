import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomeButton = () => {
  const navi = useNavigate();
  const [focus, setFocus] = useState(false);

  return (
    <button
      className='homeButton'
      onClick={() => navi('/')}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      {' '}
      <i className={!focus ? 'bi bi-house' : 'bi bi-house-fill'} style={{ fontSize: '25px' }} />
    </button>
  );
};
