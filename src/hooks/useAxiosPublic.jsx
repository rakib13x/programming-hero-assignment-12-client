import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://shiply-5e48jlgkx-rakib13x-gmailcom.vercel.app",
  // baseURL: "https://shiply-89cx2rksk-rakib13x-gmailcom.vercel.app",
  baseURL: "https://shiply-6qqtoap8j-rakib13x-gmailcom.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
