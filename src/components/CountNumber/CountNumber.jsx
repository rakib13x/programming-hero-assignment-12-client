import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const CountNumber = () => {
  //   useEffect(() => {
  //     // Fetch the number of users from your backend
  //     fetch("http://localhost:3000/users")
  //       .then((response) => response.json())
  //       .then((data) => setUserCount(data.count))
  //       .catch((error) => console.error("Error fetching user count:", error));
  //   }, []);

  //   const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
  //   console.log(ACCESS_TOKEN);

  //   const axiosPublic = useAxiosPublic();
  //   const { data: bookings = [], refetch } = useQuery({
  //     queryKey: ["bookings"],
  //     queryFn: async () => {
  //       const res = await axiosPublic.get("/bookings");
  //       //   console.log(res.data);
  //       return res.data;
  //     },
  //   });

  //   const [userCount, setUserCount] = useState(0);

  //   useEffect(() => {
  //     // Fetch the number of users from your backend
  //     fetch("/users", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${ACCESS_TOKEN}`,
  //         // Replace with your actual token
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Assuming your API response structure has a property like 'totalUsers'
  //         console.log(data);
  //       })
  //       .catch((error) => console.error("Error fetching user count:", error));
  //   }, []);

  return (
    <div className="App">
      <h1>GEEKSFORGEEKS</h1>
      <div style={{ fontSize: "150px" }}>
        <CountUp start={0} end={10000} duration={10000} />
      </div>
    </div>
  );
};

export default CountNumber;
