import './App.scss';
import NavigateButton from './components/Buttons/NavigateButton';
import Signature from './components/Signature';

export default function App() {
  return (
    <div className="homeScreen">
      <h1 className="forehead"> FOREHEAD </h1>
      <div className="navigateButtonsPanel">
        <NavigateButton naviPath="/playSongs" topCaption="PLAY" bottomCaption="SONGS" />
        <NavigateButton naviPath="/playCharades" topCaption="PLAY" bottomCaption="CHARADES" />
        <NavigateButton naviPath="/add" topCaption="ADD" bottomCaption="RECORDS" />
      </div>
      <Signature />
    </div>
  );
}
