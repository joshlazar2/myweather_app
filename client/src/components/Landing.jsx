import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Landing = () => {

    const [location, setLocation] = useState('')

    const [searchCity, setSearchCity] = useState('')

    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude)

                axios
                    .get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=7e1b28aaa5c343b5a4f025869ff06783`)
                    .then((geoResponse) => {
                        const city = geoResponse.data.features[0].properties.city;
                        setLocation(geoResponse.data.features[0].properties.city)
                        axios
                            .get('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather', {
                                params: { city },
                                headers: {
                                    'X-RapidAPI-Key': 'f791bf1bc4mshdb7d05fed40d8cap16c781jsn529c99890968',
                                    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
                                },
                            })
                            .then((weatherResponse) => {
                                setWeatherData(weatherResponse.data)
                            })
                            .catch((weatherError) => {
                                console.error(weatherError);
                            });
                    })
                    .catch((geoError) => {
                        console.error(geoError);
                    });
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    const dateSunrise = new Date(weatherData.sunrise * 1000)
    const dateSunset = new Date(weatherData.sunset * 1000)

    const sunriseTime = {
        hours: dateSunrise.getHours(),
        minutes: dateSunrise.getMinutes(),
        seconds: dateSunrise.getSeconds()
    }

    const sunsetTime = {
        hours: dateSunset.getHours(),
        minutes: dateSunset.getMinutes(),
        seconds: dateSunset.getSeconds()
    }

    const sunrise = `${sunriseTime.hours}:${sunriseTime.minutes}:${sunriseTime.seconds}`

    const sunset = `${sunsetTime.hours}:${sunsetTime.minutes}:${sunsetTime.seconds}`

    const changeHandler = (e) => {
        setSearchCity(e.target.value)
    }

    const submitHandler = (e) => {
        setLocation(searchCity)
        const city = searchCity
        e.preventDefault();
        axios
            .get('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather', {
                params: { city },
                headers: {
                    'X-RapidAPI-Key': 'f791bf1bc4mshdb7d05fed40d8cap16c781jsn529c99890968',
                    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
                },
            })
            .then((weatherResponse) => {
                setWeatherData(weatherResponse.data)
            })
            .catch((weatherError) => {
                console.error(weatherError);
            });
    }

    return (
        <div class="flex items-center justify-center bg-slate-100 h-screen">
            <div class="bg-white flex flex-col rounded-2xl p-6 space-y-6 md:p-10">
                <div class="flex space-between space-x-6 items-center">
                    <h1 class="text-4xl">My Weather App</h1>
                    <form onSubmit={submitHandler}>
                        <input class="border rounded-xl p-2 mr-6" type="text" placeholder='City' onChange={changeHandler} />
                        <button class=" w-fit p-2 bg-blue-700 text-white  border-b-blue-700 rounded-lg " >Search</button>
                    </form>
                </div>
                <h2 class="text-3xl">{location}</h2>
                <h3 class="text-2xl">{(weatherData.temp * 9 / 5) + 32}°</h3>
                <div class="flex justify-around">
                    <p class="text-xl">Feels Like:</p>
                    <p class="text-xl">{(weatherData.feels_like * 9 / 5) + 32}°</p>
                </div>
                <div class="flex justify-around">
                    <p class="text-xl">Humidity</p>
                    <p class="text-xl">{weatherData.humidity}%</p>
                </div>
                <div class="flex justify-around">
                    <p class="text-xl">High/Low:</p>
                    <p class="text-xl">{(weatherData.max_temp * 9 / 5) + 32}°/{(weatherData.min_temp * 9 / 5) + 32}°</p>
                </div>
                <div class="flex justify-around">
                    <p class="text-xl">Wind Speed:</p>
                    <p class="text-xl">{weatherData.wind_speed} mph</p>
                </div>
                <div class="flex justify-around">
                    <p class="text-xl">Sun Rise:</p>
                    <p class="text-xl">{sunrise}</p>
                </div>
                <div class="flex justify-around">
                    <p class="text-xl">Sun Set:</p>
                    <p class="text-xl">{sunset}</p>
                </div>
            </div>
        </div>
    );
}

export default Landing;
