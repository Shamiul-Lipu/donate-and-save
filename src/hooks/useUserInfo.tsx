import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/local-storage";
import { JwtPayload, jwtDecode } from "jwt-decode";

const useUserInfo = (): any | string => {
  const [userInfo, setUserInfo] = useState<any | string>("");

  useEffect(() => {
    const fetchUserInfo = () => {
      const authToken = getFromLocalStorage("accessToken");
      if (authToken) {
        const decodedData: JwtPayload & { role: any } = jwtDecode(
          authToken
        ) as JwtPayload & {
          role: any;
        };
        const userInfo: any = {
          ...decodedData,
          role: decodedData.role?.toLowerCase() || "",
        };
        setUserInfo(userInfo);
      } else {
        setUserInfo("");
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, setUserInfo };
};

export default useUserInfo;
