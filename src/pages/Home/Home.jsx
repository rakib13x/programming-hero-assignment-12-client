import { Helmet } from "react-helmet-async";
import Hero from "../Hero/Hero";
import FastDelivery from "../FastDelivery/FastDelivery";
import Service from "./../Service/Service";
import ParcelBooking from "./ParcelBooking";
import CountNumber from "../../components/CountNumber/CountNumber";
import TopDeliveryMan from "../TopDeliveryMan/TopDeliveryMan";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Shiply | Home</title>
      </Helmet>
      <Hero />
      <FastDelivery />
      <Service />
      <CountNumber />
      <TopDeliveryMan />
      {/* <ParcelBooking /> */}
    </div>
  );
};

export default Home;
