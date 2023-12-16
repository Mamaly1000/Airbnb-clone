"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "shadow-md shadow-rose-500",
      }}
    />
  );
};

export default ToastProvider;
