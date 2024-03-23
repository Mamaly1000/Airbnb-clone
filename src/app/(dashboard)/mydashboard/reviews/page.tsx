"use client";
import useReviews from "@/hooks/useReviews";
import { useReviewTable } from "@/hooks/useReviewsTable";
import React, { useCallback, useMemo } from "react";
import { SingleTable_TH_type } from "@/components/table/table-shared-components/TableHeaderLabel";
import { ReviewFilterTypes, ReviewSortTypes } from "@/types/ReviewTypes";
import Table from "@/components/table/Table";
import { BiFilter, BiHome, BiUser } from "react-icons/bi";
import { uniq, without } from "lodash";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useRangeDateModal } from "@/hooks/useRangeDateModal";
import ReviewRow from "@/components/table/table-row/ReviewRow";
import { useReviewFilterModal } from "@/hooks/useReviewsFilterModal";

export const ReviewsfilterItems = [
  { label: "rate", icon: MdOutlineStarPurple500, value: "RATING" },
  { label: "search", icon: IoSearchOutline, value: "SEARCH" },
  { label: "user", icon: BiUser, value: "USER_ID" },
  { label: "property", value: "LISTING_ID", icon: BiHome },
];

const ReviewsPage = () => {
  const { searchParams, hiddenCols, setQuery, setHiddenCols } =
    useReviewTable();
  const { onOpen: openReviewFilterModal } = useReviewFilterModal();
  const { onOpen: daterangeOpen, Date } = useRangeDateModal();
  const { isLoading, pagination, reviews } = useReviews({
    ...searchParams,
    startDate: Date.startDate,
    endDate: Date.endDate,
  });
  const labelOnclick = useCallback(
    (type: ReviewSortTypes) => {
      if (!isLoading) {
        if (searchParams.sort !== type) {
          setQuery({ ...searchParams, sort: type, sortIn: "desc" });
        } else if (searchParams.sort === type) {
          if (searchParams.sortIn === "asc") {
            setQuery({ ...searchParams, sort: type, sortIn: "desc" });
          }
          if (searchParams.sortIn === "desc") {
            setQuery({ ...searchParams, sort: type, sortIn: "asc" });
          }
        }
      }
    },
    [isLoading]
  );
  const labels: SingleTable_TH_type[] = [
    {
      colunm_type: "USER_NAME",
      label: "user",
      sort: {
        isActive: searchParams.sort === "USER_NAME",
        type: searchParams.sortIn,
      },
      className: "min-w-[200px] max-w-[200px] sticky top-0 -left-3 bg-neutral-300 dark:bg-neutral-900 z-10",
      disabled: isLoading,
      display: !hiddenCols.includes("USER_NAME"),
      onClick: () => labelOnclick("USER_NAME"),
    },
    {
      colunm_type: "CREATED_AT",
      label: "created at",
      sort: {
        isActive: searchParams.sort === "CREATED_AT",
        type: searchParams.sortIn,
      },
      className: "min-w-[220px] max-w-[220px]",
      disabled: isLoading,
      display: !hiddenCols.includes("CREATED_AT"),
      onClick: () => labelOnclick("CREATED_AT"),
    },
    {
      colunm_type: "BODY",
      label: "review",
      sort: {
        isActive: searchParams.sort === "BODY",
        type: searchParams.sortIn,
      },
      className: "min-w-[300px] max-w-[300px]",
      disabled: isLoading,
      display: !hiddenCols.includes("BODY"),
      onClick: () => labelOnclick("BODY"),
    },
    {
      colunm_type: "LISTING_NAME",
      label: "property name",
      sort: {
        isActive: searchParams.sort === "LISTING_NAME",
        type: searchParams.sortIn,
      },
      className: "min-w-[300px] max-w-[300px]",
      disabled: isLoading,
      display: !hiddenCols.includes("LISTING_NAME"),
      onClick: () => labelOnclick("LISTING_NAME"),
    },
    {
      colunm_type: "CLEANLINESS",
      label: "cleanliness",
      sort: {
        isActive: searchParams.sort === "CLEANLINESS",
        type: searchParams.sortIn,
      },
      disabled: isLoading,
      display: !hiddenCols.includes("CLEANLINESS"),
      onClick: () => labelOnclick("CLEANLINESS"),
    },
    {
      colunm_type: "ACCURACY",
      label: "accuracy",
      sort: {
        isActive: searchParams.sort === "ACCURACY",
        type: searchParams.sortIn,
      },
      disabled: isLoading,
      display: !hiddenCols.includes("ACCURACY"),
      onClick: () => labelOnclick("ACCURACY"),
    },
    {
      colunm_type: "CHECK_IN",
      label: "check in",
      sort: {
        isActive: searchParams.sort === "CHECK_IN",
        type: searchParams.sortIn,
      },
      disabled: isLoading,
      display: !hiddenCols.includes("CHECK_IN"),
      onClick: () => labelOnclick("CHECK_IN"),
    },
    {
      colunm_type: "COMMUNICATION",
      label: "communication",
      sort: {
        isActive: searchParams.sort === "COMMUNICATION",
        type: searchParams.sortIn,
      },
      disabled: isLoading,
      display: !hiddenCols.includes("COMMUNICATION"),
      onClick: () => labelOnclick("COMMUNICATION"),
    },
    {
      colunm_type: "LOCATION",
      label: "location",
      sort: {
        isActive: searchParams.sort === "LOCATION",
        type: searchParams.sortIn,
      },
      disabled: isLoading,
      display: !hiddenCols.includes("LOCATION"),
      onClick: () => labelOnclick("LOCATION"),
    },
    {
      colunm_type: "VALUE",
      label: "value",
      sort: {
        isActive: searchParams.sort === "VALUE",
        type: searchParams.sortIn,
      },
      className: "sticky top-0 -left-3 dark:bg-neutral-900",
      disabled: isLoading,
      display: !hiddenCols.includes("VALUE"),
      onClick: () => labelOnclick("VALUE"),
    },
    {
      colunm_type: "RATING",
      label: "overall rate",
      sort: {
        isActive: searchParams.sort === "RATING",
        type: searchParams.sortIn,
      },
      disabled: isLoading,
      display: !hiddenCols.includes("RATING"),
      onClick: () => labelOnclick("RATING"),
      className:
        "flex items-center justify-start md:justify-end  lg:sticky top-0 -right-3 bg-neutral-300 dark:bg-neutral-900 ",
    },
  ];
  const tableFilterOptions = useMemo(() => {
    let arr = [];
    if (searchParams.filterType === "RATING") {
      arr.push(ReviewsfilterItems.find((i) => i.value === "RATING")!);
    }
    if (!!searchParams.userId) {
      arr.push(ReviewsfilterItems.find((i) => i.value === "USER_ID")!);
    }
    if (!!searchParams.listingId) {
      arr.push(ReviewsfilterItems.find((i) => i.value === "LISTING_ID")!);
    }
    if (!!searchParams.search) {
      arr.push(ReviewsfilterItems.find((i) => i.value === "SEARCH")!);
    }
    return arr;
  }, [searchParams]);
  return (
    <Table
      tableHeaderLabels={labels}
      header={{
        heading: {
          subtitle:
            "there is a list of reviews that your clients made for their reservations.",
          title: "Reviews",
        },
        headingActions: {
          calendar: {
            date: Date,
            setDate: () => {
              daterangeOpen();
            },
          },
        },
      }}
      controllSection={{
        colums_control: {
          label: `display columns`,
          columns: labels.map((label) => ({
            label: "hide " + label.label,
            onClick: () => {
              if (label.display) {
                setHiddenCols(
                  uniq([...hiddenCols, label.colunm_type] as ReviewSortTypes[])
                );
                if (searchParams.sort === label.colunm_type) {
                  setQuery({
                    ...searchParams,
                    sort: undefined,
                    sortIn: "desc",
                  });
                }
              } else {
                setHiddenCols(
                  without(hiddenCols, label.colunm_type) as ReviewSortTypes[]
                );
              }
            },
            isActive: hiddenCols.includes(label.colunm_type as ReviewSortTypes),
          })),
        },
        title: `showing ${pagination?.totalReviews || 0} reviews`,
      }}
      filterSectionActions={{
        onResetTableFilter: () => {
          setQuery({
            ...searchParams,
            filterType: undefined,
            min: undefined,
            max: undefined,
            listingId: undefined,
            search: undefined,
            listing_name: undefined,
            page: 1,
            userId: undefined,
          });
        },
        onDeselectTableFilter: (
          item: unknown & { value: ReviewFilterTypes }
        ) => {
          if (
            item.value === "CHECK_IN" ||
            item.value === "CLEANLINESS" ||
            item.value === "ACCURACY" ||
            item.value === "COMMUNICATION" ||
            item.value === "LOCATION" ||
            item.value === "RATING" ||
            item.value === "VALUE"
          ) {
            setQuery({
              ...searchParams,
              filterType: undefined,
              min: undefined,
              max: undefined,
            });
          }
          if (item.value === "LISTING_ID") {
            setQuery({
              ...searchParams,
              listingId: undefined,
              filterType: undefined,
            });
          }
          if (item.value === "USER_ID") {
            setQuery({
              ...searchParams,
              filterType: undefined,
              userId: undefined,
            });
          }
          if (item.value === "SEARCH") {
            setQuery({
              ...searchParams,
              filterType: undefined,
              search: undefined,
            });
          }
        },
        tableFilterOptions,
        filterButton: {
          label: "select filter",
          icon: BiFilter,
          onClick: () => openReviewFilterModal(),
        },
      }}
      tableBody={{
        rows: reviews.map((r) => ({
          data: r,
        })),
        isLoading,
        RowElement: ReviewRow,
      }}
      footer={{
        footerItemOnclick: (page) => {
          if (page !== searchParams.page) {
            setQuery({ ...searchParams, page });
          }
        },
        isLoading,
        pagination: {
          ...pagination,
          total: pagination?.totalReviews || 1,
          totalPages: pagination?.maxPages || 1,
        },
      }}
    />
  );
};

export default ReviewsPage;
