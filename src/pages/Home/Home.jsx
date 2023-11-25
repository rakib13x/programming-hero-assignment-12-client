import { Helmet } from "react-helmet-async";
import Hero from "../Hero/Hero";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Shiply | Home</title>
      </Helmet>
      <Hero />
    </div>
  );
};

export default Home;
