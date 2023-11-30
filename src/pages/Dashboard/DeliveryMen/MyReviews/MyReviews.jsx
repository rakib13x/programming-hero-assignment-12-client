import { useQuery } from "@tanstack/react-query";

const MyReviews = () => {
  const {
    data: parcels = [],
    refetch,
    status,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      console.log(res.data);
      return res.data;
    },
  });
  return <div>MyReviews</div>;
};

export default MyReviews;
