import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import trackParcel from "/public/trackParcel.json";
import Lottie from "lottie-react";
import man from "../../assets/images/man.png";

const TopDeliveryMan = () => {
  const axiosPublic = useAxiosPublic();

  // Declare originalData at a higher scope
  let originalData;

  const {
    data: topMen = [],
    refetch,
    status,
  } = useQuery({
    queryKey: ["topMen"],
    queryFn: async () => {
      const res = await axiosPublic.get("/topdeliveryman");
      // Assign the data to originalData
      originalData = res.data;
      console.log(originalData);
      return originalData;
    },
  });

  const { data: topDeliverymen = { topDeliverymen: [] } } = useQuery({
    queryKey: ["topDeliverymen"],
    queryFn: async () => {
      const res = await axiosPublic.get("/topdeliverymen");
      console.log(res.data);
      return res.data;
    },
  });

  // Check if topDeliverymen is not undefined and has the topDeliverymen property
  if (!topDeliverymen || !topDeliverymen.topDeliverymen) {
    return <p>Loading...</p>;
  }

  // Convert topDeliverymen object into an array using Object.values
  const topDeliverymenArray = Object.values(topDeliverymen.topDeliverymen);

  const topDeliverymanIDs = topDeliverymenArray.map(
    (deliveryman) => deliveryman.deliverymanID
  );

  // console.log(topDeliverymanIDs);

  const filteredDeliverymen = topMen.filter((deliveryman) =>
    topDeliverymanIDs.includes(deliveryman._id)
  );

  console.log(filteredDeliverymen);

  // Use the originalData declared at a higher scope
  const filteredDeliverymenWithTotalDeliveries = filteredDeliverymen.map(
    (deliveryman) => {
      const matchedTotalDeliveries = topDeliverymenArray.find(
        (totalDelivery) => totalDelivery.deliverymanID === deliveryman._id
      );

      return {
        ...deliveryman,
        totalDeliveries: matchedTotalDeliveries
          ? matchedTotalDeliveries.totalDeliveries
          : 0,
      };
    }
  );

  // console.log(filteredDeliverymenWithTotalDeliveries);

  const sortedDeliverymen = filteredDeliverymenWithTotalDeliveries.sort(
    (a, b) => b.totalDeliveries - a.totalDeliveries
  );

  // console.log(sortedDeliverymen);

  return (
    <>
      <div>
        <div className="text-center text-black font-bold text-3xl">
          Our Top DeliveryMan
        </div>
        <p className="text-center font-semibold">choose our best man</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="mt-12 grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-y-12 lg:gap-x-8 lg:gap-y-8 md:gap-x-6 md:gap-y-10  justify-between">
          {sortedDeliverymen.map((man) => (
            <div
              key={man._id}
              className="grid  lg:grid-cols-3 ml-8  mt-6 gap-4"
            >
              <div className="lg:w-72 md:pr-8 pb-2">
                <img
                  src="https://i.ibb.co/PGkYkZZ/20-Stylish-Young-Man.png"
                  alt="table image"
                  className="w-full"
                />
                <p className="text-sm font-medium leading-none mt-3 text-gray-800 text-center">
                  {man.name}
                </p>
                <p className="text-sm font-medium leading-none mt-3 text-gray-800 text-center">
                  {man.email}
                </p>
                <p className="leading-3 text-gray-600 mt-2 text-center font-bold text-xl">
                  delivered: {man.totalDeliveries}
                </p>
              </div>

              <div className="lg:w-72 md:pr-8"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopDeliveryMan;
