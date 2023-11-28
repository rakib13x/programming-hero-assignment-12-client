import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useDeliveryBoy from "../../../../hooks/useDeliveryBoy";

const AllDeliveryMen = () => {
  const [deliveryman] = useDeliveryBoy();
  return <div>AllDeliveryMen</div>;
};

export default AllDeliveryMen;
