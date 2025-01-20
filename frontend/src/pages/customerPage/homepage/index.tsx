import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Homepage = (props: Props) => {
  const state = useSelector((state) => state);
  return <div>Homepage</div>;
};

export default Homepage;
