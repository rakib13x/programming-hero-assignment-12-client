import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import Chart from "react-apexcharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orderStatusCount, setOrderStatusCount] = useState([]);

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      console.log(res.data);

      return res.data;
    },
  });

  useEffect(() => {
    // Calculate order status count
    const count = bookings.reduce((acc, booking) => {
      acc[booking.orderStatus] = (acc[booking.orderStatus] || 0) + 1;
      return acc;
    }, {});
    console.log(count);
    setOrderStatusCount(count);
  }, [bookings]);

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "orders",
      data: [1, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  useEffect(() => {
    const dateCounts = {};

    bookings.forEach((booking) => {
      const date = new Date(booking.bookingDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      if (dateCounts[formattedDate]) {
        dateCounts[formattedDate]++;
      } else {
        dateCounts[formattedDate] = 1;
      }
    });

    const uniqueDates = Object.keys(dateCounts).sort();

    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        categories: uniqueDates,
      },
    }));

    const seriesData = Object.values(dateCounts);

    setSeries([
      {
        name: "bookings",
        data: seriesData,
      },
    ]);
  }, [bookings]);
  const totalDataCount = bookings.length;
  const deliveredCount = orderStatusCount["delivered"] || 0;
  const seriesData = [
    {
      name: "totalBookings",
      data: [totalDataCount],
    },
    {
      name: "delivered",
      data: [deliveredCount],
    },
  ];

  const optionsData = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Booking Statistics",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ["Total Data", "Delivered"],
      title: {
        text: "Order Status",
      },
    },
    yaxis: {
      title: {
        text: "Count",
      },
      min: 0, // Adjust min based on your data
      max: Math.max(totalDataCount, deliveredCount) + 5, // Adjust max based on your data
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -1,
    },
  };

  return (
    <div>
      <Helmet>
        <title>Shiply | Admin Home</title>
      </Helmet>
      <h2 className="text-4xl font-bold">
        <span>Hi, welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>
      <div className="">
        <div className="">
          <h1 className="pt-4 pl-5 font-semibold">Booking by date</h1>
          <div className="lg:flex lg:flex-row gap-10">
            <Chart options={options} series={series} type="bar" width="500" />
            {/* <Chart options={options} series={series} type="line" width="500" /> */}
            <Chart
              series={seriesData}
              options={optionsData}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
