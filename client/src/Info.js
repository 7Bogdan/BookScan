import React from "react";

function Info(props) {
  return (
    <>
      <div className ="info">
        <p> {props.numder}. This word {props.words} was repeated <b>{props.quantity}</b> times</p>
      </div>
    </>
  );
}

export default Info;
