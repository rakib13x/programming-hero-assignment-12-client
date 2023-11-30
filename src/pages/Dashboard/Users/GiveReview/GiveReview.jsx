import { useParams } from "react-router-dom";
import useBooking from "../../../../hooks/useBooking";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const GiveReview = () => {
  const { register, handleSubmit, reset } = useForm();
  const [booking, refetch] = useBooking();
  const axiosPublic = useAxiosPublic();
  console.log(booking);
  const { user } = useAuth();

  const { id } = useParams();
  console.log(id);

  // Filter the array based on the id
  const selectedBooking = booking.find((item) => item._id === id);

  const deliveryMenID = selectedBooking?.deliveryMenID || "";

  console.log(deliveryMenID);

  const onSubmit = async (data) => {
    console.log(data);

    const giveReview = {
      name: data.name,
      image: data.image,
      rating: parseFloat(data.rating),
      feedback: data.feedback,
      deliverymanId: data.deliverymanId,
      productId: data.productId,
    };
    console.log(giveReview);

    const reviewRes = await axiosPublic.post("/reviews", giveReview);
    console.log(reviewRes.data);
    if (reviewRes.data.insertedId) {
      reset();
      //show success popup
      Swal.fire({
        title: `${data.name} Added`,
        text: `You have added ${data.name}  to the menu`,
        icon: "success",
      });
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-4xl "> Add a review</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-6">
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  defaultValue={user?.displayName}
                  readOnly
                  {...register("name", { required: true })}
                  className="input input-bordered w-full "
                />
              </div>

              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="text"
                  placeholder="image"
                  defaultValue={user?.photoURL}
                  readOnly
                  {...register("image", { required: true })}
                  className="input input-bordered w-full "
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <input
                  type="number"
                  placeholder="rating"
                  {...register("rating", { required: true })}
                  className="input input-bordered w-full "
                />
              </div>
              {/* Price */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Feedback</span>
                </label>
                <input
                  type="text"
                  placeholder="feedback"
                  {...register("feedback", { required: true })}
                  className="input input-bordered w-full "
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="form-control w-1/2 my-6">
                <label className="label">
                  <span className="label-text">delivery man</span>
                </label>
                <input
                  type="text"
                  placeholder="deliverymanId"
                  {...register("deliverymanId", { required: true })}
                  defaultValue={deliveryMenID}
                  readOnly
                  className="input input-bordered w-full "
                />
              </div>
              <div className="form-control w-1/2 my-6">
                <label className="label">
                  <span className="label-text">Product Id</span>
                </label>
                <input
                  type="text"
                  placeholder="productId"
                  {...register("productId", { required: true })}
                  defaultValue={id}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <button className="btn">Book Your Parcel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiveReview;
