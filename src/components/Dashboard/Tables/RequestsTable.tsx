import TableBody from "./TableBody";

const RequestsTable = ({ requests }: any) => {
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((request: any) => {
                const { key, ...props } = request;
                // console.log(request);
                return <TableBody key={key} {...props} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RequestsTable;
