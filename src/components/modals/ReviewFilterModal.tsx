"use client";
import { useReviewFilterModal } from "@/hooks/useReviewsFilterModal";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import useClients from "@/hooks/useClients";
import useListings from "@/hooks/useListings";
import CustomSelect from "../inputs/CustomSelect";
import { twMerge } from "tailwind-merge";
import { BiFilter, BiHome, BiUser } from "react-icons/bi";
import Avatar from "../ui/Avatar";
import Heading from "../form/Heading";
import toast from "react-hot-toast";
import { useReviewTable } from "@/hooks/useReviewsTable";
import { ReviewFilterTypes } from "@/types/ReviewTypes";
import { IconType } from "react-icons";
import Input from "../inputs/Input";
enum STEPS {
  RATE,
  INFO,
}
const ReviewFilterModal = () => {
  const { searchParams, setQuery } = useReviewTable();
  const [step, setStep] = useState(STEPS.RATE);
  const { onClose, isOpen } = useReviewFilterModal();
  const { clients, isLoading: clientsLoading } = useClients({
    paginate: false,
    type: "REVIEWS",
  });
  const { isLoading: listingsLoading, listings } = useListings({
    filter: "REVIEWED",
    paginate: false,
  });
  const form = useForm<{
    min: number;
    max: number;
    userId?: string;
    listingId?: string;
    filterType?: ReviewFilterTypes;
  }>({
    defaultValues: {
      min: 0,
      max: 0,
      listingId: undefined,
      userId: undefined,
      filterType: undefined,
    },
  });
  const listingId = form.watch("listingId");
  const userId = form.watch("userId");
  const minValue = +form.watch("min");
  const maxValue = +form.watch("max");
  const filterType = form.watch("filterType");
  const options: { label: string; icon: IconType; value: ReviewFilterTypes }[] =
    [
      {
        icon: BiFilter,
        label: "accuracy",
        value: "ACCURACY",
      },
      {
        icon: BiFilter,
        label: "check in",
        value: "CHECK_IN",
      },
      {
        icon: BiFilter,
        label: "cleanliness",
        value: "CLEANLINESS",
      },
      {
        icon: BiFilter,
        label: "communication",
        value: "COMMUNICATION",
      },
      {
        icon: BiFilter,
        label: "location",
        value: "LOCATION",
      },
      {
        icon: BiFilter,
        label: "overall rating",
        value: "RATING",
      },
      {
        icon: BiFilter,
        label: "value",
        value: "VALUE",
      },
    ];
  const body = useMemo(() => {
    if (step === STEPS.RATE) {
      return (
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="filter by rating"
            subtitle="you can select specific rate type for filtering your reviews."
          />
          <CustomSelect
            options={options}
            onChange={(newVal) => {
              form.setValue(
                "filterType",
                newVal?.value as ReviewFilterTypes | undefined
              );
            }}
            value={
              options.find((o) => o.value === filterType)
                ? {
                    icon: BiFilter,
                    label: options.find((o) => o.value === filterType)?.label!,
                    value: options.find((o) => o.value === filterType)?.value!,
                  }
                : undefined
            }
            isClearable
            placeholder="select a rating type..."
            className="min-w-full max-w-full relative z-20"
            formatOptionLabel={(data) => {
              return (
                <div className="min-w-full max-w-full flex items-center justify-start gap-2 capitalize">
                  <span
                    className={twMerge(
                      "text-sm max-w-full min-w-full  line-clamp-1 whitespace-nowrap overflow-x-hidden text-left text-black dark:text-white"
                    )}
                  >
                    {data.label}
                  </span>
                </div>
              );
            }}
            key={"filterType"}
          />
          <Input
            label="minimum amount"
            errors={form.formState.errors}
            formatPrice
            type="number"
            className="relative z-0"
            register={form.register}
            id="min"
            min={0}
            max={5}
          />
          <Input
            min={0}
            max={5}
            label="maximim amount"
            errors={form.formState.errors}
            formatPrice
            className="relative z-0"
            type="number"
            register={form.register}
            id="max"
          />
        </div>
      );
    }
    if (step === STEPS.INFO) {
      return (
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="additional information to filter"
            subtitle="you can select specific user or listing for filtering your reviews."
          />
          <CustomSelect
            onChange={(newVal: any & { value: string | undefined }) => {
              form.setValue("userId", newVal?.value);
            }}
            options={clients.map((c) => ({
              icon: BiUser,
              label: c.name!,
              value: c.id,
            }))}
            value={
              clients.find((c) => c.id === userId)
                ? {
                    icon: BiUser,
                    label: clients.find((c) => c.id === userId)?.name!,
                    value: clients.find((c) => c.id === userId)?.id!,
                  }
                : undefined
            }
            key={"clients"}
            formatOptionLabel={(data) => {
              return (
                <div className="min-w-full max-w-full flex items-center justify-start gap-2 capitalize">
                  <Avatar
                    userId={data.value as string}
                    className="min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px]"
                  />
                  <span
                    className={twMerge("text-sm text-black dark:text-white")}
                  >
                    {data.label}
                  </span>
                </div>
              );
            }}
            isClearable
            placeholder="select a client..."
            className="min-w-full max-w-full"
            disabled={clientsLoading}
          />
          <CustomSelect
            onChange={(newVal: any & { value: string | undefined }) =>
              form.setValue("listingId", newVal?.value)
            }
            options={listings.map((c) => ({
              icon: BiHome,
              label: c.title,
              value: c.id,
            }))}
            value={
              listings.find((c) => c.id === form.watch("listingId"))
                ? {
                    icon: BiHome,
                    label: listings.find(
                      (c) => c.id === form.watch("listingId")
                    )?.title!,
                    value: listings.find(
                      (c) => c.id === form.watch("listingId")
                    )?.id!,
                  }
                : undefined
            }
            formatOptionLabel={(data) => {
              return (
                <div className="min-w-full max-w-full flex items-center justify-start gap-2 capitalize">
                  <span
                    className={twMerge(
                      "text-sm max-w-full min-w-full  line-clamp-1 whitespace-nowrap overflow-x-hidden text-left text-black dark:text-white"
                    )}
                  >
                    {data.label}
                  </span>
                </div>
              );
            }}
            isClearable
            placeholder="select a listing..."
            className="min-w-full max-w-full"
            disabled={listingsLoading}
          />
        </div>
      );
    }
  }, [step, clients, clientsLoading, listingsLoading, listings, form]);
  const handleNext = useCallback(() => {
    if (step === STEPS.RATE) {
      if (!!filterType) {
        if (minValue !== 0 && maxValue !== 0 && maxValue > minValue) {
          if (minValue <= 5 && maxValue <= 5) {
            setStep(STEPS.INFO);
          } else {
            toast.error("min and max values must be between 0-5");
          }
        }
        if (minValue === 0 && maxValue === 0 && maxValue <= minValue) {
          toast.error("min and max value required while choosing filter type");
        }
      }
      if (!!!filterType) {
        if (minValue === 0 && maxValue === 0) {
          setStep(STEPS.INFO);
        }
        if (minValue > 0 || maxValue > 0) {
          toast.error("please select a filter type");
        }
      }
    }
    if (step === STEPS.INFO) {
      setQuery({
        ...searchParams,
        userId,
        listingId,
        min: minValue,
        max: maxValue,
        filterType,
      });
      onClose();
      setStep(STEPS.RATE);
      form.reset();
    }
  }, [
    step,
    setStep,
    form,
    minValue,
    maxValue,
    setQuery,
    searchParams,
    userId,
    listingId,
    filterType,
  ]);
  const handlePrev = useCallback(() => {
    if (step === STEPS.RATE) {
      onClose();
      form.reset();
      setStep(STEPS.RATE);
    }
    if (step === STEPS.INFO) {
      setStep(STEPS.RATE);
    }
  }, [form, step, setStep]);
  return (
    <Modal
      isOpen={isOpen}
      header={{
        title: "filter reviews",
        close() {
          onClose();
          form.reset();
          setStep(STEPS.RATE);
        },
      }}
      onChange={(val) => {
        if (!val) {
          onClose();
        }
      }}
      body={body}
      disable={clientsLoading || listingsLoading}
      footer={{
        primary: {
          label: step !== STEPS.INFO ? "next" : "apply filters",
          onClick: handleNext,
        },
        secondary: {
          onClick: handlePrev,
          label: step !== STEPS.RATE ? "back" : "close",
          type: "form",
        },
      }}
    />
  );
};

export default ReviewFilterModal;
