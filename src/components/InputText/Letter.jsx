import React from "react";
import "./letter.css";

const Letter = React.forwardRef(({ char }) => <span>{char}</span>);

export default Letter;
