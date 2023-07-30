import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [focus, setFocus] = useState(false);
  const navi = useNavigate();
  return (
    <div className="homeScreen">
      <h1> FOREHEAD </h1>
      <button
        onClick={() => navi("/play")}
        style={{ background: "transparent", border: 0 }}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
      >
        {!focus ? (
          <i className="bi bi-play"></i>
        ) : (
          <i className="bi bi-play-fill"></i>
        )}
      </button>
      <p> Czółko v.0.1 </p>
    </div>
  );
}
