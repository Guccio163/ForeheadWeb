import "./GuessedButton.css";

const getClassName = (option: string) => {
  return (
    "guessedButton " + (option.localeCompare("wrong") === 0 ? "wrong" : "right")
  );
};

interface Props {
  option: string;
  funct: () => void;
}

export default function GuessedButton({ option, funct }: Props) {
  return (
    <button className={getClassName(option)} onClick={funct}>
      {option}
    </button>
  );
}
