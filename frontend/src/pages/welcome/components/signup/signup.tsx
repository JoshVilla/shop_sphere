import PasswordIndicator from "@/components/passwordIndicator";
import { validateEmail } from "@/utility/helpers";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons for visibility toggle
import React, { useEffect, useMemo, useState } from "react";
import { register } from "@/api/service";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store/store";
import { getUserInfo } from "@/store/slice/userInfoSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formValidation, setFormValidation] = useState({
    isValidUsername: false,
    isValidEmail: false,
    isValidPassword: false,
    isMatchPassword: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    emailMsg: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => ({ ...prev, password: !prev.password }));
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowPassword((prev) => ({
      ...prev,
      confirmPassword: !prev.confirmPassword,
    }));
  };

  const handleRegister = async () => {
    try {
      const res = await register(formState);

      if (res.status === 201) {
        toast.success("Registration successful!");
        navigate("/main");
        dispatch(getUserInfo(res.data.user));
      } else if (res.status === 200) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
      console.error("Registration error:", error);
    }
  };

  const handlePasswordValidation = (isValid: boolean) => {
    setFormValidation((prev) => ({ ...prev, isValidPassword: isValid }));
  };

  const handleMatchPassword = () => {
    setFormValidation((prev) => ({
      ...prev,
      isMatchPassword:
        formState.password === formState.confirmPassword &&
        formState.password.length > 0 &&
        formState.confirmPassword.length > 0,
    }));
  };

  const isValidRegistration = useMemo(
    () => Object.values(formValidation).every((value) => value === true),
    [formValidation]
  );

  // Separate effect to handle email validation (only when email changes)
  useEffect(() => {
    const isEmailValid = validateEmail(formState.email);
    setFormValidation((prev) => ({
      ...prev,
      isValidEmail: isEmailValid,
    }));
  }, [formState.email]);

  // Separate effect to handle password and confirmation validation (only when password or confirmPassword changes)
  useEffect(() => {
    handleMatchPassword();
  }, [formState.password, formState.confirmPassword]);

  // Effect to handle username validation (only when username changes)
  useEffect(() => {
    setFormValidation((prev) => ({
      ...prev,
      isValidUsername: formState.username.length > 0,
    }));
  }, [formState.username]);

  return (
    <React.Fragment>
      <div className="mt-6 px-10">
        <div>
          <div className="text-gray-500 mb-2">Username</div>
          <input
            type="text"
            className="w-full p-2"
            placeholder="Enter Username"
            value={formState.username}
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, username: e.target.value }));
            }}
          />
        </div>
        <div className="mt-5">
          <div className="text-gray-500 mb-2">Email</div>
          <input
            type="text"
            className="w-full p-2"
            placeholder="Enter Email"
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          {errorMsg.emailMsg && (
            <p className="text-red-500 text-sm mt-2">Invalid Email</p>
          )}
        </div>
        <div className="mt-5">
          <div className="text-gray-500 mb-2 flex justify-between items-center">
            <span>Password</span>
          </div>
          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              className="w-full p-2"
              placeholder="Enter Password"
              value={formState.password}
              onChange={(e) => {
                setFormState((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <PasswordIndicator
            password={formState.password}
            isValid={handlePasswordValidation}
          />
        </div>
        <div className="mt-5">
          <div className="text-gray-500 mb-2 flex justify-between items-center">
            <span>Confirm Password</span>
          </div>
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              className="w-full p-2"
              placeholder="Enter Again the Password"
              value={formState.confirmPassword}
              onChange={(e) => {
                setFormState((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
                handleMatchPassword();
              }}
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button
          className={`w-full  text-white p-3 mt-6 ${
            isValidRegistration ? "bg-primary" : "bg-purple-400"
          }`}
          onClick={handleRegister}
          disabled={!isValidRegistration}
        >
          Signup
        </button>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default Signup;
