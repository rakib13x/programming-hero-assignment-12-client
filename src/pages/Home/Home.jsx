import { Helmet } from "react-helmet-async";
import Hero from "../Hero/Hero";
import FastDelivery from "../FastDelivery/FastDelivery";
import Service from "./../Service/Service";
import ParcelBooking from "./ParcelBooking";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Shiply | Home</title>
      </Helmet>
      <Hero />
      <FastDelivery />
      <Service />
      {/* <ParcelBooking /> */}
    </div>
  );
};

export default Home;
