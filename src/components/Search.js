import React, { useState } from "react";
import sunrise1 from "../images/sunrise1.png";
import sunset1 from "../images/sunset.png";
import station from "../images/station.png";
import winddirection from "../images/wind.png";
import celsius from "../images/celsius.png";
import axios from "axios";
import "../style/Search.css";

export default function Search() {
  const [city, setcity] = useState();
  const [search, setsearch] = useState("Dubai");
  const [min, setmin] = useState();
  const [max, setmax] = useState();
  const [temp, settemp] = useState();
  const [name, setname] = useState();
  const [sunrise, setsunrise] = useState();
  const [sunset, setsunset] = useState();
  const [loading, setLoading] = useState(false);
  const [wind, setwind] = useState();
  const [weather, setweather] = useState();
  const [icon, seticon] = useState();

  const handleOnclick = (event) => {
    setcity(event.target.value);

    getdata();
  };

  const handleOnchange = (event) => {
    setsearch(event.target.value);
  };

  const getdata = () => {
    setLoading(true);
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0529967da16aa74110c3da9966a7776f&units=metric&type=hour`;
    axios
      .get(apiurl)
      .then((res) => {
        const data = res.data;
        if (data.status === 404) {
          console.log("error hai bhai 404");
        } else {
          settemp(data.main.temp);
          setmin(data.main.temp_min);
          setmax(data.main.temp_max);
          setname(data.name + " , " + data.sys.country);
          setwind(data.wind.speed);
          seticon(data.weather[0].icon);
          setweather(data.weather[0].description);
          setsunrise(() => {
            let unix_timestamp = data.sys.sunrise;
            let date = new Date(unix_timestamp * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let formattedTime = hours + ":" + minutes.substr(-2);
            return formattedTime;
          });

          setsunset(() => {
            let unix_timestamp = data.sys.sunset;
            let date = new Date(unix_timestamp * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let formattedTime = hours + ":" + minutes.substr(-2);
            return formattedTime;
          });

          console.log(data);
        }
      })

      .catch(function (error) {
        if (error.response.status === 404) {
          alert("City Not Found..Please check the spelling.");
          console.log(error.response.data.message);
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="searchbox">
        <input
          type="search"
          placeholder={"Enter City Name"}
          className={"searchbar"}
          onChange={handleOnchange}
        />

        <button className="search" value={city} onClick={handleOnclick}>
          {loading ? (
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only"></span>
            </div>
          ) : (
            "Search"
          )}
        </button>
      </div>

      <div className="weatherinfo">
        <div className="tempwind">
          <div className="temperature">
            <img src={celsius} height={30} width={30} /> Temperature :
            {temp && <h1>{temp}°C</h1>}
          </div>
          <div className="wind">
            <img src={winddirection} height={30} width={30} /> &nbsp; Wind :
            {wind && <h2>{wind} mph</h2>}
          </div>
        </div>
        {weather != null && (
          <div className="weatherimg">
            <img src={`https://openweathermap.org/img/w/${icon}.png`}></img>{" "}
            &nbsp;
            <span style={{ margin: "1rem" }}>
              {" "}
              <h5>{weather}</h5>
            </span>
          </div>
        )}
        <div className="sun">
          <div className="sunrise">
            <img src={sunrise1} alt="" style={{ margin: "1rem " }} />
            <h4>Sunrise: {sunrise}</h4>
          </div>
          <div className="sunset">
            <img
              src={sunset1}
              height={100}
              alt=""
              style={{ margin: "1rem " }}
            />

            <h4>Sunset: {sunset}</h4>
          </div>
        </div>
        <img src={station} height={40} width={40} />⛅ &nbsp; Weather in
        <h1>{name} </h1>
        <div className="minmax">
          min : {min} &deg;C &nbsp; | &nbsp; max : {max} &deg;C
        </div>
      </div>
      <div className="footer">
        <a href="https://github.com/jafar-b" target="blank" >

        <b> &lt;/&gt; by JAFAR IN 2022 </b>
        </a>
      </div>
    </div>
  );
}
