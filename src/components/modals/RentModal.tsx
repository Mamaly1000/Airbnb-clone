"use client";
import useRentModal from "@/hooks/useRentModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../form/Heading";
import { categories } from "../categories/Categories";
import CategoryBox from "../categories/CategoryBox";
import { twMerge } from "tailwind-merge";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import toast from "react-hot-toast";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setSteps] = useState(STEPS.CATEGORY);
  const [isLoading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    reset,
    getValues,
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
  const watchingLocation = watch("location");
  const watchingGuestCount = watch("guestCount");
  const watchingRoomCount = watch("roomCount");
  const watchingBathroomCount = watch("bathroomCount");
  const watchingImageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        ssr: false,
      }),
    [watchingLocation]
  );
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const body = () => {
    if (step === STEPS.CATEGORY) {
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
    }
    if (step === STEPS.LOCATION) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="where is your place location?"
            subtitle="help guests find you!"
          />
          <CountrySelect
            value={watchingLocation}
            onChange={(val) => {
              setCustomValue("location", val);
            }}
          />
          <Map center={watchingLocation?.latlng} />
        </div>
      );
    }
    if (step === STEPS.INFO) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="share some basics about your place"
            subtitle="what amenities do you have?"
          />
          <Counter
            onChange={(val) => setCustomValue("guestCount", val)}
            value={watchingGuestCount}
            title="guests"
            subTitle="how many guests do you allow?"
          />
          <hr />
          <Counter
            onChange={(val) => setCustomValue("roomCount", val)}
            value={watchingRoomCount}
            title="Rooms"
            subTitle="how many rooms do you have?"
          />
          <hr />
          <Counter
            onChange={(val) => setCustomValue("bathroomCount", val)}
            value={watchingBathroomCount}
            title="bATHROOMS"
            subTitle="how many bathrooms do you have?"
          />
        </div>
      );
    }
    if (step === STEPS.IMAGES) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your Property(home,apartment,condo)"
            subtitle="Show quests what your place looks like!"
          />
          <ImageUpload
            onChange={(val) => {
              toast.success("image uploaded successfully!");
              setCustomValue("imageSrc", val);
            }}
            value={watchingImageSrc}
          />
        </div>
      );
    }
    if (step === STEPS.DESCRIPTION) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="how would you describe your place?"
            subtitle="short and sweet works best!"
          />
          <Input
            id="title"
            label="title"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />
          <hr />
          <Input
            id="description"
            label="description"
            register={register}
            errors={errors}
            disabled={isLoading}
            required
          />
        </div>
      );
    }
    if (step === STEPS.PRICE) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="now, set your price"
            subtitle="how much do you charge per night?"
          />
          <Input
            id="price"
            label="price"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice
            type="number"
            required
          />
        </div>
      );
    }
    return <></>;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    axios
      .post("/api/listings", data)
      .then((res) => {
        console.log(res.data.listing);
        toast.success(res.data.message);
        reset();
        setSteps(STEPS.CATEGORY);
        rentModal.onClose();
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong!");
      })
      .finally(() => {
        setLoading(false);
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

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onChange={(val) => {
        if (!val) {
          rentModal.onClose();
        }
      }}
      header={{
        title: "Airbnb your home!",
      }}
      footer={{
        primary: {
          label: primaryLabel,
          onClick: step === STEPS.PRICE ? handleSubmit(onSubmit) : onForward,
        },
        secondary: {
          label: secondaryLabel,
          onClick: onBackward,
          type: "form",
        },
      }}
      body={body()}
      disable={isLoading}
    />
  );
};

export default RentModal;
