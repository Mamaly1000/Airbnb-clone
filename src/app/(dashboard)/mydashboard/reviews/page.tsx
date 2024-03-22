"use client";
import useReviews from "@/hooks/useReviews";
import { useReviewTable } from "@/hooks/useReviewsTable";
import React, { useCallback } from "react";
import { SingleTable_TH_type } from "../../../../components/table/table-shared-components/TableHeaderLabel";
import { ReviewSortTypes } from "@/types/ReviewTypes";
import Table from "@/components/table/Table";
import { BiFilter } from "react-icons/bi";
import { tableFilterOption } from "@/components/table/table-heading/TableFilterSection";

const filterItems: tableFilterOption[] = [];

const ReviewsPage = () => {
  const { searchParams, hiddenCols, setQuery } = useReviewTable();
  const { isLoading, pagination, reviews } = useReviews(searchParams);
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
      colunm_type: "CREATED_AT",
      label: "created at",
      sort: {
        isActive: searchParams.sort === "CREATED_AT",
        type: searchParams.sortIn,
      },
      className: "sticky top-0 -left-3 bg-neutral-300 dark:bg-neutral-900 z-10",
      disabled: isLoading,
      display: hiddenCols.includes("CREATED_AT"),
      onClick: () => labelOnclick("CREATED_AT"),
    },
    {
      colunm_type: "USER_NAME",
      label: "user",
      sort: {
        isActive: searchParams.sort === "USER_NAME",
        type: searchParams.sortIn,
      },
      disabled: isLoading,
      display: hiddenCols.includes("USER_NAME"),
      onClick: () => labelOnclick("USER_NAME"),
    },
    {
      colunm_type: "BODY",
      label: "review",
      sort: {
        isActive: searchParams.sort === "BODY",
        type: searchParams.sortIn,
      },
      disabled: isLoading,
      display: hiddenCols.includes("BODY"),
      onClick: () => labelOnclick("BODY"),
    },
    {
      colunm_type: "LISTING_NAME",
      label: "property name",
      sort: {
        isActive: searchParams.sort === "LISTING_NAME",
        type: searchParams.sortIn,
      },
      disabled: isLoading,
      display: hiddenCols.includes("LISTING_NAME"),
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
      display: hiddenCols.includes("CLEANLINESS"),
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
      display: hiddenCols.includes("ACCURACY"),
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
      display: hiddenCols.includes("CHECK_IN"),
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
      display: hiddenCols.includes("COMMUNICATION"),
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
      display: hiddenCols.includes("LOCATION"),
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
      display: hiddenCols.includes("VALUE"),
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
      display: hiddenCols.includes("RATING"),
      onClick: () => labelOnclick("RATING"),
      className:
        "flex items-center justify-start md:justify-end  lg:sticky top-0 -right-3 bg-neutral-300 dark:bg-neutral-900 ",
    },
  ];
  return (
    <Table
      tableHeaderLabels={labels}
      controllSection={{
        colums_control: {
          label: `showing ${pagination?.totalReviews || 0} reviews`,
          columns: [],
        },
      }}
      filterSectionActions={{
        onResetTableFilter: () => {
          on();
          setSelectedFilter([]);
        },
        onDeselectTableFilter: (
          item: unknown & { value: reservationFilterTypes }
        ) => {
          if (item.value === "CLIENT") {
            setQuery({
              ...searchParams,
              userId: undefined,
            });
          }
          if (item.value === "COMPLETED") {
            setQuery({
              ...searchParams,
              type: "ALL",
            });
          }
          if (item.value === "LISTING") {
            setQuery({
              ...searchParams,
              listingId: undefined,
            });
          }
          if (item.value === "PENDING") {
            setQuery({
              ...searchParams,
              type: "ALL",
            });
          }
          if (item.value === "PRICE") {
            setQuery({
              ...searchParams,
              min: undefined,
              max: undefined,
            });
          }
          setSelectedFilter(without(SelectedFilters, item.value));
        },
        tableFilterOptions: filterItems.filter(
          (item) => !!SelectedFilters?.includes(item.value)
        ),
        filterButton: {
          label: "select filter",
          icon: BiFilter,
          onClick: () => {},
        },
      }}
      footer={{}}
      header={{}}
      tableBody={{}}
    />
  );
};

export default ReviewsPage;
