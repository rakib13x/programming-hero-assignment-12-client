import useAllParcels from "../../../../hooks/useAllParcels";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      console.log(res.data);
      return res.data;
    },
  });

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
                <td></td>

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
