import axios from "axios";

const api = axios.create({
  baseURL: "https://abitus-api.geia.vip/v1",
});

export default api;
