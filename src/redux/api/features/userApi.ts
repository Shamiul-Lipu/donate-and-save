import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/user/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetMyProfileQuery } = userApi;
