"use client";
import { useReservationFilterModal } from "@/hooks/useReservationFilterModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../form/Heading";
import { useReservationTable } from "@/hooks/useReservationTable";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const reservatoinFilterFormType = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  userId: z.string().optional(),
  listingId: z.string().optional(),
  type: z.enum(["COMPLETED", "PENDING", "ALL"]).default("ALL"),
});
enum STEPS {
  AMOUNT,
  INFO,
  TYPE,
}
const FilterReservationModal = () => {
  const [step, setStep] = useState(STEPS.AMOUNT);
  const { isOpen, onClose } = useReservationFilterModal();
  const {
    SelectedFilters,
    setSelectedFilter,
    searchParams,
    setQuery,
    onResetQuery,
  } = useReservationTable();
  const form = useForm({
    resolver: zodResolver(reservatoinFilterFormType),
    values: {
      min: undefined,
      max: undefined,
      userId: undefined,
      listingId: undefined,
      type: "all",
    },
  });
  const body = useMemo(() => {
    if (step === STEPS.AMOUNT) {
      return (
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="what total amount do you want to filter?"
            subtitle="you can leave it empty for no limit"
          />
        </div>
      );
    }
    if (step === STEPS.INFO) {
      return (
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="additional information to filter(listingId,userId)"
            subtitle="you can selecy specific user or listing for filtering your reservations."
          />
        </div>
      );
    }
    if (step === STEPS.TYPE) {
      return (
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="filter by reservation type:"
            subtitle="you can filter by all types of reservations here."
          />
        </div>
      );
    }
  }, [form, step]);
  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) onClose();
      }}
      body={body}
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
          },
        },
      }}
    />
  );
};

export default FilterReservationModal;
