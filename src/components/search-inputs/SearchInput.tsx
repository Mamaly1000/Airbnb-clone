import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchInput = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (val: string) => void;
}) => {
  return (
    <div className="peer min-w-full md:min-w-[200px] min-h-[65.6px] max-h-[65.6px] flex items-center justify-center bg-transparent relative z-0 rounded-[5px]">
      <BiSearch
        size={"25px"}
        className="absolute top-[20px] left-3 text-neutral-300 peer-hover:text-neutral-400"
      />
      <input
        placeholder="search #Home..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="min-h-[65.6px] max-h-[65.6px] px-3 py-2 min-w-full max-w-full rounded-[5px] ps-[40px] text-black placeholder:text-neutral-500 border-[1px] border-neutral-300 hover:border-neutral-400 dark:placeholder:text-neutral-400 dark:text-white bg-transparent dark:hover:border-neutral-400 focus:border-black dark:focus:border-neutral-400 transition-all"
      />
    </div>
  );
};

export default SearchInput;
