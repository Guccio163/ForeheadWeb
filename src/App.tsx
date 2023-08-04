import './App.css';
import NavigateButton from './components/Buttons/NavigateButton';

export default function App() {

  return (
    <div className="homeScreen">
      <h1 className="forehead"> FOREHEAD </h1>
      <div className='navigateButtonsPanel'>
        <NavigateButton playPath="/playSongs" topCaption='PLAY' bottomCaption='SONGS'/>
        <NavigateButton playPath="/playCharades" topCaption='PLAY' bottomCaption='CHARADES'/>
        <NavigateButton playPath="/add" topCaption='ADD' bottomCaption='RECORDS'/>
      </div>
      <p className="signature"> Czółko v.0.1 </p>
    </div>
  );
}
