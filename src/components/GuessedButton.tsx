import './GuessedButton.css'

interface Props {
  option: string;
  funct: ()=>void;
}


const getColor = (option:string) => {
  return option.localeCompare("wrong")===0 ? "redButton" : "greenButton";
}


const GuessedButton = ({option, funct}:Props) => {
  const colorOpt = getColor(option);
  const namee = "guessedButton " + colorOpt;

  return (
    <>
    <button className={namee} onClick={funct}> {option} </button>
    </>
  )
}

export default GuessedButton