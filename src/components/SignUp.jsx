import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const auth = getAuth();

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (data.password != data.confirmPassword) {
      toast.error("Passwords don't match!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    toast.info("Creating User...", {
      position: toast.POSITION.TOP_CENTER,
    });

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
        toast.success("User created!", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error.code);
        if (
          error.code == "auth/invalid-email" ||
          error.code == "auth/missing-password"
        ) {
          toast.error("Invalid email or password!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (error.code == "auth/weak-password") {
          toast.error("Weak password, set a stronger password!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (error.code == "auth/network-request-failed") {
          toast.error("Ensure you're connected to internet!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (error.code == "auth/email-already-in-use") {
          toast.error("This email already exists!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  return (
    <section className="min-h-screen md:grid place-items-center">
      <ToastContainer />
      <form className="md:m-0 mt-[30%] mx-[5%]">
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
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={(event) => handleInputs(event)}
          />
        </div>
        <div className="flex items-center justify-center mt-4 w-full">
          <button
            className="text-white bg-green-700 hover:bg-green-900 active:bg-green-500 px-6 py-2 text-lg rounded-md"
            type="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
