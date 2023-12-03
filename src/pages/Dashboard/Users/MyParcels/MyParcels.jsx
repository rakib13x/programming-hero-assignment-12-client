import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useBooking from "../../../../hooks/useBooking";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const [booking, refetch] = useBooking();
  const [filter, setFilter] = useState("All");
  const [filteredBooking, setFilteredBooking] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    console.log("item deleted", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/booking/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const applyFilter = (data, selectedFilter) => {
    if (!Array.isArray(data)) {
      return [];
    }

    if (selectedFilter === "All") {
      return data;
    } else {
      return data.filter(
        (item) =>
          item.status &&
          item.status.toLowerCase() === selectedFilter.toLowerCase()
      );
    }
  };

  const handleChangeFilter = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
  };

  useEffect(() => {
    setFilter("All");
    // Set default filter value
    const fetchData = async () => {
      try {
        const bookingData = await refetch();
        setFilteredBooking(applyFilter(bookingData, "All"));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  useEffect(() => {
    if (booking) {
      const updatedFilteredBooking = applyFilter(booking, filter);
      setFilteredBooking(updatedFilteredBooking);
      // Calculate total price
      const total = updatedFilteredBooking.reduce(
        (acc, item) => acc + parseFloat(item.price),
        0
      );
      setTotalPrice(total);
    }
  }, [booking, filter]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
            title: "Are you sure u want cancel this order?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Cancelled!",
                text: "Your order has been Cancelled.",
                icon: "success",
              });
            }
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
  console.log(booking);
  return (
    <div>
      <div className="flex justify-evenly mb-[32px]">
        <h2 className="text-4xl">
          Items: {filteredBooking.length || booking.length}
        </h2>
        <h2 className="text-4xl">
          Total Price: {Number(totalPrice).toFixed(2)}
        </h2>
        {filteredBooking.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="">
          <div className="divider divider-end text-end flex justify-end pt-8">
            <div className="pb-8">
              <select
                className="select select-bordered w-[160px]"
                value={filter}
                onChange={handleChangeFilter}
              >
                <option disabled selected>
                  filter by status
                </option>
                <option>All</option>
                <option>pending</option>
                <option>on the way</option>
                <option>delivered</option>
                <option>cancelled</option>
              </select>
            </div>
          </div>
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
              <th>Status</th>
              <th>Update</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooking.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600" />
                  </button>
                </th>
                <td>
                  {item.status === "delivered" ? (
                    <>
                      <Link to={`/dashboard/review/${item._id}`}>
                        <button className="btn btn-secondary">review</button>
                      </Link>
                    </>
                  ) : (
                    <>{item.status}</>
                  )}
                </td>
                <td>
                  {item.status === "pending" ? (
                    <button
                      className="btn"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Update
                    </button>
                  ) : (
                    <button className="btn" disabled>
                      Update
                    </button>
                  )}
                </td>
                <td>
                  {item.status === "pending" ? (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
