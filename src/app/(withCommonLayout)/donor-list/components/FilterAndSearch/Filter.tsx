/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";

const Filter = ({ onFilterChange, locationData }: any) => {
  const [availability, setAvailability] = useState("");
  const [location, setLocation] = useState("");
  const [division, setDivision] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [divisions, setDivisions] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({
      availability,
      location,
      division,
      bloodType,
      sortBy,
      sortOrder,
    });
  }, [availability, location, division, bloodType, sortBy, sortOrder]);

  useEffect(() => {
    if (location) {
      setDivisions(locationData[location] || []);
      setDivision(""); // Reset division when location changes
    } else {
      setDivisions([]);
    }
  }, [location]);

  const handleReset = () => {
    setAvailability("");
    setLocation("");
    setDivision("");
    setBloodType("");
    setSortBy("");
    setSortOrder("");
  };

  return (
    <div className="card w-full bg-neutral border-gray-600 border-2 py-4 my-12 text-gray-200">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-gray-200">Filters !</h2>
        <div className="card-actions justify-end">
          <div className="flex justify-center items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onFilterChange({
                  availability,
                  location,
                  division,
                  bloodType,
                  sortBy,
                  sortOrder,
                });
              }}
              className="w-full mx-auto text-gray-600"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-3 px-1">
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Availability:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="availability"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                    >
                      <option value="">availability</option>
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Location:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">Location</option>
                      {Object.keys(locationData).map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Division:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="division"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      disabled={!location}
                    >
                      <option value="">Division</option>
                      {divisions.map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        BloodType:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="bloodType"
                      value={bloodType}
                      onChange={(e) => setBloodType(e.target.value)}
                    >
                      <option value="">Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Sort By:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="sortBy"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="">Select by</option>
                      <option value="name">Name</option>
                      <option value="age">Age</option>
                    </select>
                  </label>
                </div>

                <div
                  title="Select sort by first"
                  className="tooltip"
                  data-tip="Select sort by first"
                >
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Sort Order:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="sortOrder"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="">Select Order</option>
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm px-3 py-2 text-gray-200 bg-black rounded-md my-5 w-1/2 hover:bg-slate-800"
                >
                  Reset Filters
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
