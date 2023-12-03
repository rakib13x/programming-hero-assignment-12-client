import { useForm } from "react-hook-form";

import { FaUtensils } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import CustomMap from "../../../../components/CustomMap/CustomMap";
import { AuthContext } from "../../../../providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const BookAParcel = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [pricePerKg, setPricePerKg] = useState(70);
  const [weight, setWeight] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
  });

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      latitude: location.lat.toFixed(6),
      longitude: location.lng.toFixed(6),
    });
  };

  const handleWeightChange = (event) => {
    const newWeight = event.target.value;
    setWeight(newWeight);

    // Calculate total price based on price per kg and weight
    const newTotalPrice = newWeight * pricePerKg;
    setTotalPrice(newTotalPrice);
  };
  const onSubmit = async (data) => {
    console.log(data);

    const bookingDate = new Date();
    const deliveryMenID = "";
    const approxDate = "";
    // const res = await axiosPublic.post({
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    // if (res.data.success) {
    //now send the menu item data to the server with the image url
    const bookingItem = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      weight: data.weight,
      receiver: data.receiver,
      phone2: data.phone2,
      delivery: data.delivery,
      date: data.date,
      latitude: data.latitude,
      longitude: data.longitude,
      price: parseFloat(data.price),
      status: "pending",
      bookingDate: bookingDate,
      deliveryMenID: deliveryMenID,
      approxDate: data.approxDate,
    };
    console.log(bookingItem);

    const bookingRes = await axiosSecure.post("/bookings", bookingItem);
    console.log(bookingRes.data);
    if (bookingRes.data.insertedId) {
      reset();
      //show success popup
      Swal.fire({
        title: `Thank You`,
        text: `You have booked a parcel`,
        icon: "success",
      });
    }
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
                defaultValue={user?.displayName}
                readOnly
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
                defaultValue={user?.email}
                readOnly
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
                // value={quantity}
                // onChange={handleQuantityChange}
                {...register("weight", { required: true })}
                onChange={handleWeightChange}
                value={weight}
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
                value={formData.latitude}
                readOnly
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
                value={formData.longitude}
                readOnly
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
                value={totalPrice}
                readOnly
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
          <div className="flex gap-8 items-center justify-center">
            <div>
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Select Your location
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">
                    Press ESC key or click the button below to close
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      <CustomMap onLocationSelect={handleLocationSelect} />
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
          <div className="flex justify-center pt-8">
            <button className="btn">Book Your Parcel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAParcel;
