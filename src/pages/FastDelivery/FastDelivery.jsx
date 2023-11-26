import Lottie from "lottie-react";
import fastDelivery from "../../assets/fastDelivery.json";
import { IoCall } from "react-icons/io5";
const FastDelivery = () => {
  return (
    <div>
      <div className="overflow-hidden pt-12 pb-12">
        <div className="bg-white h-auto w-full px-4 py-6 md:py-0 sm:px-10 md:px-6 lg:px-10 xl:px-20 ">
          <div className="flex flex-col md:flex md:flex-row justify-center items-center">
            <div className="w-full md:w-1/2 order-1 md:order-none">
              <div className="md:w-96">
                <h1 className="font-extrabold text-4xl md:text-4xl lg:text-5xl md:leading-9 text-black mt-6 md:mt-0">
                  Do You Want A Fast Service? Just Call Us.
                </h1>

                <p className="text-sm md:text-base text-black md:leading-6 mt-4 md:mt-6 md:w-4/5 lg:w-auto">
                  We Provide door to door service at light speed.If you want a
                  fast service you can call us
                </p>
                <button
                  className="
         flex
          items-center
          border border-black
          text-2xl
          md:text-base
          hover:bg-gray-200
          font-extrabold
          
          text-black
          mt-6
          md:mt-8
          py-3
          px-9
          md:py-3
          md:px-11
          
        "
                >
                  Call Us
                  <span className="ml-2 mt-1">
                    <IoCall />
                  </span>
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pt-12 lg:pt-12">
              {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/hero_xxx_svg1.png" /> */}
              <Lottie animationData={fastDelivery} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastDelivery;
