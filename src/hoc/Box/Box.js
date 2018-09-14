import React from "react";
import './Box.css';

const Box = props => {
  return <div className={props.extraClasses + " Box"}>{props.children}</div>;
};
export default Box;
