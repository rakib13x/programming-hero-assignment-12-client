import { FaCamera } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { app } from "../../../../firebase/firebase.config";
import { getAuth, updateProfile } from "firebase/auth";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const MyProfile = () => {
  const { user, setUser } = useAuth();

  console.log(user);

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { updateUserProfile } = useContext(AuthContext);
  const onSubmit = async (data) => {
    console.log(data);
    //image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      //now send the menu item data to the server with the image url
      const image = {
        image: res.data.data.display_url,
      };
      console.log(image);
      //
      try {
        // Update the user's profile image in Firebase Authentication
        const auth = getAuth(app); // Assuming 'app' is your Firebase app instance

        await updateProfile(auth.currentUser, {
          photoURL: res.data.data.display_url,
        });

        // Update the local user state
        setUser({ ...user, photoURL: res.data.data.display_url });

        // Rest of your code (e.g., updating image URL in the backend)

        if (imageRes.data.insertedId) {
          reset();
          // Show success popup
          Swal.fire({
            title: `${data.name} Added`,
            text: `You have added ${data.name} to the menu`,
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    }
    console.log(res.data);
  };
  return (
    <div>
      <div class="w-full min-h-screen">
        <div class="max-w-screen-md px-10 py-6 mx-4 mt-20 bg-white rounded-lg shadow md:mx-auto border-1">
          <div class="flex flex-col items-start w-full m-auto sm:flex-row">
            <div class="flex mx-auto sm:mr-10 sm:m-0">
              <div class="items-center justify-center w-20 h-20 m-auto mr-4 sm:w-32 sm:h-32 relative">
                <img
                  alt="profile"
                  src={user?.photoURL}
                  class="object-cover w-20 h-20 mx-auto rounded-full sm:w-32 sm:h-32"
                />

                <div class="relative">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      class="absolute top-[118px] left-[84px] opacity-0 h-0 w-0 overflow-hidden gap-8"
                      type="file"
                      id="fileInput"
                      {...register("image")}
                    />
                    <button className="btn mt-5">Update Picture</button>
                  </form>

                  <label
                    for="fileInput"
                    class="absolute -top-3 left-[84px] text-2xl cursor-pointer"
                  >
                    <span class="inline-block">
                      <FaCamera />
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div class="flex flex-col pt-10 mx-auto my-auto sm:pt-0 sm:mx-0">
              <div class="flex flex-col mx-auto sm:flex-row sm:mx-0 ">
                <h2 class="flex pr-4 text-xl font-light text-gray-900 sm:text-3xl">
                  {user.displayName}
                </h2>
                <div class="flex">
                  <a class="flex items-center px-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-600 rounded outline-none sm:ml-2 hover:bg-blue-600 hover:text-white focus:outline-none hover:border-blue-700">
                    Edit profile
                  </a>
                  <a
                    class="p-1 ml-2 text-gray-700 border-transparent rounded-full cursor-pointer hover:text-blue-600 focus:outline-none focus:text-gray-600"
                    aria-label="Notifications"
                  >
                    <svg
                      class="w-4 h-4 sm:w-8 sm:h-8"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div class="flex items-center justify-between mt-3 space-x-2">
                <div class="flex">
                  <span class="mr-1 font-semibold">55 </span> Post
                </div>
                <div class="flex">
                  <span class="mr-1 font-semibold">10k </span> Follower
                </div>
                <div class="flex">
                  <span class="mr-1 font-semibold">20</span> Following
                </div>
              </div>
            </div>
          </div>
          <div class="w-full pt-20">
            <h1 class="text-lg font-semibold text-gray-800 sm:text-xl">
              {user?.displayName}
            </h1>
            <p class="text-sm text-gray-500 md:text-base">{user?.role}</p>
            <p class="text-sm text-gray-800 md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate, quam?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
