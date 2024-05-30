import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: `/admin/user-management`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    userManagement: build.mutation({
      query: (data) => ({
        url: `/admin/user-management`,
        method: "PUT",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.donors, tagTypes.admin],
    }),
  }),
});

export const { useGetAllUserQuery, useUserManagementMutation } = adminApi;
