"use client";
import EmptyState from "@/components/ui/EmptyState";
import React from "react";

const ErrorState = ({ error }: { error: Error }) => {
  return <EmptyState subTitle="something went wrong!" title="Uh oh" />;
};

export default ErrorState;
