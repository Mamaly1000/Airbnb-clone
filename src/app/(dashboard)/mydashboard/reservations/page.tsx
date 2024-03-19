"use client";
import { filterItems } from "@/components/search-page/FilterSelect";
import Table from "@/components/table/Table";
import { tableFilterOption } from "@/components/table/table-heading/TableFilterSection";
import { formatDistanceToNowStrict } from "date-fns";
import React, { useState } from "react";
import { BiTable } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import { MdLockReset } from "react-icons/md";

const ReservationsPage = ({ searchParams }: { searchParams: any }) => {
  const [reservateCurretDate, setReservationCurrentDate] = useState<Date>(
    new Date()
  );
  const [reservationFilterOptions, setReservationFilterOptions] = useState<
    tableFilterOption[]
  >([]);
  return (
    <Table
      heading={{
        title: "resrevations",
        subtitle:
          "here a list of your reservations and all of reservations that other had with your properties.",
      }}
      headingActions={{
        calendar: {
          date: new Date(),
          setDate: (date) => {
            console.log(formatDistanceToNowStrict(date));
          },
        },
        create: {
          onClick: () => {},
          icon: IoCreate,
          label: "add reservation",
        },
        reset: {
          onClick: () => {},
          icon: MdLockReset,
          label: "reset",
        },
      }}
      tableFilterOptions={reservationFilterOptions}
      onResetTableFilter={() => setReservationFilterOptions([])}
      TableDefaultFilterOptions={filterItems.map((i) => ({
        icon: i.icon,
        label: i.label,
        value: i.type,
      }))}
      onSelectTableFilter={(item) =>
        setReservationFilterOptions([...reservationFilterOptions, item])
      }
      onDeselectTableFilter={(item) =>
        setReservationFilterOptions(
          reservationFilterOptions.filter((o) => item.value !== o.value)
        )
      }
      classNames={{
        heading:
          "p-3 border-b-[1px] border-neutral-300 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-900 drop-shadow-2xl items-start rounded-t-md",
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
    />
  );
};

export default ReservationsPage;
