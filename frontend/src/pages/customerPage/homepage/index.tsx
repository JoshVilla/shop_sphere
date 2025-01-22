import React from "react";
import { useSelector } from "react-redux";
type Props = {};

const Homepage = (props: Props) => {
  const state = useSelector((state) => state);
  return (
    <div className="h-screen">
      <div className="p-3 text-textColor">Hodme</div>
    </div>
  );
};

export default Homepage;
