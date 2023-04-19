import axios, { AxiosInstance } from "axios";
import { getURL } from "../../shared/utils";

let axiosInstance: AxiosInstance | null = null;

/**
 * Returns an AxiosInstance to be used to make API calls
 * @returns {AxiosInstance} with the current configs URL as baseURL
 */
export const api = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: getURL(),
    });
  }
  return axiosInstance;
};
