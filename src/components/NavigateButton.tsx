import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  playPath: string;
  topCaption: string;
  bottomCaption: string;
}

const NavigateButton = ({ playPath, topCaption, bottomCaption }: Props) => {
  const navi = useNavigate();
  const [focus, setFocus] = useState(false);

  return (
    <button
      className={focus ? 'navigateButton focused' : 'navigateButton'}
      onClick={() => navi(playPath)}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      <p className="caption topCaption">{topCaption}</p>
      {focus ? (
        <i className="bi bi-play-fill playicon"></i>
      ) : (
        <i className="bi bi-play playicon"></i>
      )}
      <p className="caption bottomCaption">{bottomCaption}</p>
    </button>
  );
};

export default NavigateButton;
