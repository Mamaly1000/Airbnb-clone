"use client";
import React from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../inputs/Button";

const ListingReservation = ({
  dateRange,
  disabledDate,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
  disabled,
}: {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabled?: boolean;
  onChangeDate: (val: Range) => void;
  onSubmit: () => void;
  disabledDate: Date[];
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden drop-shadow-2xl">
      <div className="flex flex-row gap-1 items-center p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDate}
        onChnage={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4 ">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className=" capitalize p-4 flex flex-row items-center justify-between font-semibold text-lg ">
        <div>total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
