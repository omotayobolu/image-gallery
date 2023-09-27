import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    if (data.password != data.confirmPassword) {
      setErrorMessage("Passwords don't match!");
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
        setLoading(false);
        setSuccessMessage("User created!");
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error.code);

        if (
          error.code == "auth/invalid-email" ||
          error.code == "auth/missing-password"
        ) {
          setErrorMessage("Invalid email or password!");
        } else if (error.code == "auth/weak-password") {
          setErrorMessage("Weak password, set a stronger password!");
        } else if (error.code == "auth/network-request-failed") {
          setErrorMessage("Ensure you're connected to internet!");
        } else if (error.code == "auth/email-already-in-use") {
          setErrorMessage("This email already exists!");
        }
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen md:grid place-items-center">
      <form className="md:m-0 mt-[30%] mx-[5%]">
        {loading && (
          <p className="text-lg text-black italic font-medium">
            Creating user....
          </p>
        )}
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
            className={errorMessage && "border border-red-600 bg-red-100"}
            onChange={(event) => handleInputs(event)}
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className={errorMessage && "border border-red-600 bg-red-100"}
            onChange={(event) => handleInputs(event)}
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className={errorMessage && "border border-red-600 bg-red-100"}
            onChange={(event) => handleInputs(event)}
          />
        </div>
        <div className="flex items-center justify-center mt-4 w-full">
          <button
            className="text-white bg-green-700 hover:bg-green-900 active:bg-green-500 px-6 py-2 text-lg rounded-md"
            type="submit"
            onClick={handleSignUp}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
