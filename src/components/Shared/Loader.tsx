import Image from "next/image";
import loaderImage from "@/assets/loader.gif";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div>
        <Image
          width={200}
          height={200}
          src={loaderImage}
          alt="loader"
          className="rounded-2xl mb-2"
        />
        <h3 className="text-gray-500 font-extrabold text-2xl flex gap-2">
          Loading <span className="loading loading-dots loading-lg"></span>
        </h3>
      </div>
    </div>
  );
};

export default Loader;
