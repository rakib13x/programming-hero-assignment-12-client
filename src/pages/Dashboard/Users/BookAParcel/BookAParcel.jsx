import { useForm } from "react-hook-form";

import { FaUtensils } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const BookAParcel = () => {
  const [weightPrice, setWeightPrice] = useState(70);
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    //image upload to imgbb and then get an url
    // const imageFile = { image: data.image[0] };
    // const res = await axiosPublic.post(image_hosting_api, imageFile, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    if (res.data.success) {
      //now send the menu item data to the server with the image url
      const menuItem = {
        // name: data.name,
        // category: data.category,
        // price: parseFloat(data.price),
        // recipe: data.recipe,
        // image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        reset();
        //show success popup
        Swal.fire({
          title: `${data.name} Added`,
          text: `You have added ${data.name}  to the menu`,
          icon: "success",
        });
      }
    }
    console.log(res.data);
  };

  return (
    <div>
      <h2 className="text-4xl "> Add Items</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
            {/* Price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="number"
                placeholder="phone number"
                {...register("phone", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
            {/* Price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Parcel type</span>
              </label>
              <input
                type="text"
                placeholder="parcel"
                {...register("type", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Parcel Weight</span>
              </label>
              <input
                type="number"
                placeholder="parcel weight"
                {...register("weight", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
            {/* Price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Receiver's name</span>
              </label>
              <input
                type="text"
                placeholder="receiver's name"
                {...register("receiver", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Receiver's Phone Number</span>
              </label>
              <input
                type="number"
                placeholder="receiver's phone"
                {...register("phone2", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
            {/* Price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Parcel delivery Address</span>
              </label>
              <input
                type="text"
                placeholder="delivery address"
                {...register("delivery", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Delivery date</span>
              </label>
              <input
                type="date"
                placeholder="delivery date"
                {...register("date", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
            {/* Price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Delivery Address Latitude</span>
              </label>
              <input
                type="number"
                placeholder="latitude"
                {...register("latitude", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Delivery Address longitude</span>
              </label>
              <input
                type="number"
                placeholder="longitude"
                {...register("longitude", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            {/* Price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          {/* recipe details */}

          {/* <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div> */}
          <button className="btn">Book Your Parcel</button>
        </form>
      </div>
    </div>
  );
};

export default BookAParcel;
