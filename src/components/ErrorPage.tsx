import { Divider } from "@chakra-ui/react";
import Navbar from "./Navbar";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <Divider />
      <div className="flex h-screen bg-red-100">
        <div className="m-auto text-center">
          <h1 className="text-5xl font-bold text-red-500">Oops!</h1>
          <p className="mt-4 text-xl text-gray-700">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
