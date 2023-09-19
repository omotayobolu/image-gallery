import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>Oops!</h1>
      <p>Page Not Found!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/marketplace" className="text-lg underline font-medium mt-6">
        Go Back
      </Link>
    </div>
  );
};

export default ErrorPage;
