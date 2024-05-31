"use client";

import { useGetAllDonorsQuery } from "@/redux/api/features/bloodDonationApi";
import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Search from "@/app/(withCommonLayout)/donor-list/components/FilterAndSearch/Search";
import Filter from "@/app/(withCommonLayout)/donor-list/components/FilterAndSearch/Filter";
import { location as locationData } from "@/app/constants/location";
import Skeleton from "@/components/UI/DonorDetailsCard/Skeleton";
import DonorDetailsCard from "@/components/UI/DonorDetailsCard/DonorDetailsCard";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DonorList = ({ cardLimit }: { cardLimit: number }) => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [availability, setAvailability] = useState("");
  const [location, setLocation] = useState("");
  const [division, setDivision] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(cardLimit || 10);
  const [loading, setLoading] = useState(false);

  const query: any = { page, limit };
  if (searchTerm) query["searchTerm"] = searchTerm;
  if (availability) query["availability"] = availability;
  if (location) query["location"] = location;
  if (division) query["division"] = division;
  if (bloodType) query["bloodType"] = bloodType;
  if (sortBy) query["sortBy"] = sortBy;
  if (sortOrder) query["sortOrder"] = sortOrder;

  const { data, isLoading, isFetching } = useGetAllDonorsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isLoading || isFetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, isFetching]);

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handleFilterChange = (filters: any) => {
    setAvailability(filters.availability || "");
    setLocation(filters.location || "");
    setDivision(filters.division || "");
    setBloodType(filters.bloodType || "");
    setSortBy(filters.sortBy || "");
    setSortOrder(filters.sortOrder || "");
  };

  const handleSearchChange = (term: any) => {
    setSearchTerm(term);
  };

  return (
    <div className="bg-neutral">
      <div className="text-center text-gray-300 px-6 py-7 lg:px-8">
        <h3 className="text-4xl font-bold">Search Blood Donors</h3>
        <p className="pt-4 max-w-md mx-auto">
          Search for donors by type, location, and availability. Connecting
          those in need with life-saving blood donations.
        </p>
      </div>
      <Container>
        <Search onSearchChange={handleSearchChange} setLoading={setLoading} />
        <Filter
          onFilterChange={handleFilterChange}
          locationData={locationData}
        />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1 py-4">
            {[...Array(limit)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-start py-8 gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
              {data?.donors?.map((donor) => (
                <DonorDetailsCard key={donor.id} donor={donor} />
              ))}
            </div>
          </div>
        )}
        {!isLoading && data && pathname === "/donor-list" && (
          <div className="flex justify-center items-center py-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 text-white">
              Page {page} of {Math.ceil(data?.meta?.total / limit)}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page * limit >= data?.meta?.total}
              className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Container>
      <div className="mx-auto w-32">
        <Link
          className={`btn btn-outline btn-accent flex justify-center items-center ${
            pathname === "/" ? "block" : "hidden"
          }`}
          href="/donor-list"
        >
          See More Donors
        </Link>
      </div>
    </div>
  );
};

export default DonorList;
