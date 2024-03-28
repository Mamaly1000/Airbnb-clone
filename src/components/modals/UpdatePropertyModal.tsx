import { useUpdateProperty } from "@/hooks/useUpdateProperty";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { STEPS } from "./RentModal";
import dynamic from "next/dynamic";
import Heading from "../form/Heading";
import { categories } from "../categories/Categories";
import CategoryBox from "../categories/CategoryBox";
import { twMerge } from "tailwind-merge";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import toast from "react-hot-toast";
import Input from "../inputs/Input";
import axios from "axios";
import useProperty from "@/hooks/useProperty";
import Loader from "../ui/Loader";
import useCountry from "@/hooks/useCountry";
import useListings from "@/hooks/useListings";

const UpdatePropertyModal = () => {
  const { id, onClose, params } = useUpdateProperty();
  const { property, mutate, isLoading: propertyLoading } = useProperty(id);
  const { mutate: ListingsMutate } = useListings(params);
  const { getByValue } = useCountry();

  const router = useRouter();
  const [step, setSteps] = useState(STEPS.CATEGORY);
  const [isLoading, setLoading] = useState(false);
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
  const watchingLocation = watch("location");
  const watchingGuestCount = watch("guestCount");
  const watchingRoomCount = watch("roomCount");
  const watchingBathroomCount = watch("bathroomCount");
  const watchingImageSrc = watch("imageSrc");
  // @ts-ignore
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        ssr: false,
      }),
    // @ts-ignore
    []
  );
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const body = () => {
    if (propertyLoading) {
      return (
        <>
          <Heading
            title="Please wait"
            subtitle="please wait for loading your property data"
          />
          <Loader className="min-w-full h-[200px] max-h-[200px] min-h-[200px] flex items-center justify-center dark:bg-neutral-900" />
        </>
      );
    }
    if (step === STEPS.CATEGORY) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="which of these categories can perfectly describes your place?"
            subtitle="Pick a category"
          />
          <div className="grid p-1  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[30vh] md:max-h-[50vh]  ">
            {categories.map((c) => {
              return (
                <CategoryBox
                  className={twMerge(
                    "border-[1px] rounded-lg hover:text-rose-500 hover:border-rose-500 ",
                    watchingCategory == c.label
                      ? "border-rose-500 text-rose-500 "
                      : "border-neutral-300 dark:border-neutral-500 text-neutral-500  "
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
          />
          <hr />
          <Counter
            onChange={(val) => setCustomValue("roomCount", val)}
            value={watchingRoomCount}
            title="Rooms"
          />
          <hr />
          <Counter
            onChange={(val) => setCustomValue("bathroomCount", val)}
            value={watchingBathroomCount}
            title="bathrooms"
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
    if (property)
      axios
        .post(`/api/properties/${property.id}`, data)
        .then((res) => {
          toast.success(res.data.message);
          reset();
          setSteps(STEPS.CATEGORY);
          onClose();
          mutate();
          ListingsMutate();
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
      return "update";
    }
    return "next";
  }, [step]);
  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "back";
  }, [step]);

  useEffect(() => {
    if (!!id && !!property) {
      reset({
        ...property,
        location: getByValue(property.locationValue),
      });
    }
  }, [property, id]);

  return (
    <Modal
      isOpen={!!id}
      onChange={(val) => {
        if (!val) {
          onClose();
          setSteps(STEPS.CATEGORY);
        }
      }}
      header={{
        title: "Update your property information!",
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

export default UpdatePropertyModal;
