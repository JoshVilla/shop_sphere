import Input from "@/components/input";
import React from "react";

type Props = {};

const Account = (props: Props) => {
  return (
    <div className="h-[100vh] bg-background text-text">
      <div className="w-full  p-8">
        <div className="text-2xl font-semibold">My Account</div>
        <div className="mt-10">
          <form action="" className="flex flex-col gap-10">
            <div>
              <label htmlFor="">Username: </label>
              <Input />
            </div>

            <div>
              <label htmlFor="">Firstname: </label>
              <Input />
            </div>

            <div>
              <label htmlFor="">Lastname: </label>
              <Input />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
