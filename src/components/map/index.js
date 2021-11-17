import React, { useState } from "react";
import ParameterSelect from "../sidebar/parameter-select";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { dataset } from "../Data";
import MapData from "../../jsonFiles/map.json";
import ReactTooltip from "react-tooltip";
import _ from "lodash";

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else if (num > 1000) {
    return Math.round(num / 100) / 10 + "K";
  } else {
    return num;
  }
};

export default function Map() {
  const countryList = [];
  const [validCountryList, setValidCountryList] = useState([]);
  const [data, setData] = useState({});
  const [tooltipContent, setTooltipContent] = useState("");

  function parameterHandler(parameter) {
    const { name, data } = dataset.find(
      (element) => element.name === _.toLower(parameter)
    );
    setData(data);
    for (let countryName in data) {
      countryList.push(countryName);
    }
    setValidCountryList(countryList);
  }

  return (
    //The code to render a map goes here.
    <>
      <div className="map">
        <div style={{ display: "flex", justifyContent: "right" }}>
          <ParameterSelect getParameter={parameterHandler} />
        </div>
        <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
          <ZoomableGroup zoom={1}>
            <Geographies geography={MapData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        let currentData = "";
                        const { NAME, POP_EST } = geo.properties;
                        try {
                          currentData = data[NAME]["2010"];
                        } catch {
                          currentData = "no data";
                        }

                        setTooltipContent(
                          `${NAME} — ${rounded(POP_EST)} — ${rounded(
                            currentData
                          )}`
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: validCountryList.includes(geo.properties.NAME)
                            ? "#FFC37F"
                            : "#D6D6DA",
                          outline: "none",
                        },
                        hover: {
                          fill: "#F53",
                          outline: "none",
                        },
                        strokeWidth: "0.7",
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <p style={{ fontSize: "0.7rem", color: "grey" }}>
          MapInfo :&ensp;Only countries highlighted have data available. <br />{" "}
          Data format :&ensp;
          <em>
            Country Name — Population — Emission in Kilotonne CO2 equivalent
          </em>
        </p>
      </div>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </>
  );
}
