import axios from "axios";
import { stringify } from "qs";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  paramsSerializer: {
    serialize: (params) => stringify(params, { arrayFormat: "repeat" }),
  },
});
