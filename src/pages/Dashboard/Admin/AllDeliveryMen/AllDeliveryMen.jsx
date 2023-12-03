import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useDeliveryBoy from "../../../../hooks/useDeliveryBoy";

const AllDeliveryMen = () => {
  const [deliveryman] = useDeliveryBoy();
  const deliverymen = deliveryman.filter((user) => user.role === "deliveryman");

  console.log(deliverymen);
  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>_id</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {deliverymen.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item._id}</td>
                <td>{item.email}</td>
                <td>{item.price}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeliveryMen;
