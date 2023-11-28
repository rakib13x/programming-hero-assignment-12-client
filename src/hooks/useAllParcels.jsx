import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
const useAllParcels = () => {
  //tan stack query
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { refetch, data: allParcels = [] } = useQuery({
    queryKey: ["allParcels"],
    queryFn: async () => {
      const res = await useAxiosPublic.get(`/bookings`);
      console.log(res.data);
      return res.data;
    },
  });
  return [allParcels, refetch];
};

export default useAllParcels;
