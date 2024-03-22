"use client";
import { useReservationFilterModal } from "@/hooks/useReservationFilterModal";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../form/Heading";
import { useReservationTable } from "@/hooks/useReservationTable";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import useClients from "@/hooks/useClients";
import CustomSelect from "../inputs/CustomSelect";
import { BiHome, BiUser } from "react-icons/bi";
import Avatar from "../ui/Avatar";
import { twMerge } from "tailwind-merge";
import useListings from "@/hooks/useListings";
import { isUndefined } from "lodash";
import { reservationFilterTypes } from "@/types/reservationTypes";
const filterItems = [
  { label: "showing all of your reservations", value: "ALL", icon: BiHome },
  { label: "showing completed reservations", value: "COMPLETED", icon: BiHome },
  { label: "showing pending reservations", value: "PENDING", icon: BiHome },
  { label: "showing outdated reservations", value: "OUTDATED", icon: BiHome },
];
const reservatoinFilterFormType = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  userId: z.string().optional(),
  listingId: z.string().optional(),
  type: z
    .enum(["COMPLETED", "PENDING", "ALL", "OUTDATED"])
    .default("ALL")
    .optional(),
});
enum STEPS {
  AMOUNT,
  INFO,
  TYPE,
}
const FilterReservationModal = () => {
  const [step, setStep] = useState(STEPS.AMOUNT);
  const { isOpen, onClose } = useReservationFilterModal();
  const { clients, isLoading: clientsLoading } = useClients();
  const { listings, isLoading: listingsLoading } = useListings({
    paginate: false,
    isActive: true,
  });
  const {
    SelectedFilters,
    setSelectedFilter,
    searchParams,
    setQuery,
    onResetQuery,
  } = useReservationTable();
  const form = useForm<z.infer<typeof reservatoinFilterFormType>>({
    resolver: zodResolver(reservatoinFilterFormType),
    defaultValues: {
      min: undefined,
      max: undefined,
      userId: undefined,
      listingId: undefined,
      type: undefined,
    },
  });
  const maxValue = form.watch("max");
  const minValue = form.watch("min");
  const body = useMemo(() => {
    if (step === STEPS.AMOUNT) {
      return (
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="what total amount do you want to filter?"
            subtitle="you can leave it empty for no limit"
          />
          <Input
            label="minimum amount"
            errors={form.formState.errors}
            formatPrice
            type="number"
            register={form.register}
            id="min"
          />
          <Input
            label="maximim amount"
            errors={form.formState.errors}
            formatPrice
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
            subtitle="you can select specific user or listing for filtering your reservations."
          />
          <CustomSelect
            onChange={(newVal: any & { value: string | undefined }) =>
              newVal?.value
                ? form.setValue("userId", newVal?.value)
                : form.setValue("userId", undefined)
            }
            options={clients.map((c) => ({
              icon: BiUser,
              label: c.name,
              value: c.id,
            }))}
            value={
              clients.find((c) => c.id === form.watch("userId"))
                ? {
                    icon: BiUser,
                    label: clients.find((c) => c.id === form.watch("userId"))
                      ?.name!,
                    value: clients.find((c) => c.id === form.watch("userId"))
                      ?.id!,
                  }
                : undefined
            }
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
              newVal?.value
                ? form.setValue("listingId", newVal?.value)
                : form.setValue("listingId", undefined)
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
          <CustomSelect
            onChange={(newVal: any & { value: string | undefined }) => {
              form.setValue("type", newVal?.value);
            }}
            options={filterItems.map((c) => ({
              icon: BiHome,
              label: c.label,
              value: c.value,
            }))}
            value={
              filterItems.find((c) => c.value === form.watch("type"))
                ? {
                    icon: BiHome,
                    label: filterItems.find(
                      (c) => c.value === form.watch("type")
                    )?.label!,
                    value: filterItems.find(
                      (c) => c.value === form.watch("type")
                    )?.value!,
                  }
                : undefined
            }
            formatOptionLabel={(data) => {
              return (
                <div className="min-w-full max-w-full flex items-center justify-start gap-2 capitalize">
                  <span
                    className={twMerge(
                      "text-sm max-w-full min-w-full  line-clamp-1 whitespace-nowrap overflow-x-hidden text-left",
                      "text-black dark:text-white"
                    )}
                  >
                    {data.label}
                  </span>
                </div>
              );
            }}
            isClearable
            placeholder="select a type..."
            className="min-w-full max-w-full"
          />
        </div>
      );
    }
  }, [form, step]);
  const onSubmit = (vals: z.infer<typeof reservatoinFilterFormType>) => {
    setQuery({
      listingId: vals.listingId,
      max: vals.max ? vals.max : undefined,
      min: vals.min ? vals.min : undefined,
      type: isUndefined(vals.type) ? "ALL" : vals.type,
      userId: vals.userId,
    });
    const filters: reservationFilterTypes[] = [];
    if (vals.min && vals.min > 0 && !!!vals.max) {
      filters.push("PRICE");
    }
    if (vals.max && vals.min && vals.max > vals.min) {
      filters.push("PRICE");
    }
    if (!isUndefined(vals.type)) {
      filters.push(vals.type);
    }
    if (!isUndefined(vals.listingId)) {
      filters.push("LISTING");
    }
    if (!isUndefined(vals.userId)) {
      filters.push("CLIENT");
    }
    setSelectedFilter(filters);
    onClose();
    form.reset();
  };
  const handleNext = useCallback(() => {
    if (step === STEPS.AMOUNT) {
      if (!!!minValue && !!!maxValue) {
        setStep(STEPS.INFO);
      }
      if (!!!minValue || !!!maxValue) {
        if (+maxValue! > +minValue!) {
          setStep(STEPS.INFO);
        }
        if (!!!maxValue && !!minValue) {
          toast.error("Max value can not be empty");
        }
      }
      if (!!minValue && !!maxValue) {
        if (+minValue! >= +maxValue!) {
          toast.error("Max value must be greater than Min value");
        }
        if (+minValue! < +maxValue!) {
          setStep(STEPS.INFO);
        }
      }
    }
    if (step === STEPS.INFO) {
      onSubmit(form.getValues());
      setStep(STEPS.AMOUNT);
    }
  }, [step, setStep, form, onSubmit, minValue, maxValue]);
  const handlePrev = useCallback(() => {
    if (step === STEPS.INFO) {
      setStep(STEPS.AMOUNT);
    }
    if (step === STEPS.AMOUNT) {
      onClose();
      form.reset();
      setStep(STEPS.AMOUNT);
    }
  }, [form, step, setStep]);
  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) onClose();
      }}
      body={body}
      header={{
        title: "filter reservations",
        close: () => {
          onClose();
          form.reset();
          setStep(STEPS.AMOUNT);
        },
      }}
      footer={{
        primary: {
          label: step === STEPS.INFO ? "apply filters" : "next",
          onClick: () => handleNext(),
        },
        secondary: {
          onClick: () => handlePrev(),
          label: step === STEPS.AMOUNT ? "cancel" : "back",
          type: "form",
        },
      }}
    />
  );
};

export default FilterReservationModal;
