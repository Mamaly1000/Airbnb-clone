"use client";
import useCountry, { SingleCountryType } from "@/hooks/useCountry";
import React from "react";
import Select from "react-select";

const CountrySelect = ({
  onChange,
  value,
}: {
  value?: SingleCountryType;
  onChange: (value: SingleCountryType) => void;
}) => {
  const { getAll } = useCountry();
  return (
    <div>
      <Select
        placeholder="AnyWhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(newval) => {
          onChange(newval as SingleCountryType);
        }}
        formatOptionLabel={(data) => {
          return (
            <div className="flex flex-row px-1">
              {data.label},{" "}
              <span className="text-neutral-500 ml-1">{data.region}</span>
            </div>
          );
        }}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
