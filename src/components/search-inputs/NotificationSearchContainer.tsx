"use client";
import {
  NotificationFilterTypes,
  NotificationSortTypes,
} from "@/hooks/useNotifications";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import SearchInput from "./SearchInput";
import CustomSelect from "../inputs/CustomSelect";
import { twMerge } from "tailwind-merge";
import { FaArrowDownShortWide } from "react-icons/fa6";
import {
  FaSortAmountUp,
  FaSortNumericDown,
  FaSortNumericUp,
} from "react-icons/fa";
import {
  TbHomeCancel,
  TbHomeDollar,
  TbHomeEco,
  TbHomeEdit,
  TbHomeHeart,
  TbHomeRibbon,
} from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline, IoHeartDislike } from "react-icons/io5";
import { debounce } from "lodash";
import qs from "query-string";
import { useRouter } from "next/navigation";

const sortItems: {
  label: string;
  value: NotificationSortTypes;
  icon: IconType;
}[] = [
  {
    label: "lowest total amount",
    value: "LOW AMOUNT",
    icon: FaArrowDownShortWide,
  },
  {
    label: "top total amount",
    value: "TOP AMOUNT",
    icon: FaSortAmountUp,
  },
  {
    label: "newest",
    value: "NEWEST",
    icon: FaSortNumericUp,
  },
  {
    label: "oldest",
    value: "OLDEST",
    icon: FaSortNumericDown,
  },
];
const filterItems: {
  label: string;
  value: NotificationFilterTypes;
  icon: IconType;
}[] = [
  { label: "booked", value: "BOOKING", icon: TbHomeRibbon },
  { label: "cenceled", value: "CANCELING", icon: TbHomeCancel },
  {
    label: "completed booking",
    value: "COMPLETED-RESERVATIONS",
    icon: TbHomeDollar,
  },
  { label: "disliked", value: "DISLIKING", icon: IoHeartDislike },
  { label: "liked", value: "LIKING", icon: MdOutlineFavoriteBorder },
  { label: "rebooked", value: "REBOOKING", icon: TbHomeEco },
  { label: "reviewed", value: "REVIEW", icon: TbHomeHeart },
  { label: "seen", value: "SEEN", icon: IoEyeOutline },
  { label: "unseen", value: "UNSEEN", icon: IoEyeOffOutline },
  { label: "updated bookings", value: "UPDATING", icon: TbHomeEdit },
];
const NotificationSearchContainer = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedSort, setSort] = useState<
    | {
        icon: IconType;
        value: NotificationSortTypes;
        label: string;
      }
    | undefined
  >(undefined);
  const [selectedFilter, setFilter] = useState<
    | {
        icon: IconType;
        value: NotificationFilterTypes;
        label: string;
      }
    | undefined
  >(undefined);

  const searchDebounce = debounce((val) => {
    const query = qs.stringifyUrl({
      url: "/mydashboard/notifications",
      query: val,
    });
    router.push(query);
  }, 2000);

  useEffect(() => {
    searchDebounce({
      search: !!search ? search : undefined,
      filter: selectedFilter?.value,
      sort: selectedSort?.value,
    });
    return () => {
      searchDebounce.cancel();
    };
  }, [search, selectedFilter, selectedSort]);

  return (
    <section className="min-w-full max-w-full flex flex-wrap items-center justify-start gap-3 ">
      <SearchInput search={search} setSearch={setSearch} />
      <CustomSelect
        onChange={(newVal) => setSort(newVal as any)}
        value={selectedSort}
        options={sortItems}
        className="min-w-full md:min-w-[300px]"
        formatOptionLabel={(data) => {
          const Icon = data.icon;
          return (
            <div
              className={twMerge(
                "min-w-full max-w-full flex items-center justify-start gap-1 capitalize",
                selectedSort?.value === data.value
                  ? "text-neutral-600 dark:text-neutral-200 "
                  : "text-black dark:text-white"
              )}
            >
              <Icon size={20} />
              {data.label}
            </div>
          );
        }}
        isClearable
        placeholder="sort by..."
      />
      <CustomSelect
        placeholder="filter by..."
        onChange={(newVal) => setFilter(newVal as any)}
        value={selectedFilter}
        options={filterItems}
        className="min-w-full md:min-w-[300px]"
        formatOptionLabel={(data) => {
          const Icon = data.icon;
          return (
            <div
              className={twMerge(
                "min-w-full max-w-full flex items-center justify-start gap-1 capitalize",
                selectedSort?.value === data.value
                  ? "text-neutral-600 dark:text-neutral-200 "
                  : "text-black dark:text-white"
              )}
            >
              <Icon size={20} />
              {data.label}
            </div>
          );
        }}
        isClearable
      />
    </section>
  );
};

export default NotificationSearchContainer;
