import React from 'react'

const WeatherUI = (props) => {
  return (
    <div className="w-auto my-auto mx-auto h-[50vh] flex flex-col items-center justify-center ">
    <div className="w-1/5 grid items-center justify-center">
    <img src={props.icon} alt='day or night icon'></img>
    <h1>{props.name}</h1>
    <h1>{props.region}</h1>
    <h1>{props.temp}</h1>
    <h1>{props.feelsLike}</h1>
</div>
</div>
  )
}

export default WeatherUI