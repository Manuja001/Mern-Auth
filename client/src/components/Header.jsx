import React from "react";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="bg-slate-500 py-2 px-10 flex justify-between items-center shadow-md">
      <div>
        <h1>
          <span className="text-3xl text-slate-800 font-bold">Auth</span>{" "}
          <span className="text-2xl text-slate-100 font-semibold">App</span>{" "}
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 inline rounded-full items-center"
          />
        </h1>
      </div>
      <div className="font-semibold text-white">
        <nav>
          <ul className="flex gap-5">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/signin">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
