import axios, { AxiosInstance } from "axios";
import { getURL } from "../../shared/utils";

/**
 * Returns an AxiosInstance to be used to make API calls
 * @returns {AxiosInstance} with the current configs URL as baseURL
 */
export const api = ():AxiosInstance => axios.create({
  baseURL: getURL(),
});