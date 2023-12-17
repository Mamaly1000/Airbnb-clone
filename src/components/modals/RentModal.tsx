"use client";
import useRentModal from "@/hooks/useRentModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../form/Heading";
import { categories } from "../categories/Categories";
import CategoryBox from "../categories/CategoryBox";
import { twMerge } from "tailwind-merge";
import { FieldValues, useForm } from "react-hook-form";
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setSteps] = useState(STEPS.CATEGORY);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      imageSrc: "",
      category: "",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      location: null,
      price: 1,
    },
  });
  const watchingCategory = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onForward = () => {
    if (step !== STEPS.PRICE) {
      setSteps((prev) => prev + 1);
    }
  };
  const onBackward = () => {
    if (step !== STEPS.CATEGORY) {
      setSteps((prev) => prev - 1);
    }
  };

  const primaryLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "create";
    }
    return "next";
  }, [step]);
  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "back";
  }, [step]);

  const body = useMemo(() => {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="which of these categories can perfectly describes your place?"
          subtitle="Pick a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[30vh] md:max-h-[50vh] overflow-y-auto">
          {categories.map((c) => {
            return (
              <CategoryBox
                className={twMerge(
                  "border-[1px]  rounded-lg hover:border-neutral-800",
                  watchingCategory == c.label
                    ? "border-rose-500 text-rose-500 hover:text-rose-500 hover:border-rose-500"
                    : "border-neutral-300 text-neutral-500 hover:border-neutral-800"
                )}
                category={c}
                key={c.label}
                onClick={(category) =>
                  setCustomValue("category", category.label)
                }
              />
            );
          })}
        </div>
      </div>
    );
  }, [step, watchingCategory]);

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onChange={(val) => {
        if (!val) {
          rentModal.onClose();
        }
      }}
      header={{
        title: "rent modal",
      }}
      footer={{
        primary: {
          label: primaryLabel,
          onClick: onForward,
        },
        secondary: {
          label: secondaryLabel,
          onClick: onBackward,
        },
      }}
      body={body}
    />
  );
};

export default RentModal;
