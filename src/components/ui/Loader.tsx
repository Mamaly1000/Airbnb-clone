"use client";
import { PuffLoader } from "react-spinners";

import React from "react";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center gap-3">
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export default Loader;
