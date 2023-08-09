import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  naviPath: string;
  topCaption: string;
  bottomCaption: string;
}

function getIconName(caption:string):string{
  if (caption === 'SONGS') {
    return 'musicicon bi-file-music';
  } else if (caption === 'CHARADES') {
    return 'playicon bi-chat-left-quote';
  } else{
    return 'plusicon bi-plus-square';
  }
}

const NavigateButton = ({ naviPath, topCaption, bottomCaption }: Props) => {
  const navi = useNavigate();
  const [focus, setFocus] = useState(false);
  const iconName = getIconName(bottomCaption);
  const emptyIconName = `bi ${iconName}`;
  const filledIconName = `bi ${iconName}-fill`;

  return (
    <button
      className={focus ? 'navigateButton focused' : 'navigateButton'}
      onClick={() => navi(naviPath)}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
    >
      <p className="caption topCaption">{topCaption}</p>
      {focus ? (
        <i className={filledIconName}></i>
      ) : (
        <i className={emptyIconName}></i>
      )}
      <p className="caption bottomCaption">{bottomCaption}</p>
    </button>
  );
};

export default NavigateButton;
