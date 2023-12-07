import React, { useState } from 'react';

const Home = () => {
  const [userInput, setuserInput] = useState("");
  const [showValue, setshowValue] = useState("");
  const [weatherData, setweatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setuserInput(event.target.value);
  }

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&appid=708f785ac0e0f0115075663cebcfc064`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setweatherData(data);
      console.log(data);
      setshowValue(userInput);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const getIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center h-screen w-screen gap-7'>
      <h1 className='text-6xl'>Weather App</h1>
      <div className='w-1/3 flex gap-3'>
      <input type="text" onChange={handleChange} className='p-4 border border-black w-2/3 h-10 rounded-3xl' />
      <button onClick={handleSubmit} className='w-1/3 border border-black rounded-lg'>Submit</button>
      </div>
     
      {loading && <p>Loading...</p>}
      {weatherData && (
        <div className='border border-black flex w-1/3 h-1/3 justify-between items-center p-5 rounded-lg transition-all'>
          <h2 className='text-xl'>Weather in {showValue} :-</h2>
          <div className='flex flex-col items-center h-full justify-evenly'>
          <div className='flex gap-2 justify-center items-center'>
          <h2> {weatherData.weather[0].main}</h2>
          <img src={getIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" />
          </div>
         
          <h2>Temperature :- {weatherData.main.temp}°C</h2>
          <h2>Humidity :- {weatherData.main.humidity}%</h2>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default Home;
