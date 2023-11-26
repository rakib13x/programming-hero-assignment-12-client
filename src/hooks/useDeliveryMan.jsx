import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useDeliveryMan = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isDeliveryMan, isPending: isDeliveryManLoading } = useQuery({
    queryKey: [user?.email, "isDeliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/deliveryman/${user.email}`);
      console.log(res.data);
      return res.data?.deliveryMan;
    },
  });
  return [isDeliveryMan, isDeliveryManLoading];
};

export default useDeliveryMan;
