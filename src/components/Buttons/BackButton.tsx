import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navi = useNavigate();
  const [focus, setFocus] = useState(false);

  return (
    <button
      className="homeButton"
      onClick={() => navi(-1)}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      {' '}
      <i
        className={!focus ? 'bi bi-arrow-left-circle' : 'bi bi-arrow-left-circle-fill'}
        style={{ fontSize: '25px' }}
      />
    </button>
  );
};
