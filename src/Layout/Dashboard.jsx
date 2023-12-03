import React from "react";
import useAdmin from "../hooks/useAdmin";
import useDeliveryMan from "../hooks/useDeliveryMan";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isDeliveryMan] = useDeliveryMan();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-blue-400">
        <ul className="menu p-4">
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-parcels">All Parcels</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-delivery-men">
                  All Delivery Men
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/statistics">Statistics</NavLink>
              </li>
            </>
          )}
          {isDeliveryMan && (
            <>
              <li>
                <NavLink to="/dashboard/my-delivery-list">
                  My delivery list
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-reviews">My Reviews</NavLink>
              </li>
            </>
          )}
          {!isAdmin && !isDeliveryMan && (
            <>
              <li>
                <NavLink to="/dashboard/book-a-parcel">Book a Parcel</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myParcels">My Parcels</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myProfile">My Profiles</NavLink>
              </li>
            </>
          )}
          <div className="divider">OR</div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
