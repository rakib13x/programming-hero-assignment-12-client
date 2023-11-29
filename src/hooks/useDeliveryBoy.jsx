import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useDeliveryBoy = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryman = [], refetch } = useQuery({
    queryKey: ["deliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      const deliverymen = res.data.filter(
        (user) => user.role === "deliveryman"
      );
      console.log(deliverymen);
      return res.data;
    },
  });
  return [deliveryman];
};

export default useDeliveryBoy;
