import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";

export const logoutUser = (router: AppRouterInstance) => {
  localStorage.removeItem("accessToken");

  deleteCookies(["accessToken", "refreshToken"]);

  router.refresh();
  router.push("/");
};
