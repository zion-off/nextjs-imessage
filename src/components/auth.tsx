"use client";

import { useState } from "react";
import Image from "next/image";

function Login({ changeForm }: { changeForm: () => void }) {
  return (
    <>
      <div className="text-center flex flex-col justify-center items-center">
        <p>Login to your account</p>
        <p>
          Need an account?{" "}
          <button
            className="text-blue-500"
            onClick={() => {
              changeForm();
            }}
          >
            Register
          </button>
        </p>
      </div>
      <input
        placeholder="Username"
        className="bg-background h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
      ></input>
      <input
        placeholder="Password"
        className="bg-background h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
        type="password"
      ></input>
      <button
        className="bg-button rounded-md h-7"
        onClick={() => {
          console.log("clicked")
          
        }}
      >
        Login
      </button>
    </>
  );
}

function Register({ changeForm }: { changeForm: () => void }) {
  return (
    <>
      <div className="text-center flex flex-col justify-center items-center">
        <p>Register a new account</p>
        <p>
          Have an account?{" "}
          <button
            className="text-blue-500"
            onClick={() => {
              changeForm();
            }}
          >
            Login
          </button>
        </p>
      </div>
      <input
        placeholder="Name"
        className="bg-background h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
      ></input>
      <input
        placeholder="Username"
        className="bg-background h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
      ></input>
      <input
        placeholder="Password"
        className="bg-background h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
        type="password"
      ></input>
      <button className="bg-button rounded-md h-7">Register</button>
    </>
  );
}

export default function Auth() {
  const [loginVisible, setLoginVisible] = useState(true);
  const handleForm = function () {
    setLoginVisible(!loginVisible);
  };

  return (
    <div className="md:w-1/3 md:max-w-64 w-3/5 bg-background rounded-lg flex flex-col overflow-clip shadow-2xl text-xs backdrop-blur-lg p-4 gap-3 outline-fieldOutline/50 outline-1 outline">
      <div className="flex items-center align-middle justify-center">
        <Image
          src="/images/imessage.png"
          width="60"
          height="60"
          alt="iMessage icon"
          className="flex"
        />
      </div>
      <h2 className="font-bold text-center">iMessage</h2>
      {loginVisible ? (
        <Login changeForm={handleForm} />
      ) : (
        <Register changeForm={handleForm} />
      )}
    </div>
  );
}
