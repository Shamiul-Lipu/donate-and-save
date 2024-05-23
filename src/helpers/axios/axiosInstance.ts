import setAccessToken from "@/services/actions/setAccessToken";
import { getNewAccessToken } from "@/services/auth.services";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage("accessToken");

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    // console.log(error);
    const config = error.config;
    // console.log(config);
    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage("accessToken", accessToken);
      setAccessToken(accessToken);
      return instance(config);
    } else {
      const responseObject = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessages: error?.response?.data?.message,
      };
      return responseObject;
    }
  }
);

export { instance };
