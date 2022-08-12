import React, { useState } from "react";
import Info from "./Info";

function Scan() {
  const [top, setTop] = useState([]);
  const [words, setWords] = useState({});

  const gets = () => {
    fetch("/results", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTop(data.topTen);
        setWords(data.words[0]);
      });
  };
  return (
    <>
      <p><b>3 step:</b> <button onClick={() => gets()}> Scan </button> </p>
      {top.length === 0 ? null : (
        <>
          <h4> Words in the text : {words.sum} </h4>
          <h3> Of these, 10 are the most repetitive: </h3>
        </>
      )}
      {top.map((word,index) => (
        <Info key={word._id} quantity={word.quantity} words={word.words} numder={index+1}/>
      ))}
    </>
  );
}

export default Scan;
