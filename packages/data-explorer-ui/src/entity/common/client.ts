import axios, { AxiosInstance } from "axios";
import { getURL } from "../../shared/utils";

let axiosInstance: AxiosInstance | null = null;

/**
 * Returns a singleton Axios instance configured for making HTTP requests to a specified base URL.
 * @param baseURL - The base URL to use for the AxiosInstance.
 * @returns axios instance.
 */
export const api = (baseURL = getURL()): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL,
      timeout: 20 * 1000,
    });
  }
  return axiosInstance;
};
