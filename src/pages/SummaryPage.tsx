import { HomeButton } from "../components/HomeButton";

interface Props {
  playAgain: any;
  setTotal: any;
  score: number;
  questions: string[][];
}

export default function SummaryPage({
  playAgain,
  setTotal,
  score,
  questions,
}: Props) {

  function isRight(option: string) {
    return option.localeCompare("r") === 0 ? true : false;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <HomeButton/>
      <h2 style={{ margin: "10px" }}>
        Congratulations, you scored {score} points!
      </h2>

      <ul>
        {questions.map((record, index) => (
          <li
            key={index}
            style={{ color: isRight(record[2]) ? "rgb(57, 200, 57)" : "grey" }}
          >
            {index} {record[0]} {record[1]}{" "}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          playAgain();
          setTotal(0);
        }}
        style={{ marginBottom: "5px" }}
      >
        press to play again
      </button>
    </div>
  );
}
