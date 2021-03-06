import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    // rbg: "rbg(204, 16, 52)",
    // half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 700,
  },
  recovered: {
    hex: "#7dd71d",
    // rbg: "rbg(125, 215, 29)",
    // half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 700,
  },
  deaths: {
    hex: "#fb4443",
    // rbg: "rbg(251, 68, 67)",
    // half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 700,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

  return sortedData;
};

// draw circles on the map
export const showDataOnMap = (countries, casesType = "cases") =>
  countries.map((country, id) => (
    <Circle
      key={id}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.1}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const prettyLargeStat = (stat) => numeral(stat).format("0,0");
