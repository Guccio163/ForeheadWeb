import "./GuessedButton.css";

const getColor = (option: string) => {
  return option.localeCompare("wrong") === 0 ? "redButton" : "greenButton";
};

interface Props {
  option: string;
  funct: () => void;
}

export default function GuessedButton({ option, funct }: Props) {
  const colorOpt = getColor(option);
  const namee = "guessedButton " + colorOpt;

  return (
    <>
      <button className={namee} onClick={funct}>
        {" "}
        {option}{" "}
      </button>
    </>
  );
}
