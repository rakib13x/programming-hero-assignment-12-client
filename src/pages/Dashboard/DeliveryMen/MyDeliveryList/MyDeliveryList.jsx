import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: allBookings, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bookings");
      return res.data;
    },
  });

  // Check if allBookings is defined before filtering
  const userBookings = allBookings
    ? allBookings.filter((booking) => booking.deliveryMenMail === user.email)
    : [];
  console.log(userBookings);

  const handleCancel = (_id) => {
    axiosSecure
      .put(`/bookings/cancel/${_id}`)
      .then((res) => {
        console.log("Put Response:", res.data);
        if (res.status === 200 && res.data.success) {
          console.log("Booking updated successfully");
          refetch(); // Ensure this is working
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking._id === _id
                ? {
                    ...booking,
                    status: "cancelled",
                  }
                : booking
            )
          );

          Swal.fire({
            title: `Order Cancelled`,
            text: `You have cancelled this order`,
            icon: "error",
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
        console.error("Error in PUT request:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while updating the booking",
          icon: "error",
        });
      });
  };

  const handleDeliver = (_id) => {
    axiosSecure
      .put(`/bookings/deliver/${_id}`)
      .then((res) => {
        console.log("Put Response:", res.data);
        if (res.status === 200 && res.data.success) {
          console.log("Booking updated successfully");
          refetch(); // Ensure this is working
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking._id === _id
                ? {
                    ...booking,
                    status: "delivered",
                  }
                : booking
            )
          );

          Swal.fire({
            title: `Order Delivered`,
            text: `You have delivered this order`,
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
        console.error("Error in PUT request:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while updating the booking",
          icon: "error",
        });
      });
  };

  return (
    <div>
      <div>
        <div className="flex justify-evenly my-4">
          <h2 className="text-3xl">All Users</h2>
          <h2 className="text-3xl">Total Users:{userBookings.length}</h2>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Booked User Name</th>
                  <th>Receivers Name</th>
                  <th>Booked User’s Phone</th>
                  <th>Requested Delivery Date</th>
                  <th>Approximate Delivery Date</th>
                  <th>Recievers phone number</th>
                  <th>Receivers Address</th>
                  <th>cancel</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {userBookings.map((user, index) => (
                  <tr key={user._id}>
                    <th></th>
                    <td>{user.name}</td>
                    <td>{user.receiver}</td>
                    <td>{user.phone}</td>
                    <td>{user.date}</td>
                    <td>faka</td>
                    <td>{user.phone2}</td>
                    <td>
                      {user.latitude}
                      <br />
                      {user.longitude}
                    </td>

                    <td>
                      {user.status === "on the way" ? (
                        <button
                          className="btn"
                          onClick={() => handleCancel(item._id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button className="btn" disabled>
                          Cancelled
                        </button>
                      )}
                    </td>
                    <td>
                      {user.status === "delivered" ? (
                        <button className="btn btn-secondary">Review</button>
                      ) : (
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleDeliver(user._id)}
                        >
                          {user.status ? user.status : "deliver"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDeliveryList;
