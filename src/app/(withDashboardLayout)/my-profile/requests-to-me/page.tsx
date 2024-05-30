"use client";
import RequestsTable from "@/components/Dashboard/Tables/RequestsTable";
import { useGetAllRequestsQuery } from "@/redux/api/features/bloodDonationApi";
import { useForm } from "react-hook-form";

const RequestsToMePage = () => {
  const {
    data: requests,
    isLoading,
    isFetching,
  } = useGetAllRequestsQuery(undefined);
  const { control, handleSubmit, getValues } = useForm();

  if (isLoading || isFetching) {
    return <div className="text-white">Loading</div>;
  }

  // console.log(requests?.requestToMe);
  const transformedRequests = requests?.requestToMe?.map(
    (request: any, index: number) => ({
      id: request?.id,
      key: request?.id,
      index: index,
      name: request?.requesterName,
      availability: false,
      bloodType: request?.requester?.bloodType,
      lastDonationDate: false,
      requestStatus: request?.requestStatus,
      phoneNumber: request?.requesterPhoneNumber,
      location: request?.requesterLocation,
      division: request?.requesterDivision,
      address: request?.requesterAddress,
      requestToMe: true,
    })
  );

  return (
    <div className="bg-black min-h-screen text-gray-300">
      <div className="text-gray-300 p-6 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-2">
          Requests for Blood Donation to Me
        </h3>
        <p className="text-gray-400 max-w-lg mx-auto">
          View and manage all the blood donation requests you have received.
          This section provides a detailed overview of individuals who need your
          help.
        </p>
      </div>

      <RequestsTable requests={transformedRequests} />
    </div>
  );
};

export default RequestsToMePage;
