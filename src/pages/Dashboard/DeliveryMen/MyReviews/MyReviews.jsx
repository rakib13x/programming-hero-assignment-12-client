import { useQuery } from "@tanstack/react-query";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  console.log(user.email);
  const axiosPublic = useAxiosPublic();
  const {
    data: reviews = [],
    refetch,
    status,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      console.log(res.data);
      return res.data;
    },
  });
  const { data: deliverymen = [] } = useQuery({
    queryKey: ["deliverymen"],
    queryFn: async () => {
      const res = await axiosPublic.get("/deliverymen");
      console.log(res.data);
      return res.data;
    },
  });
  const filteredReviews = reviews.filter((review) =>
    deliverymen.some((deliveryman) => deliveryman._id === review.deliverymanId)
  );

  console.log(filteredReviews);

  return (
    <>
      {filteredReviews.map((review) => (
        <div className="mb-8" key={review._id}>
          <figure class="max-w-screen-md">
            <div class="flex items-center mb-4 text-yellow-300">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
            </div>
            <blockquote>
              <p class="text-2xl font-semibold text-gray-900 ">
                {review.feedback}
              </p>
            </blockquote>
            <figcaption class="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
              <img
                class="w-6 h-6 rounded-full"
                src={review.image}
                alt="profile picture"
              />
              <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                <cite class="pe-3 font-medium text-gray-900 ">
                  {review.name}
                </cite>
                <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">
                  user of shiply
                </cite>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </>
  );
};

export default MyReviews;
