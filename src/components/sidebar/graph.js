import React, { useState, useEffect } from "react";
import { Chart } from "react-charts";

export default function Graph(props) {
  const [countryFound, setCountryFound] = useState(true);
  const [dataToInject, setDataToInject] = useState({ label: "", data: [] });
  const dataset = props.dataset;
  const givenCountry = props.country;
  const requiredData = { label: "", data: [] };

  useEffect(() => {
    dataOperation();
  }, [givenCountry, dataset]);

  function dataOperation() {
    let found = false;
    for (let countryName in dataset) {
      if (givenCountry === countryName) {
        found = true;
        requiredData.label = givenCountry;
        const newData = dataset[givenCountry];
        for (let year in newData) {
          requiredData.data.push([Math.floor(year), newData[year]]);
        }
      }
    }

    setDataToInject((oldData) => {
      return { ...oldData, ...requiredData };
    });
    setCountryFound(found);
  }
  console.log(dataToInject);
  const data = React.useMemo(() => [dataToInject], [dataToInject]);

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
      className="chart"
    >
      <p>Example Graph</p>
      <Chart data={data} axes={axes} />
      <div className="chart-unavailable">
        {!countryFound && <p>Data not available.</p>}
      </div>
    </div>
  );
}
