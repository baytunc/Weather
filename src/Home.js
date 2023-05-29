import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Home.css';
import { WiHumidity } from 'react-icons/wi';
import { BsWind } from 'react-icons/bs';
import axios from 'axios';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 20,
    wind: 2,
  });

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${data.name}&appid=8609287d0bc32995bf47dd44f74e8a3f&units=metric`;
    axios
      .get(apiUrl)
      .then(res => {
        setData({
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          wind: res.data.wind.speed,
        });
      })
      .catch(err => console.log(err));
  }, [data.name]);

  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
          <input
            type='text'
            placeholder='Enter a city name'
            onChange={e => setData({ ...data, name: e.target.value })}
          />
          <button type='submit'>
            <FaSearch />
          </button>
        </div>
        <div className='winfo'>
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className='details'>
            <div className='col'>
              <WiHumidity />
              <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='col'>
              <BsWind />
              <div className='wind'>
                <p>{Math.round(data.wind)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
