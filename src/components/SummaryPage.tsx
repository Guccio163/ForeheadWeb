import { useNavigate } from "react-router-dom";

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
  const navi = useNavigate();

  function isRight(option: string) {
    return option.localeCompare("r") === 0 ? true : false;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
      <button onClick={() => navi("/")}> press to go home</button>
    </div>
  );
}
