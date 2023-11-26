import React from "react";
import useAdmin from "../hooks/useAdmin";
import useDeliveryMan from "../hooks/useDeliveryMan";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isDeliveryMan] = useDeliveryMan();
  return <div>Dashboard</div>;
};

export default Dashboard;
