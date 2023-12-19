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
  const listings = (await getListings({ userId: user.id })) || [];
  if (listings.length === 0) {
    return (
      <EmptyState
        subTitle="Looks like you didn`t create any property here."
        title="No properties found!"
      />
    );
  }
  return <PropertiesClient properties={listings} user={user} />;
};

export default Properties;
