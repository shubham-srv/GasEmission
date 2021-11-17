import React, { useState } from "react";
import Graph from "./graph";
import CountrySelect from "./country-select";
import ParameterSelect from "./parameter-select";
import _ from "lodash";
import { dataset } from "../Data";

export default function Sidebar() {
  const [countryName, setCountryName] = useState("Australia");
  const [requiredDataset, setRequiredDataset] = useState(dataset[0].data);

  function parameterHandler(parameter) {
    for (let dataIndex = 0; dataIndex < dataset.length; dataIndex++) {
      if (_.toLower(parameter) === _.toLower(dataset[dataIndex].name)) {
        setRequiredDataset(dataset[dataIndex].data);
      }
    }
  }
  function countryHandler(country) {
    setCountryName(country);
  }

  return (
    <div className="sidebar">
      <div className="dropdowns">
        <CountrySelect getCountry={countryHandler} />
        <ParameterSelect getParameter={parameterHandler} />
      </div>
      <Graph dataset={requiredDataset} country={countryName} />
    </div>
  );
}
