"use client";
import ClientListingList from "@/components/lists/ClientListingList";
import SearchBar from "@/components/search-page/SearchBar";
import useListings from "@/hooks/useListings";
import { usePropertySearch } from "@/hooks/usePropertySearch";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";
import useUser from "@/hooks/useUser";
import { safeListingType } from "@/types/safeListing";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

const PropertiesPage = () => {
  const { params } = usePropertySearch();
  const updateProperyModal = useUpdateProperty();
  const { user } = useUser();
  const { mutate } = useListings({ ...params, userId: user?.id });
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
          mutate();
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
    <section className="min-w-full max-w-full flex flex-col items-start justify-start gap-8">
      <SearchBar />
      <ClientListingList
        emptyState={{
          title: "no result",
          subTitle: "it can be a typo or you should search more.",
          className:
            "min-w-full max-w-full flex flex-col items-center justify-center",
        }}
        params={{ ...params, userId: user?.id }}
        className="pt-12 min-w-full max-w-full"
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
    </section>
  );
};

export default PropertiesPage;
