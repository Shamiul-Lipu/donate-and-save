import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-lg mb-6">
          Sorry, the page you are looking for doesnt exist or has been moved.
        </p>
        <Link href="/">
          <p className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
            Return Home
          </p>
        </Link>
      </div>
    </div>
  );
}
