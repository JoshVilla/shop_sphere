import { saveAccount } from "@/api/service";
import Input from "@/components/input";
import { AppDispatch, RootState } from "@/store/store";
import { STATUS } from "@/utility/constant";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PasswordInput from "@/components/passwordInput";
import { getUserInfo } from "@/store/slice/userInfoSlice";
import { ToastContainer, toast } from "react-toastify";
interface FormStateProps {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

const Account = () => {
  const dispatch = useDispatch<AppDispatch>();
  const info = useSelector((state: RootState) => state.userInfo.userInfo);
  const [formState, setFormState] = useState<FormStateProps>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const [passwordState, setPasswordState] = useState({
    newPassword: "",
    password: "",
  });

  const handleSaveAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault(); // Prevent the button's default behavior

      const res = await saveAccount({
        ...formState,
        id: info?._id,
        ...passwordState,
      });

      console.log(res.status, 400);

      if (res.status === STATUS.SUCCESS && res.data.isSuccess === 1) {
        dispatch(getUserInfo(res.data.updatedUser));
        toast(res.data.msg, { type: "success" });
        setPasswordState({ password: "", newPassword: "" });
      } else {
        toast(res.data.msg, { type: "error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormState({
      username: info?.username || "",
      firstname: info?.firstname || "",
      lastname: info?.lastname || "",
      email: info?.email || "",
    });

    console.log(info);
  }, []);

  return (
    <div className="h-screen bg-primary text-text">
      <ToastContainer />
      <div className="w-full  p-8">
        <div className="text-2xl font-semibold">My Account</div>
        <div className="mt-10">
          <form action="" className="flex flex-col gap-10">
            <div>
              <label>Username: </label>
              <Input
                value={formState.username}
                placeholder="Enter Username"
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label>Firstname: </label>
              <Input
                value={formState.firstname}
                placeholder="Enter Firstname"
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    firstname: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label>Lastname: </label>
              <Input
                value={formState.lastname}
                placeholder="Enter Lastname"
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    lastname: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label>Email: </label>
              <Input
                value={formState.email}
                placeholder="Enter Email"
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-10">
              <div className="text-textColor text-lg font-bold">
                Change Password
              </div>
              <div>
                <label>Enter your new password: </label>
                <PasswordInput
                  placeholder="Enter your new password"
                  value={passwordState.newPassword}
                  onChange={(e) =>
                    setPasswordState((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label>Enter your old password</label>
                <PasswordInput
                  placeholder="Enter your old password"
                  value={passwordState.password}
                  onChange={(e) =>
                    setPasswordState((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <button
              onClick={handleSaveAccount}
              type="submit"
              className="bg-primary p-2 rounded-md"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
