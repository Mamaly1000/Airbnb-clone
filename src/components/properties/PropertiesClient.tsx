"use client";
import { safeListingType } from "@/types/safeListing";
import { safeUserType } from "@/types/safeuser";
import React, { useCallback, useState } from "react";
import Container from "../ui/Container";
import ListingCard from "../card/ListingCard";
import Heading from "../form/Heading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const PropertiesClient = ({
  properties,
  user,
}: {
  properties: safeListingType[];
  user?: safeUserType | null;
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then((res: { data: { message: string } }) => {
          toast.success(res.data.message);
          router.refresh();
        })
        .catch((err) => {
          console.log(err);
          toast.error("something went wrong!");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {properties.map((property) => {
          return (
            <ListingCard
              action={{
                actionId: property.id,
                actionLabel: "Delete Property",
                onAction: onDelete,
              }}
              listing={property}
              key={property.id}
              user={user}
              disabled={deletingId === property.id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
