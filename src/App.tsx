import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [focus, setFocus] = useState(false);
  const navi = useNavigate();
  return (
    <div className="homeScreen">
      <h1 className="forehead"> FOREHEAD </h1>
      <button
        onClick={() => navi("/play")}
        style={{ background: "transparent", border: 0 }}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        {!focus ? (
          <i className="bi bi-play playbutton"></i>
        ) : (
          <i className="bi bi-play-fill playbutton"></i>
        )}
      </button>
      <button
        onClick={() => navi("/add")}
        style={{ background: "transparent", border: 0, color: "red" }}
      >
        ADD
      </button>
      <p className="signature"> Czółko v.0.1 </p>
    </div>
  );
}
