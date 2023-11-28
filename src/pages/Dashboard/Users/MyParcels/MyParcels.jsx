import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useBooking from "../../../../hooks/useBooking";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
const MyParcels = () => {
  const [booking, refetch] = useBooking();
  const totalPrice = booking.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );
  console.log(totalPrice);
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
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
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
  return (
    <div>
      <div className="flex justify-evenly mb-[32px]">
        <h2 className="text-4xl">Items : {booking.length}</h2>
        <h2 className="text-4xl">
          Total Price : {Number(totalPrice).toFixed(2)}
        </h2>
        {booking.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>

      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((item, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
