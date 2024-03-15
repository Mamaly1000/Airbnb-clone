import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import PropertiesClient from "@/components/properties/PropertiesClient";

const Properties = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <EmptyState
        title="Unauthorized!"
        subTitle="Please login to your account."
      />
    );
  }
  const { listings, pagination } = await getListings({
    userId: user.id,
    type: "ALL",
  }); 

  return (
    <PropertiesClient
      pagination={pagination}
      properties={listings}
      user={user}
    />
  );
};

export default Properties;
