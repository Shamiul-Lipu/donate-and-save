import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/utils/local-storage";
import { JwtPayload, jwtDecode } from "jwt-decode";

const useUserInfo = (): { userInfo: any | string; loading: boolean } => {
  const [userInfo, setUserInfo] = useState<any | string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserInfo = () => {
    setLoading(true);
    const authToken = getFromLocalStorage("accessToken");
    if (authToken) {
      try {
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
      } catch (error) {
        console.error("Failed to decode token", error);
        setUserInfo("");
      }
    } else {
      setUserInfo("");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();

    const handleStorageChange = () => {
      fetchUserInfo();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { userInfo, loading };
};

export default useUserInfo;
