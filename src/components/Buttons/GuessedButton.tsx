
const getClassName = (option: string) => {
  return (
    "guessedButton " + (option.localeCompare("wrong") === 0 ? "wrong" : "right")
  );
};

interface Props {
  option: string;
  onClick: () => void;
}

export default function GuessedButton({ option, onClick }: Props) {
  return (
    <button className={getClassName(option)} onClick={onClick}>
      {option}
    </button>
  );
}
