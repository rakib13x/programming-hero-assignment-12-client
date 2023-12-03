import { FaTrashAlt, FaUsers } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data);
      return res.data;
    },
  });

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `${user.name} is an admin now`,
          text: `You have made him admin now`,
          icon: "success",
        });
      }
    });
  };

  const handleMakeDeliveryMan = (user) => {
    axiosSecure.patch(`/users/deliveryman/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `${user.name} is an deliveryman now`,
          text: `You have made him deliveryman now`,
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users:{users.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role}
                    {user.role === "admin" ? (
                      <>
                        <button
                          onClick={() => handleMakeDeliveryMan(user)}
                          className="btn  btn-lg bg-orange-500 text-white"
                        >
                          Make deliveryman
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn  btn-lg bg-orange-500 text-white"
                        >
                          Make Admin
                        </button>
                      </>
                    )}
                    {user.role === "user" && (
                      <>
                        <button
                          onClick={() => handleMakeDeliveryMan(user)}
                          className="btn  btn-lg bg-orange-500 text-white"
                        >
                          Make deliveryman
                        </button>
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn  btn-lg bg-orange-500 text-white"
                        >
                          Make Admin
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrashAlt className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
