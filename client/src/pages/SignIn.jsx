import React, { useState } from "react";
import user from "../assets/user.png";
import email from "../assets/email.png";
import password from "../assets/password.png";
import background from "../assets/background_1.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignInStart, signInFailure, signInSuccess } from "../redux/UserSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(SignInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      console.log(data);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="hidden lg:flex justify-center items-center w-1/2">
        <img
          src={background}
          alt="background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="bg-slate-200 w-full items-center flex justify-center lg:w-1/2">
        <div className="bg-white px-10 py-10 w-96 rounded-3xl mt-14 mb-10">
          <div>
            <h1>
              <span className="font-semibold text-slate-600 text-5xl">
                Welcome{" "}
              </span>{" "}
              <span className="font-bold text-slate-800 text-4xl"> Back!</span>
            </h1>
            <p className="font-medium mt-6 text-slate-600 text-lg">
              Enter your details below!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7">
            <div className="mt-4">
              <label className="font-medium text-base ml-10 " htmlFor="email">
                Email
              </label>
              <div className="flex items-center justify-center">
                <img
                  src={email}
                  alt="email"
                  className="w-6 h-6 inline-block mr-3"
                />
                <input
                  className="w-full bg-transparent border-2 px-2 py-1 mt-1 border-slate-300 rounded-xl"
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                className="font-medium text-base ml-10  "
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center justify-center">
                <img
                  src={password}
                  alt="password"
                  className="w-6 h-6 inline-block mr-3"
                />
                <input
                  className="w-full bg-transparent border-2 px-2 py-1 mt-1 border-slate-300 rounded-xl"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-between items-center"></div>
            <p className="mt-5 text-center">
              Do not have an account?{" "}
              <Link to="/signup" className="text-slate-500 cursor-pointer">
                Sign Up
              </Link>
            </p>
            <div className="flex justify-center">
              <button className="bg-slate-500 text-white uppercase text-lg font-semibold px-5 py-3 rounded-3xl mt-7 hover:scale-[1.02] ease-in-out active:scale-[0.98]">
                Sign In
              </button>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
