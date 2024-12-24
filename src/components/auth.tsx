"use client";

import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/context-provider";
import { UserType } from "@/types/user";

function Login({ changeForm }: { changeForm: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const { updateToken, updateUserID, loading, toggleLoading, updateUsers } =
    useAppContext();

  async function getUsers() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/users`);
      const data = await response.json();
      let users = data.map((user: UserType) => user.name);
      updateUsers(users);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toggleLoading();
    setStatus("");
    try {
      // simulate network delay
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }
      let body = await res.json();
      let token = body.token;
      let userID = body.user_id;
      await getUsers();
      updateToken(token);
      updateUserID(userID);
    } catch (error) {
      setStatus("Login failed. Try again?");
      console.error(error);
    } finally {
      toggleLoading();
    }
  };

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
        {status !== "" && <p className="text-red-500">{status}</p>}
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-windowBg h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-windowBg h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
        />
        <button
          type="submit"
          className={`bg-button rounded-md h-7 ${
            loading ? "animate-pulse" : ""
          }`}
        >
          Login
        </button>
      </form>
    </>
  );
}

function Register({ changeForm }: { changeForm: () => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const { updateUsername, updateUserID, loading, toggleLoading } =
    useAppContext();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toggleLoading();
    setStatus("");
    try {
      // simulate network delay
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }
      let body = await res.json();
      let newUser = body.username;
      let userID = body.user_id;
      updateUsername(newUser);
      updateUserID(userID);
      setStatus("Success! Proceed to login.");
    } catch (error) {
      setStatus("Registration failed. Try again?");
    } finally {
      toggleLoading();
    }
  };

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
        {status !== "" && (
          <p
            className={
              status.trim() === "Success! Proceed to login."
                ? `text-green-500`
                : `text-red-500`
            }
          >
            {status}
          </p>
        )}
      </div>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="bg-windowBg h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
        ></input>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="bg-windowBg h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
        ></input>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-windowBg h-7 py-1 px-2 rounded-md outline-fieldOutline/20 focus:outline-inputOutline focus:outline-4 outline-1 outline"
          type="password"
        ></input>
        <button
          className={`bg-button rounded-md h-7 ${
            loading ? "animate-pulse" : ""
          }`}
        >
          Register
        </button>
      </form>
    </>
  );
}

export default function Auth() {
  const [loginVisible, setLoginVisible] = useState(true);
  const handleForm = function () {
    setLoginVisible((prev) => !prev);
  };

  return (
    <div className="md:w-1/3 md:max-w-64 w-3/5 bg-windowBg rounded-lg flex flex-col overflow-clip shadow-2xl text-xs backdrop-blur-lg p-4 gap-3 outline-fieldOutline/50 outline-1 outline">
      <div className="flex items-center align-middle justify-center">
        <Image
          src="/images/imessage.png"
          width="60"
          height="60"
          alt="iMessage icon"
          className="flex"
        />
      </div>
      <h2 className="font-medium text-center">iMessage</h2>
      {loginVisible ? (
        <Login changeForm={handleForm} />
      ) : (
        <Register changeForm={handleForm} />
      )}
    </div>
  );
}
