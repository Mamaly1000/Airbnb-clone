"use client";
import Table from "@/components/table/Table";
import ReservationRow from "@/components/table/table-row/ReservationRow";
import { SingleTable_TH_type } from "@/components/table/table-shared-components/TableHeaderLabel";
import { useReservationFilterModal } from "@/hooks/useReservationFilterModal";
import { useRangeDateModal } from "@/hooks/useRangeDateModal";
import useReservations, {
  reservationStatusTypes,
} from "@/hooks/useReservations";
import { useReservationTable } from "@/hooks/useReservationTable";
import {
  reservationFilterTypes,
  reservationSortTypes,
} from "@/types/reservationTypes";
import { uniq, without } from "lodash";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { BiFilter, BiTable, BiUser } from "react-icons/bi";
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
  {
    value: "CLIENT",
    label: "client",
    icon: BiUser,
  },
];
const ReservationsPage = () => {
  const {
    onResetQuery,
    setQuery,
    SelectedFilters,
    SelectedSort,
    searchParams,
    hiddenColumns,
    setColumns,
    setResetColumns,
    setSelectedSort,
    setSelectedFilter,
    hiddenRows,
    setHiddenRows,
    DisplayDate,
  } = useReservationTable();
  const { onOpen: openDaterangeReservationModal } = useRangeDateModal();
  const { onOpen: openReservationFilterModal } = useReservationFilterModal();
  const { reservations, isLoading, pagination } = useReservations({
    ...searchParams,
    paginate: true,
    startDate: DisplayDate.startDate,
    endDate: DisplayDate.endDate,
  });
  const tableLabelOnclick = useCallback(
    (labelSortType: reservationSortTypes) => {
      if (!isLoading) {
        if (SelectedSort === labelSortType) {
          if (searchParams?.sortType === "desc") {
            setQuery({ ...searchParams, sortType: "asc" });
          } else {
            setQuery({ ...searchParams, sortType: "desc" });
          }
        } else {
          setSelectedSort(labelSortType);
          setQuery({ ...searchParams, sortType: "desc", sort: labelSortType });
        }
      }
    },
    [
      isLoading,
      SelectedSort,
      searchParams,
      setQuery,
      setSelectedSort,
      searchParams,
    ]
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
      colunm_type: "USER_NAME",
      className: "sticky top-0 -left-3 bg-neutral-300 dark:bg-neutral-900 z-10",
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
      colunm_type: "CREATED_AT",
      className: "min-w-[220px] max-w-[220px]",
    },
    {
      label: "total Amount",
      sort: {
        isActive: SelectedSort === "TOTAL_AMOUNT",
        type: searchParams?.sortType,
      },
      colunm_type: "TOTAL_AMOUNT",
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
      colunm_type: "LISTING_NAME",
      className: "min-w-[300px] max-w-[300px]",
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
      colunm_type: "START-DATE",
      className: "min-w-[220px] max-w-[220px]",
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
      colunm_type: "END_DATE",
      className: "min-w-[220px] max-w-[220px]",
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
      colunm_type: "STATUS",
      className:
        "flex items-center justify-start md:justify-end  lg:sticky top-0 -right-3 bg-neutral-300 dark:bg-neutral-900 ",
    },
  ];
  return (
    <Table
      tableHeaderLabels={labels}
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
              openDaterangeReservationModal({
                type: "RESERVATION",
                date: DisplayDate,
              });
            },
          },
          reset: {
            onClick: () => {
              setResetColumns();
              setQuery({ ...searchParams, sort: undefined, sortType: "desc" });
              setSelectedSort(undefined);
            },
            icon: TbZoomReset,
          },
        },
      }}
      filterSectionActions={{
        onResetTableFilter: () => {
          onResetQuery();
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
          onClick: () => openReservationFilterModal(),
        },
      }}
      controllSection={{
        colums_control: {
          label: "display columns",
          columns: labels.map((label) => ({
            label: "hide " + label.label,
            onClick: () => {
              if (label.display) {
                setColumns(
                  uniq([
                    ...hiddenColumns,
                    label.colunm_type,
                  ] as reservationSortTypes[])
                );
                if (SelectedSort === label.colunm_type) {
                  setQuery({
                    ...searchParams,
                    sort: undefined,
                    sortType: "desc",
                  });
                  setSelectedSort(undefined);
                }
              } else {
                setColumns(
                  without(
                    hiddenColumns,
                    label.colunm_type
                  ) as reservationSortTypes[]
                );
              }
            },
            isActive: hiddenColumns.includes(
              label.colunm_type as reservationSortTypes
            ),
          })),
          icon: BiTable,
        },
        checkBoxes: [
          {
            label: "hide completed",
            onClick: () => {
              if (hiddenRows.includes("COMPLETED")) {
                setHiddenRows(without(hiddenRows, "COMPLETED"));
              } else {
                setHiddenRows(uniq([...hiddenRows, "COMPLETED"]));
              }
            },
            isActive: hiddenRows.includes("COMPLETED"),
          },
          {
            label: "hide pendings",
            onClick: () => {
              if (hiddenRows.includes("PENDING")) {
                setHiddenRows(without(hiddenRows, "PENDING"));
              } else {
                setHiddenRows(uniq([...hiddenRows, "PENDING"]));
              }
            },
            isActive: hiddenRows.includes("PENDING"),
          },
          {
            label: "hide outdated",
            onClick: () => {
              if (hiddenRows.includes("OUTDATED")) {
                setHiddenRows(without(hiddenRows, "OUTDATED"));
              } else {
                setHiddenRows(uniq([...hiddenRows, "OUTDATED"]));
              }
            },
            isActive: hiddenRows.includes("OUTDATED"),
          },
        ],
        title: `showing ${pagination?.totalReservations || 0} reservations`,
      }}
      tableBody={{
        rows: reservations.map((r) => ({
          data: r,
          row_type: r.status as reservationStatusTypes,
        })),
        RowElement: ReservationRow,
        isLoading,
      }}
      footer={{
        footerItemOnclick: (page) => {
          if (pagination?.currentPage !== page) {
            setQuery({ ...searchParams, page });
          }
        },
        isLoading,
        pagination: {
          ...pagination,
          total: pagination?.totalReservations || 0,
        },
      }}
    />
  );
};

export default ReservationsPage;
