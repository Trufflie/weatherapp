import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Axios from "axios";
import WeatherUI from "./WeatherUI";

const apiURL = "http://api.weatherapi.com/v1";
const key = "cac9e585b5654a0387734517240604";

async function fetchWeather(location) {
	try {
		const response = await Axios.get(`${apiURL}/search.json`, {
			params: {
				key,
				q: location,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
		setError("An error occurred while fetching the weather data.");
		return null;
	}
}

async function searchClick(name) {
	try {
		const response = await Axios.get(`${apiURL}/current.json`, {
			params: {
				key,
				q: name,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
		setError("An error occurred while fetching the weather data.");
		return null;
	}
}

async function autoFillClick(name) {
	try {
		const response = await Axios.get(`${apiURL}/current.json`, {
			params: {
				key,
				q: name,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
		setError("An error occurred while fetching the weather data.");
		return null;
	}
}

const WeatherApp = () => {
	const [autoFill, setAutoFill] = useState({});
	const [location, changeLocation] = useState("");
	const [isActive, setActive] = useState(false);
	const [error, setError] = useState("");
	const [appData, setAppData] = useState([]);
	const [showUI, setUI] = useState(false);

	function handleChange(e) {
		const userLocation = e.target.value;
		setActive(true);
		fetchWeather(userLocation).then((res) => {
			if (res) {
				setAutoFill(res);
				setError("");
			}
		});
	}

	function handleAuto() {
		setActive(false);
		autoFillClick(autoFill[0].name).then((res) => {
			if (res) {
				setAppData(res);
				setError("");
				setUI(true);
			}
		});
	}

	function handleClick() {
		setActive(false);
		searchClick(autoFill[0].name).then((res) => {
			if (res) {
				setAppData(res);
				setError("");
				setUI(true);
			}
		});
	}

	return (
		<div className="w-auto my-auto mx-auto h-[90vh] flex flex-col items-center justify-center ">
			{showUI ? (
				<WeatherUI
					name={appData.location.name}
					region={appData.location.region}
					icon={appData.current.condition.icon}
					temp={appData.current.temp_f}
					feelsLike={appData.current.feelslike_f}
				/>
			) : null}
			<div className="w-1/5 flex  items-center justify-center">
				<input
					maxlength="25"
					id="Searchbar"
					name="search"
					className="block mr-1 rounded-md border-0 px-2 w-full text-gray-900 ring-2 ring-inset ring-pink-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					onChange={handleChange}
					type="text"
					placeholder="Enter Zip Code"
					autoComplete="off"
				/>
				<div>
					<button onClick={handleClick}>
						<FaSearch />
					</button>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center w-1/5 text-pink-700 text-nowrap text-center ">
				{isActive && <a href="#">{location}</a>}
				{autoFill.length > 0 && (
					<a
						onClick={handleAuto}
						href="#"
					>
						{autoFill[0].name}, {autoFill[0].region}
					</a>
				)}
				{error && <p>{error}</p>}
			</div>
		</div>
	);
};

export default WeatherApp;
