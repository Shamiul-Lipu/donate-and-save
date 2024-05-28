import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.donors, tagTypes.admin],
    }),
  }),
});

export const { useChangePasswordMutation } = authApi;
