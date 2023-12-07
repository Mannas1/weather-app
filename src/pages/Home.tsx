import React, { useState } from 'react'

const Home = () => {

    const [userInput, setuserInput] = useState("");
    const [weatherData, setweatherData] = useState(null);
    const [Loading, setLoading] = useState(false)
    const handleChange = (event) => {
        setuserInput(event.target.value);
    }
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch (
                ` https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&appid=708f785ac0e0f0115075663cebcfc064`
            );
            const data = await response.json();
            setweatherData(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        <h1>Weather App</h1>
        <input type="text" onChange={handleChange} className='border border-black' />
        <button onClick={handleSubmit} className=''>Submit</button>
        {Loading && <p>Loading...</p>}
        { weatherData && (
            <div>
                <h2>Weather in {userInput}</h2>
                <h2>Temperature is {weatherData.main.temp }</h2>
            </div>
        )

        }
    </div>
  )
}

export default Home