import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const CountNumber = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/stats");
      console.log(res.data);
      return res.data;
    },
  });

  const status = [
    { name: "registered Users", stat: stats.users },
    { name: "total Booking", stat: stats.booked },
    { name: "Parcel Delivered", stat: stats.delivered[0].totalDelivered },
  ];
  return (
    <div className="pb-8 pt-8">
      <h3 className="  leading-6 text-gray-900 text-4xl font-bold text-center">
        Stats
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {status.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              <CountUp start={0} end={item.stat} duration={300} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default CountNumber;
