"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";
import { useGetMyProfileQuery } from "@/redux/api/features/userApi";
import { useDonationRequestMutation } from "@/redux/api/features/bloodDonationApi";
import { toast } from "react-toastify";

// Define the Zod schema for form validation
const schema = z.object({
  donorId: z.string().min(1, "Donor Id is required"),
  isTermsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  hospitalName: z.string().min(1, "Hospital Name is required"),
  dateOfDonation: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  hospitalAddress: z.string().min(1, "Hospital Address is required"),
  reason: z.string().min(1, "Reason is required"),
});

type FormData = z.infer<typeof schema>;

const RequestBloodPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } =
    useGetMyProfileQuery(undefined);
  const [donationRequest] = useDonationRequestMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const searchParams = useSearchParams();
  const donorId = searchParams.get("donorId");
  const isTermsAgreed = watch("isTermsAgreed");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const id = toast.loading("Please wait...");
    try {
      const res = await donationRequest(data).unwrap();
      // console.log();
      if (res?.id) {
        toast.update(id, {
          render: "Request successfully made",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        router.push("/dashboard");
      } else {
        toast.update(id, {
          render: "Request Failed",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Error creating donation request!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-neutral py-2 h-full">
      {isUserLoading && (
        <div className="h-screen bg-neutral w-full flex justify-center items-center overflow-hidden">
          <div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-52 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      )}
      <div className="h-fit bg-neutral">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto my-10 w-full max-w-[740px] rounded-xl border-2 border-gray-500 bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 "
        >
          <h2 className="mb-5 text-center text-2xl font-bold text-gray-300 lg:mb-11 lg:text-[28px]">
            Request Donation Form
          </h2>

          <div className="space-y-9 text-white lg:space-y-1">
            {/* Non-editable fields */}

            {user && (
              <>
                <div className="flex justify-evenly items-center">
                  <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="requesterName">Requester Name:</label>
                    <input
                      className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                      type="text"
                      value={user.name}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="requesterEmail">Requester Email:</label>
                    <input
                      className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                      type="text"
                      value={user.email}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex justify-evenly items-center">
                  <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="requesterAge">Requester Age:</label>
                    <input
                      className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                      type="text"
                      value={user.userProfile?.age}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="requesterPhoneNumber">
                      Requester Phone Number:
                    </label>
                    <input
                      className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                      type="text"
                      value={user.userProfile?.phoneNumber}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex justify-evenly items-center">
                  <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="requesterLastDonationDate">
                      Requester Last Donation Date:
                    </label>
                    <input
                      className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                      type="text"
                      value={user.userProfile?.lastDonationDate}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="requesterLocation">
                      Requester Location:
                    </label>
                    <input
                      className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                      type="text"
                      value={user.location}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex justify-evenly items-center">
                  <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="requesterDivision">
                      Requester Division:
                    </label>
                    <input
                      className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                      type="text"
                      value={user.division}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="requesterAddress">Requester Address:</label>
                    <input
                      className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                      type="text"
                      value={user.address}
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}

            {/* Editable fields */}
            <div className="flex justify-evenly items-center py-2">
              <div className="space-y-4 lg:space-y-5">
                <input
                  className="text-white rounded-md bg-[#2D323F] px-3 py-2.5 mr-2 checkbox checkbox-accent"
                  type="checkbox"
                  {...register("isTermsAgreed")}
                />
                <label htmlFor="isTermsAgreed">
                  Agree to
                  <button
                    type="button"
                    className="text-cyan-500 underline ml-1"
                    onClick={() => setOpenModal(true)}
                  >
                    Terms and Conditions
                  </button>
                </label>
                {errors.isTermsAgreed && (
                  <p className="text-red-500">{errors.isTermsAgreed.message}</p>
                )}
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="donorId"></label>
                <input
                  className=" w-full rounded-md bg-[#2D323F] px-3 py-2.5 hidden"
                  type="text"
                  defaultValue={donorId as string}
                  {...register("donorId")}
                  placeholder="Donor"
                />
                {errors.donorId && (
                  <p className="text-red-500">{errors.donorId.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-evenly items-center">
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="hospitalName">Hospital Name:</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  {...register("hospitalName")}
                  placeholder="Hospital Name"
                />
                {errors.hospitalName && (
                  <p className="text-red-500">{errors.hospitalName.message}</p>
                )}
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="hospitalAddress">Hospital Address:</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  {...register("hospitalAddress")}
                  placeholder="Hospital Address"
                />
                {errors.hospitalAddress && (
                  <p className="text-red-500">
                    {errors.hospitalAddress.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-evenly items-center">
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="dateOfDonation">Date Of Donation:</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  {...register("dateOfDonation")}
                  placeholder="YYYY-MM-DD"
                />
                {errors.dateOfDonation && (
                  <p className="text-red-500">
                    {errors.dateOfDonation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="reason">Reason:</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  {...register("reason")}
                  placeholder="Reason"
                />
                {errors.reason && (
                  <p className="text-red-500">{errors.reason.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center lg:mt-20 gap-2">
            <button
              type="submit"
              className={`rounded bg-cyan-300 px-4 py-2 text-black transition-all hover:opacity-80  ${
                isTermsAgreed
                  ? "cursor-pointer"
                  : "cursor-not-allowed bg-cyan-300 tooltip tooltip-accent"
              }`}
              data-tip="Agreed with the terms!"
              disabled={!isTermsAgreed}
            >
              Send Request
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
          <div className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 text-gray-300">
            <h3 className="font-bold text-lg ">
              Terms for Blood Donation Request
            </h3>
            <p className="py-4">
              1. You must be in good health and feeling well.
              <br />
              2. You must be at least 17 years old in most states.
              <br />
              3. You must weigh at least 110 lbs.
              <br />
              4. You must not have donated blood in the last 56 days.
              <br />
              5. You must not be at risk for HIV/AIDS, hepatitis, or other
              infections transmitted by blood.
              <br />
              6. You must agree to the testing of your blood for infectious
              diseases.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline  bg-cyan-300 textbla"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestBloodPage;
