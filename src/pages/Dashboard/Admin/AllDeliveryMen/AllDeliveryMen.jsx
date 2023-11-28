import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllDeliveryMen = () => {
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
  return <div>AllDeliveryMen</div>;
};

export default AllDeliveryMen;
