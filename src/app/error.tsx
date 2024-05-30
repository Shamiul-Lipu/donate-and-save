"use client";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="text-center w-1/2">
        <h1 className="text-5xl font-bold mb-4 text-red-50">Oops!</h1>
        <p className="text-2xl bg-red-600 text-white p-4 rounded-xl shadow-lg">
          Something went wrong!
        </p>
        <p className="text-lg bg-red-700 text-white p-4 rounded-xl shadow-lg mt-4">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Try Again
        </button>
      </div>
      <div className="mt-8">
        {/* <img
          src="/images/error-illustration.svg"
          alt="Error Illustration"
          className="w-64 h-64"
        /> */}
      </div>
    </div>
  );
};

export default ErrorPage;
