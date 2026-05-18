import axios from "axios"

const api = axios.create({
  baseURL: "https://food-app-z5qx.onrender.com/api",
})

export default api