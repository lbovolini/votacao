import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080/"
axios.defaults.headers = {
        "Content-type": "application/json",
    }

export default axios