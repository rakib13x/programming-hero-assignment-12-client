import useAllParcels from "../../../../hooks/useAllParcels";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery, QueryCache } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import useDeliveryBoy from "../../../../hooks/useDeliveryBoy";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllParcels = () => {
  console.log("Component rendered");
  const [selectedDeliveryManName, setSelectedDeliveryManName] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedDeliveryManID, setSelectedDeliveryManID] = useState(null);
  const [selectedDeliveryManMail, setSelectedDeliveryManMail] = useState(null);
  const [selectedApproxDate, setSelectedApproxDate] = useState(null);

  const axiosSecure = useAxiosSecure();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleApproxDateChange = (e) => {
    setSelectedApproxDate(e.target.value);
  };

  const {
    data: parcels = [],
    refetch,
    status,
  } = useQuery({
    queryKey: ["parcels", fromDate, toDate],
    queryFn: async () => {
      const isoFromDate = fromDate
        ? new Date(`${fromDate}T00:00:00.000Z`).toISOString()
        : null;
      const isoToDate = toDate
        ? new Date(`${toDate}T23:59:59.999Z`).toISOString()
        : null;

      console.log("Query parameters:", isoFromDate, isoToDate);

      if (!isoFromDate || !isoToDate) {
        console.error("Invalid fromDate or toDate");
        return [];
      }

      const res = await axiosSecure.get(
        `/bookings?fromDate=${isoFromDate}&toDate=${isoToDate}`
      );
      console.log("Response from backend:", res.data);
      return res.data;
    },
    // Remove enabled property to fetch data on component mount
  });
  console.log(parcels);

  useEffect(() => {
    // Log data when it is available
    console.log("Parcels data:", parcels);
  }, [parcels]);
  const [deliveryman] = useDeliveryBoy();
  const deliverymen = deliveryman.filter((user) => user.role === "deliveryman");

  const handleOnTheWay = (item) => {
    const deliveryMenID = selectedDeliveryManID || null;
    const deliveryMenMail = selectedDeliveryManName;
    const approxDate = selectedApproxDate;

    axiosSecure
      .patch(`/bookings/${item._id}`, {
        deliveryMenID,
        deliveryMenMail,
        approxDate,
      })
      .then((res) => {
        console.log("Patch Response:", res.data);
        document.getElementById(`my_modal_${item._id}`).close();
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
                    deliveryMenMail: selectedDeliveryManName,
                    approxDate,
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
  console.log(selectedDeliveryManMail);
  console.log(selectedApproxDate);
  return (
    <div>
      <div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">from:</span>
              </label>
              <input
                type="date"
                placeholder="Price"
                // {...register("price", { required: true })}
                // value={totalPrice}
                value={fromDate}
                onChange={handleFromDateChange}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">to:</span>
              </label>
              <input
                type="date"
                placeholder="Price"
                // {...register("price", { required: true })}
                // value={totalPrice}
                value={toDate}
                onChange={handleToDateChange}
                className="input input-bordered w-full "
              />
            </div>
          </div>
        </form>
      </div>
      <h1 className="text-center text-3xl font-semibold py-4">All Parcels</h1>
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
                              onChange={(e) => {
                                setSelectedDeliveryManID(e.target.value);
                                const selectedDeliveryMan = deliverymen.find(
                                  (man) => man._id === e.target.value
                                );
                                // Assuming you have a state variable like selectedDeliveryManName
                                setSelectedDeliveryManName(
                                  selectedDeliveryMan
                                    ? selectedDeliveryMan.email
                                    : ""
                                );
                              }}
                            >
                              {deliverymen.map((man) => (
                                <option key={man._id} value={man._id}>
                                  {man.name}:{man._id}
                                </option>
                              ))}
                            </select>

                            {/* Add this input field for displaying the selected delivery man's name */}
                            <input
                              type="text"
                              value={selectedDeliveryManName}
                              readOnly
                              placeholder="Selected Delivery Man"
                              className="select select-bordered w-[310px]"
                            />
                            <input
                              type="date"
                              placeholder="pick a date"
                              className="select select-bordered w-[310px]"
                              value={selectedApproxDate}
                              onChange={handleApproxDateChange}
                            />
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
