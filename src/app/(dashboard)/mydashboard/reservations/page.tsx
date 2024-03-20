"use client";
import Table from "@/components/table/Table";
import { tableFilterOption } from "@/components/table/table-heading/TableFilterSection";
import { SingleTable_TH_type } from "@/components/table/table-shared-components/TableHeaderLabel";
import { useReservationRangeDateModal } from "@/hooks/useReservationRangeDateModal";
import { useReservationTable } from "@/hooks/useReservationTable";
import {
  reservationFilterTypes,
  reservationSortTypes,
} from "@/types/reservationTypes";
import { without } from "lodash";
import React, { useCallback, useState } from "react";
import { IconType } from "react-icons";
import { BiFilter, BiTable } from "react-icons/bi";
import {
  TbHomeCheck,
  TbHomeDollar,
  TbHomeQuestion,
  TbHomeRibbon,
  TbZoomReset,
} from "react-icons/tb";
const filterItems: {
  value: reservationFilterTypes;
  icon: IconType;
  label: string;
}[] = [
  {
    value: "COMPLETED",
    label: "completed reservations",
    icon: TbHomeCheck,
  },
  {
    value: "PENDING",
    label: "pending reservations",
    icon: TbHomeQuestion,
  },
  {
    value: "PRICE",
    label: "total amount",
    icon: TbHomeDollar,
  },
  {
    value: "LISTING",
    label: "property",
    icon: TbHomeRibbon,
  },
];
const ReservationsPage = () => {
  const [isLoading, setLoading] = useState(false);
  const {
    onResetQuery,
    setQuery,
    DisplayDate,
    SelectedFilters,
    SelectedSort,
    searchParams,
    hiddenColumns,
    setColumns,
    setDate,
    setResetColumns,
    setSelectedSort,
    setSelectedFilter,
  } = useReservationTable();
  const { onOpen: openDaterangeReservationModal } =
    useReservationRangeDateModal();
  const tableLabelOnclick = useCallback(
    (labelSortType: reservationSortTypes) => {
      if (!isLoading) {
        if (SelectedSort === labelSortType) {
          if (searchParams?.sortType === "desc") {
            setQuery({ sortType: "asc" });
          } else {
            setQuery({ sortType: "desc" });
          }
        } else {
          setSelectedSort(labelSortType);
          setQuery({ ...searchParams, sortType: "desc" });
        }
      }
    },
    [isLoading, SelectedSort, searchParams, setQuery, setSelectedSort]
  );

  const labels: SingleTable_TH_type[] = [
    {
      label: "user data",
      sort: {
        isActive: SelectedSort === "USER_NAME",
        type: searchParams?.sortType,
      },
      display: !!!hiddenColumns.includes("USER_NAME"),
      disabled: isLoading,
      onClick: () => tableLabelOnclick("USER_NAME"),
    },
    {
      label: "created at",
      sort: {
        isActive: SelectedSort === "CREATED_AT",
        type: searchParams?.sortType,
      },
      display: !!!hiddenColumns.includes("CREATED_AT"),
      disabled: isLoading,
      onClick: () => tableLabelOnclick("CREATED_AT"),
    },
    {
      label: "total Amount",
      sort: {
        isActive: SelectedSort === "TOTAL_AMOUNT",
        type: searchParams?.sortType,
      },
      display: !!!hiddenColumns.includes("TOTAL_AMOUNT"),
      disabled: isLoading,
      onClick: () => tableLabelOnclick("TOTAL_AMOUNT"),
    },
    {
      label: "property name",
      sort: {
        isActive: SelectedSort === "LISTING_NAME",
        type: searchParams?.sortType,
      },
      display: !!!hiddenColumns.includes("LISTING_NAME"),
      disabled: isLoading,
      onClick: () => tableLabelOnclick("LISTING_NAME"),
    },
    {
      label: "start date",
      sort: {
        isActive: SelectedSort === "START-DATE",
        type: searchParams?.sortType,
      },
      display: !!!hiddenColumns.includes("START-DATE"),
      disabled: isLoading,
      onClick: () => tableLabelOnclick("START-DATE"),
    },
    {
      label: "end date",
      sort: {
        isActive: SelectedSort === "END_DATE",
        type: searchParams?.sortType,
      },
      display: !!!hiddenColumns.includes("END_DATE"),
      disabled: isLoading,
      onClick: () => tableLabelOnclick("END_DATE"),
    },
    {
      label: "status",
      sort: {
        isActive: SelectedSort === "STATUS",
        type: searchParams?.sortType,
      },
      display: !!!hiddenColumns.includes("STATUS"),
      disabled: isLoading,
      onClick: () => tableLabelOnclick("STATUS"),
    },
  ];

  const [reservationFilterOptions, setReservationFilterOptions] = useState<
    tableFilterOption[]
  >([]);
  return (
    <Table
      header={{
        heading: {
          title: "resrevations",
          subtitle:
            "here a list of your reservations and all of reservations that other had with your properties.",
        },
        headingActions: {
          calendar: {
            date: DisplayDate,
            setDate: () => {
              openDaterangeReservationModal();
            },
          },
          reset: {
            onClick: () => {
              setResetColumns();
              setSelectedSort(undefined);
            },
            icon: TbZoomReset,
          },
        },
      }}
      filterSectionActions={{
        onResetTableFilter: () => {
          // todo => delete all search params and also selected filters
        },
        onDeselectTableFilter: (item) =>
          setSelectedFilter(without(SelectedFilters, item.value)),
        tableFilterOptions: filterItems.filter(
          (item) => !!SelectedFilters?.includes(item.value)
        ),
        filterButton: {
          label: "select filter",
          icon: BiFilter,
          onClick: () => {
            // todo => create reservation filter modal
          },
        },
      }}
      classNames={{
        heading:
          "p-3 border-b-[1px] border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-900 drop-shadow-md items-start rounded-t-md",
        filterSection:
          "p-3 border-b-[1px] border-neutral-300 dark:border-neutral-600 z-20",
        controllSection: "p-3 z-10 relative",
      }}
      controllSection={{
        colums_control: {
          label: "display columns",
          columns: [
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: false,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: true,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: false,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: true,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: false,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: true,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: false,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: true,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: false,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: true,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: false,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: true,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: false,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: true,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: false,
            },
            {
              label: "hide completed reservations",
              onClick: () => {},
              isActive: true,
            },
          ],
          icon: BiTable,
        },
        checkBoxes: [
          {
            label: "hide completed reservations",
            onClick: () => {},
            isActive: false,
          },
          {
            label: "hide completed reservations",
            onClick: () => {},
            isActive: true,
          },
        ],
        title: "showing 10 reservations",
      }}
      tableHeaderLabels={labels}
    />
  );
};

export default ReservationsPage;
