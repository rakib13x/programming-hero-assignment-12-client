import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: "https://shiply-6qqtoap8j-rakib13x-gmailcom.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  //request interceptor to add authorization header for every secure call to the
  //api
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("request stopped by interceptors", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      //Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  
  return axiosSecure;
};

export default useAxiosSecure;
