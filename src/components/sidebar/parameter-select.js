import React, { useState, useEffect } from "react";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";

export default function ParameterSelect(props) {
  const options = ["Co2", "Nf3", "Ch4", "Ghgs", "Sf6", "Hfc", "N2o", "Pfc"];
  const [option, setOption] = useState(options[0]);

  useEffect(() => {
    props.getParameter(option);
  }, [option]);

  function dropDownHandler(e) {
    setOption(e.value);
  }

  return (
    <div className="parameter-select">
      <Dropdown
        onChange={dropDownHandler}
        options={options}
        value={option}
        placeholder="Select an option"
      />
    </div>
  );
}
