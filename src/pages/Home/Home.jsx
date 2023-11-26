import { Helmet } from "react-helmet-async";
import Hero from "../Hero/Hero";
import FastDelivery from "../FastDelivery/FastDelivery";
import Service from "./../Service/Service";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Shiply | Home</title>
      </Helmet>
      <Hero />
      <FastDelivery />
      <Service />
    </div>
  );
};

export default Home;
