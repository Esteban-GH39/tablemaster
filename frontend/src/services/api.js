import axios from "axios";

const api = axios.create({
    baseURL: "http://loacalhost:3000/api"
});

export default api;