import React, { useState } from "react";
import ListingSearchInput from "./ListingSearchInput";
import PriceRange from "./PriceRange";
import CategorySelect from "./CategorySelect";
import CountrySelect from "../inputs/CountrySelect";
import { SingleCountryType } from "@/hooks/useCountry";
import { IconType } from "react-icons";

const SearchBar = () => {
  const [priceRange, setRange] = useState({ min: 0, max: 300 });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<
    { icon: IconType; label: string } | undefined
  >(undefined);
  const [location, setLocation] = useState<SingleCountryType | undefined>(
    undefined
  );
  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    setRange(range);
  };

  return (
    <section className="flex items-center flex-wrap justify-start gap-3 min-w-full max-w-full">
      <ListingSearchInput search={search} setSearch={(val) => setSearch(val)} />
      <PriceRange handlePriceRangeChange={handlePriceRangeChange} />
      <CategorySelect
        className="min-w-full md:min-w-[300px] "
        value={category}
        onChange={(val) => setCategory(val)}
      />
      <CountrySelect
        className="min-w-full md:min-w-[300px]"
        onChange={(val) => setLocation(val)}
        value={location}
      />
    </section>
  );
};

export default SearchBar;
