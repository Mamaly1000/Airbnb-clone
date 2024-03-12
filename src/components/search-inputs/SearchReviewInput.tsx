"use client";

import { debounce } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

const SearchReviewInput = ({
  className,
  prevValue,
}: {
  prevValue?: string;
  className?: string;
}) => {
  const [search, setSearch] = useState(prevValue || "");
  const InputRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
  const pathname = usePathname();

  const router = useRouter();
  const searchDebounce = debounce((val) => {
    if (prevValue !== search) {
      const query = qs.stringifyUrl({
        url: pathname!,
        query:
          search.length > 0
            ? {
                search: val?.trim(),
              }
            : {},
      });
      router.push(query, {
        scroll: false,
      });
    }
  }, 3000);

  useMemo(() => {
    searchDebounce(search);
    return () => {
      searchDebounce.cancel();
    };
  }, [search]);

  return (
    <section
      className={twMerge(
        "relative min-w-full max-w-full min-h-[45px] max-h-[45px] rounded-full flex items-center justify-center ",
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        InputRef.current?.focus();
      }}
    >
      <BiSearch size={"25px"} className="absolute top-[10px] left-3 " />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={InputRef}
        className="min-h-[45px] max-h-[45px] px-3 py-2 min-w-full max-w-full rounded-full  ps-[40px] text-black placeholder:text-neutral-500 border-[2px] border-neutral-400 dark:placeholder:text-neutral-400 dark:text-white bg-transparent hover:border-black dark:hover:border-rose-500 focus:border-black dark:focus:border-rose-500 transition-all"
        placeholder="Search reviews"
        type="text"
      />
    </section>
  );
};

export default SearchReviewInput;
