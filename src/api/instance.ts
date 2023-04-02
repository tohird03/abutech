import axios from "axios"

export const instanceLogin = axios.create({
    baseURL: "https://reqres.in/",
    headers: {
        "Content-Type": "application/json",
    }
})

export const instanceWeather = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
    headers: {
        "Content-Type": "application/json"
    }
})
