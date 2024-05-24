import React from "react";

const Skeleton = () => {
  return (
    <div className="flex justify-center items-center py-8 bg-gray-500 rounded-lg px-6">
      <div className="card w-full shadow-xl">
        <figure></figure>
        <div className="card-body">
          <div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
