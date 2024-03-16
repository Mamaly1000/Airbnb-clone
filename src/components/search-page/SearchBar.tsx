import React, { useMemo, useState } from "react";
import ListingSearchInput from "./ListingSearchInput";
import PriceRange from "./PriceRange";
import CategorySelect from "./CategorySelect";
import CountrySelect from "../inputs/CountrySelect";
import { SingleCountryType } from "@/hooks/useCountry";
import { IconType } from "react-icons";
import { debounce } from "lodash";
import useListings from "@/hooks/useListings";

const SearchBar = ({
  onChange,
}: {
  onChange: (params: {
    min?: number;
    max?: number;
    search?: string;
    category?: string;
    location?: string;
  }) => void;
}) => {
  const { maxPrice } = useListings();
  const [priceRange, setRange] = useState({ min: 0, max: maxPrice });
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

  const debounceFilter = debounce((val) => {
    onChange({
      category: val.category?.label,
      location: val.location?.value,
      max: val.priceRange.max,
      min: val.priceRange.min,
      search: !!val.search ? val.search : undefined,
    });
  }, 2000);

  useMemo(() => {
    debounceFilter({ priceRange, search, category, location });
    return () => {
      debounceFilter.cancel();
    };
  }, [search, category, location, priceRange]);

  return (
    <section className="flex items-center flex-wrap justify-start gap-3 min-w-full max-w-full">
      <ListingSearchInput search={search} setSearch={(val) => setSearch(val)} />
      <PriceRange MAX={maxPrice} handlePriceRangeChange={handlePriceRangeChange} />
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
