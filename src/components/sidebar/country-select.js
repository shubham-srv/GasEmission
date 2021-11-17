import React, { useState, useEffect } from "react";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import Co2Dataset from "../../jsonFiles/co2.json"; // CO2 dataset has list of all countries

export default function CountrySelect(props) {
  //Write logic to render all countries as dropdown options
  const options = [];
  for (let country in Co2Dataset) {
    options.push(country);
  }
  const [countryName, setCountryName] = useState(options[0]);

  useEffect(() => {
    props.getCountry(countryName);
  }, [countryName]);

  function changeHandler(e) {
    setCountryName(e.value);
  }

  return (
    <div className="country-select">
      <Dropdown
        onChange={changeHandler}
        options={options}
        value={countryName}
        placeholder="Select an option"
      />
    </div>
  );
}
