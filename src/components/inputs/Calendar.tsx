"use client";
import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
const Calendar = ({
  value,
  disabledDates,
  onChnage,
  minDate,
}: {
  minDate?: boolean;
  value: Range;
  disabledDates?: Date[];
  onChnage: (value: RangeKeyDict) => void;
}) => {
  return (
    <DateRange
      rangeColors={["rgb(244 63 94 / var(--tw-bg-opacity))"]}
      ranges={[value]}
      date={new Date()}
      classNames={{
        calendarWrapper:
          "bg-white dark:bg-neutral-800 text-black dark:text-white",
        dayNumber: " text-white bg-transparent font-medium ",
        nextButton: "dark:bg-neutral-900 dark:text-white",
        nextPrevButton: "dark:bg-neutral-900 dark:text-white",
        dayPassive: "opacity-50 text-gray-400 bg-neutral-500",
        dayDisabled: "bg-red-100 opacity-50",
      }}
      onChange={onChnage}
      direction="vertical"
      showDateDisplay={false}
      minDate={!minDate ? new Date() : undefined}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
