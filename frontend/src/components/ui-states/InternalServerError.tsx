import React from "react";
import serverError from "../../assets/icons/internal-server-error.svg";
import { Link } from "react-router-dom";

const InternalServerError = () => {
  return (
    <div className="w-full h-screen flex flex-col  justify-center items-center ml-[15%]">
      <img src={serverError} alt="Server Error Icon" className="w-32 h-auto" />
      <h3 className="mt-4 mb-2 text-coolgray text-xl">Internal Server Error</h3>
      <p className="text-sm text-coolgray w-64 text-center">
        <span className="italic">
          Unable to retrieve your information at the moment.{" "}
        </span>
        <Link
          to="/"
          className="text-brandblue font-semibold hover:underline text-sm"
        >
          Refresh page.
        </Link>
      </p>
    </div>
  );
};

export default InternalServerError;
