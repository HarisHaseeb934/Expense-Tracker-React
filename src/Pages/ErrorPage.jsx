import React from "react";
import { Navigate, useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <section className="bg-[url(Error.jpg)] min-h-screen bg-center bg-cover flex justify-center items-start p-3">
      <div className="flex justify-center items-center space-x-2 sm:space-x-5">
        {error && (
          <p className="text-on-error text-xs sm:text-base py-1 sm:py-2">
            {error.data}
          </p>
        )}
        <button
          onClick={() => navigate(-1)}
          className="bg-error-container text-on-error-container px-3 py-1 sm:px-5 sm:py-2 text-xs"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
