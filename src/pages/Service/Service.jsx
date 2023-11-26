import React from "react";
import Lottie from "lottie-react";
import onTimeDelivery from "../../assets/onTimeDelivery.json";
import pickUp from "../../assets/pickUp.json";
import trackParcel from "../../assets/trackParcel.json";

const Service = () => {
  return (
    <div>
      <div className="bg-white ">
        <div className="px-5 mb-6 text-5xl sm:text-4xl">
          <div>
            <div className="bg-slate-800 text-white px-20 text-center py-20">
              <p>Try Us And See How Good Our Services Are.</p>
              <div className="pt-6">
                <button className="btn btn-secondary">Learn More</button>
              </div>
            </div>
          </div>
          <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[373px] lg:px-10 md:px-6 px-4 bg-white mx-auto">
            <div className="text-4xl font-semibold sm:text-3xl text-center text-gray-800"></div>
            <div className="lg:flex justify-center mt-8 gap-8">
              <div>
                <Lottie animationData={onTimeDelivery} loop={true} />

                <p className="text-2xl font-medium text-center leading-normal text-gray-800 md:mt-10 mt-4">
                  On Time Delivery
                </p>
                <p className="text-base leading-none text-center text-gray-600 mt-4">
                  we try our best for deliver our product on time.
                </p>
              </div>
              <div className="lg:mt-0 md:mt-8 mt-6">
                <Lottie animationData={pickUp} loop={true} />

                <p className="text-2xl font-medium text-center leading-normal text-gray-800 lg:mt-10 md:mt-6 mt-4">
                  Safely delivery
                </p>
                <p className="text-base leading-none text-center text-gray-600 mt-4">
                  we try to deliver product safely.
                </p>
              </div>
              <div className="lg:mt-0 md:mt-8 mt-6">
                <Lottie animationData={trackParcel} loop={true} />
                <p className="text-2xl font-medium text-center leading-normal text-gray-800 lg:mt-10 md:mt-6 mt-4">
                  Pick up point
                </p>
                <p className="text-base leading-none text-center text-gray-600 mt-4">
                  Therapeutic Essential Oil
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
