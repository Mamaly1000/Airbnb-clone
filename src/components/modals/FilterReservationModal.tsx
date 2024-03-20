"use client";
import { useReservationFilterModal } from "@/hooks/useReservationFilterModal";
import React, { useState } from "react";
import Modal from "./Modal";
import Heading from "../form/Heading";
import { useReservationTable } from "@/hooks/useReservationTable";
import PriceRange from "../search-page/PriceRange";
import CustomSelect from "../inputs/CustomSelect";

const FilterReservationModal = () => {
  const { isOpen, onClose } = useReservationFilterModal();
  const {
    SelectedFilters,
    setSelectedFilter,
    searchParams,
    setQuery,
    onResetQuery,
  } = useReservationTable();
  const [price, setPrice] = useState({ min: 0, max: 1000 });
  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) onClose();
      }}
      body={
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="filter your reservations data"
            subtitle="you can filter a range of data for reservation."
          />
          <PriceRange handlePriceRangeChange={setPrice} />
          <CustomSelect onChange={(val) => {}} options={[]} value={undefined} />
        </div>
      }
      header={{
        title: "Update reservation",
        close: () => {
          onClose();
        },
      }}
      footer={{
        primary: {
          label: "update now",
          onClick: () => {
            // onClose();
            console.log({ price });
          },
        },
      }}
    />
  );
};

export default FilterReservationModal;
