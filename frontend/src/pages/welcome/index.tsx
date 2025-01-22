import React, { useState } from "react";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";

const Welcome = () => {
  const [tab, setTab] = useState<number>(0);
  return (
    <div className="min-h-screen relative">
      <div className=" text-textColor px-6 py-4 text-xl w-full absolute">
        <span className="font-bold">Shop</span>
        <span>Sphere</span>
      </div>
      <div className="min-h-screen w-full flex justify-center items-center bg-secondary">
        <div className="w-2/6 p-4">
          <div className="text-center text-4xl p-6">
            {tab === 0 ? "Login" : "Signup"}
          </div>
          {tab === 0 ? (
            <div className="text-center">
              <span className="text-gray-500 font-semibold">
                Don`t have an account?{" "}
              </span>
              <span
                className="text-primary font-semibold cursor-pointer"
                onClick={() => {
                  setTab(1);
                }}
              >
                Create an account
              </span>
            </div>
          ) : (
            <div
              className="text-primary font-bold text-center w-full cursor-pointer"
              onClick={() => setTab(0)}
            >
              Back
            </div>
          )}
          {tab === 0 ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
