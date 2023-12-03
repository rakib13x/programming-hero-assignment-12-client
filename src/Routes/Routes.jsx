import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import BookAParcel from "../pages/Dashboard/Users/BookAParcel/BookAParcel";
import MyParcels from "../pages/Dashboard/Users/MyParcels/MyParcels";
import MyProfile from "../pages/Dashboard/Users/MyProfile/MyProfile";
import MyDeliveryList from "../pages/Dashboard/DeliveryMen/MyDeliveryList/MyDeliveryList";
import MyReviews from "../pages/Dashboard/DeliveryMen/MyReviews/MyReviews";
import AllParcels from "../pages/Dashboard/Admin/AllParcels/AllParcels";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen/AllDeliveryMen";
import Statistics from "../pages/Dashboard/Admin/Statistics/Statistics";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import GiveReview from "../pages/Dashboard/Users/GiveReview/GiveReview";
import ProductDeliveryReview from "../pages/Dashboard/DeliveryMen/ProductDeliveryReview/ProductDeliveryReview";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ErrorPage from "../pages/Error/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      //normal user routes

      {
        path: "review/:id",
        element: <GiveReview />,
      },
      {
        path: "book-a-parcel",
        element: <BookAParcel />,
      },
      {
        path: "myParcels",
        element: <MyParcels />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
      },
      //deliveryman routes
      {
        path: "my-delivery-list",
        element: <MyDeliveryList />,
      },
      {
        path: "my-delivery-list/:id",
        element: <ProductDeliveryReview />,
      },

      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      //admin routes
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "all-parcels",
        element: <AllParcels />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-delivery-men",
        element: (
          <AdminRoute>
            <AllDeliveryMen />
          </AdminRoute>
        ),
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ],
  },
]);
