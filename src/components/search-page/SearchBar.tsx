import React, { Fragment, useMemo, useState } from "react";
import ListingSearchInput from "./ListingSearchInput";
import PriceRange from "./PriceRange";
import CategorySelect from "./CategorySelect";
import CountrySelect from "../inputs/CountrySelect";
import { SingleCountryType } from "@/hooks/useCountry";
import { IconType } from "react-icons";
import { debounce } from "lodash";
import useListings from "@/hooks/useListings";
import SortSelect, { listingSortType } from "./SortSelect";
import FilterSelect, { listingFilterType } from "./FilterSelect";
import { AnimatePresence, motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const SearchBar = ({
  onChange,
}: {
  onChange: (params: {
    min?: number;
    max?: number;
    search?: string;
    category?: string;
    location?: string;
    sort?: listingSortType;
    filter?: listingFilterType;
  }) => void;
}) => {
  const { maxPrice } = useListings();
  const [search, setSearch] = useState("");
  const [priceRange, setRange] = useState({ min: 0, max: maxPrice / 2 });
  const [location, setLocation] = useState<SingleCountryType | undefined>(
    undefined
  );
  const [category, setCategory] = useState<
    { icon: IconType; label: string; value: string } | undefined
  >(undefined);
  const [selectedSort, setSort] = useState<
    { type: listingSortType; label: string; icon: IconType } | undefined
  >(undefined);
  const [selectedFilter, setFilter] = useState<
    { type: listingFilterType; label: string; icon: IconType } | undefined
  >(undefined);

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    setRange(range);
  };

  const debounceFilter = debounce((val) => {
    onChange({
      category: val.category?.label,
      location: val.location?.value,
      max: val.priceRange.max,
      min: val.priceRange.min,
      search: !!val.search ? val.search.trim() : undefined,
      sort: !!val.selectedSort?.type ? val.selectedSort.type : undefined,
      filter: !!val.selectedFilter?.type ? val.selectedFilter.type : undefined,
    });
  }, 2000);

  useMemo(() => {
    debounceFilter({
      priceRange,
      search,
      category,
      location,
      selectedSort,
      selectedFilter,
    });
    return () => {
      debounceFilter.cancel();
    };
  }, [search, category, location, priceRange, selectedSort, selectedFilter]);

  const isSearching = useMemo(() => {
    return Boolean(
      !!search || !!location || !!category || !!selectedSort || !!selectedFilter
    );
  }, [search, priceRange, location, category, selectedSort, selectedFilter]);

  const searchedValues = useMemo(() => {
    const values: { icon: IconType; label: string; value: string }[] = [];
    if (search.length > 0) {
      values.push({ icon: BiSearch, label: "search", value: search });
    }
    if (!!category) {
      values.push({
        icon: category.icon,
        label: "category",
        value: category.value,
      });
    }
    if (!!location) {
      values.push({
        icon: IoLocationOutline,
        label: "location",
        value: `${location.label},${location.region}`,
      });
    }
    if (!!selectedFilter) {
      values.push({
        icon: selectedFilter.icon,
        label: "filter by",
        value: selectedFilter.label,
      });
    }
    if (!!selectedSort) {
      values.push({
        icon: selectedSort.icon,
        label: "sorted by",
        value: selectedSort.label,
      });
    }
    values.push({
      icon: MdAttachMoney,
      label: "price range",
      value: `from $${priceRange.min} to $${priceRange.max}`,
    });
    return values;
  }, [search, priceRange, location, category, selectedSort, selectedFilter]);

  return (
    <>
      <section className="flex items-center flex-wrap justify-start gap-3 min-w-full max-w-full">
        <ListingSearchInput
          search={search}
          setSearch={(val) => setSearch(val)}
        />
        <PriceRange
          MAX={maxPrice}
          handlePriceRangeChange={handlePriceRangeChange}
        />
        <CategorySelect
          className="min-w-full md:min-w-[300px] "
          value={category}
          onChange={(val) => setCategory(val as any)}
        />
        <CountrySelect
          className="min-w-full md:min-w-[300px]"
          onChange={(val) => setLocation(val)}
          value={location}
        />
        <SortSelect value={selectedSort} onChange={setSort} />
        <FilterSelect value={selectedFilter} onChange={setFilter} />
      </section>
      <AnimatePresence>
        {isSearching && (
          <motion.section
            initial={{ opacity: 0, translateY: 10 }}
            exit={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="min-w-full max-w-full px-2 md:px-8 flex flex-wrap items-center justify-center gap-5"
          >
            {searchedValues.map(({ label, icon: Icon, value }, i) => (
              <Fragment key={i}>
                <div className="max-w-fit flex items-center justify-center gap-1">
                  <span className="text-neutral-500 dark:text-neutral-400 capitalize flex items-center justify-start gap-[3px] text-sm font-light">
                    <Icon size={20} /> {label} :
                  </span>
                  <span className="text-black dark:text-white capitalize flex items-center justify-start text-sm font-semibold">
                    {value}
                  </span>
                </div>
              </Fragment>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;
