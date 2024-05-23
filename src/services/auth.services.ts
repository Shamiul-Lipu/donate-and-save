import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { jwtDecode } from "jwt-decode";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  //   console.log(accessToken);
  return setToLocalStorage("accessToken", accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage("accessToken");
  //   console.log(authToken);
  if (authToken) {
    const decodedData: any = jwtDecode(authToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("accessToken");
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage("accessToken");
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
