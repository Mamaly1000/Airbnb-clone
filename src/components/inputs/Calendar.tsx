"use client";
import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
const Calendar = ({
  value,
  disabledDates,
  onChnage,
}: {
  value: Range;
  disabledDates?: Date[];
  onChnage: (value: RangeKeyDict) => void;
}) => {
  return (
    <DateRange
      rangeColors={["rgb(244 63 94 / var(--tw-bg-opacity))"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChnage}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
