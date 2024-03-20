"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { useReservationRangeDateModal } from "@/hooks/useReservationRangeDateModal";
import Heading from "../form/Heading";
import { useReservationTable } from "@/hooks/useReservationTable";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";

const ReservationDateRangeModal = () => {
  const { onClose, isOpen } = useReservationRangeDateModal();
  const { DisplayDate, setDate: setDateRange } = useReservationTable();
  const [date, setDate] = useState<Range>(DisplayDate);
  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) onClose();
      }}
      body={
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="set your reservations date range"
            subtitle="you can set a range of date for reservation."
          />
          <Calendar
            onChnage={(val) => {
              setDate(val.selected);
            }}
            value={date}
            minDate={true}
          />
        </div>
      }
      header={{
        title: "Update reservation",
        close: () => {
          onClose();
          setDate(DisplayDate);
        },
      }}
      footer={{
        primary: {
          label: "update now",
          onClick: () => {
            setDateRange(date);
            onClose();
          },
        },
      }}
    />
  );
};

export default ReservationDateRangeModal;
