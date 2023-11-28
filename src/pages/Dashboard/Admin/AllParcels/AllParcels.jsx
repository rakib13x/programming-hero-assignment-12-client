import useAllParcels from "../../../../hooks/useAllParcels";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery, QueryCache } from "@tanstack/react-query";

import useDeliveryBoy from "../../../../hooks/useDeliveryBoy";
import { useState } from "react";
import Swal from "sweetalert2";

const AllParcels = () => {
  console.log("Component rendered");
  const [bookings, setBookings] = useState([]);
  const [selectedDeliveryManID, setSelectedDeliveryManID] = useState(null); // Set an initial value or null
  const axiosSecure = useAxiosSecure();
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
    onSuccess: (data) => {
      console.log("Data after successful fetch:", data);
      // Manually update the cache
      QueryCache.setQueryData(["bookings"], data);
    },
  });

  console.log("Query status:", status);
  const [deliveryman] = useDeliveryBoy();
  const deliverymen = deliveryman.filter((user) => user.role === "deliveryman");

  const handleOnTheWay = (item) => {
    const deliveryMenID = selectedDeliveryManID || null;

    axiosSecure
      .patch(`/bookings/${item._id}`, { deliveryMenID })
      .then((res) => {
        console.log("Patch Response:", res.data);

        document.getElementById("my_modal_1").close();

        // Check if the status indicates success (status code 200)
        if (res.status === 200 && res.data.success) {
          console.log("Booking updated successfully");

          // Update the state with the new deliveryMenID using functional update
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking._id === item._id
                ? {
                    ...booking,
                    status: "on the way",
                    deliveryMenID: selectedDeliveryManID,
                  }
                : booking
            )
          );

          Swal.fire({
            title: `${item.name} is on the way`,
            text: `You have assigned a deliveryman`,
            icon: "success",
          });
        } else {
          console.log("Booking not found or not updated");
          Swal.fire({
            title: "Error",
            text: "Booking not found or not updated",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error in PATCH request:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while updating the booking",
          icon: "error",
        });
      });
  };

  console.log(selectedDeliveryManID);
  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>phone</th>
              <th>Booking Date</th>
              <th>deliveryDate</th>
              <th>cost</th>
              <th>status</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{new Date(item.bookingDate).toLocaleDateString()}</td>
                <td>{item.date}</td>
                <td>{item.price}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_${item._id}`)
                        .showModal()
                    }
                  >
                    manage
                  </button>
                  <dialog id={`my_modal_${item._id}`} className="modal">
                    <div className="modal-box">
                      <div className="modal-action">
                        <form method="dialog gap-8">
                          <div className="form-control w-full  flex justify-center items-center mr-[180px] space-y-3">
                            <button
                              className="btn btn-outline mr-[190px]"
                              type="button"
                              onClick={() =>
                                handleOnTheWay(item, selectedDeliveryManID)
                              }
                            >
                              on the way
                            </button>
                            <label className="label">
                              <span className="label-text mr-[170px]">
                                Pick the deliveryman:
                              </span>
                            </label>

                            <select
                              className="select select-bordered"
                              onChange={(e) =>
                                setSelectedDeliveryManID(e.target.value)
                              }
                            >
                              {deliveryman.map((man) => (
                                <option key={man._id} value={man._id}>
                                  {man.name}:{man._id}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mt-6 flex ml-[60px]">
                            <button
                              className="btn ml-[160px]"
                              type="button"
                              onClick={() =>
                                handleOnTheWay(item, selectedDeliveryManID)
                              }
                            >
                              assign
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>

                {/* <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg"
                  ></button>
                </th> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcels;
