import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import useAuth from "./useAuth";
const useBooking = () => {
  //tan stack query
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: booking = [] } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return [booking, refetch];
};

export default useBooking;
