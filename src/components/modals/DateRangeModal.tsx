"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { useRangeDateModal } from "@/hooks/useRangeDateModal";
import Heading from "../form/Heading";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import { sub } from "date-fns";

const initDate: Range = {
  startDate: sub(new Date(), { days: 10 }),
  endDate: new Date(),
  key: "selected",
};

const DateRangeModal = () => {
  const {
    onClose,
    isOpen,
    Date: currentDate,
    setDate: onChange,
  } = useRangeDateModal();
  const [date, setDate] = useState<Range>(currentDate);
  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) onClose();
      }}
      body={
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="set a date range"
            subtitle="you can set a range of date."
          />
          <Calendar
            onChnage={(val) => {
              setDate(val.selected);
            }}
            value={date}
            minDate={false}
          />
        </div>
      }
      header={{
        title: "setting date range",
        close: () => {
          onClose();
          setDate(initDate);
        },
      }}
      footer={{
        primary: {
          label: "update now",
          onClick: () => {
            onChange(date);
            onClose();
            setDate(initDate);
          },
        },
      }}
    />
  );
};

export default DateRangeModal;
