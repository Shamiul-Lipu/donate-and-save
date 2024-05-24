"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessToken = (token: string, option?: any) => {
  cookies().set("accessToken", token);
  if (option) {
    redirect("/");
  }
  if (option && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;
