import React, { useEffect, useState } from "react";
import Weathericon from "./Weathericon";

const Whether = () => {
  const [value, setValue] = useState("");
  const [temp, setTemp] = useState("");
  const [feels_like, setfeels_like] = useState("");
  const [temp_min, settemp_min] = useState("");
  const [temp_max, settemp_max] = useState("");
  const [speed, setspeed] = useState("");
  const [weather, setweather] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);

  const date = new Date();
  // eslint-disable-next-line
  const [month, setMonth] = useState(date.getMonth());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(date.getDay());
  const dayName = () => {
    const dayNo = date.getDay();

    if (dayNo === 0) {
      return "Sunday";
    } else if (dayNo === 1) {
      return "Monday";
    } else if (dayNo === 2) {
      return "Tuesday";
    } else if (dayNo === 3) {
      return "Wednesday";
    } else if (dayNo === 4) {
      return "Thursday";
    } else if (dayNo === 5) {
      return "Friday";
    } else if (dayNo === 6) {
      return "Saturday";
    } else {
      return "no day";
    }
  };

  function cityName(event) {
    event.preventDefault();
    setValue(event.target.value);
  }

  let [city, setCity] = useState("Mumbai");

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  let [cityCap, setcityCap] = useState("Mumbai");
  const click = async () => {
    setCity((city = value));
    await weatherupdate();
    setcityCap(capitalizeFirstLetter(city));
    setValue("");
  };

  const weatherupdate = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1295ca1ded5ca2e45cfc440b51264e74`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setLoading(true);
        console.log(`temperature is  ${data.main.temp}`);
        setTemp(parseInt(data.main.temp));
        setfeels_like(parseInt(data.main.feels_like));
        settemp_min(parseInt(data.main.temp_min));
        settemp_max(parseInt(data.main.temp_max));
        setspeed(parseInt(Number(data.wind.speed) * 3.6));
        setweather(data.weather[0].description);
        setIcon(data.weather[0].icon);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(`error is here ${e}`);
    }
  };

  useEffect(() => {
    weatherupdate();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="search-city">
          <div className="search">
            <input
              type="text"
              placeholder="Search Your City?"
              value={value}
              onChange={cityName}
            />
          </div>
          <div className="search-btn">
            <button onClick={click}>Search</button>
          </div>
        </div>
        {!loading && (
          <>
            <div className="loading">
              <p>
                Oops! We haven't <br />
                found any data. <br />
                Please check the <br />
                spelling of City.
              </p>
            </div>
          </>
        )}
        {loading && (
          <div className="back">
            <div className="weather">
              <div className="place">
                <div className="city">
                  <h2>{cityCap}</h2>
                  <p>
                    {monthNames[month]}, {date.getDate()}
                    <span>{date.getFullYear()}</span>
                  </p>
                  <p>{dayName()}</p>
                </div>
              </div>
              <div className="temp">
                <div className="weather-gif">
                  <div className="img-container">
                    <Weathericon iconCode={icon} />
                  </div>
                  <div className="head-container">
                    <h2>
                      <span>{temp}&#176;C.</span>
                    </h2>
                  </div>
                </div>
                <div className="description">
                  <div className="detail">
                    <div className="detail1">
                      <p>Feels Like</p>
                      <p>Min. Temp.</p>
                      <p>Max. Temp.</p>
                      <p>Weather</p>
                      <p>Wind Speed</p>
                    </div>
                    <div className="detail2">
                      <p>{feels_like}&#176;C.</p>
                      <p>{temp_min}&#176;C.</p>
                      <p>{temp_max}&#176;C.</p>
                      <p>{weather}</p>
                      <p>{speed} Km/hr</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Whether;
