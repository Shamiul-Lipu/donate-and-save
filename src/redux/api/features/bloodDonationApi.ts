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

    getDonorDetails: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/blood-donation/donor-details/${id}`,
        method: "GET",
      }),
    }),

    donationRequest: build.mutation({
      query: (data) => ({
        url: "/blood-donation/donation-request",
        method: "POST",
        contentType: "application/json",
        data,
      }),
    }),

    getAllRequests: build.query({
      query: () => ({
        url: `/blood-donation/donation-request`,
        method: "GET",
      }),
    }),

    updateReqestStatus: build.mutation({
      query: (payload) => ({
        url: `/blood-donation/donation-request/${payload.id}`,
        method: "PUT",
        contentType: "application/json",
        data: payload.data,
      }),
      // invalidatesTags: [],
    }),
  }),
});

export const {
  useGetAllDonorsQuery,
  useGetDonorDetailsQuery,
  useDonationRequestMutation,
  useGetAllRequestsQuery,
} = bloodDonationApi;
