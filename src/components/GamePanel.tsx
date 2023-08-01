import { useState, useEffect } from "react";
import GuessedButton from "./GuessedButton.tsx";
import { useNavigate } from "react-router-dom";
import SummaryPage from "./SummaryPage.tsx";
import "bootstrap/dist/css/bootstrap.css";

export default function GamePanel() {
  const [artist, setArtist] = useState("lolz");
  const [title, setTitle] = useState("Basic");
  const [currentNum, setCurrentNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [qCount, setQCount] = useState(-1);
  const [recordArray, setRecordArray] = useState<string[][]>([]);
  const [focus, setFocus] = useState(false);

  const navi = useNavigate();

  function getRandomNumberInRange(min: number, max: number): number {
    let ans = Math.floor(Math.random() * (max - min)) + min;
    ans = ans === currentNum ? (ans + 1) % max : ans;
    return ans;
  }

  function refreshData(myJson: string | any[]) {
    setCurrentNum(getRandomNumberInRange(0, myJson.length));
    setArtist(myJson[currentNum].artist);
    setTitle(myJson[currentNum].title);
  }

  function addToList(tit: string, art: string, res: string) {
    const rec: string[] = [tit, art, res];
    setRecordArray([...recordArray, rec]);
  }

  function increaseTotal() {
    setTotal(total + 1);
  }

  function getData() {
    fetch("songs.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        refreshData(myJson);
        setQCount(qCount + 1);
        // const art = myJson[currentNum].artist;
        // const tit = myJson[currentNum].title + "  ";
        // const rec: string[] = [tit, art];
        // setRecordArray([...recordArray, rec]);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  if (qCount < 10) {
    return (
      <div className="root">
        {artist && artist.length > 0 && (
          <div>
            <button
              style={{
                background: "transparent",
                border: 0,
                marginTop: "5px",
                marginLeft: "5px",
              }}
              onClick={() => navi(-1)}
              onMouseEnter={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
            >
              {" "}
              <i
                className={!focus ? "bi bi-house" : "bi bi-house-fill"}
                style={{ fontSize: "25px" }}
              />
            </button>
            <p className="title">{title}</p>
            <p className="artist">{artist}</p>
          </div>
        )}
        <p className="total">
          {total}/{qCount}
        </p>
        <div className="buttonWrapper">
          <GuessedButton
            option="wrong"
            funct={() => {
              getData();
              addToList(title, artist, "f");
            }}
          />
          <GuessedButton
            option="right"
            funct={() => {
              getData();
              increaseTotal();
              addToList(title, artist, "r");
            }}
          />
        </div>{" "}
        <br />
        {/* <p className="currentNum">{currentNum}</p> */}
        {/* <p className="qCount">for debugging purposes: qCount {qCount}</p> */}
        <p className="signature"> Czółko v.0.1 </p>
      </div>
    );
  } else {
    return (
      <>
        <SummaryPage
          playAgain={() => {
            setQCount(0);
            setRecordArray([]);
          }}
          setTotal={setTotal}
          score={total}
          questions={recordArray}
        />
        <p className="signature"> Czółko v.0.1 </p>
      </>
    );
  }
}
