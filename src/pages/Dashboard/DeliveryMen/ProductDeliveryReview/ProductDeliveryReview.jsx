import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const ProductDeliveryReview = () => {
  const { id } = useParams();
  console.log("URL Params id:", id);
  const axiosPublic = useAxiosPublic();

  const {
    data: productReview = [],
    refetch,
    status,
  } = useQuery({
    queryKey: ["productReview"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      console.log(res.data);
      return res.data;
    },
  });
  console.log("All Product Reviews:", productReview);
  const stringId = id.toString();
  const filteredReviews = productReview.filter(
    (review) => review.productId === id
  );

  console.log("Filtered Reviews:", filteredReviews);
  return (
    <>
      {filteredReviews.length === 0 ? (
        <p className="text-gray-500 flex justify-center items-center text-4xl font-bold">
          User hasn't give u any reviews yet
        </p>
      ) : (
        filteredReviews.map((review) => (
          <div className="mb-8" key={review._id}>
            <figure className="max-w-screen-md">
              <div className="flex items-center mb-4 text-yellow-300">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
              </div>
              <blockquote>
                <p className="text-2xl font-semibold text-gray-900 ">
                  {review.feedback}
                </p>
              </blockquote>
              <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
                <img
                  className="w-6 h-6 rounded-full"
                  src={review.image}
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                  <cite className="pe-3 font-medium text-gray-900 ">
                    {review.name}
                  </cite>
                  <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                    user of shiply
                  </cite>
                </div>
              </figcaption>
            </figure>
          </div>
        ))
      )}
    </>
  );
};

export default ProductDeliveryReview;
