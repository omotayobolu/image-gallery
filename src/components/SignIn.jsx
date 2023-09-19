import React, { useState } from "react";
// import { app, database } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const signIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const auth = getAuth();
  // const dbInstance = collection(database, "users");

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((error) => {
        console.log(error.code);
        if (
          error.code == "auth/invalid-email" ||
          error.code == "auth/missing-password"
        ) {
          setErrorMessage("Invalid email or password");
        } else if (error.code == "auth/weak-password") {
          setErrorMessage("Weak password, set a stronger password");
        }
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((error) => {
        console.log(error.code);
        if (
          error.code == "auth/invalid-login-credentials" ||
          error.code == "auth/missing-password" ||
          error.code == "auth/invalid-email"
        ) {
          setErrorMessage("Incorrect email or password");
        }
      });
    // addDoc(dbInstance, data)
    //   .then(() => {
    //     alert("Data sent");
    //   })
    //   .catch((err) => alert(err.message));
  };

  return (
    <section className="min-h-screen grid place-items-center">
      <form>
        <p className="text-lg text-red-600 italic">{errorMessage}</p>
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
        <div className="flex items-center justify-between mt-8">
          <button
            className="text-white bg-green-700 hover:bg-green-900 active:bg-green-500 px-6 py-2 text-lg rounded-md"
            type="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
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

export default signIn;