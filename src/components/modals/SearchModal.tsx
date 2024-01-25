"use client";
import useSearchModal from "@/hooks/useSearchModal";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useSearchParams, useRouter } from "next/navigation";
import { Range } from "react-date-range";
import { initialDateRange } from "../listings/ListingClient";
import dynamic from "next/dynamic";
import { SingleCountryType } from "@/hooks/useCountry";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../form/Heading";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const [step, setSteps] = useState(STEPS.LOCATION);
  const [guestCount, setGuestcount] = useState(1);
  const [roomCount, setRoomcount] = useState(1);
  const [bathroomCount, setBathroomcount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [location, setLocation] = useState<SingleCountryType>();
  const params = useSearchParams();
  const router = useRouter();
  const searchModal = useSearchModal();
  // @ts-ignore
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        ssr: false,
      }),
    //@ts-ignore
    []
  );

  const onBackward = useCallback(() => {
    if (step > STEPS.LOCATION) {
      setSteps((prev) => prev - 1);
    }
  }, [step, setSteps]);
  const onForward = useCallback(() => {
    if (step < STEPS.INFO) {
      setSteps((prev) => prev + 1);
    }
  }, [step, setSteps]);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onForward();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );
    setSteps(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    router,
    step,
    searchModal,
    location,
    roomCount,
    guestCount,
    bathroomCount,
    dateRange,
    onForward,
    params,
  ]);

  const ActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Apply Filters";
    }
    return "Next";
  }, [step]);
  const SecondaryLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "back";
  }, [step]);

  const body = () => {
    if (step === STEPS.LOCATION) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do you wanna go?"
            subtitle="Find the perfect location!"
          />
          <CountrySelect
            onChange={(val) => setLocation(val)}
            value={location}
          />
          <hr />
          <Map center={location?.latlng} />
        </div>
      );
    }
    if (step === STEPS.DATE) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="when do you want to plan a trip?"
            subtitle="Make sure everyone are free!"
          />
          <Calendar
            onChnage={(val) => setDateRange(val.selection)}
            value={dateRange}
          />
        </div>
      );
    }
    if (step === STEPS.INFO) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="More Information"
            subtitle="Find your perfect place!"
          />
          <Counter
            onChange={(val) => setGuestcount(val)}
            title="Guests"
            value={guestCount}
            subTitle="how many guests do you have?"
          />
          <Counter
            onChange={(val) => setRoomcount(val)}
            title="Rooms"
            value={roomCount}
            subTitle="how many rooms do you want?"
          />
          <Counter
            onChange={(val) => setBathroomcount(val)}
            title="Bathrooms"
            value={bathroomCount}
            subTitle="how many bathroom is sufficient?"
          />
        </div>
      );
    }
    return <></>;
  };

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onChange={(val) => {
        if (!val) {
          searchModal.onClose();
        }
      }}
      header={{ title: "Filters" }}
      footer={{
        primary: {
          label: ActionLabel,
          onClick: onSubmit,
        },
        secondary: {
          label: SecondaryLabel,
          onClick: onBackward,
          type: "form",
        },
      }}
      body={body()}
    />
  );
};

export default SearchModal;
