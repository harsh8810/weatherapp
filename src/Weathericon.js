import React from "react";

const Weathericon = (props) => {
  const iconCode = props.iconCode;

  // Construct the URL of the icon image
  const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

  return <img src={iconUrl} alt="Weather icon" />;
};

export default Weathericon;
