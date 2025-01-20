import React from "react";
import { useSelector } from "react-redux";
type Props = {};

const Homepage = (props: Props) => {
  const state = useSelector((state) => state);
  return (
    <div className="h-[100vh] bg-background text-text">
      <div className="p-3 bg-btnBg">Home</div>
    </div>
  );
};

export default Homepage;
