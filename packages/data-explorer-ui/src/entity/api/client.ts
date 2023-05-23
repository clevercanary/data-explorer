import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
} from "axios";
import { getURL } from "../../shared/utils";

let axiosInstance: AxiosInstance | null = null;

/**
 * Returns an AxiosInstance to be used to make API calls with a timeout of 10 seconds
 * @returns {AxiosInstance} with the current configs URL as baseURL
 */
export const api = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: getURL(),
      timeout: 10 * 1000,
    });
  }
  return axiosInstance;
};

/**
 * Adding interceptors to axios responses
 */
api().interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { config, response } = error;

    if (response?.status === HttpStatusCode.ServiceUnavailable && config) {
      const retryAfterValue = response.headers["Retry-After"];
      const waitingTime = retryAfterValue ? +retryAfterValue : 0;
      return new Promise((resolve) => {
        setTimeout(() => resolve(api()(config)), waitingTime);
      });
    }

    Promise.reject(error);
  }
);
