"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useChangePasswordMutation } from "@/redux/api/features/authApi";
import { passwordChangeValidationSchema } from "@/helpers/validations/passwordChangeValidationSchema";

const ChangePasswordForm = () => {
  const [changePassword] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordChangeValidationSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      rewriteNewPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    const id = toast.loading("Please wait...");
    const { currentPassword, newPassword } = data;
    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
      }).unwrap();
      if (res?.statusCode === 200) {
        toast.update(id, {
          render: "Password changed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(id, {
          render: "Somthing went wrong!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (errors) {
      toast.update(id, {
        render: "Somthing went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const newPassword = watch("newPassword");
  const rewriteNewPassword = watch("rewriteNewPassword");
  const isSubmitDisabled =
    newPassword !== rewriteNewPassword || !newPassword || !rewriteNewPassword;

  return (
    <div className="bg-black min-h-screen text-gray-300 flex justify-center items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 w-full max-w-md text-gray-100"
      >
        <h3 className="text-2xl text-center font-bold mb-2 text-gray-300 py-3">
          Change Password
        </h3>
        <div className="mb-6">
          <label htmlFor="currentPassword" className="block mb-2">
            Current Password
          </label>
          <input
            id="currentPassword"
            {...register("currentPassword")}
            type="password"
            placeholder="Current Password"
            className={`w-full p-3 bg-[#030317] border ${
              errors.currentPassword ? "border-red-500" : "border-white/20"
            } rounded-md focus:outline-none focus:border-indigo-500`}
          />
          {errors.currentPassword && (
            <p className="text-red-300">
              {errors.currentPassword.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="newPassword" className="block mb-2">
            New Password
          </label>
          <input
            id="newPassword"
            {...register("newPassword")}
            type="password"
            placeholder="New Password"
            className={`w-full p-3 bg-[#030317] border ${
              errors.newPassword ? "border-red-500" : "border-white/20"
            } rounded-md focus:outline-none focus:border-indigo-500`}
          />
          {errors.newPassword && (
            <p className="text-red-300">
              {errors.newPassword.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="rewriteNewPassword" className="block mb-2">
            Rewrite New Password
          </label>
          <input
            id="rewriteNewPassword"
            {...register("rewriteNewPassword")}
            type="password"
            placeholder="Rewrite New Password"
            className={`w-full p-3 bg-[#030317] border ${
              errors.rewriteNewPassword ? "border-red-500" : "border-white/20"
            } rounded-md focus:outline-none focus:border-indigo-500`}
          />
          {errors.rewriteNewPassword && (
            <p className="text-red-300">
              {errors.rewriteNewPassword.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-6">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            data-tip="New password and rewrite new password must match"
            className={`w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200 ${
              isSubmitDisabled
                ? "opacity-50 cursor-not-allowed tooltip tooltip-open tooltip-accent  tooltip-bottom"
                : ""
            }`}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
