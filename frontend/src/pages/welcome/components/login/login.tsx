import { googleLogin, login } from "@/api/service";
import { getUserInfo } from "@/store/slice/userInfoSlice";
import { AppDispatch } from "@/store/store";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons for visibility toggle
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface GoogleJwtPayload {
  email: string;
  family_name: string;
  given_name: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = async () => {
    try {
      const response = await login(formState);

      if (response.status === 200) {
        navigate("/main");
        dispatch(getUserInfo(response.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUsingGoogle = (crendentials: any) => {
    const decodedCredentials = jwtDecode<GoogleJwtPayload>(
      crendentials.credential
    );
    const { email, family_name, given_name } = decodedCredentials;

    googleLogin({
      email,
      username: given_name,
      firstname: given_name,
      lastname: family_name,
    }).then((res) => {
      navigate("/main");
      dispatch(getUserInfo(res.data.data));
    });
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div className="mt-10 px-10">
        <div>
          <div className="text-gray-500 mb-2">Email</div>
          <input
            type="text"
            className="w-full p-2"
            placeholder="Enter Email"
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="mt-5">
          <div className="text-gray-500 mb-2 flex justify-between items-center">
            <span>Password</span>
            <span className="text-primary cursor-pointer">
              Forgot Password?
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2"
              placeholder="Enter Password"
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div>
          <div className="text-center">Sign in using</div>
          <div className="mt-8 ">
            <GoogleLogin
              width={"100%"}
              size={"large"}
              onSuccess={loginUsingGoogle}
            />
          </div>
        </div>

        <button
          className="w-full bg-slate-300 text-white p-3 mt-6"
          onClick={onLogin}
        >
          Login
        </button>
      </div>
    </React.Fragment>
  );
};

export default Login;
