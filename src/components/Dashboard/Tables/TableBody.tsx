"use client";
import { useUpdateReqestStatusMutation } from "@/redux/api/features/bloodDonationApi";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const TableBody = ({
  id: userId,
  index,
  name,
  availability,
  bloodType,
  lastDonationDate,
  requestStatus,
  phoneNumber,
  location,
  division,
  address,
  requestToMe,
}: any) => {
  const { control, handleSubmit } = useForm();
  const [updateReqestStatus] = useUpdateReqestStatusMutation();

  const onSubmit = async (value: any) => {
    // console.log(value);
    const id = toast.loading("Please wait...");
    const data = {
      id: userId,
      requestStatus: value.status,
    };

    try {
      // console.log(data);
      const res = await updateReqestStatus(data).unwrap();
      // console.log(res);
      if (res?.id) {
        toast.update(id, {
          render: "Status updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        // router.push("/my-profile");
      } else {
        toast.update(id, {
          render: "Request Failed to update",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Error updating request!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <tr className="text-center">
      <th>{index + 1}.</th>
      <td>
        <div className="flex  items-center gap-3 ">
          <div>
            <div className="font-bold">{name}</div>
            {availability && (
              <div className="text-sm font-bold text-white">
                <span className="badge badge-ghost badge-sm">
                  {availability ? "Available" : "Not Available"}
                </span>
              </div>
            )}
          </div>
        </div>
      </td>
      <td>
        <span> {bloodType}</span>
        <br />
        {lastDonationDate && <span>Last Donation: {lastDonationDate}</span>}
      </td>
      <td>
        {requestStatus === "PENDING" && (
          <span className="badge badge-info badge-sm">{requestStatus}</span>
        )}
        {requestStatus === "APPROVED" && (
          <span className="badge badge-success badge-sm">{requestStatus}</span>
        )}
        {requestStatus === "REJECTED" && (
          <span className="badge badge-error badge-sm">{requestStatus}</span>
        )}
      </td>
      <td>
        <div className="text-center font-semibold">
          {requestStatus === "PENDING" || requestStatus === "REJECTED" ? (
            <span>Will be Available if donor approve your request</span>
          ) : (
            <>
              <span>Contact: {phoneNumber}</span>
              <br />
              <span>
                {" "}
                Address: {location}, {division}, {address}
              </span>
            </>
          )}
        </div>
      </td>
      {requestToMe && (
        <td>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center font-semibold flex justify-center items-center gap-2">
              <Controller
                name="status"
                control={control}
                defaultValue={requestStatus}
                render={({ field }) => (
                  <select
                    {...field}
                    className="select select-accent w-full max-w-xs bg-slate-700 text-gray-200"
                  >
                    <option value="APPROVED">APPROVE</option>
                    <option value="PENDING">PENDING</option>
                    <option value="REJECTED">REJECT</option>
                  </select>
                )}
              />
              <button type="submit" className="btn btn-outline btn-accent">
                Update
              </button>
            </div>
          </form>
        </td>
      )}
    </tr>
  );
};

export default TableBody;
