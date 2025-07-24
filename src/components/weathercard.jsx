import React, { useState } from 'react';

const weathercard= () => {
  const [value, setValue] = useState("");
  const [weatherObj, setWeatherObj] = useState({
    temp: "--",
    location: "--",
    date: "--",
    time: "--",
    condition: "--",
    src: null
  });

  async function fetchWeather(location) {
  const Api_Key = import.meta.env.VITE_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${Api_Key}
    &q=${location}&aqi=no`;
    const response = await fetch(url);
    if (!response.ok) {
      alert("Location is invalid");
      return null;
    } else {
      const json = await response.json();
      return json;
    }
  }

  const handleClick = async () => {
    if (value !== "") {
      const data = await fetchWeather(value);
      if (data == null) {
        alert("No data found for this location");
        return;
      }
      const temp = data.current.temp_c;
      const location = data.location.name;
      const timeData = data.location.localtime;
      const [date, time] = timeData.split(" ");
      const iconLink = data.current.condition.icon;
      const condition = data.current.condition.text;

      const newObj = {
        temp,
        location,
        date,
        time,
        condition,
        src: iconLink
      };
      setWeatherObj(newObj);
    } else {
      alert("Location can't be empty");
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full min-h-screen flex flex-col text-white font-sans">
      {/* Header */}
      <header className="h-auto py-6 bg-[#3c7f59] flex justify-center items-center w-full shadow-md">
        <div className="w-full max-w-[1200px] px-6 flex flex-col sm:flex-row justify-between gap-4">
          <input
            onChange={handleInput}
            value={value}
            type="text"
            placeholder="Enter Location"
            className="text-white text-base sm:text-lg bg-transparent outline-none py-3 sm:py-4 px-4 border-b-2 border-white w-full placeholder:text-white"
          />
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-green-400 to-lime-500 hover:from-green-500 hover:to-lime-600 transition-all text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-md hover:shadow-xl text-base sm:text-lg w-full sm:w-auto"
          >
            🔍 Search
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main
        className="flex-grow w-full bg-cover bg-center flex items-center justify-center px-6 py-12"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1350&q=80)`
        }}
      >
        <div className="w-full max-w-[900px] bg-black bg-opacity-60 rounded-xl shadow-2xl p-10 text-center space-y-6">
          <div className="text-5xl font-bold text-white">{weatherObj.temp}°C</div>

          <div>
            <div className="text-3xl font-semibold text-white">{weatherObj.location}</div>
            <div className="text-md text-gray-200">
              {weatherObj.time} | {weatherObj.date}
            </div>
          </div>

          <div className="flex flex-col items-center">
            {weatherObj.src && (
              <img
                src={weatherObj.src}
                alt="Weather Icon"
                className="w-20 h-20"
              />
            )}
            <div className="text-xl font-medium text-white mt-2">{weatherObj.condition}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default weathercard;
