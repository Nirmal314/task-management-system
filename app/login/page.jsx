"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// ? react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ? Context
import { UserAuth } from "../context/AuthContext";
// ? firebase/auth
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const router = useRouter();
  const { user, googleSignin, userSignin } = UserAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await googleSignin();
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    // ! Implementing login logic here

    if (!email || !password) {
      toast.error("Enter email and password.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const res = await userSignin(email, password);
      // console.log(res);
      if (res.error) {
        toast.error(res.errorMessage, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("You have been logged in.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="w-1/4 p-6 bg-white shadow rounded-lg">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center tracking-wide">
            Login to your account
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
              <button
                className="absolute top-2 right-3 text-gray-500"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
          <button
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-150"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <div className="flex items-center justify-center mt-4">
            <span className="border-t border-gray-400 w-1/4"></span>
            <span className="text-gray-500 mx-3">Or sign in with</span>
            <span className="border-t border-gray-400 w-1/4"></span>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full mt-4 bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded"
          >
            Sign In with Google
          </button>

          <p className="mt-4 text-center text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
