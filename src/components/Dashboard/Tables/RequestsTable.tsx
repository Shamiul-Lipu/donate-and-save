const RequestsTable = ({ requests }: any) => {
  console.log(requests);
  return (
    <>
      <div className="">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-gray-300 text-center">
                <th></th>
                <th>Name</th>
                <th>Blood Type</th>
                <th>Request Status</th>
                <th>Donor Contact Info</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {requests?.map((request: any, i: number) => (
                <tr
                  key={request?.donor?.userProfile?.id}
                  className="text-center"
                >
                  <th>{i + 1}.</th>
                  <td>
                    <div className="flex  items-center gap-3 ">
                      <div>
                        <div className="font-bold">{request?.donor.name}</div>
                        <div className="text-sm font-bold text-white">
                          <span className="badge badge-ghost badge-sm">
                            Doner{" "}
                            {request?.donor?.availability
                              ? "Available"
                              : "Not Available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span> {request?.donor?.bloodType}</span>
                    <br />
                    Last Donation:{" "}
                    {request?.donor?.userProfile?.lastDonationDate}
                  </td>
                  <td>
                    {request?.requestStatus === "PENDING" && (
                      <span className="badge badge-info badge-sm">
                        {request?.requestStatus}
                      </span>
                    )}
                    {request?.requestStatus === "APPROVED" && (
                      <span className="badge badge-success badge-sm">
                        {request?.requestStatus}
                      </span>
                    )}
                    {request?.requestStatus === "REJECTED" && (
                      <span className="badge badge-error badge-sm">
                        {request?.requestStatus}
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="text-center font-semibold">
                      {request?.requestStatus === "PENDING" ||
                      request?.requestStatus === "REJECTED" ? (
                        <span>
                          Will be Available if donor approve your request
                        </span>
                      ) : (
                        <>
                          <span>
                            Contact: {request?.donor?.userProfile?.phoneNumber}
                          </span>
                          <br />
                          <span>
                            {" "}
                            Address: {request?.donor?.location},{" "}
                            {request?.donor?.division},{" "}
                            {request?.donor?.address}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RequestsTable;
