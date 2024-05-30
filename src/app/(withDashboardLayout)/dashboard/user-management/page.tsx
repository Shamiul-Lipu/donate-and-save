"use client";
import useUserInfo from "@/hooks/useUserInfo";
import {
  useGetAllUserQuery,
  useUserManagementMutation,
} from "@/redux/api/features/adminApi";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const UserManagementPage = () => {
  const { data: users, isLoading, isFetching } = useGetAllUserQuery(undefined);
  const { userInfo } = useUserInfo();

  const { control, handleSubmit, getValues } = useForm();
  const [userManagement] = useUserManagementMutation();

  const handleUpdateClick = async (userId: string) => {
    const id = toast.loading("Please wait...");
    const data = {
      id: userId,
      role: getValues(`${userId}.role`),
      isAccountActive: getValues(`${userId}.isAccountActive`) === "true",
    };
    // console.log("Updated User Data:", data);
    try {
      const res = await userManagement(data).unwrap();
      // console.log(res);
      if (res?.id) {
        toast.update(id, {
          render: "User updated successfully",
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

  if (isLoading || isFetching) {
    return <div className="text-white">Loading</div>;
  }

  return (
    <div className="bg-black min-h-screen text-gray-300">
      <div className="text-gray-300 p-6 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-2">
          View and Manage User Accounts
        </h3>
        <p className="text-gray-400 max-w-lg mx-auto">
          Activate or deactivate accounts and edit user roles for efficient
          system management.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-gray-300 text-center">
              <th></th>
              <th className="text-start">Name</th>
              <th>Blood Type</th>
              <th>Role / Account Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any, index: number) => (
              <tr key={user.id} className="text-center">
                <th>{index + 1}.</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-xs font-light text-white">
                        {user?.location}, {user?.division}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span>{user?.bloodType}</span>
                </td>
                <td>
                  <div className="text-center font-semibold flex justify-center items-center gap-2">
                    <Controller
                      name={`${user.id}.role`}
                      control={control}
                      defaultValue={user.role}
                      disabled={userInfo && user.id == userInfo.id}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="select select-info w-full max-w-xs bg-slate-700 text-gray-200"
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER">USER</option>
                        </select>
                      )}
                    />
                    <Controller
                      name={`${user.id}.isAccountActive`}
                      control={control}
                      disabled={userInfo && user.id == userInfo.id}
                      defaultValue={user.isAccountActive ? "true" : "false"}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="select select-accent w-full max-w-xs bg-slate-700 text-gray-200"
                        >
                          <option value="true">Active</option>
                          <option value="false">Deactivate</option>
                        </select>
                      )}
                    />
                  </div>
                </td>
                <td>
                  <div className="text-center font-semibold flex justify-center items-center gap-2">
                    <button
                      type="button"
                      className={`btn  ${
                        userInfo && user.id == userInfo.id
                          ? "btn-disabled"
                          : "btn-outline btn-accent"
                      } `}
                      onClick={() => handleUpdateClick(user.id)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
