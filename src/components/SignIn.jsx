import React, { useState } from "react";
import { app, database } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth();

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        navigate("/gallery");
        sessionStorage.setItem(
          "Auth token",
          response._tokenResponse.refreshToken
        );
        setSuccessMessage("Sign In Successful!");
      })
      .catch((error) => {
        console.log(error.code);
        if (
          error.code == "auth/missing-password" ||
          error.code == "auth/invalid-email" ||
          error.code == "auth/invalid-login-credentials"
        ) {
          setErrorMessage("Incorrect email or password");
        } else if (error.code == "auth/network-request-failed") {
          setErrorMessage("Ensure you're connected to internet");
        }
      });
  };

  return (
    <section className="min-h-screen md:grid place-items-center">
      <form className="md:m-0 mt-[30%] mx-[5%]">
        <p className="text-lg text-red-600 italic font-medium">
          {errorMessage}
        </p>
        <p className="text-lg text-green-500 italic font-medium">
          {successMessage}
        </p>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(event) => handleInputs(event)}
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => handleInputs(event)}
          />
        </div>
        <div className="flex items-center justify-between mt-4 w-full">
          <p className="text-black hover:text-green-900 text-lg border-b border-black cursor-pointer">
            <Link to="/signup">Sign Up</Link>
          </p>

          <button
            className="text-white bg-green-700 hover:bg-green-900 active:bg-green-500 px-6 py-2 text-lg rounded-md"
            type="submit"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
