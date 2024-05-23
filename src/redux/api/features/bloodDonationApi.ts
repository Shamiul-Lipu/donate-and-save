import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const bloodDonationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDonors: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/blood-donation/donor-list",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any[], meta: any) => {
        return {
          donors: response,
          meta,
        };
      },
      providesTags: [tagTypes.donors],
    }),

    getSingleDonor: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/donor/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllDonorsQuery } = bloodDonationApi;
