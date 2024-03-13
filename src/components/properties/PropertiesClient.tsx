"use client";
import { safeListingType } from "@/types/safeListing";
import { safeUserType } from "@/types/safeuser";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";
import ListingList from "../lists/ListingList";

const PropertiesClient = ({
  properties,
  user,
  pagination,
}: {
  pagination: {
    hasMore: boolean;
    maxPages: number;
    total: number;
  };

  properties: safeListingType[];
  user?: safeUserType | null;
}) => {
  const updateProperyModal = useUpdateProperty();

  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (listing: safeListingType) => {
      setDeletingId(listing.id);
      axios
        .delete(`/api/listings/${listing.id}`)
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
    <ListingList
      listings={properties}
      pagination={pagination}
      user={user}
      main
      className="pt-32"
      emptyState={{
        subTitle: "Looks like you didn`t create any property here.",
        title: "No properties found!",
      }}
      header={{
        title: "Properties",
        subTitle: "List of your properties!",
      }}
      Remove={{
        label: "Delete Property",
        onClick: onDelete,
      }}
      Edit={{
        label: "update your property data",
        onClick: (li) => {
          updateProperyModal.onOpen(li.id);
        },
      }}
      deletingId={deletingId}
    />
  );
};

export default PropertiesClient;
