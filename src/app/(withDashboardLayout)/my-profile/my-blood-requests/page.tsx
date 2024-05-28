"use client";
import RequestsTable from "@/components/Dashboard/Tables/RequestsTable";
import { useGetAllRequestsQuery } from "@/redux/api/features/bloodDonationApi";

const MyBloodRequestsPage = () => {
  const {
    data: requests,
    isLoading,
    isFetching,
  } = useGetAllRequestsQuery(undefined);

  if (isLoading || isFetching) {
    return <div className="text-white">Loading</div>;
  }

  return (
    <div className="bg-black min-h-screen text-gray-300">
      <div className="text-gray-300 p-6 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-2">My Blood Donation Requests</h3>
        <p className="text-gray-400 max-w-lg mx-auto">
          Here you can find a history of all the blood donation requests you
          have made. Keep track of your requests and manage them efficiently.
        </p>
      </div>
      <RequestsTable requests={requests?.requestByMe} />
    </div>
  );
};

export default MyBloodRequestsPage;
