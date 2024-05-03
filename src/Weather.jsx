import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoPartlySunny } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { GiWindSlap } from "react-icons/gi";
import sunny from "./assets/sunny.svg";
import sunnyCloudy from "./assets/sunnyCloudy.png";

const Weather = () => {
  const [query, setQuery] = useState("Ranchi");
  const [city, setCity] = useState({
    name: "Ranchi",
    main: { temp: 309.49, temp_max: 309.49, temp_min: 309.49 },
  });

  // const KEY = "65f3cf75b2823a266fd010235c6e8f7a";

  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     const res = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=65f3cf75b2823a266fd010235c6e8f7a`
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     setCity(data);
  //   };
  //   fetchWeather();
  // }, [query]);

  const handleWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=65f3cf75b2823a266fd010235c6e8f7a`
      );
      const data = await res.json();
      if (data.name === undefined) throw new Error("City not found!!");
      setCity(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const temp = Math.round(city?.main?.temp - 273.15);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="lg:w-[30%] md:w-[40%] sm:w-[60%] w-[90%] pt-8 pb-20 bg-[#483d8b] rounded-md">
        <div className="flex justify-between px-6 gap-2">
          <input
            type="search"
            placeholder="Enter city name..."
            className="px-4 py-2 w-[80%] border-2 border-slate-300 rounded-md focus:outline-none focus:border-slate-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white"
            onClick={handleWeather}
          >
            Search
          </button>
        </div>
        <div className="flex justify-center items-center flex-col gap-3 mt-20">
          {temp > 20 ? (
            <img src={sunny} className="w-[20%]" alt="" />
          ) : (
            <img src={sunnyCloudy} className="w-[20%]" alt="" />
          )}

          <p className="text-4xl text-white">{temp}&deg;c</p>
          <h2 className="text-2xl text-white">{city?.name}</h2>
        </div>
        <div className="flex justify-around items-center flex-row py-5 mt-10 text-white text-xl">
          <div className="flex flex-row">
            <WiHumidity className="text-white-500 text-4xl" />
            <div className="flex flex-col">
              <p>{city?.main?.humidity}%</p>
              <p className="text-sm font-light">Humidity</p>
            </div>
          </div>
          <div className="flex flex-row">
            <GiWindSlap className="text-white-500 text-2xl mr-2" />
            <div className="flex flex-col">
              <p>{city?.wind?.speed} km/h</p>
              <p className="text-sm font-light">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
