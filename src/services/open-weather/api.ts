import axios from "axios";

export const openWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: { appid: import.meta.env.VITE_OPEN_WEATHER_APP_ID },
});
