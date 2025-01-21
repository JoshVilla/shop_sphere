import Input from "@/components/input";
import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface FormStateProps {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

const Account = () => {
  const info = useSelector((state: RootState) => state.userInfo.userInfo);
  const [formState, setFormState] = useState<FormStateProps>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const saveAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the button's default behavior
    console.log(formState);
  };

  useEffect(() => {
    setFormState({
      username: info?.username || "",
      firstname: info?.firstname || "",
      lastname: info?.lastname || "",
      email: info?.email || "",
    });
  }, []);

  return (
    <div className="h-screen bg-background text-text">
      <div className="w-full  p-8">
        <div className="text-2xl font-semibold">My Account</div>
        <div className="mt-10">
          <form action="" className="flex flex-col gap-10">
            <div>
              {/* <label>Username: </label> */}
              <Input
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
              {/* <label>Firstname: </label> */}
              <Input
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
              {/* <label>Lastname: </label> */}
              <Input
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
              {/* <label>Email: </label> */}
              <Input
                placeholder="Enter Email"
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <button
              onClick={saveAccount}
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
