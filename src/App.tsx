import { useState, useEffect } from "react";
import "./App.css";
import GuessedButton from "./components/GuessedButton.tsx";

export default function App() {
  const [artist, setArtist] = useState("lolz");
  const [title, setTitle] = useState("Basic");
  const [currentNum, setCurrentNum] = useState(0);
  const [total, setTotal] = useState(0);

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

  function increaseTotal(total: number) {
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
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="root">
      <h6> Czółko v.0.1 </h6>
      {artist && artist.length > 0 && (
        <div>
          <p className="title">{title}</p>
          <p className="artist">{artist}</p>
        </div>
      )}
      <p className="total">{total}</p>
      <div className="buttonWrapper">
        <GuessedButton
          option="wrong"
          funct={() => {
            getData();
          }}
        />
        <GuessedButton
          option="right"
          funct={() => {
            getData();
            increaseTotal(total);
          }}
        />
      </div>

      <p className="currentNum">{currentNum}</p>
    </div>
  );
}
